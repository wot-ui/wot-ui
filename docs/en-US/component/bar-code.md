# BarCode

Generates one-dimensional barcodes based on [JsBarcode](https://github.com/lindell/JsBarcode). Supports common barcode formats across H5, mini programs, and App.

## Component Type

### Basic Usage

Set the barcode content with `value`. The default format is `CODE128`.

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

Use `width` and `height` to adjust line width and barcode height.

```html
<wd-bar-code value="1234567890" :width="4" :height="80" />
```

### Font Style

Use `font-options` to set text style. Supported values are `bold`, `italic`, and `bold italic`.

```html
<wd-bar-code value="1234567890" font-options="bold italic" />
```

## Special Style

### Supported Formats

The component supports `CODE128`, `CODE128A`, `CODE128B`, `CODE128C`, `EAN13`, `EAN8`, `UPC`, `UPCE`, `CODE39`, `ITF14`, `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110`, `pharmacode`, and `codabar`.

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="A123456A" format="codabar" />
```

## BarCode Attributes

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | Barcode content | `string \| number` | - |
| format | Barcode format. Supported values: `auto`, `CODE128`, `CODE128A`, `CODE128B`, `CODE128C`, `EAN13`, `EAN8`, `UPC`, `UPCE`, `CODE39`, `ITF14`, `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110`, `pharmacode`, `codabar` | `string` | `auto` |
| width | Line width | `number` | `2` |
| height | Barcode height | `number` | `100` |
| text | Display text, defaults to `value` | `string` | `''` |
| font | Font family | `string` | `monospace` |
| font-size | Font size | `number` | `20` |
| font-options | Font style. Supported values: `bold`, `italic`, `bold italic` | `string` | `''` |
| text-margin | Spacing between text and barcode | `number` | `2` |
| background | Background color | `string` | `#ffffff` |
| line-color | Line color | `string` | `#000000` |
| margin | Margin | `number` | `10` |
| margin-top | Top margin | `number` | - |
| margin-bottom | Bottom margin | `number` | - |
| margin-left | Left margin | `number` | - |
| margin-right | Right margin | `number` | - |
| display-value | Whether to display text | `boolean` | `true` |
| text-align | Text alignment. Supported values: `left`, `center`, `right` | `string` | `center` |
| text-position | Text position. Supported values: `bottom`, `top` | `string` | `bottom` |

## BarCode Events

| Event | Description | Arguments |
| --- | --- | --- |
| error | Triggered when rendering fails | `error` |
| valid | Triggered when validation result changes | `valid: boolean` |

## External Classes

| Class | Description |
| --- | --- |
| custom-class | Root node class |
