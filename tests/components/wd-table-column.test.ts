import { config, mount, type VueWrapper } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick, type VNode } from 'vue'
import WdTableColumn from '@/uni_modules/wot-ui/components/wd-table-column/wd-table-column.vue'
import WdTable from '@/uni_modules/wot-ui/components/wd-table/wd-table.vue'
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

  test('虚拟滚动下 #value 列用窗口下标作 key，平移时复用节点并更新行数据', async () => {
    const data = Array.from({ length: 100 }, (_, i) => ({ name: `name-${i}` }))
    const wrapper = mount(
      {
        template: `
          <wd-table :data="data" virtual :row-height="50" :height="400" :buffer="3">
            <wd-table-column prop="name" label="姓名" fixed>
              <template #value="{ row, index }">
                <span class="custom-cell" :data-row-index="index">{{ row.name }}</span>
              </template>
            </wd-table-column>
          </wd-table>
        `,
        data() {
          return { data }
        }
      },
      {}
    )
    await nextTick()

    const table = wrapper.findComponent(WdTable)
    const column = wrapper.findComponent(WdTableColumn)

    // scrollTop=500 → start=7,end=21；scrollTop=550 → start=8,end=22，窗口长度同为 15
    ;(table.vm as any).state.scrollTop = 500
    await nextTick()

    const before = getCellVNodes(column)
    const beforeRowIndexes = wrapper.findAll('.custom-cell').map((cell) => cell.attributes('data-row-index'))
    expect(before.length).toBe(15)
    // key 是窗口下标 0..14，而不是绝对行号 7..21
    expect(before.map((vnode) => vnode.key)).toEqual(before.map((_, i) => i))
    expect(beforeRowIndexes[0]).toBe('7')
    expect(beforeRowIndexes[14]).toBe('21')
    expect(wrapper.find('.custom-cell').text()).toBe('name-7')
    const firstCell = before[0].el as HTMLElement
    expect(firstCell.classList.contains('is-fixed')).toBe(true)
    // 斑马纹和 grid 行号仍按绝对 rowIndex，不跟窗口下标走
    expect(firstCell.classList.contains('is-stripe')).toBe(true)
    expect(firstCell.style.gridRow).toBe('8')
    const beforeEls = before.map((vnode) => vnode.el)

    ;(table.vm as any).state.scrollTop = 550
    await nextTick()

    const after = getCellVNodes(column)
    const afterRowIndexes = wrapper.findAll('.custom-cell').map((cell) => cell.attributes('data-row-index'))
    expect(after.length).toBe(before.length)
    expect(after.map((vnode) => vnode.key)).toEqual(after.map((_, i) => i))
    after.forEach((vnode, i) => {
      expect(vnode.el).toBe(beforeEls[i])
    })
    expect(afterRowIndexes[0]).toBe('8')
    expect(afterRowIndexes[14]).toBe('22')
    expect(wrapper.find('.custom-cell').text()).toBe('name-8')
    expect(firstCell.classList.contains('is-fixed')).toBe(true)
    expect(firstCell.classList.contains('is-stripe')).toBe(false)
    expect(firstCell.style.gridRow).toBe('9')
  })
})

/** 取出列内 v-for 渲染出的单元格 vnode（虚拟窗口内的节点） */
function getCellVNodes(column: VueWrapper): VNode[] {
  const children = (column.vm as any).$?.subTree?.children
  if (!Array.isArray(children)) return []
  const fragment = children.find((vnode: VNode) => String(vnode?.type) === 'Symbol(v-fgt)')
  const cells = Array.isArray(fragment?.children) ? fragment.children : children
  return cells.filter((vnode: VNode) => vnode && vnode.key != null)
}
