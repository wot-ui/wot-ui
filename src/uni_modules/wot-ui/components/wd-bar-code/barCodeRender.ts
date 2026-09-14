import { DEFAULT_BAR_CODE_LINE_WIDTH, type BarCodeFormat } from './types'

export type BarCodeRenderEncoding = {
  data: string
  text: string
  options?: Record<string, unknown>
}

export type BarCodeRenderOptions = {
  format: BarCodeFormat
  height: number
  fontSize: number
  font: string
  fontOptions: string
  textMargin: number
  lineColor: string
  background: string
  marginLeft: number
  marginRight: number
  marginTop: number
  marginBottom: number
  displayValue: boolean
  textAlign: string
  textPosition: string
  text?: string
}

export type BarCodeRenderSize = {
  width: number
  height: number
}

type TextAlign = 'left' | 'center' | 'right'

type ResolvedTextOptions = BarCodeRenderOptions & { textAscent: number; textDescent: number }

function getModuleCount(encodings: BarCodeRenderEncoding[]) {
  return encodings.reduce((total, encoding) => total + encoding.data.length, 0)
}

function getModuleX(startX: number, moduleWidth: number, moduleIndex: number, pixelRatio = 1) {
  return Math.round((startX + moduleIndex * moduleWidth) * pixelRatio) / pixelRatio
}

function drawBarRun(
  context: UniApp.CanvasContext,
  startX: number,
  moduleWidth: number,
  startIndex: number,
  endIndex: number,
  y: number,
  height: number,
  pixelRatio: number
) {
  const x = getModuleX(startX, moduleWidth, startIndex, pixelRatio)
  const endX = getModuleX(startX, moduleWidth, endIndex, pixelRatio)

  context.fillRect(x, y, endX - x, height)
}

function drawEncodingBars(
  context: UniApp.CanvasContext,
  encoding: BarCodeRenderEncoding,
  barcodeX: number,
  y: number,
  moduleWidth: number,
  moduleStartIndex: number,
  height: number,
  pixelRatio: number
) {
  let runStart = -1

  for (let index = 0; index < encoding.data.length; index++) {
    const bar = encoding.data[index]

    if (bar === '1') {
      if (runStart === -1) {
        runStart = index
      }
    } else if (bar && bar !== '0') {
      if (runStart !== -1) {
        drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + index, y, height, pixelRatio)
        runStart = -1
      }
      drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + index, moduleStartIndex + index + 1, y, height * Number(bar), pixelRatio)
    } else if (runStart !== -1) {
      drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + index, y, height, pixelRatio)
      runStart = -1
    }
  }

  if (runStart !== -1) {
    drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + encoding.data.length, y, height, pixelRatio)
  }
}

function getEncodingBarHeight(encoding: BarCodeRenderEncoding, options: BarCodeRenderOptions, barHeight: number, maxBarHeight: number) {
  const encodingHeight = Number(encoding.options?.height)

  if (!Number.isFinite(encodingHeight) || encodingHeight <= options.height) {
    return barHeight
  }

  return maxBarHeight
}

function getContentHeight(options: BarCodeRenderOptions) {
  return options.height - options.marginTop - options.marginBottom
}

function setTextStyle(context: UniApp.CanvasContext, options: BarCodeRenderOptions, align: TextAlign) {
  context.setFillStyle?.(options.lineColor)
  context.setFontSize?.(options.fontSize)
  const fontStyle = /\bitalic\b/.test(options.fontOptions) ? 'italic' : 'normal'
  const fontWeight = /\bbold\b/.test(options.fontOptions) ? 'bold' : 'normal'
  context.font = `${fontStyle} ${fontWeight} ${options.fontSize}px ${options.font}`
  context.setTextAlign?.(align)
}

function getTextY(barcodeY: number, barHeight: number, options: ResolvedTextOptions) {
  return options.textPosition === 'top' ? options.marginTop + options.textAscent : barcodeY + barHeight + options.textMargin + options.textAscent
}

function drawGenericText(
  context: UniApp.CanvasContext,
  text: string,
  canvasWidth: number,
  barcodeY: number,
  barHeight: number,
  options: ResolvedTextOptions
) {
  if (!options.displayValue || !text) return

  const align = options.textAlign as TextAlign
  drawSegmentText(context, text, options.marginLeft, canvasWidth - options.marginLeft - options.marginRight, barcodeY, barHeight, options, align)
}

function drawSegmentText(
  context: UniApp.CanvasContext,
  text: string,
  x: number,
  width: number,
  barcodeY: number,
  barHeight: number,
  options: ResolvedTextOptions,
  align: TextAlign = 'center'
) {
  if (!options.displayValue || !text) return

  setTextStyle(context, options, 'left')
  const bounds = measureTextBounds(context, text, options)
  const alignment = align === 'left' ? 0 : align === 'right' ? 1 : 0.5
  const origin = x + (width - bounds.width) * alignment
  const fittedOrigin = Math.max(x - bounds.left, Math.min(origin, x + width - bounds.right))
  context.setTextAlign?.(align)
  context.fillText(text, fittedOrigin + bounds.width * alignment, getTextY(barcodeY, barHeight, options))
}

function getEncodingLayoutList(encodings: BarCodeRenderEncoding[], barcodeX: number, moduleWidth: number) {
  let moduleIndex = 0

  return encodings.map((encoding) => {
    const startX = getModuleX(barcodeX, moduleWidth, moduleIndex)
    moduleIndex += encoding.data.length
    const endX = getModuleX(barcodeX, moduleWidth, moduleIndex)

    return {
      x: startX,
      width: endX - startX
    }
  })
}

function usesSegmentText(options: BarCodeRenderOptions) {
  return !options.text && ['EAN13', 'EAN8', 'UPC', 'UPCE'].includes(options.format)
}

function measureTextBounds(context: UniApp.CanvasContext, text: string, options: BarCodeRenderOptions) {
  let metrics: Partial<TextMetrics> | undefined
  try {
    metrics = context.measureText?.(text)
  } catch {
    // Older native canvases may expose measureText without implementing it.
  }
  const { fontSize } = options
  const width = metrics && Number.isFinite(metrics.width) && metrics.width! > 0 ? metrics.width! : Array.from(text).length * fontSize
  const italicPadding = /\bitalic\b/.test(options.fontOptions) ? fontSize / 4 : 0
  // Bounds are measured with left alignment. Legacy contexts only expose advance width.
  const left = Number.isFinite(metrics?.actualBoundingBoxLeft) ? Math.min(0, -metrics!.actualBoundingBoxLeft!) : -italicPadding
  const right = Number.isFinite(metrics?.actualBoundingBoxRight) ? Math.max(width, metrics!.actualBoundingBoxRight!) : width + italicPadding
  const ascent = Number.isFinite(metrics?.actualBoundingBoxAscent) ? Math.max(fontSize, metrics!.actualBoundingBoxAscent!) : fontSize
  // Reserve the same line box on native 2D and width-only contexts; expand only for taller glyphs.
  const descent = Number.isFinite(metrics?.actualBoundingBoxDescent) ? Math.max(fontSize / 4, metrics!.actualBoundingBoxDescent!) : fontSize / 4
  return { width, left, right, ascent, descent }
}

function getResolvedTextOptions(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  options: BarCodeRenderOptions,
  canvasSize: BarCodeRenderSize,
  moduleWidth: number,
  displayText: string
): ResolvedTextOptions {
  if (!options.displayValue) {
    return { ...options, textAscent: 0, textDescent: 0 }
  }

  if (!Number.isFinite(options.fontSize) || options.fontSize <= 0) {
    throw new Error('Barcode fontSize must be a positive finite number')
  }
  const layoutList = getEncodingLayoutList(encodings, options.marginLeft, moduleWidth)
  const textAreas = usesSegmentText(options)
    ? encodings.map((encoding, index) => ({ text: encoding.text, width: layoutList[index].width }))
    : [{ text: displayText, width: canvasSize.width - options.marginLeft - options.marginRight }]
  let fontSize = options.fontSize

  while (fontSize > 0) {
    const resolvedOptions = { ...options, fontSize }
    setTextStyle(context, resolvedOptions, 'left')
    let scale = 1
    let textAscent = fontSize
    let textDescent = 0
    for (const { text, width } of textAreas) {
      if (!text) continue
      const bounds = measureTextBounds(context, text, resolvedOptions)
      scale = Math.min(scale, width / (bounds.right - bounds.left))
      textAscent = Math.max(textAscent, bounds.ascent)
      textDescent = Math.max(textDescent, bounds.descent)
    }
    if (scale >= 1) return { ...resolvedOptions, textAscent, textDescent }
    const nextFontSize = Math.floor(fontSize * scale)
    if (nextFontSize < 1 || nextFontSize >= fontSize) {
      break
    }
    fontSize = nextFontSize
  }
  throw new Error('Barcode width is too small for the display text; increase width or shorten text')
}

function drawSpecialFormatText(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  barcodeX: number,
  barcodeY: number,
  barHeight: number,
  moduleWidth: number,
  options: ResolvedTextOptions
) {
  if (!options.displayValue) return

  const layoutList = getEncodingLayoutList(encodings, barcodeX, moduleWidth)

  encodings.forEach((encoding, index) => {
    if (!encoding.text) return

    const { x, width } = layoutList[index]
    drawSegmentText(context, encoding.text, x, width, barcodeY, barHeight, options, 'center')
  })
}

function drawTextByFormat(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  options: ResolvedTextOptions,
  canvasSize: BarCodeRenderSize,
  barcodeY: number,
  barHeight: number,
  moduleWidth: number,
  displayText: string
) {
  if (usesSegmentText(options)) {
    drawSpecialFormatText(context, encodings, options.marginLeft, barcodeY, barHeight, moduleWidth, options)
  } else {
    drawGenericText(context, displayText, canvasSize.width, barcodeY, barHeight, options)
  }
}

export function resolveBarCodeRenderSize(encodings: BarCodeRenderEncoding[], options: BarCodeRenderOptions, width?: number): BarCodeRenderSize {
  if (width !== undefined && (!Number.isFinite(width) || width <= 0)) {
    throw new Error('Barcode width must be a positive finite number')
  }
  const moduleCount = getModuleCount(encodings)
  const contentWidth = moduleCount * DEFAULT_BAR_CODE_LINE_WIDTH
  const canvasWidth = width === undefined ? contentWidth + options.marginLeft + options.marginRight : width

  return {
    width: canvasWidth,
    height: options.height
  }
}

export function drawBarCodeToCanvas(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  options: BarCodeRenderOptions,
  canvasSize: BarCodeRenderSize,
  displayText: string,
  pixelRatio = 1
) {
  const availableWidth = canvasSize.width - options.marginLeft - options.marginRight
  const availableHeight = getContentHeight(options)
  const moduleCount = Math.max(getModuleCount(encodings), 1)
  const moduleWidth = availableWidth / moduleCount
  // Each module needs at least one bitmap pixel to preserve both bars and spaces.
  if (!Number.isFinite(pixelRatio) || pixelRatio <= 0 || !Number.isFinite(moduleWidth) || moduleWidth * pixelRatio < 1) {
    throw new Error('Barcode width is too small to preserve the encoded bars and spaces; increase width')
  }
  const resolvedTextOptions = getResolvedTextOptions(context, encodings, options, canvasSize, moduleWidth, displayText)
  const textHeight = options.displayValue ? resolvedTextOptions.textAscent + resolvedTextOptions.textDescent + resolvedTextOptions.textMargin : 0
  const barHeight = availableHeight - textHeight
  if (!Number.isFinite(barHeight) || barHeight < 1) {
    throw new Error('Barcode height is too small for the margins, text and bars; increase height or reduce fontSize, textMargin or margins')
  }
  const barcodeY = options.textPosition === 'top' ? options.marginTop + textHeight : options.marginTop
  const maxBarHeight = Math.max(
    barHeight +
      (options.displayValue && usesSegmentText(options) && options.textPosition === 'bottom'
        ? resolvedTextOptions.textMargin + resolvedTextOptions.fontSize / 2
        : 0),
    1
  )

  context.clearRect?.(0, 0, canvasSize.width, canvasSize.height)
  if (options.background) {
    context.setFillStyle?.(options.background)
    context.fillRect(0, 0, canvasSize.width, canvasSize.height)
  }

  context.setFillStyle?.(options.lineColor)

  let moduleStartIndex = 0
  encodings.forEach((encoding) => {
    const encodingBarHeight = getEncodingBarHeight(encoding, options, barHeight, maxBarHeight)
    drawEncodingBars(context, encoding, options.marginLeft, barcodeY, moduleWidth, moduleStartIndex, encodingBarHeight, pixelRatio)
    moduleStartIndex += encoding.data.length
  })

  drawTextByFormat(context, encodings, resolvedTextOptions, canvasSize, barcodeY, barHeight, moduleWidth, displayText)
}
