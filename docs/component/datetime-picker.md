# DatetimePicker 日期时间选择器

对 `DatetimePickerView` 的封装组件，内置日期时间列构建与弹窗交互。

## 组件类型

### 基本用法

`v-model` 绑定当前值，点击确认后通过 `confirm` 返回结果。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" @confirm="handleConfirm" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const handleConfirm = ({ value }: { value: number | string | Array<number | string> }) => {
  console.log(value)
}
```

### 限制可选时间范围

使用 `min-date` 和 `max-date` 约束日期范围。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" :min-date="minDate" :max-date="maxDate" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const minDate = new Date(new Date().getFullYear(), 0, 1).getTime()
const maxDate = new Date(new Date().getFullYear() + 1, 11, 31, 23, 59, 59).getTime()
```

## 组件状态

### 确定前校验

设置 `before-confirm`，在点击确定时执行拦截校验，支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" :before-confirm="beforeConfirm" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const beforeConfirm = (value: number | string | Array<number | string>) => {
  if (Array.isArray(value)) return true
  if (typeof value === 'number') return value <= Date.now()
  return true
}
```

## 组件变体

### 类型切换

支持 `datetime`、`date`、`year-month`、`year`、`time` 五种类型。

::: code-group
```html [模板]
<wd-datetime-picker v-model="dateValue" type="date" />
<wd-datetime-picker v-model="yearMonthValue" type="year-month" />
<wd-datetime-picker v-model="yearValue" type="year" />
<wd-datetime-picker v-model="timeValue" type="time" />
<wd-datetime-picker v-model="datetimeValue" type="datetime" />
```

```ts [脚本]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('09:20')
const datetimeValue = ref<number>(Date.now())
```
:::

### 开启秒选择

在 `time` 和 `datetime` 类型下可通过 `use-second` 显示秒。

```html
<wd-datetime-picker v-model="timeValue" type="time" use-second />
<wd-datetime-picker v-model="value" type="datetime" use-second />
```

```ts
const timeValue = ref<string>('09:20:30')
const value = ref<number>(Date.now())
```

### 区间选择

当 `v-model` 为数组时开启区间选择模式。

```html
<wd-datetime-picker v-model="rangeValue" v-model:visible="show" />
```

```ts
const rangeValue = ref<(string | number)[]>(['', Date.now()])
const show = ref(false)
```

## 组件样式

### 自定义列项格式

通过 `formatter` 自定义滚筒内选项文案。

```html
<wd-datetime-picker v-model="value" :formatter="formatter" />
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

### 过滤列选项

通过 `filter` 过滤可选项列表。

```html
<wd-datetime-picker v-model="value" :filter="filter" />
```

```ts
const filter = ({ type, values }: { type: string; values: number[] }) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
```

### 自定义区间 Tab 文案

区间选择模式下通过 `display-format-tab-label` 格式化开始/结束标签显示。

```html
<wd-datetime-picker v-model="rangeValue" :display-format-tab-label="displayFormatTabLabel" />
```

```ts
const displayFormatTabLabel = (items: Array<{ label: string | number }>) => {
  return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 绑定值。`time` 类型为字符串；区间模式为数组；其余类型为时间戳 | `string \| number \| Array<string \| number>` | - |
| visible / v-model:visible | 是否显示弹窗 | boolean | false |
| type | 选择器类型，可选值为 `datetime`、`date`、`year-month`、`time`、`year` | string | datetime |
| title | 弹出层标题 | string | - |
| cancel-button-text | 取消按钮文案 | string | - |
| confirm-button-text | 确认按钮文案 | string | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离 | boolean | true |
| item-height | 单项高度 | number | 44 |
| visible-item-count | 可见项数量 | number | 6 |
| value-key | 选项值字段名 | string | value |
| label-key | 选项文案字段名 | string | label |
| min-date | 最小日期（时间戳） | number | 当前年份前 10 年 1 月 1 日 |
| max-date | 最大日期（时间戳） | number | 当前年份后 10 年 12 月 31 日 23:59:59 |
| min-hour | 最小小时（`time` 类型生效） | number | 0 |
| max-hour | 最大小时（`time` 类型生效） | number | 23 |
| min-minute | 最小分钟（`time` 类型生效） | number | 0 |
| max-minute | 最大分钟（`time` 类型生效） | number | 59 |
| use-second | 是否显示秒选择，仅 `time` 和 `datetime` 生效 | boolean | false |
| min-second | 最小秒数，仅 `time` 和 `datetime` 生效 | number | 0 |
| max-second | 最大秒数，仅 `time` 和 `datetime` 生效 | number | 59 |
| formatter | 自定义滚筒选项格式化函数 | DatetimePickerViewFormatter | - |
| filter | 自定义过滤函数 | DatetimePickerViewFilter | - |
| before-confirm | 确定前校验函数，接收 `(value)`，返回 `boolean` 或 `Promise<boolean>` | DatetimePickerBeforeConfirm | - |
| display-format-tab-label | 区间模式下自定义 Tab 标签格式化函数 | DatetimePickerDisplayFormatTabLabel | - |
| z-index | 弹窗层级 | number | 15 |
| immediate-change | 是否在手指松开时立即触发 change（仅微信/支付宝小程序） | boolean | false |
| root-portal | 是否脱离文档流渲染（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |
| custom-view-class | pickerView 外部自定义样式类 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开弹窗时触发 | - |
| cancel | 点击取消或关闭弹窗时触发 | - |
| confirm | 点击确认按钮触发 | `{ value }` |
| change | 选中值变化时触发 | `{ value }` |
| toggle | 区间模式切换开始/结束 Tab 时触发 | 当前激活 Tab 对应的值 |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开 picker 弹框 | - |
| close | 关闭 picker 弹框 | - |
