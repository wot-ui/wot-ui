# NoticeBar

A notification bar component used to display notification reminders at the top of the page.

## Component Types

### Basic Usage

Set the `text` content and `prefix` left icon.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="warn-bold" />
```

## Component Variants

### Type Modification

Set `type` to modify the notification type. There are three notification types: `info`, `warning`, and `danger`. The default is `warning`.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="warn-bold" custom-class="space" />
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="check-outline" type="info" custom-class="space" />
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="wifi-error" type="danger" />
```

```scss
:deep(.space) {
  margin-bottom: 10px;
}
```

### Closable

Set the `closable` property to make the notification bar closable.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" closable />
```

## Content Forms

### Disable Scrolling

Set `scrollable` to `false` to disable the scrolling effect. The notification bar will remain static.

```html
<wd-notice-bar text="When I was young, I wanted to buy osmanthus flowers and wine" :scrollable="false" prefix="stop" />
```

### Slot Demo

When the `prefix` property is not passed, you can customize the left content through the `prefix` slot; the `suffix` slot will override the default close icon area.

```html
<wd-notice-bar :scrollable="false">
  <template #prefix>
    <wd-icon class="prefix" name="warn-bold">Placeholder</wd-icon>
  </template>
  Notifications may be blocked during restricted periods...
  <template #suffix>
    <div style="color: #4d80f0">View</div>
  </template>
</wd-notice-bar>
```

```scss
:deep(.prefix) {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}
```

### Multi-line Display

Set the `wrapable` property to `true` and disable scrolling with `scrollable` to enable multi-line display.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" wrapable :scrollable="false" />
```

## Component Styles

### Custom Colors

Set `color` to modify text and icon color, and set `background-color` to modify the background color.

```html
<wd-notice-bar
  text="This is a message notification, this is a message notification, this is a message notification"
  prefix="check-outline"
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

## Special Usage

### Multi-text Carousel

Pass a `string[]` to the `text` property to enable multi-text carousel. The `next` event will be triggered when displaying the next text, which receives a `number` parameter representing the current text array index.

```html
<wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
```

```javascript
import { ref } from 'vue'

const textArray = ref([
  'Welcome to wot-ui',
  'This component library is built with uniapp -> Vue3, TypeScript',
  'Project URL: https://github.com/wot-ui/wot-ui',
  'Our goal is to build the best uniapp component library',
  'We sincerely invite everyone to build together',
  'This is a message notification, this is a message notification, this is a message notification, this is a message notification, this is a message notification'
])

const onNext = (index: number) => {
  console.log('Displaying next, index: ', index)
  console.log('Text is: ' + textArray.value[index])
}
```

### Vertical Scrolling

1. Pass `vertical` to `direction` to enable vertical scrolling. Currently, only one-direction vertical scrolling is supported.
2. Scrolling will only occur when `text` is an array.

```html
<wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
<wd-notice-bar prefix="warn-bold" direction="vertical" text="Only one message won't scroll" :delay="3" custom-class="space" />
```

### Click Event

Clicking the notification content area will trigger the `click` event, returning the currently displayed text and its corresponding index.

```html
<wd-notice-bar :text="textArray" prefix="thunderbolt" @click="handleClick" />
```

```ts
function handleClick(result: { text: string; index: number }) {
  console.log(result)
}
```

### Reset Animation

Get the component instance via `ref` and call the `reset` method to reset the animation. When you encounter animation anomalies with `NoticeBar`, you can call the `reset` method to reset the animation.

For example: On the `APP-VUE` side, when using `NoticeBar` on a `Tabbar` page, returning from another page to the `NoticeBar` page may occasionally cause animation anomalies. In this case, you can call the `reset` method to reset the animation.

Reference issues: [#358](https://github.com/Moonofweisheng/wot-design-uni/issues/358), [#650](https://github.com/Moonofweisheng/wot-design-uni/issues/650)

```html
<wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
<wd-button @click="handleReset">Reset Animation</wd-button>
```

```ts
// uni_modules
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
// npm
// import { type NoticeBarInstance } from 'wot-design-uni/components/wd-notice-bar/types'

const notice = ref<NoticeBarInstance>()

const textArray = ref([
  'Welcome to ui',
  'This component library is built with uniapp -> Vue3, TypeScript',
  'Project URL: https://github.com/wot-ui/wot-ui',
  'Our goal is to build the best uniapp component library',
  'We sincerely invite everyone to build together',
  'This is a message notification, this is a message notification, this is a message notification, this is a message notification, this is a message notification'
])

function handleReset() {
  notice.value?.reset()
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| text | Notification bar text | `string \| string[]` | `''` |
| type | Notification bar type, optional values are `warning`, `info`, `danger` | `NoticeBarType` | `warning` |
| prefix | Left icon name | `string` | - |
| scrollable | Whether to enable scrolling playback | `boolean` | `true` |
| delay | Initial delay of scrolling animation, in seconds | `number` | `1` |
| speed | Scrolling speed, in `px/s` | `number` | `50` |
| closable | Whether to show the close button | `boolean` | `false` |
| wrapable | Whether to wrap text display; only effective in horizontal mode when `scrollable=false` | `boolean` | `false` |
| color | Text and icon color | `string` | - |
| background-color | Background color | `string` | - |
| direction | Scroll direction, optional values are `horizontal`, `vertical` | `NoticeBarScrollDirection` | `horizontal` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| close | Triggered when clicking the close button | - |
| next | Triggered when switching to the next text | `index: number` |
| click | Triggered when clicking the content area | `{ text: string, index: number }` |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| reset | Reset animation | - |

## Slots

| Name | Description |
| --- | --- |
| prefix | Custom prefix content; this slot is not effective when `prefix` property is passed |
| suffix | Custom suffix content; will override the default close icon |
| default | Custom notification text content; only effective when `direction='horizontal'` |

## External Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
