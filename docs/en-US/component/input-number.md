# InputNumber

Composed of increase button, decrease button, and input box, used for entering or adjusting numbers within a certain range.

## Component Type

### Basic Usage

Bind the input value through `v-model`, and listen to value changes through the `change` event.

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange({ value }) {
  console.log(value)
}
```

## Component State

### Disabled

After setting `disabled`, both buttons and the input box are inoperable.

```html
<wd-input-number v-model="value" disabled />
```

### Disable Input Box

After setting `disable-input`, only adjusting values through buttons is allowed.

```html
<wd-input-number v-model="value" disable-input @change="handleChange" />
```

### Disable Minus Button

The minus button can be disabled separately.

```html
<wd-input-number v-model="value" disable-minus @change="handleChange" />
```

### Disable Plus Button

The plus button can be disabled separately.

```html
<wd-input-number v-model="value" disable-plus @change="handleChange" />
```

## Component Variant

### Theme Style

Switch different visual styles through `theme`, optional values are `default`, `primary`, `outline-split`, `outline`.

```html
<wd-input-number v-model="value1" theme="default" />
<wd-input-number v-model="value2" theme="primary" />
<wd-input-number v-model="value3" theme="outline-split" />
<wd-input-number v-model="value4" theme="outline" />
```

### Rounded Style

After setting `round`, the buttons can be displayed in a rounded style.

```html
<wd-input-number v-model="value" round theme="primary" />
```

## Component Style

### Set Step

After setting `step`, each increase or decrease will change according to the corresponding step.

```html
<wd-input-number v-model="value" :step="2" @change="handleChange" />
```

### Set Minimum and Maximum Values

Control the inputtable range through `min` and `max`.

```html
<wd-input-number v-model="value" :min="3" :max="10" @change="handleChange" />
```

### Set Decimal Precision

Control the result precision through `precision`.

```html
<wd-input-number v-model="value" :precision="1" :step="0.1" @change="handleChange" />
```

### Strict Step

After setting `step-strictly`, the input value will be corrected to a multiple of `step` when the change is completed.

```html
<wd-input-number v-model="value" step-strictly :step="2" @change="handleChange" />
```

### Strict Step and Boundary Limit

When setting `step-strictly`, `min`, and `max` at the same time, the component will automatically correct to the closest step value within the legal range.

```html
<wd-input-number v-model="value" step-strictly :step="2" :min="3" :max="15" @change="handleChange" />
```

### Modify Input Box Width

Set the input box width through `input-width`, supporting numbers and strings with units.

```html
<wd-input-number v-model="value" input-width="70px" @change="handleChange" />
```

## Special Usage

### No Input Box

After setting `without-input`, only plus and minus buttons are displayed.

```html
<wd-input-number v-model="value" without-input @change="handleChange" />
```

### Allow Null Value

After setting `allow-null`, the input box allows empty values, which can be used with `placeholder`.

```html
<wd-input-number v-model="value" allow-null placeholder="Unlimited" input-width="70px" @change="handleChange" />
```

```typescript
const value = ref<number | string>('')
```

### Not Allow Null Value but Can Be Temporarily Deleted

When `allow-null` is `false`, the input box can be temporarily cleared, but it will be automatically corrected back to a legal value after blurring.

```html
<wd-input-number v-model="value" :allow-null="false" :min="1" @change="handleChange" />
```

### Keyboard Pops Up Without Pushing Page Up

After setting `adjust-position="false"`, the page is not automatically pushed up when the keyboard pops up.

```html
<wd-input-number v-model="value" :adjust-position="false" @change="handleChange" />
```

### Non-Immediate Update Mode

After setting `immediate-change="false"`, the input box content change will not immediately trigger `change`, only triggered on blur or button click.

```html
<wd-input-number v-model="value1" :immediate-change="true" @change="handleChange" />
<wd-input-number v-model="value2" :immediate-change="false" @change="handleChange" />
```

### Auto Correct on Initialization

Set `update-on-init` to control whether the component corrects the value to a result that conforms to the rules during initialization.

```html
<wd-input-number v-model="value1" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
<wd-input-number v-model="value2" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
```

### Async Change

Validation and interception can be performed before the value changes through `before-change`.

```html
<wd-input-number v-model="value" :before-change="beforeChange" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-ui/components/wd-input-number/types'

const { loading, close } = useToast()
const value = ref<number>(1)

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: `Updating to ${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
```

### Long Press to Add/Subtract

After setting `long-press`, support long pressing the button to continuously increase or decrease.

```html
<wd-input-number v-model="value" long-press @change="handleChange" />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Binding value | `number \| string` | - |
| min | Minimum value | `number` | `1` |
| max | Maximum value | `number` | `Number.MAX_SAFE_INTEGER` |
| step | Step value | `number` | `1` |
| step-strictly | Whether to strictly increase or decrease by step value | `boolean` | `false` |
| precision | Numeric precision | `number \| string` | `0` |
| disabled | Whether to disable | `boolean` | `false` |
| disable-input | Whether to disable the input box | `boolean` | `false` |
| disable-minus | Whether to disable the minus button | `boolean` | `false` |
| disable-plus | Whether to disable the plus button | `boolean` | `false` |
| without-input | Whether to not display the input box | `boolean` | `false` |
| input-width | Input box width, supporting numbers and strings with units | `number \| string` | - |
| allow-null | Whether to allow input value to be empty, set to `true` to allow passing empty string | `boolean` | `false` |
| placeholder | Input box placeholder text | `string` | `''` |
| adjust-position | Whether to automatically push up the page when the keyboard pops up | `boolean` | `true` |
| before-change | Triggered before value change, return `false` to prevent value update, support returning `Promise<boolean>` | `(value: number \| string) => boolean \| Promise<boolean>` | - |
| long-press | Whether to allow long press to add/subtract | `boolean` | `false` |
| immediate-change | Whether to immediately respond to input changes, when `false`, only update on blur or button click | `boolean` | `true` |
| update-on-init | Whether to update `v-model` to the corrected value during initialization | `boolean` | `true` |
| input-type | Input box type, optional values are `number`, `digit` | `'number' \| 'digit'` | `digit` |
| theme | Theme style, optional values are `default`, `outline`, `outline-split`, `primary` | `InputNumberTheme` | `default` |
| round | Whether to enable rounded style | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when value is modified | `{ value }` |
| focus | Triggered when the input box gets focus | `{ value, height }` |
| blur | Triggered when the input box loses focus | `{ value }` |
| update:modelValue | Triggered when `v-model` is updated | `number \| string` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
