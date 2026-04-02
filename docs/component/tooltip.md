# Tooltip 文字提示

用于展示简短提示信息，支持多方向定位、受控显隐、自定义内容和动态更新位置。

## 组件类型

### 基本用法

`placement` 用于控制提示出现位置，支持 12 种方向组合。

::: warning 注意
由于 `uni-app` 组件无法天然监听点击自身以外的区域，页面中如果需要点击空白处自动关闭 `tooltip`，建议配合 `useQueue()` 在根节点上统一处理 `closeOutside()`。
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-tooltip placement="top" content="top 提示文字">
    <wd-button>top</wd-button>
  </wd-tooltip>
</view>
```

```ts [ts]
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
```

:::

### 显示关闭按钮

通过 `show-close` 在提示层内部显示关闭按钮。

```html
<wd-tooltip content="显示关闭按钮" placement="right" show-close>
  <wd-button>显示关闭按钮</wd-button>
</wd-tooltip>
```

## 组件状态

### 控制显隐

通过 `v-model` 手动控制 `tooltip` 打开和关闭。

::: code-group

```html [vue]
<wd-button plain size="small" @click.stop="control">
  {{ show ? '关闭' : '打开' }}
</wd-button>

<wd-tooltip placement="top" content="控制显隐" v-model="show">
  <wd-button>top</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'

const show = ref(false)

function control() {
  show.value = !show.value
}
```

:::

### 禁用

设置 `disabled` 后，点击目标元素不会再显示提示层。

```html
<wd-tooltip placement="right-end" content="禁用" disabled>
  <wd-button>禁用</wd-button>
</wd-tooltip>
```

## 内容形态

### 多行内容

使用 `content` 插槽时，需要同时开启 `use-content-slot`，适合展示多行文本或自定义布局。

::: warning 注意
使用 `content` 插槽时，组件内部无法自动推断复杂内容的最终尺寸。若内容大小发生变化，建议通过实例方法 `updatePosition()` 重新计算定位。
:::

```html
<wd-tooltip placement="right" use-content-slot>
  <wd-button>多行文本</wd-button>
  <template #content>
    <view class="lines-content">
      <view>多行文本1</view>
      <view>多行文本2</view>
      <view>多行文本3</view>
    </view>
  </template>
</wd-tooltip>
```

## 特殊样式

### 动态内容与位置更新

当提示内容尺寸会动态变化时，可通过组件实例的 `updatePosition()` 手动刷新定位。

::: code-group

```html [vue]
<wd-tooltip placement="right" use-content-slot ref="tooltipRef">
  <template #content>
    <view class="lines-content" :style="{ width: dynamicTooltipWidth + 'px' }">
      <view style="margin-bottom: 10px">当前宽度: {{ dynamicTooltipWidth }}px</view>
      <wd-button size="small" @click="changeTooltipSize">改变大小</wd-button>
    </view>
  </template>
  <wd-button>动态内容</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'
import type { TooltipInstance } from '@/uni_modules/wot-ui/components/wd-tooltip/types'

const tooltipRef = ref<TooltipInstance>()
const dynamicTooltipWidth = ref(90)

function changeTooltipSize() {
  dynamicTooltipWidth.value = dynamicTooltipWidth.value === 90 ? 150 : 90
  setTimeout(() => {
    tooltipRef.value?.updatePosition()
  }, 50)
}
```

:::

### 绑定事件

可通过 `open`、`close`、`change` 监听提示状态变化。

```html
<wd-tooltip placement="right-end" :content="content" @open="onShow" @close="onHide" @change="handleChange">
  <wd-button>事件</wd-button>
</wd-tooltip>
```

## Tooltip Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 是否显示提示层，支持 `v-model` | `boolean` | `false` |
| content | 提示内容，也可以通过 `content` 插槽传入 | <code>string &#124; Array&lt;Record&lt;string, any&gt;&gt;</code> | - |
| placement | 提示位置，可选值为 `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `PlacementType` | `bottom` |
| offset | 位置偏移量，支持数字、数组或对象配置 | `PopoverOffset` | `0` |
| visible-arrow | 是否显示箭头 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |
| custom-arrow | 箭头自定义类名 | `string` | `''` |
| custom-pop | 提示层自定义类名 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tooltip Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 提示层显示时触发 | - |
| close | 提示层关闭时触发 | - |
| change | 显隐状态变化时触发 | `{ show: boolean }` |
| update:modelValue | 显隐状态变化时触发 | `boolean` |

## Tooltip Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开提示层 | - | - |
| close | 关闭提示层 | - | - |
| updatePosition | 重新测量弹层尺寸并更新定位 | - | - |

## Tooltip Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发提示层的目标内容 |
| content | 自定义提示层内容 |
