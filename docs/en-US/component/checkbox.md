# Checkbox

Used for selecting multiple items from a set of options.

## Component Type

### Basic Usage

Use `v-model` to bind the selected state.

```html
<wd-checkbox v-model="value" shape="square">Checkbox</wd-checkbox>
```

### Standalone Usage

`wd-checkbox` can be used independently without `wd-checkbox-group`. Bind the checked state with `v-model` (default `true-value` is `true`, `false-value` is `false`). You can also customize the checked/unchecked values with `true-value` / `false-value`.

```html
<wd-checkbox v-model="checked">Agree</wd-checkbox>
```

```ts
const checked = ref(false)
```

**Custom true/false value**

```html
<wd-checkbox v-model="agree" true-value="yes" false-value="no">Agree</wd-checkbox>
```

```ts
const agree = ref('no')
```

### Checkbox Group

Use `wd-checkbox-group` to manage multiple checkboxes.

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox value="1">Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
  <wd-checkbox value="3">Option 3</wd-checkbox>
</wd-checkbox-group>
```

## Component State

### Disabled

Set `disabled` to disable the checkbox.

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox value="1" disabled>Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Indeterminate State

Set `indeterminate` to display an indeterminate state.

```html
<wd-checkbox v-model="value" indeterminate>Indeterminate</wd-checkbox>
```

## Component Variant

### Shape

Set `shape` to change the checkbox shape, supports `circle` and `square`.

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox value="1" shape="square">Square</wd-checkbox>
  <wd-checkbox value="2" shape="circle">Circle</wd-checkbox>
</wd-checkbox-group>
```

### Size

Set `size` to change the checkbox size, supports `small` and `large`.

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox value="1" size="small">Small</wd-checkbox>
  <wd-checkbox value="2" size="medium">Medium</wd-checkbox>
  <wd-checkbox value="3" size="large">Large</wd-checkbox>
</wd-checkbox-group>
```

## Component Style

### Max Selection Limit

Set `max` to limit the maximum number of selections.

```html
<wd-checkbox-group v-model="value" :max="2">
  <wd-checkbox value="1">Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
  <wd-checkbox value="3">Option 3</wd-checkbox>
</wd-checkbox-group>
```

### Inline Display

Set `inline` to display checkboxes in a row.

```html
<wd-checkbox-group v-model="value" inline>
  <wd-checkbox value="1">Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
  <wd-checkbox value="3">Option 3</wd-checkbox>
</wd-checkbox-group>
```

## Special Style

### Checkbox Button

Set `type="button"` to display checkboxes as buttons.

```html
<wd-checkbox-group v-model="value" type="button">
  <wd-checkbox value="1">Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
  <wd-checkbox value="3">Option 3</wd-checkbox>
</wd-checkbox-group>
```

### Cell Style

Set `cell` to display checkboxes in cell style.

```html
<wd-checkbox-group v-model="value" cell>
  <wd-checkbox value="1">Option 1</wd-checkbox>
  <wd-checkbox value="2">Option 2</wd-checkbox>
  <wd-checkbox value="3">Option 3</wd-checkbox>
</wd-checkbox-group>
```

## Attributes

### Checkbox Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Binding value | boolean | false |
| value | Checkbox value | `string \| number \| boolean` | - |
| shape | Checkbox shape, supports `circle`, `square`, `button` | string | circle |
| size | Checkbox size, supports `small`, `medium`, `large` | string | medium |
| checked-color | Checked color | string | - |
| disabled | Whether disabled | boolean | false |
| indeterminate | Whether indeterminate | boolean | false |
| max-width | Maximum width | `string \| number` | - |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

### CheckboxGroup Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Binding value | `Array<string \| number \| boolean>` | [] |
| shape | Checkbox shape, supports `circle`, `square`, `button` | string | circle |
| size | Checkbox size, supports `small`, `medium`, `large` | string | medium |
| checked-color | Checked color | string | - |
| disabled | Whether disabled | boolean | false |
| max | Maximum number of selections | number | - |
| inline | Whether inline display | boolean | false |
| cell | Whether cell style | boolean | false |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

## Events

### Checkbox Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when value changes | `value: boolean` |

### CheckboxGroup Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when value changes | `value: Array<string \| number \| boolean>` |

## Slots

### Checkbox Slots

| name | Description |
| --- | --- |
| default | Checkbox label content |

### CheckboxGroup Slots

| name | Description |
| --- | --- |
| default | Checkbox list |
