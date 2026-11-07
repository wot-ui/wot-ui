# Navbar

Provides navigation functionality for pages, commonly used at the top of pages.

::: tip FAQ

**Right icon blocked by Mini Program capsule?**

When enabling custom top navigation in Mini Program platforms, the capsule will be fixedly displayed in the upper right corner, so the right slot and options are not recommended for use at this time.

**How to set background to transparent?**

Set the component `background-color` to `transparent` through `custom-style`.

```html
<wd-navbar title="Title" custom-style="background-color: transparent !important;"></wd-navbar>
```

**Component covered by `video`?**

`video` is a native component with a higher z-index. Currently, it cannot be covered and needs to be analyzed specifically for each platform.
:::

## Component Type

### Basic Usage

Set the navigation bar title through the `title` property.

```html
<wd-navbar title="Title"></wd-navbar>
```

### Return to Previous Level

Implement the function of returning to the previous level in the navigation bar.

::: code-group

```html
<wd-navbar title="Title" left-text="Back" left-arrow @click-left="handleClickLeft"></wd-navbar>
```

```ts
function handleClickLeft() {
  uni.navigateBack()
}
```

:::

### Right Button

Add clickable buttons on the right side of the navigation bar.

::: code-group

```html
<wd-navbar title="Title" left-text="Back" left-arrow right-text="Button" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'

const { show: showToast } = useToast()

function handleClickRight() {
  showToast('Button')
}
```

:::

## Component State

### Disable Button

Disable the buttons on both sides through the `left-disabled` or `right-disabled` properties. When the button is disabled, the opacity is reduced and it cannot be clicked.

```html
<wd-navbar title="Title" left-text="Back" right-text="Button" left-arrow left-disabled right-disabled></wd-navbar>
```

## Component Style

### Fixed at Top

Set the navigation bar to be fixed at the top of the page through the `fixed` property. Generate placeholder space at the top through `placeholder`. Enable top safe area adaptation through `safeAreaInsetTop`.

```html
<wd-navbar fixed placeholder title="Navbar" left-arrow safeAreaInsetTop></wd-navbar>
```

## Content Form

### Use Slots

You can customize the content on both sides of the navigation bar through the `left` and `right` slots.

```html
<wd-navbar title="Title">
  <template #left>
    <wd-icon name="left" size="24px" class="wd-navbar__arrow" />
  </template>
  <template #right>
    <wd-icon name="search-line" size="18" />
  </template>
</wd-navbar>
```

### Capsule Style

Customize the return capsule through the `capsule` slot and the `wd-navbar-capsule` component.

::: code-group

```html
<wd-navbar title="Title" left-text="Back" right-text="Settings" left-arrow>
  <template #capsule>
    <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
  </template>
</wd-navbar>
```

```ts
function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
```

:::

### With Search Bar

Customize the title area through the `title` slot.

::: code-group

```html
<wd-navbar left-text="Back" right-text="Settings" left-arrow>
  <template #title>
    <view class="search-box">
      <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
    </view>
  </template>
</wd-navbar>
```

```scss
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Title text | `string` | - |
| left-text | Left text | `string` | - |
| right-text | Right text | `string` | - |
| left-arrow | Whether to display the left arrow | `boolean` | `false` |
| bordered | Whether to display the bottom border | `boolean` | `false` |
| fixed | Whether to fix to the top | `boolean` | `false` |
| placeholder | When fixed to the top, generate an equal-height placeholder element at the tag position | `boolean` | `false` |
| z-index | Navigation bar z-index | `number` | `10` |
| safe-area-inset-top | Whether to enable top safe area adaptation | `boolean` | `false` |
| left-disabled | Whether to disable the left button. When disabled, the opacity is reduced and it cannot be clicked | `boolean` | `false` |
| right-disabled | Whether to disable the right button. When disabled, the opacity is reduced and it cannot be clicked | `boolean` | `false` |
| custom-class | Root node style class name | `string` | - |
| custom-style | Root node style | `string` | - |
| glass | Enable glassmorphism (glass) style | `boolean` | `false` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click-left | Triggered when clicking the left button | - |
| click-right | Triggered when clicking the right button | - |

## Slots

| name | Description |
| --- | --- |
| capsule | Custom capsule (when a capsule exists, left does not take effect) |
| left | Left content |
| title | Title content |
| right | Right content |

## NavbarCapsule Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| custom-class | Root node style class name | `string` | - |
| custom-style | Root node style | `string` | - |
| glass | Enable glassmorphism (glass) style | `boolean` | `false` |

## NavbarCapsule Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| back | Triggered when clicking the back button | - |
| back-home | Triggered when clicking the back to home button | - |
