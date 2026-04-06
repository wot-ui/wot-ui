# Textarea

Used for entering multi-line text information, supporting clear, word count, auto-height adjustment, and compact layout.

## Component Types

### Basic Usage

Bind textarea content through `v-model`, set placeholder prompt through `placeholder`.

```html
<wd-textarea v-model="value" placeholder="Please fill in the review" />
```

```typescript
import { ref } from 'vue'

const value = ref('')
```

## Component States

### Read-only

Set textarea to read-only state through `readonly`.

```html
<wd-textarea v-model="value" readonly clearable />
```

### Disabled

Disable textarea through `disabled`.

```html
<wd-textarea v-model="value" disabled clearable />
```

## Component Variants

### Clear Button and Word Limit

Enable clear button through `clearable`, display word count through `maxlength` and `show-word-limit`.

```html
<wd-textarea v-model="value" :maxlength="120" clearable show-word-limit />
```

### Show Clear Button on Focus

Control showing clear button only when focused and has value through `clear-trigger="focus"`.

:::warning Note
Alipay Mini Program temporarily does not support `clear-trigger`, and in some scenarios the clear button cannot be clicked. Refer to [issue](https://github.com/ant-design/ant-design-mini/issues/1255).
:::

```html
<wd-textarea v-model="value" clear-trigger="focus" :maxlength="120" clearable show-word-limit />
```

### Do Not Auto-focus After Clear

Control whether to auto-focus after clicking clear button through `focus-when-clear`.

```html
<wd-textarea v-model="value" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
```

### Auto Height

Make textarea height change with content through `auto-height`.

```html
<wd-textarea v-model="value" auto-height clearable />
```

## Component Styles

### Compact Layout

After setting `compact`, default padding and background will be removed, suitable for use with containers like `wd-form-item`.

```html
<wd-textarea v-model="value" compact placeholder="Please fill in the review" />
```

## Special Styles

### Using with Form

For current form scenarios, it is recommended to have `wd-form` and `wd-form-item` carry the title, required state, and validation prompts, while `wd-textarea` is only responsible for multi-line input capability.

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="Basic Usage" prop="basic">
    <wd-textarea v-model="formData.basic" placeholder="Please enter" compact />
  </wd-form-item>

  <wd-form-item title="Word Limit" prop="limit">
    <wd-textarea v-model="formData.limit" :maxlength="240" show-word-limit clearable compact placeholder="Please enter" />
  </wd-form-item>

  <wd-form-item title="Read-only" prop="readonly">
    <wd-textarea v-model="formData.readonly" readonly :maxlength="240" show-word-limit placeholder="Please enter" compact />
  </wd-form-item>
</wd-form>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Textarea binding value | `string \| number` | `''` |
| placeholder | Placeholder text | `string` | `Please enter...` |
| placeholder-style | placeholder style | `string` | - |
| placeholder-class | placeholder style class | `string` | `''` |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether read-only | `boolean` | `false` |
| maxlength | Maximum input length, set to `-1` for unlimited length | `number` | `-1` |
| clearable | Whether to show clear button | `boolean` | `false` |
| show-word-limit | Whether to show word count, requires `maxlength` to be set | `boolean` | `false` |
| clear-trigger | Clear button display timing, optional values are `focus`, `always` | `InputClearTrigger` | `always` |
| focus-when-clear | Whether to auto-focus after clicking clear button | `boolean` | `true` |
| error | Whether to show error state | `boolean` | `false` |
| focus | Whether to get focus | `boolean` | `false` |
| auto-focus | Whether to auto-focus and bring up keyboard | `boolean` | `false` |
| auto-height | Whether to auto-increase input box height | `boolean` | `false` |
| fixed | Whether to enable fixed mode when in `position: fixed` area | `boolean` | `false` |
| cursor-spacing | Distance between cursor and keyboard | `number` | `0` |
| cursor | Cursor position when getting focus | `number` | `-1` |
| confirm-type | Text on keyboard bottom-right button, optional values are `done`, `go`, `next`, `search`, `send` | `ConfirmType` | - |
| confirm-hold | Whether to keep keyboard open when clicking keyboard bottom-right button | `boolean` | `false` |
| show-confirm-bar | Whether to show toolbar with "Done" button above keyboard | `boolean` | `true` |
| selection-start | Cursor start position, needs to be used with `selection-end` | `number` | `-1` |
| selection-end | Cursor end position, needs to be used with `selection-start` | `number` | `-1` |
| adjust-position | Whether to automatically push up page when keyboard pops up | `boolean` | `true` |
| disable-default-padding | Whether to remove default padding on iOS | `boolean` | `false` |
| hold-keyboard | Whether to keep keyboard open when clicking page while focused | `boolean` | `false` |
| ignore-composition-event | Whether to ignore text composition system event processing; when `false`, composition-related events will be triggered, and `input` will be triggered during composition | `boolean` | `true` |
| inputmode | Input mode hint, optional values are `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url` | `InputMode` | `text` |
| enable-native | Whether to enable native input box in Alipay Mini Program, set to `false` to avoid content shifting up after keyboard pops up | `boolean` | `true` |
| compact | Whether to enable compact mode; when not explicitly set, it will be automatically enabled in `wd-form-item` | `boolean` | - |
| custom-textarea-class | Textarea custom class name | `string` | `''` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

### InputMode Optional Values

`inputmode` is an HTML specification extension capability that can be used in uni-app's Web and App-Vue platforms in high-version WebViews that meet the conditions. See [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode) for details.

| Value | Description |
| --- | --- |
| none | Do not show virtual keyboard |
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
| blur | Triggered when blurring | `{ value, cursor }` |
| clear | Triggered when clicking clear button | - |
| linechange | Triggered when line count changes | `{ height, heightRpx, lineCount }` |
| confirm | Triggered when clicking keyboard done button | `{ value }` |
| keyboardheightchange | Triggered when keyboard height changes | `{ height, duration }` |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-textarea-class | Textarea style class |
