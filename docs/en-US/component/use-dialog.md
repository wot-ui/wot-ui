# useDialog

`useDialog` is used to programmatically call `wd-dialog`, supporting `alert`, `confirm`, `prompt`, `show`, and `close`.

## Basic Usage

First declare `wd-dialog` in the page, then open the dialog via `useDialog()`.

```html
<wd-dialog />
<wd-button @click="openAlert">Open Alert</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openAlert = () => {
  dialog.alert({
    title: 'Notice',
    msg: 'Operation successful'
  })
}
```

## Confirm and Prompt

`confirm` and `prompt` return a `Promise`, `then` corresponds to confirmation, `catch` corresponds to cancellation or closing.

::: code-group
```html [Template]
<wd-dialog />
<wd-button @click="openConfirm">Open Confirm</wd-button>
<wd-button @click="openPrompt">Open Prompt</wd-button>
```

```ts [Script]
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: 'Delete Confirmation',
      msg: 'Are you sure you want to delete this record?'
    })
    .then(() => {
      console.log('Clicked confirm')
    })
    .catch(() => {
      console.log('Clicked cancel')
    })
}

const openPrompt = () => {
  dialog
    .prompt({
      title: 'Please enter email',
      inputPattern: /.+@.+\..+/i,
      inputError: 'Invalid email format'
    })
    .then((res) => {
      console.log(res.value)
    })
}
```
:::

## Multiple Instance Calls

Use `selector` to distinguish between multiple instances on the page. `useDialog(selector)` will bind to the specified instance.

```html
<wd-dialog selector="dialog-a" />
<wd-dialog selector="dialog-b" />
<wd-button @click="openA">Open A</wd-button>
<wd-button @click="openB">Open B</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialogA = useDialog('dialog-a')
const dialogB = useDialog('dialog-b')

const openA = () => {
  dialogA.alert({ title: 'Instance A', msg: 'This is dialog A' })
}

const openB = () => {
  dialogB.alert({ title: 'Instance B', msg: 'This is dialog B' })
}
```

## Pre-confirm Interception

`beforeConfirm` receives the current input value and supports returning `boolean` or `Promise<boolean>`.

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">Pre-confirm Interception</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: 'Confirm Submit',
    msg: 'Will validate before submitting',
    beforeConfirm: () => {
      toast.loading('Validating...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1200)
      })
    }
  })
}
```

## API

### Methods

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| show | Open dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | Open Alert dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | Open Confirm dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | Open Prompt dialog | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | Close current dialog | - | `void` |

### DialogResult

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| action | Operation type, optional values are `confirm`, `cancel`, `modal`, `close` | ActionType | - |
| value | Input value in Prompt mode | `string \| number` | - |

### useDialog

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| selector | Specifies the dialog instance identifier, uses default instance when empty string | string | `''` |

### DialogOptions

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Title | string | `''` |
| msg | Message content | string | `''` |
| type | Dialog type, optional values are `alert`, `confirm`, `prompt` | DialogType | alert |
| theme | Operation area style, optional values are `button`, `text` | DialogTheme | button |
| zIndex | Dialog z-index | number | 99 |
| lazyRender | Lazy render dialog content | boolean | true |
| headerImage | Top banner image address | string | - |
| icon | Icon name. Optional values are `success`, `info`, `warning`, `danger`, also supports custom icon names | string | - |
| iconColor | Icon color | string | - |
| iconProps | Icon component transparent properties | `Partial<IconProps>` | - |
| inputValue | Prompt initial value | `string \| number` | - |
| inputProps | Input component properties in Prompt mode | `Partial<InputProps>` | `{ type: 'text', modelValue: '' }` |
| textareaProps | Textarea component properties in Prompt mode | `Partial<TextareaProps>` | - |
| inputPattern | Prompt input regex validation rule | RegExp | - |
| inputValidate | Prompt input function validation rule, returns `boolean` or error text | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt validation failure prompt text | string | `''` |
| actionLayout | Operation button arrangement, optional values are `horizontal`, `vertical` | DialogActionLayout | horizontal |
| showCancelButton | Whether to show cancel button | boolean | `alert` is false, `confirm/prompt` is true |
| confirmButtonText | Confirm button text | string | - |
| cancelButtonText | Cancel button text | string | - |
| confirmButtonProps | Confirm button configuration, supports string, object or `null` | DialogBoxButtonOption | `{}` |
| cancelButtonProps | Cancel button configuration, supports string, object or `null` | DialogBoxButtonOption | Derived from `showCancelButton` |
| actions | Custom action button array; higher priority than confirm/cancel buttons after configuration | DialogAction[] | - |
| closeOnClickModal | Whether to support closing by clicking mask | boolean | false |
| showClose | Whether to show top-right close button | boolean | false |
| beforeConfirm | Pre-confirm interception function, returns `boolean` or `Promise<boolean>` | DialogBeforeConfirm | - |
