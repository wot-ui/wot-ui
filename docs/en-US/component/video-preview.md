# VideoPreview

Video preview component that supports opening a fullscreen preview layer either through component instance methods or the `useVideoPreview` composable.

::: warning Notice
Before calling `useVideoPreview()`, you need to declare a `wd-video-preview` instance on the current page so the injection relationship can be established.
:::

## Type

### useVideoPreview

`useVideoPreview` is the recommended way to trigger `wd-video-preview`, especially for interactions such as button clicks or list item previews.

### Basic Usage

The current demo places a `wd-video-preview` instance on the page and opens the preview through `previewVideo()`.

::: code-group

```html [vue]
<wd-button @click="open">Preview Video</wd-button>

<wd-video-preview />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'
import type { PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const { previewVideo } = useVideoPreview()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview'
}

function open() {
  previewVideo(video)
}
```

:::

## Special Style

### Multiple Instances

If there are multiple `wd-video-preview` instances on the same page, you can distinguish them with `selector` and pass the same identifier to `useVideoPreview(selector)`.

::: code-group

```html [vue]
<wd-button @click="openMain">Open Main Preview</wd-button>
<wd-button @click="openSub">Open Secondary Preview</wd-button>

<wd-video-preview />
<wd-video-preview selector="sub-preview" />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'

const { previewVideo: openMainPreview } = useVideoPreview()
const { previewVideo: openSubPreview } = useVideoPreview('sub-preview')
```

:::

### Custom zIndex And Callbacks

When using the composable API, you can pass `zIndex`, `onOpen`, and `onClose` directly. Function call options take priority over component props.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview',
  zIndex: 1200,
  onOpen: () => console.log('Preview opened'),
  onClose: () => console.log('Preview closed')
})
```

### Component Instance Usage

You can also control the component directly through `ref` and call the exposed `open` and `close` methods.

::: code-group

```html [vue]
<wd-video-preview ref="videoPreviewRef" />
<wd-button @click="openPreview">Open Preview</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { VideoPreviewInstance, PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const videoPreviewRef = ref<VideoPreviewInstance>()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview'
}

function openPreview() {
  videoPreviewRef.value?.open(video)
}
```

:::

## VideoPreview Attributes

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| selector | Instance identifier used to distinguish multiple video preview instances | `string` | `''` |
| z-index | Preview layer z-index | `number` | `1000` |
| on-open | Callback fired when the component opens | <code>() =&gt; void</code> | - |
| on-close | Callback fired when the component closes | <code>() =&gt; void</code> | - |
| custom-style | Custom root style | `string` | `''` |
| custom-class | Custom root class | `string` | `''` |

## VideoPreview Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when the preview opens | - |
| close | Triggered when the preview closes | - |

## VideoPreview Methods

Methods exposed through `ref`.

| Method | Description | Parameters | Return |
| --- | --- | --- | --- |
| open | Open the video preview | `video: PreviewVideo` | - |
| close | Close the video preview | - | - |

## useVideoPreview

### API

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| selector | Target video preview instance identifier. An empty string uses the default instance | `string` | `''` |

### Methods

| Method | Description | Parameters |
| --- | --- | --- |
| previewVideo | Open the video preview | <code>options: VideoPreviewOptions &#124; PreviewVideo</code> |
| closeVideoPreview | Close the video preview | - |

## VideoPreviewOptions

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| url | Video resource URL | `string` | `''` |
| poster | Video poster URL | `string` | `''` |
| title | Video title | `string` | `''` |
| show | Whether to display the preview layer | `boolean` | `false` |
| zIndex | Preview layer z-index | `number` | `1000` |
| onOpen | Callback fired when opened | <code>() =&gt; void</code> | - |
| onClose | Callback fired when closed | <code>() =&gt; void</code> | - |