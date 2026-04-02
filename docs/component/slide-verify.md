---
version: 1.14.0
---

# SlideVerify 滑动验证

滑动验证组件，用于人机验证场景。

## 组件类型

### 基本用法

```html
<wd-slide-verify @success="handleSuccess" @fail="handleFail" />
```

```ts
const toast = useToast()

function handleSuccess() {
  toast.success('验证成功')
}

function handleFail() {
  toast.error('验证失败，请重试')
}
```

## 组件状态

### 禁用状态

设置 `disabled` 后禁用滑动验证。

```html
<wd-slide-verify disabled />
```

## 组件样式

### 自定义文案

通过 `text` 和 `success-text` 属性自定义提示文字。

```html
<wd-slide-verify text="请拖动滑块" success-text="验证成功" />
```

### 自定义颜色

通过 `background-color` 和 `active-background-color` 属性自定义颜色。

```html
<wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
```

### 自定义图标

通过 `icon` 和 `success-icon` 属性自定义图标。

```html
<wd-slide-verify icon="arrow-right" success-icon="thumb-up-fill" />
```

## 特殊样式

### 自定义容错范围

通过 `tolerance` 属性设置容错范围（单位：px），默认为 10px。

```html
<wd-slide-verify :tolerance="20" />
```

### 重置方法

通过 `ref` 获取组件实例，调用 `reset` 方法重置验证状态。

```html
<wd-slide-verify ref="slideVerifyRef" @success="handleSuccess" @fail="handleFail" />
<wd-button type="primary" @click="handleReset">重置</wd-button>
```

```ts
import { ref } from 'vue'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleReset() {
  slideVerifyRef.value?.reset()
}
```

### 插槽用法

支持通过插槽自定义内容。

```html
<wd-slide-verify>
  <template #text>
    <text>向右滑动完成验证</text>
  </template>
  <template #success-text>
    <text>验证通过</text>
  </template>
  <template #icon>
    <view>ICON</view>
  </template>
  <template #success-icon>
    <view style="color: red">OK</view>
  </template>
</wd-slide-verify>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tolerance | 容错范围，单位为 `px` | number | `10` |
| text | 提示文字，为空时显示内置文案 | string | `''` |
| success-text | 验证成功提示文字，为空时显示内置文案 | string | `''` |
| disabled | 是否禁用 | boolean | `false` |
| background-color | 背景颜色 | string | - |
| active-background-color | 激活时的背景颜色 | string | - |
| icon | 滑块图标名称 | string | `double-right` |
| success-icon | 成功图标名称 | string | `check-circle-fill` |
| icon-size | 图标大小 | string / number | - |
| success-icon-size | 成功图标大小 | string / number | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| success | 验证成功时触发 | - |
| fail | 验证失败时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| init | 初始化尺寸信息 | - |
| reset | 重置验证组件到初始状态 | - |

## Slots

| name | 说明 |
| --- | --- |
| text | 自定义提示文字内容 |
| success-text | 自定义验证成功提示文字内容 |
| icon | 自定义滑块图标 |
| success-icon | 自定义成功图标 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |
