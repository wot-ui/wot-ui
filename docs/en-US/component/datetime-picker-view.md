# DatetimePickerView Date Time Picker View

A base view component for building date and time roller options.

## Component Type

### Basic Usage

`v-model` binds the selected value; default type is `datetime`, value is timestamp.

```html
<wd-datetime-picker-view v-model="value" @change="handleChange" />
```

```ts
const value = ref<number>(Date.now())
const handleChange = ({ value }: { value: number | string }) => {
  console.log(value)
}
```

## Component Variants

### Date Types

Supports five types: `datetime`, `date`, `year-month`, `year`, `time`.

::: code-group
```html [Template]
<wd-datetime-picker-view type="date" v-model="dateValue" />
<wd-datetime-picker-view type="year-month" v-model="yearMonthValue" />
<wd-datetime-picker-view type="year" v-model="yearValue" />
<wd-datetime-picker-view type="time" v-model="timeValue" />
<wd-datetime-picker-view type="datetime" v-model="datetimeValue" />
```

```ts [Script]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('11:12')
const datetimeValue = ref<number>(Date.now())
```
:::

### Enable Seconds Selection

In `time` and `datetime` types, you can display the seconds column via `use-second`.

```html
<wd-datetime-picker-view type="time" v-model="timeValue" use-second />
<wd-datetime-picker-view type="datetime" v-model="value" use-second />
```

```ts
const timeValue = ref<string>('11:12:30')
const value = ref<number>(Date.now())
```

## Component Style

### Custom Internal Format

Customize roller text format via `formatter`.

```html
<wd-datetime-picker-view v-model="value" :formatter="formatter" />
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

### Filter Options

Filter selectable values by column via `filter`.

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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model / modelValue | Selected item, `time` type is string, others are timestamp | `string \| number` | - |
| type | Picker type, optional values are `datetime`, `date`, `year-month`, `time`, `year` | DateTimeType | datetime |
| item-height | Single item height | number | 44 |
| visible-item-count | Number of visible items | number | 6 |
| value-key | Option value field name | string | value |
| label-key | Option text field name | string | label |
| formatter | Custom option text formatting function | DatetimePickerViewFormatter | - |
| filter | Custom filter function | DatetimePickerViewFilter | - |
| column-formatter | Custom column formatting function | DatetimePickerViewColumnFormatter | - |
| min-date | Minimum date (timestamp) | number | January 1st, 10 years before current year |
| max-date | Maximum date (timestamp) | number | December 31st, 10 years after current year |
| min-hour | Minimum hour (effective for `time` type) | number | 0 |
| max-hour | Maximum hour (effective for `time` type) | number | 23 |
| min-minute | Minimum minute (effective for `time` type) | number | 0 |
| max-minute | Maximum minute (effective for `time` type) | number | 59 |
| use-second | Whether to display seconds selection, only effective for `time` and `datetime` | boolean | false |
| min-second | Minimum seconds, only effective for `time` and `datetime` | number | 0 |
| max-second | Maximum seconds, only effective for `time` and `datetime` | number | 59 |
| immediate-change | Whether to trigger change immediately when finger is released (WeChat/Alipay Mini Program only) | boolean | false |
| boundary-min-date | Range mode start time minimum boundary (for linkage) | number | - |
| boundary-max-date | Range mode end time maximum boundary (for linkage) | number | - |
| custom-class | Custom class name for root node | string | `''` |
| custom-style | Custom style for root node | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when selected item changes | `{ value, columns }` |
| pickstart | Triggered when scrolling starts | - |
| pickend | Triggered when scrolling ends | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| getSelectedOptions | Get current selected item object array | - |
| correctValue | Correct and return valid value | `value: string \| number` |
| getOriginColumns | Get original column definitions | - |

## Types

### DatetimePickerViewColumn

| Key | Description | Type |
| --- | --- | --- |
| type | Column type | `year \| month \| date \| hour \| minute \| second` |
| values | Current column selectable value array | number[] |

### DatetimePickerViewOption

| Key | Description | Type |
| --- | --- | --- |
| value | Option value | number |
| label | Option display text | string |
| disabled | Whether disabled | boolean |
