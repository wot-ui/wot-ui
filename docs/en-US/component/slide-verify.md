# SlideVerify

Slide verification component for human-machine verification scenarios.

## Component Types

### Basic Usage

```html
<wd-slide-verify @success="handleSuccess" @fail="handleFail" />
```

```ts
const toast = useToast()

function handleSuccess() {
  toast.success('Verification successful')
}

function handleFail() {
  toast.error('Verification failed, please try again')
}
```

## Component States

### Disabled State

Set `disabled` to disable slide verification.

```html
<wd-slide-verify disabled />
```

## Component Styles

### Custom Text

Customize prompt text through `text` and `success-text` properties.

```html
<wd-slide-verify text="Please drag the slider" success-text="Verification successful" />
```

### Custom Colors

Customize colors through `background-color` and `active-background-color` properties.

```html
<wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
```

### Custom Icons

Customize icons through `icon` and `success-icon` properties.

```html
<wd-slide-verify icon="arrow-right" success-icon="thumb-up-fill" />
```

When both the slider icon and success icon use CSS icons, it is recommended to set `css-icon` to `true` and pass `icon` and `success-icon` as their own CSS icon classes. If you pass a string class name directly to `css-icon`, the slider icon and success icon will share the same CSS class.

```html
<wd-slide-verify css-icon icon="i-carbon-arrow-right" success-icon="i-carbon-checkmark" />
```

## Special Styles

### Custom Tolerance Range

Set the tolerance range (in px) through the `tolerance` property, default is 10px.

```html
<wd-slide-verify :tolerance="20" />
```

### Reset Method

Get the component instance through `ref` and call the `reset` method to reset the verification state.

```html
<wd-slide-verify ref="slideVerifyRef" @success="handleSuccess" @fail="handleFail" />
<wd-button type="primary" @click="handleReset">Reset</wd-button>
```

```ts
import { ref } from 'vue'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleReset() {
  slideVerifyRef.value?.reset()
}
```

### Slot Usage

Supports customizing content through slots.

```html
<wd-slide-verify>
  <template #text>
    <text>Slide right to complete verification</text>
  </template>
  <template #success-text>
    <text>Verification passed</text>
  </template>
  <template #icon>
    <view>ICON</view>
  </template>
  <template #success-icon>
    <view style="color: red">OK</view>
  </template>
</wd-slide-verify>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| tolerance | Tolerance range, unit is `px` | number | `10` |
| text | Prompt text, displays built-in text when empty | string | `''` |
| success-text | Verification success prompt text, displays built-in text when empty | string | `''` |
| disabled | Whether to disable | boolean | `false` |
| background-color | Background color | string | - |
| active-background-color | Background color when active | string | - |
| icon | Slider icon name | string | `double-right` |
| success-icon | Success icon name | string | `check-circle-fill` |
| icon-prefix | Icon class prefix, see Icon component for usage | string | - |
| css-icon | CSS icon, see Icon component for usage | `boolean \| string` | `false` |
| icon-size | Icon size | string / number | - |
| success-icon-size | Success icon size | string / number | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| success | Triggered when verification succeeds | - |
| fail | Triggered when verification fails | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| init | Initialize size information | - |
| reset | Reset verification component to initial state | - |

## Slots

| Name | Description |
| --- | --- |
| text | Custom prompt text content |
| success-text | Custom verification success prompt text content |
| icon | Custom slider icon |
| success-icon | Custom success icon |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node style |
