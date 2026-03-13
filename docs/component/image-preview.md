# ImagePreview 图片预览

图片预览组件，支持多图预览、滑动切换、手势缩放和函数式调用。

## 基本用法

通过 `useImagePreview` 函数式调用打开图片预览。

```html
<wd-button @click="handlePreview">预览图片</wd-button>
<wd-image-preview />
```

```typescript
import { useImagePreview } from 'wot-design-uni'

const imagePreview = useImagePreview()

function handlePreview() {
  imagePreview.open({
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    startPosition: 0
  })
}
```

## 指定起始位置

通过 `startPosition` 指定预览时的起始位置（从 0 开始）。

```typescript
imagePreview.open({
  images: ['url1', 'url2', 'url3'],
  startPosition: 1 // 从第二张图片开始预览
})
```

## 传入图片数组

可以直接传入图片 URL 数组，简化调用方式。

```typescript
imagePreview.open([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## 隐藏页码

通过 `showIndex` 属性控制是否显示页码。

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  showIndex: false
})
```

## 关闭按钮

通过 `closeable` 控制是否显示关闭按钮，`closeIconPosition` 控制按钮位置。

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  closeable: true,
  closeIconPosition: 'top-left' // 或 'top-right'
})
```

## 监听事件

通过回调函数监听预览事件。

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  onOpen: () => {
    console.log('预览已打开')
  },
  onClose: () => {
    console.log('预览已关闭')
  },
  onChange: (index) => {
    console.log('当前图片索引:', index)
  }
})
```

## 组件式调用

也可以通过组件的方式使用，并通过 ref 控制。

```html
<wd-image-preview ref="imagePreviewRef" :images="images" />
<wd-button @click="openPreview">预览</wd-button>
```

```typescript
import { ref } from 'vue'
import type { ImagePreviewInstance } from 'wot-design-uni'

const imagePreviewRef = ref<ImagePreviewInstance>()
const images = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])

function openPreview() {
  imagePreviewRef.value?.open()
}
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|------|------|------|--------|--------|----------|
| images | 图片 URL 数组 | `string[]` | - | `[]` | - |
| start-position | 起始位置索引 | `number` | - | `0` | - |
| show-index | 是否显示页码 | `boolean` | - | `true` | - |
| loop | 是否循环播放 | `boolean` | - | `true` | - |
| closeable | 是否显示关闭按钮 | `boolean` | - | `true` | - |
| close-icon | 关闭图标名称 | `string` | - | `close` | - |
| close-icon-position | 关闭图标位置 | `string` | `top-left` / `top-right` | `top-right` | - |
| max-zoom | 最大缩放比例 | `number` | - | `3` | - |
| min-zoom | 最小缩放比例 | `number` | - | `1/3` | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|----------|------|------|----------|
| open | 打开预览时触发 | - | - |
| close | 关闭预览时触发 | - | - |
| change | 切换图片时触发 | `{ index: number }` | - |
| long-press | 长按图片时触发 | `{ image: string }` | - |

## Methods

通过 ref 调用组件实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| open | 打开图片预览 | `options?: ImagePreviewOptions \| string[]` | - |
| close | 关闭图片预览 | - | - |
| setActive | 切换到指定图片 | `index: number` | - |

## useImagePreview

函数式调用返回的对象包含以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开图片预览 | `options: ImagePreviewOptions \| string[]` |
| close | 关闭图片预览 | - |

## ImagePreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| images | 图片 URL 数组 | `string[]` | `[]` |
| startPosition | 起始位置索引 | `number` | `0` |
| showIndex | 是否显示页码 | `boolean` | `true` |
| loop | 是否循环播放 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 关闭图标名称 | `string` | `close` |
| closeIconPosition | 关闭图标位置 | `string` | `top-right` |
| maxZoom | 最大缩放比例 | `number` | `3` |
| minZoom | 最小缩放比例 | `number` | `1/3` |
| onOpen | 打开时的回调 | `() => void` | - |
| onClose | 关闭时的回调 | `() => void` | - |
| onChange | 切换图片时的回调 | `(index: number) => void` | - |
| onLongPress | 长按图片时的回调 | `(image: string) => void` | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|------|------|----------|
| custom-class | 根节点样式类 | - |

## CSS 变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| --wot-image-preview-bg | 背景颜色 | `rgba(0, 0, 0, 0.9)` |
| --wot-image-preview-index-color | 页码颜色 | `#fff` |
| --wot-image-preview-index-font-size | 页码字号 | `15px` |
| --wot-image-preview-close-size | 关闭按钮尺寸 | `44px` |
| --wot-image-preview-close-margin | 关闭按钮边距 | `12px` |
