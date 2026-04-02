# SwipeAction 滑动操作

常用于单元格左右滑删除等手势操作。

:::warning
滑动操作组件对页面的功能隐藏较深，用户难以发现，建议优先使用更直接的交互方式，例如列表项按钮或 ActionSheet。

如果仍然使用滑动操作，建议在用户进入页面时提供显式提示，告知列表项支持左右滑动。
:::

## 组件类型

### 基本用法

`wd-swipe-action` 由三部分组成：左侧操作区、内容区、右侧操作区。左右操作区分别通过 `left` 和 `right` 插槽定义，内容区使用默认插槽。

在页面根节点上监听点击事件，并结合 `useQueue` 提供的 `closeOutside`，可以在点击组件外部区域时统一关闭已展开的滑动项。

:::warning
如果页面上存在“点击按钮后手动展开 `swipe-action`”之类的交互，需要在这些按钮外层使用 `@click.stop` 阻止事件冒泡，避免触发根节点上的 `closeOutside`。
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-swipe-action>
    <wd-cell title="标题文字" value="内容" />
    <template #right>
      <view class="action">
        <view class="button" style="background: #E2231A;" @click="handleAction('操作1')">操作1</view>
        <view class="button" style="background: #FFB300;" @click="handleAction('操作2')">操作2</view>
        <view class="button" style="background: #4D80F0;" @click="handleAction('操作3')">操作3</view>
      </view>
    </template>
  </wd-swipe-action>
</view>
```

```ts [ts]
import { useToast, useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const toast = useToast()

function handleAction(action: string) {
  toast.show(`点击了${action}`)
}
```

```scss [scss]
.action {
  height: 100%;
}

.button {
  display: inline-block;
  padding: 0 15px;
  height: 100%;
  color: #fff;
  line-height: 44px;
}
```

:::

### 左右滑动

通过 `left` 和 `right` 插槽可以同时配置左右两侧操作区。

```html
<wd-swipe-action>
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作4</view>
      <view class="button" style="background: #FFB300;">操作5</view>
      <view class="button" style="background: #4D80F0;">操作6</view>
    </view>
  </template>
</wd-swipe-action>
```

## 组件状态

### 禁用滑动按钮

设置 `disabled` 后，组件不会响应滑动和点击关闭相关交互。

```html
<wd-swipe-action disabled>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
</wd-swipe-action>
```

## 特殊样式

### 切换按钮

通过 `v-model` 可以直接控制当前展开状态，可选值为 `left`、`close`、`right`，分别表示展开左侧、收起全部、展开右侧。

::: code-group

```html [vue]
<wd-swipe-action v-model="value">
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作4</view>
      <view class="button" style="background: #FFB300;">操作5</view>
      <view class="button" style="background: #4D80F0;">操作6</view>
    </view>
  </template>
</wd-swipe-action>

<view class="button-group">
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('left')">打开左边</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('close')">关闭所有</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('right')">打开右边</wd-button>
  </view>
</view>
```

```ts [ts]
import { ref } from 'vue'
import type { SwipeActionStatus } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const value = ref<SwipeActionStatus>('close')

function changeState(position: SwipeActionStatus) {
  value.value = position
}

function noop() {}
```

:::

### 按钮关闭前的钩子函数

`before-close` 会在组件执行关闭逻辑前触发，可用于关闭前校验或异步确认。

钩子函数接收两个参数：

- `reason`：关闭原因，可选值为 `click`、`swipe`、`value`
- `position`：关闭位置，可选值为 `left`、`right`、`inside`

其中 `inside` 表示点击了内容区域内部但不属于左右操作按钮的位置。

需要显式返回 `true` 或 `Promise<true>` 才会继续关闭，返回 `false` 或 `Promise<false>` 会阻止关闭。

::: code-group

```html [vue]
<wd-swipe-action :before-close="beforeClose">
  <wd-cell title="标题文字" value="阻止点击内容区关闭" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">删除</view>
      <view class="button" style="background: #FFB300;">标记</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts [ts]
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionBeforeClose } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

const beforeClose: SwipeActionBeforeClose = (reason, position) => {
  return new Promise((resolve) => {
    const shouldClose = !(reason === 'click' && position === 'inside')

    if (!shouldClose) {
      toast.show('已拦截点击内容区导致的关闭')
      resolve(false)
    } else {
      toast.loading('处理中...')
      setTimeout(() => {
        toast.close()
        if (reason === 'click') {
          toast.show(`${reason} ${position} 导致滑动按钮关闭`)
        } else {
          toast.show(`${reason} 导致 ${position} 滑动按钮关闭`)
        }
        resolve(true)
      }, 3000)
    }
  })
}
```

:::

### 点击事件

`click` 事件会在已展开状态下点击内容区、左侧操作区或右侧操作区，并且关闭成功后发出；若被 `before-close` 拦截则不会触发。

```html
<wd-swipe-action @click="handleClick">
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionClickEvent } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

function handleClick({ value }: SwipeActionClickEvent) {
  toast.show(`点击 ${value} 关闭操作按钮`)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前滑动状态，可选值为 `left`、`close`、`right` | `SwipeActionStatus` | `close` |
| disabled | 是否禁用滑动操作 | `boolean` | `false` |
| before-close | 关闭前拦截函数，接收 `(reason, position)`，返回 `true` 或 `Promise<boolean>` 时继续关闭，返回 `false` 时阻止关闭 | `SwipeActionBeforeClose` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 已展开状态下点击内容区或操作区并关闭时触发 | `SwipeActionClickEvent` |
| update:modelValue | 滑动状态变化时触发 | `SwipeActionStatus` |

## Methods

通过组件实例可以调用以下方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| close | 关闭已展开的操作按钮 | `reason: SwipeActionReason, position?: SwipeActionPosition` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧操作区 |
| default | 自定义内容区 |
| right | 自定义右侧操作区 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |
