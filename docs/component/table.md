# Table 表格

用于展示多条结构类似的数据，支持固定列、排序、合并单元格与虚拟滚动等能力。

## 组件类型

### 基本用法

通过 `data` 传入表格数据，通过多个 `wd-table-column` 定义列结构。`sort-method` 事件在点击可排序列表头时触发，`row-click` 事件在点击行时触发。

::: code-group

```html [template]
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

```ts [script]
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

:::

### 固定列

通过 `wd-table-column` 的 `fixed` 属性固定列。固定列仅支持固定在左侧，**固定列的书写顺序需要与最终展示顺序一致**。

```html
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

### 显示索引

通过 `index` 开启序号列。传入对象时，可配置索引列的宽度、对齐方式等属性（`prop` 除外的所有 `TableColumn` 属性）。

```html
<wd-table :data="dataList" :height="400" :index="{ align: 'center' }" @sort-method="handleSort">
  <wd-table-column prop="name" label="姓名" sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" sortable align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

### 自定义列模板

`wd-table-column` 提供 `value` 作用域插槽，插槽参数为 `{ row, index }`，可拿到当前行数据与行索引，自定义单元格内容。

```html
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed sortable align="center">
    <template #value="{ row }">
      <view>
        <text>{{ row.grade }}</text>
        <text>同比{{ row.compare }}</text>
      </view>
    </template>
  </wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
  <wd-table-column prop="graduation" label="学成时间"></wd-table-column>
</wd-table>
```

### 合并单元格

通过 `span-method` 控制单元格跨行跨列。回调接收 `{ row, column, rowIndex, columnIndex }` 四个参数，返回 `{ rowspan, colspan }` 或 `void`（等同 `{ rowspan: 1, colspan: 1 }`）。`rowspan`/`colspan` 为 `0` 表示该单元格被合并隐藏。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleSpan" :height="400">
  <wd-table-column prop="name" label="姓名" align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="school" label="求学之所"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
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

:::

### 合并自定义列

`span-method` 可以与 `value` 插槽组合使用，对自定义渲染的列同样生效。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleCustomSpan" :height="400">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center">
    <template #value="{ row }">
      <view>
        <text>{{ row.grade }}</text>
        <text>同比{{ row.compare }}</text>
      </view>
    </template>
  </wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
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

:::

### 固定列合并

固定列场景下同样支持单元格合并，`span-method` 与 `fixed` 可同时使用。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleFixedSpan" :height="400">
  <wd-table-column prop="name" label="姓名" fixed align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

```ts [script]
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

:::

### 固定表头合并

设置 `height` 后表头默认固定（`fixed-header` 默认为 `true`），此时仍可通过 `span-method` 合并表体单元格。

::: code-group

```html [template]
<wd-table :data="dataList" :span-method="handleHeaderSpan" :height="300">
  <wd-table-column prop="name" label="姓名" align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="school" label="求学之所"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
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

:::

### 虚拟滚动

大数据量场景可开启 `virtual`，通过 `row-height` 指定固定行高（必填），`buffer` 控制可视区域上下额外预渲染行数。

::: code-group

```html [template]
<wd-table :data="virtualData" :height="400" virtual :row-height="50">
  <wd-table-column prop="index" label="序号" width="80" align="center"></wd-table-column>
  <wd-table-column prop="name" label="姓名" width="120" align="center"></wd-table-column>
  <wd-table-column prop="score" label="分数" width="100" align="center"></wd-table-column>
  <wd-table-column prop="remark" label="备注" width="200"></wd-table-column>
</wd-table>
```

```ts [script]
const virtualData = Array.from({ length: 10000 }, (_, index) => ({
  index: index + 1,
  name: `蜀兵${index + 1}号`,
  score: Math.floor(Math.random() * 100),
  remark: `这是蜀兵${index + 1}号的备注信息`
}))
```

:::

## 组件状态

### 无边框

设置 `border` 为 `false` 可隐藏单元格边框。

```html
<wd-table :data="dataList" :height="400" :border="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

### 无斑马纹

设置 `stripe` 为 `false` 可关闭奇偶行区分背景。

```html
<wd-table :data="dataList" :height="400" :stripe="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

### 不显示表头

设置 `show-header` 为 `false` 可隐藏表头区域。

```html
<wd-table :data="dataList" :height="400" :show-header="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

## 特殊样式

### 不固定表头结合分页器

将 `fixed-header` 设为 `false` 后，表头随表体一起滚动，可将表格与分页器组合展示。

::: code-group

```html [template]
<wd-table :data="paginationData" :fixed-header="false">
  <wd-table-column prop="name" label="姓名" fixed align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
<wd-pagination v-model="page" :total="total"></wd-pagination>
```

```ts [script]
import { computed, ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(dataList.value.length)

const paginationData = computed(() => {
  return dataList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})
```

:::

## Table Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据源（必填） | <code>Record&lt;string, any&gt;[]</code> | - |
| border | 是否显示边框 | `boolean` | `true` |
| stripe | 是否显示斑马纹 | `boolean` | `true` |
| height | 表格最大高度，设置后可纵向滚动；开启虚拟滚动时必须传入数值类型 | <code>string &#124; number</code> | - |
| show-header | 是否显示表头 | `boolean` | `true` |
| ellipsis | 单元格文本是否超出两行后省略 | `boolean` | `false` |
| index | 是否显示索引列，传入对象时可自定义索引列配置（`prop` 除外） | <code>boolean &#124; Omit&lt;Partial&lt;TableColumnProps&gt;, 'prop'&gt;</code> | `false` |
| fixed-header | 是否固定表头（使用 CSS sticky 定位） | `boolean` | `true` |
| span-method | 合并单元格方法，回调参数为 `SpanMethodParams`，返回 `{ rowspan, colspan }` 或 `void`（等同 `{ rowspan: 1, colspan: 1 }`） | `SpanMethod` | - |
| virtual | 是否开启虚拟滚动，大数据量时只渲染可视区域行 | `boolean` | `false` |
| row-height | 虚拟滚动固定行高，开启 `virtual` 时必须传入 | `number` | `44` |
| buffer | 虚拟滚动可视区域上下各额外预渲染行数 | `number` | `5` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Table Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| sort-method | 点击可排序列表头后触发 | `column: TableColumn` |
| row-click | 点击表格行时触发 | `{ rowIndex: number }` |

## Table Slots

| 名称 | 说明 |
| --- | --- |
| default | 表格列内容，通常放置一个或多个 `wd-table-column` |

## TableColumn Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 列对应的数据字段名（必填） | `string` | - |
| label | 列标题（必填） | `string` | - |
| width | 列宽度 | <code>string &#124; number</code> | `100` |
| sortable | 是否开启排序 | `boolean` | `false` |
| fixed | 是否固定当前列，仅支持固定在左侧 | `boolean` | `false` |
| align | 内容对齐方式，可选值为 `left`、`center`、`right` | `AlignType` | `left` |

## TableColumn Slots

| 名称 | 说明 |
| --- | --- |
| value | 自定义单元格内容，插槽参数为 `{ row: Record<string, any>, index: number }` |

## 类型定义

```ts
import type { SpanMethodParams, SpanMethodResult, SpanMethod } from '@/uni_modules/wot-ui/components/wd-table/types'
import type { TableColumn, AlignType } from '@/uni_modules/wot-ui/components/wd-table-column/types'

/** span-method 回调参数 */
interface SpanMethodParams {
  /** 当前行的数据对象 */
  row: Record<string, any>
  /** 当前列的配置 */
  column: { prop: string; label: string }
  /** 当前行索引，从 0 开始 */
  rowIndex: number
  /** 当前列索引，从 0 开始 */
  columnIndex: number
}

/** span-method 返回值 */
interface SpanMethodResult {
  /** 合并行数，0 表示该单元格被隐藏，大于 1 表示向下合并 N 行 */
  rowspan: number
  /** 合并列数，0 表示该单元格被隐藏，大于 1 表示向右合并 N 列 */
  colspan: number
}

type SpanMethod = (params: SpanMethodParams) => SpanMethodResult | void
```
