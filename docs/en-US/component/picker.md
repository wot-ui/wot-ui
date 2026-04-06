# Picker

Picker includes a popup layer (`wd-popup`) and a picker view (`wd-picker-view`), but does not include an outer trigger element (such as Input, Cell, etc.). It usually needs to be combined with `wd-cell` or form-related components to trigger display.

## Basic Usage

Needs to be combined with an external trigger, such as `wd-cell`, and uses `v-model` binding to save the selected content array, and `v-model:visible` to control the display or hiding of the Picker.

::: code-group

```html
<wd-cell title="Single Column" placeholder="Please select" :value="value[0]" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref<string[]>([])
const columns = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
])
```

:::

## Multiple Columns

Pass a two-dimensional array to the `columns` property. At this time, `value` is a one-dimensional array of selected item `value` for the corresponding columns.

::: code-group

```html
<wd-cell title="Multiple Columns" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref([])
const displayValue = ref('')

const columns = ref([
  [
    { label: 'Sun Yat-sen University', value: '1' },
    { label: 'Central South University', value: '2' },
    { label: 'South China University of Technology', value: '3' }
  ],
  [
    { label: 'Computer Science and Technology', value: '1' },
    { label: 'Software Engineering', value: '2' },
    { label: 'Communication Engineering', value: '3' }
  ]
])

const handleConfirm = ({ selectedItems }: any) => {
  displayValue.value = selectedItems.map((item: any) => item.label).join(', ')
}
```

:::

## Multi-level Cascade

Set the `cascade` property and set `columns` to a hierarchical tree structure (nesting child items through `children`).
Can be combined with custom display functions for page backfill formatting.

::: code-group

```html
<wd-cell title="Multi-level Cascade" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" cascade @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref(['110000', '110100', '110102'])
const displayValue = ref('Beijing - Beijing City - Xicheng District')

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
  }
])

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems.map((item: any) => item.label).join(' - ')
}
```

:::

## Custom Popup Title

You can configure the top hint text title for the internal popup through the `title` property.

::: code-group

```html
<wd-cell title="Title" :value="value[0]" is-link @click="showTitle = true" />
<wd-picker v-model="value" v-model:visible="showTitle" :columns="columns" title="Please select your preferred option" />
```

:::

## Pre-confirmation Validation

Set the `before-confirm` function to intercept when the user clicks the "Complete" button in the top right corner of the popup layer. Supports returning `boolean` or `Promise<boolean>` to control whether to allow selection and close the popup.

::: code-group

```html
<wd-toast />
<wd-cell title="Option Interception" :value="value[0]" is-link @click="show = true" />
<wd-picker :columns="columns" v-model="value" v-model:visible="show" :before-confirm="beforeConfirm" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()
const show = ref(false)
const columns = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
])
const value = ref<string[]>([])

const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      // Assume options 2 and 3 are judged as invalid selections
      if (['2', '3'].includes(value[0])) {
        toast.error('This option validation failed, please reselect')
        resolve(false)
      } else {
        resolve(true)
      }
    }, 1000)
  })
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Selected items. Single column picker is an array of length 1, multiple columns is an array of multiple values | `(string \| number)[]` | `[]` |
| v-model:visible | Controls the display and hiding of the picker popup layer | `boolean` | `false` |
| columns | Option data structure array configuration, for multiple columns use two-dimensional array, multi-level cascade combines cascade nested children | `PickerOption[] \| PickerOption[][]` | `[]` |
| cascade | Whether to enable cascade mode | `boolean` | `false` |
| title | Popup layer main title | `string` | - |
| cancel-button-text | Top action bar left cancel button text | `string` | - |
| confirm-button-text | Top action bar right confirm button text | `string` | - |
| value-key | Key name responsible for identifying values in the option object | `string` | `'value'` |
| label-key | Key name responsible for displaying text in the option object | `string` | `'label'` |
| children-key | Key name for the next level child in cascade mode | `string` | `'children'` |
| item-height | Height of each option in the internal roller (px) | `number` | `44` |
| visible-item-count | Maximum number of options visible in a single screen viewport | `number` | `6` |
| before-confirm | Pre-confirmation validation function, receives `(value)` parameter, returns `boolean` or `Promise<boolean>` | `Function` | - |
| close-on-click-modal | Whether to close the popup when clicking the mask layer | `boolean` | `true` |
| z-index | Popup layer z-index depth | `number` | `15` |
| safe-area-inset-bottom | Whether the popup panel sets the default bottom safe distance | `boolean` | `true` |
| immediate-change | Whether to trigger `change` immediately when finger is released instead of after scrolling ends | `boolean` | `false` |
| root-portal | Whether to enable `root-portal` to detach the component from the current node for rendering | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |
| custom-view-class | External custom style class for pickerView component | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered when clicking the complete button | `{ value, selectedItems }` |
| cancel | Triggered when clicking cancel or mask layer closes | - |
| open | Triggered when opening the popup layer picker | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Open Picker popup | - |
| close | Close Picker popup | - |
