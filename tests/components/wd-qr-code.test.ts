import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import WdQrCode from '@/uni_modules/wot-ui/components/wd-qr-code/wd-qr-code.vue'

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
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0
  }
}

beforeAll(() => {
  ;(globalThis as any).uni = {
    ...(globalThis as any).uni,
    createCanvasContext: vi.fn(() => createCanvasContextMock()),
    canvasToTempFilePath: vi.fn((options: Record<string, any>) => {
      options.success?.({ tempFilePath: '/tmp/wd-qr-code.png' })
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
  test('基本渲染', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn'
      }
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(wrapper.classes()).toContain('wd-qr-code')
    expect(wrapper.find('canvas').exists()).toBe(true)
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
    const tempFilePath = await (wrapper.vm as any).exportImage()

    expect(tempFilePath).toBe('/tmp/wd-qr-code.png')
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
    expect(createLinearGradientMock).toHaveBeenCalled()
  })
})
