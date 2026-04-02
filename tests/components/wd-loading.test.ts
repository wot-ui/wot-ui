import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdLoading from '@/uni_modules/wot-ui/components/wd-loading/wd-loading.vue'

describe('WdLoading', () => {
  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-loading')
    expect(wrapper.find('.wd-loading__spinner').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner-wraper').exists()).toBe(true)
  })

  // 测试 circular 类型的 loading
  test('circular类型加载', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'circular',
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-loading__spinner').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner--circular').exists()).toBe(true)
  })

  // 测试 dots 类型的 loading
  test('dots类型加载', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'dots',
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-loading__spinner').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner--dots').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner-dot').exists()).toBe(true)
  })

  // 测试 spinner 类型的 loading
  test('spinner类型加载', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'spinner',
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-loading__spinner').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner--spinner').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__spinner-dot').exists()).toBe(true)
  })

  // 测试自定义颜色 - circular 类型
  test('circular类型自定义颜色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdLoading, {
      props: {
        type: 'circular',
        color,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查颜色是否渲染到根样式
    expect(wrapper.props('color')).toBe(color)
    expect(wrapper.attributes('style')).toContain('color')
  })

  // 测试自定义颜色 - dots 类型
  test('dots类型自定义颜色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdLoading, {
      props: {
        type: 'dots',
        color,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查颜色是否渲染到根样式
    expect(wrapper.props('color')).toBe(color)
    expect(wrapper.attributes('style')).toContain('color')
  })

  // 测试自定义大小 - 像素值
  test('像素值自定义大小', async () => {
    const size = '40px'

    const wrapper = mount(WdLoading, {
      props: {
        size,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('size')).toBe(size)
  })

  // 测试自定义大小 - 数字值
  test('数字值自定义大小', async () => {
    const size = 40

    const wrapper = mount(WdLoading, {
      props: {
        size,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('size')).toBe(size)
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-loading'

    const wrapper = mount(WdLoading, {
      props: {
        customClass,
        customStyle: ''
      }
    })

    await nextTick()

    // 验证类名
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'margin: 10px'

    const wrapper = mount(WdLoading, {
      props: { customStyle }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('customStyle')).toBe(customStyle)
  })

  // 测试类型变化
  test('类型变化时更新spinner', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'circular',
        customStyle: ''
      }
    })

    await nextTick()
    expect(wrapper.find('.wd-loading__spinner--circular').exists()).toBe(true)

    // 更改类型
    await wrapper.setProps({ type: 'spinner' })
    await nextTick()

    expect(wrapper.find('.wd-loading__spinner--spinner').exists()).toBe(true)
  })

  // 测试大小变化
  test('大小属性变化时更新尺寸', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        size: '30px',
        customStyle: ''
      }
    })

    await nextTick()

    // 更改大小
    await wrapper.setProps({ size: '50px' })

    // 检查 props 是否正确更新
    expect(wrapper.props('size')).toBe('50px')
  })

  // 测试 inheritColor
  test('inheritColor 继承颜色', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        inheritColor: true,
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.props('inheritColor')).toBe(true)
  })

  // 测试 direction 方向属性
  test('水平方向', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        direction: 'horizontal',
        text: '加载中',
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-loading--horizontal')
    expect(wrapper.find('.wd-loading__text').exists()).toBe(true)
  })

  // 测试多实例各自独立
  test('多实例各自正常渲染', async () => {
    const wrapper1 = mount(WdLoading, {
      props: {
        customStyle: ''
      }
    })
    await nextTick()

    const wrapper2 = mount(WdLoading, {
      props: {
        type: 'spinner',
        customStyle: ''
      }
    })
    await nextTick()

    expect(wrapper1.find('.wd-loading__spinner--circular').exists()).toBe(true)
    expect(wrapper2.find('.wd-loading__spinner--spinner').exists()).toBe(true)
  })
})
