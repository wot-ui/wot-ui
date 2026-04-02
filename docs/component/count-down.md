# CountDown 倒计时

用于实时展示倒计时数值，支持毫秒级渲染与手动控制。

## 组件类型

### 基础用法

`time` 表示倒计时总时长，单位毫秒。

```html
<wd-count-down :time="time" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## 组件变体

### 自定义格式

通过 `format` 自定义展示格式。

```html
<wd-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
```

### 毫秒级渲染

设置 `millisecond` 开启毫秒级渲染。

```html
<wd-count-down :time="time" millisecond format="HH:mm:ss:SS" />
```

## 组件样式

### 自定义样式

使用默认插槽自定义倒计时内容，插槽参数见下方 `TimeData`。

```html
<wd-count-down :time="time">
  <template #default="{ current }">
    <span class="custom-count-down">{{ current.hours }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.minutes }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.seconds }}</span>
  </template>
</wd-count-down>
```

## 特殊样式

### 手动控制

通过实例方法控制开始、暂停、重置。

```html
<wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish" />
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle" @click="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @click="pause" />
  <wd-grid-item text="重置" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
const countDown = ref<CountDownInstance>()

const start = () => countDown.value?.start()
const pause = () => countDown.value?.pause()
const reset = () => countDown.value?.reset()
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 倒计时时长，单位毫秒 | number | - |
| millisecond | 是否开启毫秒级渲染 | boolean | false |
| format | 倒计时格式化字符串 | string | `HH:mm:ss` |
| auto-start | 是否在初始化和重置后自动开始倒计时 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 倒计时变化时触发 | `current: TimeData` |
| finish | 倒计时结束时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始倒计时 | - |
| pause | 暂停倒计时 | - |
| reset | 重置倒计时；若 `auto-start` 为 `true`，重置后自动开始 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义倒计时展示内容 | `{ current: TimeData }` |

### format 格式

| 格式 | 说明 |
| --- | --- |
| DD | 天数 |
| HH | 小时 |
| mm | 分钟 |
| ss | 秒数 |
| S | 毫秒（1 位） |
| SS | 毫秒（2 位） |
| SSS | 毫秒（3 位） |

### TimeData 对象

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| total | 剩余总毫秒数 | number |
| days | 天 | number |
| hours | 小时 | number |
| minutes | 分钟 | number |
| seconds | 秒 | number |
| milliseconds | 毫秒 | number |
