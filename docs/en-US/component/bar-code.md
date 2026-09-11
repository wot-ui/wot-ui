# BarCode

Generates one-dimensional barcodes based on [JsBarcode](https://github.com/lindell/JsBarcode). Supports common barcode formats across H5, mini programs, and App.

## Component Type

### Basic Usage

Set the barcode content with `value`. The default format is `auto`.

```html
<wd-bar-code value="1234567890" />
```

### Common Formats

Use `format` to specify the barcode type, such as `EAN13`, `CODE39`, or `ITF14`.

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="CODE39" format="CODE39" />
<wd-bar-code value="1234567890123" format="ITF14" />
```

## Component Variant

### Text Position

Use `text-position` to place text above or below the barcode.

```html
<wd-bar-code value="1234567890" text-position="top" />
<wd-bar-code value="1234567890" text-position="bottom" />
```

### Text Margin

Use `text-margin` to adjust the spacing between text and barcode.

```html
<wd-bar-code value="1234567890" :text-margin="10" />
```

### Hide Text

Use `display-value` to control whether the text is shown.

```html
<wd-bar-code value="1234567890" :display-value="false" />
```

## Component Style

### Custom Colors

Use `line-color` and `background` to customize the barcode colors.

```html
<wd-bar-code value="1234567890" line-color="#4D80F0" background="#E0EAFF" />
```

### Custom Size

Use `width` to set the overall barcode width, and `height` to set the overall render height including vertical margins, bars, and text.

```html
<!-- Set the overall width -->
<wd-bar-code value="1234567890" :width="260" :height="80" />

<!-- Wide and compact size -->
<wd-bar-code value="1234567890" :width="320" :height="50" />

<!-- Increase overall barcode height -->
<wd-bar-code value="1234567890" :height="140" />

<!-- Hide text for a compact size -->
<wd-bar-code value="1234567890" :height="60" :display-value="false" />
```

### Font Style

Use `font-size` to set the text size, and `font-options` to set text style. Supported `font-options` values are `bold`, `italic`, and `bold italic`.

```html
<wd-bar-code value="1234567890" :font-size="14" />
<wd-bar-code value="1234567890" :font-size="24" />
<wd-bar-code value="1234567890" font-options="bold italic" />
```

## Special Style

### Supported Formats

The component supports `CODE128`, `CODE128A`, `CODE128B`, `CODE128C`, `EAN13`, `EAN8`, `UPC`, `UPCE`, `CODE39`, `ITF14`, `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110`, `pharmacode`, and `codabar`.

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="A123456A" format="codabar" />
```

### Special Format Sizes

EAN8, UPC, and UPCE can also be displayed with custom sizes.

```html
<wd-bar-code value="1234567" format="EAN8" :width="210" :height="120" />
<wd-bar-code value="12345678901" format="UPC" :width="240" :height="130" />
<wd-bar-code value="123456" format="UPCE" :width="200" :height="110" />
```

### Export Image

Call `exportImage()` on the component instance to export the current barcode image.

```vue
<template>
  <view>
    <wd-bar-code ref="barCodeRef" value="1234567890" />
    <wd-button icon="download" size="small" @click="handleExportImage">Export Image</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BarCodeInstance } from '@/uni_modules/wot-ui/components/wd-bar-code/types'

const barCodeRef = ref<BarCodeInstance | null>(null)

async function handleExportImage() {
  const path = await barCodeRef.value?.exportImage()
  console.log(path)
}
</script>
```

## BarCode Attributes

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value ^(2.0.5) | Barcode content | `string \| number` | - |
| format ^(2.0.5) | Barcode format. Supported values: `auto`, `CODE128`, `CODE128A`, `CODE128B`, `CODE128C`, `EAN13`, `EAN8`, `UPC`, `UPCE`, `CODE39`, `ITF14`, `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110`, `pharmacode`, `codabar` | `string` | `auto` |
| width ^(2.0.5) | Overall barcode width | `number` | `200` |
| height ^(2.0.5) | Overall render height, including vertical margins, bars, and text | `number` | `100` |
| text ^(2.0.5) | Display text, defaults to `value` | `string` | `''` |
| font ^(2.0.5) | Font family | `string` | `monospace` |
| font-size ^(2.0.5) | Text size | `number` | `20` |
| font-options ^(2.0.5) | Font style. Supported values: `bold`, `italic`, `bold italic` | `string` | `''` |
| text-margin ^(2.0.5) | Spacing between text and barcode | `number` | `2` |
| background ^(2.0.5) | Background color | `string` | `#ffffff` |
| line-color ^(2.0.5) | Line color | `string` | `#000000` |
| margin ^(2.0.5) | Margin | `number` | `10` |
| margin-top ^(2.0.5) | Top margin | `number` | - |
| margin-bottom ^(2.0.5) | Bottom margin | `number` | - |
| margin-left ^(2.0.5) | Left margin | `number` | - |
| margin-right ^(2.0.5) | Right margin | `number` | - |
| display-value ^(2.0.5) | Whether to display text | `boolean` | `true` |
| text-align ^(2.0.5) | Text alignment. Supported values: `left`, `center`, `right` | `string` | `center` |
| text-position ^(2.0.5) | Text position. Supported values: `bottom`, `top` | `string` | `bottom` |

## BarCode Events

| Event | Description | Arguments |
| --- | --- | --- |
| error ^(2.0.5) | Triggered when rendering fails | `error` |
| valid ^(2.0.5) | Triggered when validation result changes | `valid: boolean` |

## BarCode Methods

| Method | Description | Arguments | Return value |
| --- | --- | --- | --- |
| exportImage ^(2.0.5) | Exports the barcode image | - | `Promise<string>` |

## External Classes

| Class | Description |
| --- | --- |
| custom-class | Root node class |
