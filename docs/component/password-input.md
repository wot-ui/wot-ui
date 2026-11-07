# PasswordInput 密码输入框

带网格的密码输入组件，适用于支付密码、短信验证码等场景，通常与 [Keyboard 键盘](./keyboard.md) 组件配合使用。

`wd-password-input` 仅负责展示输入值、光标和提示信息，不直接处理录入逻辑。通常将 `focused` 与键盘显隐状态绑定，并在 `focus` 事件中打开键盘。

## 组件类型

### 基础用法

搭配 `wd-keyboard` 组件实现密码输入。

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref } from 'vue'

const value = ref<string>('123')
const showKeyboard = ref<boolean>(false)
```

## 组件变体

### 自定义长度

通过 `length` 设置密码位数，并同步设置键盘的 `maxlength`。

```html
<wd-password-input v-model="value" :length="4" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" />
```

## 组件样式

### 格子间距

通过 `gutter` 设置格子之间的间距，默认单位为 `px`。

```html
<wd-password-input v-model="value" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

## 内容形态

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入内容，适用于短信验证码等场景。

```html
<wd-password-input v-model="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

### 提示信息

通过 `info` 设置普通提示信息，通过 `error-info` 设置错误提示。

```html
<wd-password-input
  v-model="value"
  info="密码为 6 位数字"
  :error-info="errorInfo"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref, watch } from 'vue'

const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(false)

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
```

## 特殊用法

### 随机键盘

结合 `wd-keyboard` 的 `random-key-order` 能力，可以提升数字输入场景的安全性。

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" random-key-order />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入值 | `string` | `''` |
| mask | 是否隐藏密码内容 | `boolean` | `true` |
| info | 输入框下方文字提示 | `string` | `''` |
| error-info | 输入框下方错误提示 | `string` | `''` |
| gutter | 输入框格子之间的间距，默认单位为 `px` | `number \| string` | `0` |
| length | 密码长度 | `number` | `6` |
| focused | 是否处于聚焦状态；聚焦时显示光标，通常与键盘显隐状态联动 | `boolean` | `true` |
| glass | 是否启用玻璃（glassmorphism）样式 | boolean | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 点击密码输入框时触发 | `event: Event` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
