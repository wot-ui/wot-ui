import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdOverlay from '@/uni_modules/wot-ui/components/wd-overlay/wd-overlay.vue'
import WdPopup from '@/uni_modules/wot-ui/components/wd-popup/wd-popup.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

const globalComponents = {
  WdOverlay
}

/** 弹出层自身的 transition。遮罩内部也有 wd-transition，不能取第一个。 */
function getPopupCustomStyle(wrapper: ReturnType<typeof mount>) {
  const popupTransition = wrapper
    .findAllComponents({ name: 'wd-transition' })
    .find((item) => String(item.props('customClass') || '').includes('wd-popup'))
  return String(popupTransition?.props('customStyle') || '')
}

describe('WdPopup', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdPopup, {
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.findComponent({ name: 'wd-transition' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'wd-overlay' }).exists()).toBe(true)
  })

  // 测试显示状态
  test('显示和隐藏弹出层', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查 wd-transition 组件的 show 属性
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('show')).toBe(true)

    // 更新 modelValue
    await wrapper.setProps({ modelValue: false })

    // 检查 wd-transition 组件的 show 属性
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('show')).toBe(false)
  })

  // 测试自定义过渡动画
  test('自定义过渡动画', () => {
    const transition = 'fade'

    const wrapper = mount(WdPopup, {
      props: {
        transition,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查过渡名称
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('name')).toBe(transition)
  })

  // 测试点击遮罩层
  test('点击遮罩层触发事件', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 点击遮罩层
    await wrapper.findComponent({ name: 'wd-overlay' }).vm.$emit('click')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click-modal']).toBeTruthy()
    expect(emitted['close']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toBe(false)
  })

  // 测试禁用点击遮罩层关闭
  test('禁用点击遮罩层关闭', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true,
        closeOnClickModal: false
      },
      global: {
        components: globalComponents
      }
    })

    // 点击遮罩层
    await wrapper.findComponent({ name: 'wd-overlay' }).vm.$emit('click')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click-modal']).toBeTruthy()
    expect(emitted['close']).toBeFalsy()
    expect(emitted['update:modelValue']).toBeFalsy()
  })

  // 测试动画时长
  test('动画时长', () => {
    const duration = 500

    const wrapper = mount(WdPopup, {
      props: {
        duration,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查动画时长
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('duration')).toBe(duration)
    expect(wrapper.findComponent({ name: 'wd-overlay' }).props('duration')).toBe(duration)
  })

  // 测试禁用遮罩层
  test('禁用遮罩层', () => {
    const wrapper = mount(WdPopup, {
      props: {
        modal: false,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查遮罩层是否存在
    expect(wrapper.findComponent({ name: 'wd-overlay' }).exists()).toBe(false)
  })

  // 测试关闭时隐藏
  test('关闭时隐藏', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        hideWhenClose: true,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    const popTransition = wrapper.findAllComponents({ name: 'wd-transition' }).filter((c) => c.find('.wd-popup').exists() === true)

    // 检查 hideWhenClose
    expect(popTransition.length > 0 && popTransition[0].props('destroy')).toBe(true)
  })

  // 测试遮罩层样式
  test('遮罩层样式', () => {
    const modalStyle = 'background: rgba(0, 0, 0, 0.5);'

    const wrapper = mount(WdPopup, {
      props: {
        modalStyle,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查遮罩层样式
    expect(wrapper.findComponent({ name: 'wd-overlay' }).props('customStyle')).toBe(modalStyle)
  })

  // H5 条件编译后使用 --window-bottom；小程序 / App 仍是 getSystemInfo 算出的像素值。
  // 测试文件里的条件编译注释会被 esbuild 去掉，因此按实际样式分支断言。
  test('底部弹层安全区在 H5 避让 --window-bottom，在其它端使用系统安全区', () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true,
        position: 'bottom',
        safeAreaInsetBottom: true,
        customStyle: 'height: 200px;'
      },
      global: {
        components: globalComponents
      }
    })

    const customStyle = getPopupCustomStyle(wrapper)
    expect(customStyle.endsWith('height: 200px;')).toBe(true)
    if (customStyle.includes('--window-bottom')) {
      expect(customStyle).toContain('padding-bottom: max(var(--window-bottom, 0px), env(safe-area-inset-bottom))')
      expect(customStyle).not.toContain('padding-bottom: 20px')
    } else {
      // setup 里 safeAreaInsets.bottom 为 20；微信端为 screenHeight - safeArea.bottom，同样是 20
      expect(customStyle).toContain('padding-bottom: 20px')
    }
  })

  test('未开启底部安全区时不追加 --window-bottom', () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true,
        position: 'bottom',
        safeAreaInsetBottom: false
      },
      global: {
        components: globalComponents
      }
    })

    const customStyle = getPopupCustomStyle(wrapper)
    expect(customStyle).toContain('padding-bottom: 0px')
    expect(customStyle).not.toContain('--window-bottom')
  })

  test('非底部弹层仍使用系统安全区数值', () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true,
        position: 'center',
        safeAreaInsetBottom: true
      },
      global: {
        components: globalComponents
      }
    })

    const customStyle = getPopupCustomStyle(wrapper)
    expect(customStyle).toContain('padding-bottom: 20px')
    expect(customStyle).not.toContain('--window-bottom')
  })

  // 测试锁定滚动
  test('锁定滚动', () => {
    const wrapper = mount(WdPopup, {
      props: {
        lockScroll: true,
        modelValue: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查锁定滚动
    expect(wrapper.findComponent({ name: 'wd-overlay' }).props('lockScroll')).toBe(true)
  })
})
