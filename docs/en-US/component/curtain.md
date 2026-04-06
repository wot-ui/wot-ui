# Curtain

Generally used for announcement image popup display.

## Component Type

### Basic Usage

Control display and hide through `v-model`; `src` is the curtain image address; `to` is the jump link after clicking the image; `width` is the image width (height is automatically calculated according to original image ratio).

```html
<wd-button @click="open = true">Show Curtain</wd-button>
<wd-curtain v-model="open" :src="img" :to="link" :width="280" />
```

## Component Style

### Modify Close Button Position

`close-position` optional values are `inset`, `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`.

```html
<wd-curtain v-model="showTopLeft" :src="img" :to="link" close-position="top-left" :width="280" />
<wd-curtain v-model="showTop" :src="img" :to="link" close-position="top" :width="280" />
<wd-curtain v-model="showTopRight" :src="img" :to="link" close-position="top-right" :width="280" />
```

## Component State

### Click Mask to Close

Set `close-on-click-modal`, clicking mask will close curtain.

```html
<wd-curtain v-model="open" :src="img" :to="link" close-position="bottom-right" :width="280" close-on-click-modal />
```

## Special Style

### Custom Close Button

Customize close button content and interaction through `close` slot.

```html
<wd-curtain v-model="open" :src="img" :width="280">
  <template #close>
    <view class="custom-close" @click="open = false">Close</view>
  </template>
</wd-curtain>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model / modelValue | Binding value, controls curtain display and close | boolean | false |
| value | Binding value (deprecated, please use `modelValue`) | boolean | false |
| src | Curtain image address, must use network address | string | - |
| width | Curtain image width, default unit px | number | - |
| to | Curtain image click link | string | - |
| close-position | Close button position, optional values are `inset`, `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right` | string | `inset` |
| close-on-click-modal | Whether to close when clicking mask | boolean | false |
| hide-when-close | Whether to hide popup when closing (`display: none`) | boolean | true |
| z-index | Set z-index | number | 10 |
| custom-close-class | Close button custom class name | string | `''` |
| custom-close-style | Close button custom style | string | `''` |
| root-portal | Whether to detach from page, used to solve fixed invalidation problem (H5: teleport, App: renderjs, Mini Program: root-portal) | boolean | false |
| show-menu-by-longpress | Enable long press image to show recognition mini program code menu, only WeChat Mini Program supports | boolean | false |
| close-on-click | Whether to close curtain when clicking image | boolean | true |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking curtain image | - |
| close | Triggered when popup closes | - |
| closed | Triggered when popup close animation ends | - |
| click-modal | Triggered when clicking mask | - |
| beforeenter | Triggered before entering | - |
| enter | Triggered when entering | - |
| afterenter | Triggered after entering | - |
| beforeleave | Triggered before leaving | - |
| leave | Triggered when leaving | - |
| afterleave | Triggered after leaving | - |
| load | Triggered when image loads | `event` |
| error | Triggered when image load fails. Even if `modelValue` is `true`, curtain will not display after image load fails | - |

## Slots

| name | Description | Parameters |
| --- | --- | --- |
| close | Custom close button | - |
