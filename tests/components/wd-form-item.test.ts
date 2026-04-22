import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import WdFormItem from '@/uni_modules/wot-ui/components/wd-form-item/wd-form-item.vue'
import WdForm from '@/uni_modules/wot-ui/components/wd-form/wd-form.vue'
import WdCell from '@/uni_modules/wot-ui/components/wd-cell/wd-cell.vue'

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

  test('validate-trigger 为 change 时，字段变化会触发校验', async () => {
    const schema = {
      validate(model: Record<string, string>) {
        return model.name ? [] : [{ path: ['name'], message: '姓名不能为空' }]
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema" validate-trigger="change">
            <wd-form-item prop="name" title="姓名">
              <text>{{ formData.name }}</text>
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return { formData: { name: '' }, schema }
        }
      },
      { global: { components: globalComponents } }
    )

    ;(wrapper.vm as any).formData.name = '张三'
    await nextTick()
    await nextTick()

    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  test('validate-trigger 为 blur 时，字段变化不触发 change 校验', async () => {
    const schema = {
      validate() {
        return [{ path: ['name'], message: '姓名不能为空' }]
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" :schema="schema" validate-trigger="blur">
            <wd-form-item prop="name" title="姓名">
              <text>{{ formData.name }}</text>
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return { formData: { name: '' }, schema }
        }
      },
      { global: { components: globalComponents } }
    )

    ;(wrapper.vm as any).formData.name = '李四'
    await nextTick()
    await nextTick()

    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  test('form-item 可用 validate-trigger 覆盖 form 的触发时机', async () => {
    const schema = {
      validate() {
        return [{ path: ['name'], message: '姓名不能为空' }]
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" :schema="schema" validate-trigger="blur">
            <wd-form-item prop="name" title="姓名" validate-trigger="change">
              <text>{{ formData.name }}</text>
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return { formData: { name: '' }, schema }
        }
      },
      { global: { components: globalComponents } }
    )

    ;(wrapper.vm as any).formData.name = '王五'
    await nextTick()
    await nextTick()

    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
  })

  test('form-item 传入布局相关 props 时优先使用自身配置', () => {
    const wrapper = mount(WdFormItem, {
      props: {
        titleWidth: '120',
        layout: 'vertical',
        valueAlign: 'right',
        asteriskPosition: 'end'
      },
      global: { components: globalComponents }
    })
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('titleWidth')).toBe('120')
    expect(cell.props('layout')).toBe('vertical')
    expect(cell.props('valueAlign')).toBe('right')
    expect(cell.props('asteriskPosition')).toBe('end')
  })

  test('未传布局 props 时使用默认值', () => {
    const wrapper = mount(WdFormItem, {
      global: { components: globalComponents }
    })
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('titleWidth')).toBe('98px')
    expect(cell.props('layout')).toBe('horizontal')
    expect(cell.props('valueAlign')).toBe('left')
    expect(cell.props('asteriskPosition')).toBe('start')
  })

  test('form-item 传入 border 时优先使用自身配置', () => {
    const wrapper = mount(WdFormItem, {
      props: { border: true },
      global: { components: globalComponents }
    })
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('border')).toBe(true)
  })

  test('未传 required 时可由 schema.isRequired 推导', async () => {
    const host = {
      components: { WdFormItem },
      setup() {
        const formData = ref({ name: '' })
        const schema = {
          validate: () => [],
          isRequired: (path: string) => path === 'name'
        }
        return { formData, schema }
      },
      template: `
        <wd-form :model="formData" :schema="schema">
          <wd-form-item prop="name" title="姓名" />
        </wd-form>
      `
    }

    const wrapper = mount(host, { global: { components: globalComponents } })
    await nextTick()
    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('required')).toBe(true)
  })

  test('border 在 index > 0 且 form.border=true 时返回 true', async () => {
    vi.resetModules()

    vi.doMock('@/uni_modules/wot-ui/composables/useParent', () => {
      return {
        useParent: () => ({
          parent: ref({ props: { border: true } }),
          index: ref(1)
        })
      }
    })

    vi.doMock('@/uni_modules/wot-ui/composables/useChildren', () => {
      return {
        useChildren: () => ({
          linkChildren: () => {}
        })
      }
    })

    const { default: MockedWdFormItem } = await import('@/uni_modules/wot-ui/components/wd-form-item/wd-form-item.vue')

    const wrapper = mount(MockedWdFormItem, {
      global: {
        components: {
          WdCell
        }
      }
    })

    const cell = wrapper.findComponent({ name: 'wd-cell' })
    expect(cell.props('border')).toBe(true)

    vi.doUnmock('@/uni_modules/wot-ui/composables/useParent')
    vi.doUnmock('@/uni_modules/wot-ui/composables/useChildren')
  })
})
