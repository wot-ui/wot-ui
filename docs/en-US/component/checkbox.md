# Checkbox

Used to select multiple options from a set of candidates. Supports regular style, button style, custom icons, and select-all control.

## Component Type

### Basic Usage

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
  <wd-checkbox :name="3" type="square">Option 3</wd-checkbox>
  <wd-checkbox :name="4" type="dot">Option 4</wd-checkbox>
</wd-checkbox-group>
```

### Standalone Usage

`wd-checkbox` can be used independently without `wd-checkbox-group`. Use `v-model` to bind checked state (default `true-value` is `true`, `false-value` is `false`). You can also customize checked and unchecked values with `true-value` / `false-value`.

```html
<wd-checkbox v-model="checked">Agree to terms</wd-checkbox>
```

```ts
const checked = ref(false)
```

**Custom Checked/Unchecked Value**

```html
<wd-checkbox v-model="agree" true-value="yes" false-value="no">Agree to terms</wd-checkbox>
```

```ts
const agree = ref('no')
```

## Component State

### Disabled

```html
<wd-checkbox-group v-model="value" disabled>
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>

<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2" disabled>Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Indeterminate State

```html
<wd-checkbox v-model="checked" :indeterminate="indeterminate" @change="indeterminate = false">Indeterminate</wd-checkbox>
```

### Readonly

```html
<wd-checkbox-group v-model="value" readonly>
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

## Component Variant

### Right-side Check Icon

```html
<wd-checkbox-group v-model="value" placement="right">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Button Style

```html
<wd-checkbox-group v-model="value" type="button">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Horizontal Layout

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Minimum and Maximum Selection Count

```html
<wd-checkbox-group v-model="value" :min="1" :max="3">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
  <wd-checkbox :name="3">Option 3</wd-checkbox>
  <wd-checkbox :name="4">Option 4</wd-checkbox>
</wd-checkbox-group>
```

## Component Style

### Custom Checked Color

```html
<wd-checkbox-group v-model="value" checked-color="#fa4350">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Custom Unchecked Color

```html
<wd-checkbox-group v-model="value" unchecked-color="#fa4350">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

### Custom Icon

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">
    Custom Icon
    <template #icon="{ isChecked }">
      <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
    </template>
  </wd-checkbox>
</wd-checkbox-group>
```

### Size

```html
<wd-checkbox-group v-model="value" size="large">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
</wd-checkbox-group>
```

## Special Style

### With Cell

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-cell-group border value-align="right">
    <wd-cell title="Like" clickable @click="toggle(1)">
      <wd-checkbox :name="1" />
    </wd-cell>
    <wd-cell title="Coin" clickable @click="toggle(2)">
      <wd-checkbox :name="2" />
    </wd-cell>
    <wd-cell title="One-click Triple" clickable @click="toggle(3)">
      <wd-checkbox :name="3" />
    </wd-cell>
  </wd-cell-group>
</wd-checkbox-group>
```

### Toggle All

```html
<wd-button @click="checkboxGroup?.toggleAll()">Toggle All</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(true)">Select All</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(false)">Unselect All</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ skipDisabled: true })">Toggle All (Skip Disabled)</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ checked: true, skipDisabled: true })">Select All (Skip Disabled)</wd-button>

<wd-checkbox-group v-model="value" ref="checkboxGroup">
  <wd-checkbox :name="1">Option 1</wd-checkbox>
  <wd-checkbox :name="2">Option 2</wd-checkbox>
  <wd-checkbox :name="3" disabled>Option 3</wd-checkbox>
  <wd-checkbox :name="4">Option 4</wd-checkbox>
</wd-checkbox-group>
```

## Checkbox Attributes

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Bound value when used standalone | `string \| number \| boolean` | false |
| name | Unique identifier value in CheckboxGroup | `string \| number \| boolean` | `''` |
| type | Shape type, supports `circle / square / button / dot` | string | inherited from CheckboxGroup |
| checked-color | Checked color | string | inherited from CheckboxGroup |
| unchecked-color | Unchecked color | string | inherited from CheckboxGroup |
| disabled | Whether disabled | `boolean \| null` | inherited from CheckboxGroup |
| readonly | Whether readonly | `boolean \| null` | inherited from CheckboxGroup |
| indeterminate | Whether indeterminate (highest style priority) | boolean | false |
| true-value | Checked value when used standalone | `string \| number \| boolean` | true |
| false-value | Unchecked value when used standalone | `string \| number \| boolean` | false |
| size | Size, supports `large` | string | inherited from CheckboxGroup |
| placement | Check icon position, supports `left / right` | string | inherited from CheckboxGroup |
| direction | Layout direction, supports `horizontal / vertical` | string | inherited from CheckboxGroup |
| max-width | Maximum text width | string | - |
| custom-label-class | Custom class for label text | string | - |
| custom-class | Custom class for root node | string | `''` |
| custom-style | Custom style for root node | string | `''` |

## CheckboxGroup Attributes

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Bound value array | `Array<string \| number \| boolean>` | `[]` |
| type | Shape type, supports `circle / square / button / dot` | string | circle |
| checked-color | Checked color | string | - |
| unchecked-color | Unchecked color | string | - |
| disabled | Whether all options are disabled | boolean | false |
| readonly | Whether all options are readonly | boolean | false |
| min | Minimum selectable count | number | 0 |
| max | Maximum selectable count, `0` means no limit | number | 0 |
| size | Size, supports `large` | string | - |
| placement | Check icon position, supports `left / right` | string | left |
| direction | Layout direction, supports `horizontal / vertical` | string | vertical |
| custom-class | Custom class for root node | string | `''` |
| custom-style | Custom style for root node | string | `''` |

## Checkbox Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when bound value changes in standalone usage | `{ value }` |

## CheckboxGroup Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when group selected value changes | `{ value }` |

## Checkbox Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| toggle | Toggle current checked state | - |

## CheckboxGroup Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| toggleAll | Batch toggle all options | `boolean \| { checked?: boolean; skipDisabled?: boolean }` |

## Checkbox Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Custom label content | - |
| icon | Custom icon | `{ isChecked }` |

## CheckboxGroup Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Checkbox list content | - |
