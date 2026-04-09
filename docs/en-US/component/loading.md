# Loading

Loading animation, used to indicate the transition state of loading.

## Component Type

### Type

Set the indicator type through the `type` property. Optional values are `circular`, `spinner`, `dots`, `wave`, default is `circular`.

```html
<wd-loading />
<wd-loading type="spinner" />
<wd-loading type="dots" />
<wd-loading type="wave" />
```

## Component Style

### Color

Modify the indicator color through the `color` property.

```html
<wd-loading color="#fa34aa" />
<wd-loading type="spinner" color="#fa34aa" />
<wd-loading type="dots" color="#fa34aa" />
<wd-loading type="wave" color="#fa34aa" />
```

### Size

Set the indicator size through the `size` property, supporting `number` / `string` types.

```html
<wd-loading :size="20" type="wave" />
<wd-loading :size="30" type="wave" />
<wd-loading size="50px" type="wave" />
```

## Content Form

### Display Text

Set the loading text through the `text` property or the default slot.

```html
<wd-loading text="Loading..."></wd-loading>
<wd-loading>Loading...</wd-loading>
<wd-loading type="spinner">Loading...</wd-loading>
<wd-loading type="wave">Loading...</wd-loading>
```

### Horizontal Direction

Set the arrangement direction of text and indicator through the `direction` property. Optional values are `vertical`, `horizontal`, default is `vertical`.

```html
<wd-loading direction="horizontal" text="Loading..."></wd-loading>
<wd-loading direction="horizontal">Loading...</wd-loading>
<wd-loading direction="horizontal" type="spinner">Loading...</wd-loading>
<wd-loading direction="horizontal" type="wave">Loading...</wd-loading>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| type | Loading indicator type, optional values are `circular`, `spinner`, `dots`, `wave` | `LoadingType` | `circular` |
| color | Set loading indicator color | `string` | - |
| size | Set loading indicator size | `number \| string` | - |
| text | Loading indicator text | `string` | - |
| direction | Arrangement direction, optional values are `vertical`, `horizontal` | `LoadingDirection` | `vertical` |
| inherit-color | Whether to inherit parent element color | `boolean` | `false` |
| custom-class | Root node style class name | `string` | - |
| custom-style | Root node style | `string` | - |
| custom-spinner-class | Custom loading indicator style class | `string` | - |

## Slots

| name | Description |
| --- | --- |
| default | Loading text content |
