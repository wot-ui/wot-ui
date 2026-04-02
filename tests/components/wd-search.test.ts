import { mount } from '@vue/test-utils'
import WdSearch from '../../src/uni_modules/wot-design-uni/components/wd-search/wd-search.vue'
import { describe, expect, test, vi } from 'vitest'

async function flushSearchTimers(ms = 200) {
  vi.advanceTimersByTime(ms)
  await Promise.resolve()
}

describe('WdSearch', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSearch)
    expect(wrapper.classes()).toContain('wd-search')
  })

  test('输入功能会触发 update:modelValue 与 change', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        modelValue: '',
        placeholderLeft: true
      }
    })

    const input = wrapper.find('.wd-search__input')
    await input.trigger('input', {
      detail: { value: '搜索内容' }
    })

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect((wrapper.emitted('change') as any[])[0][0]).toEqual({ value: '搜索内容' })
  })

  test('占位符文本', async () => {
    const placeholder = '请输入搜索内容'
    const wrapper = mount(WdSearch, {
      props: {
        placeholder,
        placeholderLeft: true
      }
    })

    expect(wrapper.html()).toContain(placeholder)
  })

  test('清空按钮在 focusWhenClear=false 时会清空并触发 clear', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WdSearch, {
      props: {
        modelValue: '搜索内容'
      }
    })

    const clearPromise = (wrapper.vm as any).handleClear()
    await flushSearchTimers(120)
    await clearPromise

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][emitted['update:modelValue'].length - 1][0]).toBe('')
    vi.useRealTimers()
  })

  test('清空按钮在 focusWhenClear=true 时保持可输入态', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WdSearch, {
      props: {
        modelValue: 'abc',
        focusWhenClear: true
      }
    })

    const clearPromise = (wrapper.vm as any).handleClear()
    await flushSearchTimers(120)
    await clearPromise

    const emitted = wrapper.emitted('clear') as any[]
    expect(emitted).toBeTruthy()
    vi.useRealTimers()
  })

  test('取消按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        hideCancel: false
      }
    })

    const cancelButton = wrapper.find('.wd-search__cancel')
    expect(cancelButton.exists()).toBeTruthy()

    await cancelButton.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('搜索按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        placeholderLeft: true
      }
    })

    const input = wrapper.find('.wd-search__input')
    await input.trigger('confirm', {
      detail: { value: '搜索内容' }
    })

    expect(wrapper.emitted('search')).toBeTruthy()
  })

  test('禁用状态下点击容器触发 click', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        disabled: true
      }
    })

    await wrapper.find('.wd-search__block').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('closeCover 会关闭占位遮罩', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WdSearch, {
      props: {
        focus: false
      }
    })

    const closePromise = (wrapper.vm as any).closeCover()
    await flushSearchTimers(220)
    await closePromise
    expect((wrapper.vm as any).showPlaceHolder).toBe(false)

    vi.useRealTimers()
  })

  test('disabled + focus=true 时不会触发 closeCover 分支', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WdSearch, {
      props: {
        focus: true,
        disabled: true
      }
    })

    await flushSearchTimers(150)
    expect((wrapper.vm as any).showInput).toBe(false)
    vi.useRealTimers()
  })

  test('blur 在 clearing=true 时早退，不触发 blur 事件', async () => {
    vi.useFakeTimers()
    const wrapper = mount(WdSearch, {
      props: {
        modelValue: 'abc'
      }
    })

    ;(wrapper.vm as any).clearing = true
    const blurPromise = (wrapper.vm as any).handleBlur()
    await flushSearchTimers(220)
    await blurPromise

    expect(wrapper.emitted('blur')).toBeFalsy()
    vi.useRealTimers()
  })

  test('blur 正常路径会触发 blur 事件', async () => {
    vi.useFakeTimers()
    const wrapper = mount(WdSearch, {
      props: {
        modelValue: 'abc'
      }
    })

    const blurPromise = (wrapper.vm as any).handleBlur()
    await flushSearchTimers(220)
    await blurPromise

    const blurEvents = wrapper.emitted('blur') as any[]
    expect(blurEvents).toBeTruthy()
    expect(blurEvents[0][0]).toEqual({ value: 'abc' })
    vi.useRealTimers()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        customClass: 'custom-search',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-search')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('搜索图标', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        placeholderLeft: true
      }
    })

    expect(wrapper.find('.wd-search__search-left-icon').exists()).toBe(true)
  })

  test('最大长度限制', async () => {
    const maxlength = 10
    const wrapper = mount(WdSearch, {
      props: {
        maxlength,
        placeholderLeft: true
      }
    })

    const input = wrapper.find('.wd-search__input')
    expect(input.attributes('maxlength')).toBe(maxlength.toString())
  })
})
