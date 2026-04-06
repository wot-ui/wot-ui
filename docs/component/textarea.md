# Textarea 文本域

用于输入多行文本信息，支持清空、字数统计、高度自适应与紧凑布局。

## 组件类型

### 基本用法

通过 `v-model` 绑定文本域内容，通过 `placeholder` 设置占位提示。

```html
<wd-textarea v-model="value" placeholder="请填写评价" />
```

```typescript
import { ref } from 'vue'

const value = ref('')
```

## 组件状态

### 只读

通过 `readonly` 设置文本域为只读状态。

```html
<wd-textarea v-model="value" readonly clearable />
```

### 禁用

通过 `disabled` 禁用文本域。

```html
<wd-textarea v-model="value" disabled clearable />
```

## 组件变体

### 清空按钮与字数限制

通过 `clearable` 开启清空按钮，通过 `maxlength` 与 `show-word-limit` 展示字数统计。

```html
<wd-textarea v-model="value" :maxlength="120" clearable show-word-limit />
```

### 聚焦时显示清空按钮

通过 `clear-trigger="focus"` 控制仅在聚焦且有值时显示清空按钮。

:::warning 注意
支付宝小程序暂不支持 `clear-trigger`，且某些场景下清空按钮无法点击，可参考 [issue](https://github.com/ant-design/ant-design-mini/issues/1255)。
:::

```html
<wd-textarea v-model="value" clear-trigger="focus" :maxlength="120" clearable show-word-limit />
```

### 清空后不自动聚焦

通过 `focus-when-clear` 控制点击清空按钮后是否自动聚焦。

```html
<wd-textarea v-model="value" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
```

### 高度自适应

通过 `auto-height` 让文本域高度随内容变化。

```html
<wd-textarea v-model="value" auto-height clearable />
```

## 组件样式

### 紧凑布局

设置 `compact` 后会移除默认内边距和背景，适合与 `wd-form-item` 等容器配合使用。

```html
<wd-textarea v-model="value" compact placeholder="请填写评价" />
```

## 特殊样式

### 结合表单使用

当前表单场景推荐由 `wd-form` 与 `wd-form-item` 承载标题、必填态与校验提示，`wd-textarea` 仅负责多行输入能力。

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="基本用法" prop="basic">
    <wd-textarea v-model="formData.basic" placeholder="请输入" compact />
  </wd-form-item>

  <wd-form-item title="字数限制" prop="limit">
    <wd-textarea v-model="formData.limit" :maxlength="240" show-word-limit clearable compact placeholder="请输入" />
  </wd-form-item>

  <wd-form-item title="只读" prop="readonly">
    <wd-textarea v-model="formData.readonly" readonly :maxlength="240" show-word-limit placeholder="请输入" compact />
  </wd-form-item>
</wd-form>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 文本域绑定值 | `string \| number` | `''` |
| placeholder | 占位文本 | `string` | `请输入...` |
| placeholder-style | placeholder 样式 | `string` | - |
| placeholder-class | placeholder 样式类 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| maxlength | 最大输入长度，设置为 `-1` 时不限制长度 | `number` | `-1` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计，需要同时设置 `maxlength` | `boolean` | `false` |
| clear-trigger | 清空按钮显示时机，可选值为 `focus`、`always` | `InputClearTrigger` | `always` |
| focus-when-clear | 点击清空按钮后是否自动聚焦 | `boolean` | `true` |
| error | 是否展示错误状态 | `boolean` | `false` |
| focus | 是否获取焦点 | `boolean` | `false` |
| auto-focus | 是否自动聚焦并拉起键盘 | `boolean` | `false` |
| auto-height | 是否自动增高输入框高度 | `boolean` | `false` |
| fixed | 在 `position: fixed` 区域时是否启用固定模式 | `boolean` | `false` |
| cursor-spacing | 光标与键盘的距离 | `number` | `0` |
| cursor | 获取焦点时的光标位置 | `number` | `-1` |
| confirm-type | 键盘右下角按钮文字，可选值为 `done`、`go`、`next`、`search`、`send` | `ConfirmType` | - |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | `boolean` | `false` |
| show-confirm-bar | 是否显示键盘上方带有“完成”按钮的工具栏 | `boolean` | `true` |
| selection-start | 光标起始位置，需与 `selection-end` 搭配使用 | `number` | `-1` |
| selection-end | 光标结束位置，需与 `selection-start` 搭配使用 | `number` | `-1` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| disable-default-padding | 是否去掉 iOS 下默认内边距 | `boolean` | `false` |
| hold-keyboard | 聚焦时点击页面是否保持键盘不收起 | `boolean` | `false` |
| ignore-composition-event | 是否忽略文本合成系统事件处理；为 `false` 时会触发 composition 相关事件，且在合成期间会触发 `input` | `boolean` | `true` |
| inputmode | 输入模式提示，可选值为 `none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email`、`url` | `InputMode` | `text` |
| enable-native | 支付宝小程序下是否启用原生输入框，设为 `false` 可避免弹起键盘后内容上移 | `boolean` | `true` |
| compact | 是否开启紧凑模式；未显式设置时，在 `wd-form-item` 中会自动启用 | `boolean` | - |
| custom-textarea-class | textarea 自定义类名 | `string` | `''` |
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
| blur | 失焦时触发 | `{ value, cursor }` |
| clear | 点击清空按钮时触发 | - |
| linechange | 行数变化时触发 | `{ height, heightRpx, lineCount }` |
| confirm | 点击键盘完成按钮时触发 | `{ value }` |
| keyboardheightchange | 键盘高度变化时触发 | `{ height, duration }` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-textarea-class | textarea 样式类 |
