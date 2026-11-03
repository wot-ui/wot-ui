# useVideoPreview

`useVideoPreview` is used to programmatically call `wd-video-preview`.

## Basic Usage

First declare `wd-video-preview` in the page, then open video preview via `useVideoPreview()`.

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

## Pass Preview Object

You can directly pass a `PreviewVideo` object, with the simplest configuration requiring only the `url`.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4'
})
```

## Multiple Instance Calls

Use `selector` to distinguish between multiple instances on the page. `useVideoPreview(selector)` will bind to the specified instance. The `selector` value must match the `selector` attribute on the `wd-video-preview` component.

```html
<wd-button @click="openMain">Default Instance</wd-button>
<wd-button @click="openSub">Specified Instance</wd-button>

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
    title: 'Specified Instance'
  })
}
```

## Custom Configuration

Use `VideoPreviewOptions` to configure z-index, fullscreen preview, close button position, and open/close callbacks simultaneously.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview',
  zIndex: 1200,
  fullScreen: true,
  closePosition: 'right-top',
  onOpen: () => {
    console.log('Open preview')
  },
  onClose: () => {
    console.log('Close preview')
  }
})
```

## API

### useVideoPreview

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| selector | Specifies the video preview instance identifier, uses default instance when empty string | string | `''` |

### Methods

The object returned by the programmatic call contains the following methods:

| Method Name | Description | Parameters |
| --- | --- | --- |
| previewVideo | Open video preview | <code>options: VideoPreviewOptions &#124; PreviewVideo</code> |
| closeVideoPreview | Close video preview | - |

### VideoPreviewOptions

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| url | Video resource address | `string` | `''` |
| poster | Video cover address | `string` | `''` |
| title | Video title | `string` | `''` |
| show | Whether to show preview layer | `boolean` | `false` |
| zIndex | zIndex level | `number` | `1000` |
| fullScreen | Whether to use fullscreen preview | `boolean` | `false` |
| showFullscreenBtn | Whether to show the native fullscreen button | `boolean` | `true` |
| closePosition | Close button position, optional values are `left-top` and `right-top` | `string` | `left-top` |
| onOpen | Callback when opening | `() => void` | - |
| onClose | Callback when closing | `() => void` | - |
