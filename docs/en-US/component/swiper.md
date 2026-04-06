# Swiper

Used to create carousels, supporting horizontal and vertical sliding, custom indicators, image and video resource display, and title rendering based on object data.

::: danger Please Note
Embedded videos are only supported on H5, WeChat Mini Program, and DingTalk Mini Program. Other platforms do not support this feature. Please understand before using.
:::

## Component Types

### Dot Indicator

Basic carousel can display dot indicators through `indicator` configuration.

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

### Dots-Bar Indicator

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }"></wd-swiper>
```

### Fraction Indicator

```html
<wd-swiper
  :list="swiperList"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
></wd-swiper>
```

## Component Variants

### Manual Switching

Turn off `autoplay` and enable `showControls` to manually switch carousel items through control buttons.

```html
<wd-swiper
  :list="swiperList"
  :autoplay="false"
  v-model:current="current"
  :indicator="{ showControls: true }"
  :loop="false"
></wd-swiper>
```

### Vertical Direction

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

### Specifying value-key and text-key

When `list` is an object array, you can specify the image address field and title field through `value-key` and `text-key`.

::: code-group

```html [vue]
<wd-swiper value-key="url" text-key="title" :list="customSwiperList" autoplay v-model:current="current"></wd-swiper>
```

```ts [ts]
import { ref } from 'vue'

const current = ref(0)

const customSwiperList = ref([
  { url: 'https://wot-ui.cn/assets/redpanda.jpg', title: 'Red Panda' },
  { url: 'https://wot-ui.cn/assets/capybara.jpg', title: 'Capybara' },
  { url: 'https://wot-ui.cn/assets/panda.jpg', title: 'Giant Panda' },
  { url: 'https://wot-ui.cn/assets/moon.jpg', title: 'Poetic China' }
])
```

:::

## Component Styles

### Card Style

Set `previous-margin` and `next-margin`, combined with custom class names, to achieve card carousel style.

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

### Display 2 Items Simultaneously

Control the number of items displayed simultaneously through `display-multiple-items`.

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

### Custom Indicator

Fully customize indicator display through the `indicator` slot.

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

## Special Styles

### Video Carousel

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

### Manual Video Playback

```html
<wd-swiper
  :list="videoList"
  autoplay
  :autoplay-video="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

### Stop Carousel When Playing Video

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

### Attribute Controlled Switching

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

### Slot Usage

Customize carousel item content through the default slot.

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }">
  <template #default="{ item }">
    <image :src="item as string" mode="aspectFill" style="width: 100%; height: 100%" />
  </template>
</wd-swiper>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| autoplay | Whether to auto-play | `boolean` | `true` |
| v-model:current | Current carousel item index | `number` | `0` |
| direction | Carousel direction, optional values are `horizontal`, `vertical` | `DirectionType` | `horizontal` |
| display-multiple-items | Number of items displayed simultaneously | `number` | `1` |
| duration | Slide animation duration, unit is `ms` | `number` | `300` |
| easing-function | Transition easing animation type, optional values are `default`, `linear`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic` | `EasingType` | `default` |
| height | Carousel height | <code>string &#124; number</code> | `192` |
| interval | Auto-play interval time, unit is `ms` | `number` | `5000` |
| list | Carousel data list, supports string array or object array | <code>string[] &#124; SwiperItem[]</code> | `[]` |
| loop | Whether to loop playback | `boolean` | `true` |
| video-loop | Whether video loops playback | `boolean` | `true` |
| muted | Whether video plays muted | `boolean` | `true` |
| next-margin | Rear margin | <code>string &#124; number</code> | `0` |
| indicator-position | Indicator position, optional values are `left`, `top-left`, `top`, `top-right`, `bottom-left`, `bottom`, `bottom-right`, `right` | `IndicatorPositionType` | `bottom` |
| previous-margin | Front margin | <code>string &#124; number</code> | `0` |
| radius | Carousel border radius | <code>string &#124; number</code> | - |
| snap-to-edge | Whether to apply margin to first and last elements | `boolean` | `false` |
| indicator | Indicator configuration, pass `false` to hide indicator | <code>boolean &#124; Partial&lt;SwiperIndicatorProps&gt;</code> | `true` |
| image-mode | Image cropping mode, refer to uni-app Image component `mode` | `ImageMode` | `aspectFill` |
| show-menu-by-longpress | Whether to enable long-press image to show QR code recognition menu | `boolean` | `false` |
| value-key | Image address field name in option objects | `string` | `value` |
| text-key | Title field name in option objects | `string` | `text` |
| autoplay-video | Whether video auto-plays | `boolean` | `true` |
| stop-previous-video | Whether to stop previous video playback when switching carousel items | `boolean` | `true` |
| stop-autoplay-when-video-play | Whether to stop auto-play when video is playing | `boolean` | `false` |
| adjust-height | Automatically adjust container height based on item height, optional values are `first`, `current`, `highest`, `none`, only supported on Alipay Mini Program | `AdjustHeightType` | `highest` |
| adjust-vertical-height | Force `adjust-height` to take effect when `vertical` is `true`, only supported on Alipay Mini Program | `boolean` | `false` |
| custom-indicator-class | Custom indicator class name | `string` | `''` |
| custom-image-class | Custom image class name | `string` | `''` |
| custom-prev-image-class | Custom previous image class name | `string` | `''` |
| custom-next-image-class | Custom next image class name | `string` | `''` |
| custom-item-class | Custom carousel item class name | `string` | `''` |
| custom-prev-class | Custom previous carousel item class name | `string` | `''` |
| custom-next-class | Custom next carousel item class name | `string` | `''` |
| custom-text-class | Custom title class name | `string` | `''` |
| custom-text-style | Custom title style | `string` | `''` |
| custom-class | Root node custom style class | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking carousel item | <code>{ index: number; item: SwiperItem &#124; string }</code> |
| change | Triggered when carousel switches | <code>{ current: number; source: string }</code> |
| animationfinish | Triggered when carousel animation ends | <code>{ current: number; source: string }</code> |
| update:current | Triggered when current carousel item updates | `number` |

## Slots

| Name | Description |
| --- | --- |
| default | Custom carousel item content, parameters are <code>{ item, index }</code> |
| indicator | Custom indicator content, parameters are <code>{ current, total }</code> |

## Type Definitions

### DirectionType

Carousel direction, optional values are `horizontal`, `vertical`.

### EasingType

Transition easing animation type, optional values are `default`, `linear`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`.

### IndicatorPositionType

Indicator position, optional values are `left`, `top-left`, `top`, `top-right`, `bottom-left`, `bottom`, `bottom-right`, `right`.

### AdjustHeightType

Auto height strategy, optional values are `first`, `current`, `highest`, `none`.

### SwiperIndicatorType

Indicator type, optional values are `dots`, `dots-bar`, `fraction`.

### SwiperItem

Carousel item object configuration, supports extended fields.

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value | Image or video address | `string` | - |
| poster | Video cover address | `string` | - |
| type | Resource type, optional values are `image`, `video` | `SwiperItemType` | - |

### SwiperIndicator Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| current | Current carousel item index | `number` | `0` |
| direction | Carousel direction, optional values are `horizontal`, `vertical` | `DirectionType` | `horizontal` |
| min-show-num | Do not show navigator when less than this number | `number` | `2` |
| indicator-position | Indicator position, optional values are `left`, `top-left`, `top`, `top-right`, `bottom-left`, `bottom`, `bottom-right`, `right` | `IndicatorPositionType` | `bottom` |
| show-controls | Whether to show control buttons on both sides | `boolean` | `false` |
| total | Total number of carousel items | `number` | `0` |
| type | Indicator type, optional values are `dots`, `dots-bar`, `fraction` | `SwiperIndicatorType` | `dots` |
