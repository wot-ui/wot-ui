import { config, mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdTableColumn from '@/uni_modules/wot-design-uni/components/wd-table-column/wd-table-column.vue'
import WdTable from '@/uni_modules/wot-design-uni/components/wd-table/wd-table.vue'
import WdSortButton from '@/uni_modules/wot-design-uni/components/wd-sort-button/wd-sort-button.vue'

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
