import { mount } from '@vue/test-utils'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import WdBarCode from '@/uni_modules/wot-ui/components/wd-bar-code/wd-bar-code.vue'
import JsBarcode from '@/uni_modules/wot-ui/components/wd-bar-code/barCode'

vi.mock('@/uni_modules/wot-ui/components/wd-bar-code/barCode', () => ({
  default: vi.fn((target: { encodings?: Array<{ data: string; text: string }> }, value: string, options?: { valid?: (valid: boolean) => void }) => {
    target.encodings = [{ data: '1010010110', text: String(value) }]
    options?.valid?.(true)
  })
}))

const drawMock = vi.fn((_reserve?: boolean, callback?: () => void) => {
  callback?.()
})

const canvasContextMocks: Array<ReturnType<typeof createCanvasContextMock>> = []
const canvasNodeMocks: Array<{ width: number; height: number; getContext: any }> = []
const originalMy = (globalThis as any).my

function createCanvasContextMock() {
  return {
    font: '',
    fillStyle: '',
    textAlign: '',
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(function (this: { font: string }, text: string) {
      const fontSize = Number(/([\d.]+)px/.exec(this.font)?.[1] || 10)
      const width = Array.from(text).length * fontSize * 0.6
      if (!isWechatPlatform()) return { width }
      return { width, actualBoundingBoxLeft: 0, actualBoundingBoxRight: width, actualBoundingBoxAscent: fontSize, actualBoundingBoxDescent: 0 }
    }),
    translate: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    draw: drawMock,
    scale: vi.fn(),
    setTransform: vi.fn(),
    setFillStyle: vi.fn(),
    setFontSize: vi.fn(),
    setTextAlign: vi.fn()
  }
}

function createTrackedCanvasContextMock() {
  const context = createCanvasContextMock()
  canvasContextMocks.push(context)
  return context
}

function createCanvasNodeMock() {
  const context = createTrackedCanvasContextMock()
  const node = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => context)
  }

  canvasNodeMocks.push(node)
  return node
}

function createSelectorQueryMock() {
  const query: any = {
    in: vi.fn(() => query),
    select: vi.fn(() => query),
    node: vi.fn((callback: (res: { node: ReturnType<typeof createCanvasNodeMock> }) => void) => {
      callback({ node: createCanvasNodeMock() })
      return query
    }),
    exec: vi.fn()
  }

  return query
}

function getExpectedCanvasSize(size: number) {
  return size
}

function isWechatPlatform() {
  return process.env.UNI_PLATFORM === 'mp-weixin'
}

function isHiDpiPlatform() {
  return ['h5', 'app', 'app-plus', 'mp-weixin'].includes(process.env.UNI_PLATFORM || 'h5')
}

function getLastCanvasContextMock() {
  return canvasContextMocks.at(-1) || (vi.mocked(uni.createCanvasContext).mock.results.at(-1)?.value as ReturnType<typeof createCanvasContextMock>)
}

async function waitForDraw(wrapper: VueWrapper<any>) {
  await Promise.resolve()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 0))
  await wrapper.vm.exportImage()
  await Promise.resolve()
}

beforeAll(() => {
  Object.assign((globalThis as any).uni, {
    createCanvasContext: vi.fn(() => createTrackedCanvasContextMock()),
    createSelectorQuery: vi.fn(() => createSelectorQueryMock()),
    canvasToTempFilePath: vi.fn((options: Record<string, any>) => {
      options.success?.({ tempFilePath: '/tmp/wd-bar-code.png', filePath: '/tmp/wd-bar-code.png' })
    })
  })
})

beforeEach(() => {
  vi.clearAllMocks()
  drawMock.mockImplementation((_reserve, callback) => callback?.())
  canvasContextMocks.length = 0
  canvasNodeMocks.length = 0
  vi.mocked(uni.createCanvasContext).mockImplementation(() => createTrackedCanvasContextMock() as any)
  vi.mocked(uni.createSelectorQuery).mockImplementation(() => createSelectorQueryMock() as any)
  vi.mocked(uni.canvasToTempFilePath).mockImplementation((options: Record<string, any>) => {
    options.success?.({ tempFilePath: '/tmp/wd-bar-code.png', filePath: '/tmp/wd-bar-code.png' })
  })
  vi.mocked(JsBarcode).mockImplementation(
    (target: { encodings?: Array<{ data: string; text: string }> }, value: string, options?: { valid?: (valid: boolean) => void }) => {
      target.encodings = [{ data: '1010010110', text: String(value) }]
      options?.valid?.(true)
    }
  )
})

afterEach(() => {
  vi.useRealTimers()
  ;(globalThis as any).my = originalMy
})

describe('WdBarCode', () => {
  test('条形码算法使用 TS 默认导出', () => {
    const source = readFileSync(resolve('src/uni_modules/wot-ui/components/wd-bar-code/barCode.ts'), 'utf8')

    expect(source).toContain('export default JsBarcode')
    expect(existsSync(resolve('src/uni_modules/wot-ui/components/wd-bar-code/barCode.js'))).toBe(false)
    expect(existsSync(resolve('src/uni_modules/wot-ui/components/wd-bar-code/barCode.d.ts'))).toBe(false)
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await waitForDraw(wrapper)

    expect(wrapper.classes()).toContain('wd-bar-code')
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.attributes('id')).toContain('wd-bar-code-')
    expect(canvas.attributes('canvas-id')).toBe(canvas.attributes('id'))
    if (isWechatPlatform()) {
      expect(canvas.attributes('width')).toBeUndefined()
      expect(canvas.attributes('height')).toBeUndefined()
      expect(canvasNodeMocks.at(-1)?.width).toBe(400)
      expect(canvasNodeMocks.at(-1)?.height).toBe(200)
    } else {
      expect(canvas.attributes('width')).toBe(String(getExpectedCanvasSize(200)))
      expect(canvas.attributes('height')).toBe(String(getExpectedCanvasSize(100)))
      expect(vi.mocked(uni.createCanvasContext).mock.calls[0][0]).toBe(canvas.attributes('id'))
    }
    if (!isWechatPlatform()) {
      expect(drawMock).toHaveBeenCalledWith(false, expect.any(Function))
    }
    const context = getLastCanvasContextMock()
    if (isWechatPlatform()) {
      expect(context.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0)
      expect(drawMock).not.toHaveBeenCalled()
    } else {
      expect(context.scale).not.toHaveBeenCalled()
    }
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 200, 100)
    expect(context.fillRect.mock.calls[1]).toEqual([10, 10, 18, 53])
    expect(context.fillText).toHaveBeenCalledWith('1234567890', 100, 85)
  })

  test('height 控制整体高度并按比例保留 guard bar 高度', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (
        target: { encodings?: Array<{ data: string; text: string; options?: Record<string, unknown> }> },
        _value: string,
        options?: { valid?: (valid: boolean) => void }
      ) => {
        target.encodings = [
          { data: '1', text: '', options: { height: 112 } },
          { data: '1', text: '12' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '12',
        format: 'EAN13'
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    const guardBar = context.fillRect.mock.calls[1]
    const normalBar = context.fillRect.mock.calls[2]

    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 200, 100)
    expect(guardBar[3]).toBe(65)
    expect(normalBar[3]).toBe(53)
  })

  test('top text baseline does not subtract textMargin', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '12345',
        textPosition: 'top',
        marginTop: 4,
        fontSize: 16,
        textMargin: 10
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.fillText).toHaveBeenCalledWith('12345', 100, 20)
  })

  test('UPC guard bar 不会覆盖底部数字区域', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (
        target: { encodings?: Array<{ data: string; text: string; options?: Record<string, unknown> }> },
        _value: string,
        options?: { valid?: (valid: boolean) => void }
      ) => {
        target.encodings = [
          { data: '10101010', text: '1' },
          { data: '101', text: '', options: { height: 112 } },
          { data: '001100100110010011001001100100110010011001', text: '23456' },
          { data: '101', text: '', options: { height: 112 } },
          { data: '01010101', text: '2' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '12345678901',
        format: 'UPC'
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    const guardBars = context.fillRect.mock.calls.filter((call) => call[3] === 65)

    expect(guardBars.length).toBeGreaterThan(0)
    expect(context.fillText.mock.calls[0][2]).toBe(85)
  })

  test('向 JsBarcode 传递常用配置', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '690123456789',
        format: 'EAN13',
        width: 260,
        height: 80,
        text: 'WOT-UI',
        font: 'Arial',
        fontSize: 16,
        fontOptions: 'bold italic',
        textMargin: 10,
        background: '#E0EAFF',
        lineColor: '#4D80F0',
        margin: 12,
        marginTop: 4,
        marginBottom: 6,
        marginLeft: 8,
        marginRight: 10,
        displayValue: false,
        textAlign: 'right',
        textPosition: 'top'
      }
    })

    await waitForDraw(wrapper)

    expect(JsBarcode).toHaveBeenCalledWith(
      expect.any(Object),
      '690123456789',
      expect.objectContaining({
        format: 'EAN13',
        width: 2,
        height: 80,
        text: 'WOT-UI',
        font: 'Arial',
        fontSize: 16,
        fontOptions: 'bold italic',
        textMargin: 10,
        background: '#E0EAFF',
        lineColor: '#4D80F0',
        margin: 12,
        marginTop: 4,
        marginBottom: 6,
        marginLeft: 8,
        marginRight: 10,
        displayValue: false,
        textAlign: 'right',
        textPosition: 'top'
      })
    )
    expect(wrapper.find('canvas').attributes('style')).toContain('width: 260px')
    expect(wrapper.find('canvas').attributes('style')).toContain('height: 80px')
    const context = getLastCanvasContextMock()
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 260, 80)
    expect(context.fillRect.mock.calls[1][0]).toBe(8)
    expect(context.fillRect.mock.calls[1][1]).toBe(4)
    expect(context.fillRect.mock.calls[1][2]).toBe(24)
    expect(context.fillRect.mock.calls[1][3]).toBe(70)
  })

  test('空字符串不渲染 canvas', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: ''
      }
    })

    await expect(wrapper.vm.exportImage()).rejects.toThrow('Barcode value is empty')

    expect(wrapper.find('canvas').exists()).toBe(false)
    expect(JsBarcode).not.toHaveBeenCalled()
  })

  test('value 更新后重新绘制', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '123'
      }
    })

    await waitForDraw(wrapper)
    vi.mocked(JsBarcode).mockClear()
    await wrapper.setProps({ value: '456789' })
    await waitForDraw(wrapper)

    expect(JsBarcode).toHaveBeenLastCalledWith(expect.any(Object), '456789', expect.any(Object))
  })

  test('同一 tick 内重复请求只绘制最后一次状态', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '123'
      }
    })

    await waitForDraw(wrapper)
    vi.mocked(JsBarcode).mockClear()

    await wrapper.setProps({ value: '456' })
    await wrapper.setProps({ value: '789' })
    await waitForDraw(wrapper)

    expect(JsBarcode).toHaveBeenCalledTimes(1)
    expect(JsBarcode).toHaveBeenLastCalledWith(expect.any(Object), '789', expect.any(Object))
  })

  test('valid 事件透传校验结果', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await waitForDraw(wrapper)

    expect(wrapper.emitted('valid')).toBeTruthy()
    expect(wrapper.emitted('valid')![0]).toEqual([true])
  })

  test('仅修改样式也会重新触发 valid，不要求校验结果变化', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await wrapper.vm.exportImage()
    expect(wrapper.emitted('valid')).toEqual([[true]])
    await wrapper.setProps({ lineColor: '#ff0000' })
    await wrapper.vm.exportImage()
    expect(wrapper.emitted('valid')).toEqual([[true], [true]])
    wrapper.unmount()
  })

  test.each(
    (['margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'textMargin'] as const).flatMap((key) =>
      [-100, NaN, Infinity, -Infinity].flatMap((value) =>
        (key === 'textMargin' ? ['top', 'bottom'] : ['bottom']).map((textPosition) => ({ key, value, textPosition }))
      )
    )
  )('非法边距 $key=$value ($textPosition) 阻止首次绘制、旧图导出并允许恢复', async ({ key, value, textPosition }) => {
    const wrapper = mount(WdBarCode, { props: { value: '12345', [key]: value, textPosition } })
    const message = `Barcode ${key} must be a non-negative finite number`
    await expect(wrapper.vm.exportImage()).rejects.toThrow(message)
    expect(JsBarcode).not.toHaveBeenCalled()
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')).toHaveLength(1)

    await wrapper.setProps({ [key]: 0 })
    await expect(wrapper.vm.exportImage()).resolves.toBe('/tmp/wd-bar-code.png')
    const context = getLastCanvasContextMock()
    context.fillRect.mockClear()
    vi.mocked(JsBarcode).mockClear()
    vi.mocked(uni.canvasToTempFilePath).mockClear()

    await wrapper.setProps({ [key]: value })
    await expect(wrapper.vm.exportImage()).rejects.toThrow(message)
    expect(JsBarcode).not.toHaveBeenCalled()
    expect(context.fillRect).not.toHaveBeenCalled()
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')

    await wrapper.setProps({ [key]: 0.5 })
    await expect(wrapper.vm.exportImage()).resolves.toBe('/tmp/wd-bar-code.png')
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: visible')
    wrapper.unmount()
  })

  test.each([0, -1, NaN, Infinity, -Infinity])('非法宽度 %s 禁止绘制和导出，修正或移除后恢复', async (width) => {
    const wrapper = mount(WdBarCode, { props: { value: '12345', width } })
    await expect(wrapper.vm.exportImage()).rejects.toThrow('Barcode width must be a positive finite number')
    expect(uni.createCanvasContext).not.toHaveBeenCalled()
    expect(uni.createSelectorQuery).not.toHaveBeenCalled()
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')).toHaveLength(1)

    await wrapper.setProps({ width: 260.5 })
    await expect(wrapper.vm.exportImage()).resolves.toBe('/tmp/wd-bar-code.png')
    expect(wrapper.find('canvas').attributes('style')).toContain('width: 260.5px')
    const context = getLastCanvasContextMock()
    context.fillRect.mockClear()
    vi.mocked(uni.canvasToTempFilePath).mockClear()

    await wrapper.setProps({ width })
    await expect(wrapper.vm.exportImage()).rejects.toThrow('Barcode width must be a positive finite number')
    expect(context.fillRect).not.toHaveBeenCalled()
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')

    await wrapper.setProps({ width: undefined })
    await expect(wrapper.vm.exportImage()).resolves.toBe('/tmp/wd-bar-code.png')
    expect(wrapper.find('canvas').attributes('style')).toContain('width: 200px')
    wrapper.unmount()
  })

  test('单侧零边距覆盖 margin，移除后恢复公共边距', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345', margin: 6, marginLeft: 0 } })
    await wrapper.vm.exportImage()
    const context = getLastCanvasContextMock()
    expect(context.fillRect.mock.calls[1][0]).toBe(0)
    context.fillRect.mockClear()
    await wrapper.setProps({ marginLeft: undefined })
    await wrapper.vm.exportImage()
    expect(context.fillRect.mock.calls[1][0]).toBe(6)
    wrapper.unmount()
  })

  test('不支持的格式触发 error 事件', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890',
        format: 'UNKNOWN'
      }
    })

    await expect(wrapper.vm.exportImage()).rejects.toThrow('Unsupported barcode format: UNKNOWN')

    expect(JsBarcode).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')).toBeTruthy()
    expect((wrapper.emitted('error')![0][0] as Error).message).toBe('Unsupported barcode format: UNKNOWN')
  })

  test('内容超长触发 error 事件', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1'.repeat(129)
      }
    })

    await expect(wrapper.vm.exportImage()).rejects.toThrow('Barcode value exceeds max length 128')

    expect(JsBarcode).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')).toBeTruthy()
    expect((wrapper.emitted('error')![0][0] as Error).message).toBe('Barcode value exceeds max length 128')
  })

  test('JsBarcode 抛错时触发 error 事件', async () => {
    const renderError = new Error('render failed')
    vi.mocked(JsBarcode).mockImplementationOnce(() => {
      throw renderError
    })

    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await expect(wrapper.vm.exportImage()).rejects.toBe(renderError)

    expect(wrapper.emitted('error')![0]).toEqual([renderError])
  })

  test('支持导出条形码图片', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    ;(wrapper.vm as any).$.setupState.pixelRatio = 2
    const tempFilePath = await wrapper.vm.exportImage()
    const exportOptions = vi.mocked(uni.canvasToTempFilePath).mock.calls[0][0]

    expect(tempFilePath).toBe('/tmp/wd-bar-code.png')
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
    expect(exportOptions).toMatchObject({
      width: isWechatPlatform() ? 400 : 200,
      height: isWechatPlatform() ? 200 : 100,
      destWidth: 400,
      destHeight: 200
    })
  })

  test('导出失败时 reject', async () => {
    const exportError = new Error('export failed')
    vi.mocked(uni.canvasToTempFilePath).mockImplementationOnce((options: any) => {
      options.fail?.(exportError)
    })
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await expect(wrapper.vm.exportImage()).rejects.toBe(exportError)
  })

  test('导出成功回调没有图片路径时 reject', async () => {
    vi.mocked(uni.canvasToTempFilePath).mockImplementationOnce((options: any) => options.success({}))
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await expect(wrapper.vm.exportImage()).rejects.toThrow('Canvas export did not return an image path')
  })

  test('多段编码时仅绘制一次文字，避免 EAN/UPC 文字重叠', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (target: { encodings?: Array<{ data: string; text: string }> }, _value: string, options?: { valid?: (valid: boolean) => void }) => {
        target.encodings = [
          { data: '101', text: '1' },
          { data: '0011001', text: '2' },
          { data: '01010', text: '' },
          { data: '1100110', text: '3' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '123',
        format: 'EAN8'
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.fillText).toHaveBeenCalledTimes(3)
    expect(context.fillText.mock.calls[0][0]).toBe('1')
    expect(context.fillText.mock.calls[0][1]).toBe(22.5)
    expect(context.fillText.mock.calls[0][2]).toBe(85)
    expect(context.fillText.mock.calls[1][0]).toBe('2')
    expect(context.fillText.mock.calls[1][1]).toBe(63.5)
    expect(context.fillText.mock.calls[1][2]).toBe(85)
    expect(context.fillText.mock.calls[2][0]).toBe('3')
    expect(context.fillText.mock.calls[2][1]).toBe(161.5)
    expect(context.fillText.mock.calls[2][2]).toBe(85)
  })

  test('多段文字空间不足时退回整行文字避免重叠', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (target: { encodings?: Array<{ data: string; text: string }> }, _value: string, options?: { valid?: (valid: boolean) => void }) => {
        target.encodings = [
          { data: '101', text: '12345' },
          { data: '0011001', text: '67890' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890',
        width: 60
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.fillText).toHaveBeenCalledTimes(1)
    expect(context.fillText).toHaveBeenCalledWith('1234567890', 30, 88.5)
  })

  test('EAN8 narrow width shrinks text to avoid clipping', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (target: { encodings?: Array<{ data: string; text: string }> }, _value: string, options?: { valid?: (valid: boolean) => void }) => {
        target.encodings = [
          { data: '101', text: '1' },
          { data: '0011001', text: '1234' },
          { data: '01010', text: '' },
          { data: '1100110', text: '7' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567',
        format: 'EAN8',
        width: 70,
        font: 'Arial',
        fontOptions: 'bold italic',
        fontSize: 16,
        textMargin: 10
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.font).toBe(isWechatPlatform() ? 'italic bold 6px Arial' : 'italic bold 5px Arial')
    expect(context.fillText).toHaveBeenCalledTimes(3)
    expect(context.fillText.mock.calls[0][0]).toBe('1')
    expect(context.fillText.mock.calls.at(-1)?.[0]).toBe('7')
  })

  test('UPCE 首尾外置数字绘制在画布内', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (target: { encodings?: Array<{ data: string; text: string }> }, _value: string, options?: { valid?: (valid: boolean) => void }) => {
        target.encodings = [
          { data: '10101010', text: '0' },
          { data: '101', text: '' },
          { data: '001100100110010011001001100100110010011001', text: '123456' },
          { data: '101010', text: '' },
          { data: '01010101', text: '5' }
        ]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '123456',
        format: 'UPCE'
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.fillText.mock.calls[0][0]).toBe('0')
    expect(context.fillText.mock.calls[0][1]).toBe(20.5)
    expect(context.fillText.mock.calls[0][2]).toBe(85)
    expect(context.fillText.mock.calls.at(-1)?.[0]).toBe('5')
    expect(context.fillText.mock.calls.at(-1)?.[1]).toBe(179.5)
    if (isWechatPlatform()) {
      expect(context.textAlign).toBe('center')
    } else {
      expect(context.setTextAlign).toHaveBeenCalledWith('center')
    }
  })

  test('放大后的末尾条按全局模块边界收口', async () => {
    vi.mocked(JsBarcode).mockImplementation(
      (target: { encodings?: Array<{ data: string; text: string }> }, value: string, options?: { valid?: (valid: boolean) => void }) => {
        target.encodings = [{ data: `${'0'.repeat(88)}11`, text: String(value) }]
        options?.valid?.(true)
      }
    )

    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890',
        width: 257,
        displayValue: false
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    const lastBar = context.fillRect.mock.calls.at(-1)

    expect(lastBar).toEqual(isHiDpiPlatform() ? [241.5, 10, 5.5, 80] : [242, 10, 5, 80])
    expect((lastBar?.[0] as number) + (lastBar?.[2] as number)).toBe(247)
  })

  test('父组件更新 value 后立即导出使用新内容', async () => {
    const value = ref('12345')
    const wrapper = mount(defineComponent(() => () => h(WdBarCode, { value: value.value })))
    const barcode = wrapper.findComponent(WdBarCode)
    await waitForDraw(barcode)
    const context = getLastCanvasContextMock()
    vi.mocked(uni.canvasToTempFilePath).mockImplementation((options: any) => {
      expect(context.fillText.mock.calls.at(-1)?.[0]).toBe('67890')
      options.success({ tempFilePath: '/tmp/latest.png' })
    })

    value.value = '67890'
    await expect(barcode.vm.exportImage()).resolves.toBe('/tmp/latest.png')
  })

  test.skipIf(isWechatPlatform())('导出等待超过 16ms 的 draw 回调及期间新增的绘制', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    vi.useFakeTimers()
    const callbacks: Array<() => void> = []
    drawMock.mockImplementation((_reserve, callback) => {
      if (callback) callbacks.push(callback)
    })

    await wrapper.setProps({ value: '67890' })
    const exporting = wrapper.vm.exportImage()
    await vi.advanceTimersByTimeAsync(30)
    expect(callbacks).toHaveLength(1)
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')

    await wrapper.setProps({ value: '24680' })
    callbacks.shift()!()
    await vi.advanceTimersByTimeAsync(30)
    expect(callbacks).toHaveLength(1)
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    callbacks.shift()!()
    await exporting
    expect(getLastCanvasContextMock().fillText.mock.calls.at(-1)?.[0]).toBe('24680')
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: visible')
  })

  test.skipIf(isWechatPlatform())('draw 超时拒绝导出且允许之后恢复', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    vi.useFakeTimers()
    drawMock.mockImplementation(() => undefined)
    await wrapper.setProps({ value: '67890' })
    const result = expect(wrapper.vm.exportImage()).rejects.toThrow('Canvas draw timed out')
    await vi.advanceTimersByTimeAsync(5100)
    await result
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')

    drawMock.mockImplementation((_reserve, callback) => callback?.())
    await wrapper.setProps({ value: '24680' })
    const recovery = wrapper.vm.exportImage()
    await vi.advanceTimersByTimeAsync(10)
    await expect(recovery).resolves.toBe('/tmp/wd-bar-code.png')
  })

  test.skipIf(isWechatPlatform())('draw 抛错时隐藏旧图并拒绝导出', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    const error = new Error('draw failed')
    drawMock.mockImplementation(() => {
      throw error
    })
    await wrapper.setProps({ value: '67890' })
    await expect(wrapper.vm.exportImage()).rejects.toBe(error)
    expect(wrapper.emitted('error')?.at(-1)).toEqual([error])
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
  })

  test.skipIf(isWechatPlatform())('支付宝原生上下文使用 draw(false, callback) 并等待完成', async () => {
    const context = createCanvasContextMock()
    let finish: (() => void) | undefined
    const draw = vi.fn((_reserve: boolean, callback: () => void) => {
      finish = callback
    })
    ;(globalThis as any).my = { createCanvasContext: () => ({ ...context, draw }) }
    vi.useFakeTimers()
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    const exporting = wrapper.vm.exportImage()
    await vi.advanceTimersByTimeAsync(30)
    expect(draw).toHaveBeenCalledWith(false, expect.any(Function))
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    finish!()
    await expect(exporting).resolves.toBe('/tmp/wd-bar-code.png')
  })

  test('字体样式应用到上下文并可恢复默认', async () => {
    const wrapper = mount(WdBarCode, { props: { value: '12345', font: 'Arial', fontOptions: 'bold italic', fontSize: 16 } })
    await waitForDraw(wrapper)
    const context = getLastCanvasContextMock()
    expect(context.font).toBe('italic bold 16px Arial')
    await wrapper.setProps({ fontOptions: '', font: 'monospace' })
    await waitForDraw(wrapper)
    expect(context.font).toBe('normal normal 16px monospace')
  })

  test.each([
    { value: '1'.repeat(129) },
    { format: 'UNKNOWN' },
    { value: '' },
    { width: 21 },
    { height: 30, textPosition: 'top' },
    { height: 30, textPosition: 'bottom' }
  ])('无效更新 %o 隐藏旧码、禁止导出，恢复后可导出', async (props) => {
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    await wrapper.setProps(props)
    await expect(wrapper.vm.exportImage()).rejects.toBeInstanceOf(Error)
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
    const canvas = wrapper.find('canvas')
    expect(!canvas.exists() || canvas.attributes('style')?.includes('visibility: hidden')).toBe(true)

    await wrapper.setProps({ value: '67890', format: 'auto', width: 200, height: 100, textPosition: 'bottom' })
    await expect(wrapper.vm.exportImage()).resolves.toBe('/tmp/wd-bar-code.png')
    expect(getLastCanvasContextMock().fillText.mock.calls.at(-1)?.[0]).toBe('67890')
  })

  test('真实编码校验失败时隐藏旧图并拒绝导出', async () => {
    const { default: realJsBarcode } = await vi.importActual<typeof import('@/uni_modules/wot-ui/components/wd-bar-code/barCode')>(
      '@/uni_modules/wot-ui/components/wd-bar-code/barCode'
    )
    vi.mocked(JsBarcode).mockImplementation(realJsBarcode)
    const wrapper = mount(WdBarCode, { props: { value: '12345670', format: 'EAN8' } })
    await waitForDraw(wrapper)
    vi.mocked(uni.canvasToTempFilePath).mockClear()
    await wrapper.setProps({ value: '12345671' })
    await expect(wrapper.vm.exportImage()).rejects.toThrow('Invalid barcode value')
    expect(wrapper.emitted('valid')?.at(-1)).toEqual([false])
    expect(wrapper.find('canvas').attributes('style')).toContain('visibility: hidden')
    expect(uni.canvasToTempFilePath).not.toHaveBeenCalled()
  })

  test('真实长 CODE128 在高清画布上保留 70 段黑条及间隔', async () => {
    const { default: realJsBarcode } = await vi.importActual<typeof import('@/uni_modules/wot-ui/components/wd-bar-code/barCode')>(
      '@/uni_modules/wot-ui/components/wd-bar-code/barCode'
    )
    vi.mocked(JsBarcode).mockImplementation(realJsBarcode)
    const wrapper = mount(WdBarCode, { props: { value: 'ABCDEFGHIJKLMNOPQRST', format: 'CODE128', displayValue: false } })
    if (!isHiDpiPlatform()) {
      await expect(wrapper.vm.exportImage()).rejects.toThrow('increase width')
      await wrapper.setProps({ width: 300 })
    }
    await waitForDraw(wrapper)
    const bars = getLastCanvasContextMock().fillRect.mock.calls.slice(1)
    expect(bars).toHaveLength(70)
    bars.forEach(([x, , width], index) => {
      expect(width).toBeGreaterThanOrEqual(0.5)
      if (index > 0) {
        expect(x - bars[index - 1][0] - bars[index - 1][2]).toBeGreaterThanOrEqual(0.5)
      }
    })
    expect(wrapper.find('canvas').attributes('style')).toContain(isHiDpiPlatform() ? 'width: 200px' : 'width: 300px')
  })

  test.runIf(isWechatPlatform())('节点重建后丢弃迟到的查询，绘制和导出使用新节点', async () => {
    const oldNode = createCanvasNodeMock()
    const oldContext = oldNode.getContext()
    let finishQuery: ((result: { node: typeof oldNode }) => void) | undefined
    const query = createSelectorQueryMock()
    query.node.mockImplementation((callback: typeof finishQuery) => {
      finishQuery = callback
      return query
    })
    vi.mocked(uni.createSelectorQuery).mockImplementationOnce(() => query)
    const wrapper = mount(WdBarCode, { props: { value: '12345' } })
    await vi.waitFor(() => expect(finishQuery).toBeDefined())
    const originalElement = wrapper.find('canvas').element
    await wrapper.setProps({ value: '' })
    expect(wrapper.find('canvas').exists()).toBe(false)
    await wrapper.setProps({ value: '67890' })
    expect(wrapper.find('canvas').element).not.toBe(originalElement)
    finishQuery!({ node: oldNode })
    await wrapper.vm.exportImage()

    expect(uni.createSelectorQuery).toHaveBeenCalledTimes(2)
    expect(oldContext.fillRect).not.toHaveBeenCalled()
    expect(oldContext.fillText).not.toHaveBeenCalled()
    const newNode = canvasNodeMocks.at(-1)!
    expect(newNode).not.toBe(oldNode)
    expect(newNode.getContext().fillText).toHaveBeenLastCalledWith('67890', 100, 85)
    expect((vi.mocked(uni.canvasToTempFilePath).mock.calls.at(-1)?.[0] as any).canvas).toBe(newNode)
    expect(wrapper.emitted('error')).toBeUndefined()
    wrapper.unmount()
  })

  test.each([
    ['ITF14', '1234567890123', '12345678901231'],
    ['MSI10', '123456', '1234566'],
    ['codabar', 'A123456A', '123456']
  ])('%s 默认显示编码器文字，自定义 text 可覆盖并恢复', async (format, value, expectedText) => {
    const { default: realJsBarcode } = await vi.importActual<typeof import('@/uni_modules/wot-ui/components/wd-bar-code/barCode')>(
      '@/uni_modules/wot-ui/components/wd-bar-code/barCode'
    )
    vi.mocked(JsBarcode).mockImplementation(realJsBarcode)
    const wrapper = mount(WdBarCode, { props: { value, format } })
    await waitForDraw(wrapper)
    const context = getLastCanvasContextMock()
    expect(context.fillText).toHaveBeenLastCalledWith(expectedText, 100, 85)

    await wrapper.setProps({ text: 'WOT-UI' })
    await waitForDraw(wrapper)
    expect(context.fillText).toHaveBeenLastCalledWith('WOT-UI', 100, 85)
    await wrapper.setProps({ text: '' })
    await waitForDraw(wrapper)
    expect(context.fillText).toHaveBeenLastCalledWith(expectedText, 100, 85)
  })

  test.each([
    ['EAN13', '6901234567892'],
    ['EAN8', '12345670'],
    ['UPC', '036000291452'],
    ['UPCE', '123456']
  ])('%s 自定义文字完整显示，清空 text 后恢复分段数字', async (format, value) => {
    const { default: realJsBarcode } = await vi.importActual<typeof import('@/uni_modules/wot-ui/components/wd-bar-code/barCode')>(
      '@/uni_modules/wot-ui/components/wd-bar-code/barCode'
    )
    vi.mocked(JsBarcode).mockImplementation(realJsBarcode)
    const wrapper = mount(WdBarCode, { props: { value, format } })
    await waitForDraw(wrapper)
    const context = getLastCanvasContextMock()
    const defaultTexts = context.fillText.mock.calls.map(([text]) => text)
    expect(defaultTexts.length).toBeGreaterThan(1)
    context.fillText.mockClear()

    const text = 'ABCDEFGHIJKLMNOPQRST'
    await wrapper.setProps({ text, textAlign: 'right' })
    await wrapper.vm.exportImage()
    expect(context.fillText).toHaveBeenCalledTimes(1)
    expect(context.fillText.mock.calls[0][0]).toBe(text)
    expect(wrapper.emitted('error')).toBeUndefined()
    context.fillText.mockClear()

    await wrapper.setProps({ text: '' })
    await waitForDraw(wrapper)
    expect(context.fillText.mock.calls.map(([text]) => text)).toEqual(defaultTexts)
    wrapper.unmount()
  })
})
