# PickerView 选择器视图

选择器视图，用于从一组数据中选择单个或多个值。

`wd-picker-view` 只负责滚筒选择区域本身，不包含弹出层与顶部操作栏；如果需要完整的弹窗选择器，可以使用 [Picker](./picker.md)。

当 `columns` 中的选项为对象时，组件默认读取 `label` 作为展示文本、读取 `value` 作为选中值；也可以通过 `label-key`、`value-key`、`children-key` 自定义字段映射。

## 组件类型

### 基本用法

单列选择器可直接传入字符串数组或对象数组，`v-model` 推荐始终使用数组形式保存当前选中值。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5'])
```

:::

当 `columns` 为对象数组时，单项数据结构如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| label | 选项文本 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子选项列表，用于级联模式 | `PickerOption[]` | - |

## 组件状态

### 禁用选项

通过给选项对象设置 `disabled`，可以禁止某一项被选中。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref([
  { label: '选项1', value: '选项1' },
  { label: '选项2', value: '选项2' },
  { label: '选项3', value: '选项3', disabled: true },
  { label: '选项4', value: '选项4' }
])
```

:::

## 组件变体

### 立即触发

设置 `immediate-change` 后，手指松开时就会触发 `change` 事件；默认情况下会在滚动动画结束后再触发。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" immediate-change @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref([
  { label: '选项1', value: '选项1' },
  { label: '选项2', value: '选项2' },
  { label: '选项3', value: '选项3' }
])

function handleChange({ selectedValues, selectedLabels, columnIndex }: any) {
  console.log(selectedValues, selectedLabels, columnIndex)
}
```

:::

### 多列

将 `columns` 设为二维数组即可展示多列选择器，对应的 `v-model` 仍为一维数组，按列顺序保存每一列的选中值。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref(['中南大学', '软件工程'])
const columns = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])
```

:::

### 多级联动

设置 `cascade` 后，`columns` 应传入树形数据结构。组件会根据当前选中值自动展开后续列。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" cascade />
```

```typescript
import { ref } from 'vue'

const value = ref(['110000', '110100', '110102'])
const columns = ref([
  {
    label: '北京',
    value: '110000',
    children: [
      {
        label: '北京市',
        value: '110100',
        children: [
          { label: '东城区', value: '110101' },
          { label: '西城区', value: '110102' },
          { label: '朝阳区', value: '110105' }
        ]
      }
    ]
  },
  {
    label: '广东省',
    value: '440000',
    children: [
      {
        label: '广州市',
        value: '440100',
        children: [
          { label: '荔湾区', value: '440103' },
          { label: '越秀区', value: '440104' },
          { label: '海珠区', value: '440105' }
        ]
      }
    ]
  }
])
```

:::

## 特殊用法

### 自定义字段名

通过 `value-key`、`label-key`、`children-key` 可以适配非标准字段名的数据结构。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" value-key="id" label-key="text" />
```

```typescript
import { ref } from 'vue'

const value = ref<number[]>([1])
const columns = ref([
  { id: 1, text: '选项一' },
  { id: 2, text: '选项二' },
  { id: 3, text: '选项三' }
])
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中值；单列时通常为长度为 1 的数组，多列与级联时按列顺序保存各列选中值 | `(string \| number)[]` | `[]` |
| columns | 选择器数据；可传入一维数组、对象数组、二维数组，级联模式下传入树形数据 | `Array<string \| number \| PickerOption> \| Array<Array<string \| number \| PickerOption>>` | `[]` |
| item-height | 每个选项的高度 | `number` | `44` |
| visible-item-count | 可见选项数量 | `number` | `6` |
| value-key | 选项对象中值字段对应的键名 | `string` | `'value'` |
| label-key | 选项对象中文本字段对应的键名 | `string` | `'label'` |
| immediate-change | 是否在手指松开时立即触发 `change` 事件；若不开启，则在滚动动画结束后触发 | `boolean` | `false` |
| cascade | 是否开启级联模式；开启后 `columns` 应传入树形数据 | `boolean` | `false` |
| children-key | 级联模式下子节点字段对应的键名 | `string` | `'children'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getSelectedOptions | 获取所有列选中项 | - |
| getSelectedValues | 获取所有列的选中值 | - |
| getColumnsData | 获取所有列数据 | - |
| getColumnData | 获取指定列数据 | `columnIndex: number` |
| getColumnIndex | 获取指定列的选中下标 | `columnIndex: number` |
| getSelectedLabels | 获取所有列选中项的文本 | - |
| getSelectedIndex | 获取所有列的选中下标 | - |
| resetColumns | 重置列数据 | `columns: PickerOption[] \| PickerOption[][]` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `{ selectedValues, selectedOptions, selectedLabels, selectedIndexes, columnIndex }` |
| pickstart | 开始滚动选择时触发 | - |
| pickend | 结束滚动选择时触发 | - |
| update:modelValue | `v-model` 更新时触发 | `value: (string \| number)[]` |

### change 事件参数

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| selectedValues | 所有列的选中值数组 | `Array<string \| number>` |
| selectedOptions | 所有列的选中项对象数组 | `Array<PickerOption>` |
| selectedLabels | 所有列的选中文本数组 | `Array<string>` |
| selectedIndexes | 所有列的选中下标数组 | `Array<number>` |
| columnIndex | 当前发生变化的列索引；单列时为当前选项下标 | `number` |

## Slots

组件未提供插槽。

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
