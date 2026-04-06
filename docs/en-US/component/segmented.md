# Segmented

A segmented control for displaying multiple options and allowing users to select a single option.

## When to Use

- When you need to display multiple options and allow users to select a single option;
- When switching between selected options changes the content of the associated area.

## Component Types

### Basic Usage

Set the options list through `options` and bind the currently selected item through `v-model:value`.

```vue
<wd-segmented :options="list" v-model:value="current"></wd-segmented>
```

```ts
const list = ref<string[]>(['Comments', 'Likes', 'Contributions', 'Tips'])

const current = ref('Likes')
```

## Component States

### Disabled

Set the `disabled` property to disable the entire segmented control.

```html
<wd-segmented :options="list" v-model:value="current" disabled></wd-segmented>
```

## Component Variants

### Outline Theme

Switch to outline style through `theme="outline"`.

```html
<wd-segmented :options="list" v-model:value="current" theme="outline"></wd-segmented>
```

## Component Styles

### Custom Render Segmented Labels

Use the `label` slot to customize the rendering of segmented control label content.

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true">
  <template #label="{ option }">
    <view class="section-slot">
      <image style="border-radius: 50%; width: 32px; height: 32px" :src="option.payload.avatar" />
      <view class="name">{{ option.value }}</view>
    </view>
  </template>
</wd-segmented>
```

```ts
const list = ref([
  {
    value: 'Li Lei',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/redpanda.jpg'
    }
  },
  {
    value: 'Han Meimei',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/capybara.jpg'
    }
  }
])
```

```scss
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}
```

## Special Styles

### Segmented with Vibration Effect

After setting `vibrate-short`, a short vibration feedback will be triggered when switching options.

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true"></wd-segmented>
```

### Using in Popup
In WeChat Mini Program, when using this component in a popup, you need to call the `updateActiveStyle` method to update the segmented control style. See [Common Problems](/guide/common-problems.html#why-do-components-like-slider-tabs-etc-show-abnormal-behavior-when-wrapped-by-popup-actionsheet-dropdownitem-etc-in-wechat-mini-program).


```html
<wd-button @click="handleClick">Open Popup</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">Using in Popup</view>
  <wd-segmented :options="list" v-model:value="current" ref="segmentedRef"></wd-segmented>
</wd-popup>
```
```ts
const list = ref<string[]>(['Comments', 'Likes', 'Contributions', 'Tips'])
const current = ref('Likes')

const segmentedRef = ref<SegmentedInstance>() // Get segmented control instance
const showPopup = ref(false) // Control popup display
/**
 * Click button to open popup
 */
function handleClick() {
  showPopup.value = true
}
/**
 * Update segmented control style after popup opens
 */
function handlePopupShow() {
  segmentedRef.value?.updateActiveStyle()
}
```
```css
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value / v-model:value | Currently selected value | `string \| number` | - |
| disabled | Whether to disable the segmented control | `boolean` | `false` |
| options | Data collection | `string[] \| number[] \| SegmentedOption[]` | `[]` |
| theme | Segmented control theme, optional values are `card`, `outline` | `string` | `'card'` |
| vibrate-short | Whether to trigger short vibration when switching options | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

### SegmentedOption

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value | Option value | `string \| number` | - |
| disabled | Whether to disable this option | `boolean` | `false` |
| payload | Additional data, can be used for slot rendering | `any` | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when option switches | `SegmentedOption` |
| click | Triggered when option is clicked | `SegmentedOption` |

## Methods

| Method Name | Description | Type |
| --- | --- | --- |
| updateActiveStyle | Update slider offset, parameter `animation` is used to control whether to enable animation, enabled by default | `(animation?: boolean) => void` |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| label | Option label content | `{ option: SegmentedOption }` |
