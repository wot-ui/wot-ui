# Divider

Used to separate content into multiple areas.

## Component Type

### Basic Usage

Default renders a horizontal divider line.

```html
<wd-divider />
```

### Display Text

Use default slot to insert content in the middle of the divider.

```html
<wd-divider>Display Text</wd-divider>
```

## Component Variant

### Content Position

Specify content position through `content-position`.

```html
<wd-divider>Center</wd-divider>
<wd-divider content-position="left">Left</wd-divider>
<wd-divider content-position="right">Right</wd-divider>
```

### Dashed Line

Add `dashed` to render divider as dashed line.

```html
<wd-divider dashed>Dashed Divider</wd-divider>
```

## Component Style

### Custom Render Content

Use default slot to render custom content.

```html
<wd-divider>
  <wd-icon name="down" size="20" />
</wd-divider>
```

### Custom Color

Set `color` to customize divider color.

```html
<wd-divider color="#4D80F0">Custom Color</wd-divider>
```

## Special Style

### Vertical Divider

Add `vertical` to render divider as vertical direction, default slot does not take effect in vertical mode.

```html
<view class="content">
  Text
  <wd-divider vertical />
  Text
  <wd-divider vertical dashed />
  Text
  <wd-divider vertical :hairline="false" />
  Text
  <wd-divider vertical color="#1989fa" />
  Text
</view>
```

```css
.content {
  padding: 12rpx 15px;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| color | Custom color, supports all valid color values | `string` | - |
| content-position | Content position, optional values are `left`, `center`, `right` | `DividerPosition` | `'center'` |
| dashed | Whether to display as dashed line | `boolean` | `false` |
| vertical | Whether to display as vertical divider | `boolean` | `false` |
| hairline | Whether to display as 0.5px thin line | `boolean` | `true` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Divider content, only takes effect when `vertical` is `false` | - |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
