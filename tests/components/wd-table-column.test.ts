import { config, mount } from '@vue/test-utils'
import { afterEach, describe, test, expect } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compile as compileScss } from 'sass'
import WdTableColumn from '@/uni_modules/wot-ui/components/wd-table-column/wd-table-column.vue'
import WdTable from '@/uni_modules/wot-ui/components/wd-table/wd-table.vue'
import { TABLE_KEY } from '@/uni_modules/wot-ui/components/wd-table/types'
import WdSortButton from '@/uni_modules/wot-ui/components/wd-sort-button/wd-sort-button.vue'

const globalComponents = { WdTable, WdTableColumn, WdSortButton }

config.global.components = globalComponents

const testData = [
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 22, city: '广州' }
]

describe('WdTableColumn', () => {
  test('基本渲染：包含 wd-table-column 类名', () => {
    const wrapper = mount(WdTableColumn, {
      props: { prop: 'name', label: '姓名' }
    })
    expect(wrapper.find('.wd-table-column').exists()).toBe(true)
  })

  test('独立使用时（无父 table）不渲染单元格', () => {
    const wrapper = mount(WdTableColumn, {
      props: { prop: 'name', label: '姓名' }
    })
    // 无父级 table，column 数据为空，不渲染 wd-table__cell
    expect(wrapper.find('.wd-table__cell').exists()).toBe(false)
  })

  test('与 WdTable 集成：渲染正确的列数据', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data">
            <wd-table-column prop="name" label="姓名" />
            <wd-table-column prop="age" label="年龄" />
          </wd-table>
        `,
        data() {
          return { data: testData }
        }
      },
      {}
    )
    await nextTick()
    // 只验证列容器存在
    const columns = wrapper.findAll('.wd-table-column')
    expect(columns.length).toBeGreaterThanOrEqual(2)
  })

  test('与 WdTable 集成：渲染每行数据', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data">
            <wd-table-column prop="name" label="姓名" />
          </wd-table>
        `,
        data() {
          return { data: testData }
        }
      },
      {}
    )
    await nextTick()
    // 每行对应一个 wd-table__cell
    const cells = wrapper.findAll('.wd-table__cell')
    expect(cells.length).toBeGreaterThanOrEqual(testData.length)
  })

  test('与 WdTable 集成：单元格显示正确文本', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data">
            <wd-table-column prop="name" label="姓名" />
          </wd-table>
        `,
        data() {
          return { data: testData }
        }
      },
      {}
    )
    await nextTick()
    const text = wrapper.text()
    expect(text).toContain('张三')
    expect(text).toContain('李四')
    expect(text).toContain('王五')
  })

  test('与 WdTable 集成：value slot 可自定义单元格内容', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data">
            <wd-table-column prop="name" label="姓名">
              <template #value="{ row }">
                <span class="custom-cell">{{ row.name }}-custom</span>
              </template>
            </wd-table-column>
          </wd-table>
        `,
        data() {
          return { data: [{ name: '张三', age: 25 }] }
        }
      },
      {}
    )
    await nextTick()
    expect(wrapper.find('.custom-cell').exists()).toBe(true)
    expect(wrapper.find('.custom-cell').text()).toContain('张三-custom')
  })

  test('与 WdTable 集成：所有列数据均渲染（多列）', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data">
            <wd-table-column prop="name" label="姓名" />
            <wd-table-column prop="age" label="年龄" />
            <wd-table-column prop="city" label="城市" />
          </wd-table>
        `,
        data() {
          return { data: [{ name: '张三', age: 25, city: '北京' }] }
        }
      },
      {}
    )
    await nextTick()
    const text = wrapper.text()
    expect(text).toContain('张三')
    expect(text).toContain('25')
    expect(text).toContain('北京')
  })
})

describe('WdTableColumn 虚拟插槽', () => {
  const wrappers: ReturnType<typeof mount>[] = []
  const DraftCell = defineComponent({
    props: { row: { type: Object, required: true } },
    setup(props) {
      const draft = ref('')
      return () =>
        h('input', {
          'data-row': props.row.id,
          value: draft.value,
          onInput: (event: Event) => {
            draft.value = (event.target as HTMLInputElement).value
          }
        })
    }
  })

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  })

  /** 挂载带有状态插槽的表格，供窗口移动和组件复用回归测试使用。 */
  async function mountVirtualTable(virtual = true) {
    const wrapper = mount({
      components: { WdTable, WdTableColumn, DraftCell },
      data: () => ({ rows: Array.from({ length: 1000 }, (_, id) => ({ id })), virtual, virtualProps: { height: 400, rowHeight: 50, buffer: 3 } }),
      template: `
        <wd-table :data="rows" :virtual="virtual" v-bind="virtualProps">
          <wd-table-column prop="id" label="ID" fixed>
            <template #value="{ row }"><draft-cell :row="row" /></template>
          </wd-table-column>
        </wd-table>
      `
    })
    wrappers.push(wrapper)
    await nextTick()
    return { wrapper, table: wrapper.findComponent(WdTable), column: wrapper.findComponent(WdTableColumn) }
  }

  test('窗口平移保留重叠行的输入状态，新行不会继承离开行的状态', async () => {
    const { wrapper, table } = await mountVirtualTable()
    const vm = table.vm as any
    vm.state.scrollTop = 500
    await nextTick()
    const row8 = wrapper.find('input[data-row="8"]').element
    await wrapper.find('input[data-row="8"]').setValue('row-8-draft')
    await wrapper.find('input[data-row="7"]').setValue('row-7-draft')

    vm.state.scrollTop = 550
    await nextTick()
    expect(wrapper.find('input[data-row="8"]').element).toBe(row8)
    expect((row8 as HTMLInputElement).value).toBe('row-8-draft')
    expect((wrapper.find('input[data-row="9"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input[data-row="22"]').element as HTMLInputElement).value).toBe('')
    expect(wrapper.find('input[data-row="7"]').exists()).toBe(false)

    await wrapper.find('input[data-row="8"]').trigger('click')
    expect(table.emitted('row-click')?.at(-1)).toEqual([{ rowIndex: 8 }])
    expect(wrapper.find('input[data-row="8"]').element.parentElement?.style.gridRow).toBe('1')

    vm.state.scrollTop = 500
    await nextTick()
    expect(wrapper.find('input[data-row="8"]').element).toBe(row8)
    expect((wrapper.find('input[data-row="7"]').element as HTMLInputElement).value).toBe('')

    vm.state.scrollTop = 1500
    await nextTick()
    expect(wrapper.findAll('input').every((input) => (input.element as HTMLInputElement).value === '')).toBe(true)
  })

  test('窗口平移不改变表体坐标系及重叠行的位置，避免跨组件更新时闪烁', async () => {
    const { wrapper, table } = await mountVirtualTable()
    const vm = table.vm as any
    vm.state.scrollTop = 500
    await nextTick()
    const bodyStyle = wrapper.find('.wd-table__body').attributes('style')
    const row = wrapper.find('input[data-row="12"]').element.parentElement!
    const cellStyle = row.getAttribute('style')
    for (const scrollTop of [501, 550, 600, 650, 700, 500]) {
      vm.state.scrollTop = scrollTop
      await nextTick()
      expect(wrapper.find('.wd-table__body').attributes('style')).toBe(bodyStyle)
      expect(wrapper.find('input[data-row="12"]').element.parentElement).toBe(row)
      expect(row.getAttribute('style')).toBe(cellStyle)
    }
  })

  test('大幅跳转和到达末尾时只渲染可视范围，没有占位行的插槽调用', async () => {
    const { wrapper, table, column } = await mountVirtualTable()
    const vm = table.vm as any
    for (const scrollTop of [0, 1, 500, 551, 25000, 49600, 0]) {
      vm.state.scrollTop = scrollTop
      await nextTick()
      const { start, end } = vm.visibleRange
      const expected = Array.from({ length: end - start + 1 }, (_, i) => start + i)
      const rendered = wrapper
        .findAll('input')
        .map((input) => Number(input.attributes('data-row')))
        .sort((a, b) => a - b)
      expect(rendered).toEqual(expected)
      expect(column.findAll('.wd-table__cell').length).toBe(expected.length)
      expect((column.vm as any).cellSlots.length).toBeLessThanOrEqual(16)
    }
    await wrapper.setData({ rows: [] })
    expect(wrapper.findAll('input')).toHaveLength(0)
  })

  test.each([
    { height: 320, rowHeight: 64, buffer: 5 },
    { height: 321, rowHeight: 37.5, buffer: 2 },
    { height: 100, rowHeight: 80, buffer: 1 }
  ])('窗口容量覆盖合并后剩余行且首尾移动不改变槽位：%j', async (props) => {
    const { wrapper, table, column } = await mountVirtualTable()
    // 测试环境未预处理 useParent 的平台分支，直接注入合并结果，避免依赖列索引注册。
    ;(column.vm as any).table.getSpan = (rowIndex: number) => ({ rowspan: rowIndex % 4 === 0 ? 2 : rowIndex % 4 === 1 ? 0 : 1, colspan: 1 })
    await wrapper.setData({ virtualProps: props })
    const vm = table.vm as any
    const capacity = vm.virtualSlotCount
    let previousSlots = new Map<number, number>()
    for (const scrollTop of [0, 1, props.rowHeight * 20, props.rowHeight * 21 + 1, props.rowHeight * 999, 0]) {
      vm.state.scrollTop = scrollTop
      await nextTick()
      const { start, end } = vm.visibleRange
      expect(vm.virtualSlotCount).toBe(capacity)
      expect(end - start + 1).toBeLessThanOrEqual(capacity)
      const slots = (column.vm as any).cellSlots as Array<{ rowIndex: number }>
      const rows = slots.filter((slot) => slot.rowIndex >= 0).map((slot) => slot.rowIndex)
      const expected = Array.from({ length: end - start + 1 }, (_, i) => start + i).filter((row) => row % 4 !== 1)
      expect([...rows].sort((a, b) => a - b)).toEqual(expected)
      if (process.env.UNI_PLATFORM === 'mp-weixin') {
        expect(slots).toHaveLength(capacity)
        const currentSlots = new Map(slots.filter((slot) => slot.rowIndex >= 0).map((slot) => [slot.rowIndex, slots.indexOf(slot)]))
        for (const [row, slot] of currentSlots) {
          if (previousSlots.has(row)) expect(slot).toBe(previousSlots.get(row))
        }
        previousSlots = currentSlots
      }
    }
  })

  test.each([
    { buffer: 0, start: 10, end: 18, capacity: 10 },
    { buffer: 0.25, start: 10, end: 18, capacity: 10 },
    { buffer: 1.75, start: 9, end: 19, capacity: 12 },
    { buffer: -3, start: 10, end: 18, capacity: 10 },
    { buffer: NaN, start: 5, end: 23, capacity: 20 },
    { buffer: Infinity, start: 5, end: 23, capacity: 20 },
    { buffer: 10000, start: 0, end: 99, capacity: 100 }
  ])('buffer=$buffer 时按整数行渲染且槽位容量有界', async ({ buffer, start, end, capacity }) => {
    const { wrapper, table, column } = await mountVirtualTable()
    await wrapper.setData({
      rows: Array.from({ length: 100 }, (_, id) => ({ id })),
      virtualProps: { height: 400, rowHeight: 50, buffer }
    })
    const vm = table.vm as any
    vm.state.scrollTop = 500
    await nextTick()
    expect(vm.visibleRange).toEqual({ start, end })
    expect(vm.virtualSlotCount).toBe(capacity)
    for (const scrollTop of [500, 501, 0, 4900]) {
      vm.state.scrollTop = scrollTop
      await nextTick()
      const range = vm.visibleRange
      const expected = Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i)
      const inputs = wrapper.findAll('input')
      expect(inputs.map((input) => Number(input.attributes('data-row'))).sort((a, b) => a - b)).toEqual(expected)
      expect(inputs).toHaveLength(new Set(expected).size)
      expect(expected.every(Number.isInteger)).toBe(true)
      expect(vm.virtualSlotCount).toBe(capacity)
      if (process.env.UNI_PLATFORM === 'mp-weixin') expect((column.vm as any).cellSlots).toHaveLength(capacity)
    }
    // 数据缩减后容量也收缩，避免小数据集仍分配大量隐藏槽位。
    await wrapper.setData({ rows: [{ id: 0 }, { id: 1 }] })
    expect(vm.virtualSlotCount).toBe(2)
    expect(wrapper.findAll('input').map((input) => Number(input.attributes('data-row')))).toEqual([1])
  })

  test('视口裁剪只在虚拟模式生效，关闭 virtual 后移除', async () => {
    const css = compileScss('src/uni_modules/wot-ui/components/wd-table/index.scss').css
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    try {
      const selectors = Array.from(style.sheet!.cssRules)
        .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && !!rule.style.getPropertyValue('clip-path'))
        .map((rule) => rule.selectorText)
      expect(selectors.length).toBeGreaterThan(0)
      const { wrapper } = await mountVirtualTable(false)
      for (const virtual of [false, true, false]) {
        await wrapper.setData({ virtual })
        const scroll = wrapper.find('.wd-table__scroll').element
        expect(selectors.some((selector) => scroll.matches(selector))).toBe(virtual)
      }
    } finally {
      style.remove()
    }
  })

  test('非虚拟表格保持自然行顺序', async () => {
    const { wrapper, column } = await mountVirtualTable(false)
    expect(wrapper.findAll('input').map((input) => Number(input.attributes('data-row')))).toEqual(Array.from({ length: 1000 }, (_, i) => i))
    expect((column.vm as any).cellSlots).toBe((column.vm as any).cellConfigs)
  })

  test.each([true, false])('去底边框样式只匹配逻辑末行（virtual=%s）', async (virtual) => {
    // 使用实际编译的样式选择器，确保样式仍使用 :last-child 时也能捕获回归。
    const css = compileScss('src/uni_modules/wot-ui/components/wd-table-column/index.scss').css
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    try {
      const selectors = Array.from(style.sheet!.cssRules)
        .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && rule.style.getPropertyValue('border-bottom') === 'none')
        .map((rule) => rule.selectorText.replace(/::before/g, ''))
      expect(selectors.length).toBeGreaterThan(0)
      const { table, column, wrapper } = await mountVirtualTable(virtual)
      const vm = table.vm as any
      for (const scrollTop of virtual ? [0, 500, 551, 800, 49600] : [0]) {
        vm.state.scrollTop = scrollTop
        await nextTick()
        const cellsWithoutBottomBorder = column.element.querySelectorAll(selectors.join(','))
        expect(cellsWithoutBottomBorder).toHaveLength(1)
        const lastStyle = (cellsWithoutBottomBorder[0] as HTMLElement).style
        expect(lastStyle.gridRow).toBe(virtual ? '1' : String(vm.visibleRange.end + 1))
        if (virtual) expect(lastStyle.transform).toBe(`translateY(${vm.visibleRange.end * 50}px)`)
      }
      await wrapper.setData({ rows: [] })
      expect(column.element.querySelectorAll(selectors.join(','))).toHaveLength(0)

      // 单独注入合并结果，检查最后一条配置被隐藏时，边框属于跨至末行的单元格。
      const mergedColumn = mount(WdTableColumn, {
        props: { prop: 'id', label: 'ID' },
        global: {
          provide: {
            [TABLE_KEY as symbol]: {
              props: { data: [{ id: 0 }, { id: 1 }, { id: 2 }], virtual, height: 400, rowHeight: 50, buffer: 3, border: true },
              visibleRange: ref({ start: 0, end: 2 }),
              virtualSlotCount: ref(16),
              state: { scrollLeft: 0 },
              children: [],
              internalChildren: [],
              link: () => {},
              unlink: () => {},
              getSpan: (rowIndex: number) => ({ rowspan: rowIndex === 1 ? 2 : rowIndex === 2 ? 0 : 1, colspan: 1 })
            }
          }
        }
      })
      wrappers.push(mergedColumn)
      await nextTick()
      const mergedCellsWithoutBottomBorder = mergedColumn.element.querySelectorAll(selectors.join(','))
      expect(mergedCellsWithoutBottomBorder).toHaveLength(1)
      const mergedStyle = (mergedCellsWithoutBottomBorder[0] as HTMLElement).style
      expect(mergedStyle.gridRow).toBe(virtual ? '1' : '2 / span 2')
      if (virtual) {
        expect(mergedStyle.height).toBe('100px')
        expect(mergedStyle.transform).toBe('translateY(50px)')
      }
    } finally {
      style.remove()
    }
  })

  test.skipIf(process.env.UNI_PLATFORM !== 'mp-weixin')('微信编译后的插槽名称在窗口平移、首尾收缩时保持稳定', async () => {
    // 使用项目安装的微信编译器，验证实际生成的作用域插槽调用，而不是手写插槽命名规则。
    const require = createRequire(import.meta.url)
    const weixinRequire = createRequire(require.resolve('@dcloudio/uni-mp-weixin/package.json'))
    const mpRequire = createRequire(weixinRequire.resolve('@dcloudio/uni-mp-vite/package.json'))
    const { compile } = mpRequire('@dcloudio/uni-mp-compiler')
    const source = readFileSync(resolve('src/uni_modules/wot-ui/components/wd-table-column/wd-table-column.vue'), 'utf8')
    const template = source.match(/<template>([\s\S]*?)<\/template>/)![1]
    const result = compile(template, {
      mode: 'function',
      prefixIdentifiers: true,
      filename: 'wd-table-column.vue',
      miniProgram: { class: { array: true }, event: { key: true }, slot: { dynamicSlotNames: true }, directive: 'wx:' }
    })
    let slotNames = new Map<number, string>()
    const render = new Function('Vue', result.code)({
      f: (items: unknown[], renderItem: (item: unknown, key: number, index: number) => unknown) => items.map((item, i) => renderItem(item, i, i)),
      r: (name: string, props: { index: number }, index: number) => slotNames.set(props.index, `${name}-${index}`),
      e: Object.assign,
      n: (value: unknown) => value,
      s: (value: unknown) => value,
      o: (value: unknown) => value,
      t: String,
      toDisplayString: String
    })
    const { table, column } = await mountVirtualTable()
    const vm = table.vm as any
    let previous = new Map<number, string>()
    for (const scrollTop of [0, 1, 50, 500, 550, 551, 600, 550, 49600, 49650, 49700, 49650]) {
      vm.state.scrollTop = scrollTop
      await nextTick()
      slotNames = new Map()
      render(column.vm, [])
      const { start, end } = vm.visibleRange
      expect([...slotNames.keys()].sort((a, b) => a - b)).toEqual(Array.from({ length: end - start + 1 }, (_, i) => start + i))
      for (const [rowIndex, name] of slotNames) {
        if (previous.has(rowIndex)) expect(name).toBe(previous.get(rowIndex))
      }
      previous = slotNames
    }
  })
})
