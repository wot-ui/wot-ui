# InputNumber 计数器

由增加按钮、减少按钮和输入框组成，用于在一定范围内输入或调整数字。

## 组件类型

### 基本用法

通过 `v-model` 绑定输入值，通过 `change` 事件监听数值变化。

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange({ value }) {
  console.log(value)
}
```

## 组件状态

### 禁用

设置 `disabled` 后，按钮和输入框都不可操作。

```html
<wd-input-number v-model="value" disabled />
```

### 禁用输入框

设置 `disable-input` 后，仅允许通过按钮调整数值。

```html
<wd-input-number v-model="value" disable-input @change="handleChange" />
```

### 禁用减号按钮

可以单独禁用减号按钮。

```html
<wd-input-number v-model="value" disable-minus @change="handleChange" />
```

### 禁用加号按钮

可以单独禁用加号按钮。

```html
<wd-input-number v-model="value" disable-plus @change="handleChange" />
```

## 组件变体

### 主题样式

通过 `theme` 切换不同视觉风格，可选值为 `default`、`primary`、`outline-split`、`outline`。

```html
<wd-input-number v-model="value1" theme="default" />
<wd-input-number v-model="value2" theme="primary" />
<wd-input-number v-model="value3" theme="outline-split" />
<wd-input-number v-model="value4" theme="outline" />
```

### 圆角样式

设置 `round` 后，可将按钮显示为圆角样式。

```html
<wd-input-number v-model="value" round theme="primary" />
```

## 组件样式

### 设置步长

设置 `step` 后，每次增减都会按对应步长变化。

```html
<wd-input-number v-model="value" :step="2" @change="handleChange" />
```

### 设置最小值与最大值

通过 `min` 和 `max` 控制可输入范围。

```html
<wd-input-number v-model="value" :min="3" :max="10" @change="handleChange" />
```

### 设置小数精度

通过 `precision` 控制结果精度。

```html
<wd-input-number v-model="value" :precision="1" :step="0.1" @change="handleChange" />
```

### 严格步进

设置 `step-strictly` 后，输入值会在变更完成时修正为 `step` 的倍数。

```html
<wd-input-number v-model="value" step-strictly :step="2" @change="handleChange" />
```

### 严格步进与边界限制

在同时设置 `step-strictly`、`min`、`max` 时，组件会自动修正到合法区间内最接近的步进值。

```html
<wd-input-number v-model="value" step-strictly :step="2" :min="3" :max="15" @change="handleChange" />
```

### 修改输入框宽度

通过 `input-width` 设置输入框宽度，支持数字和带单位字符串。

```html
<wd-input-number v-model="value" input-width="70px" @change="handleChange" />
```

## 特殊用法

### 无输入框

设置 `without-input` 后，仅展示加减按钮。

```html
<wd-input-number v-model="value" without-input @change="handleChange" />
```

### 允许空值

设置 `allow-null` 后，输入框允许为空，可配合 `placeholder` 使用。

```html
<wd-input-number v-model="value" allow-null placeholder="不限" input-width="70px" @change="handleChange" />
```

```typescript
const value = ref<number | string>('')
```

### 非允许空值但可临时删除

当 `allow-null` 为 `false` 时，输入框可以被临时清空，但在失焦后会自动修正回合法值。

```html
<wd-input-number v-model="value" :allow-null="false" :min="1" @change="handleChange" />
```

### 键盘弹起不上推页面

设置 `adjust-position="false"` 后，键盘弹起时不自动上推页面。

```html
<wd-input-number v-model="value" :adjust-position="false" @change="handleChange" />
```

### 非立即更新模式

设置 `immediate-change="false"` 后，输入框内容变化时不会立即触发 `change`，仅在失焦或点击按钮时触发。

```html
<wd-input-number v-model="value1" :immediate-change="true" @change="handleChange" />
<wd-input-number v-model="value2" :immediate-change="false" @change="handleChange" />
```

### 初始化时自动修正

设置 `update-on-init` 控制组件初始化时是否将值修正为符合规则的结果。

```html
<wd-input-number v-model="value1" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
<wd-input-number v-model="value2" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
```

### 异步变更

通过 `before-change` 可以在数值变化前进行校验和拦截。

```html
<wd-input-number v-model="value" :before-change="beforeChange" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-ui/components/wd-input-number/types'

const { loading, close } = useToast()
const value = ref<number>(1)

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: `正在更新到${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
```

### 长按加减

设置 `long-press` 后，支持长按按钮连续增减。

```html
<wd-input-number v-model="value" long-press @change="handleChange" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `number \| string` | - |
| min | 最小值 | `number` | `1` |
| max | 最大值 | `number` | `Number.MAX_SAFE_INTEGER` |
| step | 步进值 | `number` | `1` |
| step-strictly | 是否严格按步进值递增或递减 | `boolean` | `false` |
| precision | 数值精度 | `number \| string` | `0` |
| disabled | 是否禁用 | `boolean` | `false` |
| disable-input | 是否禁用输入框 | `boolean` | `false` |
| disable-minus | 是否禁用减号按钮 | `boolean` | `false` |
| disable-plus | 是否禁用加号按钮 | `boolean` | `false` |
| without-input | 是否不显示输入框 | `boolean` | `false` |
| input-width | 输入框宽度，支持数字和带单位字符串 | `number \| string` | - |
| allow-null | 是否允许输入值为空，设置为 `true` 后允许传入空字符串 | `boolean` | `false` |
| placeholder | 输入框占位文本 | `string` | `''` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| before-change | 数值变更前触发，返回 `false` 可阻止值更新，支持返回 `Promise<boolean>` | `(value: number \| string) => boolean \| Promise<boolean>` | - |
| long-press | 是否允许长按进行加减 | `boolean` | `false` |
| immediate-change | 是否立即响应输入变化，`false` 时仅在失焦或按钮点击时更新 | `boolean` | `true` |
| update-on-init | 是否在初始化时更新 `v-model` 为修正后的值 | `boolean` | `true` |
| input-type | 输入框类型，可选值为 `number`、`digit` | `'number' \| 'digit'` | `digit` |
| theme | 主题风格，可选值为 `default`、`outline`、`outline-split`、`primary` | `InputNumberTheme` | `default` |
| round | 是否启用圆角样式 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值修改时触发 | `{ value }` |
| focus | 输入框获取焦点时触发 | `{ value, height }` |
| blur | 输入框失去焦点时触发 | `{ value }` |
| update:modelValue | `v-model` 更新时触发 | `number \| string` |