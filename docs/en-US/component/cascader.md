# Cascader

Used for hierarchical selection of tree-structured data, supporting both static data and asynchronous loading modes.

::: tip Tip
For province-city-district scenarios, you can directly use `useCascaderAreaData` from `@vant/area-data` as the data source.
:::

## Component Type

### Basic Usage

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### Initial Options

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### Custom Fields

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="customOptions"
  value-key="id"
  text-key="name"
  children-key="items"
  @confirm="handleConfirm"
/>
```

## Component State

### Disabled Options

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithDisabled" @confirm="handleConfirm" />
```

### Option Tips

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithTip" @confirm="handleConfirm" />
```

### Before Confirm Validation

`before-confirm` supports returning `boolean` or `Promise<boolean>`.

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="options"
  :before-confirm="beforeConfirm"
  @confirm="handleConfirm"
/>
```

```ts
const beforeConfirm = async (value, selectedOptions) => {
  if (String(value) === '120000') return false
  return true
}
```

## Component Style

### Display Formatting

```ts
const handleConfirm = ({ selectedOptions }) => {
  displayValue.value = `${selectedOptions[selectedOptions.length - 2].text}-${selectedOptions[selectedOptions.length - 1].text}`
}
```

### Set Title

```html
<wd-cascader v-model="value" v-model:visible="show" title="Select Address" :options="options" @confirm="handleConfirm" />
```

## Special Style

### Asynchronous Loading

After passing `lazy-load`, it enters asynchronous mode: when `option = null`, it loads root nodes; `resolve([])` indicates the current node is a leaf node.

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

```ts
const lazyLoad = (option, tabIndex, resolve) => {
  fetchChildren(option ? String(option.value) : null).then(resolve)
}
```

### Asynchronous Loading (No Initial Value)

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

### Any Level Selectable

After enabling `check-strictly`, clicking a node only updates the current path, and submission is done through the confirm button in the top right corner.

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" check-strictly @confirm="handleConfirm" />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Selected item. Static mode is leaf node value; asynchronous mode can pass path array for display | `string \| number \| (string \| number)[]` | - |
| visible / v-model:visible | Whether to show popup | boolean | false |
| options | Hierarchical option data (tree structure) | `CascaderOption[]` | `[]` |
| title | Popup title | string | - |
| before-confirm | Validation function before confirm, parameters are `(value, selectedOptions)`, returns `boolean` or `Promise<boolean>` | `CascaderBeforeConfirm` | - |
| check-strictly | Whether to enable any level selectable | boolean | false |
| confirm-text | Confirm button text in strict mode | string | `''` |
| value-key | Option value field name | string | value |
| text-key | Option text field name | string | text |
| children-key | Child node field name | string | children |
| tip-key | Tip text field name | string | tip |
| is-leaf-key | Leaf node identifier field name, when value is `true`, clicking confirms | string | isLeaf |
| lazy-load | Asynchronous loading callback, parameters are `(option, tabIndex, resolve)` | `CascaderLazyLoad` | - |
| close-on-click-modal | Whether to close when clicking mask | boolean | true |
| z-index | Popup z-index | number | 15 |
| safe-area-inset-bottom | Whether popup panel sets bottom safe distance (iPhone X type devices) | boolean | true |
| line-width | Bottom line width, supports number or string with unit | `number \| string` | - |
| line-height | Bottom line height, supports number or string with unit | `number \| string` | - |
| line-theme | Bottom line position style, supports `normal / text / underline / dot` | string | normal |
| root-portal | Whether to render outside document flow (H5: teleport, App: renderjs, Mini Program: root-portal) | boolean | false |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## CascaderOption Data Structure

| Key | Description | Type |
| --- | --- | --- |
| value | Option value | `string \| number` |
| text | Option text | string |
| children | Child options | `CascaderOption[]` |
| disabled | Whether disabled | boolean |
| tip | Tip text | string |
| isLeaf | Whether it is a leaf node (asynchronous mode) | boolean |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered when confirming selection | Static mode: `{ value, selectedOptions }`, `value` is leaf value; Asynchronous mode: `{ value, selectedOptions }`, `value` is path array |
| close | Triggered when popup closes | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Open cascader popup | - |
| close | Close cascader popup | - |
