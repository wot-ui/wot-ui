# Search

Search box component, supports input focus, blur, input, search, cancel, and clear events.

## Component Types

### Basic Usage

`v-model` sets the input box binding value, `change` listens for input events, `search` listens for search events, `cancel` listens for cancel events, `clear` listens for clear events.

```html
<wd-search v-model="value" @search="search" @clear="clear" @cancel="cancel" @change="change" />
```

```ts
const value = ref<string>('')

function search({ value }: { value: string }) {
  console.log('Search', value)
}
function clear() {
  console.log('Reset')
}
function cancel({ value }: { value: string }) {
  console.log('Cancel', value)
}
function change({ value }: { value: string }) {
  console.log('Input', value)
}
```

## Component States

### Auto Focus

Set the `focus` property, the component will automatically focus after mounting.

```html
<wd-search v-model="value" focus />
```

### Auto Focus After Clear

Set `focus-when-clear`, the input box will refocus after clicking the clear button.

```html
<wd-search v-model="value" focus-when-clear />
```

### Disable and Hide Cancel Button

Set `disabled` and `hide-cancel`. Can be used for entry scenarios that jump to a standalone search page.

```html
<wd-search disabled hide-cancel @click="handleDisabledClick" />
```

## Component Variants

### Style Variants

Switch between different visual styles through `variant`, optional values are `plain`, `filled`, `light`.

```html
<wd-search variant="plain" v-model="value" />
<wd-search variant="filled" v-model="value" />
<wd-search variant="light" v-model="value" />
```

## Component Styles

### Input Box Placeholder Left-aligned

Set the `placeholder-left` property.

```html
<wd-search placeholder-left />
```

### Set Maximum Length

Limit the maximum length of the input box through `maxlength`, `-1` means no limit.

```html
<wd-search v-model="value" :maxlength="4" />
```

### Custom Text

Modify placeholder text through `placeholder`, and modify cancel button text through `cancel-txt`.

```html
<wd-search placeholder="Please enter order number/order name" cancel-txt="Search" />
```

## Special Styles

### Custom Left Slot

Customize the left content of the search box through the `prefix` slot.

```html
<wd-search v-model="value">
  <template #prefix>
    <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
      <view class="search-type">
        <text>{{ searchType }}</text>
        <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
      </view>
    </wd-popover>
  </template>
</wd-search>
```

```typescript
const searchType = ref<string>('All')
const value = ref<string>('')
const menu = ref([
  {
    content: 'All'
  },
  {
    content: 'Order Number'
  },
  {
    content: 'Refund Order Number'
  }
])

function changeSearchType({ item }) {
  searchType.value = item.content
}
```

```scss
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
```

### Custom Input Box Right Icon

```html
<wd-search v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
</wd-search>
```

### Custom Right Slot

```html
<wd-search v-model="value">
  <template #suffix>
    <view>Filter Conditions</view>
  </template>
</wd-search>
```

### Multiple Slot Combinations

```html
<wd-search variant="plain" v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
  <template #suffix>
    <view class="action-icons">
      <wd-icon name="filter" size="20px"></wd-icon>
      <wd-icon name="plus-circle-fill" size="20px"></wd-icon>
    </view>
  </template>
</wd-search>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Input box content, two-way binding | `string` | `''` |
| custom-input-class | Custom input box class name | `string` | `''` |
| placeholder | Search box placeholder text | `string` | `'Search'` |
| cancel-txt | Search box right text | `string` | `'Cancel'` |
| variant | Search box variant, optional values are `plain`, `filled`, `light` | `string` | `'plain'` |
| hide-cancel | Whether to hide the right text | `boolean` | `false` |
| disabled | Whether to disable the search box | `boolean` | `false` |
| maxlength | Native property, sets the maximum length, `-1` means no limit | `number \| string` | `-1` |
| placeholder-left | Whether placeholder is left-aligned | `boolean` | `false` |
| focus | Whether to auto focus | `boolean` | `false` |
| focus-when-clear | Whether to focus the input box after clicking the clear button | `boolean` | `false` |
| placeholder-style | Native property, specifies the style of the placeholder, currently only supports `color`, `font-size` and `font-weight` | `string` | - |
| placeholder-class | Native property, specifies the style class of the placeholder | `string` | `''` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| focus | Input box focus event | `{ value }` |
| blur | Input box blur event | `{ value }` |
| search | Input box search event | `{ value }` |
| clear | Triggered when clicking the clear button | - |
| cancel | Triggered when clicking the right text | `{ value }` |
| change | Triggered when input box content changes | `{ value }` |
| click | Triggered when clicking the component in disabled state | - |

## Slots

| Name | Description |
| --- | --- |
| prefix | Custom content on the left side of the input box |
| input-suffix | Custom content on the right side inside the input box |
| suffix | Custom content on the right side of the input box |
