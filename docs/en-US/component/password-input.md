# PasswordInput Password Input

A grid-based password input component, suitable for payment passwords, SMS verification codes, and other scenarios. Usually used in conjunction with the [Keyboard](./keyboard.md) component.

By default, `wd-password-input` only displays the value, cursor, and prompt. Input is handled by `wd-keyboard`, which cannot paste. Enable `native-input` when paste, the system keyboard, or H5 SMS autofill is needed: a transparent native input is placed over the cells, while the grid, mask, and length limit stay the same. This is off by default, and the original behavior is unchanged when it is off. Usually `focused` is bound to the keyboard visibility state, and the keyboard is opened in the `focus` event.

## Component Type

### Basic Usage

Use with `wd-keyboard` component to achieve password input.

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref } from 'vue'

const value = ref<string>('123')
const showKeyboard = ref<boolean>(false)
```

## Component Variants

### Custom Length

Set password digits via `length`, and synchronize setting keyboard's `maxlength`.

```html
<wd-password-input v-model="value" :length="4" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" />
```

## Component Style

### Grid Spacing

Set spacing between grids via `gutter`, default unit is `px`.

```html
<wd-password-input v-model="value" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

## Content Form

### Plain Text Display

Set `mask` to `false` to display input content in plain text, suitable for SMS verification codes and other scenarios.

```html
<wd-password-input v-model="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

### Prompt Information

Set normal prompt information via `info`, and error prompts via `error-info`.

```html
<wd-password-input
  v-model="value"
  info="Password is 6 digits"
  :error-info="errorInfo"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref, watch } from 'vue'

const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(false)

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = 'Password error'
  } else {
    errorInfo.value = ''
  }
})
```

## Special Usage

### Random Keyboard

Combined with `wd-keyboard`'s `random-key-order` capability, security in numeric input scenarios can be enhanced.

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" random-key-order />
```

### Native Input

`native-input` is off by default. When enabled, the value can be pasted or typed with the system keyboard, which fits SMS codes. A paste is appended to the current value, digits are kept (full-width digits are converted), and the result is truncated to `length`. SMS autofill does not depend on `mask`, and is set only on H5: `autocomplete="one-time-code"`, plus `text-content-type="oneTimeCode"`. uni-app's H5 input maps `text-content-type` to that autocomplete. `text-content-type` is supported only on App-nvue-iOS. This component is a Vue page, so App-vue does not get SMS code suggestions from that attribute. The mask only changes how cells are drawn; the native input stays a text field. In this mode the cursor follows the native input focus. Avoid binding `wd-keyboard` at the same time, so two inputs do not write the value together.

```html
<wd-password-input v-model="value" native-input :mask="false" :length="6" />
```

```typescript
import { ref } from 'vue'

const value = ref('')
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current input value | `string` | `''` |
| mask | Whether to hide password content | `boolean` | `true` |
| info | Text prompt below input box | `string` | `''` |
| error-info | Error prompt below input box | `string` | `''` |
| gutter | Spacing between input box grids, default unit is `px` | `number \| string` | `0` |
| length | Password length | `number` | `6` |
| focused | Whether in focused state; cursor is displayed when focused, usually linked with keyboard visibility state. When `native-input` is enabled, the cursor follows native input focus instead | `boolean` | `true` |
| native-input ^($LOWEST_VERSION$) | Whether to enable the native input. When enabled, paste and the system keyboard are supported. H5 also enables SMS autofill, which does not depend on `mask`. A paste is appended, non-digits are removed, and the value is truncated to `length`. Off by default | `boolean` | `false` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| focus | Triggered when the password input is clicked. When `native-input` is enabled, triggered when the native input receives focus | `event: Event` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
