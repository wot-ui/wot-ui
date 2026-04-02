---
version: 1.14.0
---

# Tour 漫游组件

用于分步骤引导用户了解页面功能，可高亮目标元素并在其附近展示说明面板。

::: tip 提示
Tour 组件演示 demo 在 iframe 中表现异常，可以点击 demo 左上角箭头单独查看。 
:::

## 组件类型

### 基本用法

通过 `steps` 定义引导步骤，通过 `v-model` 控制显隐，通过 `v-model:current` 同步当前步骤索引。

::: code-group

```html [vue]
<wd-tour v-model="showBasicTour" :steps="basicSteps" v-model:current="current" :padding="10" @finish="handleFinish" @change="handleChange" />
```

```ts [ts]
import type { TourChangeDetail, TourStep } from '@/uni_modules/wot-ui/components/wd-tour/types'
import { ref } from 'vue'

const showBasicTour = ref(false)
const current = ref(0)

const basicSteps: TourStep[] = [
  {
    element: '#step1',
    content: '欢迎使用引导组件，这是第一步的说明'
  },
  {
    element: '#step2',
    content: '这是第二步，展示了另一个功能点'
  }
]

function handleChange({ current }: TourChangeDetail) {
  console.log('当前步骤:', current)
}

function handleFinish() {
  showBasicTour.value = false
}
```

:::

## 组件状态

### 点击蒙版继续

设置 `click-mask-next` 后，点击遮罩层会自动进入下一步。

```html
<wd-tour v-model="showClickMaskTour" :steps="basicSteps" :click-mask-next="true" />
```

### 关闭蒙版

设置 `mask` 为 `false` 后，仅保留高亮区域与说明面板，不再显示整页遮罩。

```html
<wd-tour v-model="showNoMaskTour" :steps="noMaskSteps" :mask="false" />
```

## 组件样式

### 自定义蒙版

可以通过 `mask-color`、`offset`、`border-radius`、`padding` 等属性调整高亮区域和遮罩表现。

```html
<wd-tour
  v-model="showCustomMaskTour"
  :steps="customMaskSteps"
  mask-color="red"
  :offset="40"
  :border-radius="15"
  :padding="10"
  next-text="下一步"
  prev-text="上一步"
  skip-text="跳过"
  finish-text="完成"
/>
```

### 自定义高亮区域

通过 `highlight` 插槽可以完全接管高亮区域渲染。

::: code-group

```html [vue]
<wd-tour v-model="showCustomHighlightTour" :steps="customHighlightSteps" :padding="10">
  <template #highlight="{ elementInfo }">
    <view class="custom-highlight" :style="`${objToStyle(elementInfo)};${objToStyle(customHighlightStyle)}`"></view>
  </template>
</wd-tour>
```

```ts [ts]
import { objToStyle } from '@/uni_modules/wot-ui/common/util'

const customHighlightStyle = {
  border: '2px dashed #ff0000',
  borderRadius: '8px',
  background: 'rgba(255, 0, 0, 0.1)',
  boxSizing: 'border-box'
}
```

:::

### 自定义内容和按钮

支持通过 `content`、`prev`、`next`、`skip`、`finish` 插槽自定义引导内容和操作按钮。

```html
<wd-tour v-model="showCustomContentTour" :steps="customContentSteps" next-text="继续" prev-text="返回" skip-text="跳过" finish-text="知道了">
  <template #content>
    <view class="custom-content">
      <wd-icon name="help-circle-filled" size="22px"></wd-icon>
      <text class="custom-text">自定义引导内容区域</text>
    </view>
  </template>

  <template #next>
    <view class="custom-button custom-next">下一步</view>
  </template>

  <template #finish>
    <view class="custom-button custom-finish">完成</view>
  </template>
</wd-tour>
```

## 特殊样式

### 控制当前步骤

通过 `v-model:current` 可在外部直接跳转到指定步骤。

```ts
const controlCurrent = ref(0)

function startControlTour() {
  controlCurrent.value = 2
  showControlTour.value = true
}
```

## Tour Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 是否显示引导组件，支持 `v-model` | `boolean` | `false` |
| steps | 引导步骤列表 | <code>TourStep[]</code> | `[]` |
| current | 当前步骤索引，支持 `v-model:current` | `number` | `0` |
| mask | 是否显示蒙版 | `boolean` | `true` |
| mask-color | 蒙版颜色 | `string` | - |
| offset | 引导面板与高亮区域的间距 | `number` | `20` |
| duration | 动画时长，单位毫秒 | `number` | `300` |
| border-radius | 高亮区域圆角 | `number` | `4` |
| padding | 高亮区域内边距 | `number` | `8` |
| prev-text | 上一步按钮文案 | `string` | `上一步` |
| next-text | 下一步按钮文案 | `string` | `下一步` |
| skip-text | 跳过按钮文案 | `string` | `跳过` |
| finish-text | 完成按钮文案 | `string` | `完成` |
| bottom-safety-offset | 底部安全偏移量，用于滚动计算 | `number` | `100` |
| top-safety-offset | 顶部安全偏移量，用于滚动计算 | `number` | `0` |
| custom-nav | 是否启用自定义导航栏模式 | `boolean` | `false` |
| click-mask-next | 点击遮罩层是否进入下一步 | `boolean` | `false` |
| highlight-style | 默认高亮区域样式 | <code>CSSProperties</code> | `{}` |
| z-index | 层级 | `number` | - |
| show-tour-buttons | 是否显示引导按钮 | `boolean` | `true` |
| scope | 查询作用域，限定选择器查找范围 | `unknown` | - |
| missing-strategy | 目标元素缺失时的处理策略，可选值为 `skip`、`stop`、`hide` | `MissingStrategy` | `stop` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## TourStep Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| element | 需要高亮的元素选择器 | `string` | - |
| content | 步骤说明，支持 `rich-text` 渲染 | `string` | - |
| padding | 覆盖当前步骤的高亮内边距 | `number` | - |
| offset | 覆盖当前步骤的面板间距 | `number` | - |
| placement | 强制指定提示位置，可选值为 `auto`、`top`、`bottom`、`left`、`right` | `TourPlacement` | `auto` |

## Tour Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前步骤变化时触发 | `{ current: number }` |
| prev | 点击上一步时触发 | `{ prevCurrent, current, total, isElementInTop }` |
| next | 点击下一步时触发 | `{ prevCurrent, current, total, isElementInTop }` |
| finish | 点击完成时触发 | `{ current, total }` |
| skip | 点击跳过时触发 | `{ current, total }` |
| error | 目标元素查询失败时触发 | `{ message, element }` |
| update:modelValue | 显隐状态变化时触发 | `boolean` |
| update:current | 当前步骤变化时触发 | `number` |

## Tour Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| handlePrev | 切换到上一步 | - | - |
| handleNext | 切换到下一步 | - | - |
| handleFinish | 完成引导并关闭组件 | - | - |
| handleSkip | 跳过引导并关闭组件 | - | - |

## Tour Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| highlight | 自定义高亮区域 | `{ elementInfo }` |
| content | 自定义引导内容 | - |
| prev | 自定义上一步按钮 | - |
| next | 自定义下一步按钮 | - |
| skip | 自定义跳过按钮 | - |
| finish | 自定义完成按钮 | - |
