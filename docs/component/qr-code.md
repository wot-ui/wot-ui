# QRCode 二维码

用于生成二维码，支持自定义颜色、Logo、渐变、背景图以及导出图片。

## 使用注意

- 组件基于 Canvas 渲染，`logo` 与 `background-image` 的加载能力受当前平台图片能力影响。
- 远程图片通常需要平台已允许下载或能被 `getImageInfo` 正常解析。

## 基础用法

### 基础二维码

设置 `text` 属性为二维码内容。

```html
<wd-qr-code text="https://wot-ui.cn" />
```

### 自定义尺寸

通过 `size` 调整二维码尺寸，单位为 `px`。

```html
<wd-qr-code text="https://wot-ui.cn" :size="280" />
```

### 自定义颜色

通过 `color-dark` 和 `color-light` 分别设置深色与浅色区域颜色。

```html
<wd-qr-code text="https://wot-ui.cn" color-dark="#3c9cff" color-light="#f2f7ff" />
```

## 样式能力

### 带 Logo

设置 `logo` 可在二维码中心绘制 Logo。

```html
<wd-qr-code text="https://wot-ui.cn" logo="https://img.yzcdn.cn/vant/cat.jpeg" />
```

### Logo 样式

通过 `logo-width`、`logo-height`、`logo-radius`、`logo-border-color` 和 `logo-border-width` 调整 Logo 展示。

```html
<wd-qr-code
  text="https://wot-ui.cn"
  logo="https://img.yzcdn.cn/vant/cat.jpeg"
  :logo-width="52"
  :logo-height="52"
  :logo-radius="12"
  logo-background-color="#ffffff"
  logo-border-color="#ffffff"
  :logo-border-width="4"
/>
```

### 码点样式

通过 `dot-type` 可以切换方块、圆点、圆角和液态码点，并使用 `dot-scale` 调整缩放比例。

```html
<wd-qr-code text="https://wot-ui.cn" dot-type="dots" :dot-scale="0.9" />
<wd-qr-code text="https://wot-ui.cn" dot-type="rounded" />
<wd-qr-code text="https://wot-ui.cn" dot-type="liquid" />
```

## 特殊样式

### 渐变颜色

开启 `enable-gradient` 后，可通过 `gradient-color` 或 `gradient-colors` 配置渐变色。

```html
<wd-qr-code
  text="https://wot-ui.cn"
  enable-gradient
  :gradient-direction="45"
  :gradient-colors="['#4f46e5', '#06b6d4', '#10b981']"
/>
```

### 背景图片

通过 `background-image` 设置二维码底图。

```html
<wd-qr-code
  text="https://wot-ui.cn"
  background-image="https://img.yzcdn.cn/vant/apple-1.jpg"
  logo="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

## 方法

### 导出图片

通过组件实例调用 `exportImage` 导出二维码图片，返回临时文件路径。

```html
<wd-qr-code ref="qrCodeRef" text="https://wot-ui.cn" />
<wd-button @click="handleExport">导出二维码</wd-button>
```

```ts
import { ref } from 'vue'
import type { QrCodeInstance } from '@/uni_modules/wot-ui/components/wd-qr-code/types'

const qrCodeRef = ref<QrCodeInstance>()

async function handleExport() {
  const tempFilePath = await qrCodeRef.value?.exportImage()
  console.log(tempFilePath)
}
```

## QRCode Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 二维码内容 | `string` | `''` |
| size | 二维码大小，单位为 `px` | `number` | `200` |
| correct-level | 纠错级别，可选值为 `L`、`M`、`Q`、`H` | `'L' \| 'M' \| 'Q' \| 'H'` | `'H'` |
| color-dark | 二维码深色区域颜色 | `string` | `'#000000'` |
| color-light | 二维码浅色区域颜色 | `string` | `'#FFFFFF'` |
| margin | 二维码外边距，单位为 `px` | `number` | `0` |
| logo | Logo 图片地址 | `string` | `''` |
| logo-width | Logo 宽度，单位为 `px` | `number` | `70` |
| logo-height | Logo 高度，单位为 `px` | `number` | `70` |
| logo-background-color | Logo 背景色 | `string` | `'#FFFFFF'` |
| logo-radius | Logo 圆角，单位为 `px` | `number` | `0` |
| logo-border-color | Logo 边框颜色 | `string` | `''` |
| logo-border-width | Logo 边框宽度，单位为 `px` | `number` | `0` |
| dot-type | 码点类型，可选值为 `square`、`dots`、`rounded`、`liquid` | `'square' \| 'dots' \| 'rounded' \| 'liquid'` | `'square'` |
| dot-scale | 码点缩放比例 | `number` | `1` |
| enable-gradient | 是否启用渐变 | `boolean` | `false` |
| gradient-color | 渐变结束色 | `string` | `'#000000'` |
| gradient-colors | 多色渐变颜色数组 | `string[]` | `[]` |
| gradient-direction | 渐变方向，可选值为 `diagonal`、`horizontal`、`vertical` 或角度数值 | `'diagonal' \| 'horizontal' \| 'vertical' \| number` | `'diagonal'` |
| background-image | 背景图片地址 | `string` | `''` |
| canvas-id | Canvas ID，不传时自动生成 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |
| custom-style | 自定义根节点样式 | `string` | `''` |

## QRCode Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击组件时触发 | `event: Event` |
| error | 绘制或导出过程出错时触发 | `error: unknown` |

## QRCode Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| exportImage | 导出二维码图片 | - | `Promise<string>` |
