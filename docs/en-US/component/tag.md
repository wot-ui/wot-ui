# Tag

Used to mark status or summarize main content.

## Component Types

### Basic Usage

Set different tag types through `type`.

```html
<wd-tag>Tag</wd-tag>
<wd-tag type="primary">Common Tag</wd-tag>
<wd-tag type="danger">Danger Tag</wd-tag>
<wd-tag type="warning">Warning Tag</wd-tag>
<wd-tag type="success">Success Tag</wd-tag>
```

## Component Variants

### Tag Size

Set tag size through `size`, supports `small`, `medium`, `default`, `large`, `extra-large`.

```html
<wd-tag type="primary" size="small">Small Tag</wd-tag>
<wd-tag type="primary" size="medium">Medium Tag</wd-tag>
<wd-tag type="primary">Default Tag</wd-tag>
<wd-tag type="primary" size="large">Large Tag</wd-tag>
<wd-tag type="primary" size="extra-large">Extra Large Tag</wd-tag>
```

### Light Tag

Setting `variant="light"` displays a light-colored tag.

```html
<wd-tag variant="light">Tag</wd-tag>
<wd-tag type="primary" variant="light">Common Tag</wd-tag>
<wd-tag type="danger" variant="light">Danger Tag</wd-tag>
```

### Plain Tag

Setting `variant="plain"` displays a plain style.

```html
<wd-tag variant="plain">Tag</wd-tag>
<wd-tag type="primary" variant="plain">Common Tag</wd-tag>
```

### Dashed Tag

Setting `variant="dashed"` displays a dashed border.

```html
<wd-tag variant="dashed">Tag</wd-tag>
<wd-tag type="warning" variant="dashed">Warning Tag</wd-tag>
```

### Text Tag

Setting `variant="text"` displays a plain text style.

```html
<wd-tag variant="text">Tag</wd-tag>
<wd-tag type="success" variant="text">Success Tag</wd-tag>
```

## Component Styles

### Mark Tag

Setting `mark` generates a mark style.

```html
<wd-tag mark>Tag</wd-tag>
<wd-tag type="primary" mark>Common Tag</wd-tag>
```

### Ghost Mark Tag

Combining `mark` and `variant="plain"` displays a ghost mark style.

```html
<wd-tag mark variant="plain">Tag</wd-tag>
<wd-tag type="success" mark variant="plain">Success Tag</wd-tag>
```

### Round Tag

Setting `round` generates a round style.

```html
<wd-tag round>Tag</wd-tag>
<wd-tag type="primary" round>Common Tag</wd-tag>
```

### Set Icon

You can customize the left icon through the `icon` property or `icon` slot.

```html
<wd-tag icon="clock-circle" type="primary" mark>Tag</wd-tag>

<wd-tag type="primary" mark>
  <text>Slot</text>
  <template #icon>
    <wd-icon name="thunderbolt" />
  </template>
</wd-tag>
```

### Custom Color

Set text color through `color`, and set background color and border color through `bg-color`.

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">Tag</wd-tag>
<wd-tag color="#FAA21E" bg-color="#FAA21E" variant="plain">Tag</wd-tag>
```

## Special Styles

### Closable

After setting `closable`, clicking the close button will trigger the `close` event.

```html
<wd-tag v-for="(tag, index) in closableStrongTags" :key="index" :type="tag.type" closable @close="handleCloseStrongTag(index)">
  {{ tag.value }}
</wd-tag>
```

```ts
const closableStrongTags = ref([
  { type: 'default', value: 'Tag' },
  { type: 'primary', value: 'Common' }
])

function handleCloseStrongTag(order: number) {
  closableStrongTags.value = closableStrongTags.value.filter((_, index) => index !== order)
}
```

### Add Tag

Setting `dynamic` generates an add tag style. After input confirmation, the `confirm` event is triggered. You can customize the add button content through the `add` slot.

::: code-group

```html [vue]
<wd-tag v-for="(tag, index) in dynamicTags" :key="index" type="primary" closable @close="handleClose1(index)">
  {{ tag }}
</wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm"></wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm">
  <template #add>
    <wd-icon name="pushpin" size="12px"></wd-icon>
    <text style="margin-left: 4px">Custom</text>
  </template>
</wd-tag>
```

```ts [ts]
const dynamicTags = ref(['Tag One', 'Tag Two'])

function handleClose1(order: number) {
  dynamicTags.value = dynamicTags.value.filter((item, index) => index !== order)
}

function handleConfirm({ value }: { value: string }) {
  if (!value) return
  dynamicTags.value = [...dynamicTags.value, value]
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| size | Tag size, optional values are `small`, `medium`, `large`, `extra-large`, `default` | `TagSize` | `default` |
| type | Tag type, optional values are `default`, `primary`, `success`, `warning`, `danger`, `volcano`, `lightblue`, `cyan`, `pink`, `purple` | `TagType` | `default` |
| icon | Left icon | `string` | `''` |
| icon-prefix | Icon class prefix, see Icon component for usage | `string` | - |
| css-icon | CSS icon, see Icon component for usage | `boolean \| string` | `false` |
| closable | Whether closable | `boolean` | `false` |
| dynamic | Whether it is an add tag | `boolean` | `false` |
| color | Text color | `string` | `''` |
| bg-color | Background color and border color | `string` | `''` |
| round | Whether round | `boolean` | `false` |
| mark | Whether mark style | `boolean` | `false` |
| variant | Tag variant, optional values are `light`, `dark`, `plain`, `dashed`, `text` | `TagVariant` | `dark` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking tag | `MouseEvent` |
| close | Triggered when clicking close button | `MouseEvent` |
| confirm | Triggered after add tag input confirmation | `{ value: string }` |

## Slots

| Name | Description |
| --- | --- |
| default | Tag content |
| icon | Custom icon |
| add | Custom add tag content, effective when `dynamic` is `true` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node inline style |
