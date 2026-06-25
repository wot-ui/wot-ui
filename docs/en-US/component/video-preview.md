# VideoPreview

Video preview component, supports opening full-screen video preview layer through component instance or `useVideoPreview` function call. For standalone usage and API details of `useVideoPreview`, see [useVideoPreview](/component/use-video-preview).

::: warning Note
Before using `useVideoPreview()`, you need to declare a `wd-video-preview` instance in the current page, otherwise the injection relationship cannot be established.
:::

## Component Types

### useVideoPreview

`useVideoPreview` is the recommended way to call `wd-video-preview`, suitable for directly launching video preview in interactions like button clicks, list item clicks. For detailed instructions, see [useVideoPreview](/component/use-video-preview).

### Basic Usage

The usage corresponding to the current demo page is to place a `wd-video-preview` instance in the page, and then open the preview through `previewVideo()`.

::: code-group

```html [vue]
<wd-button @click="open">Click to preview video</wd-button>

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

## Special Styles

### Multi-instance Calls

When multiple `wd-video-preview` instances exist on the same page, you can distinguish them through `selector`, and pass the same identifier in `useVideoPreview(selector)`.

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

### Custom Z-index and Callbacks

When calling functionally, you can directly pass `zIndex`, `closePosition`, `onOpen`, `onClose`, and the component will prioritize configurations passed functionally.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: 'Video Preview',
  zIndex: 1200,
  closePosition: 'right-top',
  onOpen: () => console.log('Open preview'),
  onClose: () => console.log('Close preview')
})
```

### Fullscreen Preview

Use `full-screen` to make the video area fill the preview layer, which is suitable for portrait videos.

```html
<wd-video-preview full-screen />
```

When using programmatic calls, you can also pass `fullScreen` to `previewVideo`.

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  title: 'Fullscreen Video',
  fullScreen: true
})
```

### Component Instance Calls

If you prefer component-style control, you can also call instance methods `open` and `close` through `ref`.

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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| selector | Instance identifier, used to distinguish multiple video preview instances | `string` | `''` |
| z-index | Preview z-index | `number` | `1000` |
| full-screen | Whether to use fullscreen preview | `boolean` | `false` |
| close-position | Close button position, optional values are `left-top` and `right-top` | `string` | `left-top` |
| on-open | Callback when component opens | <code>() =&gt; void</code> | - |
| on-close | Callback when component closes | <code>() =&gt; void</code> | - |
| custom-style | Custom root node style | `string` | `''` |
| custom-class | Custom root node style class | `string` | `''` |

## VideoPreview Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when opening preview | - |
| close | Triggered when closing preview | - |

## VideoPreview Methods

Call component instance methods through `ref`.

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| open | Open video preview | `video: VideoPreviewOptions` | - |
| close | Close video preview | - | - |

## useVideoPreview

The basic usage, multi-instance calls, methods, and `VideoPreviewOptions` descriptions of `useVideoPreview` have been separately organized to [useVideoPreview](/component/use-video-preview), and will not be repeated here in the component documentation.
