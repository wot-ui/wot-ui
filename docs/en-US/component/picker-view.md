# PickerView

Picker view, used to select single or multiple values from a set of data.

`wd-picker-view` is only responsible for the roller selection area itself, and does not include the popup layer and top action bar; if you need a complete popup selector, you can use [Picker](./picker.md).

When the options in `columns` are objects, the component defaults to reading `label` as the display text and `value` as the selected value; you can also customize field mapping through `label-key`, `value-key`, and `children-key`.

## Component Types

### Basic Usage

Single column picker can directly pass a string array or object array. `v-model` is recommended to always use array form to save the current selected value.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['Option 1'])
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'])
```

:::

When `columns` is an object array, the single item data structure is as follows:

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value | Option value | `string \| number` | - |
| label | Option text | `string \| number` | - |
| disabled | Whether disabled | `boolean` | `false` |
| children | Sub-option list, used for cascade mode | `PickerOption[]` | - |

## Component States

### Disabled Options

By setting `disabled` on the option object, you can prevent an item from being selected.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['Option 1'])
const columns = ref([
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3', disabled: true },
  { label: 'Option 4', value: 'Option 4' }
])
```

:::

## Component Variants

### Immediate Trigger

Set `immediate-change` to trigger the `change` event when the finger is released; by default, it will trigger after the scrolling animation ends.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" immediate-change @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['Option 1'])
const columns = ref([
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' }
])

function handleChange({ selectedValues, selectedLabels, columnIndex }: any) {
  console.log(selectedValues, selectedLabels, columnIndex)
}
```

:::

### Multiple Columns

Set `columns` to a two-dimensional array to display a multi-column picker. The corresponding `v-model` is still a one-dimensional array, saving the selected value of each column in column order.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref(['Central South University', 'Software Engineering'])
const columns = ref([
  ['Sun Yat-sen University', 'Central South University', 'South China University of Technology'],
  ['Computer Science and Technology', 'Software Engineering', 'Communication Engineering', 'Law', 'Economics']
])
```

:::

### Multi-level Cascade

Set `cascade`, and `columns` should be passed in tree structure data. The component will automatically expand subsequent columns based on the current selected value.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" cascade />
```

```typescript
import { ref } from 'vue'

const value = ref(['110000', '110100', '110102'])
const columns = ref([
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
          { label: 'Chaoyang District', value: '110105' }
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
      }
    ]
  }
])
```

:::

## Special Usage

### Custom Field Names

You can adapt to non-standard field name data structures through `value-key`, `label-key`, and `children-key`.

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" value-key="id" label-key="text" />
```

```typescript
import { ref } from 'vue'

const value = ref<number[]>([1])
const columns = ref([
  { id: 1, text: 'Option One' },
  { id: 2, text: 'Option Two' },
  { id: 3, text: 'Option Three' }
])
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current selected value; usually an array of length 1 for single column, saves selected values of each column in column order for multiple columns and cascade | `(string \| number)[]` | `[]` |
| columns | Picker data; can pass one-dimensional array, object array, two-dimensional array, tree data in cascade mode | `Array<string \| number \| PickerOption> \| Array<Array<string \| number \| PickerOption>>` | `[]` |
| item-height | Height of each option | `number` | `44` |
| visible-item-count | Number of visible options | `number` | `6` |
| value-key | Key name for the value field in the option object | `string` | `'value'` |
| label-key | Key name for the text field in the option object | `string` | `'label'` |
| immediate-change | Whether to trigger `change` event immediately when finger is released; if not enabled, triggers after scrolling animation ends | `boolean` | `false` |
| cascade | Whether to enable cascade mode; when enabled, `columns` should be passed tree data | `boolean` | `false` |
| children-key | Key name for child nodes in cascade mode | `string` | `'children'` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| getSelectedOptions | Get all column selected items | - |
| getSelectedValues | Get all column selected values | - |
| getColumnsData | Get all column data | - |
| getColumnData | Get specified column data | `columnIndex: number` |
| getColumnIndex | Get selected index of specified column | `columnIndex: number` |
| getSelectedLabels | Get text of all column selected items | - |
| getSelectedIndex | Get selected index of all columns | - |
| resetColumns | Reset column data | `columns: PickerOption[] \| PickerOption[][]` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when selected value changes | `{ selectedValues, selectedOptions, selectedLabels, selectedIndexes, columnIndex }` |
| pickstart | Triggered when starting to scroll selection | - |
| pickend | Triggered when ending scroll selection | - |
| update:modelValue | Triggered when `v-model` updates | `value: (string \| number)[]` |

### change Event Parameters

| Parameter Name | Description | Type |
| --- | --- | --- |
| selectedValues | Array of selected values for all columns | `Array<string \| number>` |
| selectedOptions | Array of selected item objects for all columns | `Array<PickerOption>` |
| selectedLabels | Array of selected text for all columns | `Array<string>` |
| selectedIndexes | Array of selected indexes for all columns | `Array<number>` |
| columnIndex | Index of the column where the change occurred; for single column, it's the current option index | `number` |

## Slots

The component does not provide slots.

## External Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
