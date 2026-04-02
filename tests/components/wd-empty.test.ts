import { mount } from '@vue/test-utils'
import WdEmpty from '@/uni_modules/wot-ui/components/wd-empty/wd-empty.vue'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('WdEmpty', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdEmpty, {
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain('wd-empty')
    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).props('name')).toBe('empty') // 默认值
  })

  // 测试自定义提示文案
  test('自定义提示文案', () => {
    const tip = '暂无数据'

    const wrapper = mount(WdEmpty, {
      props: {
        tip
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-empty__text').exists()).toBe(true)
    expect(wrapper.find('.wd-empty__text').text()).toBe(tip)
  })

  // 测试自定义样式
  test('自定义类名和样式', () => {
    const customClass = 'custom-tip'
    const customStyle = 'color: red;'

    const wrapper = mount(WdEmpty, {
      props: {
        customClass,
        customStyle
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain(customClass)
    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试自定义图标
  test('自定义图标', () => {
    const icon = 'search'

    const wrapper = mount(WdEmpty, {
      props: {
        icon
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).props('name')).toBe(icon)
  })

  // 测试自定义图标大小 - 数字
  test('数字类型的图标大小', () => {
    const iconSize = 100

    const wrapper = mount(WdEmpty, {
      props: {
        iconSize
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('height:100px')
    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('width:100px')
    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('font-size:100px')
  })

  // 测试自定义图标大小 - 字符串
  test('字符串类型的图标大小', () => {
    const iconSize = '100rpx'

    const wrapper = mount(WdEmpty, {
      props: {
        iconSize
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('height:100rpx')
    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('width:100rpx')
    expect(wrapper.findComponent(WdIcon).props('customStyle')).toContain('font-size:100rpx')
  })

  // 测试自定义图片插槽
  test('自定义图片插槽', () => {
    const wrapper = mount(WdEmpty, {
      slots: {
        image: '<div class="custom-image">自定义图片</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).exists()).toBe(false)
    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.find('.custom-image').text()).toBe('自定义图片')
  })

  // 测试底部插槽
  test('自定义底部插槽', () => {
    const wrapper = mount(WdEmpty, {
      slots: {
        bottom: '<div class="custom-bottom">底部按钮</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.custom-bottom').exists()).toBe(true)
    expect(wrapper.find('.custom-bottom').text()).toBe('底部按钮')
  })

  // 测试无提示文案
  test('无提示文案时不渲染', () => {
    const wrapper = mount(WdEmpty, {
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-empty__text').exists()).toBe(false)
  })
})
