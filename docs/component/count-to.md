---
version: 1.3.8
---

# CountTo 数字滚动

用于数字滚动展示，支持主题、前后缀、小数精度与手动控制。

## 组件类型

### 基本用法

设置 `end-val` 指定最终值，`start-val` 指定起始值，`duration` 指定滚动时长（ms）。

```html
<wd-count-to :end-val="2024" suffix="年" color="#16baaa" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="186.321" suffix="%" color="#1e9fff" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ff5722" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ffb800" :duration="2000" />
```

## 组件样式

### 设置主题

通过 `type` 设置文本主题，可选值为 `default`、`primary`、`success`、`warning`、`error`。

```html
<wd-count-to type="primary" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="error" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="success" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="warning" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="default" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
```

## 特殊样式

### 手动控制

设置 `auto-start="false"` 后，可通过实例方法手动开始、暂停、重置。

```html
<wd-count-to ref="countTo" :auto-start="false" prefix="￥" :start-val="1000" :decimals="3" :end-val="9999.32" suffix="%" color="#1e9fff" />
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle" @click="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @click="pause" />
  <wd-grid-item text="重置" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
import type { CountToInstance } from '@/uni_modules/wot-design-uni/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

const start = () => countTo.value?.start()
const pause = () => countTo.value?.pause()
const reset = () => countTo.value?.reset()
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 文本颜色 | string | `''` |
| type ^(1.3.9) | 主题类型，可选值为 `default`、`primary`、`success`、`warning`、`error` | string | default |
| start-val | 起始值 | number | 0 |
| end-val | 最终值 | number | 2024 |
| duration | 从起始值到结束值数字变动的时间（毫秒） | number | 3000 |
| auto-start | 是否自动开始 | boolean | true |
| decimals | 保留的小数位数，需大于等于 0 | number | 0 |
| decimal | 小数点符号 | string | `.` |
| separator | 千分位分隔符 | string | `,` |
| prefix | 前缀文本 | string | `''` |
| suffix | 后缀文本 | string | `''` |
| use-easing | 是否使用缓动动画 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| mounted | 组件加载完成时触发 | - |
| finish | 动画完成时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始动画 | - |
| pause | 暂停动画 | - |
| reset | 重置动画；若 `auto-start` 为 `true`，重置后自动开始 | - |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 主体数字内容 | - |
| prefix | 前缀内容 | - |
| suffix | 后缀内容 | - |
