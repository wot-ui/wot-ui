# Progress 进度条

用于展示操作的当前进度。

## 组件类型

### 基本用法

设置百分比 `percentage`。

```html
<wd-progress :percentage="50" />
```

### 内置百分比

通过 `percent-position` 配置百分比显示在进度条内部，并设置对齐方式。

```html
<wd-progress :percentage="50" :percent-position="{ type: 'inner', align: 'center' }" />
<wd-progress :percentage="50" status="success" :percent-position="{ type: 'inner', align: 'right' }" />
<wd-progress :percentage="50" status="danger" :percent-position="{ type: 'inner', align: 'left' }" />
```

## 组件状态

### 状态

设置 `status`，告知用户当前状态和预期。

```html
<wd-progress :percentage="50" status="success" hide-text />
<wd-progress :percentage="50" status="danger" hide-text />
<wd-progress :percentage="50" status="warning" hide-text />
```

## 组件样式

### 隐藏进度文字

设置 `hide-text` 隐藏进度文字。

```html
<wd-progress :percentage="50" hide-text />
```

### 修改颜色

设置 `color` 修改进度条颜色。

```html
<wd-progress :percentage="50" color="var(--wot-color-theme, #0083ff)" />
<wd-progress :percentage="50" color="var(--wot-color-success, #00c740)" />
<wd-progress :percentage="50" color="var(--wot-color-warning, #ffb300)" />
```

### 颜色数组

`color` 也可以设置为颜色数组或 `ProgressColor[]`。当传入字符串数组时，组件会自动计算每段颜色对应的进度边界。

```html
<wd-progress :percentage="50" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
<wd-progress :percentage="50" :color="colorObject" />
```

```ts
import type { ProgressColor } from '@/uni_modules/wot-design-uni/components/wd-progress/types'

const colorObject: ProgressColor[] = [
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
]
```

## 特殊样式

### 动态控制

通过修改 `percentage` 绑定值，可以实现动态进度控制。

```html
<wd-progress :percentage="percentage" />
<wd-button type="danger" size="small" @click="reduce">-10</wd-button>
<wd-button type="success" size="small" @click="add">+10</wd-button>
```

```ts
const percentage = ref(50)

function add() {
  percentage.value = Math.min(percentage.value + 10, 100)
}

function reduce() {
  percentage.value = Math.max(percentage.value - 10, 0)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度数值，最大值为 `100` | `number` | `0` |
| hide-text | 是否隐藏进度文字 | `boolean` | `false` |
| color | 进度条颜色，可选值为 `string`、`string[]`、`ProgressColor[]` | `string \| string[] \| ProgressColor[]` | - |
| status | 进度条状态，可选值为 `success`、`danger`、`warning` | `string` | - |
| duration | 进度增加 `1%` 所需毫秒数 | `number` | `30` |
| percent-position | 百分比显示位置配置，`type` 可选 `inner`、`outer`，`align` 可选 `left`、`center`、`right` | `PercentPosition` | `{ align: 'right', type: 'outer' }` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### ProgressColor

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色值 | `string` | - |
| percentage | 颜色生效的进度阈值 | `number` | - |

### PercentPosition

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 百分比显示位置，可选值为 `inner`、`outer` | `string` | `'outer'` |
| align | 百分比文本对齐方式，可选值为 `left`、`center`、`right` | `string` | `'right'` |
