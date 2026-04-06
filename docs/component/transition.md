# Transition 动画

用于在元素进入或离开时应用过渡效果。

## 组件类型

### 淡入淡出

通过 `name` 指定淡入淡出相关动画，适合提示层、浮层、局部内容切换等场景。

```html
<wd-transition :show="show" name="fade">
  <view>内容</view>
</wd-transition>
```

### 滑动动画

内置 `slide-up`、`slide-down`、`slide-left`、`slide-right` 四种滑动方向。

```html
<wd-transition :show="show" name="slide-up">
  <view>内容</view>
</wd-transition>
```

### 缩放动画

内置 `zoom-in` 与 `zoom-out` 两种缩放动画。

```html
<wd-transition :show="show" name="zoom-in">
  <view>内容</view>
</wd-transition>
```
## 特殊样式

### 自定义动画

通过 `enter-class`、`enter-active-class`、`enter-to-class`、`leave-class`、`leave-active-class`、`leave-to-class` 自定义进入和离开动画类名。

`duration` 支持数字，也支持分别配置进入和离开时长，例如 `{ enter: 700, leave: 1000 }`。

::: code-group

```html [vue]
<wd-transition
  :show="customShow"
  :duration="{ enter: 700, leave: 1000 }"
  enter-class="custom-enter"
  enter-active-class="custom-enter-active"
  enter-to-class="custom-enter-to"
  leave-class="custom-leave"
  leave-active-class="custom-leave-active"
  leave-to-class="custom-leave-to"
  custom-class="block"
/>
```

```scss [scss]
:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}

:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}

:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示组件 | `boolean` | `false` |
| duration | 动画执行时间，支持统一时长或分别设置进入、离开时长 | <code>number &#124; boolean &#124; Record&lt;string, number&gt;</code> | `300` |
| lazy-render | 是否在首次展示时再渲染内容 | `boolean` | `false` |
| name | 动画类型，可选值为 `fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`slide-up`、`slide-down`、`slide-left`、`slide-right`、`zoom-in`、`zoom-out`，也支持数组组合多个动画 | <code>TransitionName &#124; TransitionName[]</code> | - |
| destroy | 是否在动画结束后通过 `display: none` 隐藏内容 | `boolean` | `true` |
| enter-class | 进入过渡的开始状态类名 | `string` | `''` |
| enter-active-class | 进入过渡的激活状态类名 | `string` | `''` |
| enter-to-class | 进入过渡的结束状态类名 | `string` | `''` |
| leave-class | 离开过渡的开始状态类名 | `string` | `''` |
| leave-active-class | 离开过渡的激活状态类名 | `string` | `''` |
| leave-to-class | 离开过渡的结束状态类名 | `string` | `''` |
| disable-touch-move | 是否阻止触摸滚动 | `boolean` | `false` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

### TransitionName 动画类型

| 名称 | 说明 |
| --- | --- |
| fade | 淡入淡出 |
| fade-down | 向下淡入淡出 |
| fade-left | 向左淡入淡出 |
| fade-right | 向右淡入淡出 |
| fade-up | 向上淡入淡出 |
| slide-down | 向下滑动 |
| slide-left | 向左滑动 |
| slide-right | 向右滑动 |
| slide-up | 向上滑动 |
| zoom-in | 缩放进入 |
| zoom-out | 缩放离开 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| before-enter | 进入前触发 | - |
| enter | 进入时触发 | - |
| after-enter | 进入后触发 | - |
| before-leave | 离开前触发 | - |
| leave | 离开时触发 | - |
| after-leave | 离开后触发 | - |
| click | 点击组件时触发 | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要应用动画效果的内容 |
