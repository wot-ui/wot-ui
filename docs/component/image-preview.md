# ImagePreview 图片预览

图片预览组件，支持多图预览、滑动切换和函数式调用。

## 组件类型

### useImagePreview

`useImagePreview` 用于函数式调用 `wd-image-preview`。调用前需要先在页面中声明一个 `wd-image-preview` 实例。

### 基本用法

通过 `useImagePreview` 函数式调用打开图片预览。

```html
<wd-button @click="handlePreview">预览图片</wd-button>
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

### 传入图片数组

可以直接传入图片 URL 数组，简化调用方式。

```typescript
previewImage([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## 组件变体

### 指定起始位置

通过 `startPosition` 指定预览时的起始位置（从 0 开始）。

```typescript
previewImage({
  images: ['url1', 'url2', 'url3'],
  startPosition: 1 // 从第二张图片开始预览
})
```

## 组件配置

### 隐藏页码

通过 `showIndex` 属性控制是否显示页码。

```typescript
previewImage({
  images: ['url1', 'url2'],
  showIndex: false
})
```

### 隐藏关闭按钮

通过 `closeable` 控制是否显示关闭按钮。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeable: false
})
```

### 关闭按钮位置

通过 `closeIconPosition` 控制按钮位置。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeIconPosition: 'top-left' // 或 'top-right'
})
```

### 禁用点击关闭

通过 `closeOnClick` 控制是否点击图片或遮罩时关闭。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeOnClick: false
})
```

### 禁用循环

通过 `loop` 属性禁用循环播放。

```typescript
previewImage({
  images: ['url1', 'url2'],
  loop: false
})
```

## 特殊用法

### 监听事件

通过回调函数监听预览事件。

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage, closeImagePreview } = useImagePreview()

previewImage({
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

function handleClose() {
  closeImagePreview()
}
```

### 使用插槽

可以通过具名插槽自定义指示器或底部内容。若页面中存在多个实例，需要通过 `selector` 区分，并在 `useImagePreview(selector)` 中传入相同标识。

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
import { useImagePreview } from '@wot-ui/ui'

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

### 组件式调用

也可以通过组件的方式使用，并通过 ref 控制。

```html
<wd-image-preview ref="imagePreviewRef" :images="images" />
<wd-button @click="openPreview">预览</wd-button>
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 选择器 | `string` | - |
| images | 图片 URL 数组 | `string[]` | `[]` |
| start-position | 起始位置索引 | `number` | `0` |
| show-index | 是否显示页码 | `boolean` | `true` |
| loop | 是否循环播放 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `true` |
| close-icon | 关闭图标名称 | `string` | `close` |
| close-icon-position | 关闭图标位置，可选值为 `top-left`、`top-right` | `string` | `top-right` |
| close-on-click | 是否点击图片或遮罩时关闭 | `boolean` | `true` |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单 | `boolean` | `true` |
| z-index | 层级 | `number` | `1000` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开预览时触发 | - |
| close | 关闭预览时触发 | - |
| change | 切换图片时触发 | `{ index: number }` |
| long-press | 长按图片时触发 | `{ image: string }` |

## Methods

通过 ref 调用组件实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开图片预览 | `options?: ImagePreviewOptions \| string[]` | - |
| close | 关闭图片预览 | - | - |
| setActive | 切换到指定图片 | `index: number` | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 底部自定义内容，参数为 `{ current: number }` |
| indicator | 自定义指示器，参数为 `{ current: number, total: number }` |

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
