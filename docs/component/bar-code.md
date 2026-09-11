# BarCode 条形码

用于生成一维条形码，基于 [JsBarcode](https://github.com/lindell/JsBarcode) 实现，支持多种常见条码格式，可在 H5、小程序和 App 端使用。

## 组件类型

### 基本用法

通过 `value` 设置条形码内容，默认使用 `auto` 格式。

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

通过 `width` 调整条形码整体宽度，通过 `height` 调整包含上下留白、条和文本在内的整体高度。

```html
<!-- 指定整体宽度 -->
<wd-bar-code value="1234567890" :width="260" :height="80" />

<!-- 宽而矮的紧凑尺寸 -->
<wd-bar-code value="1234567890" :width="320" :height="50" />

<!-- 增加条形码整体高度 -->
<wd-bar-code value="1234567890" :height="140" />

<!-- 隐藏文字后做紧凑尺寸 -->
<wd-bar-code value="1234567890" :height="60" :display-value="false" />
```

### 字体样式

通过 `font-size` 设置底部数字大小，通过 `font-options` 设置文字样式，可选值为 `bold`、`italic`、`bold italic`。

```html
<wd-bar-code value="1234567890" :font-size="14" />
<wd-bar-code value="1234567890" :font-size="24" />
<wd-bar-code value="1234567890" font-options="bold italic" />
```

## 特殊样式

### 支持格式

组件支持 `CODE128`、`CODE128A`、`CODE128B`、`CODE128C`、`EAN13`、`EAN8`、`UPC`、`UPCE`、`CODE39`、`ITF14`、`MSI`、`MSI10`、`MSI11`、`MSI1010`、`MSI1110`、`pharmacode`、`codabar` 等格式。

```html
<wd-bar-code value="690123456789" format="EAN13" />
<wd-bar-code value="A123456A" format="codabar" />
```

### 特殊格式尺寸

EAN8、UPC、UPCE 这类格式也可以单独调整宽高。

```html
<wd-bar-code value="1234567" format="EAN8" :width="210" :height="120" />
<wd-bar-code value="12345678901" format="UPC" :width="240" :height="130" />
<wd-bar-code value="123456" format="UPCE" :width="200" :height="110" />
```

### 导出图片

通过组件实例调用 `exportImage()` 导出当前条形码图片。

```vue
<template>
  <view>
    <wd-bar-code ref="barCodeRef" value="1234567890" />
    <wd-button icon="download" size="small" @click="handleExportImage">导出图片</wd-button>
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value ^(2.0.5) | 条形码内容 | `string \| number` | - |
| format ^(2.0.5) | 条形码格式，可选值为 `auto`、`CODE128`、`CODE128A`、`CODE128B`、`CODE128C`、`EAN13`、`EAN8`、`UPC`、`UPCE`、`CODE39`、`ITF14`、`MSI`、`MSI10`、`MSI11`、`MSI1010`、`MSI1110`、`pharmacode`、`codabar` | `string` | `auto` |
| width ^(2.0.5) | 条形码整体宽度 | `number` | `200` |
| height ^(2.0.5) | 条形码整体渲染高度，包含上下留白、条和文本 | `number` | `100` |
| text ^(2.0.5) | 显示的文本，默认显示 `value` | `string` | `''` |
| font ^(2.0.5) | 字体 | `string` | `monospace` |
| font-size ^(2.0.5) | 文本大小 | `number` | `20` |
| font-options ^(2.0.5) | 字体样式，可选值为 `bold`、`italic`、`bold italic` | `string` | `''` |
| text-margin ^(2.0.5) | 文本与条码的间距 | `number` | `2` |
| background ^(2.0.5) | 背景色 | `string` | `#ffffff` |
| line-color ^(2.0.5) | 线条颜色 | `string` | `#000000` |
| margin ^(2.0.5) | 边距 | `number` | `10` |
| margin-top ^(2.0.5) | 上边距 | `number` | - |
| margin-bottom ^(2.0.5) | 下边距 | `number` | - |
| margin-left ^(2.0.5) | 左边距 | `number` | - |
| margin-right ^(2.0.5) | 右边距 | `number` | - |
| display-value ^(2.0.5) | 是否显示文本 | `boolean` | `true` |
| text-align ^(2.0.5) | 文本对齐方式，可选值为 `left`、`center`、`right` | `string` | `center` |
| text-position ^(2.0.5) | 文本位置，可选值为 `bottom`、`top` | `string` | `bottom` |

## BarCode Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| error ^(2.0.5) | 生成失败时触发 | `error` |
| valid ^(2.0.5) | 校验结果变化时触发 | `valid: boolean` |

## BarCode Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| exportImage ^(2.0.5) | 导出条形码图片 | - | `Promise<string>` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
