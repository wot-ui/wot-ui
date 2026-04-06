---
version: 1.3.8
---

# CountTo Number Animation

Used for animated number display, supporting themes, prefixes/suffixes, decimal precision, and manual control.

## Component Type

### Basic Usage

Set `end-val` to specify the final value, `start-val` for the starting value, and `duration` for the animation duration (ms).

```html
<wd-count-to :end-val="2024" suffix="Year" color="#16baaa" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="186.321" suffix="%" color="#1e9fff" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ff5722" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ffb800" :duration="2000" />
```

## Component Style

### Set Theme

Set the text theme via `type`. Optional values are `default`, `primary`, `success`, `warning`, `error`.

```html
<wd-count-to type="primary" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="error" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="success" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="warning" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="default" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
```

## Special Style

### Manual Control

After setting `auto-start="false"`, you can manually start, pause, and reset via instance methods.

```html
<wd-count-to ref="countTo" :auto-start="false" prefix="￥" :start-val="1000" :decimals="3" :end-val="9999.32" suffix="%" color="#1e9fff" />
<wd-grid clickable border>
  <wd-grid-item text="Start" icon="play-circle" @click="start" />
  <wd-grid-item text="Pause" icon="pause-circle" @click="pause" />
  <wd-grid-item text="Reset" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
import type { CountToInstance } from '@/uni_modules/wot-ui/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

const start = () => countTo.value?.start()
const pause = () => countTo.value?.pause()
const reset = () => countTo.value?.reset()
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| color | Text color | string | `''` |
| type | Theme type, optional values are `default`, `primary`, `success`, `warning`, `error` | string | default |
| start-val | Starting value | number | 0 |
| end-val | Final value | number | 2024 |
| duration | Animation duration from start to end value (milliseconds) | number | 3000 |
| auto-start | Whether to start automatically | boolean | true |
| decimals | Number of decimal places to retain, must be >= 0 | number | 0 |
| decimal | Decimal point symbol | string | `.` |
| separator | Thousands separator | string | `,` |
| prefix | Prefix text | string | `''` |
| suffix | Suffix text | string | `''` |
| use-easing | Whether to use easing animation | boolean | true |
| custom-class | Custom class name for root node | string | `''` |
| custom-style | Custom style for root node | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| mounted | Triggered when component loading is complete | - |
| finish | Triggered when animation is complete | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| start | Start animation | - |
| pause | Pause animation | - |
| reset | Reset animation; if `auto-start` is `true`, automatically starts after reset | - |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Main number content | - |
| prefix | Prefix content | - |
| suffix | Suffix content | - |
