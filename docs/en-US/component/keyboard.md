---
version: 1.3.10
---

# Keyboard Virtual Keyboard

Virtual numeric keyboard, used for entering numbers, passwords, ID cards, or license plates, etc.

## Basic Usage

You can control whether the keyboard is displayed via `v-model:visible`.

```html
<wd-cell title="Default Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Component Type

### Keyboard with Sidebar

Set `mode` property to `custom` to display the keyboard's right sidebar, commonly used for entering amounts.

```html
<wd-cell title="Keyboard with Sidebar" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="Done" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### ID Card Keyboard

You can set the bottom-left key content via `extra-key` property. For example, when entering an ID card number, you can set `extra-key` to `X`.

```html
<wd-cell title="ID Card Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="X" close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### License Plate Keyboard

Set `mode` property to `car` to display the license plate keyboard, commonly used for entering license plate numbers.

```html
<wd-cell title="License Plate Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Component Variants

### License Plate Keyboard Language Control

You can control the language mode of the license plate keyboard via `car-lang` property, supporting Chinese provinces (`zh`) and English letters (`en`). You can control whether to automatically switch languages via `auto-switch-lang` property.

```html
<!-- Controlled Mode: Manual language switching -->
<wd-cell title="License Plate Keyboard (Controlled)" :value="value" is-link @click="showKeyBoard" />

<wd-keyboard v-model="value" v-model:visible="visible" v-model:car-lang="lang" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>

<!-- Uncontrolled Mode: Enable auto-switch -->
<wd-cell title="License Plate Keyboard (Uncontrolled)" :value="value2" is-link @click="showKeyBoard2" />

<wd-keyboard v-model="value2" v-model:visible="visible2" mode="car" auto-switch-lang @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const value = ref<string>('')
const value2 = ref<string>('')
const lang = ref<'zh' | 'en'>('zh')

function showKeyBoard() {
  visible.value = true
}

function showKeyBoard2() {
  visible2.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### Keyboard with Title

You can set the keyboard title via `title` property.

```html
<wd-cell title="Keyboard with Title" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" title="Enter Password" extra-key="." close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### Use Slot for Custom Title

```html
<wd-cell title="Use Slot for Custom Title" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="." close-text="Done" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">Custom Title</text>
  </template>
</wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### Multiple Extra Keys

When `mode` is `custom`, it supports configuring two `extra-key`s in array form.

```html
<wd-cell title="Multiple Extra Keys" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### Random Numeric Keyboard

You can randomly sort the numeric keyboard via `random-key-order` property, commonly used for high security scenarios.

```html
<wd-cell title="Random Numeric Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Special Usage

### Two-way Binding

You can bind the keyboard's current input value via `v-model`, and limit the input length via `maxlength` property.

```html
<wd-cell title="Two-way Binding" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="Keyboard Title"
  extra-key="."
  close-text="Done"
  @input="onInput"
  @delete="onDelete"
></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

### Show Mask Overlay

`hideOnClickOutside` controls whether the keyboard popup has a mask. `modal` controls whether the mask is transparent.

::: tip Tip
Currently `modal` only controls whether the mask is transparent. `hideOnClickOutside` controls whether the popup has a mask. When there is a mask, clicking the mask can close the keyboard. However, when the keyboard is expanded, you must click the mask to close the current keyboard before you can click other buttons. You can also turn off `hideOnClickOutside` and manually control whether the keyboard is displayed to achieve closing the keyboard when clicking outside, which is more flexible.
:::

```html
<wd-cell title="Two-way Binding" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard :modal="true" :hide-on-click-outside="true" v-model:visible="visible" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model:visible | Whether expanded | `boolean` | `false` |
| v-model | Current input value | `string` | `''` |
| title | Keyboard title | `string` | - |
| mode | Keyboard mode, optional values are `default`, `custom`, `car` | `KeyboardMode` | `default` |
| z-index | Z-index | `number` | `100` |
| maxlength | Maximum input length | `number` | `Infinity` |
| show-delete-key | Whether to show delete key; only effective for default numeric keyboard and sidebar keyboard | `boolean` | `true` |
| random-key-order | Whether to randomly sort numeric keys | `boolean` | `false` |
| close-text | Close button text; displayed in header for default/license plate mode, displayed on right large button for `custom` mode | `string` | - |
| delete-text | Delete button text | `string` | - |
| close-button-loading | Whether close button shows loading state | `boolean` | `false` |
| modal | Whether to show mask; when set to `false`, mask is transparent | `boolean` | `false` |
| hide-on-click-outside | Whether to allow closing keyboard by clicking outside, also controls whether to render mask | `boolean` | `true` |
| lock-scroll | Whether to lock background scrolling | `boolean` | `true` |
| safe-area-inset-bottom | Whether to adapt to bottom safe area | `boolean` | `true` |
| extra-key | Extra key, can pass single string or string array; `custom` mode supports two extra keys | `string \| string[]` | - |
| root-portal | Whether to detach from page structure, used to solve fixed positioning issues | `boolean` | `false` |
| v-model:car-lang | License plate keyboard language mode, effective when `mode=car`, optional values are `zh`, `en` | `CarKeyboardLang` | - |
| auto-switch-lang | Whether to automatically switch license plate keyboard language, effective when `mode=car` and `car-lang` is in uncontrolled state | `boolean` | `false` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

## Slots

| Name | Description |
| --- | --- |
| title | Custom title content |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| input | Triggered when clicking an inputtable key | `key: string` |
| delete | Triggered when clicking delete key | - |
| close | Triggered when clicking close button or mask to close | - |
| update:visible | Triggered when keyboard visibility changes | `visible: boolean` |
| update:modelValue | Triggered when current input value changes | `value: string` |
| update:carLang | Triggered when license plate keyboard language changes | `lang: 'zh' \| 'en'` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node style |
