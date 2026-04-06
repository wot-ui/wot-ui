# Watermark

Add specified images or text to pages or components, which can be used for copyright protection, brand promotion, and other scenarios.

## Component Types

### Local Text Watermark

Specify watermark text via `content`, and use `full-screen="false"` to limit the watermark to a local container.

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" content="wot-ui"></wd-watermark>
</view>
```

### Local Image Watermark

Specify image address via `image`, and use `image-width`, `image-height` to control image size.

::: warning Note
DingTalk mini program only supports network images, does not support Base64 image watermarks.
:::

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" image="https://wot-ui.cn/logo.png" :image-width="38" :image-height="38"></wd-watermark>
</view>
```

### Local Multi-line Text Watermark

After increasing `width` and `height`, it can carry longer text content, suitable for multi-line display.

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" :width="150" :height="150" content="Multi-line text watermark test automatic line break effect display, this is a very long text"></wd-watermark>
</view>
```

## Special Styles

### Full-screen Watermark

By default, the component will cover the entire page. Combined with `layout`, you can switch between grid layout and staggered layout, and also switch between text watermarks and image watermarks.

```html
<wd-watermark content="wot-ui" :width="130" :height="140" layout="grid"></wd-watermark>
```

### Custom Z-index and Opacity

Set opacity via `opacity`, and control watermark z-index via `z-index`.

```html
<wd-watermark content="wot-ui" :opacity="0.4" :z-index="1200"></wd-watermark>
```

## Watermark Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| content | Watermark text content | `string` | `''` |
| image | Watermark image address, supports network images and Base64 images, DingTalk mini program only supports network images | `string` | `''` |
| image-height | Image height | `number` | `100` |
| image-width | Image width | `number` | `100` |
| gutter-x | X-axis spacing, unit is `px` | `number` | `0` |
| gutter-y | Y-axis spacing, unit is `px` | `number` | `0` |
| width | Single watermark canvas width, unit is `px` | `number` | `100` |
| height | Single watermark canvas height, unit is `px` | `number` | `100` |
| full-screen | Whether to cover the entire page | `boolean` | `true` |
| color | Watermark text color | `string` | `#C9CBD4` |
| size | Watermark text size, unit is `px` | `number` | `14` |
| font-style | Watermark font style, only supported by WeChat, Alipay and H5, optional values are `normal`, `italic`, `oblique` | `WatermarkFontStyle` | `normal` |
| font-weight | Watermark font weight, only supported by WeChat, Alipay and H5 | <code>string &#124; number</code> | `normal` |
| font-family | Watermark font family, only supported by WeChat, Alipay and H5 | `string` | `PingFang SC` |
| rotate | Watermark rotation angle | `number` | `-25` |
| z-index | Watermark z-index | `number` | `1100` |
| opacity | Watermark opacity, value range is `0` to `1` | `number` | - |
| layout | Watermark layout, optional values are `grid`, `staggered` | `WatermarkLayout` | `grid` |
| custom-style | Custom root node style | `string` | `''` |
| custom-class | Custom root node style class | `string` | `''` |
