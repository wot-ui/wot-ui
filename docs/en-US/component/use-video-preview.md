# useVideoPreview

`useVideoPreview` is used to call `wd-video-preview` programmatically.

## Basic Usage

Declare `wd-video-preview` on the page first, then call `useVideoPreview()` to open the video preview.

```html
<wd-video-preview />
<wd-button @click="openPreview">Preview Video</wd-button>
```

```ts
import { useVideoPreview } from '@/uni_modules/wot-ui'

const { previewVideo } = useVideoPreview()

const openPreview = () => {
  previewVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    poster: 'https://wot-ui.cn/assets/panda.jpg',
    title: 'Video Preview'
  })
}
```

## Pass A Preview Object

You can pass a `PreviewVideo` object directly. The minimum required field is `url`.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4'
})
```

## Multiple Instances

Use `selector` to distinguish multiple instances on the same page. `useVideoPreview(selector)` will bind to the matching `wd-video-preview` instance.

```html
<wd-button @click="openMain">Default Instance</wd-button>
<wd-button @click="openSub">Named Instance</wd-button>

<wd-video-preview />
<wd-video-preview selector="sub-preview" />
```

```ts
import { useVideoPreview } from '@/uni_modules/wot-ui'

const { previewVideo } = useVideoPreview()
const { previewVideo: previewSubVideo } = useVideoPreview('sub-preview')

function openMain() {
  previewVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    title: 'Default Instance'
  })
}

function openSub() {
  previewSubVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    title: 'Named Instance'
  })
}
```

## Custom Options

Use `VideoPreviewOptions` to configure `zIndex`, `onOpen`, and `onClose` together.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview',
  zIndex: 1200,
  onOpen: () => {
    console.log('Preview opened')
  },
  onClose: () => {
    console.log('Preview closed')
  }
})
```

## API

### useVideoPreview

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| selector | Target video preview instance identifier. An empty string uses the default instance | string | `''` |

### Methods

The returned object from the composable contains the following methods:

| Method | Description | Parameters |
| --- | --- | --- |
| previewVideo | Open the video preview | <code>options: VideoPreviewOptions &#124; PreviewVideo</code> |
| closeVideoPreview | Close the video preview | - |

### VideoPreviewOptions

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| url | Video resource URL | `string` | `''` |
| poster | Video poster URL | `string` | `''` |
| title | Video title | `string` | `''` |
| show | Whether to display the preview layer | `boolean` | `false` |
| zIndex | zIndex layer value | `number` | `1000` |
| onOpen | Callback fired when opened | `() => void` | - |
| onClose | Callback fired when closed | `() => void` | - |