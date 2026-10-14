# PasswordInput 密码输入框

带网格的密码输入组件，适用于支付密码、短信验证码等场景，通常与 [Keyboard 键盘](./keyboard.md) 组件配合使用。

`wd-password-input` 默认只展示输入值、光标和提示信息，录入交给 `wd-keyboard`。`wd-keyboard` 不能粘贴。需要粘贴、系统键盘，或在 H5 上使用短信验证码自动填充时，打开 `native-input`：组件会覆盖一层透明原生输入框，格子、掩码和长度限制保持不变。该能力默认关闭，关闭时行为与原来一致。通常将 `focused` 与键盘显隐状态绑定，并在 `focus` 事件中打开键盘。

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

### 原生输入

`native-input` 默认关闭。打开后可以直接粘贴，或使用系统键盘输入，适合短信验证码。粘贴会追加到已有内容后面，只保留数字（全角数字会转为半角），再截断到 `length`。短信验证码自动填充不依赖 `mask`，且只在 H5 设置：`autocomplete="one-time-code"`，并设置 `text-content-type="oneTimeCode"`。uni-app 的 H5 input 会把 `text-content-type` 映射成该 autocomplete。`text-content-type` 仅 App-nvue-iOS 支持，本组件是 Vue 页面，不会在 App-vue 上用它启用短信验证码建议。掩码只影响格子展示，不改变原生输入框类型。此模式下光标跟随原生输入框的聚焦状态，一般不再同时绑定 `wd-keyboard`，避免两套输入一起改值。

```html
<wd-password-input v-model="value" native-input :mask="false" :length="6" />
```

```typescript
import { ref } from 'vue'

const value = ref('')
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
| focused | 是否处于聚焦状态；聚焦时显示光标，通常与键盘显隐状态联动。`native-input` 开启时，光标改为跟随原生输入框聚焦 | `boolean` | `true` |
| native-input ^($LOWEST_VERSION$) | 是否启用原生输入。开启后支持粘贴和系统键盘。H5 上支持短信验证码自动填充，且不依赖 `mask`。粘贴追加到已有内容后过滤为数字，并截断到 `length` | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 点击密码输入框时触发；开启 `native-input` 后，在原生输入框聚焦时触发 | `event: Event` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
