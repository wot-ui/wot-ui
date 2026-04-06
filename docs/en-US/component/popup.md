# Popup

Popup layer component, used to display popups, information prompts, and other content.

## Component Types

### Basic Usage

`v-model` is the binding value, indicating whether to display the popup layer.

```html
<wd-popup v-model="show" custom-style="border-radius: 32rpx;" @close="handleClose">
  <text class="custom-txt">Popup</text>
</wd-popup>
```

```css
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
```

### Popup Position

Set `position`, optional values are `center`, `top`, `right`, `bottom`, `left`, default is `center`.

```html
<wd-popup v-model="show" position="top" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="right" custom-style="width: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="bottom" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="left" custom-style="width: 200px;" @close="handleClose"></wd-popup>
```

## Component States

### Close Button

Set the `closable` property.

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### Disable Mask Click

By setting `close-on-click-modal="false"`, you can disable closing the popup when clicking the mask layer.

```html
<wd-popup v-model="show" position="bottom" :close-on-click-modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### Disable Mask

By setting `modal="false"`, you can close the mask layer, allowing underlying content to remain interactive.

```html
<wd-popup v-model="show" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Component Styles

### Bottom Safe Area

By setting `safe-area-inset-bottom="true"`, you can ensure that the bottom popup is not blocked by the safe area on notch screen devices.

```html
<wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Special Styles

### Lock Scroll

`lock-scroll` is used to lock background scrolling. In mini programs and APPs, if you also need to completely prevent page scroll penetration, it is recommended to use `page-meta` to control page `overflow`.

```html
<!-- page-meta can only be the first node of the page -->
<page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>

<wd-popup v-model="show" lock-scroll position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

:::tip Tip
H5 end already handles scroll locking by default, generally no additional handling for scroll penetration is needed.
:::

### Nested Popups and root-portal

When using the `root-portal` property, the popup layer will detach from the current page structure, used to avoid parent element `transform`, `filter` and other styles affecting the fixed positioning of the popup layer.

Implementation methods for different platforms are as follows:

- H5: Use Vue 3's teleport feature
- APP: Use renderjs to move elements to the uni-app root node
- WeChat Mini Program / Alipay Mini Program: Use root-portal component
- Other platforms: Do not support this capability

```html
<wd-popup v-model="showParent" position="center" custom-style="padding: 20px; border-radius: 16px;">
  <wd-button type="success" size="small" @click="showChild = true">Open Teleport Child Popup</wd-button>

  <wd-popup v-model="showChild" root-portal position="center" custom-style="padding: 20px; border-radius: 16px;">
    <text>This child popup will detach from parent hierarchy rendering</text>
  </wd-popup>
</wd-popup>
```

:::tip Tip
`root-portal` is mainly used to solve hierarchy and positioning issues in complex layouts, it is recommended to enable only when there is a clear need.
:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Whether the popup layer is displayed | `boolean` | `false` |
| transition | Animation type, see `wd-transition` component's `name` | `TransitionName` | - |
| closable | Whether to show the close button | `boolean` | `false` |
| position | Popup position, optional values are `center`, `top`, `right`, `bottom`, `left` | `string` | `center` |
| close-on-click-modal | Whether to close the popup when clicking the mask | `boolean` | `true` |
| duration | Animation duration | `number \| boolean` | `300` |
| modal | Whether to show the mask | `boolean` | `true` |
| z-index | Popup layer z-index | `number` | `10` |
| hide-when-close | Whether to hide the popup layer node when closed | `boolean` | `true` |
| modal-style | Custom mask style | `string` | - |
| safe-area-inset-bottom | Whether the bottom popup adapts to the bottom safe area | `boolean` | `false` |
| lazy-render | Whether the popup layer content is lazy rendered | `boolean` | `true` |
| lock-scroll | Whether to lock background scrolling; after locking, content within the mask will also be unable to scroll | `boolean` | `true` |
| root-portal | Whether to detach from the page structure, used to solve fixed positioning issues | `boolean` | `false` |
| round | Whether to enable rounded corners; after enabling, automatically adapts based on popup position (bottom popup → top rounded corners, top popup → bottom rounded corners, center → all rounded corners) | `boolean` | `false` |
| custom-class | Custom root node class name | `string` | - |
| custom-style | Custom popup layer style | `string` | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| close | Triggered when the popup layer closes | - |
| click-modal | Triggered when clicking the mask | - |
| before-enter | Triggered before entering | - |
| enter | Triggered when entering | - |
| after-enter | Triggered after entering | - |
| before-leave | Triggered before leaving | - |
| leave | Triggered when leaving | - |
| after-leave | Triggered after leaving | - |

## Slots

| Name | Description |
| --- | --- |
| default | Popup layer content |
