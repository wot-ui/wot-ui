# Swiper 轮播

用于创建轮播，支持水平和垂直方向滑动、自定义指示器、图片和视频资源展示，以及基于对象数据渲染标题。

::: danger 请注意
嵌入视频仅在 H5、微信小程序和钉钉小程序支持，其余端不支持，请了解后使用。
:::

## 组件类型

### 点状指示器

基础轮播可通过 `indicator` 配置展示点状指示器。

::: code-group

```html [vue]
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots' }"></wd-swiper>
```

```ts [ts]
import { ref } from 'vue'

const current = ref(0)

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg'
])
```

:::

### 点条状指示器

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }"></wd-swiper>
```

### 数字指示器

```html
<wd-swiper
  :list="swiperList"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
></wd-swiper>
```

## 组件变体

### 手动切换

关闭 `autoplay` 并开启 `showControls` 后，可通过控制按钮手动切换轮播项。

```html
<wd-swiper
  :list="swiperList"
  :autoplay="false"
  v-model:current="current"
  :indicator="{ showControls: true }"
  :loop="false"
></wd-swiper>
```

### 垂直方向

```html
<wd-swiper
  :list="swiperList"
  direction="vertical"
  indicator-position="right"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'dots-bar' }"
></wd-swiper>
```

### 指定 value-key 和 text-key

当 `list` 为对象数组时，可通过 `value-key` 和 `text-key` 指定图片地址字段与标题字段。

::: code-group

```html [vue]
<wd-swiper value-key="url" text-key="title" :list="customSwiperList" autoplay v-model:current="current"></wd-swiper>
```

```ts [ts]
import { ref } from 'vue'

const current = ref(0)

const customSwiperList = ref([
  { url: 'https://wot-ui.cn/assets/redpanda.jpg', title: '小熊猫' },
  { url: 'https://wot-ui.cn/assets/capybara.jpg', title: '卡皮巴拉' },
  { url: 'https://wot-ui.cn/assets/panda.jpg', title: '大熊猫' },
  { url: 'https://wot-ui.cn/assets/moon.jpg', title: '诗画中国' }
])
```

:::

## 组件样式

### 卡片样式

设置 `previous-margin` 和 `next-margin`，并结合自定义类名，可以实现卡片轮播样式。

```html
<view class="card-swiper">
  <wd-swiper
    autoplay
    v-model:current="current"
    :indicator="{ type: 'dots' }"
    :list="swiperList"
    previous-margin="24px"
    next-margin="24px"
    custom-indicator-class="custom-indicator-class"
    custom-image-class="custom-image"
    custom-next-image-class="custom-image-prev"
    custom-prev-image-class="custom-image-prev"
  ></wd-swiper>
</view>
```

```scss
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;

  :deep(.custom-indicator-class) {
    bottom: -16px;
  }

  :deep(.custom-image) {
    border-radius: 12rpx;
  }

  :deep(.custom-image-prev) {
    height: 168px !important;
  }
}
```

### 同时展示 2 个滑块

通过 `display-multiple-items` 控制同时展示的滑块数量。

```html
<wd-swiper
  autoplay
  v-model:current="current"
  :display-multiple-items="2"
  :indicator="{ type: 'dots' }"
  :list="swiperList"
  previous-margin="24px"
  next-margin="24px"
></wd-swiper>
```

### 自定义指示器

通过 `indicator` 插槽可以完全自定义指示器展示。

```html
<wd-swiper :list="swiperList" direction="vertical" indicator-position="right" autoplay v-model:current="current">
  <template #indicator="{ current, total }">
    <view class="custom-indicator">{{ current + 1 }}/{{ total }}</view>
  </template>
</wd-swiper>
```

```scss
.custom-indicator {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  padding: 0 12rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 24rpx;
}
```

## 特殊样式

### 视频轮播

```html
<wd-swiper :list="videoList" autoplay :indicator="{ type: 'fraction' }" indicator-position="top-right"></wd-swiper>
```

```ts
import { ref } from 'vue'

const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://wot-ui.cn/assets/moon.jpg'
])
```

### 手动播放视频

```html
<wd-swiper
  :list="videoList"
  autoplay
  :autoplay-video="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

### 播放视频时停止轮播

```html
<wd-swiper
  :list="videoList"
  autoplay
  stop-autoplay-when-video-play
  :autoplay-video="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

### 属性控制切换

```html
<wd-swiper :loop="isLoop" :autoplay="false" :list="swiperList" v-model:current="current" />
<wd-gap />
<wd-cell-group>
  <wd-cell title="loop">
    <wd-switch v-model="isLoop" size="24px" />
  </wd-cell>
  <wd-cell title="current" :value="current.toString()" />
</wd-cell-group>
<view style="display: flex; justify-content: space-between">
  <wd-button @click="current--">prev</wd-button>
  <wd-button type="success" @click="current++">next</wd-button>
</view>
```

### 插槽用法

通过默认插槽可以自定义轮播项内容。

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }">
  <template #default="{ item }">
    <image :src="item as string" mode="aspectFill" style="width: 100%; height: 100%" />
  </template>
</wd-swiper>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 是否自动播放 | `boolean` | `true` |
| v-model:current | 当前轮播项索引 | `number` | `0` |
| direction | 轮播方向，可选值为 `horizontal`、`vertical` | `DirectionType` | `horizontal` |
| display-multiple-items | 同时显示的滑块数量 | `number` | `1` |
| duration | 滑动动画时长，单位为 `ms` | `number` | `300` |
| easing-function | 切换缓动动画类型，可选值为 `default`、`linear`、`easeInCubic`、`easeOutCubic`、`easeInOutCubic` | `EasingType` | `default` |
| height | 轮播高度 | <code>string &#124; number</code> | `192` |
| interval | 自动轮播间隔时间，单位为 `ms` | `number` | `5000` |
| list | 轮播数据列表，支持字符串数组或对象数组 | <code>string[] &#124; SwiperItem[]</code> | `[]` |
| loop | 是否循环播放 | `boolean` | `true` |
| video-loop | 视频是否循环播放 | `boolean` | `true` |
| muted | 视频是否静音播放 | `boolean` | `true` |
| next-margin | 后边距 | <code>string &#124; number</code> | `0` |
| indicator-position | 指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right` | `IndicatorPositionType` | `bottom` |
| previous-margin | 前边距 | <code>string &#124; number</code> | `0` |
| radius | 轮播圆角 | <code>string &#124; number</code> | - |
| snap-to-edge | 是否将边距应用到首尾元素 | `boolean` | `false` |
| indicator | 指示器配置，传入 `false` 时隐藏指示器 | <code>boolean &#124; Partial&lt;SwiperIndicatorProps&gt;</code> | `true` |
| image-mode | 图片裁剪模式，取值参考 uni-app Image 组件 `mode` | `ImageMode` | `aspectFill` |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单 | `boolean` | `false` |
| value-key | 选项对象中图片地址字段名 | `string` | `value` |
| text-key | 选项对象中标题字段名 | `string` | `text` |
| autoplay-video | 视频是否自动播放 | `boolean` | `true` |
| stop-previous-video | 切换轮播项时是否停止上一个视频播放 | `boolean` | `true` |
| stop-autoplay-when-video-play | 视频播放时是否停止自动轮播 | `boolean` | `false` |
| adjust-height | 自动根据滑块高度调整容器高度，可选值为 `first`、`current`、`highest`、`none`，仅支付宝小程序支持 | `AdjustHeightType` | `highest` |
| adjust-vertical-height | `vertical` 为 `true` 时强制让 `adjust-height` 生效，仅支付宝小程序支持 | `boolean` | `false` |
| custom-indicator-class | 自定义指示器类名 | `string` | `''` |
| custom-image-class | 自定义图片类名 | `string` | `''` |
| custom-prev-image-class | 自定义前一个图片类名 | `string` | `''` |
| custom-next-image-class | 自定义后一个图片类名 | `string` | `''` |
| custom-item-class | 自定义轮播项类名 | `string` | `''` |
| custom-prev-class | 自定义前一个轮播项类名 | `string` | `''` |
| custom-next-class | 自定义后一个轮播项类名 | `string` | `''` |
| custom-text-class | 自定义标题类名 | `string` | `''` |
| custom-text-style | 自定义标题样式 | `string` | `''` |
| custom-class | 根节点自定义样式类 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击轮播项时触发 | <code>{ index: number; item: SwiperItem &#124; string }</code> |
| change | 轮播切换时触发 | <code>{ current: number; source: string }</code> |
| animationfinish | 轮播动画结束时触发 | <code>{ current: number; source: string }</code> |
| update:current | 当前轮播项更新时触发 | `number` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义轮播项内容，参数为 <code>{ item, index }</code> |
| indicator | 自定义指示器内容，参数为 <code>{ current, total }</code> |

## 类型定义

### DirectionType

轮播方向，可选值为 `horizontal`、`vertical`。

### EasingType

切换缓动动画类型，可选值为 `default`、`linear`、`easeInCubic`、`easeOutCubic`、`easeInOutCubic`。

### IndicatorPositionType

指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right`。

### AdjustHeightType

自动高度策略，可选值为 `first`、`current`、`highest`、`none`。

### SwiperIndicatorType

指示器类型，可选值为 `dots`、`dots-bar`、`fraction`。

### SwiperItem

轮播项对象配置，支持扩展字段。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 图片或视频地址 | `string` | - |
| poster | 视频封面地址 | `string` | - |
| type | 资源类型，可选值为 `image`、`video` | `SwiperItemType` | - |

### SwiperIndicator Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前轮播项索引 | `number` | `0` |
| direction | 轮播方向，可选值为 `horizontal`、`vertical` | `DirectionType` | `horizontal` |
| min-show-num | 小于该数量时不显示导航器 | `number` | `2` |
| indicator-position | 指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right` | `IndicatorPositionType` | `bottom` |
| show-controls | 是否显示两侧控制按钮 | `boolean` | `false` |
| total | 轮播项总数 | `number` | `0` |
| type | 指示器类型，可选值为 `dots`、`dots-bar`、`fraction` | `SwiperIndicatorType` | `dots` |