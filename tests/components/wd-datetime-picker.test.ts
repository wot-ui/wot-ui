import { mount } from '@vue/test-utils'
import WdDatetimePicker from '@/uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdDatetimePickerView from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/wd-datetime-picker-view.vue'

const globalConfig = {
  components: {
    WdPopup,
    WdDatetimePickerView
  },
  stubs: {
    WdTransition: {
      template: '<div><slot /></div>'
    }
  }
}

describe('WdDatetimePicker 日期时间选择器', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()
    await nextTick()

    // 检查是否渲染了 popup
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    // 检查是否渲染了 wraper
    expect(wrapper.find('.wd-datetime-picker__wraper').exists()).toBe(true)
    // 检查是否渲染了 view
    expect(wrapper.findComponent(WdDatetimePickerView).exists()).toBe(true)
  })

  test('标题和按钮文案', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        title: '选择时间',
        cancelButtonText: '放弃',
        confirmButtonText: '确定',
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()
    await nextTick()

    const title = wrapper.find('.wd-datetime-picker__title-text')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('选择时间')

    // 取消和确定按鈕都在 wd-datetime-picker__title 内的 wd-datetime-picker__action
    const actions = wrapper.findAll('.wd-datetime-picker__action')
    expect(actions[0].text()).toBe('放弃')
    expect(actions[1].text()).toBe('确定')
  })

  test('cancel 事件', async () => {
    const onCancel = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        onCancel,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    // 点击取消按鈕（第一个 action）
    await wrapper.findAll('.wd-datetime-picker__action')[0].trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('confirm 事件', async () => {
    const onConfirm = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        onConfirm,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    // 点击确定按钮
    const confirmBtn = wrapper.findAll('.wd-datetime-picker__action')[1]
    await confirmBtn.trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
    const emitEvent = wrapper.emitted('confirm') as any[]
    expect(emitEvent[0][0]).toHaveProperty('value')
  })

  test('update:visible 事件', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    // 初始可能触发 true
    expect(wrapper.emitted('update:visible')).toBeTruthy()

    // 触发 close
    const popup = wrapper.findComponent(WdPopup)
    popup.vm.$emit('close')
    await nextTick()

    const events = wrapper.emitted('update:visible') as any[]
    // 检查最后一次是 false
    expect(events[events.length - 1]).toEqual([false])
  })

  test('Loading 状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    // 组件显示时包含内部 datetime-picker-view
    const view = wrapper.findComponent(WdDatetimePickerView)
    expect(view.exists()).toBe(true)
  })

  test('内部视图集成与值同步', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: new Date(2024, 0, 1).getTime(),
        type: 'date',
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    const view = wrapper.findComponent(WdDatetimePickerView)
    const newDate = new Date(2024, 5, 1).getTime()

    // 模拟视图 change
    view.vm.$emit('change', { value: newDate, columns: [] })
    await nextTick()

    // 点击确定
    const confirmBtn = wrapper.findAll('.wd-datetime-picker__action')[1]
    await confirmBtn.trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
    const confirmPayload: any = wrapper.emitted('confirm')?.[0][0]
    expect(confirmPayload?.value).toBe(newDate)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const updateEvents = wrapper.emitted('update:modelValue') as any[]
    expect(updateEvents[updateEvents.length - 1][0]).toBe(newDate)
  })

  test('beforeConfirm 钩子', async () => {
    const beforeConfirm = vi.fn(() => {
      return false // 阻止确认
    })

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        beforeConfirm,
        rootPortal: false
      },
      global: globalConfig
    })
    await wrapper.vm.$nextTick()

    // 点击确定
    await wrapper.findAll('.wd-datetime-picker__action')[1].trigger('click')

    expect(beforeConfirm).toHaveBeenCalled()
    expect(wrapper.emitted('confirm')).toBeFalsy() // 不应触发 confirm
  })

  test('region 模式下展示范围切换并触发 toggle', async () => {
    const start = new Date(2024, 0, 1).getTime()
    const end = new Date(2024, 0, 3).getTime()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [start, end],
        type: 'date',
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })

    await nextTick()

    expect(wrapper.find('.wd-datetime-picker__range').exists()).toBe(true)
    await wrapper.findAll('.wd-datetime-picker__range-item')[1].trigger('click')

    const toggleEvents = wrapper.emitted('toggle') as any[]
    expect(toggleEvents).toBeTruthy()
    expect(toggleEvents[toggleEvents.length - 1][0]).toBe(end)
  })

  test('onChangeStart 在区间模式下超过结束值时会被校正', async () => {
    const start = new Date(2024, 0, 1).getTime()
    const end = new Date(2024, 0, 2).getTime()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [start, end],
        type: 'date',
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })

    await nextTick()
    ;(wrapper.vm as any).onChangeStart({
      value: new Date(2024, 0, 5).getTime(),
      columns: [{ type: 'year' }, { type: 'month' }, { type: 'date' }]
    })

    await nextTick()
    const changeEvents = wrapper.emitted('change') as any[]
    expect(changeEvents).toBeTruthy()
    const value = changeEvents[changeEvents.length - 1][0].value
    expect(value[0]).toBe(value[1])
  })

  test('onChangeEnd 在区间模式下早于开始值时会被校正', async () => {
    const start = new Date(2024, 0, 5).getTime()
    const end = new Date(2024, 0, 6).getTime()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [start, end],
        type: 'date',
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })

    await nextTick()
    ;(wrapper.vm as any).onChangeEnd({
      value: new Date(2024, 0, 1).getTime(),
      columns: [{ type: 'year' }, { type: 'month' }, { type: 'date' }]
    })

    await nextTick()
    const changeEvents = wrapper.emitted('change') as any[]
    expect(changeEvents).toBeTruthy()
    const value = changeEvents[changeEvents.length - 1][0].value
    expect(value[0]).toBe(value[1])
  })

  test('pickstart 后 confirm 会延迟到 pickend 再触发', async () => {
    vi.useFakeTimers()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: true,
        rootPortal: false
      },
      global: globalConfig
    })

    await nextTick()
    ;(wrapper.vm as any).onPickStart()
    ;(wrapper.vm as any).onConfirm()
    expect(wrapper.emitted('confirm')).toBeFalsy()
    ;(wrapper.vm as any).onPickEnd()
    vi.advanceTimersByTime(60)
    await nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    vi.useRealTimers()
  })

  test('expose open/close 可控制弹窗显隐', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        visible: false,
        rootPortal: false
      },
      global: globalConfig
    })

    ;(wrapper.vm as any).open()
    await nextTick()
    expect(wrapper.emitted('open')).toBeTruthy()
    ;(wrapper.vm as any).close()
    await nextTick()
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
