# Dialog

Popup dialog, commonly used for message prompts, operation confirmation and input collection, supports functional calling.

:::tip Tip
Global calling solution see [wot-starter](https://starter.wot-ui.cn/guide/feedback.html), can be used in route guards, request interceptors and other scenarios.
:::

## Component Type

### Alert Dialog

Alert only displays confirm button, commonly used for message notification.

```html
<wd-dialog />
<wd-button @click="openAlert">Open Alert</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openAlert = () => {
  dialog.alert({
    title: 'Tip',
    msg: 'Operation successful'
  })
}
```

### Confirm Dialog

Confirm returns user operation result through `Promise`, `then` corresponds to confirm, `catch` corresponds to cancel.

```html
<wd-dialog />
<wd-button @click="openConfirm">Open Confirm</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: 'Tip',
      msg: 'Confirm to execute this operation?'
    })
    .then(() => {
      console.log('Clicked confirm')
    })
    .catch(() => {
      console.log('Clicked cancel')
    })
}
```

### Prompt Dialog

Prompt displays input box, can be used to collect text and perform validation.

```html
<wd-dialog />
<wd-button @click="openPrompt">Open Prompt</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPrompt = () => {
  dialog
    .prompt({
      title: 'Please enter email',
      inputPattern: /.+@.+\..+/i,
      inputError: 'Email format is incorrect'
    })
    .then((res) => {
      console.log(res.value)
    })
}
```

## Component State

### Pre-confirm Validation

`beforeConfirm` receives current input value, supports returning `boolean` or `Promise<boolean>`, returning `false` will intercept close.

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">Pre-confirm validation</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: 'Delete Confirmation',
    msg: 'Confirm to delete this record?',
    beforeConfirm: () => {
      toast.loading('Deleting...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1500)
      })
    }
  })
}
```

### Input Validation

Prompt supports both regex validation `input-pattern` and function validation `input-validate`.

```html
<wd-dialog />
<wd-button @click="openPromptValidate">Input validation</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPromptValidate = () => {
  dialog.prompt({
    title: 'Please enter phone number',
    inputProps: {
      type: 'tel',
      placeholder: 'Please enter 11-digit phone number'
    },
    inputValidate: (value) => /^1[3-9]\d{9}$/.test(String(value)),
    inputError: 'Phone number format is incorrect'
  })
}
```

## Component Variant

### Style and Layout

Control dialog button style and arrangement through `theme` and `action-layout`.

```html
<wd-dialog />
<wd-button @click="openTextTheme">Text style + vertical layout</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openTextTheme = () => {
  dialog.confirm({
    title: 'Version Update',
    msg: 'New version found, update now?',
    theme: 'text',
    actionLayout: 'vertical'
  })
}
```

### Custom Action Buttons

Multiple buttons can be defined through `actions`. When `actions` and `confirm-button-props` / `cancel-button-props` are configured simultaneously, `actions` takes priority.

```html
<wd-dialog />
<wd-button @click="openActions">Custom action buttons</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openActions = () => {
  dialog.show({
    title: 'Select Payment Method',
    actionLayout: 'vertical',
    actions: [
      { text: 'WeChat Pay', type: 'success', block: true },
      { text: 'Alipay', type: 'primary', block: true },
      { text: 'Cancel', block: true }
    ]
  })
}
```

## Component Style

### Icon and Header Image

Visual style can be configured through `icon`, `icon-color`, `icon-props`, `header-image`.

```html
<wd-dialog />
<wd-button @click="openStyledDialog">Icon and header image</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openStyledDialog = () => {
  dialog.alert({
    title: 'Activity Notification',
    msg: 'Congratulations on getting exclusive benefits',
    icon: 'success',
    headerImage: 'https://example.com/banner.png'
  })
}
```

### Custom Button Style

Button properties can be passed through `confirm-button-props`, `cancel-button-props`.

```html
<wd-dialog />
<wd-button @click="openCustomButtons">Custom button style</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openCustomButtons = () => {
  dialog.confirm({
    title: 'Tip',
    msg: 'Continue?',
    confirmButtonProps: {
      type: 'success',
      customClass: 'custom-shadow'
    },
    cancelButtonProps: {
      type: 'danger',
      customClass: 'custom-shadow'
    }
  })
}
```

## Special Style

### Slot

Distinguish multiple instances through `selector`, and use `useDialog(selector)` to call specified dialog.

```html
<wd-dialog selector="wd-dialog-slot">
  <wd-rate v-model="rate" />
</wd-dialog>
<wd-button @click="openSlotDialog">Open slot dialog</wd-button>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-ui'

const rate = ref(1)
const slotDialog = useDialog('wd-dialog-slot')

const openSlotDialog = () => {
  slotDialog.confirm({
    title: 'Please rate us'
  })
}
```

### OpenType

`confirm-button-props`, `cancel-button-props` and `actions` support passing button open capability properties (such as `openType`) and corresponding event callbacks.

```html
<wd-dialog />
<wd-button @click="openOpenTypeDialog">Get phone number</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openOpenTypeDialog = () => {
  dialog.confirm({
    title: 'Get phone number',
    confirmButtonProps: {
      text: 'Authorize to get',
      openType: 'getPhoneNumber',
      onGetphonenumber: (detail) => {
        console.log(detail)
      }
    }
  })
}
```

## Methods

`useDialog()` returns the following methods:

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| show | Open dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | Open Alert dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | Open Confirm dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | Open Prompt dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | Close current dialog | - | `void` |

## Options

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Title | `string` | `''` |
| msg | Message content | `string` | `''` |
| type | Dialog type, optional values are `alert`, `confirm`, `prompt` | `DialogType` | `'alert'` |
| theme | Button style, optional values are `button`, `text` | `DialogTheme` | `'button'` |
| zIndex | Dialog z-index | `number` | `99` |
| lazyRender | Dialog content lazy render | `boolean` | `true` |
| headerImage | Top banner image address | `string` | - |
| icon | Icon name. Optional values are `success`, `info`, `warning`, `danger`, can also pass custom icon name | `string` | - |
| iconColor | Icon color | `string` | - |
| iconProps | Pass `wd-icon` properties | `Partial<IconProps>` | - |
| inputValue | Prompt input box initial value | `string \| number` | - |
| inputProps | Prompt mode `wd-input` properties | `Partial<InputProps>` | - |
| textareaProps | Prompt mode `wd-textarea` properties | `Partial<TextareaProps>` | - |
| inputPattern | Prompt input regex validation rule | `RegExp` | - |
| inputValidate | Prompt input function validation rule, returns `boolean` or error message string | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt validation failure prompt text | `string` | - |
| showErr | Whether to show error message | `boolean` | `false` |
| actionLayout | Action button arrangement, optional values are `horizontal`, `vertical` | `DialogActionLayout` | `'horizontal'` |
| showCancelButton | Whether to show cancel button | `boolean` | `alert` is false, `confirm/prompt` is true |
| confirmButtonText | Confirm button text | `string` | - |
| cancelButtonText | Cancel button text | `string` | - |
| confirmButtonProps | Confirm button advanced configuration, supports passing string, object or `null` | `DialogBoxButtonOption` | `{}` |
| cancelButtonProps | Cancel button advanced configuration, supports passing string, object or `null` | `DialogBoxButtonOption` | Derived from `showCancelButton` |
| actions | Custom action button array, takes priority over confirm/cancel buttons after configuration | `DialogAction[]` | - |
| closeOnClickModal | Whether clicking the mask closes the dialog, triggers `fail` callback with `action` as `'modal'` | `boolean` | `false` |
| showClose | Whether to show the top-right close button, triggers `fail` callback with `action` as `'close'` | `boolean` | `false` |
| beforeConfirm | Pre-confirm interception function, returns `boolean` or `Promise<boolean>` | `DialogBeforeConfirm` | - |

## Attributes

`wd-dialog` component instance supports the following attributes:

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| selector | Specify unique identifier, used to distinguish multiple instances in page | `string` | `''` |
| root-portal | Whether to detach from page document flow rendering, used to solve fixed invalidation problem | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| header | Custom header area | - |
| image | Custom image area | - |
| title | Custom title area | `{ icon, title, iconProps }` |
| default | Custom content area | `{ msg, type, inputValue, showErr, inputError }` |
| actions | Custom action area | `{ confirm, cancel, close }` |
