# Pagination

When there is too much data, use pagination to decompose the data.

## Component Types

### Basic Usage

Use `v-model` to bind the current page number, `total` to set the total number of items, and `page-size` to set the number of items displayed per page (default is 10). The total number of pages is automatically calculated based on `total` and `page-size`.

```html
<wd-pagination v-model="value" :total="190" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## Component Variants

### Button Style

Set the button style via `button-variant`, optional values are `text`, `plain`, `dashed`, `base`.

```html
<wd-pagination v-model="value1" :total="190" button-variant="plain" />
<wd-pagination v-model="value2" :total="190" button-variant="dashed" />
<wd-pagination v-model="value3" :total="190" button-variant="base" />
```

### Icon

Set the `show-icon` property to display pagination navigation as Icon icons.

```html
<wd-pagination v-model="value" :total="19" @change="handleChange" show-icon />
```

### Text Hint

Set the `show-message` property to display text hints.

```html
<wd-pagination 
  v-model="value" 
  :total="total" 
  :page-size="pageSize" 
  @change="handleChange" 
  show-icon 
  show-message
/>
```

```typescript
const value = ref<number>(1)
const total = ref<number>(160)
const pageSize = ref<number>(20)
```

## Content Forms

### Custom Slots

The component provides four slots: `prev`, `size`, `next`, and `message`, which can be used to customize pagination buttons, middle page number information, and bottom hints.

```html
<wd-pagination v-model="value" :total="190" show-message>
  <template #prev="{ modelValue }">
    <wd-button :disabled="modelValue <= 1" size="small" type="danger" @click="value -= 1">Previous</wd-button>
  </template>
  <template #next="{ modelValue, totalPageNum }">
    <wd-button :disabled="modelValue >= totalPageNum" size="small" type="danger" @click="value += 1">Next</wd-button>
  </template>
  <template #size="{ modelValue, totalPageNum }">
    <view class="custom-pagination__content">
      <text class="custom-pagination__page">{{ modelValue }}</text>
      <text class="custom-pagination__separator">/</text>
      <text class="custom-pagination__total">{{ totalPageNum }}</text>
    </view>
  </template>
  <template #message="{ total }">
    <view class="custom-pagination__message">Current page {{ value }}, total {{ total }} items</view>
  </template>
</wd-pagination>
```

```scss
.custom-pagination__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.custom-pagination__page {
  color: #f00;
}

.custom-pagination__separator {
  margin: 0 5px;
}

.custom-pagination__total {
  color: #00f;
}

.custom-pagination__message {
  margin-top: 10px;
  color: #999;
  text-align: center;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current page number | `number` | - |
| total-page | Total number of pages; when `total` is passed, it will be calculated based on `total` and `page-size` | `number` | `1` |
| total | Total number of data items | `number` | `0` |
| page-size | Number of items per page | `number` | `10` |
| prev-text | Previous page button text; when not set, uses built-in internationalized text | `string` | - |
| next-text | Next page button text; when not set, uses built-in internationalized text | `string` | - |
| show-icon | Whether to show page turn icons | `boolean` | `false` |
| show-message | Whether to show text hints | `boolean` | `false` |
| button-variant | Pagination button style, optional values are `base`, `plain`, `dashed`, `text` | `ButtonVariant` | `text` |
| hide-if-one-page | Whether to hide when total pages is only one page | `boolean` | `false` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when page number changes | `{ value }` |
| update:modelValue | Triggered when `v-model` updates | `value: number` |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| prev | Custom previous page button | `{ modelValue, totalPageNum, total, pageSize }` |
| size | Custom middle page number display area | `{ modelValue, totalPageNum, total, pageSize }` |
| next | Custom next page button | `{ modelValue, totalPageNum, total, pageSize }` |
| message | Custom bottom hint message, only effective when `show-message` is `true` | `{ modelValue, totalPageNum, total, pageSize }` |

## External Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
