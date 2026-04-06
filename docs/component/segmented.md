# Segmented 分段器

分段器用于展示多个选项并允许用户选择其中单个选项。

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## 组件类型

### 基本用法

通过 `options` 设置选项列表，通过 `v-model:value` 绑定当前选中项。

```vue
<wd-segmented :options="list" v-model:value="current"></wd-segmented>
```

```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])

const current = ref('点赞')
```

## 组件状态

### 禁用

设置 `disabled` 属性禁用整个分段器。

```html
<wd-segmented :options="list" v-model:value="current" disabled></wd-segmented>
```

## 组件变体

### 轮廓主题

通过 `theme="outline"` 切换为轮廓样式。

```html
<wd-segmented :options="list" v-model:value="current" theme="outline"></wd-segmented>
```

## 组件样式

### 自定义渲染分段器标签

使用插槽 `label` 可以自定义渲染分段器的标签内容。

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
    value: '李雷',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/redpanda.jpg'
    }
  },
  {
    value: '韩梅梅',
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

## 特殊样式

### 带振动效果的分段器

设置 `vibrate-short` 后，切换选项时会触发短振动反馈。

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true"></wd-segmented>
```

### 在弹出框中使用
微信小程序端，在弹出框中使用本组件时，需要调用 `updateActiveStyle` 方法更新分段器样式，参见[常见问题](/guide/common-problems.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%8A%E4%BD%BF%E7%94%A8popup%E3%80%81actionsheet%E3%80%81dropdownitem%E7%AD%89%E5%BC%B9%E5%87%BA%E6%A1%86%E7%BB%84%E4%BB%B6%E5%8C%85%E8%A3%B9slider%E3%80%81tabs%E7%AD%89%E7%BB%84%E4%BB%B6%E6%97%B6-slider%E3%80%81tabs%E8%A1%A8%E7%8E%B0%E5%BC%82%E5%B8%B8)。


```html
<wd-button @click="handleClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">在弹出框中使用</view>
  <wd-segmented :options="list" v-model:value="current" ref="segmentedRef"></wd-segmented>
</wd-popup>
```
```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])
const current = ref('点赞')

const segmentedRef = ref<SegmentedInstance>() // 获取分段器实例
const showPopup = ref(false) // 控制popup显示
/**
 * 点击按钮打开popup
 */
function handleClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model:value | 当前选中的值 | `string \| number` | - |
| disabled | 是否禁用分段器 | `boolean` | `false` |
| options | 数据集合 | `string[] \| number[] \| SegmentedOption[]` | `[]` |
| theme | 分段器主题，可选值为 `card`、`outline` | `string` | `'card'` |
| vibrate-short | 切换选项时是否触发短振动 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### SegmentedOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| payload | 附加数据，可用于插槽渲染 | `any` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选项切换时触发 | `SegmentedOption` |
| click | 选项点击时触发 | `SegmentedOption` |

## Methods

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| updateActiveStyle | 更新滑块偏移量，参数 `animation` 用于控制是否启用动画，默认开启 | `(animation?: boolean) => void` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| label | 选项标签内容 | `{ option: SegmentedOption }` |

