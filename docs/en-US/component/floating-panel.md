# FloatingPanel Floating Panel

A panel floating at the bottom of the page. Users can drag the panel up and down to browse content, allowing access to more information without leaving the current view. Commonly used for map navigation.

## Component Type

### Basic Usage

The initial height of FloatingPanel takes the value of `anchors[0]`, which is `100px`. Users can drag to expand the panel to reach `60%` of the screen height.

::: code-group
```html [vue/html]
<wd-floating-panel>
  <wd-cell-group border>
    <wd-cell v-for="item in data" :key="item" :title="item" />
  </wd-cell-group>
</wd-floating-panel>
```
```ts [typescript]
import { ref } from 'vue'

const data = ref<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
```
:::

## Component Variants

### Custom Anchors

You can set the anchor positions of <b>FloatingPanel</b> via the `anchors` attribute, and control the current display height of the panel via `v-model:height`.

For example, to make the panel height dock at three positions: `100px`, `40%` of screen height, and `70%` of screen height:

::: code-group
```html [vue/html]
<wd-floating-panel v-model:height="height" :anchors="anchors" @heightChange="handleHeightChange">
  <view class="inner-content">Custom Anchors {{ anchors }} - {{ height.toFixed(0) }}</view>
</wd-floating-panel>
```
```ts [typescript]
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const height = ref<number>(0)
const windowHeight = ref<number>(0)
const anchors = ref<number[]>([])

const handleHeightChange = ({ height }: { height: number }) => {
  console.log(height)
}

onLoad(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
  anchors.value = [100, Math.round(0.4 * windowHeight.value), Math.round(0.7 * windowHeight.value)]
  height.value = anchors.value[1]
})
```
```css [css]
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```
:::

## Component State

### Header Drag Only

By default, both the header area and content area of <b>FloatingPanel</b> can be dragged. You can disable dragging of the content area via the `contentDraggable` attribute.

::: code-group
```html [vue/html]
<wd-floating-panel :content-draggable="false">
  <view class="inner-content">Content area cannot be dragged</view>
</wd-floating-panel>
```
```css [css]
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```
:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model:height | Current display height of the panel | `number` | `0` |
| anchors | Set custom anchors, unit `px` | `number[]` | `[100, windowHeight * 0.6]` |
| duration | Animation duration, unit `ms`. Set to `0` to disable animation | `number` | `300` |
| content-draggable | Allow dragging content container | `boolean` | `true` |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | `boolean` | `false` |
| show-scrollbar | Whether to enable scrollbar | `boolean` | `true` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

## Slots

| Name | Description |
| ---- | -------- |
| default | Default content area slot |

## Events

| Method Name | Description | Parameters |
| --- | --- | --- |
| heightChange | Triggered after panel display height changes and dragging ends | `{ height: number }` |
