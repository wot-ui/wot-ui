import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { z } from 'zod'
import WdForm from '@/uni_modules/wot-ui/components/wd-form/wd-form.vue'
import WdFormItem from '@/uni_modules/wot-ui/components/wd-form-item/wd-form-item.vue'
import WdInput from '@/uni_modules/wot-ui/components/wd-input/wd-input.vue'
import WdCell from '@/uni_modules/wot-ui/components/wd-cell/wd-cell.vue'
import { zodAdapter } from '@/uni_modules/wot-ui/components/wd-form/adapters/zod'
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const globalComponents = {
  WdForm,
  WdFormItem,
  WdInput,
  WdCell
}

describe('WdForm schema validate', () => {
  test('默认渲染正常', () => {
    const wrapper = mount(WdForm, {
      props: { model: {} }
    })
    expect(wrapper.classes()).toContain('wd-form')
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
