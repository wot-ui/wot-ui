# Sticky

A sticky layout component used to fix elements at a specified position when the page scrolls.

## Component Types

### Basic Usage

Wrap the content that needs to stick to the top inside the `wd-sticky` component.

> Note: Percentage units `width:xx%;height:xx%;` in the wrapped element's styles are invalid. It is recommended to use `vh`, `vw`.

```html
<wd-sticky>
  <wd-button type="success">Basic Usage</wd-button>
</wd-sticky>
```

### Specify Container

Place `wd-sticky` inside a relative container, then wrap that container with `wd-sticky-box` to limit the sticky area.

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky>
      <wd-button type="warning">Specify Container</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

```scss
.container {
  height: 120px;
  width: 100vw;
}
```

## Component Styles

### Sticky Distance

Set the distance from the top when the component sticks via `offset-top`.

::: tip Reminder
On the H5 side, the default navigation bar is a normal element, so the sticky distance will automatically add `44px` on top of `offset-top`. When using a custom navigation bar on the H5 side, you need to deduct this height yourself.
:::

```html
<wd-sticky :offset-top="50">
  <wd-button>Sticky Distance</wd-button>
</wd-sticky>
```

### Relative Container Sticky Distance

`offset-top` can also be combined with `wd-sticky-box`.

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky :offset-top="150">
      <wd-button type="warning">Relative Container Sticky Distance</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

## Special Styles

### Dynamic Insertion

`wd-sticky` supports wrapping dynamically generated content.

> Note: When wrapping dynamically generated content, the content's width and height should not be less than `1px`

```html
<wd-button type="info" plain @click="insert">Click to Insert</wd-button>
<wd-sticky>
  <wd-button v-if="show" type="danger">Dynamically Generated</wd-button>
</wd-sticky>
```

```ts
const show = ref(false)

function display() {
  show.value = true
}

function insert() {
  display()
}

onShow(() => {
  setTimeout(display, 5000)
})
```

## Sticky Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| z-index | Z-index level | `number` | `1` |
| offset-top | Sticky distance | `number` | `0` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Sticky Slots

| name | Description |
| --- | --- |
| default | Content that needs to stick to the top |

## Sticky External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node style |

## Sticky Box Slots

| name | Description |
| --- | --- |
| default | Relative container content |

## Sticky Box External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node style |
