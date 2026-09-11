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
}

export type BarCodeRenderSize = {
  width: number
  height: number
}

type TextAlign = 'left' | 'center' | 'right'

type ResolvedTextOptions = BarCodeRenderOptions & {
  fontSize: number
  textMargin: number
}

const MIN_SPECIAL_TEXT_FONT_SIZE = 8

function getModuleCount(encodings: BarCodeRenderEncoding[]) {
  return encodings.reduce((total, encoding) => total + encoding.data.length, 0)
}

function getModuleX(startX: number, moduleWidth: number, moduleIndex: number) {
  return Math.round(startX + moduleIndex * moduleWidth)
}

function drawBarRun(
  context: UniApp.CanvasContext,
  startX: number,
  moduleWidth: number,
  startIndex: number,
  endIndex: number,
  y: number,
  height: number
) {
  const x = getModuleX(startX, moduleWidth, startIndex)
  const endX = getModuleX(startX, moduleWidth, endIndex)

  context.fillRect(x, y, Math.max(1, endX - x), height)
}

function drawEncodingBars(
  context: UniApp.CanvasContext,
  encoding: BarCodeRenderEncoding,
  barcodeX: number,
  y: number,
  moduleWidth: number,
  moduleStartIndex: number,
  height: number
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
        drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + index, y, height)
        runStart = -1
      }
      drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + index, moduleStartIndex + index + 1, y, height * Number(bar))
    } else if (runStart !== -1) {
      drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + index, y, height)
      runStart = -1
    }
  }

  if (runStart !== -1) {
    drawBarRun(context, barcodeX, moduleWidth, moduleStartIndex + runStart, moduleStartIndex + encoding.data.length, y, height)
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
  return Math.max(options.height - options.marginTop - options.marginBottom, 1)
}

function setTextStyle(context: UniApp.CanvasContext, options: BarCodeRenderOptions, align: TextAlign) {
  context.setFillStyle?.(options.lineColor)
  context.setFontSize?.(options.fontSize)
  context.setTextAlign?.(align)
}

function getTextY(barcodeY: number, barHeight: number, options: BarCodeRenderOptions) {
  return options.textPosition === 'top' ? options.marginTop + options.fontSize : barcodeY + barHeight + options.textMargin + options.fontSize
}

function drawGenericText(
  context: UniApp.CanvasContext,
  text: string,
  canvasWidth: number,
  barcodeY: number,
  barHeight: number,
  options: BarCodeRenderOptions
) {
  if (!options.displayValue || !text) return

  const align = options.textAlign as TextAlign
  const x = align === 'left' ? options.marginLeft : align === 'right' ? canvasWidth - options.marginRight : canvasWidth / 2

  setTextStyle(context, options, align)
  context.fillText(text, x, getTextY(barcodeY, barHeight, options))
}

function drawSegmentText(
  context: UniApp.CanvasContext,
  text: string,
  x: number,
  barcodeY: number,
  barHeight: number,
  options: BarCodeRenderOptions,
  align: TextAlign = 'center'
) {
  if (!options.displayValue || !text) return

  setTextStyle(context, options, align)
  context.fillText(text, x, getTextY(barcodeY, barHeight, options))
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

function getResolvedTextOptions(
  encodings: BarCodeRenderEncoding[],
  options: BarCodeRenderOptions,
  barcodeX: number,
  moduleWidth: number,
  maxTextHeight?: number
): ResolvedTextOptions {
  if (!options.displayValue) {
    return options as ResolvedTextOptions
  }

  if (options.format !== 'EAN8' && options.format !== 'UPC' && options.format !== 'UPCE') {
    return options as ResolvedTextOptions
  }

  const layoutList = getEncodingLayoutList(encodings, barcodeX, moduleWidth)
  let fontSize = options.fontSize

  encodings.forEach((encoding, index) => {
    if (!encoding.text) return

    const layout = layoutList[index]
    const textLength = Math.max(encoding.text.length, 1)
    const textFitSize = Math.floor(layout.width / (textLength * 0.62))

    if (textFitSize > 0) {
      fontSize = Math.min(fontSize, textFitSize)
    }
  })

  const minFontSize = typeof maxTextHeight === 'number' ? 1 : MIN_SPECIAL_TEXT_FONT_SIZE

  if (typeof maxTextHeight === 'number') {
    fontSize = Math.min(fontSize, Math.max(1, maxTextHeight - options.textMargin))
  }

  fontSize = Math.max(minFontSize, fontSize)

  return {
    ...options,
    fontSize,
    textMargin: Math.min(options.textMargin, Math.max(1, Math.floor(fontSize / 4)))
  }
}

function drawSpecialFormatText(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  barcodeX: number,
  barcodeY: number,
  barHeight: number,
  moduleWidth: number,
  options: BarCodeRenderOptions
) {
  if (!options.displayValue) return

  const resolvedOptions = getResolvedTextOptions(encodings, options, barcodeX, moduleWidth, barHeight)
  const layoutList = getEncodingLayoutList(encodings, barcodeX, moduleWidth)

  encodings.forEach((encoding, index) => {
    if (!encoding.text) return

    const { x, width } = layoutList[index]
    drawSegmentText(context, encoding.text, x + width / 2, barcodeY, barHeight, resolvedOptions, 'center')
  })
}

function drawTextByFormat(
  context: UniApp.CanvasContext,
  encodings: BarCodeRenderEncoding[],
  options: BarCodeRenderOptions,
  canvasSize: BarCodeRenderSize,
  barcodeY: number,
  barHeight: number,
  moduleWidth: number,
  displayText: string
) {
  switch (options.format) {
    case 'EAN13':
    case 'EAN8':
    case 'UPC':
    case 'UPCE':
      drawSpecialFormatText(context, encodings, options.marginLeft, barcodeY, barHeight, moduleWidth, options)
      break
    default:
      drawGenericText(context, displayText, canvasSize.width, barcodeY, barHeight, options)
      break
  }
}

export function resolveBarCodeRenderSize(encodings: BarCodeRenderEncoding[], options: BarCodeRenderOptions, width?: number): BarCodeRenderSize {
  const moduleCount = getModuleCount(encodings)
  const contentWidth = moduleCount * DEFAULT_BAR_CODE_LINE_WIDTH
  const canvasWidth = width || contentWidth + options.marginLeft + options.marginRight

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
  displayText: string
) {
  const availableWidth = Math.max(canvasSize.width - options.marginLeft - options.marginRight, 1)
  const availableHeight = getContentHeight(options)
  const moduleCount = Math.max(getModuleCount(encodings), 1)
  const moduleWidth = availableWidth / moduleCount
  const resolvedTextOptions = getResolvedTextOptions(encodings, options, options.marginLeft, moduleWidth, availableHeight)
  const textHeight = options.displayValue ? resolvedTextOptions.fontSize + resolvedTextOptions.textMargin : 0
  const barHeight = Math.max(availableHeight - textHeight, 1)
  const barcodeY = options.textPosition === 'top' ? options.marginTop + textHeight : options.marginTop
  const maxBarHeight = Math.max(
    barHeight + (options.displayValue && options.textPosition === 'bottom' ? resolvedTextOptions.textMargin + resolvedTextOptions.fontSize / 2 : 0),
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
    drawEncodingBars(context, encoding, options.marginLeft, barcodeY, moduleWidth, moduleStartIndex, encodingBarHeight)
    moduleStartIndex += encoding.data.length
  })

  drawTextByFormat(context, encodings, options, canvasSize, barcodeY, barHeight, moduleWidth, displayText)
}
