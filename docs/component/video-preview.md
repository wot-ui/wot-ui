# VideoPreview 视频预览

视频预览组件，支持通过组件实例或 `useVideoPreview` 函数式调用打开全屏视频预览层。`useVideoPreview` 的独立用法与 API 说明见 [useVideoPreview](/component/use-video-preview)。

::: warning 注意
使用 `useVideoPreview()` 前，需要先在当前页面中声明一个 `wd-video-preview` 实例，否则无法建立注入关系。
:::

## 组件类型

### useVideoPreview

`useVideoPreview` 是 `wd-video-preview` 的推荐调用方式，适合在按钮点击、列表项点击等交互中直接拉起视频预览。详细说明见 [useVideoPreview](/component/use-video-preview)。

### 基本用法

对应当前 demo 页的用法是在页面中放置一个 `wd-video-preview` 实例，再通过 `previewVideo()` 打开预览。

::: code-group

```html [vue]
<wd-button @click="open">点击预览视频</wd-button>

<wd-video-preview />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'
import type { PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const { previewVideo } = useVideoPreview()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览'
}

function open() {
  previewVideo(video)
}
```

:::

## 特殊样式

### 多实例调用

当同一页面存在多个 `wd-video-preview` 实例时，可通过 `selector` 区分，并在 `useVideoPreview(selector)` 中传入相同标识。

::: code-group

```html [vue]
<wd-button @click="openMain">打开主预览</wd-button>
<wd-button @click="openSub">打开次预览</wd-button>

<wd-video-preview />
<wd-video-preview selector="sub-preview" />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'

const { previewVideo: openMainPreview } = useVideoPreview()
const { previewVideo: openSubPreview } = useVideoPreview('sub-preview')
```

:::

### 自定义层级与回调

函数式调用时可直接传入 `zIndex`、`onOpen`、`onClose`，组件会优先采用函数式传入的配置。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览',
  zIndex: 1200,
  onOpen: () => console.log('打开预览'),
  onClose: () => console.log('关闭预览')
})
```

### 组件实例调用

如果更偏向组件式控制，也可以通过 `ref` 调用实例方法 `open` 和 `close`。

::: code-group

```html [vue]
<wd-video-preview ref="videoPreviewRef" />
<wd-button @click="openPreview">打开预览</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { VideoPreviewInstance, PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const videoPreviewRef = ref<VideoPreviewInstance>()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览'
}

function openPreview() {
  videoPreviewRef.value?.open(video)
}
```

:::

## VideoPreview Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 实例标识，用于区分多个视频预览实例 | `string` | `''` |
| z-index | 预览层级 | `number` | `1000` |
| on-open | 组件打开时的回调 | <code>() =&gt; void</code> | - |
| on-close | 组件关闭时的回调 | <code>() =&gt; void</code> | - |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

## VideoPreview Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开预览时触发 | - |
| close | 关闭预览时触发 | - |

## VideoPreview Methods

通过 `ref` 调用组件实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开视频预览 | `video: PreviewVideo` | - |
| close | 关闭视频预览 | - | - |

## useVideoPreview

`useVideoPreview` 的基础用法、多实例调用、方法与 `VideoPreviewOptions` 说明已单独整理到 [useVideoPreview](/component/use-video-preview)，组件文档这里不再重复展开。