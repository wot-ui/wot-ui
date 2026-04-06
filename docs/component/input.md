# Input 输入框

用户可以在文本框中输入内容。

## 组件类型

### 基本用法

通过 `v-model` 绑定输入值，通过 `placeholder` 设置占位提示。

```html
<wd-input v-model="value" type="text" placeholder="请输入用户名" @input="handleInput" />
```

```typescript
import { ref } from 'vue'

const value = ref('')

function handleInput(event) {
  console.log(event)
}
```

### 数字类型

将 `type` 设置为 `number` 后，仅允许输入数字。

```html
<wd-input v-model="value" type="number" />
```

## 组件状态

### 禁用

设置 `disabled` 后不可输入。

```html
<wd-input v-model="value" disabled />
```

### 只读

设置 `readonly` 后不可编辑，但仍会保留展示样式。

```html
<wd-input v-model="value" readonly />
```

### 错误状态

设置 `error` 后，输入内容会展示为错误态。

```html
<wd-input v-model="value" placeholder="请输入用户名" error />
```

## 组件变体

### 清空按钮

设置 `clearable` 后，在可清空条件满足时显示清空按钮。

```html
<wd-input v-model="value" clearable @clear="handleClear" />
```

### 聚焦时显示清空按钮

通过 `clear-trigger="focus"` 控制仅在输入框聚焦且有值时展示清空按钮。

:::warning 注意
支付宝小程序暂不支持 `clear-trigger`，且某些场景下清空按钮无法点击，可参考 [issue](https://github.com/ant-design/ant-design-mini/issues/1255)。
:::

```html
<wd-input v-model="value" clear-trigger="focus" clearable />
```

### 清空后不自动聚焦

通过 `focus-when-clear` 控制点击清空按钮后是否重新聚焦。

```html
<wd-input v-model="value" :focus-when-clear="false" clearable />
```

### 密码输入框

设置 `show-password` 后，可切换密码显隐状态。

```html
<wd-input v-model="value" clearable show-password />
```

## 内容形态

### 前后图标

通过 `prefix-icon` 和 `suffix-icon` 设置前后图标，图标名称可参考 [Icon](/component/icon)。

```html
<wd-input
  v-model="value"
  prefix-icon="sound"
  suffix-icon="send"
  clearable
  @clickprefixicon="handlePrefixClick"
  @clicksuffixicon="handleSuffixClick"
/>
```

### 后缀插槽

通过 `suffix` 插槽自定义后缀内容。

```html
<wd-input v-model="value" clearable placeholder="请输入">
  <template #suffix>
    <wd-button size="small">获取验证码</wd-button>
  </template>
</wd-input>
```

## 组件样式

### 字数限制

设置 `maxlength` 后，可以通过 `show-word-limit` 展示当前字数统计。

```html
<wd-input v-model="value" :maxlength="20" show-word-limit />
```

### 紧凑布局

设置 `compact` 后会移除输入框的默认内边距和背景，适合配合 `wd-cell` 或 `wd-form-item` 使用。

```html
<wd-input
  v-model="price"
  compact
  placeholder="请输入价格"
  custom-style="display: inline-block; width: 70px; vertical-align: middle;"
/>
<text style="margin-left: 8px;">元</text>
```

## 特殊用法

### 结合表单使用

当前表单场景推荐使用 `wd-form` 与 `wd-form-item` 承载标题、必填态与校验提示，`wd-input` 仅负责输入能力。

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="基本用法" prop="basic">
    <wd-input v-model="formData.basic" placeholder="请输入" compact />
  </wd-form-item>

  <wd-form-item title="自定义插槽" prop="slot" center>
    <wd-input v-model="formData.slot" placeholder="请输入" clearable compact>
      <template #suffix>
        <wd-button size="small">获取验证码</wd-button>
      </template>
    </wd-input>
  </wd-form-item>
</wd-form>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入框绑定值 | `string \| number` | `''` |
| type | 输入框类型，可选值为 `text`、`number`、`digit`、`idcard`、`safe-password`、`nickname`、`tel` | `InputType` | `text` |
| placeholder | 占位文本 | `string` | `请输入...` |
| placeholder-style | placeholder 样式，目前支持 `color`、`font-size`、`font-weight` | `string` | - |
| placeholder-class | placeholder 样式类 | `string` | `''` |
| maxlength | 最大输入长度 | `number` | 支付宝小程序无默认值，其余平台为 `-1` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| clear-trigger | 清空按钮显示时机，可选值为 `focus`、`always` | `InputClearTrigger` | `always` |
| focus-when-clear | 点击清空按钮后是否自动聚焦 | `boolean` | `true` |
| show-password | 是否显示密码切换按钮 | `boolean` | `false` |
| prefix-icon | 前置图标名称 | `string` | - |
| suffix-icon | 后置图标名称 | `string` | - |
| show-word-limit | 是否显示字数统计，需要同时设置 `maxlength` | `boolean` | `false` |
| error | 是否展示错误状态 | `boolean` | `false` |
| align-right | 输入内容是否右对齐 | `boolean` | `false` |
| compact | 是否开启紧凑模式；未显式设置时，在 `wd-form-item` 中会自动启用 | `boolean` | - |
| focus | 是否获取焦点 | `boolean` | `false` |
| cursor-spacing | 光标与键盘的距离 | `number` | `0` |
| cursor | 获取焦点时的光标位置 | `number` | `-1` |
| selection-start | 光标起始位置，需与 `selection-end` 搭配使用 | `number` | `-1` |
| selection-end | 光标结束位置，需与 `selection-start` 搭配使用 | `number` | `-1` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| hold-keyboard | 聚焦时点击页面是否保持键盘不收起 | `boolean` | `false` |
| confirm-type | 键盘右下角按钮文字，可选值为 `done`、`go`、`next`、`search`、`send` | `InputConfirmType` | `done` |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | `boolean` | `false` |
| always-embed | 是否强制 input 处于同层状态，仅微信小程序 iOS 生效 | `boolean` | `false` |
| ignore-composition-event | 是否忽略文本合成系统事件处理；为 `false` 时会触发 composition 相关事件，且合成期间会触发 `input` | `boolean` | `true` |
| inputmode | 输入模式提示，可选值为 `none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email`、`url` | `InputMode` | `text` |
| enable-native | 支付宝小程序下是否启用原生输入框，设为 `false` 可避免弹起键盘后内容上移 | `boolean` | `true` |
| custom-input-class | 输入框自定义类名 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### InputMode 可选值

`inputmode` 为 HTML 规范后期扩展能力，在符合条件的高版本 WebView 中可用于 uni-app 的 Web 与 App-Vue 平台，详见 [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode)。

| 值 | 说明 |
| --- | --- |
| none | 不弹出虚拟键盘 |
| text | 标准文本输入键盘 |
| decimal | 小数输入键盘 |
| numeric | 纯数字输入键盘 |
| tel | 电话输入键盘 |
| search | 搜索输入优化键盘 |
| email | 邮箱输入优化键盘 |
| url | URL 输入优化键盘 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 输入时触发 | `{ value, cursor, keyCode }` |
| focus | 聚焦时触发 | `{ value, height }` |
| blur | 失焦时触发 | `{ value }` |
| clear | 点击清空按钮时触发 | - |
| confirm | 点击键盘完成按钮时触发 | `{ value }` |
| keyboardheightchange | 键盘高度变化时触发 | `{ height, duration }` |
| clickprefixicon | 点击前置图标时触发 | - |
| clicksuffixicon | 点击后置图标时触发 | - |
| click | 点击组件根节点时触发 | `event: MouseEvent` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 自定义前置内容 |
| suffix | 自定义后置内容 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-input-class | 输入框样式类 |
