# QRCode

Used to generate QR codes with support for custom colors, logos, gradients, background images, and image export.

## Notes

- The component is rendered with Canvas, so the availability of `logo` and `background-image` depends on the current platform image capabilities.
- Remote images usually need to be downloadable or readable through `getImageInfo` on the target platform.

## Basic Usage

### Basic QR Code

Set `text` as the QR code content.

```html
<wd-qr-code text="https://wot-ui.cn" />
```

### Custom Size

Use `size` to adjust the QR code size in `px`.

```html
<wd-qr-code text="https://wot-ui.cn" :size="280" />
```

### Custom Colors

Use `color-dark` and `color-light` to configure the dark and light colors.

```html
<wd-qr-code text="https://wot-ui.cn" color-dark="#3c9cff" color-light="#f2f7ff" />
```

## Styles

### With Logo

Set `logo` to draw a logo in the center of the QR code.

```html
<wd-qr-code text="https://wot-ui.cn" logo="https://img.yzcdn.cn/vant/cat.jpeg" />
```

### Logo Style

Use `logo-width`, `logo-height`, `logo-radius`, `logo-border-color`, and `logo-border-width` to customize the logo.

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

### Dot Styles

Use `dot-type` to switch between square, dots, rounded, and liquid styles, and `dot-scale` to adjust the scale.

```html
<wd-qr-code text="https://wot-ui.cn" dot-type="dots" :dot-scale="0.9" />
<wd-qr-code text="https://wot-ui.cn" dot-type="rounded" />
<wd-qr-code text="https://wot-ui.cn" dot-type="liquid" />
```

## Advanced Styles

### Gradient Colors

After enabling `enable-gradient`, you can configure gradients with `gradient-color` or `gradient-colors`.

```html
<wd-qr-code
  text="https://wot-ui.cn"
  enable-gradient
  :gradient-direction="45"
  :gradient-colors="['#4f46e5', '#06b6d4', '#10b981']"
/>
```

### Background Image

Use `background-image` to render a background image under the QR code.

```html
<wd-qr-code
  text="https://wot-ui.cn"
  background-image="https://img.yzcdn.cn/vant/apple-1.jpg"
  logo="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

## Methods

### Export Image

Call `exportImage` through the component instance to export the QR code image and get a temporary file path.

```html
<wd-qr-code ref="qrCodeRef" text="https://wot-ui.cn" />
<wd-button @click="handleExport">Export QR Code</wd-button>
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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| text | QR code content | `string` | `''` |
| size | QR code size in `px` | `number` | `200` |
| correct-level | Error correction level, available values are `L`, `M`, `Q`, `H` | `'L' \| 'M' \| 'Q' \| 'H'` | `'H'` |
| color-dark | Dark area color | `string` | `'#000000'` |
| color-light | Light area color | `string` | `'#FFFFFF'` |
| margin | Outer margin in `px` | `number` | `0` |
| logo | Logo image URL | `string` | `''` |
| logo-width | Logo width in `px` | `number` | `70` |
| logo-height | Logo height in `px` | `number` | `70` |
| logo-background-color | Logo background color | `string` | `'#FFFFFF'` |
| logo-radius | Logo radius in `px` | `number` | `0` |
| logo-border-color | Logo border color | `string` | `''` |
| logo-border-width | Logo border width in `px` | `number` | `0` |
| dot-type | Dot style, available values are `square`, `dots`, `rounded`, `liquid` | `'square' \| 'dots' \| 'rounded' \| 'liquid'` | `'square'` |
| dot-scale | Dot scale ratio | `number` | `1` |
| enable-gradient | Whether to enable gradient | `boolean` | `false` |
| gradient-color | Gradient end color | `string` | `'#000000'` |
| gradient-colors | Multi-color gradient array | `string[]` | `[]` |
| gradient-direction | Gradient direction, available values are `diagonal`, `horizontal`, `vertical`, or an angle number | `'diagonal' \| 'horizontal' \| 'vertical' \| number` | `'diagonal'` |
| background-image | Background image URL | `string` | `''` |
| canvas-id | Canvas id, auto-generated when omitted | `string` | `''` |
| custom-class | Custom root class name | `string` | `''` |
| custom-style | Custom root style | `string` | `''` |

## QRCode Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| click | Triggered when the component is clicked | `event: Event` |
| error | Triggered when drawing or exporting fails | `error: unknown` |

## QRCode Methods

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| exportImage | Export QR code image | - | `Promise<string>` |
