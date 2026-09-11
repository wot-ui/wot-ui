import { mount } from '@vue/test-utils'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
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

function createCanvasContextMock() {
  return {
    font: '',
    fillStyle: '',
    textAlign: '',
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn((text: string) => ({ width: String(text).length * 10 })),
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
    expect(drawMock).toHaveBeenCalledWith(false, expect.any(Function))
    const context = getLastCanvasContextMock()
    if (isWechatPlatform()) {
      expect(context.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0)
    } else {
      expect(context.scale).not.toHaveBeenCalled()
    }
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 200, 100)
    expect(context.fillRect.mock.calls[1]).toEqual([10, 10, 18, 58])
    expect(context.fillText).toHaveBeenCalledWith('1234567890', 100, 90)
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
    expect(guardBar[3]).toBe(70)
    expect(normalBar[3]).toBe(58)
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
    const guardBars = context.fillRect.mock.calls.filter((call) => call[3] === 70)

    expect(guardBars.length).toBeGreaterThan(0)
    expect(context.fillText.mock.calls[0][2]).toBe(90)
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
    expect(wrapper.find('canvas').attributes('width')).toBe(String(getExpectedCanvasSize(260)))
    expect(wrapper.find('canvas').attributes('height')).toBe(String(getExpectedCanvasSize(80)))
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

    await waitForDraw(wrapper)

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

  test('不支持的格式触发 error 事件', async () => {
    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890',
        format: 'UNKNOWN'
      }
    })

    await waitForDraw(wrapper)

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

    await waitForDraw(wrapper)

    expect(JsBarcode).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')).toBeTruthy()
    expect((wrapper.emitted('error')![0][0] as Error).message).toBe('Barcode value exceeds max length 128')
  })

  test('JsBarcode 抛错时触发 error 事件', async () => {
    const renderError = new Error('render failed')
    vi.mocked(JsBarcode).mockImplementationOnce(() => {
      throw renderError
    })
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const wrapper = mount(WdBarCode, {
      props: {
        value: '1234567890'
      }
    })

    await waitForDraw(wrapper)

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
      width: 400,
      height: 200,
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
    expect(context.fillText.mock.calls[0][2]).toBe(90)
    expect(context.fillText.mock.calls[1][0]).toBe('2')
    expect(context.fillText.mock.calls[1][1]).toBe(63.5)
    expect(context.fillText.mock.calls[1][2]).toBe(90)
    expect(context.fillText.mock.calls[2][0]).toBe('3')
    expect(context.fillText.mock.calls[2][1]).toBe(161.5)
    expect(context.fillText.mock.calls[2][2]).toBe(90)
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
    expect(context.fillText).toHaveBeenCalledWith('1234567890', 30, 90)
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
        fontSize: 16,
        textMargin: 10
      }
    })

    await waitForDraw(wrapper)

    const context = getLastCanvasContextMock()
    expect(context.setFontSize).toHaveBeenCalledWith(6)
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
    expect(context.fillText.mock.calls[0][2]).toBe(90)
    expect(context.fillText.mock.calls.at(-1)?.[0]).toBe('5')
    expect(context.fillText.mock.calls.at(-1)?.[1]).toBe(179.5)
    expect(context.setTextAlign).toHaveBeenCalledWith('center')
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

    expect(lastBar).toEqual([242, 10, 5, 80])
    expect((lastBar?.[0] as number) + (lastBar?.[2] as number)).toBe(247)
  })
})
