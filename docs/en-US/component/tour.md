# Tour

Used for step-by-step guidance to help users understand page features. Can highlight target elements and display explanation panels near them.

::: tip Tip
The Tour component demo behaves abnormally in iframe. You can click the arrow in the top-left corner of the demo to view it separately.
:::

## Component Types

### Basic Usage

Define guidance steps through `steps`, control visibility through `v-model`, and synchronize current step index through `v-model:current`.

::: code-group

```html [vue]
<wd-tour v-model="showBasicTour" :steps="basicSteps" v-model:current="current" :padding="10" @finish="handleFinish" @change="handleChange" />
```

```ts [ts]
import type { TourChangeDetail, TourStep } from '@/uni_modules/wot-ui/components/wd-tour/types'
import { ref } from 'vue'

const showBasicTour = ref(false)
const current = ref(0)

const basicSteps: TourStep[] = [
  {
    element: '#step1',
    content: 'Welcome to the tour component, this is the first step explanation'
  },
  {
    element: '#step2',
    content: 'This is the second step, showing another feature point'
  }
]

function handleChange({ current }: TourChangeDetail) {
  console.log('Current step:', current)
}

function handleFinish() {
  showBasicTour.value = false
}
```

:::

## Component States

### Click Mask to Continue

After setting `click-mask-next`, clicking the mask layer will automatically proceed to the next step.

```html
<wd-tour v-model="showClickMaskTour" :steps="basicSteps" :click-mask-next="true" />
```

### Close Mask

After setting `mask` to `false`, only the highlight area and explanation panel remain, without the full-page mask.

```html
<wd-tour v-model="showNoMaskTour" :steps="noMaskSteps" :mask="false" />
```

## Component Styles

### Custom Mask

You can adjust the highlight area and mask performance through properties like `mask-color`, `offset`, `border-radius`, `padding`.

```html
<wd-tour
  v-model="showCustomMaskTour"
  :steps="customMaskSteps"
  mask-color="red"
  :offset="40"
  :border-radius="15"
  :padding="10"
  next-text="Next"
  prev-text="Previous"
  skip-text="Skip"
  finish-text="Finish"
/>
```

### Custom Highlight Area

Fully take over highlight area rendering through the `highlight` slot.

::: code-group

```html [vue]
<wd-tour v-model="showCustomHighlightTour" :steps="customHighlightSteps" :padding="10">
  <template #highlight="{ elementInfo }">
    <view class="custom-highlight" :style="`${objToStyle(elementInfo)};${objToStyle(customHighlightStyle)}`"></view>
  </template>
</wd-tour>
```

```ts [ts]
import { objToStyle } from '@/uni_modules/wot-ui/common/util'

const customHighlightStyle = {
  border: '2px dashed #ff0000',
  borderRadius: '8px',
  background: 'rgba(255, 0, 0, 0.1)',
  boxSizing: 'border-box'
}
```

:::

### Custom Content and Buttons

Supports customizing guide content and action buttons through `content`, `prev`, `next`, `skip`, `finish` slots.

```html
<wd-tour v-model="showCustomContentTour" :steps="customContentSteps" next-text="Continue" prev-text="Back" skip-text="Skip" finish-text="Got it">
  <template #content>
    <view class="custom-content">
      <wd-icon name="help-circle-filled" size="22px"></wd-icon>
      <text class="custom-text">Custom guide content area</text>
    </view>
  </template>

  <template #next>
    <view class="custom-button custom-next">Next</view>
  </template>

  <template #finish>
    <view class="custom-button custom-finish">Finish</view>
  </template>
</wd-tour>
```

## Special Styles

### Control Current Step

You can directly jump to a specified step externally through `v-model:current`.

```ts
const controlCurrent = ref(0)

function startControlTour() {
  controlCurrent.value = 2
  showControlTour.value = true
}
```

## Tour Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| model-value | Whether to show guide component, supports `v-model` | `boolean` | `false` |
| steps | Guide step list | <code>TourStep[]</code> | `[]` |
| current | Current step index, supports `v-model:current` | `number` | `0` |
| mask | Whether to show mask | `boolean` | `true` |
| mask-color | Mask color | `string` | - |
| offset | Spacing between guide panel and highlight area | `number` | `20` |
| duration | Animation duration, in milliseconds | `number` | `300` |
| border-radius | Highlight area border radius | `number` | `4` |
| padding | Highlight area padding | `number` | `8` |
| prev-text | Previous step button text | `string` | `Previous` |
| next-text | Next step button text | `string` | `Next` |
| skip-text | Skip button text | `string` | `Skip` |
| finish-text | Finish button text | `string` | `Finish` |
| bottom-safety-offset | Bottom safety offset, used for scroll calculation | `number` | `100` |
| top-safety-offset | Top safety offset, used for scroll calculation | `number` | `0` |
| custom-nav | Whether to enable custom navigation bar mode | `boolean` | `false` |
| click-mask-next | Whether to proceed to next step when clicking mask layer | `boolean` | `false` |
| highlight-style | Default highlight area style | <code>CSSProperties</code> | `{}` |
| z-index | Z-index | `number` | - |
| show-tour-buttons | Whether to show guide buttons | `boolean` | `true` |
| scope | Query scope, limits selector lookup range | `unknown` | - |
| missing-strategy | Processing strategy when target element is missing, optional values are `skip`, `stop`, `hide` | `MissingStrategy` | `stop` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## TourStep Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| element | Element selector to highlight | `string` | - |
| content | Step explanation, supports `rich-text` rendering | `string` | - |
| padding | Override highlight padding for current step | `number` | - |
| offset | Override panel spacing for current step | `number` | - |
| placement | Force specify hint position, optional values are `auto`, `top`, `bottom`, `left`, `right` | `TourPlacement` | `auto` |

## Tour Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when current step changes | `{ current: number }` |
| prev | Triggered when clicking previous step | `{ prevCurrent, current, total, isElementInTop }` |
| next | Triggered when clicking next step | `{ prevCurrent, current, total, isElementInTop }` |
| finish | Triggered when clicking finish | `{ current, total }` |
| skip | Triggered when clicking skip | `{ current, total }` |
| error | Triggered when target element query fails | `{ message, element }` |
| update:modelValue | Triggered when visibility state changes | `boolean` |
| update:current | Triggered when current step changes | `number` |

## Tour Methods

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| handlePrev | Switch to previous step | - | - |
| handleNext | Switch to next step | - | - |
| handleFinish | Finish guide and close component | - | - |
| handleSkip | Skip guide and close component | - | - |

## Tour Slots

| Name | Description | Parameters |
| --- | --- | --- |
| highlight | Custom highlight area | `{ elementInfo }` |
| content | Custom guide content | - |
| prev | Custom previous step button | - |
| next | Custom next step button | - |
| skip | Custom skip button | - |
| finish | Custom finish button | - |
