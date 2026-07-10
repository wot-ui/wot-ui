# Rate

Used for quick evaluation or displaying rating results.

## Component Types

### Basic Usage

Set `v-model` to bind the current score, `num` is used to set the total score, default is `5`.

```html
<wd-rate v-model="value" @change="handleChange" />
```

```ts
const value = ref(5)

function handleChange({ value }: { value: number }) {
  console.log(value)
}
```

## Component States

### Read-only

Set the `readonly` property.

```html
<wd-rate v-model="value" readonly />
```

### Disabled

Set the `disabled` property.

```html
<wd-rate v-model="value" disabled />
```

## Component Styles

### Modify Selected Color

You can modify the selected icon color through `active-color`, and also support passing in a two-color array to achieve segmented colors.

```html
<wd-rate v-model="value" active-color="linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)" />
<wd-rate
  v-model="value"
  :active-color="[
    'linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)',
    'linear-gradient(315deg, rgba(245, 34, 34, 1) 0%, rgba(255, 117, 102, 1) 100%)'
  ]"
/>
```

### Modify Icon and Color

You can set unselected and selected icons through `icon` and `active-icon` respectively, and customize the visual style in combination with `active-color`.

```html
<wd-rate v-model="value" block icon="Fire" active-icon="Fire" active-color="var(--wot-red-6)" />
<wd-rate v-model="value" block icon="thumb-down-fill" active-icon="thumb-up-fill" active-color="var(--wot-green-6)" />
```

When both inactive and active icons use CSS icons, it is recommended to set `css-icon` to `true` and pass `icon` and `active-icon` as their own CSS icon classes. If you pass a string class name directly to `css-icon`, inactive and active icons will share the same CSS class.

```html
<wd-rate v-model="value" css-icon icon="i-carbon-star" active-icon="i-carbon-star-filled" />
```

### Modify Size and Spacing

Modify icon size through `size`, and icon spacing through `space`.

```html
<wd-rate v-model="value" size="36" space="12px" />
```

## Special Styles

### Allow Half Selection

Set the `allow-half` property.

```html
<wd-rate v-model="value" allow-half />
```

### Allow Clearing Rating

After setting the `clearable` property, clicking the current minimum score again can clear the rating. When combined with `allow-half`, half-star ratings can be cleared.

```html
<wd-rate v-model="value" clearable />
<wd-rate v-model="value" clearable allow-half />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current score | `number \| null` | `null` |
| num | Maximum rating value | `number` | `5` |
| readonly | Whether read-only | `boolean` | `false` |
| size | Icon size | `string` | - |
| space | Icon spacing | `string \| number` | - |
| color | Unselected icon color | `string` | - |
| active-color | Selected icon color, supports `string` or `string[]` | `string \| string[]` | - |
| icon | Unselected icon class name | `string` | `'star-fill'` |
| active-icon | Selected icon class name | `string` | `'star-fill'` |
| icon-prefix | Icon class prefix, see Icon component for usage | `string` | - |
| css-icon | CSS icon, see Icon component for usage | `boolean \| string` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| allow-half | Whether to allow half selection | `boolean` | `false` |
| clearable | Whether to allow clearing after clicking again | `boolean` | `false` |
| block | Whether to display as block | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when clicking the icon to modify the score | `{ value }` |
