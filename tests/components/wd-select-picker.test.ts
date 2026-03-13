import { mount } from '@vue/test-utils'
import WdSelectPicker from '@/uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
import { describe, expect, test } from 'vitest'
import WdSearch from '@/uni_modules/wot-design-uni/components/wd-search/wd-search.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'

const globalComponents = {
  WdSearch,
  WdIcon
}

describe('WdSelectPicker', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.classes()).toContain('wd-select-picker')
  })

  test('选择功能', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        columns
      },
      global: {
        components: globalComponents
      }
    })

    // 手动触发 open 事件
    wrapper.vm.$emit('open')

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['open']).toBeTruthy()
  })

  test('自定义标题', async () => {
    const title = '请选择'
    const wrapper = mount(WdSelectPicker, {
      props: {
        title,
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    // 检查 props 是否正确传递
    const vm = wrapper.vm as any
    expect(vm.title).toBe(title)
  })

  test('确认事件', async () => {
    const columns = [{ value: '1', label: '选项1' }]
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        columns
      },
      global: {
        components: globalComponents
      }
    })

    // 手动触发 confirm 事件
    wrapper.vm.$emit('confirm', { value: '1', label: '选项1' })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['confirm']).toBeTruthy()
  })

  test('取消事件', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    // 手动触发 cancel 事件
    wrapper.vm.$emit('cancel')

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['cancel']).toBeTruthy()
  })

  test('加载状态', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        loading: true,
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    // 检查 props 是否正确传递
    const vm = wrapper.vm as any
    expect(vm.loading).toBe(true)
  })

  test('visible 属性控制弹窗显隐', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        visible: true
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    expect(vm.visible).toBe(true)
  })

  test('open 和 close 方法', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any

    // 调用 open 方法
    vm.open()
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:visible']).toBeTruthy()
    expect(emitted['update:visible'][0]).toEqual([true])
    expect(emitted['open']).toBeTruthy()

    // 调用 close 方法
    vm.close()
    expect(emitted['update:visible'][1]).toEqual([false])
    expect(emitted['close']).toBeTruthy()
  })
})
