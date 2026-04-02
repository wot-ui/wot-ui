# Backtop 回到顶部

用于返回页面顶部的操作按钮。

## 组件类型

### 基本用法

由于回到顶部需要实时监听页面滚动位置，通常需要在页面的 `onPageScroll` 生命周期中获取滚动距离，再通过 `scroll-top` 传递给组件。

::: code-group

```html [vue]
<wd-backtop :scroll-top="scrollTop"></wd-backtop>
```

```ts [ts]
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

const scrollTop = ref(0)

onPageScroll((event) => {
  scrollTop.value = event.scrollTop
})
```

:::

## 组件变体

### 形状与文字

通过 `shape` 切换圆形或方形按钮，通过 `text` 显示按钮文字。

```html
<wd-backtop :scroll-top="scrollTop" shape="square" text="TOP"></wd-backtop>
```

### 自定义图标

默认插槽可以替换按钮内部内容。

```html
<wd-backtop :scroll-top="scrollTop">
  <text>TOP</text>
</wd-backtop>
```

## 组件样式

### 自定义显示距离

通过 `top` 设置滚动距离超过多少时显示按钮。

```html
<wd-backtop :scroll-top="scrollTop" :top="600"></wd-backtop>
```

### 自定义样式

通过 `custom-style` 和 `icon-style` 调整按钮与图标样式。

```html
<wd-backtop :scroll-top="scrollTop" custom-style="background: #007aff;color:white;" icon-style="color: white;"></wd-backtop>
```

### 自定义滚动时间

通过 `duration` 设置返回顶部滚动时长，单位为毫秒。

```html
<wd-backtop :scroll-top="scrollTop" :duration="1000"></wd-backtop>
```

## Backtop Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scroll-top | 页面滚动距离 | `number` | - |
| text | 按钮文字 | `string` | - |
| top | 滚动距离超过该值时显示按钮，单位为 `px` | `number` | `300` |
| duration | 返回顶部滚动时间，单位为 `ms` | `number` | `100` |
| z-index | 组件层级 | `number` | `10` |
| icon-style | 自定义图标样式 | `string` | `''` |
| shape | 按钮形状，可选值为 `circle`、`square` | string | `circle` |
| bottom | 距离屏幕底部的距离，单位为 `px` | `number` | `100` |
| right | 距离屏幕右侧的距离，单位为 `px` | `number` | `20` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

## Backtop Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义按钮内容 |
