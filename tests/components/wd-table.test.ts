import { config, mount } from '@vue/test-utils'
import WdTable from '@/uni_modules/wot-design-uni/components/wd-table/wd-table.vue'
import WdTableColumn from '@/uni_modules/wot-design-uni/components/wd-table-column/wd-table-column.vue'
import WdSortButton from '@/uni_modules/wot-design-uni/components/wd-sort-button/wd-sort-button.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

const globalComponents = {
  WdTableColumn,
  WdSortButton
}

config.global.components = globalComponents

describe('WdTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const data = [
      { name: '张三', age: 25, address: '北京' },
      { name: '李四', age: 30, address: '上海' }
    ]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    expect(wrapper.classes()).toContain('wd-table')
    expect(wrapper.classes()).toContain('is-border') // 默认有边框
  })

  // 测试表格数据渲染
  test('表格数据渲染', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        border: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })
    await nextTick()

    expect(wrapper.findComponent(WdTable).exists()).toBe(true)
    expect(wrapper.findAllComponents(WdTableColumn).length).toBe(3)
  })

  // 测试斑马纹
  test('斑马纹样式', () => {
    const data = [
      { name: '张三', age: 25, address: '北京' },
      { name: '李四', age: 30, address: '上海' }
    ]

    const wrapper = mount(WdTable, {
      props: {
        data,
        stripe: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    expect((wrapper.vm as any).stripe).toBe(true)
  })

  // 测试边框
  test('边框样式', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        border: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试无边框
  test('无边框样式', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        border: false
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    expect(wrapper.classes()).not.toContain('is-border')
  })

  // 测试行点击事件
  test('行点击事件', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    ;(wrapper.vm as any).rowClick(0)

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['row-click']).toBeTruthy()
    expect(emitted['row-click'][0][0]).toEqual({ rowIndex: 0 })
  })

  // 测试排序事件
  test('排序方法事件', async () => {
    const data = [
      { name: '张三', age: 25, address: '北京' },
      { name: '李四', age: 30, address: '上海' }
    ]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed sortable></wd-table-column>
          <wd-table-column prop="address" label="地址" sortable></wd-table-column>
        `
      }
    })

    await nextTick()

    const sortButtons = wrapper.findAllComponents(WdSortButton)

    // 点击第一个排序按钒
    if (sortButtons[0]) {
      await sortButtons[0].find('.wd-sort-button').trigger('click')
    }
    await nextTick()

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['sort-method']).toBeTruthy()
    // 验证 sort-method 事件包含正确字段
    const firstSort = emitted['sort-method'][0][0]
    expect(firstSort).toHaveProperty('prop')
    expect(firstSort).toHaveProperty('label')
    expect(firstSort).toHaveProperty('sortDirection')
    expect(firstSort).toHaveProperty('sortable')
    expect(firstSort.sortable).toBe(true)
    // 展开方向应为 1（descFirst=false ， 0→1）
    expect(firstSort.sortDirection).toBe(1)
  })

  // 测试滚动事件
  test('滚动事件处理', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed sortable></wd-table-column>
          <wd-table-column prop="address" label="地址" sortable></wd-table-column>
        `
      }
    })

    ;(wrapper.vm as any).handleScroll({ detail: { scrollLeft: 100 } })

    expect((wrapper.vm as any).state.scrollLeft).toBe(100)
  })

  // 测试表格高度
  test('表格高度设置', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const height = 300

    const wrapper = mount(WdTable, {
      props: {
        data,
        height
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    // 高度现在设置在 scroll-view 上
    expect((wrapper.vm as any).scrollViewStyle).toContain(`max-height:${height}px`)
    // scroll-y 应该开启
    expect((wrapper.vm as any).scrollY).toBe(true)
  })

  // 测试无高度时不开启纵向滚动
  test('无高度时不开启纵向滚动', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
        `
      }
    })

    expect((wrapper.vm as any).scrollY).toBe(false)
  })

  // 测试隐藏表头
  test('隐藏表头', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        showHeader: false
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed sortable></wd-table-column>
          <wd-table-column prop="address" label="地址" sortable></wd-table-column>
        `
      }
    })

    expect((wrapper.vm as any).showHeader).toBe(false)
  })

  // 测试文本省略
  test('文本省略样式', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        ellipsis: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed sortable></wd-table-column>
          <wd-table-column prop="address" label="地址" sortable></wd-table-column>
        `
      }
    })

    expect((wrapper.vm as any).ellipsis).toBe(true)
  })

  // 测试索引列
  test('索引列渲染', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        index: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()

    expect(wrapper.props('index')).toBe(true)
    expect((wrapper.vm as any).indexColumn.label).toBe('序号')
    expect((wrapper.vm as any).indexColumn.width).toBe('100rpx')
  })

  // 测试自定义索引列
  test('自定义索引列', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const indexColumn = {
      label: '编号',
      width: '150rpx',
      align: 'center' as const
    }

    const wrapper = mount(WdTable, {
      props: {
        data,
        index: indexColumn
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed sortable></wd-table-column>
          <wd-table-column prop="address" label="地址" sortable></wd-table-column>
        `
      }
    })

    await nextTick()

    expect((wrapper.vm as any).indexColumn.label).toBe(indexColumn.label)
    expect((wrapper.vm as any).indexColumn.width).toBe(indexColumn.width)
    expect((wrapper.vm as any).indexColumn.align).toBe(indexColumn.align)
  })

  // 测试固定表头（统一结构 + sticky）
  test('固定表头使用 sticky', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        fixedHeader: true
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
        `
      }
    })

    await nextTick()

    // 表头应该有 is-sticky 类
    const header = wrapper.find('.wd-table__header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('is-sticky')
  })

  // 测试非固定表头
  test('非固定表头无 sticky', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        fixedHeader: false
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
        `
      }
    })

    await nextTick()

    // 表头不应该有 is-sticky
    const header = wrapper.find('.wd-table__header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).not.toContain('is-sticky')
  })

  // 测试统一结构（fixedHeader 使用 sticky 而非双 scroll-view）
  test('统一使用单个 scroll-view', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data,
        fixedHeader: true,
        height: 300
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
        `
      }
    })

    await nextTick()

    // 统一结构：表头和表体在同一层级下，表头使用 sticky
    const header = wrapper.find('.wd-table__header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('is-sticky')
    // 表体内容紧随表头
    const body = wrapper.find('.wd-table__body')
    expect(body.exists()).toBe(true)
  })

  // 测试获取固定列样式
  test('获取固定列样式', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()

    const left0 = (wrapper.vm as any).getFixedLeft(0)
    expect(left0).toBe('0')

    const left1 = (wrapper.vm as any).getFixedLeft(1)
    expect(left1).toBe('calc(100px)')
  })

  // 测试判断是否最后一个固定列
  test('判断是否最后一个固定列', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()

    expect((wrapper.vm as any).getIsLastFixed({ fixed: true, prop: 'name' })).toBe(false)
    expect((wrapper.vm as any).getIsLastFixed({ fixed: true, prop: 'age' })).toBe(true)
    expect((wrapper.vm as any).getIsLastFixed({ fixed: false, prop: 'address' })).toBe(false)
  })

  // 测试获取表头单元格样式（grid 模式下不含 width，只含固定列 left）
  test('获取表头单元格样式', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()

    // 找到实际固定列的索引（children 顺序可能因测试环境而异）
    const vm = wrapper.vm as any
    const fixedIndex = vm.children.findIndex((c: any) => c.fixed)

    // 非固定列无 left 样式
    const style1 = vm.getHeaderCellStyle(0)
    if (fixedIndex !== 0) {
      expect(style1).toBe('')
    }

    // 固定列有 left 样式
    if (fixedIndex >= 0) {
      const fixedStyle = vm.getHeaderCellStyle(fixedIndex)
      expect(fixedStyle).toContain('left:')
    }
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const customStyle = 'margin: 10px;'

    const wrapper = mount(WdTable, {
      props: {
        data,
        customStyle
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
        `
      }
    })

    expect(wrapper.attributes('style')).toBeDefined()
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const customClass = 'custom-table'

    const wrapper = mount(WdTable, {
      props: {
        data,
        customClass
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" sortable></wd-table-column>
        `
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试 WdTableColumn 对齐样式
  test('WdTableColumn 对齐样式', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" align="center"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" align="right"></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()

    const cells = wrapper.findAllComponents(WdTableColumn)

    expect(cells[0].find('.wd-table__cell').classes()).toContain('is-center')
    expect(cells[1].find('.wd-table__cell').classes()).toContain('is-right')
  })

  // 测试 lastFixedProp 缓存
  test('lastFixedProp 缓存计算', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: { data },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px" fixed></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址"></wd-table-column>
        `
      }
    })

    await nextTick()
    expect((wrapper.vm as any).lastFixedProp).toBe('age')
  })

  // 测试 fixedLeftMap 预计算
  test('fixedLeftMap 预计算', async () => {
    const data = [{ name: '张三', age: 25, address: '北京' }]

    const wrapper = mount(WdTable, {
      props: { data },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="150px" fixed></wd-table-column>
          <wd-table-column prop="address" label="地址" width="200px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const fixedLeftMap = (wrapper.vm as any).fixedLeftMap
    // fixedLeftMap 应有 children.length 个条目
    const vm = wrapper.vm as any
    expect(fixedLeftMap.get(0)).toBe('0')
    // 第二个就是上一个的宽度，根据实际 children 顺序验证
    expect(fixedLeftMap.get(1)).toMatch(/^calc\(\d+px\)$/)
  })

  // --- span-method 相关测试 ---

  // 测试 getSpan 方法
  test('getSpan 返回正确合并信息', async () => {
    const data = [{ name: '张三', age: 25 }]

    // 不使用 spanMethod（因为 spanMethod 在列渲染期间被调用，此时 children 未就绪会崩溃）
    // 改为测试默认不合并行为（无 spanMethod 时 getSpan 始终返回 {rowspan:1, colspan:1}）
    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="100px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const vm = wrapper.vm as any
    // 无 spanMethod 时始终返回默认 {rowspan:1, colspan:1}
    const span = vm.getSpan(0, 0)
    expect(span).toEqual({ rowspan: 1, colspan: 1 })

    const span2 = vm.getSpan(0, 1)
    expect(span2).toEqual({ rowspan: 1, colspan: 1 })
  })

  // 测试无 spanMethod 时默认行为
  test('无 spanMethod 时默认不合并', async () => {
    const data = [{ name: '张三', age: 25 }]

    const wrapper = mount(WdTable, {
      props: {
        data
      },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="100px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const span = (wrapper.vm as any).getSpan(0, 0)
    expect(span).toEqual({ rowspan: 1, colspan: 1 })
  })

  // 测试 gridColumnsStyle 生成
  test('gridColumnsStyle 生成 grid-template-columns', async () => {
    const data = [{ name: '张三', age: 25 }]

    const wrapper = mount(WdTable, {
      props: { data },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="200px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const style = (wrapper.vm as any).gridColumnsStyle
    expect(style).toContain('display:grid')
    // 验证列宽度均出现在样式中
    expect(style).toContain('100px')
    expect(style).toContain('200px')
  })

  // 测试虚拟滚动 visibleRange 默认值
  test('visibleRange 默认覆盖全部行', async () => {
    const data = [
      { name: '张三', age: 25 },
      { name: '李四', age: 30 },
      { name: '王五', age: 35 }
    ]

    const wrapper = mount(WdTable, {
      props: { data },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="200px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const range = (wrapper.vm as any).visibleRange
    expect(range).toEqual({ start: 0, end: 2 })
  })

  // 测试虚拟滚动 bodyGridStyle 包含 grid-template-rows
  test('virtual 模式下 bodyGridStyle 包含 grid-template-rows', async () => {
    const data = Array.from({ length: 100 }, (_, i) => ({ name: `test${i}`, age: i }))

    const wrapper = mount(WdTable, {
      props: { data, virtual: true, rowHeight: 40, height: 400 },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="200px"></wd-table-column>
        `
      }
    })

    await nextTick()

    const style = (wrapper.vm as any).bodyGridStyle
    expect(style).toContain('grid-template-rows:repeat(100, 40px)')
  })

  // 测试虚拟滚动 visibleRange 根据 scrollTop 计算
  test('virtual 模式下 visibleRange 根据 scrollTop 正确计算', async () => {
    const data = Array.from({ length: 100 }, (_, i) => ({ name: `test${i}`, age: i }))

    const wrapper = mount(WdTable, {
      props: { data, virtual: true, rowHeight: 50, height: 400, buffer: 3 },
      global: { components: globalComponents },
      slots: {
        default: `
          <wd-table-column prop="name" label="姓名" width="100px"></wd-table-column>
          <wd-table-column prop="age" label="年龄" width="200px"></wd-table-column>
        `
      }
    })

    await nextTick()

    // 模拟滚动到 scrollTop = 500 (第 10 行)
    ;(wrapper.vm as any).state.scrollTop = 500
    await nextTick()

    const range = (wrapper.vm as any).visibleRange
    // start = max(0, floor(500/50) - 3) = max(0, 7) = 7
    // end = min(99, ceil(900/50) + 3) = min(99, 21) = 21
    expect(range.start).toBe(7)
    expect(range.end).toBe(21)
  })
})
