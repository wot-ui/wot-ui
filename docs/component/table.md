# Table 表格

用于展示多条结构类似的数据，支持固定列、排序、合并单元格与虚拟滚动等能力。

::: warning 提示
`1.5.0` 后 `height` 不再提供默认值。开启纵向滚动或虚拟滚动时，建议显式传入数值类型高度。
:::

## 组件类型

### 基本用法

通过 `data` 传入表格数据，通过多个 `wd-table-column` 定义列结构。

演示页对应内容：基础表格、排序事件、行点击事件。

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
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '48%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 68,
    compare: '21%',
    hobby: '我得孔明，如鱼得水也'
  }
])

function handleSort(column: TableColumn) {
  dataList.value = dataList.value.reverse()
}

function handleRowClick({ rowIndex }: { rowIndex: number }) {
  console.log(rowIndex)
}
```

### 固定列

通过 `TableColumn` 的 `fixed` 属性固定列。当前仅支持固定在左侧，固定列的书写顺序需要与最终展示顺序一致。

演示页对应内容：固定“姓名”和“分数”两列，其余列可横向滚动查看。

### 显示索引

通过 `index` 开启序号列。传入对象时，可继续配置索引列的宽度、对齐方式等属性。

演示页对应内容：自定义索引列居中显示。

### 自定义列模板

`TableColumn` 提供 `value` 作用域插槽，可拿到当前行数据与行索引，自定义单元格内容。

演示页对应内容：分数列额外展示同比信息。

### 合并单元格

通过 `span-method` 控制单元格跨行跨列。回调返回 `{ rowspan, colspan }`，返回空值时按 `{ rowspan: 1, colspan: 1 }` 处理。

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

### 合并自定义列

`span-method` 可以与 `value` 插槽组合使用。

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

### 固定列合并

固定列场景下同样支持单元格合并。

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

### 固定表头合并

设置 `height` 后表头默认固定，可与 `span-method` 一起使用。

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

### 虚拟滚动

大数据量场景可开启 `virtual`，并通过 `row-height`、`buffer` 控制可视区域渲染范围。

```ts
const virtualData = Array.from({ length: 10000 }, (_, index) => ({
  index: index + 1,
  name: '蜀兵' + (index + 1) + '号',
  score: Math.floor(Math.random() * 100),
  remark: '这是蜀兵' + (index + 1) + '号的备注信息'
}))
```

## 组件状态

### 无边框

设置 `border` 为 `false` 可隐藏单元格边框。

### 无斑马纹

设置 `stripe` 为 `false` 可关闭奇偶行区分背景。

### 不显示表头

设置 `show-header` 为 `false` 可隐藏表头区域。

## 特殊样式

### 不固定表头结合分页器

将 `fixed-header` 设为 `false` 后，可将表格与分页器组合展示。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据源 | <code>Record&lt;string, any&gt;[]</code> | - |
| border | 是否显示边框 | `boolean` | `true` |
| stripe | 是否显示斑马纹 | `boolean` | `true` |
| height | 表格最大高度，设置后可纵向滚动 | <code>string &#124; number</code> | - |
| show-header | 是否显示表头 | `boolean` | `true` |
| ellipsis | 单元格文本是否超出两行后省略 | `boolean` | `false` |
| index | 是否显示索引列，传入对象时可自定义索引列配置 | <code>boolean &#124; Omit&lt;Partial&lt;TableColumnProps&gt;, 'prop'&gt;</code> | `false` |
| fixed-header | 是否固定表头 | `boolean` | `true` |
| span-method | 合并单元格方法，返回 `{ rowspan, colspan }` | `SpanMethod` | - |
| virtual | 是否开启虚拟滚动 | `boolean` | `false` |
| row-height | 虚拟滚动行高 | `number` | `44` |
| buffer | 虚拟滚动上下预渲染行数 | `number` | `5` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Table Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| sort-method | 点击可排序列表头后触发 | `TableColumn` |
| row-click | 点击表格行时触发 | `{ rowIndex: number }` |

## Table Slots

| 名称 | 说明 |
| --- | --- |
| default | 表格列内容，通常放置一个或多个 `wd-table-column` |

## TableColumn Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 列对应的数据字段名 | `string` | - |
| label | 列标题 | `string` | - |
| width | 列宽度 | <code>string &#124; number</code> | `100` |
| sortable | 是否开启排序 | `boolean` | `false` |
| fixed | 是否固定当前列，仅支持固定在左侧 | `boolean` | `false` |
| align | 内容对齐方式，可选值为 `left`、`center`、`right` | `AlignType` | `left` |

## TableColumn Slots

| 名称 | 说明 |
| --- | --- |
| value | 自定义单元格内容，插槽参数为 `{ row, index }` |
