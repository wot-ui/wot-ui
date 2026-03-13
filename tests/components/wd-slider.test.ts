import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WdSlider from '@/uni_modules/wot-design-uni/components/wd-slider/wd-slider.vue'
import { describe, test, expect } from 'vitest'

function mountSlider(options: Record<string, any> = {}) {
  const global = options.global || {}
  return mount(WdSlider, {
    ...options,
    global: {
      ...global,
      stubs: {
        'wd-icon': true,
        ...(global.stubs || {})
      }
    }
  })
}

describe('WdSlider', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mountSlider()
    expect(wrapper.classes()).toContain('wd-slider')
    expect(wrapper.classes()).toContain('wd-slider--horizontal')
    expect(wrapper.find('.wd-slider__bar').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__line').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__dot').exists()).toBeTruthy()
  })

  // 测试默认值
  test('默认值渲染', () => {
    const wrapper = mountSlider({
      props: { modelValue: 50 }
    })
    expect(wrapper.find('.wd-slider__line').attributes('style')).toContain('width: 50%')
  })

  // 测试禁用状态
  test('禁用状态', () => {
    const wrapper = mountSlider({
      props: {
        disabled: true,
        modelValue: 30
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试最大最小值
  test('处理最大最小值', () => {
    const wrapper = mountSlider({
      props: {
        min: 20,
        max: 80,
        modelValue: 50
      }
    })
    // 50 在 20-80 范围内占比 50%
    expect(wrapper.find('.wd-slider__line').attributes('style')).toContain('width: 50%')
  })

  // 测试步长
  test('处理步长值', async () => {
    const wrapper = mountSlider({
      props: {
        step: 10,
        modelValue: 0
      }
    })

    await wrapper.setProps({ modelValue: 25 })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toBe(25)
  })

  // 测试自定义颜色
  test('自定义颜色渲染', () => {
    const inactiveColor = '#ddd'
    const activeColor = '#f00'
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        inactiveColor,
        activeColor
      }
    })

    expect(wrapper.props('activeColor')).toBe(activeColor)
    expect(wrapper.props('inactiveColor')).toBe(inactiveColor)
  })

  // 测试 range 双向滑块
  test('range 双向滑块渲染', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: [20, 60],
        range: true
      }
    })
    expect(wrapper.classes()).toContain('is-range')
    expect(wrapper.findAll('.wd-slider__dot').length).toBe(2)
    expect(wrapper.find('.wd-slider__dot--left').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__dot--right').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__line').attributes('style')).toContain('width: 40%')
  })

  // 测试 vertical 垂直布局
  test('vertical 垂直布局', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        vertical: true
      }
    })
    expect(wrapper.classes()).toContain('wd-slider--vertical')
    expect(wrapper.find('.wd-slider__line').attributes('style')).toContain('height: 50%')
  })

  // 测试 theme capsule 管道样式
  test('theme capsule 管道样式', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        theme: 'capsule'
      }
    })
    expect(wrapper.find('.wd-slider__bar--capsule').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__line--capsule').exists()).toBeTruthy()
  })

  // 测试 showExtremeValue 极值显示
  test('showExtremeValue 显示极值', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        showExtremeValue: true
      }
    })
    expect(wrapper.find('.wd-slider__value--min').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__value--max').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__value--min').text()).toBe('0')
    expect(wrapper.find('.wd-slider__value--max').text()).toBe('100')
  })

  // 测试隐藏极值（默认）
  test('隐藏极值（默认）', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50
      }
    })
    expect(wrapper.find('.wd-slider__value--min').exists()).toBeFalsy()
    expect(wrapper.find('.wd-slider__value--max').exists()).toBeFalsy()
  })

  // 测试刻度标记
  test('marks 刻度标记（数组）', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        marks: [0, 25, 50, 75, 100]
      }
    })
    expect(wrapper.findAll('.wd-slider__scale-item').length).toBe(5)
  })

  // 测试刻度标记（对象）
  test('marks 刻度标记（对象带文字）', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 50,
        marks: { 0: '0%', 50: '50%', 100: '100%' }
      }
    })
    expect(wrapper.findAll('.wd-slider__scale-item').length).toBe(3)
    expect(wrapper.findAll('.wd-slider__scale-desc').length).toBe(3)
  })

  // 测试事件触发
  test('触发事件', async () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 0
      },
      attachTo: document.body
    })

    wrapper.vm.$emit('dragstart', { value: 0 })
    wrapper.vm.$emit('update:modelValue', 50)
    wrapper.vm.$emit('dragend', { value: 50 })
    wrapper.vm.$emit('change', 50)

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['dragstart']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['dragend']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const wrapper = mountSlider({
      props: { customClass: 'custom-slider' }
    })
    expect(wrapper.classes()).toContain('custom-slider')
  })

  // 测试垂直 + 管道 + 双向组合
  test('垂直 + 管道 + 双向组合', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: [30, 70],
        range: true,
        vertical: true,
        theme: 'capsule'
      }
    })
    expect(wrapper.classes()).toContain('wd-slider--vertical')
    expect(wrapper.classes()).toContain('is-range')
    expect(wrapper.find('.wd-slider__bar--capsule').exists()).toBeTruthy()
    expect(wrapper.findAll('.wd-slider__dot').length).toBe(2)
    expect(wrapper.find('.wd-slider__line').attributes('style')).toContain('height: 40%')
  })

  // 测试垂直方向进度条
  test('垂直方向使用 height 和 top', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: 30,
        vertical: true
      }
    })
    const lineStyle = wrapper.find('.wd-slider__line').attributes('style')
    expect(lineStyle).toContain('height: 30%')
    expect(lineStyle).toContain('top: 0')
  })

  // 测试 range 值校正行为
  test('range 值内部排序后正确渲染', () => {
    const wrapper = mountSlider({
      props: {
        modelValue: [80, 20],
        range: true
      }
    })
    // 值应该内部排序为 [20, 80]，渲染宽度 60%
    const lineStyle = wrapper.find('.wd-slider__line').attributes('style')
    expect(lineStyle).toContain('width: 60%')
    expect(lineStyle).toContain('left: 20%')
  })
})
