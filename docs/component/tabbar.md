# Tabbar 标签栏

底部导航栏，用于在不同页面之间进行切换。

## 组件类型

### 基础用法

`v-model` 为绑定值，表示选中标签的索引值或者名称。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### 通过名称匹配

通过设置 `name` 属性，可以通过名称匹配选中标签。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item name="home" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item name="cart" title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item name="setting" title="设置" icon="setting"></wd-tabbar-item>
  <wd-tabbar-item name="user" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref('home')
```


## 组件状态

### 徽标提示

通过设置 `value` 属性，可以显示徽标提示，而设置 is-dot 属性后，会在图标右上角展示一个小红点。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 组件变体

### 悬浮标签栏

通过设置 `shape` 属性为 `round`，可以将标签栏设置为悬浮样式。

```html
<wd-tabbar shape="round" v-model="tabbar">
  <wd-tabbar-item title="首页" is-dot :value="2" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" :value="2" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="相册" :value="30" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="我的" :value="200" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 组件样式

### 自定义图标

通过使用 `<template #icon>` 可以自定义标签页的图标。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item :value="2" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类">
    <template #icon>
      <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
    </template>
  </wd-tabbar-item>
  <wd-tabbar-item :value="3" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### 自定义颜色

通过设置 `active-color` 和 `inactive-color` 属性，可以自定义激活和未激活标签的颜色。

```html
<wd-tabbar v-model="tabbar" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 特殊样式

### 监听切换事件

通过监听 `change` 事件，可以获取选中标签的值。

```html
<wd-tabbar v-model="tabbar" @change="handleChange" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)

function handleChange({ value }: { value: string }) {
  show(`选中标签:${value}`)
}
```

### 默认插槽

可以通过 `wd-tabbar-item` 的默认插槽自定义中间按钮等特殊内容。

```html
<wd-tabbar v-model="tabbar" safeAreaInsetBottom placeholder>
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="store"></wd-tabbar-item>
  <wd-tabbar-item>
    <view class="custom-raised-button">
      <wd-icon name="plus" size="32px"></wd-icon>
    </view>
  </wd-tabbar-item>
  <wd-tabbar-item title="相册" icon="image"></wd-tabbar-item>
  <wd-tabbar-item title="客服" icon="message"></wd-tabbar-item>
</wd-tabbar>
```

### 切换前拦截

通过 `before-change` 可在切换前做同步或异步确认。

```html
<wd-tabbar v-model="tabbar" :before-change="beforeChange">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="store"></wd-tabbar-item>
</wd-tabbar>
```

```ts
function beforeChange(value) {
  return Promise.resolve(true)
}
```

### 固定底部

通过设置 `fixed` 属性，可以将标签栏固定在底部；通过设置 `placeholder` 属性，可以在固定在底部时在标签位置生成一个等高的占位元素。

```html
<wd-tabbar fixed v-model="tabbar" bordered safeAreaInsetBottom placeholder>
  <wd-tabbar-item :value="2" is-dot title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```



## Tabbar Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中标签的索引值或者名称 | `number \| string` | `0` |
| fixed | 是否固定在底部 | `boolean` | `false` |
| bordered | 是否显示顶部边框 | `boolean` | `false` |
| safe-area-inset-bottom | 是否设置底部安全区 | `boolean` | `false` |
| shape | 标签栏形状，可选值为 `default`、`round` | `TabbarShape` | `'default'` |
| active-color | 激活标签颜色 | `string` | - |
| inactive-color | 未激活标签颜色 | `string` | - |
| placeholder | 固定在底部时，是否生成等高占位元素 | `boolean` | `false` |
| z-index | 组件层级 | `number` | `10` |
| before-change | 切换前的回调函数，返回 `false` 可阻止切换，支持返回 `Promise<boolean>` | `TabbarBeforeChange` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 标签切换时触发 | `{ value }` |

## Tabbar Slots

| name | 说明 |
| --- | --- |
| default | TabbarItem 列表 |

## Tabbar 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

## TabbarItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标签页标题 | `string` | - |
| name | 唯一标识符，不传时默认使用索引值 | `string \| number` | - |
| icon | 图标名称 | `string` | - |
| value | 徽标显示值 | `number \| string` | - |
| is-dot | 是否显示点状徽标 | `boolean` | `false` |
| max | 徽标最大值 | `number` | `99` |
| badge-props ^(0.1.50) | 自定义徽标属性，会透传给 Badge 组件 | `BadgeProps` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## TabbarItem Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义整个标签项内容 | - |
| icon | 自定义图标 | `{ active }` |
