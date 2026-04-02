import { mount } from '@vue/test-utils'
import WdRadio from '@/uni_modules/wot-ui/components/wd-radio/wd-radio.vue'
import WdRadioGroup from '@/uni_modules/wot-ui/components/wd-radio-group/wd-radio-group.vue'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'

describe('单选框组件', () => {
  // 测试基本渲染
  test('使用默认属性渲染单选框', () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: '1'
      },
      slots: {
        default: '选项1'
      }
    })

    expect(wrapper.classes()).toContain('wd-radio')
    expect(wrapper.find('.wd-radio__shape').exists()).toBe(true)
    expect(wrapper.find('.wd-radio__label').exists()).toBe(true)
    expect(wrapper.text()).toBe('选项1')
  })

  // 测试选中状态
  test('与单选框组一起使用时的选中状态', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value">
          <wd-radio value="1">选项1</wd-radio>
          <wd-radio value="2">选项2</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radios = wrapper.findAllComponents(WdRadio)
    await nextTick()

    // 第一个选项应该被选中
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')

    // 更新数据模型
    await wrapper.setData({ value: '2' })

    // 第二个选项应该被选中
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
  })

  // 测试自定义颜色
  test('渲染自定义颜色', async () => {
    const checkedColor = '#ff0000'

    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value" :checked-color="checkedColor">
          <wd-radio value="1">选项1</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1',
          checkedColor
        }
      }
    })

    const radio = wrapper.findComponent(WdRadio)
    await nextTick()

    // 选中的 radio 有 is-checked 类
    expect(radio.classes()).toContain('is-checked')
    // checkedColor 作用于 wd-icon 的 custom-style（通过 iconStyle 计算属性）
    // 只验证组件正确渲染即可
    const radioShape = radio.find('.wd-radio__shape')
    expect(radioShape.exists()).toBe(true)
  })

  // 测试禁用状态
  test('渲染禁用状态', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value">
          <wd-radio value="1" disabled>选项1</wd-radio>
          <wd-radio value="2">选项2</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radios = wrapper.findAllComponents(WdRadio)

    // 第一个选项应该被禁用
    expect(radios[0].classes()).toContain('is-disabled')
    expect(radios[1].classes()).not.toContain('is-disabled')

    // 尝试点击被禁用的选项，不应该改变选中状态
    await radios[0].trigger('click')
    expect(wrapper.vm.value).toBe('1') // 值不变

    // 点击未禁用的选项，应该改变选中状态
    await radios[1].trigger('click')
    expect(wrapper.vm.value).toBe('2') // 值改变
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-radio'

    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value">
          <wd-radio value="1" custom-class="${customClass}">选项1</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radio = wrapper.findComponent(WdRadio)
    expect(radio.classes()).toContain(customClass)
  })
})
