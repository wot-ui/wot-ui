# DatetimePicker

Encapsulated component for `DatetimePickerView`, built-in date time column building and popup interaction.

## Component Type

### Basic Usage

`v-model` binds current value, click confirm to return result through `confirm`.

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

### Limit Selectable Time Range

Use `min-date` and `max-date` to constrain date range.

```html
<wd-datetime-picker v-model="value" v-model:visible="show" :min-date="minDate" :max-date="maxDate" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const minDate = new Date(new Date().getFullYear(), 0, 1).getTime()
const maxDate = new Date(new Date().getFullYear() + 1, 11, 31, 23, 59, 59).getTime()
```

## Component State

### Pre-confirm Validation

Set `before-confirm`, execute interception check when clicking confirm, supports returning `boolean` or `Promise<boolean>`.

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

## Component Variant

### Type Switch

Supports `datetime`, `date`, `year-month`, `year`, `time` five types.

::: code-group
```html [Template]
<wd-datetime-picker v-model="dateValue" type="date" />
<wd-datetime-picker v-model="yearMonthValue" type="year-month" />
<wd-datetime-picker v-model="yearValue" type="year" />
<wd-datetime-picker v-model="timeValue" type="time" />
<wd-datetime-picker v-model="datetimeValue" type="datetime" />
```

```ts [Script]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('09:20')
const datetimeValue = ref<number>(Date.now())
```
:::

### Enable Second Selection

In `time` and `datetime` types, seconds can be displayed through `use-second`.

```html
<wd-datetime-picker v-model="timeValue" type="time" use-second />
<wd-datetime-picker v-model="value" type="datetime" use-second />
```

```ts
const timeValue = ref<string>('09:20:30')
const value = ref<number>(Date.now())
```

### Range Selection

When `v-model` is an array, range selection mode is enabled.

```html
<wd-datetime-picker v-model="rangeValue" v-model:visible="show" />
```

```ts
const rangeValue = ref<(string | number)[]>(['', Date.now()])
const show = ref(false)
```

## Component Style

### Custom Column Item Format

Customize roller option text through `formatter`.

```html
<wd-datetime-picker v-model="value" :formatter="formatter" />
```

```ts
const formatter = (type: string, value: number) => {
  switch (type) {
    case 'year':
      return `${value}Year`
    case 'month':
      return `${value}Month`
    case 'date':
      return `${value}Day`
    case 'hour':
      return `${value}Hour`
    case 'minute':
      return `${value}Minute`
    case 'second':
      return `${value}Second`
    default:
      return `${value}`
  }
}
```

### Filter Column Options

Filter optional list through `filter`.

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

### Custom Range Tab Text

In range selection mode, format start/end label display through `display-format-tab-label`.

```html
<wd-datetime-picker v-model="rangeValue" :display-format-tab-label="displayFormatTabLabel" />
```

```ts
const displayFormatTabLabel = (items: Array<{ label: string | number }>) => {
  return `${items[0].label}Year${items[1].label}Month${items[2].label}Day ${items[3].label}:${items[4].label}`
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model / modelValue | Binding value. `time` type is string; range mode is array; other types are timestamp | `string \| number \| Array<string \| number>` | - |
| visible / v-model:visible | Whether to show popup | boolean | false |
| type | Picker type, optional values are `datetime`, `date`, `year-month`, `time`, `year` | string | datetime |
| title | Popup title | string | - |
| cancel-button-text | Cancel button text | string | - |
| confirm-button-text | Confirm button text | string | - |
| close-on-click-modal | Whether to close when clicking mask | boolean | true |
| safe-area-inset-bottom | Whether popup panel sets bottom safe distance | boolean | true |
| item-height | Single item height | number | 44 |
| visible-item-count | Visible item count | number | 6 |
| value-key | Option value field name | string | value |
| label-key | Option text field name | string | label |
| min-date | Minimum date (timestamp) | number | January 1st of current year minus 10 years |
| max-date | Maximum date (timestamp) | number | December 31st of current year plus 10 years 23:59:59 |
| min-hour | Minimum hour (effective for `time` type) | number | 0 |
| max-hour | Maximum hour (effective for `time` type) | number | 23 |
| min-minute | Minimum minute (effective for `time` type) | number | 0 |
| max-minute | Maximum minute (effective for `time` type) | number | 59 |
| use-second | Whether to show second selection, only effective for `time` and `datetime` | boolean | false |
| min-second | Minimum seconds, only effective for `time` and `datetime` | number | 0 |
| max-second | Maximum seconds, only effective for `time` and `datetime` | number | 59 |
| formatter | Custom roller option format function | DatetimePickerViewFormatter | - |
| filter | Custom filter function | DatetimePickerViewFilter | - |
| before-confirm | Pre-confirm validation function, receives `(value)`, returns `boolean` or `Promise<boolean>` | DatetimePickerBeforeConfirm | - |
| display-format-tab-label | Custom Tab label format function in range mode | DatetimePickerDisplayFormatTabLabel | - |
| z-index | Popup z-index | number | 15 |
| immediate-change | Whether to trigger change immediately when finger is released (only WeChat/Alipay Mini Program) | boolean | false |
| root-portal | Whether to detach from document flow rendering (H5: teleport, App: renderjs, Mini Program: root-portal) | boolean | false |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |
| custom-view-class | pickerView external custom style class | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when popup opens | - |
| cancel | Triggered when clicking cancel or closing popup | - |
| confirm | Triggered when clicking confirm button | `{ value }` |
| change | Triggered when selected value changes | `{ value }` |
| toggle | Triggered when switching start/end Tab in range mode | Value of currently active Tab |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Open picker popup | - |
| close | Close picker popup | - |
