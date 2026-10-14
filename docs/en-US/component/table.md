# Table

Used to display multiple pieces of similarly structured data, supporting fixed columns, sorting, cell merging, and virtual scrolling.

::: warning Tip
After `1.5.0`, `height` no longer provides a default value. When enabling vertical scrolling or virtual scrolling, it is recommended to explicitly pass a numeric height.
:::

## Component Types

### Basic Usage

Pass table data through `data`, and define column structure through multiple `wd-table-column`.

Demo page corresponding content: Basic table, sort events, row click events.

```ts
import type { TableColumn } from '@/uni_modules/wot-ui/components/wd-table-column/types'
import { ref } from 'vue'

interface TableData {
  name: string
  school: string
  major: string
  gender: string
  graduation: string
  grade: number
  compare: string
  hobby: string
}

const dataList = ref<TableData[]>([
  {
    name: 'Guan Yu',
    school: 'Wuhan Yangluo Mung Bean College',
    major: 'Computer Science and Technology',
    gender: 'Male',
    graduation: 'January 12, 2022',
    grade: 66,
    compare: '48%',
    hobby: 'Yan Liang and Wen Chou, in my view, are like chickens and dogs.'
  },
  {
    name: 'Liu Bei',
    school: 'Wuhan Yangluo Weaving College',
    major: 'Computer Science and Technology',
    gender: 'Male',
    graduation: 'January 12, 2022',
    grade: 68,
    compare: '21%',
    hobby: 'Getting Kong Ming is like a fish getting water.'
  }
])

function handleSort(column: TableColumn) {
  dataList.value = dataList.value.reverse()
}

function handleRowClick({ rowIndex }: { rowIndex: number }) {
  console.log(rowIndex)
}
```

### Fixed Columns

Fix columns through the `fixed` property of `TableColumn`. Currently only supports fixing on the left side. The writing order of fixed columns needs to be consistent with the final display order.

Demo page corresponding content: Fix "Name" and "Score" columns, other columns can be viewed by horizontal scrolling.

### Show Index

Enable index column through `index`. When passing an object, you can continue to configure the width, alignment, and other properties of the index column.

Demo page corresponding content: Custom index column centered display.

### Custom Column Template

`TableColumn` provides a `value` scoped slot, which can get the current row data and row index to customize cell content.

Demo page corresponding content: Score column additionally displays year-over-year information.

::: warning Overlays inside virtual table slots
When `virtual` is enabled, clipping of the table's scroll area and cell positioning can affect overlays inside cells. When using overlay components such as `wd-picker` or `wd-popup` in the `value` slot, explicitly enable `root-portal` on the overlay component (it defaults to `false`) to avoid misplaced or clipped popups and backdrops. Regular tables do not use these virtual scrolling clipping and transform styles.

For example, add `root-portal` to your existing Picker / Popup usage:

```html
<wd-picker v-model="value" v-model:visible="showPicker" :columns="columns" root-portal />
<wd-popup v-model="showPopup" position="bottom" root-portal>Popup content</wd-popup>
```

Root portal rendering supports H5, App, WeChat Mini Programs, and Alipay Mini Programs (excluding DingTalk). See [RootPortal](./root-portal.md). On other platforms, or when using a custom overlay without `root-portal` support, place the overlay outside the table and control its visibility from a trigger inside the cell.
:::

### Merge Cells

Control cell spanning through `span-method`. Callback returns `{ rowspan, colspan }`. When returning empty, it is processed as `{ rowspan: 1, colspan: 1 }`.

```ts
import type { SpanMethodParams } from '@/uni_modules/wot-ui/components/wd-table/types'
import { computed } from 'vue'

const spanData = computed(() => dataList.value.slice(0, 5))

function handleSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 0) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 0 && columnIndex === 1) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 2 && columnIndex === 0) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 3 && columnIndex === 0) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

### Merge Custom Columns

`span-method` can be combined with `value` slot.

```ts
function handleCustomSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 0) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 1 && columnIndex === 0) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 3 && columnIndex === 2) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 3 && columnIndex === 3) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

### Fixed Column Merge

Cell merging is also supported in fixed column scenarios.

```ts
function handleFixedSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 1 && columnIndex === 1) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 2 && columnIndex === 1) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 3 && columnIndex === 3) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 3 && columnIndex === 4) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

### Fixed Header Merge

Setting `height` defaults to fixed header, which can be used together with `span-method`.

```ts
function handleHeaderSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 2) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 1 && columnIndex === 2) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 4 && columnIndex === 3) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 5 && columnIndex === 3) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

### Virtual Scrolling

For large data volume scenarios, you can enable `virtual`, and control the visible area rendering range through `row-height` and `buffer`.

```ts
const virtualData = Array.from({ length: 10000 }, (_, index) => ({
  index: index + 1,
  name: 'Shu Soldier' + (index + 1),
  score: Math.floor(Math.random() * 100),
  remark: 'This is the remark for Shu Soldier ' + (index + 1)
}))
```

In WeChat Mini Programs, uni-app reuses scoped slot instances. If the `value` slot contains a component with internal state, wrap it in a single-item `v-for` with a stable business `key` to prevent state from carrying over to another row after scrolling. The example below uses `wd-input-number` to edit quantities and stores each value in the row's `quantity` field. The `row.id` must be a stable, unique identifier in your data.

::: code-group

```html [template]
<wd-table :data="editableVirtualData" :height="320" virtual :row-height="64">
  <wd-table-column prop="quantity" label="Quantity" width="100%" align="center">
    <template #value="{ row }">
      <view v-for="item in [row]" :key="item.id">
        <wd-input-number v-model="item.quantity" :min="0" :max="99" />
      </view>
    </template>
  </wd-table-column>
</wd-table>
```

```ts [script]
import { ref } from 'vue'

const editableVirtualData = ref(Array.from({ length: 200 }, (_, index) => ({ id: index + 1, quantity: index % 10 })))
```

:::

Cells may be unmounted or reused during virtual scrolling. Store input values, selection state, and other data that must persist in the row data or external state, rather than relying solely on the child component's internal state.

`root-portal` only changes where the overlay is rendered; it does not prevent its owning cell from being unmounted. If the overlay must stay open after its row leaves the virtual rendering range, place the overlay component outside the table and keep the active row and visibility state outside the cell as well.

For virtual tables, the CSS variable `--wot-table-scroll-clip-inset` adjusts the vertical inset of the scroll viewport's clipping region. It only controls the inset distance: setting it to `0` still clips content outside the viewport. It does not disable clipping or replace `root-portal` on overlay components.

## Component States

### No Border

Setting `border` to `false` hides cell borders.

### No Zebra Stripes

Setting `stripe` to `false` turns off the alternating row background.

### Hide Header

Setting `show-header` to `false` hides the header area.

## Special Styles

### Non-Fixed Header with Pagination

Setting `fixed-header` to `false` allows the table to be combined with a paginator.

```ts
import { computed, ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(dataList.value.length)

const paginationData = computed(() => {
  return dataList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})
```

## Table Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| data | Table data source | `Record<string, any>[]` | - |
| border | Whether to show border | `boolean` | `true` |
| stripe | Whether to show zebra stripes | `boolean` | `true` |
| height | Table maximum height, enables vertical scrolling when set | `string \| number` | - |
| show-header | Whether to show header | `boolean` | `true` |
| ellipsis | Whether to ellipsis text after exceeding two lines | `boolean` | `false` |
| index | Whether to show index column, can customize index column config when passing object | `boolean \| Omit<Partial<TableColumnProps>, 'prop'>` | `false` |
| fixed-header | Whether to fix header | `boolean` | `true` |
| span-method | Cell merge method, returns `{ rowspan, colspan }` | `SpanMethod` | - |
| virtual | Whether to enable virtual scrolling | `boolean` | `false` |
| row-height | Virtual scrolling row height | `number` | `44` |
| buffer | Extra rows rendered above and below the virtual viewport; supports `0`, rounds fractions down, clamps negative values to `0`, and uses the default for non-finite values | `number` | `5` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Table Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| sort-method | Triggered after clicking sortable column header | `TableColumn` |
| row-click | Triggered when clicking table row | `{ rowIndex: number }` |

## Table Slots

| Name | Description |
| --- | --- |
| default | Table column content, usually places one or more `wd-table-column` |

## TableColumn Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| prop | Column corresponding data field name | `string` | - |
| label | Column title | `string` | - |
| width | Column width | `string \| number` | `100` |
| sortable | Whether to enable sorting | `boolean` | `false` |
| fixed | Whether to fix current column, only supports fixing on the left | `boolean` | `false` |
| align | Content alignment, optional values are `left`, `center`, `right` | `AlignType` | `left` |

## TableColumn Slots

| Name | Description |
| --- | --- |
| value | Custom cell content, slot parameters are `{ row, index }` |
