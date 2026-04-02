import { mount } from '@vue/test-utils'
import WdPicker from '@/uni_modules/wot-ui/components/wd-picker/wd-picker.vue'
import { describe, test, expect } from 'vitest'

describe('WdPicker', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdPicker)
    expect(wrapper.classes()).toContain('wd-picker')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-picker'
    const wrapper = mount(WdPicker, {
      props: {
        customClass
      }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试确认事件
  test('触发确认事件', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPicker, {
      props: {
        columns,
        modelValue: ['2']
      }
    })

    // 直接调用组件的方法
    const vm = wrapper.vm as any
    vm.open()
    expect(vm.popupShow).toBe(true)

    // 触发内部方法
    vm.handleConfirm()

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['open']).toBeTruthy()
    expect(emitted['confirm']).toBeTruthy()
  })

  // 测试取消事件
  test('触发取消事件', async () => {
    const wrapper = mount(WdPicker)

    // 直接调用组件的方法
    const vm = wrapper.vm as any
    vm.open()
    expect(vm.popupShow).toBe(true)

    // 直接调用取消方法
    vm.onCancel()

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['open']).toBeTruthy()
    expect(emitted['cancel']).toBeTruthy()
    expect(vm.popupShow).toBe(false)
  })
})
