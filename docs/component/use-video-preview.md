# useVideoPreview

`useVideoPreview` 用于函数式调用 `wd-video-preview`。

## 基础用法

页面中先声明 `wd-video-preview`，再通过 `useVideoPreview()` 打开视频预览。

```html
<wd-video-preview />
<wd-button @click="openPreview">预览视频</wd-button>
```

```ts
import { useVideoPreview } from '@/uni_modules/wot-ui'

const { previewVideo } = useVideoPreview()

const openPreview = () => {
  previewVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    poster: 'https://wot-ui.cn/assets/panda.jpg',
    title: '视频预览'
  })
}
```

## 传入预览对象

可以直接传入 `PreviewVideo` 对象，最简配置只需要提供 `url`。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4'
})
```

## 多实例调用

通过 `selector` 区分页面内多个实例，`useVideoPreview(selector)` 会绑定到指定实例。`selector` 的值需要与 `wd-video-preview` 组件上的 `selector` 属性保持一致。

```html
<wd-button @click="openMain">默认实例</wd-button>
<wd-button @click="openSub">指定实例</wd-button>

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
    title: '默认实例'
  })
}

function openSub() {
  previewSubVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    title: '指定实例'
  })
}
```

## 自定义配置

通过 `VideoPreviewOptions` 可同时配置层级与打开、关闭回调。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览',
  zIndex: 1200,
  onOpen: () => {
    console.log('打开预览')
  },
  onClose: () => {
    console.log('关闭预览')
  }
})
```

## API

### useVideoPreview

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定视频预览实例标识，传空字符串时使用默认实例 | string | `''` |

### Methods

函数式调用返回的对象包含以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| previewVideo | 打开视频预览 | <code>options: VideoPreviewOptions &#124; PreviewVideo</code> |
| closeVideoPreview | 关闭视频预览 | - |

### VideoPreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 视频资源地址 | `string` | `''` |
| poster | 视频封面地址 | `string` | `''` |
| title | 视频标题 | `string` | `''` |
| show | 是否显示预览层 | `boolean` | `false` |
| zIndex | zIndex 层级 | `number` | `1000` |
| onOpen | 打开时的回调 | `() => void` | - |
| onClose | 关闭时的回调 | `() => void` | - |