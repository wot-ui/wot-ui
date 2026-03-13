# ImagePreview

Image preview component that supports multi-image preview, swipe switching, gesture zooming, and functional calls.

## Basic Usage

Open image preview using the `useImagePreview` function.

```html
<wd-button @click="handlePreview">Preview Images</wd-button>
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

## Specify Start Position

Use `startPosition` to specify the starting position (starting from 0).

```typescript
imagePreview.open({
  images: ['url1', 'url2', 'url3'],
  startPosition: 1 // Start from the second image
})
```

## Pass Image Array

You can directly pass an image URL array to simplify the call.

```typescript
imagePreview.open([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## Hide Index

Use the `showIndex` property to control whether to show the page index.

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  showIndex: false
})
```

## Close Button

Use `closeable` to control whether to show the close button, and `closeIconPosition` to control the button position.

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  closeable: true,
  closeIconPosition: 'top-left' // or 'top-right'
})
```

## Listen to Events

Use callback functions to listen to preview events.

```typescript
imagePreview.open({
  images: ['url1', 'url2'],
  onOpen: () => {
    console.log('Preview opened')
  },
  onClose: () => {
    console.log('Preview closed')
  },
  onChange: (index) => {
    console.log('Current image index:', index)
  }
})
```

## Component Usage

You can also use it as a component and control it via ref.

```html
<wd-image-preview ref="imagePreviewRef" :images="images" />
<wd-button @click="openPreview">Preview</wd-button>
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

| Parameter | Description | Type | Accepted Values | Default | Min Version |
|-----------|-------------|------|-----------------|---------|-------------|
| images | Image URL array | `string[]` | - | `[]` | - |
| start-position | Starting position index | `number` | - | `0` | - |
| show-index | Whether to show page index | `boolean` | - | `true` | - |
| loop | Whether to loop | `boolean` | - | `true` | - |
| closeable | Whether to show close button | `boolean` | - | `true` | - |
| close-icon | Close icon name | `string` | - | `close` | - |
| close-icon-position | Close icon position | `string` | `top-left` / `top-right` | `top-right` | - |
| max-zoom | Maximum zoom ratio | `number` | - | `3` | - |
| min-zoom | Minimum zoom ratio | `number` | - | `1/3` | - |

## Events

| Event Name | Description | Parameters | Min Version |
|------------|-------------|------------|-------------|
| open | Triggered when preview opens | - | - |
| close | Triggered when preview closes | - | - |
| change | Triggered when switching images | `{ index: number }` | - |
| long-press | Triggered when long pressing image | `{ image: string }` | - |

## Methods

Call component instance methods via ref.

| Method | Description | Parameters | Return |
|--------|-------------|------------|--------|
| open | Open image preview | `options?: ImagePreviewOptions \| string[]` | - |
| close | Close image preview | - | - |
| setActive | Switch to specified image | `index: number` | - |

## useImagePreview

The object returned by the functional call contains the following methods:

| Method | Description | Parameters |
|--------|-------------|------------|
| open | Open image preview | `options: ImagePreviewOptions \| string[]` |
| close | Close image preview | - |

## ImagePreviewOptions

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| images | Image URL array | `string[]` | `[]` |
| startPosition | Starting position index | `number` | `0` |
| showIndex | Whether to show page index | `boolean` | `true` |
| loop | Whether to loop | `boolean` | `true` |
| closeable | Whether to show close button | `boolean` | `true` |
| closeIcon | Close icon name | `string` | `close` |
| closeIconPosition | Close icon position | `string` | `top-right` |
| maxZoom | Maximum zoom ratio | `number` | `3` |
| minZoom | Minimum zoom ratio | `number` | `1/3` |
| onOpen | Callback when opened | `() => void` | - |
| onClose | Callback when closed | `() => void` | - |
| onChange | Callback when switching images | `(index: number) => void` | - |
| onLongPress | Callback when long pressing image | `(image: string) => void` | - |

## External Style Classes

| Class Name | Description | Min Version |
|------------|-------------|-------------|
| custom-class | Root node style class | - |

## CSS Variables

| Variable | Description | Default |
|----------|-------------|---------|
| --wot-image-preview-bg | Background color | `rgba(0, 0, 0, 0.9)` |
| --wot-image-preview-index-color | Index color | `#fff` |
| --wot-image-preview-index-font-size | Index font size | `15px` |
| --wot-image-preview-close-size | Close button size | `44px` |
| --wot-image-preview-close-margin | Close button margin | `12px` |
