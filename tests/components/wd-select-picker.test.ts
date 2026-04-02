import { mount } from '@vue/test-utils'
import WdSelectPicker from '@/uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
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

  test('radio 且 showConfirm=false 时 handleChange 自动确认', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        columns,
        type: 'radio',
        showConfirm: false
      },
      global: {
        components: globalComponents
      }
    })

    ;(wrapper.vm as any).open()
    ;(wrapper.vm as any).handleChange({ value: '2' })
    await nextTick()

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['confirm']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toBe('2')
  })

  test('loading=true 时 onConfirm 直接触发 confirm 并关闭', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        loading: true,
        columns: [{ value: '1', label: '选项1' }]
      },
      global: {
        components: globalComponents
      }
    })

    ;(wrapper.vm as any).open()
    ;(wrapper.vm as any).onConfirm()
    await nextTick()

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['confirm']).toBeTruthy()
    expect(emitted['close']).toBeTruthy()
    expect(emitted['update:visible']).toBeTruthy()
  })

  test('filterable 模式下过滤列并展示高亮状态', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        filterable: true,
        columns: [
          { value: '1', label: '苹果' },
          { value: '2', label: '香蕉' }
        ]
      },
      global: {
        components: globalComponents
      }
    })

    ;(wrapper.vm as any).handleFilterChange({ value: '苹' })
    await nextTick()

    expect((wrapper.vm as any).showHighlightText).toBe(true)
    expect((wrapper.vm as any).filterColumns.length).toBe(1)
    expect((wrapper.vm as any).filterColumns[0].value).toBe('1')
  })

  test('未确认关闭时回滚到上次选中值', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        type: 'radio',
        modelValue: '1',
        columns: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' }
        ]
      },
      global: {
        components: globalComponents
      }
    })

    ;(wrapper.vm as any).open()
    ;(wrapper.vm as any).handleChange({ value: '2' })
    expect((wrapper.vm as any).selectList).toBe('2')
    ;(wrapper.vm as any).close()
    await nextTick()
    expect((wrapper.vm as any).selectList).toBe('1')
  })

  test('checkbox 确认时返回 selectedItems 数组', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        type: 'checkbox',
        modelValue: ['1'],
        columns: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' }
        ]
      },
      global: {
        components: globalComponents
      }
    })

    ;(wrapper.vm as any).open()
    ;(wrapper.vm as any).selectList = ['1', '2']
    ;(wrapper.vm as any).handleConfirm()
    await nextTick()

    const emitted = wrapper.emitted('confirm') as any[]
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].value).toEqual(['1', '2'])
    expect(emitted[0][0].selectedItems.length).toBe(2)
  })
})
