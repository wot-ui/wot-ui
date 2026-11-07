# CountDown

Used to display countdown values in real-time, supporting millisecond-level rendering and manual control.

## Component Type

### Basic Usage

`time` represents the total countdown duration, unit is milliseconds.

```html
<wd-count-down :time="time" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## Component Variant

### Custom Format

Customize display format through `format`.

```html
<wd-count-down :time="time" format="DD Days HH Hours mm Minutes ss Seconds" />
```

### Millisecond-level Rendering

Set `millisecond` to enable millisecond-level rendering.

```html
<wd-count-down :time="time" millisecond format="HH:mm:ss:SS" />
```

## Component Style

### Custom Style

Use default slot to customize countdown content, slot parameters see `TimeData` below.

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

## Special Style

### Manual Control

Control start, pause, reset through instance methods.

```html
<wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish" />
<wd-grid clickable border>
  <wd-grid-item text="Start" icon="play-circle" @click="start" />
  <wd-grid-item text="Pause" icon="pause-circle" @click="pause" />
  <wd-grid-item text="Reset" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
const countDown = ref<CountDownInstance>()

const start = () => countDown.value?.start()
const pause = () => countDown.value?.pause()
const reset = () => countDown.value?.reset()
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| time | Countdown duration, unit milliseconds | number | - |
| millisecond | Whether to enable millisecond-level rendering | boolean | false |
| format | Countdown format string | string | `HH:mm:ss` |
| auto-start | Whether to automatically start countdown after initialization and reset | boolean | true |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when countdown changes | `current: TimeData` |
| finish | Triggered when countdown ends | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| start | Start countdown | - |
| pause | Pause countdown | - |
| reset | Reset countdown; if `auto-start` is `true`, automatically start after reset | - |

## Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Custom countdown display content | `{ current: TimeData }` |

### format Format

| Format | Description |
| --- | --- |
| DD | Days |
| HH | Hours |
| mm | Minutes |
| ss | Seconds |
| S | Milliseconds (1 digit) |
| SS | Milliseconds (2 digits) |
| SSS | Milliseconds (3 digits) |

### TimeData Object

| Property | Description | Type |
| --- | --- | --- |
| total | Remaining total milliseconds | number |
| days | Days | number |
| hours | Hours | number |
| minutes | Minutes | number |
| seconds | Seconds | number |
| milliseconds | Milliseconds | number |
