# Backtop

Button for returning to the top of the page.

## Component Type

### Basic Usage

Since backtop needs to monitor page scroll position in real-time, it usually requires getting scroll distance in the page's `onPageScroll` lifecycle, then passing it to the component via `scroll-top`.

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

## Component Variant

### Shape and Text

Switch between circle or square button via `shape`, display button text via `text`.

```html
<wd-backtop :scroll-top="scrollTop" shape="square" text="TOP"></wd-backtop>
```

### Custom Icon

Default slot can replace button internal content.

```html
<wd-backtop :scroll-top="scrollTop">
  <text>TOP</text>
</wd-backtop>
```

## Component Style

### Custom Display Distance

Set the scroll distance threshold to show button via `top`.

```html
<wd-backtop :scroll-top="scrollTop" :top="600"></wd-backtop>
```

### Custom Style

Adjust button and icon styles via `custom-style` and `icon-style`.

```html
<wd-backtop :scroll-top="scrollTop" custom-style="background: #007aff;color:white;" icon-style="color: white;"></wd-backtop>
```

### Custom Scroll Duration

Set return to top scroll duration via `duration`, unit is milliseconds.

```html
<wd-backtop :scroll-top="scrollTop" :duration="1000"></wd-backtop>
```

## Backtop Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| scroll-top | Page scroll distance | `number` | - |
| text | Button text | `string` | - |
| top | Show button when scroll distance exceeds this value, unit is `px` | `number` | `300` |
| duration | Return to top scroll time, unit is `ms` | `number` | `100` |
| z-index | Component z-index | `number` | `10` |
| icon-style | Custom icon style | `string` | `''` |
| shape | Button shape, optional values are `circle`, `square` | string | `circle` |
| bottom | Distance from screen bottom, unit is `px` | `number` | `100` |
| right | Distance from screen right, unit is `px` | `number` | `20` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-style | Custom root node style | `string` | `''` |
| custom-class | Custom root node style class | `string` | `''` |

## Backtop Slots

| Name | Description |
| --- | --- |
| default | Custom button content |
