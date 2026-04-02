# NoticeBar 通知栏

通知栏组件，用于在页面顶部展示通知提醒。

## 组件类型

### 基本用法

设置 `text` 文本内容和 `prefix` 左侧图标。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" />
```

## 组件变体

### 类型修改

设置 `type` 可修改通知类型，通知类型共有三种 `info`|`warning`|`danger`，默认值为`warning`。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="check-outline" type="info" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="wifi-error" type="danger" />
```

```scss
:deep(.space) {
  margin-bottom: 10px;
}
```

### 可关闭的

设置 `closable` 属性，使通知栏可以关闭。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" closable />
```

## 内容形态

### 禁止滚动

设置 `scrollable` 为 `false` 可以关闭滚动效果，通知栏会保持静态展示。

```html
<wd-notice-bar text="欲买桂花同载酒，终不似，少年游" :scrollable="false" prefix="stop" />
```

### 插槽演示

未传 `prefix` 属性时，可以通过 `prefix` 插槽自定义左侧内容；`suffix` 插槽会覆盖默认的关闭图标区域。

```html
<wd-notice-bar :scrollable="false">
  <template #prefix>
    <wd-icon class="prefix" name="warn-bold">占位符</wd-icon>
  </template>
  通知被禁或时段内消息屏蔽可能造成消…
  <template #suffix>
    <div style="color: #4d80f0">查看</div>
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

### 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable` 即可开启多行展示。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" wrapable :scrollable="false" />
```

## 组件样式

### 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

## 特殊用法

### 多文本轮播

将一个`string[]`传递给`text`属性，即可开启多文本轮播，并且会在展示下一条文本时触发`next`事件，该事件接收一个`number`参数，代表的是当前展示的文本数组索引

```html
<wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
```

```javascript
import { ref } from 'vue'

const textArray = ref([
  '欢迎使用wot design uni',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/wot-ui/wot-ui',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

const onNext = (index: number) => {
  console.log('展示下一条，index: ', index)
  console.log('文本是：' + textArray.value[index])
}
```

### 垂直滚动

1. `direction`传递`vertical`即可开启垂直滚动，目前仅支持一个方向的垂直滚动
2. `text`为数组时才会进行滚动

```html
<wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
<wd-notice-bar prefix="warn-bold" direction="vertical" text="只有一条消息不会滚动" :delay="3" custom-class="space" />
```

### 点击事件

点击通知内容区时会触发 `click` 事件，返回当前展示文本和对应索引。

```html
<wd-notice-bar :text="textArray" prefix="thunderbolt" @click="handleClick" />
```

```ts
function handleClick(result: { text: string; index: number }) {
  console.log(result)
}
```

### 重置播放动画 ^(1.3.13)

通过`ref`获取组件实例，调用`reset`方法即可重置播放动画。当你遇到`NoticeBar`的播放动画异常的情况时，可以调用`reset`方法重置动画。  

例如：在`APP-VUE`端，`Tabbar`页面使用`NoticeBar`时，从其它界面返回到`NoticeBar`页面，会偶发`NoticeBar`动画异常，此时可以调用`reset`方法重置动画。

参考issues：[#358](https://github.com/Moonofweisheng/wot-design-uni/issues/358)、[#650](https://github.com/Moonofweisheng/wot-design-uni/issues/650)

```html
<wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
<wd-button @click="handleReset">重置播放动画</wd-button>
```

```ts
// uni_modules
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
// npm
// import { type NoticeBarInstance } from 'wot-design-uni/components/wd-notice-bar/types'

const notice = ref<NoticeBarInstance>()

const textArray = ref([
  '欢迎使用wot design uni',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/wot-ui/wot-ui',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

function handleReset() {
  notice.value?.reset()
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 通知栏文案 | `string \| string[]` | `''` |
| type | 通知栏类型，可选值为 `warning`、`info`、`danger` | `NoticeBarType` | `warning` |
| prefix | 左侧图标名称 | `string` | - |
| scrollable | 是否开启滚动播放 | `boolean` | `true` |
| delay | 滚动动画初始延时，单位为秒 | `number` | `1` |
| speed | 滚动速度，单位为 `px/s` | `number` | `50` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| wrapable | 是否换行展示；仅在 `scrollable=false` 的横向模式下生效 | `boolean` | `false` |
| color | 文字和图标颜色 | `string` | - |
| background-color | 背景颜色 | `string` | - |
| direction | 滚动方向，可选值为 `horizontal`、`vertical` | `NoticeBarScrollDirection` | `horizontal` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮时触发 | - |
| next | 切换到下一条文本时触发 | `index: number` |
| click ^(1.2.16) | 点击内容区时触发 | `{ text: string, index: number }` |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| reset ^(1.3.13) | 重置播放动画 | - |

## Slots

| name | 说明 |
| --- | --- |
| prefix | 自定义前置内容；传入 `prefix` 属性时该插槽不生效 |
| suffix | 自定义后置内容；会覆盖默认关闭图标 |
| default | 自定义通知文本内容；仅在 `direction='horizontal'` 时生效 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
