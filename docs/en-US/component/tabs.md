# Tabs

Tab component for switching between different content areas.

## Component Types

### Basic Usage

`v-model` can use numeric index or string name.

```html
<wd-tabs v-model="tab1" @change="handleChange">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab${item}`">
      <view class="content">Content{{ tab1 + 1 }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```ts
const tab1 = ref(0)

function handleChange(event) {
  console.log(event)
}
```

### Name Matching

After setting `name` for `wd-tab`, you can match the current active item through string value.

```html
<wd-tabs v-model="tab">
  <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
    <view class="content">Content{{ tab }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
const tabs = ref(['this', 'is', 'a', 'individual', 'example'])
const tab = ref('a')
```

### Use Badge

Add badges to tabs through `badge-props`.

```html
<wd-tabs v-model="tabWithBadge">
  <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" :badge-props="item.badgeProps">
    <view class="content">{{ item.title }} Badge</view>
  </wd-tab>
</wd-tabs>
```

## Component States

### Sticky Layout

Setting `sticky` enables sticky layout, can be combined with `offset-top` to control sticky offset.

```html
<wd-tabs v-model="tab2" sticky>
  <wd-tab v-for="item in 4" :key="item" :title="`Tab${item}`">
    <view class="content">Content{{ tab2 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### Disable Tab

Disable individual tabs through the `disabled` property of `wd-tab`.

```html
<wd-tabs v-model="tab3">
  <wd-tab v-for="item in 4" :key="item" :title="`Tab${item}`" :disabled="item === 1">
    <view class="content">Content{{ tab3 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

## Component Styles

### Bottom Bar Style

Adjust bottom bar appearance through `line-theme`, supports `normal`, `text`, `underline`, `dot`.

```html
<wd-tabs v-model="tabLineTheme.normal" line-theme="normal">
  <wd-tab v-for="item in 4" :key="item" :title="`normal ${item}`">
    <view class="content">Content{{ item }}</view>
  </wd-tab>
</wd-tabs>
```

## Special Styles

### Click Event

Listen to `click` to get information about the currently clicked tab.

```html
<wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
  <wd-tab v-for="item in 4" :key="item" :title="`Tab${item}`">
    <view class="content">Content{{ tab4 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
function handleClick({ index, name }) {
  console.log(index, name)
}
```

### Switch Animation

Setting `animated` enables content switch animation.

```html
<wd-tabs v-model="tab8" animated>
  <wd-tab v-for="item in 4" :key="item" :title="`Tab${item}`">
    <view class="content">Content{{ tab8 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### Gesture Swipe

Setting `swipeable` enables gesture swipe, often used in combination with `animated`.

```html
<wd-tabs v-model="tab5" swipeable animated>
  <wd-tab v-for="item in 4" :key="item" :title="`Tab${item}`">
    <view class="content">Content{{ tab5 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### Overflow Scroll and Navigation Map

After the number of tabs exceeds `slidable-num`, scrolling is enabled. After exceeding `map-num`, a navigation map is displayed. Setting `slidable` to `always` enables always left-aligned scrolling.

```html
<wd-tabs v-model="tab6">
  <wd-tab v-for="item in 7" :key="item" :title="`Tab${item}`">
    <view class="content">Content{{ tab6 + 1 }}</view>
  </wd-tab>
</wd-tabs>

<wd-tabs v-model="tab9" slidable="always">
  <wd-tab v-for="item in 5" :key="item" :title="`Large Tab${item}`">
    <view class="content">Content{{ tab9 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### Use in Popup

In WeChat Mini Program and other scenarios, after the popup opens, you can call `updateLineStyle` to update the active item style.

::: code-group

```html [vue]
<wd-button @click="handleOpenClick">Open Popup</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable>
  <wd-tabs v-model="tab10" ref="tabsRef">
    <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
      <view class="content">Content{{ tab10 }}</view>
    </wd-tab>
  </wd-tabs>
</wd-popup>
```

```ts [ts]
import type { TabsInstance } from '@/uni_modules/wot-ui/components/wd-tabs/types'

const showPopup = ref(false)
const tabsRef = ref<TabsInstance>()

function handleOpenClick() {
  showPopup.value = true
}

function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
```

:::

## Tabs Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Current active item, can be index or name | `number | string` | `0` |
| slidable-num | Threshold for automatically enabling scrollable tabs | `number` | `6` |
| map-num | Threshold for showing navigation map | `number` | `10` |
| map-title | Navigation map title | `string` | - |
| sticky | Whether to enable sticky layout | `boolean` | `false` |
| offset-top | Sticky offset | `number` | `0` |
| swipeable | Whether to enable gesture swipe | `boolean` | `false` |
| line-theme | Bottom bar style, optional values are `normal`, `text`, `underline`, `dot` | `TabsLineTheme` | `normal` |
| line-width | Bottom bar width | `number | string` | - |
| line-height | Bottom bar height | `number | string` | - |
| color | Active item text color | `string` | `''` |
| inactive-color | Inactive item text color | `string` | `''` |
| animated | Whether to enable switch animation | `boolean` | `false` |
| duration | Animation duration, in milliseconds | `number` | `300` |
| slidable | Whether to enable scroll navigation, optional values are `auto`, `always` | `TabsSlidable` | `auto` |
| show-scrollbar | Whether to show scrollbar when scrolling | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Tabs Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when active item changes | `{ index, name }` |
| click | Triggered when clicking tab title | `{ index, name }` |
| disabled | Triggered when clicking disabled tab | `{ index, name }` |
| update:modelValue | Triggered when active item changes | `number | string` |

## Tabs Methods

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| setActive | Set active item | `(value: number \| string, init: boolean, setScroll: boolean)` | - |
| scrollIntoView | Scroll selected item into view | - | - |
| updateLineStyle | Update active item bottom bar style | `(animation?: boolean)` | - |

## Tabs Slots

| Name | Description |
| --- | --- |
| default | Tab content |

## Tab Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| name | Tab unique identifier, defaults to index | `number | string` | - |
| title | Tab title | `string` | - |
| disabled | Whether disabled | `boolean` | `false` |
| lazy | Whether to lazy load content | `boolean` | `true` |
| badge-props | Badge properties, passed to Badge component | `Partial<BadgeProps>` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Tab Slots

| Name | Description |
| --- | --- |
| default | Tab content |
