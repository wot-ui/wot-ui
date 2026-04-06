# LoadMore Load More

Used to display loading status at the bottom of lists.

## Basic Usage

Simply introduce this component at the bottom of the list that needs loading. When scrolling to the bottom of the list, display different text by setting `state`.

```html
<wd-loadmore custom-class="loadmore" state="loading" />

<wd-loadmore custom-class="loadmore" state="finished" />

<wd-loadmore custom-class="loadmore" state="error" />
```

```scss
:deep(.loadmore) {
  background-color: #f4f4f4;
  margin: 20px 0;
}
```

## Custom Text

Display text for different states by setting `loading-text`, `finished-text`, `error-text` in combination with `state`.

```html
<wd-loadmore custom-class="loadmore" state="loading" loading-text="Custom loading text" />

<wd-loadmore custom-class="loadmore" state="finished" finished-text="Custom finished text" />

<wd-loadmore custom-class="loadmore" state="error" error-text="Custom error text" />
```

## Click to Continue Loading

When `state` is `error`, clicking the component area triggers the `reload` event.

```html
<wd-loadmore custom-class="loadmore" state="error" @reload="loadmore" />
```

## Application Implementation

Implement loading more when scrolling to bottom in combination with `onReachBottom` event.

```html
<view class="container">
  <view v-for="index in num" :key="index" class="list-item">
    <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
    <view class="right">This is a test {{ index + 1 }}</view>
  </view>
  <wd-loadmore :state="state" @reload="loadmore" />
</view>
```

```typescript
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'


const state = ref<string>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

onReachBottom(() => {
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    loadmore()
  } else if (num.value === max.value) {
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 200)
}
```

```scss
.list-item {
  position: relative;
  display: flex;
  padding: 10px 15px;
  background: #fff;
  color: #464646;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: 1px;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #eee;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| state | Loading state, optional values are `loading`, `finished`, `error` | `LoadMoreState` | - |
| loading-text | Loading state text | `string` | Internationalized text "Loading..." |
| finished-text | Loading finished text | `string` | Internationalized text "Loaded" |
| error-text | Loading failed text; "Click to retry" is an independent prompt text within the component, not included in this property's default value | `string` | Internationalized text "Loading failed" |
| loading-props | Internal `wd-loading` property configuration, type see `LoadingProps` below | `Partial<LoadingProps>` | - |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

#### LoadingProps

See [LoadingProps](/component/loading.html#attributes). The passed `customClass` will automatically append the `wd-loadmore__loading` class name.

## Slots

| name | Description |
| --- | --- |
| loading | Custom loading content |
| finished | Custom loaded content |
| error | Custom error content |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| reload | Triggered when clicking component when `state` is `error` | - |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
