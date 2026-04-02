#  Switch 开关

用来打开或关闭选项。

## 组件类型

### 基本用法

`v-model` 为绑定值，默认为 boolean 类型。

```html
<wd-switch v-model="checked" />
```

```ts
const checked = ref<boolean>(true)
```

### 修改值

通过 `active-value` 属性修改开关打开时的值，`inactive-value` 属性修改开关关闭时的值。

```html
<wd-switch v-model="checked" active-value="沃特" inactive-value="商家后台" />
```

## 组件状态

### 加载状态

设置 `loading` 显示加载状态。

```html
<wd-switch v-model="checked" loading active-text="上班" inactive-text="下班" />
```

### 禁用状态

设置 `disabled` 禁用开关。

```html
<wd-switch v-model="checked" disabled />
```

## 组件样式

### 修改颜色

通过 `active-color` 属性修改开关打开时的颜色，`inactive-color` 属性修改开关关闭时的颜色。

```html
<wd-switch v-model="checked" active-color="#13ce66" inactive-color="#f00" />
```

### 文字描述

通过 `active-text` 和 `inactive-text` 设置开关内文案。

```html
<wd-switch v-model="checked" active-text="上班" inactive-text="下班" />
```

### 自定义显示图标

通过 `active-icon` 和 `inactive-icon` 自定义开关内部图标。

```html
<wd-switch v-model="checked" active-icon="check" inactive-icon="close" />
```

### 自定义动作图标

通过 `active-action-icon` 和 `inactive-action-icon` 自定义按钮图标。

```html
<wd-switch v-model="checked" active-action-icon="check" inactive-action-icon="close" />
```

### 形状

通过 `shape` 设置形状，可选值为 `round`、`square`。

```html
<wd-switch v-model="checked" shape="round" />
<wd-switch v-model="checked" shape="square" />
```

### 自定义大小

设置 `size` 修改开关大小。

```html
<wd-switch v-model="checked" size="24px" />
```

## 特殊样式

### 搭配表单使用

可以放入表单项中作为右侧操作控件。

```html
<wd-form-item title="搭配表单使用" center>
  <wd-switch v-model="checked" size="20" />
</wd-form-item>
```

### 修改前钩子

设置 `before-change` 属性，修改前钩子，接收目标 `value`，返回 `false` 表示不修改，支持返回 `Promise<boolean>`。

```html
<wd-switch v-model="checked" :before-change="beforeChange" @change="handleChange" />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const message = useDialog()

const beforeChange = (value) => {
  return message.confirm('是否切换开关').then(() => true).catch(() => false)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| inactive-action-icon | 非激活状态操作按钮图标 | `string` | - |
| active-action-icon | 激活状态操作按钮图标 | `string` | - |
| active-icon | 激活状态图标，设置后会忽略 `active-text` | `string` | - |
| inactive-icon | 非激活状态图标，设置后会忽略 `inactive-text` | `string` | - |
| active-text | 激活状态文本 | `string` | `''` |
| inactive-text | 非激活状态文本 | `string` | `''` |
| active-value | 激活值 | `boolean \| string \| number` | `true` |
| inactive-value | 非激活值 | `boolean \| string \| number` | `false` |
| active-color | 激活颜色 | `string` | - |
| inactive-color | 非激活颜色 | `string` | - |
| size | 开关大小 | `string \| number` | - |
| shape | 形状，可选值为 `round`、`square` | `SwitchShape` | `'round'` |
| loading | 是否显示加载中 | `boolean` | `false` |
| loading-props | 加载配置项 | `Partial<LoadingProps>` | - |
| before-change | 修改前钩子 | `SwitchBeforeChange` | - |
| class-prefix | 图标类名前缀 | `string` | `'wd-icon'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值修改事件 | `{ value }` |
