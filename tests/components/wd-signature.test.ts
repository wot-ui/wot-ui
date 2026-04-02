import { config, mount } from '@vue/test-utils'
import WdSignature from '@/uni_modules/wot-design-uni/components/wd-signature/wd-signature.vue'
import WdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
config.global.components = { WdLoading }

const touchEvent = (x: number, y: number) => ({
  preventDefault: vi.fn(),
  touches: [{ x, y }]
})

describe('WdSignature', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 基本渲染测试
  test('基本渲染', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    expect(wrapper.classes()).toContain('wd-signature')
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  // Props 测试 - 尺寸相关
  test('自定义画布尺寸', () => {
    const wrapper = mount(WdSignature, {
      props: {
        width: 300,
        height: 200
      },
      global: {
        components: { WdButton }
      }
    })

    const vm = wrapper.vm as any
    expect(vm.width).toBe(300)
    expect(vm.height).toBe(200)
    expect(vm.canvasStyle).toContain('width:300px')
    expect(vm.canvasStyle).toContain('height:200px')
  })

  // Props 测试 - 样式相关
  test('自定义线条颜色', () => {
    const wrapper = mount(WdSignature, {
      props: {
        penColor: '#ff0000'
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).penColor).toBe('#ff0000')
  })

  test('自定义线条宽度', () => {
    const wrapper = mount(WdSignature, {
      props: {
        lineWidth: 3
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).lineWidth).toBe(3)
  })

  test('自定义背景色', () => {
    const wrapper = mount(WdSignature, {
      props: {
        backgroundColor: '#f5f5f5'
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).backgroundColor).toBe('#f5f5f5')
  })

  // Props 测试 - 功能控制
  test('禁用状态', () => {
    const wrapper = mount(WdSignature, {
      props: {
        disabled: true
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).disabled).toBe(true)
  })

  test('禁用滚动', () => {
    const wrapper = mount(WdSignature, {
      props: {
        disableScroll: false
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).disableScroll).toBe(false)
    expect(wrapper.find('canvas').attributes('disable-scroll')).toBe('false')
  })

  test('启用历史记录', () => {
    const wrapper = mount(WdSignature, {
      props: {
        enableHistory: true
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).enableHistory).toBe(true)

    // 验证历史记录按钮是否渲染
    const buttons = wrapper.findAllComponents(WdButton)
    expect(buttons.length).toBeGreaterThanOrEqual(4) // 至少有清除、确认、撤销、恢复四个按钮
  })

  test('历史记录步长', () => {
    const wrapper = mount(WdSignature, {
      props: {
        step: 2
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).step).toBe(2)
  })

  // Props 测试 - 笔锋效果
  test('笔锋效果', () => {
    const wrapper = mount(WdSignature, {
      props: {
        pressure: true,
        minWidth: 1,
        maxWidth: 5,
        minSpeed: 1.5
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).pressure).toBe(true)
    expect((wrapper.vm as any).minWidth).toBe(1)
    expect((wrapper.vm as any).maxWidth).toBe(5)
    expect((wrapper.vm as any).minSpeed).toBe(1.5)
  })

  // Props 测试 - 导出相关
  test('导出设置', () => {
    const wrapper = mount(WdSignature, {
      props: {
        fileType: 'jpg',
        quality: 0.8,
        exportScale: 2
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).fileType).toBe('jpg')
    expect((wrapper.vm as any).quality).toBe(0.8)
    expect((wrapper.vm as any).exportScale).toBe(2)
  })

  // Props 测试 - 按钮文案
  test('自定义按钮文案', () => {
    const wrapper = mount(WdSignature, {
      props: {
        clearText: '重写',
        confirmText: '完成',
        revokeText: '后退',
        restoreText: '前进'
      },
      global: {
        components: { WdButton }
      }
    })
    expect((wrapper.vm as any).clearText).toBe('重写')
    expect((wrapper.vm as any).confirmText).toBe('完成')
    expect((wrapper.vm as any).revokeText).toBe('后退')
    expect((wrapper.vm as any).restoreText).toBe('前进')

    // 验证按钮文本是否正确显示
    const html = wrapper.html()
    expect(html).toContain('重写')
    expect(html).toContain('完成')
  })

  // 事件测试
  test('clear事件', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    wrapper.vm.$emit('clear')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('confirm事件', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    const result: SignatureResult = {
      tempFilePath: 'test/path.png',
      width: 300,
      height: 200,
      success: true
    }
    wrapper.vm.$emit('confirm', result)
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')![0][0]).toEqual(result)
  })

  test('签名过程事件', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    wrapper.vm.$emit('start', { touches: [{ x: 100, y: 100 }] })
    wrapper.vm.$emit('signing', { touches: [{ x: 120, y: 120 }] })
    wrapper.vm.$emit('end', {})

    expect(wrapper.emitted('start')).toBeTruthy()
    expect(wrapper.emitted('signing')).toBeTruthy()
    expect(wrapper.emitted('end')).toBeTruthy()
  })

  // Exposed方法测试
  test('exposed方法 - init', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    expect(wrapper.vm.init).toBeDefined()
    wrapper.vm.init()
  })

  test('exposed方法 - clear', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    expect(wrapper.vm.clear).toBeDefined()
    wrapper.vm.clear()
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('exposed方法 - confirm', () => {
    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })
    expect(wrapper.vm.confirm).toBeDefined()
    wrapper.vm.confirm()
  })

  test('确认导出失败时返回 success=false', async () => {
    vi.spyOn(uni as any, 'canvasToTempFilePath').mockImplementation(({ fail }: any) => {
      fail?.()
      return undefined as any
    })

    const wrapper = mount(WdSignature, {
      global: {
        components: { WdButton }
      }
    })

    wrapper.vm.confirm()

    const emitted = wrapper.emitted('confirm')
    expect(emitted).toBeTruthy()
    const result = emitted![0][0] as SignatureResult
    expect(result.success).toBe(false)
    expect(result.tempFilePath).toBe('')
  })

  test('启用历史记录时，绘制后可撤销，撤销后可恢复', async () => {
    const ctxMock: any = {
      setLineWidth: vi.fn(),
      setStrokeStyle: vi.fn(),
      setLineJoin: vi.fn(),
      setLineCap: vi.fn(),
      setFillStyle: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      quadraticCurveTo: vi.fn(),
      stroke: vi.fn(),
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      scale: vi.fn(),
      draw: vi.fn()
    }
    vi.spyOn(uni, 'createCanvasContext').mockReturnValue(ctxMock)

    const nowSpy = vi.spyOn(Date, 'now')
    nowSpy.mockReturnValueOnce(100).mockReturnValueOnce(110).mockReturnValueOnce(120).mockReturnValueOnce(130).mockReturnValue(140)

    const wrapper = mount(WdSignature, {
      props: {
        enableHistory: true,
        pressure: true,
        step: 1
      },
      global: {
        components: { WdButton }
      }
    })

    const canvas = wrapper.find('canvas')
    await canvas.trigger('touchstart', touchEvent(10, 10))
    await canvas.trigger('touchmove', touchEvent(40, 30))
    await canvas.trigger('touchmove', touchEvent(80, 60))
    await canvas.trigger('touchend', touchEvent(80, 60))

    const buttonsAfterDraw = wrapper.findAllComponents(WdButton)
    expect(buttonsAfterDraw[0].props('disabled')).toBe(false)
    expect(buttonsAfterDraw[1].props('disabled')).toBe(true)

    wrapper.vm.revoke()
    await wrapper.vm.$nextTick()
    const buttonsAfterRevoke = wrapper.findAllComponents(WdButton)
    expect(buttonsAfterRevoke[0].props('disabled')).toBe(true)
    expect(buttonsAfterRevoke[1].props('disabled')).toBe(false)

    wrapper.vm.restore()
    await wrapper.vm.$nextTick()
    const buttonsAfterRestore = wrapper.findAllComponents(WdButton)
    expect(buttonsAfterRestore[0].props('disabled')).toBe(false)
    expect(buttonsAfterRestore[1].props('disabled')).toBe(true)
  })

  test('disabled=true 时不触发 signing 事件', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        disabled: true
      },
      global: {
        components: { WdButton }
      }
    })

    const canvas = wrapper.find('canvas')
    await canvas.trigger('touchstart', touchEvent(20, 20))
    await canvas.trigger('touchmove', touchEvent(40, 40))
    await canvas.trigger('touchend', touchEvent(40, 40))

    expect(wrapper.emitted('start')).toBeTruthy()
    expect(wrapper.emitted('signing')).toBeFalsy()
    expect(wrapper.emitted('end')).toBeTruthy()
  })

  test('exposed方法 - revoke和restore', () => {
    const wrapper = mount(WdSignature, {
      props: {
        enableHistory: true
      },
      global: {
        components: { WdButton }
      }
    })
    expect(wrapper.vm.revoke).toBeDefined()
    expect(wrapper.vm.restore).toBeDefined()
    wrapper.vm.revoke()
    wrapper.vm.restore()
  })

  // 插槽测试
  test('自定义footer插槽', () => {
    const wrapper = mount(WdSignature, {
      slots: {
        footer: '<div class="custom-footer">自定义底部</div>'
      },
      global: {
        components: { WdButton }
      }
    })

    expect(wrapper.find('.custom-footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').text()).toBe('自定义底部')
  })
})
