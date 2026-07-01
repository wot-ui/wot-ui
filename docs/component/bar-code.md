# BarCode 条形码

用于生成一维条形码，基于 [JsBarcode](https://github.com/lindell/JsBarcode) 实现，支持多种常见条码格式，可在 H5、小程序和 App 端使用。

## 组件类型

### 基本用法

通过 `value` 设置条形码内容，默认使用 `CODE128` 格式。

```html
<wd-bar-code value="1234567890" />
```

### 常见格式

通过 `format` 指定条码格式，例如 `EAN13`、`CODE39`、`ITF14`。

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="CODE39" format="CODE39" />
<wd-bar-code value="1234567890123" format="ITF14" />
```

## 组件变体

### 文字位置

通过 `text-position` 控制文字显示在条码上方或下方。

```html
<wd-bar-code value="1234567890" text-position="top" />
<wd-bar-code value="1234567890" text-position="bottom" />
```

### 文字间距

通过 `text-margin` 调整文字与条码之间的间距。

```html
<wd-bar-code value="1234567890" :text-margin="10" />
```

### 隐藏文字

通过 `display-value` 控制是否显示条码下方文字。

```html
<wd-bar-code value="1234567890" :display-value="false" />
```

## 组件样式

### 自定义颜色

通过 `line-color` 和 `background` 分别设置线条颜色和背景色。

```html
<wd-bar-code value="1234567890" line-color="#4D80F0" background="#E0EAFF" />
```

### 自定义尺寸

通过 `width` 和 `height` 调整线条宽度与条码高度。

```html
<wd-bar-code value="1234567890" :width="4" :height="80" />
```

### 字体样式

通过 `font-options` 设置文字样式，可选值为 `bold`、`italic`、`bold italic`。

```html
<wd-bar-code value="1234567890" font-options="bold italic" />
```

## 特殊样式

### 支持格式

组件支持 `CODE128`、`CODE128A`、`CODE128B`、`CODE128C`、`EAN13`、`EAN8`、`UPC`、`UPCE`、`CODE39`、`ITF14`、`MSI`、`MSI10`、`MSI11`、`MSI1010`、`MSI1110`、`pharmacode`、`codabar` 等格式。

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="A123456A" format="codabar" />
```

## BarCode Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 条形码内容 | `string \| number` | - |
| format | 条形码格式，可选值为 `auto`、`CODE128`、`CODE128A`、`CODE128B`、`CODE128C`、`EAN13`、`EAN8`、`UPC`、`UPCE`、`CODE39`、`ITF14`、`MSI`、`MSI10`、`MSI11`、`MSI1010`、`MSI1110`、`pharmacode`、`codabar` | `string` | `auto` |
| width | 单条竖线宽度 | `number` | `2` |
| height | 条形码高度 | `number` | `100` |
| text | 显示的文本，默认显示 `value` | `string` | `''` |
| font | 字体 | `string` | `monospace` |
| font-size | 字体大小 | `number` | `20` |
| font-options | 字体样式，可选值为 `bold`、`italic`、`bold italic` | `string` | `''` |
| text-margin | 文本与条码的间距 | `number` | `2` |
| background | 背景色 | `string` | `#ffffff` |
| line-color | 线条颜色 | `string` | `#000000` |
| margin | 边距 | `number` | `10` |
| margin-top | 上边距 | `number` | - |
| margin-bottom | 下边距 | `number` | - |
| margin-left | 左边距 | `number` | - |
| margin-right | 右边距 | `number` | - |
| display-value | 是否显示文本 | `boolean` | `true` |
| text-align | 文本对齐方式，可选值为 `left`、`center`、`right` | `string` | `center` |
| text-position | 文本位置，可选值为 `bottom`、`top` | `string` | `bottom` |

## BarCode Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| error | 生成失败时触发 | `error` |
| valid | 校验结果变化时触发 | `valid: boolean` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
