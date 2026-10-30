# Tooltip

Used to display brief prompt information, supporting multi-direction positioning, controlled visibility, custom content, and dynamic position updates.

## Component Types

### Basic Usage

`placement` controls the position where the prompt appears, supporting 12 direction combinations.

::: warning Note
Since `uni-app` components cannot naturally listen to clicks outside themselves, if you need to click on blank areas to automatically close `tooltip` in the page, it is recommended to use `useQueue()` to uniformly handle `closeOutside()` at the root node.
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-tooltip placement="top" content="top prompt text">
    <wd-button>top</wd-button>
  </wd-tooltip>
</view>
```

```ts [ts]
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
```

:::

### Show Close Button

Display a close button inside the prompt layer through `show-close`.

```html
<wd-tooltip content="Show close button" placement="right" show-close>
  <wd-button>Show close button</wd-button>
</wd-tooltip>
```

## Component States

### Control Visibility

Manually control `tooltip` open and close through `v-model`.

::: code-group

```html [vue]
<wd-button plain size="small" @click.stop="control">
  {{ show ? 'Close' : 'Open' }}
</wd-button>

<wd-tooltip placement="top" content="Control visibility" v-model="show">
  <wd-button>top</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'

const show = ref(false)

function control() {
  show.value = !show.value
}
```

:::

### Disabled

After setting `disabled`, clicking the target element will no longer display the prompt layer.

```html
<wd-tooltip placement="right-end" content="Disabled" disabled>
  <wd-button>Disabled</wd-button>
</wd-tooltip>
```

## Content Forms

### Multi-line Content

When using the `content` slot, you need to enable `use-content-slot` at the same time, suitable for displaying multi-line text or custom layouts.

::: warning Note
When using the `content` slot, the component cannot automatically infer the final size of complex content. If the content size changes, it is recommended to recalculate positioning through the instance method `updatePosition()`.
:::

```html
<wd-tooltip placement="right" use-content-slot>
  <wd-button>Multi-line text</wd-button>
  <template #content>
    <view class="lines-content">
      <view>Multi-line text 1</view>
      <view>Multi-line text 2</view>
      <view>Multi-line text 3</view>
    </view>
  </template>
</wd-tooltip>
```

## Special Styles

### Dynamic Content and Position Update

When the prompt content size changes dynamically, you can manually refresh the positioning through the component instance's `updatePosition()`.

::: code-group

```html [vue]
<wd-tooltip placement="right" use-content-slot ref="tooltipRef">
  <template #content>
    <view class="lines-content" :style="{ width: dynamicTooltipWidth + 'px' }">
      <view style="margin-bottom: 10px">Current width: {{ dynamicTooltipWidth }}px</view>
      <wd-button size="small" @click="changeTooltipSize">Change size</wd-button>
    </view>
  </template>
  <wd-button>Dynamic content</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'
import type { TooltipInstance } from '@/uni_modules/wot-ui/components/wd-tooltip/types'

const tooltipRef = ref<TooltipInstance>()
const dynamicTooltipWidth = ref(90)

function changeTooltipSize() {
  dynamicTooltipWidth.value = dynamicTooltipWidth.value === 90 ? 150 : 90
  setTimeout(() => {
    tooltipRef.value?.updatePosition()
  }, 50)
}
```

:::

### Bind Events

You can listen to prompt state changes through `open`, `close`, `change`.

```html
<wd-tooltip placement="right-end" :content="content" @open="onShow" @close="onHide" @change="handleChange">
  <wd-button>Events</wd-button>
</wd-tooltip>
```

## Tooltip Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| model-value | Whether to show prompt layer, supports `v-model` | `boolean` | `false` |
| content | Prompt content, can also be passed through `content` slot | `string \| Array<Record<string, any>>` | - |
| placement | Prompt position, optional values are `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | `PlacementType` | `bottom` |
| offset | Position offset, supports number, array or object configuration | `PopoverOffset` | `0` |
| visible-arrow | Whether to show arrow | `boolean` | `true` |
| disabled | Whether disabled | `boolean` | `false` |
| show-close | Whether to show close button | `boolean` | `false` |
| custom-arrow | Arrow custom class name | `string` | `''` |
| custom-pop | Prompt layer custom class name | `string` | `''` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Tooltip Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when prompt layer shows | - |
| close | Triggered when prompt layer closes | - |
| change | Triggered when visibility state changes | `{ show: boolean }` |
| update:modelValue | Triggered when visibility state changes | `boolean` |

## Tooltip Methods

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| open | Open prompt layer | - | - |
| close | Close prompt layer | - | - |
| updatePosition | Re-measure popup size and update positioning | - | - |

## Tooltip Slots

| Name | Description |
| --- | --- |
| default | Target content that triggers the prompt layer |
| content | Custom prompt layer content |
