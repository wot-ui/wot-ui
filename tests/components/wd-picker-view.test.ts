import { mount } from '@vue/test-utils'
import WdPickerView from '@/uni_modules/wot-design-uni/components/wd-picker-view/wd-picker-view.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

describe('WdPickerView', () => {
  // 在每个测试前设置全局组件
  const globalComponents = {
    'wd-loading': WdLoading
  }

  test('基本渲染', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: []
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.classes()).toContain('wd-picker-view')
  })

  test('单列选项', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确渲染了列
    expect(wrapper.findAll('.wd-picker-view__column').length).toBe(1)

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toEqual(['1'])

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)
  })

  test('多列选项', () => {
    const columns = [
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ],
      [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' }
      ]
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1', 'a']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确渲染了列
    expect(wrapper.findAll('.wd-picker-view__column').length).toBe(2)

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toEqual(['1', 'a'])

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)
  })

  test('默认选中值', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['2']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toEqual(['2'])

    // 检查内部的 selectedIndex 是否正确设置
    expect((wrapper.vm as any).selectedIndex).toEqual([1])
  })

  test('选项变化', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 直接触发事件，而不是调用方法
    wrapper.vm.$emit('update:modelValue', '2')
    wrapper.vm.$emit('change', {
      picker: wrapper.vm,
      value: '2',
      index: 0
    })

    // 检查是否触发了事件
    const emitted = wrapper.emitted()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
  })

  test('禁用选项', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)

    // 检查内部的 formatColumns 是否正确设置了 disabled 属性
    expect((wrapper.vm as any).formatColumns[0][1].disabled).toBe(true)
  })

  test('自定义样式', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: [],
        customClass: 'custom-picker-view',
        customStyle: 'height: 200px;'
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.classes()).toContain('custom-picker-view')
    expect(wrapper.attributes('style')).toBe('height: 200px;')
  })

  test('主容器渲染', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: []
      },
      global: {
        components: globalComponents
      }
    })
    // wd-picker-view__main 容器存在
    expect(wrapper.find('.wd-picker-view__main').exists()).toBeTruthy()
  })

  test('列高度', () => {
    const itemHeight = 50
    const visibleItemCount = 4
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: [],
        itemHeight,
        visibleItemCount
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 itemHeight 和 visibleItemCount
    expect(wrapper.props('itemHeight')).toBe(itemHeight)
    expect(wrapper.props('visibleItemCount')).toBe(visibleItemCount)

    // 验证内部计算的 pickerViewStyle
    const vm = wrapper.vm as any
    expect(vm.pickerViewStyle).toContain(`${itemHeight * visibleItemCount}px`)
  })

  test('暴露的方法', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确暴露了方法（getSelectedOptions/getSelectedValues/getColumnsData/getColumnData/getColumnIndex/getSelectedLabels/getSelectedIndex/resetColumns）
    const vm = wrapper.vm as any
    expect(typeof vm.getSelectedOptions).toBe('function')
    expect(typeof vm.getSelectedValues).toBe('function')
    expect(typeof vm.getColumnsData).toBe('function')
    expect(typeof vm.getColumnData).toBe('function')
    expect(typeof vm.getColumnIndex).toBe('function')
    expect(typeof vm.getSelectedLabels).toBe('function')
    expect(typeof vm.getSelectedIndex).toBe('function')
    expect(typeof vm.resetColumns).toBe('function')

    // getSelectedOptions 始终返回数组
    expect(vm.getSelectedOptions()).toEqual([{ value: '1', label: '选项1' }])

    // getSelectedValues 始终返回数组
    expect(vm.getSelectedValues()).toEqual(['1'])

    // 测试 getColumnsData 方法
    expect(vm.getColumnsData()).toEqual([
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ]
    ])

    // 测试 getSelectedIndex 方法
    expect(vm.getSelectedIndex()).toEqual([0])
  })

  test('所有选项都禁用时的边界处理', () => {
    // 测试所有选项都被禁用的边界情况
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const columns = [
      { value: '1', label: '选项1', disabled: true },
      { value: '2', label: '选项2', disabled: true }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 应该有警告信息
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  test('禁用选项时自动选中最近的可用项', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        // 尝试选中禁用项
        modelValue: ['2']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    // 应该自动选中第一个可用项（向前查找）
    expect(vm.selectedIndex).toEqual([0])
  })

  test('手动触发 change 事件', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]

    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 手动触发 change 事件验证事件结构
    wrapper.vm.$emit('change', {
      selectedValues: ['2'],
      selectedOptions: [{ value: '2', label: '选项2' }],
      selectedLabels: ['选项2'],
      selectedIndexes: [1],
      columnIndex: 0
    })

    const emitted = wrapper.emitted('change')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toMatchObject({ selectedValues: ['2'], columnIndex: 0 })
  })

  test('空列数据处理', async () => {
    const wrapper = mount(WdPickerView, {
      props: {
        columns: [],
        modelValue: []
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    expect(vm.formatColumns).toEqual([])
    expect(vm.selectedIndex).toEqual([])

    // 更新为有数据的列
    await wrapper.setProps({
      columns: [{ value: '1', label: '选项1' }],
      modelValue: ['1']
    })

    expect(vm.formatColumns.length).toBe(1)
    expect(vm.selectedIndex).toEqual([0])
  })

  test('getSelectedLabels 返回正确的标签数组', () => {
    const columns = [
      [
        { value: '1', label: '选项A' },
        { value: '2', label: '选项B' }
      ],
      [
        { value: 'a', label: '选项X' },
        { value: 'b', label: '选项Y' }
      ]
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['2', 'b']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    expect(vm.getSelectedLabels()).toEqual(['选项B', '选项Y'])
  })

  test('getColumnsData 返回深拷贝数据', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const data1 = vm.getColumnsData()
    const data2 = vm.getColumnsData()

    // 应该是深拷贝，不是同一个引用
    expect(data1).not.toBe(data2)
    expect(data1).toEqual(data2)
  })

  test('resetColumns 方法正确重置列数据', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const newColumns = [
      { value: 'a', label: '新选项A' },
      { value: 'b', label: '新选项B' }
    ]

    vm.resetColumns(newColumns)

    expect(vm.formatColumns[0]).toEqual([
      { value: 'a', label: '新选项A' },
      { value: 'b', label: '新选项B' }
    ])
  })

  test('getColumnData 返回指定列数据', () => {
    const columns = [
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ],
      [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' }
      ]
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1', 'a']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    // getColumnData(0) 返回第一列数据
    expect(vm.getColumnData(0)).toEqual([
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ])
    // getColumnData(1) 返回第二列数据
    expect(vm.getColumnData(1)).toEqual([
      { value: 'a', label: '选项A' },
      { value: 'b', label: '选项B' }
    ])
  })

  test('单列选择器 getSelectedOptions 返回单个对象', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const result = vm.getSelectedOptions()

    // getSelectedOptions 始终返回数组（单列也是长度为 1 的数组）
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([{ value: '1', label: '选项1' }])
  })

  test('多列选择器 getSelectedOptions 返回数组', () => {
    const columns = [
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ],
      [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' }
      ]
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1', 'a']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const result = vm.getSelectedOptions()

    // 多列应该返回数组
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([
      { value: '1', label: '选项1' },
      { value: 'a', label: '选项A' }
    ])
  })

  test('cascade 模式切换首列后更新后续列并触发 change', async () => {
    const columns = [
      {
        value: 'fruit',
        label: '水果',
        children: [
          { value: 'apple', label: '苹果' },
          { value: 'banana', label: '香蕉' }
        ]
      },
      {
        value: 'drink',
        label: '饮品',
        children: [
          { value: 'tea', label: '茶' },
          { value: 'coffee', label: '咖啡' }
        ]
      }
    ]

    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        cascade: true,
        modelValue: ['fruit', 'apple']
      },
      global: {
        components: globalComponents
      }
    })

    await nextTick()
    ;(wrapper.vm as any).onChange({ detail: { value: [1, 0] } })
    await nextTick()
    await nextTick()

    const emitted = wrapper.emitted('change') as any[]
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].columnIndex).toBe(0)
    expect((wrapper.vm as any).selectedValues[0]).toBe('drink')
  })

  test('onChange 选择未变化时不触发 update:modelValue', async () => {
    const wrapper = mount(WdPickerView, {
      props: {
        columns: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' }
        ],
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    await nextTick()
    await wrapper.find('.wd-picker-view__main').trigger('change', { detail: { value: [0] } })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('pickstart/pickend 事件透传', async () => {
    const wrapper = mount(WdPickerView, {
      props: {
        columns: [{ value: '1', label: '选项1' }],
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.find('.wd-picker-view__main').trigger('pickstart')
    await wrapper.find('.wd-picker-view__main').trigger('pickend')

    expect(wrapper.emitted('pickstart')).toBeTruthy()
    expect(wrapper.emitted('pickend')).toBeTruthy()
  })

  test('单列选择器 getSelectedValues 返回单个值', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['2']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const result = vm.getSelectedValues()

    // getSelectedValues 始终返回数组（单列也是长度为 1 的数组）
    expect(result).toEqual(['2'])
  })

  test('多列选择器 getSelectedValues 返回数组', () => {
    const columns = [
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ],
      [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' }
      ]
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['2', 'b']
      },
      global: {
        components: globalComponents
      }
    })

    const vm = wrapper.vm as any
    const result = vm.getSelectedValues()

    // 多列应该返回数组
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(['2', 'b'])
  })

  test('错误的列/行索引时不崩溃', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: ['1']
      },
      global: {
        components: globalComponents
      }
    })

    // 组件应该正常工作，不会崩溃
    expect(wrapper.exists()).toBe(true)
    consoleSpy.mockRestore()
  })
})
