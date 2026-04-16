# Switch

Used to turn options on or off.

## Component Types

### Basic Usage

`v-model` is the bound value, default is boolean type.

```html
<wd-switch v-model="checked" />
```

```ts
const checked = ref<boolean>(true)
```

### Modify Value

Modify the value when the switch is on via `active-value` property, and modify the value when the switch is off via `inactive-value` property.

```html
<wd-switch v-model="checked" active-value="Wot" inactive-value="Merchant Backend" />
```

## Component States

### Loading State

Setting `loading` displays the loading state.

```html
<wd-switch v-model="checked" loading active-text="Work" inactive-text="Off Work" />
```

### Disabled State

Setting `disabled` disables the switch.

```html
<wd-switch v-model="checked" disabled />
```

## Component Styles

### Modify Color

Modify the color when the switch is on via `active-color` property, and modify the color when the switch is off via `inactive-color` property.

```html
<wd-switch v-model="checked" active-color="#13ce66" inactive-color="#f00" />
```

### Text Description

Set the text inside the switch via `active-text` and `inactive-text`.

```html
<wd-switch v-model="checked" active-text="Work" inactive-text="Off Work" />
```

### Custom Display Icon

Customize the icon inside the switch via `active-icon` and `inactive-icon`.

```html
<wd-switch v-model="checked" active-icon="check" inactive-icon="close" />
```

### Custom Action Icon

Customize the button icon via `active-action-icon` and `inactive-action-icon`.

```html
<wd-switch v-model="checked" active-action-icon="check" inactive-action-icon="close" />
```

### Shape

Set the shape via `shape`, optional values are `round`, `square`.

```html
<wd-switch v-model="checked" shape="round" />
<wd-switch v-model="checked" shape="square" />
```

### Custom Size

Set `size` to modify the switch size.

```html
<wd-switch v-model="checked" size="24px" />
```

## Special Styles

### Use with Form

Can be placed in a form item as a right-side control.

```html
<wd-form-item title="Use with Form" center>
  <wd-switch v-model="checked" size="20" />
</wd-form-item>
```

### Before Change Hook

Setting `before-change` property, a hook before modification that receives the target `value`. Returning `false` means no modification, supports returning `Promise<boolean>`.

```html
<wd-switch v-model="checked" :before-change="beforeChange" @change="handleChange" />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const message = useDialog()

const beforeChange = (value) => {
  return message.confirm('Switch the toggle?').then(() => true).catch(() => false)
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `boolean \| string \| number` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| inactive-action-icon | Inactive state action button icon | `string` | - |
| active-action-icon | Active state action button icon | `string` | - |
| active-icon | Active state icon, ignores `active-text` when set | `string` | - |
| inactive-icon | Inactive state icon, ignores `inactive-text` when set | `string` | - |
| class-prefix | Class name prefix for using custom icons (see Icon component) | `string` | `'wd-icon'` |
| inactive-action-css-icon | CSS icon for the inactive state action button (see Icon component) | `boolean \| string` | `false` |
| active-action-css-icon | CSS icon for the active state action button (see Icon component) | `boolean \| string` | `false` |
| active-css-icon | CSS icon for the active state. When set, `active-text` will be ignored (see Icon component) | `boolean \| string` | `false` |
| inactive-css-icon | CSS icon for the inactive state. When set, `inactive-text` will be ignored (see Icon component) | `boolean \| string` | `false` |
| active-text | Active state text | `string` | `''` |
| inactive-text | Inactive state text | `string` | `''` |
| active-value | Active value | `boolean \| string \| number` | `true` |
| inactive-value | Inactive value | `boolean \| string \| number` | `false` |
| active-color | Active color | `string` | - |
| inactive-color | Inactive color | `string` | - |
| size | Switch size | `string \| number` | - |
| shape | Shape, optional values are `round`, `square` | `SwitchShape` | `'round'` |
| loading | Whether to show loading | `boolean` | `false` |
| loading-props | Loading configuration | `Partial<LoadingProps>` | - |
| before-change | Hook before modification | `SwitchBeforeChange` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Value modification event | `{ value }` |
