# Empty Empty State

Generally used for fallback placeholder display.

## Content Form

Set `icon` to modify the empty state icon or image, default is `empty`. Supports built-in common icon names such as `no-result`, `no-wifi`, `no-content`, `no-collection`, `no-comment`, `failpayment`, `no-message`. You can set `tip` to control the display of prompt text.

```html
<wd-empty icon="no-result" tip="No search results" />
<wd-empty icon="no-wifi" tip="Network unavailable, please check your network settings" />
<wd-empty icon="no-content" tip="No content yet" />
<wd-empty icon="no-collection" tip="No collections yet" />
<wd-empty icon="no-comment" tip="No comments yet" />
<wd-empty icon="failpayment" tip="Payment failed, please reorder" />
<wd-empty icon="no-message" tip="Subscribed to all messages" />
```

## Component Style

### Custom Size

Customize the icon or image size via `icon-size` attribute, default unit is `px`.

```html
<wd-empty :icon-size="140" icon="no-result" tip="No search results" />
```

## Special Style

### Custom Image

When you need to use a custom external image, you can directly pass the complete image URL in the `icon` attribute.

```html
<wd-empty icon="https://wot-ui.cn/assets/panda.jpg" tip="View my avatar" />
```

### Custom Image Content

Use the `image` slot to fully customize the rendering content of the icon or image position.

```html
<wd-empty tip="Custom image content">
  <template #image>
    <wd-icon name="sun-fill" size="100px"></wd-icon>
  </template>
</wd-empty>
```

### Custom Bottom Content

Use the `bottom` slot to render custom content at the bottom of the prompt text (such as interactive operation buttons). It is recommended to wrap a container inside the slot for easier control of spacing with the content above.

```html
<wd-empty icon="no-content" tip="No search results">
  <template #bottom>
    <view class="bottom-actions">
      <wd-button type="info">Reload</wd-button>
    </view>
  </template>
</wd-empty>
```

Recommended styles (can be added in page or global styles):

```css
.bottom-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| icon | Empty state icon name or image URL | string | `empty` |
| icon-size | Icon or image size, default unit is px | string / number | - |
| tip | Prompt text | string | - |

## Slots

| name | Description |
| --- | --- |
| image | Custom image area content |
| bottom | Custom bottom content |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
| custom-style | Root node style |
