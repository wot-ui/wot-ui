# Notify

A notification component used to display notification information at the top of the page.

## Component States

### Basic Usage

You need to import this component in the page as a mount point.

::: code-group

```html
<wd-notify />
```

```ts
import { useNotify } from '@/uni_modules/wot-ui'

const { showNotify, closeNotify } = useNotify()

// Auto-close after 3 seconds
showNotify('Notification content')

// Manually close
closeNotify()
```

:::

### Custom Configuration

Supports customizing colors, popup position, display duration, and whether to show the close button.

::: code-group

```ts
// Custom colors
showNotify({
  message: 'Custom colors',
  color: '#ad0000',
  background: '#ffe1e1'
})

// Custom position
showNotify({
  message: 'Custom position',
  position: 'bottom'
})

// Custom duration
showNotify({
  message: 'Custom duration',
  duration: 1000
})

// Show close button
showNotify({
  message: 'Notification content',
  closable: true,
  duration: 0
})
```

:::

## Component Types

### Notification Types

Supports four notification types: `primary`, `success`, `warning`, and `danger`. The default is `danger`.

::: code-group

```ts
// Primary notification
showNotify({ type: 'primary', message: 'Notification content' })

// Success notification
showNotify({ type: 'success', message: 'Notification content' })

// Danger notification
showNotify({ type: 'danger', message: 'Notification content' })

// Warning notification
showNotify({ type: 'warning', message: 'Notification content' })
```

:::

## Component Styles

### Floating Notification

Set the `variant` property to `floating` to display a floating card-style notification. Floating notifications have independent margins, rounded corners, and shadows, and their prefix icons will automatically adapt to the current `type` status color.

::: code-group

```ts
showNotify({
  type: 'primary',
  message: 'Notification content',
  variant: 'floating',
  closable: true
})
```

:::

## Content Forms

### Using Notify Component

If you need to embed components or other custom content within Notify, you can use the Notify component directly and customize it using the default slot.

::: code-group

```html
<wd-button type="primary" @click="showNotify">Call using Notify component</wd-button>
<wd-notify type="success" :safe-height="safeHeight" v-model:visible="visible">
  <wd-icon name="check-outline" size="inherit" color="inherit" />
  Success notification
</wd-notify>
```

```ts
import { ref, onMounted } from 'vue'

let timer: ReturnType<typeof setTimeout>
export default {
  setup() {
    const visible = ref(false)
    const safeHeight = ref(0)

    const showNotify = () => {
      visible.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
      }, 3000)
    }

    onMounted(() => {
      // #ifdef H5
      safeHeight.value = 44
      // #endif
    })

    return {
      visible,
      showNotify,
      safeHeight
    }
  }
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| type | Type, optional values are `primary` `success` `warning` `danger` | `NotifyType` | `danger` |
| message | Display text, supports line breaks via `\n` | `string \| number` | - |
| duration | Display duration (ms), when value is 0, notify will not disappear | `number` | `3000` |
| visible | Display status (supports v-model) | `boolean` | `false` |
| position | Popup position, optional values are `top` `bottom` | `NotifyPosition` | `top` |
| color | Font color | `string` | - |
| background | Background color | `string` | - |
| z-index | Set the component's z-index level to a fixed value | `number` | `99` |
| safe-height | Top safe height | `number \| string` | - |
| selector | Specify unique identifier | `string` | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | `boolean` | `false` |
| closable | Whether to show the close button | `boolean` | `false` |
| variant | Display form, optional values are `filled` `floating` | `NotifyVariant` | `filled` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node style class name | `string` | - |
| custom-style | Root node style | `string` | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Callback function when clicked | `(event: MouseEvent) => void` |
| closed | Callback function when closed | `() => void` |
| opened | Callback function after displayed | `() => void` |

## Slots

| Name | Description |
| --- | --- |
| default | Custom notification content |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| showNotify | Display notification | `NotifyOptions` / `string` |
| closeNotify | Close notification | - |
| setNotifyDefaultOptions | Modify default configuration, affecting all `showNotify` calls | `NotifyOptions` |
