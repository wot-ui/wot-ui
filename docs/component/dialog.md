# Dialog 弹框

弹出对话框，常用于消息提示、操作确认和输入收集，支持函数式调用。

:::tip 提示
全局调用方案见 [wot-starter](https://starter.wot-ui.cn/guide/feedback.html)，可用于路由守卫、请求拦截器等场景。
:::

## 组件类型

### Alert 弹框

Alert 仅展示确认按钮，常用于消息通知。

```html
<wd-dialog />
<wd-button @click="openAlert">打开 Alert</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openAlert = () => {
  dialog.alert({
    title: '提示',
    msg: '操作成功'
  })
}
```

### Confirm 弹框

Confirm 通过 `Promise` 返回用户操作结果，`then` 对应确认，`catch` 对应取消。

```html
<wd-dialog />
<wd-button @click="openConfirm">打开 Confirm</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: '提示',
      msg: '确认执行此操作吗？'
    })
    .then(() => {
      console.log('点击了确认')
    })
    .catch(() => {
      console.log('点击了取消')
    })
}
```

### Prompt 弹框

Prompt 会展示输入框，可用于采集文本并进行校验。

```html
<wd-dialog />
<wd-button @click="openPrompt">打开 Prompt</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPrompt = () => {
  dialog
    .prompt({
      title: '请输入邮箱',
      inputPattern: /.+@.+\..+/i,
      inputError: '邮箱格式不正确'
    })
    .then((res) => {
      console.log(res.value)
    })
}
```

## 组件状态

### 确认前校验

`beforeConfirm` 接收当前输入值，支持返回 `boolean` 或 `Promise<boolean>`，返回 `false` 时会拦截关闭。

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">确认前校验</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: '删除确认',
    msg: '确定删除该记录吗？',
    beforeConfirm: () => {
      toast.loading('删除中...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1500)
      })
    }
  })
}
```

### 输入校验

Prompt 同时支持正则校验 `input-pattern` 与函数校验 `input-validate`。

```html
<wd-dialog />
<wd-button @click="openPromptValidate">输入校验</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPromptValidate = () => {
  dialog.prompt({
    title: '请输入手机号',
    inputProps: {
      type: 'tel',
      placeholder: '请输入 11 位手机号'
    },
    inputValidate: (value) => /^1[3-9]\d{9}$/.test(String(value)),
    inputError: '手机号格式不正确'
  })
}
```

## 组件变体

### 风格与布局

通过 `theme` 与 `action-layout` 控制弹框按钮风格和排列方式。

```html
<wd-dialog />
<wd-button @click="openTextTheme">Text 风格 + 纵向布局</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openTextTheme = () => {
  dialog.confirm({
    title: '版本更新',
    msg: '发现新版本，是否立即更新？',
    theme: 'text',
    actionLayout: 'vertical'
  })
}
```

### 自定义操作按钮

通过 `actions` 可以定义多个按钮。`actions` 与 `confirm-button-props` / `cancel-button-props` 同时配置时优先使用 `actions`。

```html
<wd-dialog />
<wd-button @click="openActions">自定义操作按钮</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openActions = () => {
  dialog.show({
    title: '选择支付方式',
    actionLayout: 'vertical',
    actions: [
      { text: '微信支付', type: 'success', block: true },
      { text: '支付宝', type: 'primary', block: true },
      { text: '取消', block: true }
    ]
  })
}
```

## 组件样式

### 图标与头图

可通过 `icon`、`icon-color`、`icon-props`、`header-image` 配置视觉样式。

```html
<wd-dialog />
<wd-button @click="openStyledDialog">图标和头图</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openStyledDialog = () => {
  dialog.alert({
    title: '活动通知',
    msg: '恭喜您获得专属权益',
    icon: 'success',
    headerImage: 'https://example.com/banner.png'
  })
}
```

### 自定义按钮样式

可通过 `confirm-button-props`、`cancel-button-props` 透传按钮属性。

```html
<wd-dialog />
<wd-button @click="openCustomButtons">自定义按钮样式</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openCustomButtons = () => {
  dialog.confirm({
    title: '提示',
    msg: '是否继续？',
    confirmButtonProps: {
      type: 'success',
      customClass: 'custom-shadow'
    },
    cancelButtonProps: {
      type: 'danger',
      customClass: 'custom-shadow'
    }
  })
}
```

## 特殊样式

### 插槽

通过 `selector` 区分多个实例，并使用 `useDialog(selector)` 调用指定弹框。

```html
<wd-dialog selector="wd-dialog-slot">
  <wd-rate v-model="rate" />
</wd-dialog>
<wd-button @click="openSlotDialog">打开插槽弹框</wd-button>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-ui'

const rate = ref(1)
const slotDialog = useDialog('wd-dialog-slot')

const openSlotDialog = () => {
  slotDialog.confirm({
    title: '请为我们评分'
  })
}
```

### OpenType

`confirm-button-props`、`cancel-button-props` 与 `actions` 支持透传按钮开放能力属性（如 `openType`）及对应事件回调。

```html
<wd-dialog />
<wd-button @click="openOpenTypeDialog">获取手机号</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openOpenTypeDialog = () => {
  dialog.confirm({
    title: '获取手机号',
    confirmButtonProps: {
      text: '授权获取',
      openType: 'getPhoneNumber',
      onGetphonenumber: (detail) => {
        console.log(detail)
      }
    }
  })
}
```

## Methods

`useDialog()` 返回如下方法：

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 打开弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | 打开 Alert 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | 打开 Confirm 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | 打开 Prompt 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | 关闭当前弹框 | - | `void` |

## Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `''` |
| msg | 消息内容 | `string` | `''` |
| type | 弹框类型，可选值为 `alert`、`confirm`、`prompt` | `DialogType` | `'alert'` |
| theme | 按钮风格，可选值为 `button`、`text` | `DialogTheme` | `'button'` |
| zIndex | 弹窗层级 | `number` | `99` |
| lazyRender | 弹层内容懒渲染 | `boolean` | `true` |
| headerImage | 顶部通栏图片地址 | `string` | - |
| icon | 图标名称。可选值为 `success`、`info`、`warning`、`danger`，也可传自定义图标名 | `string` | - |
| iconColor | 图标颜色 | `string` | - |
| iconProps | 透传 `wd-icon` 的属性 | `Partial<IconProps>` | - |
| inputValue | Prompt 输入框初始值 | `string \| number` | - |
| inputProps | Prompt 模式下 `wd-input` 属性 | `Partial<InputProps>` | - |
| textareaProps | Prompt 模式下 `wd-textarea` 属性 | `Partial<TextareaProps>` | - |
| inputPattern | Prompt 输入正则校验规则 | `RegExp` | - |
| inputValidate | Prompt 输入函数校验规则，返回 `boolean` 或错误信息字符串 | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt 校验失败提示文案 | `string` | - |
| showErr | 是否展示错误信息 | `boolean` | `false` |
| actionLayout | 操作按钮排列方式，可选值为 `horizontal`、`vertical` | `DialogActionLayout` | `'horizontal'` |
| showCancelButton | 是否显示取消按钮 | `boolean` | `alert` 为 false，`confirm/prompt` 为 true |
| confirmButtonText | 确认按钮文案 | `string` | - |
| cancelButtonText | 取消按钮文案 | `string` | - |
| confirmButtonProps ^(1.5.0) | 确认按钮高级配置，支持传字符串、对象或 `null` | `DialogBoxButtonOption` | `{}` |
| cancelButtonProps ^(1.5.0) | 取消按钮高级配置，支持传字符串、对象或 `null` | `DialogBoxButtonOption` | 由 `showCancelButton` 推导 |
| actions | 自定义操作按钮数组，配置后优先级高于确认/取消按钮 | `DialogAction[]` | - |
| closeOnClickModal | 是否支持点击遮罩关闭（返回 action 为 `modal`） | `boolean` | `false` |
| showClose | 是否显示右上角关闭按钮 | `boolean` | `false` |
| beforeConfirm | 确认前拦截函数，返回 `boolean` 或 `Promise<boolean>` | `DialogBeforeConfirm` | - |

## Attributes

`wd-dialog` 组件实例支持以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定唯一标识，用于区分页面中的多个实例 | `string` | `''` |
| root-portal ^(1.11.0) | 是否脱离页面文档流渲染，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| header | 自定义头部区域 | - |
| image | 自定义图片区域 | - |
| title | 自定义标题区域 | `{ icon, title, iconProps }` |
| default | 自定义内容区域 | `{ msg, type, inputValue, showErr, inputError }` |
| actions | 自定义操作区 | `{ confirm, cancel, close }` |
