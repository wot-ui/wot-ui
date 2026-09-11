import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { nextTick, reactive } from 'vue'
import { z } from 'zod'
import WdForm from '@/uni_modules/wot-ui/components/wd-form/wd-form.vue'
import WdFormItem from '@/uni_modules/wot-ui/components/wd-form-item/wd-form-item.vue'
import WdInput from '@/uni_modules/wot-ui/components/wd-input/wd-input.vue'
import WdSwitch from '@/uni_modules/wot-ui/components/wd-switch/wd-switch.vue'
import WdRadioGroup from '@/uni_modules/wot-ui/components/wd-radio-group/wd-radio-group.vue'
import WdRadio from '@/uni_modules/wot-ui/components/wd-radio/wd-radio.vue'
import WdCell from '@/uni_modules/wot-ui/components/wd-cell/wd-cell.vue'
import { zodAdapter } from '@/uni_modules/wot-ui/components/wd-form/adapters/zod'
import type { ErrorMessage, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const globalComponents = {
  WdForm,
  WdFormItem,
  WdInput,
  WdSwitch,
  WdRadioGroup,
  WdRadio,
  WdCell
}

describe('WdForm schema validate', () => {
  test('默认渲染正常', () => {
    const wrapper = mount(WdForm, {
      props: { model: {} }
    })
    expect(wrapper.classes()).toContain('wd-form')
  })

  test('disabled 会禁用内部输入控件', () => {
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" clearable />
            </wd-form-item>
          </wd-form>
        `,
        setup() {
          const formData = reactive({ name: '张三' })
          return { formData }
        }
      },
      { global: { components: globalComponents } }
    )

    const input = wrapper.findComponent(WdInput)
    expect(input.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
    expect(wrapper.find('.wd-input__clear').exists()).toBe(false)
  })

  test('form-item disabled 会禁用内部输入控件', () => {
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData">
            <wd-form-item prop="name" title="姓名" disabled>
              <wd-input v-model="formData.name" clearable />
            </wd-form-item>
          </wd-form>
        `,
        setup() {
          const formData = reactive({ name: '张三' })
          return { formData }
        }
      },
      { global: { components: globalComponents } }
    )

    const formItem = wrapper.findComponent(WdFormItem)
    const input = wrapper.findComponent(WdInput)

    expect(formItem.classes()).toContain('is-disabled')
    expect(input.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
    expect(wrapper.find('.wd-input__clear').exists()).toBe(false)
  })

  test('form-item disabled false 会覆盖 Form disabled 下的内部输入控件', () => {
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item prop="name" title="姓名" :disabled="false">
              <wd-input v-model="formData.name" clearable />
            </wd-form-item>
          </wd-form>
        `,
        setup() {
          const formData = reactive({ name: '张三' })
          return { formData }
        }
      },
      { global: { components: globalComponents } }
    )

    const formItem = wrapper.findComponent(WdFormItem)
    const input = wrapper.findComponent(WdInput)

    expect(formItem.classes()).not.toContain('is-disabled')
    expect(input.classes()).not.toContain('is-disabled')
    expect(wrapper.find('input').attributes()).not.toHaveProperty('disabled')
    expect(wrapper.find('.wd-input__clear').exists()).toBe(true)
  })

  test('disabled 会阻止内部独立控件交互', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item prop="checked" title="开关">
              <wd-switch v-model="formData.checked" @change="onChange" />
            </wd-form-item>
          </wd-form>
        `,
        setup() {
          const formData = reactive({ checked: false })
          return { formData, onChange }
        }
      },
      { global: { components: globalComponents } }
    )

    const switchWrapper = wrapper.findComponent(WdSwitch)
    expect(switchWrapper.classes()).toContain('is-disabled')

    await switchWrapper.trigger('click')

    expect((wrapper.vm as any).formData.checked).toBe(false)
    expect(onChange).not.toHaveBeenCalled()
  })

  test('disabled 会禁用内部选项控件', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item prop="priority" title="优先级">
              <wd-radio-group v-model="formData.priority">
                <wd-radio value="high">高</wd-radio>
              </wd-radio-group>
            </wd-form-item>
          </wd-form>
        `,
        setup() {
          const formData = reactive({ priority: '' })
          return { formData }
        }
      },
      { global: { components: globalComponents } }
    )

    const radio = wrapper.findComponent(WdRadio)
    expect(radio.classes()).toContain('is-disabled')

    await radio.trigger('click')

    expect((wrapper.vm as any).formData.priority).toBe('')
  })

  test('disabled 会阻止 form-item 点击入口', async () => {
    const onClick = vi.fn()
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item title="选择日期" is-link clickable :value="formData.date" @click="onClick" />
          </wd-form>
        `,
        setup() {
          const formData = reactive({ date: '2026-07-07' })
          return { formData, onClick }
        }
      },
      { global: { components: globalComponents } }
    )

    const formItem = wrapper.findComponent(WdFormItem)
    await nextTick()

    expect(formItem.classes()).toContain('is-disabled')
    expect(wrapper.find('.wd-cell__arrow-right').exists()).toBe(false)

    await formItem.trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })

  test('form-item disabled 会阻止自身点击入口', async () => {
    const onClick = vi.fn()
    const wrapper = mount(WdFormItem, {
      props: {
        title: '选择日期',
        value: '2026-07-07',
        isLink: true,
        clickable: true,
        disabled: true,
        onClick
      },
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('.wd-cell__arrow-right').exists()).toBe(false)

    await wrapper.trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })

  test('form-item disabled false 会覆盖 Form disabled 点击入口', async () => {
    const onClick = vi.fn()
    const wrapper = mount(
      {
        template: `
          <wd-form :model="formData" disabled>
            <wd-form-item title="选择日期" is-link clickable :disabled="false" :value="formData.date" @click="onClick" />
          </wd-form>
        `,
        setup() {
          const formData = reactive({ date: '2026-07-07' })
          return { formData, onClick }
        }
      },
      { global: { components: globalComponents } }
    )

    const formItem = wrapper.findComponent(WdFormItem)
    await nextTick()

    expect(formItem.classes()).not.toContain('is-disabled')
    expect(wrapper.find('.wd-cell__arrow-right').exists()).toBe(true)

    await formItem.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('zodAdapter 支持全量校验', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名'),
        age: z.string().min(1, '请输入年龄')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema" :reset-on-change="false">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
            <wd-form-item prop="age" title="年龄">
              <wd-input v-model="formData.age" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '', age: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(2)
  })

  test('同一字段存在多条 zod 错误时展示首条错误', async () => {
    const schema = zodAdapter(
      z.object({
        phone: z
          .string()
          .min(1, '请输入手机号')
          .regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="phone" title="手机号">
              <wd-input v-model="formData.phone" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { phone: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })

    const result = await form.vm.validate()
    await nextTick()

    expect(result.valid).toBe(false)
    expect(result.errors.map((error: ErrorMessage) => error.message)).toEqual(['请输入手机号', '手机号格式不正确'])
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe('请输入手机号')
  })

  test('支持指定字段校验', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名'),
        age: z.string().min(1, '请输入年龄')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
            <wd-form-item prop="age" title="年龄">
              <wd-input v-model="formData.age" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '', age: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate('name')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].prop).toBe('name')
  })

  test('v-if 隐藏的表单项不参与 schema 校验结果', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名'),
        age: z.string().min(1, '请输入年龄')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
            <wd-form-item v-if="showAge" prop="age" title="年龄">
              <wd-input v-model="formData.age" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '张三', age: '' },
            showAge: false,
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })

    const hiddenResult = await form.vm.validate()
    expect(hiddenResult.valid).toBe(true)
    expect(hiddenResult.errors).toEqual([])
    ;(wrapper.vm as any).showAge = true
    await nextTick()

    const visibleResult = await form.vm.validate()
    expect(visibleResult.valid).toBe(false)
    expect(visibleResult.errors).toHaveLength(1)
    expect(visibleResult.errors[0].prop).toBe('age')
  })

  test('父路径表单项能展示子路径校验错误', async () => {
    const schema: FormSchema = {
      validate() {
        return [{ path: ['user', 'name'], message: '请输入姓名' }]
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="user" title="用户">
              <wd-input v-model="formData.user.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { user: { name: '' } },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })

    const result = await form.vm.validate()
    await nextTick()

    expect(result.valid).toBe(false)
    expect(result.errors[0].prop).toBe('user.name')
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe('请输入姓名')
  })

  test('指定子路径校验通过后会清理父路径表单项错误', async () => {
    const schema: FormSchema = {
      validate(model) {
        return model.user.name ? [] : [{ path: ['user', 'name'], message: '请输入姓名' }]
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema" :reset-on-change="false">
            <wd-form-item prop="user" title="用户">
              <wd-input v-model="formData.user.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { user: { name: '' } },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })

    await form.vm.validate()
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
    ;(wrapper.vm as any).formData.user.name = '张三'
    await nextTick()

    const result = await form.vm.validate('user.name')
    await nextTick()

    expect(result.valid).toBe(true)
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  test('reset 能清空错误信息', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)

    form.vm.reset()
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  test('支持无 zod 的自定义 schema', async () => {
    const schema: FormSchema = {
      validate(model) {
        const errors = []
        if (!model.name) {
          errors.push({
            path: ['name'],
            message: '请输入姓名'
          })
        }
        return errors
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请输入姓名')
  })

  test('errorType 为 none 时不展示错误', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema" error-type="none">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  test('errorType 为 toast 时走 toast 提示分支', async () => {
    const schema = zodAdapter(
      z.object({
        name: z.string().min(1, '请输入姓名')
      })
    )
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema" error-type="toast">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(wrapper.findComponent({ name: 'wd-toast' }).exists()).toBe(true)
  })

  test('指定字段通过后只清理对应字段错误', async () => {
    const schema: FormSchema = {
      validate() {
        return []
      }
    }
    const wrapper = mount(
      {
        template: `
          <wd-form ref="form" :model="formData" :schema="schema">
            <wd-form-item prop="name" title="姓名">
              <wd-input v-model="formData.name" />
            </wd-form-item>
            <wd-form-item prop="age" title="年龄">
              <wd-input v-model="formData.age" />
            </wd-form-item>
          </wd-form>
        `,
        data() {
          return {
            formData: { name: '', age: '' },
            schema
          }
        }
      },
      { global: { components: globalComponents } }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    ;(form.vm as any).errorMessages.name = '请输入姓名'
    ;(form.vm as any).errorMessages.age = '请输入年龄'

    const partialResult = await form.vm.validate('name')
    await nextTick()
    expect(partialResult.valid).toBe(true)
    expect((form.vm as any).errorMessages.name).toBe('')
    expect((form.vm as any).errorMessages.age).toBe('请输入年龄')

    const allResult = await form.vm.validate()
    await nextTick()
    expect(allResult.valid).toBe(true)
    expect((form.vm as any).errorMessages.name).toBe('')
    expect((form.vm as any).errorMessages.age).toBe('')
  })
})
