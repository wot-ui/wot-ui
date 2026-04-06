# FloatingPanel 浮动面板

浮动在页面底部的面板，用户可以通过上下拖动秒板来浏览内容，从而在不离开当前视图的情况下访问更多信息，常用于地图导航。

## 组件类型

### 基础用法

FloatingPanel 的初始高度会取 `anchors[0]` 的值，也就是 `100px`，用户可以拖动来展开面板，使高度达到 `60%` 的屏幕高度。

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

## 组件变体

### 自定义锚点

你可以通过 `anchors` 属性来设置 <b>FloatingPanel</b> 的锚点位置，并通过 `v-model:height` 来控制当前面板的显示高度。

比如，使面板的高度在 `100px`、`40%` 屏幕高度和 `70%` 屏幕高度三个位置停靠：

::: code-group
```html [vue/html]
<wd-floating-panel v-model:height="height" :anchors="anchors" @heightChange="handleHeightChange">
  <view class="inner-content">自定义锚点 {{ anchors }} - {{ height.toFixed(0) }}</view>
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

## 组件状态

### 仅头部拖拽

默认情况下，<b>FloatingPanel</b> 的头部区域和内容区域都可以被拖拽，你可以通过 `contentDraggable` 属性来禁用内容区域的拖拽。

::: code-group
```html [vue/html]
<wd-floating-panel :content-draggable="false">
  <view class="inner-content">内容区不可以拖拽</view>
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:height | 当前面板的显示高度 | `number` | `0` |
| anchors | 设置自定义锚点, 单位 `px` | `number[]` | `[100, windowHeight * 0.6]` |
| duration | 动画时长，单位 `ms`，设置为 `0` 可以禁用动画 | `number` | `300` |
| content-draggable | 允许拖拽内容容器 | `boolean` | `true` |
| safe-area-inset-bottom | 是否开启底部安全区适配 | `boolean` | `false` |
| show-scrollbar | 是否开启滚动条 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 |
| ---- | -------- |
| default | 默认内容区域插槽 |

## Events

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| heightChange | 面板显示高度改变且结束拖动后触发 | `{ height: number }` |
