# SwipeAction

Commonly used for cell swipe gestures like left/right swipe to delete.

:::warning
The Swipe Action component hides page functionality deeply, making it difficult for users to discover. It is recommended to prioritize more direct interaction methods, such as list item buttons or ActionSheet.

If you still use swipe actions, it is recommended to provide explicit prompts when users enter the page, informing them that list items support left/right swiping.
:::

## Component Types

### Basic Usage

`wd-swipe-action` consists of three parts: left action area, content area, and right action area. The left and right action areas are defined through `left` and `right` slots respectively, and the content area uses the default slot.

Listen for click events on the page root node and combine with `closeOutside` provided by `useQueue` to uniformly close expanded swipe items when clicking outside the component area.

:::warning
If there are interactions on the page like "click button to manually expand `swipe-action`", you need to use `@click.stop` on the outer layer of these buttons to prevent event bubbling and avoid triggering `closeOutside` on the root node.
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-swipe-action>
    <wd-cell title="Title" value="Content" />
    <template #right>
      <view class="action">
        <view class="button" style="background: #E2231A;" @click="handleAction('Action 1')">Action 1</view>
        <view class="button" style="background: #FFB300;" @click="handleAction('Action 2')">Action 2</view>
        <view class="button" style="background: #4D80F0;" @click="handleAction('Action 3')">Action 3</view>
      </view>
    </template>
  </wd-swipe-action>
</view>
```

```ts [ts]
import { useToast, useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const toast = useToast()

function handleAction(action: string) {
  toast.show(`Clicked ${action}`)
}
```

```scss [scss]
.action {
  height: 100%;
}

.button {
  display: inline-block;
  padding: 0 15px;
  height: 100%;
  color: #fff;
  line-height: 44px;
}
```

:::

### Left and Right Swipe

Configure left and right action areas simultaneously through `left` and `right` slots.

```html
<wd-swipe-action>
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 1</view>
      <view class="button" style="background: #FFB300;">Action 2</view>
      <view class="button" style="background: #4D80F0;">Action 3</view>
    </view>
  </template>
  <wd-cell title="Title" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 4</view>
      <view class="button" style="background: #FFB300;">Action 5</view>
      <view class="button" style="background: #4D80F0;">Action 6</view>
    </view>
  </template>
</wd-swipe-action>
```

## Component States

### Disabled Swipe Buttons

After setting `disabled`, the component will not respond to swipe and click-to-close interactions.

```html
<wd-swipe-action disabled>
  <wd-cell title="Title" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 1</view>
      <view class="button" style="background: #FFB300;">Action 2</view>
      <view class="button" style="background: #4D80F0;">Action 3</view>
    </view>
  </template>
</wd-swipe-action>
```

## Special Styles

### Toggle Buttons

Control the current expansion state directly through `v-model`. Optional values are `left`, `close`, `right`, representing expanding left, collapsing all, and expanding right respectively.

::: code-group

```html [vue]
<wd-swipe-action v-model="value">
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 1</view>
      <view class="button" style="background: #FFB300;">Action 2</view>
      <view class="button" style="background: #4D80F0;">Action 3</view>
    </view>
  </template>
  <wd-cell title="Title" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 4</view>
      <view class="button" style="background: #FFB300;">Action 5</view>
      <view class="button" style="background: #4D80F0;">Action 6</view>
    </view>
  </template>
</wd-swipe-action>

<view class="button-group">
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('left')">Open Left</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('close')">Close All</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('right')">Open Right</wd-button>
  </view>
</view>
```

```ts [ts]
import { ref } from 'vue'
import type { SwipeActionStatus } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const value = ref<SwipeActionStatus>('close')

function changeState(position: SwipeActionStatus) {
  value.value = position
}

function noop() {}
```

:::

### Hook Function Before Button Close

`before-close` is triggered before the component executes the close logic and can be used for pre-close validation or asynchronous confirmation.

The hook function receives two parameters:

- `reason`: Close reason, optional values are `click`, `swipe`, `value`
- `position`: Close position, optional values are `left`, `right`, `inside`

Where `inside` indicates clicking inside the content area but not on the left or right action buttons.

You need to explicitly return `true` or `Promise<true>` to continue closing, returning `false` or `Promise<false>` will prevent closing.

::: code-group

```html [vue]
<wd-swipe-action :before-close="beforeClose">
  <wd-cell title="Title" value="Prevent click content area to close" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">Delete</view>
      <view class="button" style="background: #FFB300;">Mark</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts [ts]
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionBeforeClose } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

const beforeClose: SwipeActionBeforeClose = (reason, position) => {
  return new Promise((resolve) => {
    const shouldClose = !(reason === 'click' && position === 'inside')

    if (!shouldClose) {
      toast.show('Intercepted click on content area causing close')
      resolve(false)
    } else {
      toast.loading('Processing...')
      setTimeout(() => {
        toast.close()
        if (reason === 'click') {
          toast.show(`${reason} ${position} caused swipe button to close`)
        } else {
          toast.show(`${reason} caused ${position} swipe button to close`)
        }
        resolve(true)
      }, 3000)
    }
  })
}
```

:::

### Click Event

The `click` event is emitted when clicking the content area, left action area, or right action area in the expanded state and the close is successful; it will not be triggered if intercepted by `before-close`.

```html
<wd-swipe-action @click="handleClick">
  <wd-cell title="Title" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">Action 1</view>
      <view class="button" style="background: #FFB300;">Action 2</view>
      <view class="button" style="background: #4D80F0;">Action 3</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionClickEvent } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

function handleClick({ value }: SwipeActionClickEvent) {
  toast.show(`Clicked ${value} to close action buttons`)
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current swipe state, optional values are `left`, `close`, `right` | `SwipeActionStatus` | `close` |
| disabled | Whether to disable swipe action | `boolean` | `false` |
| before-close | Pre-close interceptor function, receives `(reason, position)`, returns `true` or `Promise<boolean>` to continue closing, returns `false` to prevent closing | `SwipeActionBeforeClose` | - |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking content area or action area in expanded state and closing | `SwipeActionClickEvent` |
| update:modelValue | Triggered when swipe state changes | `SwipeActionStatus` |

## Methods

The following methods can be called through the component instance.

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| close | Close expanded action buttons | `reason: SwipeActionReason, position?: SwipeActionPosition` | - |

## Slots

| Name | Description |
| --- | --- |
| left | Custom left action area |
| default | Custom content area |
| right | Custom right action area |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node inline style |
