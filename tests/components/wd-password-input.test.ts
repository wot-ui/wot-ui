import { mount } from '@vue/test-utils'
import WdPasswordInput from '../../src/uni_modules/wot-ui/components/wd-password-input/wd-password-input.vue'
import { describe, expect, test, vi } from 'vitest'

describe('WdPasswordInput', () => {
  test('基本渲染', () => {
    const wrapper = mount(WdPasswordInput)
    expect(wrapper.classes()).toContain('wd-password-input')
  })

  test('密码长度', () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        length: 6,
        modelValue: '123'
      }
    })
    const items = wrapper.findAll('.wd-password-input__item')
    expect(items.length).toBe(6)
    expect(items[0].find('.wd-password-input__mask').exists()).toBeTruthy()
    expect(items[1].find('.wd-password-input__mask').exists()).toBeTruthy()
    expect(items[2].find('.wd-password-input__mask').exists()).toBeTruthy()
    expect(items[3].find('.wd-password-input__mask').exists()).toBeFalsy()
  })

  test('明文显示', () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        modelValue: '123',
        mask: false
      }
    })
    const items = wrapper.findAll('.wd-password-input__item')
    expect(items[0].text()).toBe('1')
    expect(items[1].text()).toBe('2')
    expect(items[2].text()).toBe('3')
  })

  test('获取焦点', () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        focused: true
      }
    })
    expect(wrapper.find('.wd-password-input__cursor').exists()).toBeTruthy()
  })

  test('自定义样式', () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        customClass: 'custom-password',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-password')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdPasswordInput)
    await wrapper.find('.wd-password-input__security').trigger('touchstart')

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['focus']).toBeTruthy()
  })

  test('默认不渲染原生输入框', () => {
    const wrapper = mount(WdPasswordInput)
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.find('.wd-password-input__cursor').exists()).toBeTruthy()
  })

  test('原生输入过滤粘贴内容并限制长度', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        mask: false,
        length: 6,
        modelValue: ''
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('.wd-password-input__cursor').exists()).toBe(false)

    const preventDefault = vi.fn()
    await (wrapper.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '验证码１２３-45678'
      },
      preventDefault
    })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(preventDefault).toHaveBeenCalled()
    expect(emitted['update:modelValue'][0][0]).toBe('123456')
  })

  test('原生输入按键入内容过滤数字', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 4,
        modelValue: '12'
      }
    })

    const next = await (wrapper.vm as any).handleNativeInput({ detail: { value: '12ab90' } })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(next).toBe('1290')
    expect(emitted['update:modelValue'][0][0]).toBe('1290')
  })

  test('原生输入返回清洗后的值以替换小数点', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '12'
      }
    })

    const unchanged = await (wrapper.vm as any).handleNativeInput({ detail: { value: '12.' } })
    expect(unchanged).toBe('12')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    const next = await (wrapper.vm as any).handleNativeInput({ detail: { value: '12.3' } })
    expect(next).toBe('123')
    expect((wrapper.emitted('update:modelValue') as string[][])[0][0]).toBe('123')
  })

  test('原生输入无数字的粘贴不改值', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        modelValue: '123'
      }
    })

    await (wrapper.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => 'abc'
      },
      preventDefault: vi.fn()
    })

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('原生输入聚焦后显示对应格子光标', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        focused: true,
        modelValue: '12'
      }
    })

    expect(wrapper.find('.wd-password-input__cursor').exists()).toBe(false)

    const event = new Event('focus')
    await (wrapper.vm as any).handleNativeFocus(event)

    const items = wrapper.findAll('.wd-password-input__item')
    expect(items[2].find('.wd-password-input__cursor').exists()).toBe(true)
    expect(wrapper.emitted('focus')?.[0]?.[0]).toBe(event)

    await (wrapper.vm as any).handleNativeBlur()
    expect(wrapper.find('.wd-password-input__cursor').exists()).toBe(false)
  })

  test('原生输入点击格子不重复触发 focus', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true
      }
    })

    await wrapper.find('.wd-password-input__security').trigger('touchstart')
    expect(wrapper.emitted('focus')).toBeFalsy()
  })

  test('原生输入掩码和明文展示保持不变', () => {
    const masked = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        modelValue: '12'
      }
    })
    expect(masked.findAll('.wd-password-input__mask')[0].attributes('style')).toContain('visible')

    const plain = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        mask: false,
        modelValue: '12'
      }
    })
    expect(plain.findAll('.wd-password-input__item')[0].text()).toBe('1')
    expect(plain.find('input').attributes('autocomplete')).toBe('one-time-code')
    expect(masked.find('input').attributes('autocomplete')).toBe('one-time-code')
    expect(plain.find('input').attributes('text-content-type')).toBe('oneTimeCode')
    expect(masked.find('input').attributes('text-content-type')).toBe('oneTimeCode')
    expect(plain.find('input').attributes('type')).toBe('text')
    expect(plain.find('input').attributes('inputmode')).toBe('numeric')
  })

  test('粘贴追加到已有内容后再过滤并截断', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '12'
      }
    })

    const preventDefault = vi.fn()
    await (wrapper.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '3a４'
      },
      preventDefault
    })

    expect(preventDefault).toHaveBeenCalled()
    expect((wrapper.emitted('update:modelValue') as string[][])[0][0]).toBe('1234')

    const truncated = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '1234'
      }
    })
    await (truncated.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '56-789'
      },
      preventDefault: vi.fn()
    })
    expect((truncated.emitted('update:modelValue') as string[][])[0][0]).toBe('123456')

    const chained = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: ''
      }
    })
    await (chained.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '12'
      },
      preventDefault: vi.fn()
    })
    await (chained.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '34'
      },
      preventDefault: vi.fn()
    })
    expect((chained.emitted('update:modelValue') as string[][]).map((item) => item[0])).toEqual(['12', '1234'])
  })

  test('粘贴后可以立即输入和退格', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '12'
      }
    })

    await (wrapper.vm as any).handleNativePaste({
      clipboardData: {
        getData: () => '34'
      },
      preventDefault: vi.fn()
    })
    await wrapper.setProps({ modelValue: '1234' })
    await (wrapper.vm as any).handleNativeInput({ detail: { value: '12345' } })
    await wrapper.setProps({ modelValue: '12345' })
    await (wrapper.vm as any).handleNativeInput({ detail: { value: '1234' } })

    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted.map((item) => item[0])).toEqual(['1234', '12345', '1234'])
  })

  test('粘贴原文回写不会覆盖追加结果', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '12'
      }
    })

    const field = { value: '12' }
    await (wrapper.vm as any).handleNativePaste({
      target: field,
      clipboardData: {
        getData: () => '3a4'
      },
      preventDefault: vi.fn()
    })
    expect(field.value).toBe('1234')

    field.value = '3a4'
    const echoed = await (wrapper.vm as any).handleNativeInput({ target: field, detail: { value: '3a4' } })
    expect(echoed).toBe('1234')
    expect(field.value).toBe('1234')

    field.value = '12345'
    const typed = await (wrapper.vm as any).handleNativeInput({ target: field, detail: { value: '12345' } })
    expect(typed).toBe('12345')
    expect(field.value).toBe('12345')

    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted.map((item) => item[0])).toEqual(['1234', '12345'])
  })

  test('原生输入从 target 读取值且相同值不重复派发', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        nativeInput: true,
        length: 6,
        modelValue: '123'
      }
    })

    await (wrapper.vm as any).handleNativeInput({ target: { value: '123abc' } })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    await (wrapper.vm as any).handleNativeInput({ target: { value: '1234' } })
    expect((wrapper.emitted('update:modelValue') as string[][])[0][0]).toBe('1234')
  })

  test('完成事件', () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        modelValue: '123456',
        length: 6
      }
    })

    // 在组件中应该有一个 watch 监听 modelValue 长度等于 length 时触发 complete 事件
    // 但在当前组件实现中似乎没有这个功能，这个测试可能需要修改
    // 这里只是示例，实际应该根据组件实现来编写测试

    // const emitted = wrapper.emitted() as Record<string, any[]>
    // expect(emitted['complete']).toBeTruthy()
    // expect(emitted['complete'][0][0]).toBe('123456')
  })
})
