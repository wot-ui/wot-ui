# Input

Users can enter content in the text box.

## Component Type

### Basic Usage

Bind the input value through `v-model`, and set the placeholder prompt through `placeholder`.

```html
<wd-input v-model="value" type="text" placeholder="Please enter username" @input="handleInput" />
```

```typescript
import { ref } from 'vue'

const value = ref('')

function handleInput(event) {
  console.log(event)
}
```

### Number Type

After setting `type` to `number`, only numbers are allowed to be entered.

```html
<wd-input v-model="value" type="number" />
```

## Component State

### Disabled

Input is not allowed after setting `disabled`.

```html
<wd-input v-model="value" disabled />
```

### Readonly

After setting `readonly`, editing is not allowed, but the display style will still be retained.

```html
<wd-input v-model="value" readonly />
```

### Error State

After setting `error`, the input content will be displayed in an error state.

```html
<wd-input v-model="value" placeholder="Please enter username" error />
```

## Component Variant

### Clear Button

After setting `clearable`, the clear button is displayed when the clearable condition is met.

```html
<wd-input v-model="value" clearable @clear="handleClear" />
```

### Show Clear Button When Focused

Control to only display the clear button when the input box is focused and has a value through `clear-trigger="focus"`.

:::warning Note
Alipay Mini Program does not support `clear-trigger` temporarily, and the clear button cannot be clicked in some scenarios. Please refer to [issue](https://github.com/ant-design/ant-design-mini/issues/1255).
:::

```html
<wd-input v-model="value" clear-trigger="focus" clearable />
```

### Do Not Auto Focus After Clear

Control whether to refocus after clicking the clear button through `focus-when-clear`.

```html
<wd-input v-model="value" :focus-when-clear="false" clearable />
```

### Password Input Box

After setting `show-password`, the password visibility state can be toggled.

```html
<wd-input v-model="value" clearable show-password />
```

## Content Form

### Front and Back Icons

Set the front and back icons through `prefix-icon` and `suffix-icon`. For icon names, please refer to [Icon](/component/icon).

```html
<wd-input
  v-model="value"
  prefix-icon="sound"
  suffix-icon="send"
  clearable
  @clickprefixicon="handlePrefixClick"
  @clicksuffixicon="handleSuffixClick"
/>
```

### Suffix Slot

Customize the suffix content through the `suffix` slot.

```html
<wd-input v-model="value" clearable placeholder="Please enter">
  <template #suffix>
    <wd-button size="small">Get Verification Code</wd-button>
  </template>
</wd-input>
```

## Component Style

### Character Limit

After setting `maxlength`, the current character count can be displayed through `show-word-limit`.

```html
<wd-input v-model="value" :maxlength="20" show-word-limit />
```

### Compact Layout

After setting `compact`, the default padding and background of the input box will be removed, suitable for use with `wd-cell` or `wd-form-item`.

```html
<wd-input
  v-model="price"
  compact
  placeholder="Please enter price"
  custom-style="display: inline-block; width: 70px; vertical-align: middle;"
/>
<text style="margin-left: 8px;">Yuan</text>
```

## Special Usage

### Combined with Form Usage

For the current form scenario, it is recommended to use `wd-form` and `wd-form-item` to carry the title, required state, and validation prompt. `wd-input` is only responsible for the input capability.

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="Basic Usage" prop="basic">
    <wd-input v-model="formData.basic" placeholder="Please enter" compact />
  </wd-form-item>

  <wd-form-item title="Custom Slot" prop="slot" center>
    <wd-input v-model="formData.slot" placeholder="Please enter" clearable compact>
      <template #suffix>
        <wd-button size="small">Get Verification Code</wd-button>
      </template>
    </wd-input>
  </wd-form-item>
</wd-form>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Input box binding value | `string \| number` | `''` |
| type | Input box type, optional values are `text`, `number`, `digit`, `idcard`, `safe-password`, `nickname`, `tel` | `InputType` | `text` |
| placeholder | Placeholder text | `string` | `Please enter...` |
| placeholder-style | placeholder style, currently supports `color`, `font-size`, `font-weight` | `string` | - |
| placeholder-class | placeholder style class | `string` | `''` |
| maxlength | Maximum input length | `number` | Alipay Mini Program has no default value, other platforms are `-1` |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether to read only | `boolean` | `false` |
| clearable | Whether to display the clear button | `boolean` | `false` |
| clear-trigger | Clear button display timing, optional values are `focus`, `always` | `InputClearTrigger` | `always` |
| focus-when-clear | Whether to auto focus after clicking the clear button | `boolean` | `true` |
| show-password | Whether to display the password toggle button | `boolean` | `false` |
| prefix-icon | Prefix icon name | `string` | - |
| suffix-icon | Suffix icon name | `string` | - |
| show-word-limit | Whether to display character count, need to set `maxlength` at the same time | `boolean` | `false` |
| error | Whether to display error state | `boolean` | `false` |
| align-right | Whether the input content is right-aligned | `boolean` | `false` |
| compact | Whether to enable compact mode; when not explicitly set, it will be automatically enabled in `wd-form-item` | `boolean` | - |
| focus | Whether to get focus | `boolean` | `false` |
| cursor-spacing | Distance between cursor and keyboard | `number` | `0` |
| cursor | Cursor position when getting focus | `number` | `-1` |
| selection-start | Cursor start position, need to be used with `selection-end` | `number` | `-1` |
| selection-end | Cursor end position, need to be used with `selection-start` | `number` | `-1` |
| adjust-position | Whether to automatically push up the page when the keyboard pops up | `boolean` | `true` |
| hold-keyboard | Whether to keep the keyboard from closing when clicking the page while focused | `boolean` | `false` |
| confirm-type | Text on the bottom right button of the keyboard, optional values are `done`, `go`, `next`, `search`, `send` | `InputConfirmType` | `done` |
| confirm-hold | Whether to keep the keyboard from closing when clicking the bottom right button of the keyboard | `boolean` | `false` |
| always-embed | Whether to force input to be in the same layer state, only valid for WeChat Mini Program iOS | `boolean` | `false` |
| ignore-composition-event | Whether to ignore text composition system event processing; when `false`, composition related events will be triggered, and `input` will be triggered during composition | `boolean` | `true` |
| inputmode | Input mode hint, optional values are `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url` | `InputMode` | `text` |
| enable-native | Whether to enable native input box in Alipay Mini Program, set to `false` to avoid content shifting up after the keyboard pops up | `boolean` | `true` |
| custom-input-class | Input box custom class name | `string` | `''` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

### InputMode Optional Values

`inputmode` is an HTML specification extension capability added later. It can be used in uni-app's Web and App-Vue platforms in high-version WebViews that meet the conditions. For details, see [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode).

| Value | Description |
| --- | --- |
| none | Do not pop up virtual keyboard |
| text | Standard text input keyboard |
| decimal | Decimal input keyboard |
| numeric | Pure numeric input keyboard |
| tel | Phone input keyboard |
| search | Search input optimized keyboard |
| email | Email input optimized keyboard |
| url | URL input optimized keyboard |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| input | Triggered when inputting | `{ value, cursor, keyCode }` |
| focus | Triggered when focusing | `{ value, height }` |
| blur | Triggered when blurring | `{ value }` |
| clear | Triggered when clicking the clear button | - |
| confirm | Triggered when clicking the keyboard done button | `{ value }` |
| keyboardheightchange | Triggered when keyboard height changes | `{ height, duration }` |
| clickprefixicon | Triggered when clicking the prefix icon | - |
| clicksuffixicon | Triggered when clicking the suffix icon | - |
| click | Triggered when clicking the component root node | `event: MouseEvent` |

## Slots

| Name | Description |
| --- | --- |
| prefix | Customize prefix content |
| suffix | Customize suffix content |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-input-class | Input box style class |
