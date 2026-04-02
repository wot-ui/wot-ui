# Dialog

A dialog box that pops up, commonly used for message prompts, message confirmation, etc., supports function calls.

:::tip Note
For global calling solutions, see [wot-starter](https://starter.wot-ui.cn/guide/feedback.html), which supports globally callable feedback components for use in scenarios like route navigation guards and network request interceptors.
:::

## Alert Dialog

Alert dialog only has a confirm button, used for strong reminders.

```html
<wd-dialog></wd-dialog>
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const dialog = useDialog()

function alert() {
  dialog.alert('Operation successful')
}
```

Alert dialog with title.

```html
<wd-dialog />
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const dialog = useDialog()

function alert() {
  dialog.alert({
    msg: 'Prompt text',
    title: 'Title'
  })
}
```

If the content text is too long, the dialog box height will not increase, but will show a scrollbar instead.

```html
<wd-dialog />
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const dialog = useDialog()

function alert() {
  dialog.alert({
    msg: 'The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text is for demonstration The above text',
    title: 'Title'
  })
}
```

## Confirm Dialog

Used to prompt user operations.

```html
<wd-dialog />
<wd-button @click="confirm">confirm</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const dialog = useDialog()

function confirm() {
  message
    .confirm({
      msg: 'Prompt text',
      title: 'Title'
    })
    .then(() => {
      console.log('Clicked confirm button')
    })
    .catch(() => {
      console.log('Clicked cancel button')
    })
}
```

## Prompt Dialog

Prompt will display an input box and can perform input validation.

```html
<wd-dialog />
<wd-button @click="prompt">prompt</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const dialog = useDialog()

function prompt() {
  message
    .prompt({
      title: 'Please enter email',
      inputValue: value1.value,
      inputPattern: /.+@.+\..+/i
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}
```

## Slots

If the provided dialog content does not meet requirements, you can use slots to customize dialog content. You can use multiple Dialoges in one page by specifying a unique identifier `selector`, `useDialog(selector)` will return a component instance with the specified `selector`.

```html
<wd-dialog selector="wd-dialog-slot">
  <wd-rate custom-class="custom-rate-class" v-model="rate" />
</wd-dialog>

<wd-button @click="withSlot">custom</wd-button>
```

```typescript
import { useDialog } from '@/uni_modules/wot-ui'
const rate = ref<number>(1)
const dialog = useDialog('wd-dialog-slot')

function withSlot() {
  message
    .confirm({
      title: 'Rating'
    })
    .then(() => {
      dialog.alert(`Your rating is: ${rate.value} points`)
    })
    .catch((error) => {
      console.log(error)
    })
}
```

```scss
:deep(.custom-rate-class) {
  display: block;
  height: 22px;
}
```

## Pre-confirmation Processing

Set the `beforeConfirm` function to run when clicking confirm. It receives the current input `value`, returns `false` to block confirmation, and supports returning `Promise<boolean>`.

```html
<wd-toast />
<wd-dialog />
<wd-button @click="beforeConfirm">beforeConfirm</wd-button>
```

```typescript
import { useDialog, useToast } from '@/uni_modules/wot-ui'
const dialog = useDialog()
const toast = useToast()

function beforeConfirm() {
  message
    .confirm({
      msg: 'Confirm deletion',
      title: 'Prompt',
      beforeConfirm: () => {
        toast.loading('Deleting...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('Deleted successfully')
            resolve(true)
          }, 2000)
        })
      }
    })
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}
```

## Custom Operation Buttons ^(1.5.0)

You can customize the style of operation buttons through the button properties `cancel-button-props` and `confirm-button-props`. For specific details, refer to [Button Attributes](/component/button.html#attributes).

```html
<wd-dialog></wd-dialog>
<wd-button @click="withButtonProps">Custom Buttons</wd-button>
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model:visible | Whether to display dialog box | boolean | - | false | - |
| title | Dialog title | string | - | - | - |
| msg | Dialog content | string | - | - | - |
| show-cancel-button | Whether to show cancel button | boolean | - | true | - |
| show-confirm-button | Whether to show confirm button | boolean | - | true | - |
| cancel-button-text | Cancel button text | string | - | Cancel | - |
| confirm-button-text | Confirm button text | string | - | Confirm | - |
| cancel-button-props | Cancel button properties | object | - | {} | 1.5.0 |
| confirm-button-props | Confirm button properties | object | - | {} | 1.5.0 |
| close-on-click-modal | Whether to close when clicking modal | boolean | - | true | - |
| before-confirm | Function executed before confirmation | `function(value) => boolean \| Promise<boolean>` | - | - | - |
| selector | Component unique identifier | string | - | wd-dialog | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | false | 1.11.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| confirm | Triggered when clicking confirm button | - | - |
| cancel | Triggered when clicking cancel button | - | - |
| close | Triggered when closing dialog box | - | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| default | Custom dialog content | - |
