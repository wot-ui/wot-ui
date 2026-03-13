# PickerView

Picker view component, used to select single or multiple values from a set of data.

## Basic Usage

Single column picker, pass a numeric array to `columns` and set `v-model` for binding value. Options can be strings or objects. If an option is an object, by default the option's `label` property is used as the display content for rendering, and the `v-model` gets the value of the option's `value` property. If the option's `value` property doesn't exist, the option's `label` value is used.

```html
<wd-picker-view :columns="columns" v-model="value" @change="onChange" />
```
```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value3 = ref<string>('')
function onChange({ selectedValues, columnIndex }) {
  toast.show(`Current selected: ${selectedValues}, Index: ${columnIndex}`)
}
```

When `columns` options are objects, their data structure is:

| Parameter | Type | Description | Version |
|-----------|------|-------------|----------|
| value | string / number / boolean | Option value, if value property doesn't exist, label is used as the option's value | - |
| label | string | Option text content | - |
| disabled | boolean | Whether the option is disabled | - |

## Disabled Options

Options can be objects with a `disabled` property set.

```html
<wd-picker-view :columns="columns" v-model="value" disabled />
```
```typescript
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value = ref('Option 3')
```

## Loading

Set the `loading` property.

```html
<wd-picker-view :columns="columns" loading />
```

## Multiple Columns

Set `columns` property as a two-dimensional array, and `value` as an array.

```html
<wd-picker-view :columns="columns" v-model="value" />
```
```typescript
const value = ref(['Central South University', 'Software Engineering'])

const columns = ref([
  ['Sun Yat-sen University', 'Central South University', 'South China University of Technology'],
  ['Computer Science and Technology', 'Software Engineering', 'Communication Engineering', 'Law', 'Economics']
])
```

## Multi-level Linkage

> Starting from version 2.0, multi-level linkage uses a new implementation. It's recommended to use the `cascade` property with tree-structured data (containing `children` field) for cascading selection.

Set the `cascade` property to `true` and pass tree-structured data with a `children` field. The component will automatically expand corresponding child data based on the selected item.

```html
<wd-picker-view :columns="cascadeColumns" v-model="value" cascade />
```

```typescript
const value = ref(['110000', '110100', '110102'])

const cascadeColumns = ref([
  {
    label: 'Beijing',
    value: '110000',
    children: [
      {
        label: 'Beijing City',
        value: '110100',
        children: [
          { label: 'Dongcheng District', value: '110101' },
          { label: 'Xicheng District', value: '110102' },
          { label: 'Chaoyang District', value: '110105' },
          { label: 'Fengtai District', value: '110106' },
          { label: 'Shijingshan District', value: '110107' }
        ]
      }
    ]
  },
  {
    label: 'Guangdong Province',
    value: '440000',
    children: [
      {
        label: 'Guangzhou City',
        value: '440100',
        children: [
          { label: 'Liwan District', value: '440103' },
          { label: 'Yuexiu District', value: '440104' },
          { label: 'Haizhu District', value: '440105' }
        ]
      },
      {
        label: 'Shenzhen City',
        value: '440300',
        children: [
          { label: 'Luohu District', value: '440303' },
          { label: 'Futian District', value: '440304' }
        ]
      }
      // ... more cities
    ]
  }
])
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value, should be array for multiple column picker | string / number / boolean / array | - | - | - |
| columns | Picker data, can be string array or object array, two-dimensional array for multiple column picker; if cascade is enabled, should be tree-structured data (with children) | array | - | - | - |
| loading | Loading state | boolean | - | false | - |
| loading-color | Loading color, can only use hexadecimal color values and cannot use abbreviated form | string | - | #4D80F0 | - |
| columns-height | Height of picker's internal cylinder | number | - | 231 | - |
| item-height | Height of picker item | number | - | 35 | 1.13.0 |
| value-key | Key for value in option object | string | - | value | - |
| label-key | Key for display text in option object | string | - | label | - |
| cascade | Enable cascade mode, columns should be tree-structured data (with children) when enabled | boolean | - | false | 2.0.0 |
| children-key | Key for children in option object in cascade mode | string | - | children | 2.0.0 |
| immediate-change | Whether to trigger picker-view's change event immediately when finger is released. If not enabled, change event will be triggered after scroll animation ends. Available since version 1.2.25, only supported on WeChat Mini Program and Alipay Mini Program. | boolean | - | false | 1.2.25 |

## Methods

| Method Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| getSelectedLabels | Get text of all columns' selected items, returns an array | - | - |
| getColumnIndex | Get selected item index of a column | columnIndex | - |
| getColumnData | Get options of a column | columnIndex | - |
| getColumnsData | Get options data of all columns | - | - |
| getSelectedOptions | Get selected items of all columns | - | - |
| getSelectedValues | Get selected values of all columns | - | - |
| getSelectedIndex | Get selected indexes of all columns | - | - |
| resetColumns | Reset column data to specified column data | columns (same type as columns in props) | 1.3.9 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when option value is modified | { selectedValues, selectedOptions, selectedIndexes, columnIndex } | - |
| pickstart | Triggered when scroll selection starts | - | - |
| pickend | Triggered when scroll selection ends | - | - |

**change Event Parameters:**

| Parameter | Description | Type |
|-----------|-------------|------|
| selectedValues | Array of selected values from all columns | Array<string \| number> |
| selectedOptions | Array of selected option objects from all columns | Array<PickerOption> |
| selectedIndexes | Array of selected indexes from all columns | Array<number> |
| columnIndex | Index of the column that changed (for single column, it's the selected item index) | number |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |