# ImagePreview Image Preview

Image preview component, supporting multi-image preview, swipe switching, and functional calls.

## Component Type

### useImagePreview

`useImagePreview` is used for functionally calling `wd-image-preview`. You need to declare a `wd-image-preview` instance in the page before calling.

### Basic Usage

Open image preview via functional call using `useImagePreview`.

```html
<wd-button @click="handlePreview">Preview Image</wd-button>
<wd-image-preview />
```

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage } = useImagePreview()

function handlePreview() {
  previewImage({
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ]
  })
}
```

### Pass Image Array

You can directly pass an array of image URLs for simplified calling.

```typescript
previewImage([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## Component Variants

### Specify Starting Position

Specify the starting position for preview via `startPosition` (starting from 0).

```typescript
previewImage({
  images: ['url1', 'url2', 'url3'],
  startPosition: 1 // Start preview from the second image
})
```

## Component Configuration

### Hide Page Number

Control whether to show page numbers via `showIndex` property.

```typescript
previewImage({
  images: ['url1', 'url2'],
  showIndex: false
})
```

### Hide Close Button

Control whether to show close button via `closeable`.

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeable: false
})
```

### Close Button Position

Control button position via `closeIconPosition`.

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeIconPosition: 'top-left' // or 'top-right'
})
```

### Disable Click to Close

Control whether to close when clicking image or mask via `closeOnClick`.

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeOnClick: false
})
```

### Disable Loop

Disable loop playback via `loop` property.

```typescript
previewImage({
  images: ['url1', 'url2'],
  loop: false
})
```

## Special Usage

### Listen to Events

Listen to preview events via callback functions.

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage, closeImagePreview } = useImagePreview()

previewImage({
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

function handleClose() {
  closeImagePreview()
}
```

### Use Slots

You can customize the indicator or bottom content through named slots. If there are multiple instances on the page, you need to distinguish them via `selector` and pass the same identifier in `useImagePreview(selector)`.

```html
<wd-button @click="handleSlotPreview">Custom Slot</wd-button>

<wd-image-preview selector="slot-preview">
  <!-- Custom Indicator -->
  <template #indicator="{ current, total }">
    <wd-swiper-nav :current="current" :total="total" type="dots-bar" custom-style="bottom: 64px;" />
  </template>
  <!-- Bottom Custom Content -->
  <template #default="{ current }">
    <view class="custom-bottom">
      <text class="custom-bottom__text">{{ imageDescriptions[current] }}</text>
    </view>
  </template>
</wd-image-preview>
```

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage } = useImagePreview('slot-preview')

const images = [
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg'
]

const imageDescriptions = ['Red Panda', 'Capybara']

function handleSlotPreview() {
  previewImage({
    images,
    showIndex: false // Hide default indicator
  })
}
```

### Component-based Usage

You can also use it as a component and control it via ref.

```html
<wd-image-preview ref="imagePreviewRef" :images="images" />
<wd-button @click="openPreview">Preview</wd-button>
```

```typescript
import { ref } from 'vue'
import type { ImagePreviewInstance } from '@wot-ui/ui'

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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| selector | Selector | `string` | - |
| images | Array of image URLs | `string[]` | `[]` |
| start-position | Starting position index | `number` | `0` |
| show-index | Whether to show page number | `boolean` | `true` |
| loop | Whether to loop playback | `boolean` | `true` |
| closeable | Whether to show close button | `boolean` | `true` |
| close-icon | Close icon name | `string` | `close` |
| close-icon-position | Close icon position, optional values are `top-left`, `top-right` | `string` | `top-right` |
| close-on-click | Whether to close when clicking image or mask | `boolean` | `true` |
| show-menu-by-longpress | Enable long-press to show QR code recognition menu | `boolean` | `true` |
| z-index | Z-index | `number` | `1000` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when preview opens | - |
| close | Triggered when preview closes | - |
| change | Triggered when switching images | `{ index: number }` |
| long-press | Triggered when long-pressing image | `{ image: string }` |

## Methods

Call component instance methods via ref.

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| open | Open image preview | `options?: ImagePreviewOptions \| string[]` | - |
| close | Close image preview | - | - |
| setActive | Switch to specified image | `index: number` | - |

## Slots

| name | Description |
| --- | --- |
| default | Bottom custom content, parameter is `{ current: number }` |
| indicator | Custom indicator, parameter is `{ current: number, total: number }` |

## External Style Classes

| Class Name | Description | Minimum Version |
|------|------|----------|
| custom-class | Root node style class | - |

## CSS Variables

| Variable Name | Description | Default Value |
|--------|------|--------|
| --wot-image-preview-bg | Background color | `rgba(0, 0, 0, 0.9)` |
| --wot-image-preview-index-color | Page number color | `#fff` |
| --wot-image-preview-index-font-size | Page number font size | `15px` |
| --wot-image-preview-close-size | Close button size | `44px` |
| --wot-image-preview-close-margin | Close button margin | `12px` |
