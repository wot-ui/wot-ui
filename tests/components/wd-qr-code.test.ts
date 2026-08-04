import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import WdQrCode from '@/uni_modules/wot-ui/components/wd-qr-code/wd-qr-code.vue'
import { generateQRCode, QRErrorCorrectLevel } from '@/uni_modules/wot-ui/components/wd-qr-code/qrcode.js'

const drawMock = vi.fn()
const createLinearGradientMock = vi.fn(() => ({
  addColorStop: vi.fn()
}))

function createCanvasContextMock() {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    clip: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: createLinearGradientMock,
    draw: drawMock,
    scale: vi.fn(),
    setFillStyle: vi.fn(),
    setStrokeStyle: vi.fn(),
    setLineWidth: vi.fn()
  }
}

function getExpectedCanvasSize(size: number) {
  const shouldUsePixelRatio = process.env.UNI_PLATFORM === 'mp-alipay'
  return size * (shouldUsePixelRatio ? uni.getSystemInfoSync().pixelRatio || 1 : 1)
}

beforeAll(() => {
  ;(globalThis as any).uni = {
    ...(globalThis as any).uni,
    createCanvasContext: vi.fn(() => createCanvasContextMock()),
    canvasToTempFilePath: vi.fn((options: Record<string, any>) => {
      options.success?.({ tempFilePath: '/tmp/wd-qr-code.png', filePath: '/tmp/wd-qr-code.png' })
    }),
    getImageInfo: vi.fn((options: Record<string, any>) => {
      options.success?.({ path: options.src })
    })
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('WdQrCode', () => {
  test('二维码算法使用 ESM 命名导出', () => {
    const result = generateQRCode('https://wot-ui.cn', {
      errorCorrectLevel: QRErrorCorrectLevel.M
    })

    expect(result.moduleCount).toBeGreaterThan(0)
    expect(result.modules).toHaveLength(result.moduleCount)
    expect(result.errorCorrectLevel).toBe(QRErrorCorrectLevel.M)
  })

  test('二维码算法不包含 CommonJS 导出', () => {
    const source = readFileSync(resolve('src/uni_modules/wot-ui/components/wd-qr-code/qrcode.js'), 'utf8')

    expect(source).not.toMatch(/\bmodule\.exports\b/)
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn'
      }
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(wrapper.classes()).toContain('wd-qr-code')
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.attributes('id')).toBeTruthy()
    expect(canvas.attributes('canvas-id')).toBe(canvas.attributes('id'))
    const expectedCanvasSize = String(getExpectedCanvasSize(200))
    expect(canvas.attributes('width')).toBe(expectedCanvasSize)
    expect(canvas.attributes('height')).toBe(expectedCanvasSize)
    expect(vi.mocked(uni.createCanvasContext).mock.calls[0][0]).toBe(canvas.attributes('id'))
    expect(drawMock).toHaveBeenCalledWith(false, expect.any(Function))

    const context = vi.mocked(uni.createCanvasContext).mock.results[0].value as ReturnType<typeof createCanvasContextMock>
    // 默认方块按连续区间合并绘制，避免支付宝模拟器逐码点传递 Canvas 指令。
    expect(context.fillRect.mock.calls.length).toBeLessThan(300)
  })

  test('圆角码点使用单次路径批量填充', async () => {
    mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn',
        dotType: 'rounded'
      }
    })

    await Promise.resolve()
    await Promise.resolve()

    const context = vi.mocked(uni.createCanvasContext).mock.results[0].value as ReturnType<typeof createCanvasContextMock>
    expect(context.beginPath).toHaveBeenCalledTimes(1)
    expect(context.fill).toHaveBeenCalledTimes(1)
  })

  test('点击时触发 click 事件', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('支持导出二维码图片', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn',
        enableGradient: true,
        gradientColors: ['#111111', '#999999']
      }
    })

    await Promise.resolve()
    ;(wrapper.vm as any).$.setupState.pixelRatio = 2
    const tempFilePath = await (wrapper.vm as any).exportImage()
    const exportOptions = vi.mocked(uni.canvasToTempFilePath).mock.calls[0][0]

    expect(tempFilePath).toBe('/tmp/wd-qr-code.png')
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
    expect(exportOptions).toMatchObject({
      width: 400,
      height: 400,
      destWidth: 400,
      destHeight: 400
    })
    expect(createLinearGradientMock).toHaveBeenCalled()
  })
})
