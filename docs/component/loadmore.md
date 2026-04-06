# loadmore 加载更多

用于在列表底部展示加载状态。

## 基本用法

在需要进行加载的列表的底部引入该组件即可。当滑动到列表底部时，通过设置`state`展示不同的文案。

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

## 自定义文案

通过设置`loading-text`、`finished-text`、`error-text`配合`state`展示不同状态时的文案

```html
<wd-loadmore custom-class="loadmore" state="loading" loading-text="自定义加载文案" />

<wd-loadmore custom-class="loadmore" state="finished" finished-text="自定义完成文案" />

<wd-loadmore custom-class="loadmore" state="error" error-text="自定义错误文案" />
```

## 点击继续加载

当 `state` 为 `error` 时，点击组件区域会触发 `reload` 事件。

```html
<wd-loadmore custom-class="loadmore" state="error" @reload="loadmore" />
```

## 应用实现

配合`onReachBottom`事件实现滚动到底部加载更多

```html
<view class="container">
  <view v-for="index in num" :key="index" class="list-item">
    <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
    <view class="right">这是一条测试{{ index + 1 }}</view>
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| state | 加载状态，可选值为 `loading`、`finished`、`error` | `LoadMoreState` | - |
| loading-text | 加载状态文案 | `string` | 国际化文案“正在努力加载中...” |
| finished-text | 加载完成文案 | `string` | 国际化文案“已加载完毕” |
| error-text | 加载失败文案；“点击重试”为组件内独立提示文案，不包含在该属性默认值中 | `string` | 国际化文案“加载失败” |
| loading-props | 内部 `wd-loading` 的属性配置，类型参见下方 `LoadingProps` | `Partial<LoadingProps>` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

#### LoadingProps

参见 [LoadingProps](/component/loading.html#attributes)。传入的 `customClass` 会自动追加 `wd-loadmore__loading` 类名。

## Slots

| name | 说明 |
| --- | --- |
| loading | 自定义加载中内容 |
| finished | 自定义加载完成内容 |
| error | 自定义加载失败内容 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| reload | `state` 为 `error` 时，点击组件触发 | - |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
