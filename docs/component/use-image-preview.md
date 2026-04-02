# useImagePreview

`useImagePreview` 用于函数式调用 `wd-image-preview`。

## 基础用法

页面中先声明 `wd-image-preview`，再通过 `useImagePreview()` 打开图片预览。

```html
<wd-image-preview />
<wd-button @click="openPreview">预览图片</wd-button>
```

```ts
import { useImagePreview } from '@/uni_modules/wot-ui'

const { previewImage } = useImagePreview()

const openPreview = () => {
  previewImage({
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    startPosition: 0
  })
}
```

## 传入图片数组

可以直接传入图片 URL 数组，简化调用方式。

```typescript
previewImage([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## 多实例调用

通过 `selector` 区分页面内多个实例，`useImagePreview(selector)` 会绑定到指定实例。`selector` 的值需要与 `wd-image-preview` 组件上的 `selector` 属性保持一致。

```html
<wd-button @click="handleSlotPreview">自定义插槽</wd-button>

<wd-image-preview selector="slot-preview">
  <!-- 自定义指示器 -->
  <template #indicator="{ current, total }">
    <wd-swiper-nav :current="current" :total="total" type="dots-bar" custom-style="bottom: 64px;" />
  </template>
  <!-- 底部自定义内容 -->
  <template #default="{ current }">
    <view class="custom-bottom">
      <text class="custom-bottom__text">{{ imageDescriptions[current] }}</text>
    </view>
  </template>
</wd-image-preview>
```

```typescript
import { useImagePreview } from '@/uni_modules/wot-ui'

const { previewImage } = useImagePreview('slot-preview')

const images = [
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg'
]

const imageDescriptions = ['小熊猫', '水豚']

function handleSlotPreview() {
  previewImage({
    images,
    showIndex: false // 隐藏默认指示器
  })
}
```

## API

### useImagePreview

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定图片预览实例标识，传空字符串时使用默认实例 | string | `''` |

### Methods

函数式调用返回的对象包含以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| previewImage | 打开图片预览 | `options: ImagePreviewOptions` \| `string[]` |
| closeImagePreview | 关闭图片预览 | - |

### ImagePreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 图片 URL 数组 | `string[]` | `[]` |
| startPosition | 起始位置索引 | `number` | `0` |
| showIndex | 是否显示页码 | `boolean` | `true` |
| loop | 是否循环播放 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 关闭图标名称 | `string` | `close` |
| closeIconPosition | 关闭图标位置，可选值为 `top-left`、`top-right` | `string` | `top-right` |
| closeOnClick | 是否点击图片或遮罩时关闭 | `boolean` | `true` |
| showMenuByLongpress | 开启长按图片显示识别小程序码菜单 | `boolean` | `true` |
| zIndex | zIndex 层级 | `number` | `1000` |
| onOpen | 打开时的回调 | `() => void` | - |
| onClose | 关闭时的回调 | `() => void` | - |
| onChange | 切换图片时的回调 | `(index: number) => void` | - |
| onLongPress | 长按图片时的回调 | `(image: string) => void` | - |
