# Watermark 水印

在页面或组件上添加指定的图片或文字，可用于版权保护、品牌宣传等场景。

## 组件类型

### 局部文字水印

通过 `content` 指定水印文字，并配合 `full-screen="false"` 将水印限定在局部容器内。

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" content="wot-ui"></wd-watermark>
</view>
```

### 局部图片水印

通过 `image` 指定图片地址，并使用 `image-width`、`image-height` 控制图片大小。

::: warning 注意
钉钉小程序仅支持网络图片，不支持 Base64 图片水印。
:::

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" image="https://v2.wot-ui.cn/logo.svg" :image-width="38" :image-height="38"></wd-watermark>
</view>
```

### 局部多行文字水印

增大 `width` 与 `height` 后，可以承载更长的文字内容，适合多行展示。

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" :width="150" :height="150" content="多行文字水印测试自动换行效果展示，这是一段很长的文本"></wd-watermark>
</view>
```

## 特殊样式

### 全局水印

默认情况下组件会铺满页面。结合 `layout` 可以在网格布局与错位布局之间切换，也可以在文字水印和图片水印之间切换。

```html
<wd-watermark content="wot-ui" :width="130" :height="140" layout="grid"></wd-watermark>
```

### 自定义层级和透明度

通过 `opacity` 设置透明度，通过 `z-index` 控制水印层级。

```html
<wd-watermark content="wot-ui" :opacity="0.4" :z-index="1200"></wd-watermark>
```

## Watermark Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 水印文字内容 | `string` | `''` |
| image | 水印图片地址，支持网络图片和 Base64 图片，钉钉小程序仅支持网络图片 | `string` | `''` |
| image-height | 图片高度 | `number` | `100` |
| image-width | 图片宽度 | `number` | `100` |
| gutter-x | X 轴间距，单位为 `px` | `number` | `0` |
| gutter-y | Y 轴间距，单位为 `px` | `number` | `0` |
| width | 单个水印画布宽度，单位为 `px` | `number` | `100` |
| height | 单个水印画布高度，单位为 `px` | `number` | `100` |
| full-screen | 是否铺满整个页面 | `boolean` | `true` |
| color | 水印文字颜色 | `string` | `#C9CBD4` |
| size | 水印文字大小，单位为 `px` | `number` | `14` |
| font-style | 水印字体样式，仅微信、支付宝和 H5 支持，可选值为 `normal`、`italic`、`oblique` | `WatermarkFontStyle` | `normal` |
| font-weight | 水印字体粗细，仅微信、支付宝和 H5 支持 | <code>string &#124; number</code> | `normal` |
| font-family | 水印字体系列，仅微信、支付宝和 H5 支持 | `string` | `PingFang SC` |
| rotate | 水印旋转角度 | `number` | `-25` |
| z-index | 水印层级 | `number` | `1100` |
| opacity | 水印透明度，取值范围为 `0` 到 `1` | `number` | - |
| layout | 水印布局，可选值为 `grid`、`staggered` | `WatermarkLayout` | `grid` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

