# PasswordInput Password Input

A grid-based password input component, suitable for payment passwords, SMS verification codes, and other scenarios. Usually used in conjunction with the [Keyboard](./keyboard.md) component.

`wd-password-input` is only responsible for displaying input values, cursor, and prompt information, and does not directly handle input logic. Usually `focused` is bound to the keyboard visibility state, and the keyboard is opened in the `focus` event.

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

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current input value | `string` | `''` |
| mask | Whether to hide password content | `boolean` | `true` |
| info | Text prompt below input box | `string` | `''` |
| error-info | Error prompt below input box | `string` | `''` |
| gutter | Spacing between input box grids, default unit is `px` | `number \| string` | `0` |
| length | Password length | `number` | `6` |
| focused | Whether in focused state; cursor is displayed when focused, usually linked with keyboard visibility state | `boolean` | `true` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| focus | Triggered when clicking password input box | `event: Event` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
