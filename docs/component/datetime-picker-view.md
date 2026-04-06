# DatetimePickerView 日期时间选择器视图

用于构建日期时间滚筒选项的基础视图组件。

## 组件类型

### 基本用法

`v-model` 绑定选中值；默认 `datetime` 类型，值为时间戳。

```html
<wd-datetime-picker-view v-model="value" @change="handleChange" />
```

```ts
const value = ref<number>(Date.now())
const handleChange = ({ value }: { value: number | string }) => {
  console.log(value)
}
```

## 组件变体

### 日期类型

支持 `datetime`、`date`、`year-month`、`year`、`time` 五种类型。

::: code-group
```html [模板]
<wd-datetime-picker-view type="date" v-model="dateValue" />
<wd-datetime-picker-view type="year-month" v-model="yearMonthValue" />
<wd-datetime-picker-view type="year" v-model="yearValue" />
<wd-datetime-picker-view type="time" v-model="timeValue" />
<wd-datetime-picker-view type="datetime" v-model="datetimeValue" />
```

```ts [脚本]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('11:12')
const datetimeValue = ref<number>(Date.now())
```
:::

### 开启秒选择

在 `time` 和 `datetime` 类型下可通过 `use-second` 展示秒列。

```html
<wd-datetime-picker-view type="time" v-model="timeValue" use-second />
<wd-datetime-picker-view type="datetime" v-model="value" use-second />
```

```ts
const timeValue = ref<string>('11:12:30')
const value = ref<number>(Date.now())
```

## 组件样式

### 修改内部格式

通过 `formatter` 自定义滚筒文案格式。

```html
<wd-datetime-picker-view v-model="value" :formatter="formatter" />
```

```ts
const formatter = (type: string, value: number) => {
  switch (type) {
    case 'year':
      return `${value}年`
    case 'month':
      return `${value}月`
    case 'date':
      return `${value}日`
    case 'hour':
      return `${value}时`
    case 'minute':
      return `${value}分`
    case 'second':
      return `${value}秒`
    default:
      return `${value}`
  }
}
```

### 过滤选项

通过 `filter` 按列过滤可选值。

```html
<wd-datetime-picker-view v-model="value" :filter="filter" />
```

```ts
const filter = ({ type, values }: { type: string; values: number[] }) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 选中项，`time` 类型为字符串，其余类型为时间戳 | `string \| number` | - |
| type | 选择器类型，可选值为 `datetime`、`date`、`year-month`、`time`、`year` | DateTimeType | datetime |
| item-height | 单项高度 | number | 44 |
| visible-item-count | 可见项数量 | number | 6 |
| value-key | 选项值字段名 | string | value |
| label-key | 选项文案字段名 | string | label |
| formatter | 自定义选项文案格式化函数 | DatetimePickerViewFormatter | - |
| filter | 自定义过滤函数 | DatetimePickerViewFilter | - |
| column-formatter | 自定义列格式化函数 | DatetimePickerViewColumnFormatter | - |
| min-date | 最小日期（时间戳） | number | 当前年份前 10 年 1 月 1 日 |
| max-date | 最大日期（时间戳） | number | 当前年份后 10 年 12 月 31 日 |
| min-hour | 最小小时（`time` 类型生效） | number | 0 |
| max-hour | 最大小时（`time` 类型生效） | number | 23 |
| min-minute | 最小分钟（`time` 类型生效） | number | 0 |
| max-minute | 最大分钟（`time` 类型生效） | number | 59 |
| use-second | 是否显示秒选择，仅 `time` 和 `datetime` 生效 | boolean | false |
| min-second | 最小秒数，仅 `time` 和 `datetime` 生效 | number | 0 |
| max-second | 最大秒数，仅 `time` 和 `datetime` 生效 | number | 59 |
| immediate-change | 是否在手指松开时立即触发 change（仅微信/支付宝小程序） | boolean | false |
| boundary-min-date | 区间模式开始时间最小边界（用于联动） | number | - |
| boundary-max-date | 区间模式结束时间最大边界（用于联动） | number | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中项变化时触发 | `{ value, columns }` |
| pickstart | 滚动开始时触发 | - |
| pickend | 滚动结束时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getSelectedOptions | 获取当前选中项对象数组 | - |
| correctValue | 纠正并返回合法值 | `value: string \| number` |
| getOriginColumns | 获取原始列定义 | - |

## Types

### DatetimePickerViewColumn

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| type | 列类型 | `year \| month \| date \| hour \| minute \| second` |
| values | 当前列可选值数组 | number[] |

### DatetimePickerViewOption

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | number |
| label | 选项展示文本 | string |
| disabled | 是否禁用 | boolean |
