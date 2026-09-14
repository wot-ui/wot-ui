import { describe, expect, test, vi } from 'vitest'
import JsBarcode from '@/uni_modules/wot-ui/components/wd-bar-code/barCode'
import {
  drawBarCodeToCanvas,
  resolveBarCodeRenderSize,
  type BarCodeRenderEncoding,
  type BarCodeRenderOptions
} from '@/uni_modules/wot-ui/components/wd-bar-code/barCodeRender'
import type { BarCodeFormat } from '@/uni_modules/wot-ui/components/wd-bar-code/types'

const options: BarCodeRenderOptions = {
  format: 'CODE128',
  height: 100,
  font: 'monospace',
  fontOptions: '',
  fontSize: 20,
  textMargin: 2,
  lineColor: '#000000',
  background: '#ffffff',
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  marginBottom: 10,
  displayValue: false,
  textAlign: 'center',
  textPosition: 'bottom'
}

const formats: Array<[BarCodeFormat, string]> = [
  ['auto', 'ABCDEFGHIJKLMNOPQRST'],
  ['CODE128', 'ABCDEFGHIJKLMNOPQRST'],
  ['CODE128A', 'ABC123'],
  ['CODE128B', 'Abc123'],
  ['CODE128C', '123456'],
  ['EAN13', '6901234567892'],
  ['EAN8', '12345670'],
  ['UPC', '036000291452'],
  ['UPCE', '123456'],
  ['CODE39', 'ABC123'],
  ['ITF14', '1234567890123'],
  ['MSI', '123456'],
  ['MSI10', '123456'],
  ['MSI11', '123456'],
  ['MSI1010', '123456'],
  ['MSI1110', '123456'],
  ['pharmacode', '1234'],
  ['codabar', 'A12345B']
]

function encode(format: BarCodeFormat, value: string) {
  const target: { encodings?: BarCodeRenderEncoding[] } = {}
  JsBarcode(target, value, { ...options, format, width: 2 })
  return target.encodings!
}

function createMeasuredTextContext() {
  const texts: Array<{ text: string; x: number; y: number; width: number; font: string }> = []
  const context = {
    font: '',
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    setFillStyle: vi.fn(),
    setFontSize: vi.fn(),
    setTextAlign: vi.fn(),
    measureText: vi.fn(function (this: { font: string }, text: string): Partial<TextMetrics> & { width: number } {
      const size = Number(/([\d.]+)px/.exec(this.font)?.[1])
      const weight = this.font.includes('bold') ? 1.2 : 1
      const width = Array.from(text).reduce((width, char) => width + (char === 'W' || char.charCodeAt(0) > 127 ? 1 : 0.6), 0) * size * weight
      return { width, actualBoundingBoxLeft: 0, actualBoundingBoxRight: width, actualBoundingBoxAscent: size, actualBoundingBoxDescent: 0 }
    }),
    fillText(text: string, x: number, y: number) {
      texts.push({ text, x, y, width: this.measureText(text).width, font: this.font })
    }
  }
  return { context, texts }
}

describe('barcode renderer with real encodings', () => {
  test.each([0, -1, NaN, Infinity, -Infinity])('does not treat invalid width %s as automatic sizing', (width) => {
    expect(() => resolveBarCodeRenderSize(encode('CODE128', '12345'), options, width)).toThrow('positive finite number')
  })

  test('only omitted internal width uses the encoded module count', () => {
    const encodings = encode('CODE128', '12345')
    const moduleCount = encodings.reduce((sum, encoding) => sum + encoding.data.length, 0)
    expect(resolveBarCodeRenderSize(encodings, options)).toEqual({ width: moduleCount * 2 + 20, height: 100 })
    expect(resolveBarCodeRenderSize(encodings, options, 260.5)).toEqual({ width: 260.5, height: 100 })
  })

  test.each(formats)('%s preserves every bar and space at bitmap precision', (format, value) => {
    const encodings = encode(format, value)
    const data = encodings.map((encoding) => encoding.data).join('')
    expect(data.length).toBeGreaterThan(0)

    for (const ratio of [1, 1.25, 2, 3]) {
      const width = 20 + (data.length * 1.5) / ratio
      const pixels = new Uint8Array(Math.ceil(width * ratio))
      let color = ''
      const context = {
        clearRect: () => pixels.fill(0),
        setFillStyle: (value: string) => (color = value),
        fillRect: (x: number, _y: number, barWidth: number) => {
          expect(x * ratio).toBeCloseTo(Math.round(x * ratio))
          expect(barWidth * ratio).toBeCloseTo(Math.round(barWidth * ratio))
          pixels.fill(color === options.lineColor ? 1 : 0, Math.round(x * ratio), Math.round((x + barWidth) * ratio))
        }
      }
      drawBarCodeToCanvas(
        context as unknown as UniApp.CanvasContext,
        encodings,
        { ...options, format, background: '' },
        { width, height: 100 },
        value,
        ratio
      )

      // Read the bitmap runs back, including white spaces, and compare to the encoder.
      const bitmapRuns = Array.from(pixels.slice(Math.round(10 * ratio), Math.round((width - 10) * ratio)))
        .join('')
        .match(/0+|1+/g)!
      const encodingRuns = data.match(/0+|1+/g)!
      expect(bitmapRuns.map((run) => run[0])).toEqual(encodingRuns.map((run) => run[0]))
      bitmapRuns.forEach((run, index) => {
        expect(Math.abs(run.length - encodingRuns[index].length * 1.5)).toBeLessThanOrEqual(1)
      })
    }
  })

  test.each([1, 1.25, 2, 3])('rejects insufficient bitmap resolution at ratio %s before drawing', (ratio) => {
    const encodings = encode('CODE128', 'ABCDEFGHIJKLMNOPQRST')
    const count = encodings.reduce((total, encoding) => total + encoding.data.length, 0)
    const context = { clearRect: vi.fn(), fillRect: vi.fn() }
    expect(() =>
      drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encodings, options, { width: 20 + (count - 1) / ratio, height: 100 }, '', ratio)
    ).toThrow('increase width')
    expect(context.fillRect).not.toHaveBeenCalled()
    expect(context.clearRect).not.toHaveBeenCalled()
  })

  test.each(formats.filter(([format]) => ['CODE128', 'EAN13', 'EAN8', 'UPC', 'UPCE'].includes(format)))(
    '%s uses the same text layout for sizing and drawing at small heights',
    (format, value) => {
      for (const textPosition of ['top', 'bottom']) {
        const renderOptions = { ...options, format, displayValue: true, height: 50, textPosition }
        const target: { encodings?: BarCodeRenderEncoding[] } = {}
        JsBarcode(target, value, { ...renderOptions, width: 2 })
        const context = {
          font: '',
          measureText(text: string) {
            return { width: Array.from(text).length * Number(/([\d.]+)px/.exec(this.font)?.[1]) * 0.6, actualBoundingBoxDescent: 0 }
          },
          clearRect: vi.fn(),
          fillRect: vi.fn(),
          fillText: vi.fn(),
          setFillStyle: vi.fn(),
          setFontSize: vi.fn(),
          setTextAlign: vi.fn()
        }
        drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, target.encodings!, renderOptions, { width: 400, height: 50 }, value, 2)

        expect(context.font).toBe('normal normal 20px monospace')
        expect(context.fillText).toHaveBeenCalled()
        for (const [, , y] of context.fillText.mock.calls) {
          expect(y).toBe(textPosition === 'top' ? 30 : 35)
        }
        for (const [, y, , height] of context.fillRect.mock.calls.slice(1)) {
          expect(y).toBe(textPosition === 'top' ? 37 : 10)
          expect(height).toBeGreaterThanOrEqual(1)
          expect(y + height).toBeLessThanOrEqual(40)
        }

        // Reuse the same encoded content with insufficient total height.
        expect(() =>
          drawBarCodeToCanvas(
            context as unknown as UniApp.CanvasContext,
            target.encodings!,
            { ...renderOptions, height: 30 },
            { width: 400, height: 30 },
            value,
            2
          )
        ).toThrow('increase height')
      }
    }
  )

  test.each([0, 20, -1, NaN, Infinity])('rejects height %s even without text before drawing', (height) => {
    const encodings = encode('CODE128', '12345')
    const context = { clearRect: vi.fn(), fillRect: vi.fn() }
    expect(() =>
      drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encodings, { ...options, height }, { width: 200, height }, '', 2)
    ).toThrow('increase height')
    expect(context.clearRect).not.toHaveBeenCalled()
    expect(context.fillRect).not.toHaveBeenCalled()
  })

  test.each(formats)('%s fits measured text into its allocated area, including bold fonts', (format, value) => {
    const encodings = encode(format, value)
    const { context, texts } = createMeasuredTextContext()
    const renderOptions = { ...options, format, displayValue: true, fontSize: 40, fontOptions: 'bold italic' }
    const displayText = encodings.map((encoding) => encoding.text).join('')
    drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encodings, renderOptions, { width: 200, height: 100 }, displayText, 2)

    const special = ['EAN13', 'EAN8', 'UPC', 'UPCE'].includes(format)
    let moduleIndex = 0
    const count = encodings.reduce((sum, encoding) => sum + encoding.data.length, 0)
    const areas = encodings
      .map((encoding) => {
        const start = Math.round(10 + (moduleIndex * 180) / count)
        moduleIndex += encoding.data.length
        return { start, end: Math.round(10 + (moduleIndex * 180) / count), text: encoding.text }
      })
      .filter((area) => area.text)
    expect(texts.length).toBeGreaterThan(0)
    texts.forEach((text, index) => {
      const { start, end } = special ? areas[index] : { start: 10, end: 190 }
      expect(text.x - text.width / 2).toBeGreaterThanOrEqual(start - 0.001)
      expect(text.x + text.width / 2).toBeLessThanOrEqual(end + 0.001)
      expect(text.font).toContain('italic bold')
    })
    expect(context.measureText).toHaveBeenCalled()
  })

  test.each(['left', 'center', 'right'])('fits custom wide-character text with asymmetric margins and %s alignment', (textAlign) => {
    const { context, texts } = createMeasuredTextContext()
    const renderOptions = { ...options, displayValue: true, marginLeft: 35, marginRight: 5, textAlign }
    const text = 'WWWWWWWWWWWWWWWWWWWW'
    drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encode('CODE128', '12345'), renderOptions, { width: 200, height: 100 }, text, 2)
    const rendered = texts[0]
    const left = rendered.x - (textAlign === 'left' ? 0 : textAlign === 'center' ? rendered.width / 2 : rendered.width)
    expect(left).toBeGreaterThanOrEqual(35)
    expect(left + rendered.width).toBeLessThanOrEqual(195)
    expect(rendered.text).toBe(text)
  })

  test.each(['EAN8', 'UPC', 'UPCE'] as const)('%s preserves textMargin=20 at the top and bottom', (format) => {
    const value = formats.find(([item]) => item === format)![1]
    for (const textPosition of ['top', 'bottom']) {
      const { context, texts } = createMeasuredTextContext()
      const renderOptions = { ...options, format, displayValue: true, textMargin: 20, textPosition }
      drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encode(format, value), renderOptions, { width: 400, height: 100 }, value, 2)
      expect(context.font).toBe('normal normal 20px monospace')
      const bars = context.fillRect.mock.calls.slice(1)
      const normalBottom = Math.min(...bars.map(([, y, , height]) => y + height))
      if (textPosition === 'top') {
        expect(bars[0][1] - (texts[0].y + 5)).toBe(20)
      } else {
        expect(texts[0].y - 20 - normalBottom).toBe(20)
      }
    }
  })

  test.each(['missing', 'throws', 'zero', 'non-finite'])('handles %s measureText on older canvases', (mode) => {
    const context = {
      font: '',
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      fillText: vi.fn(),
      setFillStyle: vi.fn(),
      setFontSize: vi.fn(),
      setTextAlign: vi.fn(),
      measureText:
        mode === 'missing'
          ? undefined
          : () => {
              if (mode === 'throws') throw new Error('not supported')
              return { width: mode === 'zero' ? 0 : NaN }
            }
    }
    const text = 'WWWWWWWWWWWWWWWWWWWW'
    drawBarCodeToCanvas(
      context as unknown as UniApp.CanvasContext,
      encode('CODE128', '12345'),
      { ...options, displayValue: true },
      { width: 200, height: 100 },
      text,
      2
    )
    expect(context.font).toBe('normal normal 9px monospace')
    expect(context.fillText).toHaveBeenCalledWith(text, 100, 87.75)
  })

  test.each(['top', 'bottom'])('reserves actual glyph descent with zero margins at %s', (textPosition) => {
    const { context, texts } = createMeasuredTextContext()
    context.measureText.mockReturnValue({ width: 50, actualBoundingBoxAscent: 13, actualBoundingBoxDescent: 3 })
    const renderOptions = { ...options, displayValue: true, marginTop: 0, marginBottom: 0, textPosition }
    drawBarCodeToCanvas(
      context as unknown as UniApp.CanvasContext,
      encode('CODE128', '12345'),
      renderOptions,
      { width: 200, height: 100 },
      'gjpqy',
      2
    )
    const { y } = texts[0]
    expect(y - 13).toBeGreaterThanOrEqual(0)
    expect(y + 3).toBeLessThanOrEqual(100)
    const [, barY, , barHeight] = context.fillRect.mock.calls[1]
    if (textPosition === 'top') {
      expect(barY - (y + 5)).toBe(2)
    } else {
      expect(y).toBe(95)
      expect(y - 20 - (barY + barHeight)).toBe(2)
    }
  })

  test.each(['left', 'center', 'right'])('fits italic ink bounds and anchors with %s alignment', (textAlign) => {
    const { context, texts } = createMeasuredTextContext()
    context.measureText.mockImplementation(function (this: { font: string }) {
      const size = Number(/([\d.]+)px/.exec(this.font)![1])
      return {
        width: size * 4,
        actualBoundingBoxLeft: size / 4,
        actualBoundingBoxRight: size * 4.5,
        actualBoundingBoxAscent: size,
        actualBoundingBoxDescent: 0
      }
    })
    const renderOptions = { ...options, displayValue: true, fontSize: 40, fontOptions: 'bold italic', textAlign, marginLeft: 0, marginRight: 0 }
    drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, encode('CODE128', '12345'), renderOptions, { width: 180, height: 100 }, 'fff', 2)
    const rendered = texts[0]
    const size = Number(/([\d.]+)px/.exec(rendered.font)![1])
    const origin = rendered.x - rendered.width * (textAlign === 'left' ? 0 : textAlign === 'right' ? 1 : 0.5)
    expect(size).toBeLessThan(40)
    expect(origin - size / 4).toBeGreaterThanOrEqual(0)
    expect(origin + size * 4.5).toBeLessThanOrEqual(180)
  })

  test.each(['width-only', 'invalid-bounds'])('reserves legacy glyph padding for %s metrics', (mode) => {
    const { context, texts } = createMeasuredTextContext()
    context.measureText.mockImplementation(function (this: { font: string }) {
      const width = Number(/([\d.]+)px/.exec(this.font)![1]) * 3
      return mode === 'width-only'
        ? { width }
        : { width, actualBoundingBoxLeft: NaN, actualBoundingBoxRight: Infinity, actualBoundingBoxAscent: NaN, actualBoundingBoxDescent: NaN }
    })
    const renderOptions = { ...options, displayValue: true, fontOptions: 'italic', textAlign: 'right', marginRight: 0, marginBottom: 0 }
    drawBarCodeToCanvas(
      context as unknown as UniApp.CanvasContext,
      encode('CODE128', '12345'),
      renderOptions,
      { width: 200, height: 100 },
      'gjpqy',
      2
    )
    expect(texts[0].x).toBe(195)
    expect(texts[0].y).toBe(95)
  })

  test.each(formats.filter(([format]) => ['CODE128', 'EAN13', 'EAN8', 'UPC', 'UPCE'].includes(format)))(
    '%s keeps the same vertical layout with width-only and native text metrics',
    (format, value) => {
      for (const textPosition of ['top', 'bottom']) {
        for (const height of [45, 48, 100]) {
          const layouts = ['width-only', 'native-digits', 'native-descenders'].map((mode) => {
            const { context, texts } = createMeasuredTextContext()
            context.measureText.mockImplementation(function (this: { font: string }, text: string) {
              const size = Number(/([\d.]+)px/.exec(this.font)![1])
              const width = text.length * size * 0.6
              return mode === 'width-only'
                ? { width }
                : { width, actualBoundingBoxAscent: size * 0.7, actualBoundingBoxDescent: mode === 'native-digits' ? 0 : size * 0.15 }
            })
            const renderOptions = { ...options, format, displayValue: true, height, textPosition }
            const target: { encodings?: BarCodeRenderEncoding[] } = {}
            JsBarcode(target, value, { ...renderOptions, width: 2 })
            const render = () =>
              drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, target.encodings!, renderOptions, { width: 400, height }, value, 2)
            if (height === 45) {
              expect(render).toThrow('increase height')
              expect(context.fillRect).not.toHaveBeenCalled()
              return null
            }
            render()
            expect(texts[0].y).toBe(textPosition === 'top' ? 30 : height - 15)
            return { texts, bars: context.fillRect.mock.calls }
          })
          expect(layouts[1]).toEqual(layouts[0])
          expect(layouts[2]).toEqual(layouts[0])
        }
      }
    }
  )

  test.each(['top', 'bottom'])('expands the shared text box for unusually tall glyphs at %s', (textPosition) => {
    const { context, texts } = createMeasuredTextContext()
    context.measureText.mockReturnValue({ width: 50, actualBoundingBoxAscent: 24, actualBoundingBoxDescent: 8 })
    const renderOptions = { ...options, displayValue: true, marginTop: 0, marginBottom: 0, textPosition }
    drawBarCodeToCanvas(
      context as unknown as UniApp.CanvasContext,
      encode('CODE128', '12345'),
      renderOptions,
      { width: 200, height: 100 },
      'gjpqy',
      2
    )
    const { y } = texts[0]
    const [, barY, , barHeight] = context.fillRect.mock.calls[1]
    expect(y - 24).toBeGreaterThanOrEqual(0)
    expect(y + 8).toBeLessThanOrEqual(100)
    expect(textPosition === 'top' ? barY - y - 8 : y - 24 - barY - barHeight).toBe(2)
  })

  test.each(['EAN13', 'EAN8', 'UPC', 'UPCE'] as const)('%s renders custom text in full without guard bars crossing the label', (format) => {
    const value = formats.find(([item]) => item === format)![1]
    for (const textPosition of ['top', 'bottom']) {
      for (const textAlign of ['left', 'center', 'right']) {
        const { context, texts } = createMeasuredTextContext()
        const text = 'ABCDEFGHIJKLMNOPQRST'
        const renderOptions = { ...options, format, text, displayValue: true, textPosition, textAlign }
        const target: { encodings?: BarCodeRenderEncoding[] } = {}
        JsBarcode(target, value, { ...renderOptions, width: 2 })
        drawBarCodeToCanvas(context as unknown as UniApp.CanvasContext, target.encodings!, renderOptions, { width: 200, height: 100 }, text, 2)
        expect(texts).toHaveLength(1)
        expect(texts[0].text).toBe(text)
        expect(context.setTextAlign).toHaveBeenLastCalledWith(textAlign)
        const heights = context.fillRect.mock.calls.slice(1).map(([, , , height]) => height)
        expect(new Set(heights).size).toBe(1)
        expect(Number(/([\d.]+)px/.exec(texts[0].font)![1])).toBeLessThan(20)
      }
    }
  })
})
