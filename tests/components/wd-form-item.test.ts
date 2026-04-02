import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdFormItem from '@/uni_modules/wot-design-uni/components/wd-form-item/wd-form-item.vue'
import WdForm from '@/uni_modules/wot-design-uni/components/wd-form/wd-form.vue'
import WdCell from '@/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue'

const globalComponents = { WdFormItem, WdForm, WdCell }

describe('WdFormItem', () => {
  test('基本渲染：根元素包含 wd-form-item 类', () => {
    const wrapper = mount(WdFormItem, {
      global: { components: globalComponents }
    })
    // wd-form-item 是 custom-class，在 wd-cell 根元素上
    expect(wrapper.find('.wd-form-item').exists()).toBe(true)
  })

  test('title prop 渲染标题', () => {
    const wrapper = mount(WdFormItem, {
      props: { title: '姓名' },
      global: { components: globalComponents }
    })
    expect(wrapper.text()).toContain('姓名')
  })

  test('value prop 渲染值，不显示 placeholder', () => {
    const wrapper = mount(WdFormItem, {
      props: { value: '张三', placeholder: '请输入姓名' },
      global: { components: globalComponents }
    })
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.find('.wd-form-item__placeholder').exists()).toBe(false)
  })

  test('value 为空时显示 placeholder', () => {
    const wrapper = mount(WdFormItem, {
      props: { value: '', placeholder: '请输入内容' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-form-item__placeholder').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__placeholder').text()).toBe('请输入内容')
  })

  test('value 为 undefined 时显示 placeholder', () => {
    const wrapper = mount(WdFormItem, {
      props: { value: undefined, placeholder: '请选择' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-form-item__placeholder').exists()).toBe(true)
  })

  test('有 placeholder 但 value 有值时不显示 placeholder', () => {
    const wrapper = mount(WdFormItem, {
      props: { value: 0, placeholder: '请输入数字' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-form-item__placeholder').exists()).toBe(false)
  })

  test('customClass 追加到根元素', () => {
    const wrapper = mount(WdFormItem, {
      props: { customClass: 'my-custom' },
      global: { components: globalComponents }
    })
    const formItemEl = wrapper.find('.wd-form-item')
    expect(formItemEl.classes()).toContain('my-custom')
  })

  test('customStyle 绑定到根元素', () => {
    const wrapper = mount(WdFormItem, {
      props: { customStyle: 'color: red;' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-form-item').attributes('style')).toContain('color: red')
  })

  test('default slot 渲染内容', () => {
    const wrapper = mount(WdFormItem, {
      slots: { default: '<text class="custom-slot">自定义内容</text>' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.custom-slot').exists()).toBe(true)
    expect(wrapper.find('.custom-slot').text()).toBe('自定义内容')
  })

  test('title slot 覆盖默认标题', () => {
    const wrapper = mount(WdFormItem, {
      slots: { title: '<text class="custom-title">自定义标题</text>' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  test('click 事件触发', async () => {
    const wrapper = mount(WdFormItem, {
      props: { clickable: true },
      global: { components: globalComponents }
    })
    await wrapper.find('.wd-form-item').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('与 WdForm 集成：渲染 form-item', () => {
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData">
            <wd-form-item prop="name" title="姓名" :value="formData.name" placeholder="请输入姓名" />
          </wd-form>
        `,
        data() {
          return { formData: { name: '' } }
        }
      },
      { global: { components: globalComponents } }
    )
    expect(wrapper.find('.wd-form-item').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__placeholder').exists()).toBe(true)
  })

  test('与 WdForm 集成：errorMessage 显示校验错误', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData">
            <wd-form-item ref="item" prop="name" title="姓名" :value="formData.name" />
          </wd-form>
        `,
        data() {
          return { formData: { name: '' } }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    // 通过实际调用 validate 无法触发（无 schema），直接向 reactive errorMessages 写入
    ;(form.vm as any).errorMessages['name'] = '姓名不能为空'
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe('姓名不能为空')
  })

  test('required prop 透传给 wd-cell', () => {
    const wrapper = mount(WdFormItem, {
      props: { required: true, title: '必填' },
      global: { components: globalComponents }
    })
    // wd-cell 会添加必填标记
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('required')).toBe(true)
  })

  test('isLink prop 透传给 wd-cell', () => {
    const wrapper = mount(WdFormItem, {
      props: { isLink: true },
      global: { components: globalComponents }
    })
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('isLink')).toBe(true)
  })
})
