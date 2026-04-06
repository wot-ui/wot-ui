# SelectPicker

Used for single or multiple selection from a set of options, usually combined with external cells or buttons to control popup display.

## Component Types

### Basic Usage

The default `type` is `checkbox`, and the value type of `v-model` is an array. Usually combined with `v-model:visible` to control popup visibility.

```html
<wd-cell title="Select Address" :value="getDisplayValue(value)" is-link @click="show = true" />
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```ts
const columns = ref([
  { value: '101', label: 'Men\'s Clothing' },
  { value: '102', label: 'Luxury' },
  { value: '103', label: 'Women\'s Clothing' }
])

const value = ref<string[]>(['101'])
const show = ref(false)

function handleConfirm({ value }: { value: string[] }) {
  console.log(value)
}
```

### Type Switching

Set `type="radio"` to enable single selection mode. In this case, the value type of `v-model` is `string`, `number`, or `boolean`.

```html
<wd-select-picker type="radio" v-model="value" v-model:visible="show" :columns="columns" />
```

## Component States

### Disabled Options

Option data supports the `disabled` field to disable a specific item.

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```ts
const columns = ref([
  { value: '101', label: 'Men\'s Clothing', disabled: true },
  { value: '102', label: 'Luxury' },
  { value: '103', label: 'Women\'s Clothing' }
])
```

### Loading

Set `loading` to display a loading state in the content area.

```html
<wd-select-picker loading v-model="value" v-model:visible="show" :columns="columns" />
```

## Component Styles

### Setting Title

Customize the popup title through `title`.

```html
<wd-select-picker v-model="value" v-model:visible="show" title="Multiple Selection" :columns="columns" />
```

### Searchable

Set `filterable` to enable local search; both single and multiple selection modes are supported.

```html
<wd-select-picker filterable v-model="value" v-model:visible="show" :columns="columns" />
<wd-select-picker filterable type="radio" v-model="singleValue" v-model:visible="show" :columns="columns" />
```

## Special Styles

### Option Change Event

When options inside the selector change, the `change` event is triggered.

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @change="handleChange" />
```

```ts
function handleChange({ value }: { value: string[] }) {
  console.log(value)
}
```

### Pre-confirmation Validation

Set `before-confirm` to perform synchronous or asynchronous validation before clicking the confirm button. Returns `false` or `Promise<false>` to prevent closing the popup.

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" :before-confirm="beforeConfirm" />
```

```ts
const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    if (value.length > 0) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
}
```

### Auto-complete

In `radio` mode, you can hide the confirm button with `show-confirm="false"` to automatically complete after selection.

```html
<wd-select-picker type="radio" :show-confirm="false" v-model="value" v-model:visible="show" :columns="columns" />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Selected item, array when `checkbox`, `string`, `number`, or `boolean` when `radio` | `string \| number \| boolean \| (string \| number \| boolean)[]` | - |
| visible / v-model:visible | Controls popup display state | `boolean` | `false` |
| title | Popup title | `string` | `'Selector'` |
| checked-color | Radio or checkbox selected color | `string` | - |
| min | Minimum number of selections, only effective for `checkbox` | `number` | `0` |
| max | Maximum number of selections, `0` means unlimited, only effective for `checkbox` | `number` | `0` |
| select-size | Selector internal option size | `string` | - |
| loading | Whether to show loading state | `boolean` | `false` |
| loading-color | Loading icon color | `string` | `'#4D80F0'` |
| close-on-click-modal | Whether to close when clicking the mask | `boolean` | `true` |
| columns | Selector data, one-dimensional array | `Record<string, any>[]` | `[]` |
| type | Selector type, optional values are `checkbox`, `radio` | `string` | `'checkbox'` |
| value-key | The key for the value field in option objects | `string` | `'value'` |
| label-key | The key for the display text field in option objects | `string` | `'label'` |
| confirm-button-text | Confirm button text | `string` | `'Confirm'` |
| before-confirm | Pre-confirmation validation function, receives current selected value, returns `boolean` or `Promise<boolean>` | `function` | - |
| z-index | Popup z-index | `number` | `15` |
| safe-area-inset-bottom | Whether to adapt to bottom safe area | `boolean` | `true` |
| filterable | Whether to support local search | `boolean` | `false` |
| filter-placeholder | Search box placeholder | `string` | `'Search'` |
| scroll-into-view | Whether to scroll to selected item when reopened | `boolean` | `true` |
| custom-content-class | Custom popup content area class name | `string` | `''` |
| show-confirm | Whether to show confirm button, only effective in `radio` mode | `boolean` | `true` |
| root-portal | Whether to detach from page structure, used to solve fixed positioning issues | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Option Data Structure

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value | Option value | `string \| number \| boolean` | - |
| label | Option text | `string` | - |
| disabled | Whether to disable this option | `boolean` | `false` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when options inside the selector change | `{ value }` |
| cancel | Triggered when clicking close button or mask to close | - |
| confirm | Triggered when clicking confirm | `{ value, selectedItems }` |
| open | Triggered when popup opens | - |
| close | Triggered when popup closes | - |

## Methods

| Method Name | Description | Type |
| --- | --- | --- |
| open | Open popup | `() => void` |
| close | Close popup | `() => void` |
