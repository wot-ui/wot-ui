# Slider 滑块

支持单向滑块和双向滑块，可用于在范围内选择一个值或一段区间。

## 组件类型

### 基本用法

`v-model` 为绑定值。值为 `number` 时显示一个滑块。

```html
<wd-slider v-model="value" />
```

```ts
const value = ref<number>(30)
```

### 双向滑块

设置 `range` 后，绑定值变为数组类型。

```html
<wd-slider v-model="value" range />
```

```ts
const value = ref<number[]>([20, 60])
```

## 组件状态

### 禁用状态

设置 `disabled` 禁用滑块。

```html
<wd-slider v-model="value" disabled />
```

## 组件样式

### 显示极值

设置 `show-extreme-value` 显示最小值和最大值。

```html
<wd-slider v-model="value" show-extreme-value />
```

### 管道样式

设置 `theme="capsule"` 使用管道样式。

```html
<wd-slider v-model="value" theme="capsule" />
```

### 指定步长

通过 `step` 设置步长。

```html
<wd-slider v-model="value" :step="10" />
```

### 指定选择范围

通过 `min` 和 `max` 设置取值范围。

```html
<wd-slider v-model="value" :min="-10" :max="10" show-extreme-value />
```

### 刻度标记

通过 `marks` 配置刻度标记。

```html
<wd-slider v-model="value" :marks="[0, 25, 50, 75, 100]" :step="25" />
```

### 刻度标记（管道）

刻度标记也可以与管道样式组合使用。

```html
<wd-slider v-model="value" :marks="[0, 25, 50, 75, 100]" :step="25" theme="capsule" />
```

## 布局能力

### 垂直方向

设置 `vertical` 以垂直方向展示。

```html
<wd-slider v-model="value" vertical />
<wd-slider v-model="rangeValue" vertical range />
```

### 垂直 + 管道

垂直方向支持与 `theme="capsule"` 组合使用。

```html
<wd-slider v-model="value" vertical theme="capsule" />
<wd-slider v-model="rangeValue" vertical theme="capsule" range show-extreme-value />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前滑块值，单滑块为 `number`，双滑块为 `number[]` | `SliderValue` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| range | 是否为双向滑块模式 | `boolean` | `false` |
| vertical | 是否垂直展示 | `boolean` | `false` |
| theme | 滑块风格，可选值为 `default`、`capsule` | `SliderTheme` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-extreme-value | 是否显示最小值和最大值文本 | `boolean` | `false` |
| popover-visible | 气泡显示模式，可选值为 `always`、`normal`、`never` | `SliderPopoverVisible` | `'normal'` |
| marks | 刻度标记，支持数组或对象形式 | `SliderMarks` | - |
| active-color | 进度条激活态颜色 | `string` | `''` |
| inactive-color | 进度条未激活态颜色 | `string` | `''` |
| custom-class | 根节点样式类 | `string` | `''` |
| custom-style | 根节点样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| dragstart | 开始拖动时触发 | `{ value }` |
| dragmove | 拖动过程中触发 | `{ value }` |
| dragend | 拖动结束时触发 | `{ value }` |
| change | 值变化时触发 | `value` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| initSlider | 初始化 slider 尺寸数据 | - |

