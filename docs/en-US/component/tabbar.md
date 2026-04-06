# Tabbar

Bottom navigation bar for switching between different pages.

## Component Types

### Basic Usage

`v-model` is the bound value, representing the index or name of the selected tab.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### Match by Name

By setting the `name` property, you can match the selected tab by name.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item name="home" title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item name="cart" title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item name="setting" title="Settings" icon="setting"></wd-tabbar-item>
  <wd-tabbar-item name="user" title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref('home')
```


## Component States

### Badge Tips

By setting the `value` property, you can display badge tips. Setting the `is-dot` property will display a small red dot in the upper right corner of the icon.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item is-dot :value="2" title="Dot" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Max Value" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## Component Variants

### Floating Tabbar

By setting the `shape` property to `round`, you can set the tabbar to a floating style.

```html
<wd-tabbar shape="round" v-model="tabbar">
  <wd-tabbar-item title="Home" is-dot :value="2" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" :value="2" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="Album" :value="30" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="My" :value="200" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## Component Styles

### Custom Icon

You can customize the tab icon by using `<template #icon>`.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item :value="2" title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category">
    <template #icon>
      <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
    </template>
  </wd-tabbar-item>
  <wd-tabbar-item :value="3" title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### Custom Color

By setting `active-color` and `inactive-color` properties, you can customize the colors for active and inactive tabs.

```html
<wd-tabbar v-model="tabbar" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item is-dot :value="2" title="Dot" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Max Value" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## Special Styles

### Listen to Switch Events

By listening to the `change` event, you can get the value of the selected tab.

```html
<wd-tabbar v-model="tabbar" @change="handleChange" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item title="Album" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)

function handleChange({ value }: { value: string }) {
  show(`Selected tab:${value}`)
}
```

### Default Slot

You can customize special content like middle buttons through the default slot of `wd-tabbar-item`.

```html
<wd-tabbar v-model="tabbar" safeAreaInsetBottom placeholder>
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="store"></wd-tabbar-item>
  <wd-tabbar-item>
    <view class="custom-raised-button">
      <wd-icon name="plus" size="32px"></wd-icon>
    </view>
  </wd-tabbar-item>
  <wd-tabbar-item title="Album" icon="image"></wd-tabbar-item>
  <wd-tabbar-item title="Service" icon="message"></wd-tabbar-item>
</wd-tabbar>
```

### Before Change Interception

Through `before-change`, you can do synchronous or asynchronous confirmation before switching.

```html
<wd-tabbar v-model="tabbar" :before-change="beforeChange">
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="store"></wd-tabbar-item>
</wd-tabbar>
```

```ts
function beforeChange(value) {
  return Promise.resolve(true)
}
```

### Fixed Bottom

By setting the `fixed` property, you can fix the tabbar at the bottom. By setting the `placeholder` property, you can generate an equal-height placeholder element at the tab position when fixed at the bottom.

```html
<wd-tabbar fixed v-model="tabbar" bordered safeAreaInsetBottom placeholder>
  <wd-tabbar-item :value="2" is-dot title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Album" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```ts
import { ref } from 'vue'

const tabbar = ref(1)
```



## Tabbar Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| model-value / v-model | Index or name of the selected tab | `number \| string` | `0` |
| fixed | Whether to fix at the bottom | `boolean` | `false` |
| bordered | Whether to show top border | `boolean` | `false` |
| safe-area-inset-bottom | Whether to set bottom safe area | `boolean` | `false` |
| shape | Tabbar shape, optional values are `default`, `round` | `TabbarShape` | `'default'` |
| active-color | Active tab color | `string` | - |
| inactive-color | Inactive tab color | `string` | - |
| placeholder | When fixed at the bottom, whether to generate an equal-height placeholder element | `boolean` | `false` |
| z-index | Component z-index level | `number` | `10` |
| before-change | Callback function before switching, returning `false` can prevent switching, supports returning `Promise<boolean>` | `TabbarBeforeChange` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when tab switches | `{ value }` |

## Tabbar Slots

| name | Description |
| --- | --- |
| default | TabbarItem list |

## Tabbar External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style class |
| custom-style | Root node style |

## TabbarItem Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Tab title | `string` | - |
| name | Unique identifier, defaults to index value if not passed | `string \| number` | - |
| icon | Icon name | `string` | - |
| value | Badge display value | `number \| string` | - |
| is-dot | Whether to show dot badge | `boolean` | `false` |
| max | Badge maximum value | `number` | `99` |
| badge-props | Custom badge properties, passed to Badge component | `BadgeProps` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## TabbarItem Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Customize the entire tab item content | - |
| icon | Custom icon | `{ active }` |
