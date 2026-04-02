# useDialog

`useDialog` 用于函数式调用 `wd-dialog`，支持 `alert`、`confirm`、`prompt`、`show` 和 `close`。

## 基础用法

页面中先声明 `wd-dialog`，再通过 `useDialog()` 打开弹框。

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

## Confirm 与 Prompt

`confirm` 和 `prompt` 返回 `Promise`，`then` 对应确认，`catch` 对应取消或关闭。

::: code-group
```html [模板]
<wd-dialog />
<wd-button @click="openConfirm">打开 Confirm</wd-button>
<wd-button @click="openPrompt">打开 Prompt</wd-button>
```

```ts [脚本]
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: '删除确认',
      msg: '确定删除该记录吗？'
    })
    .then(() => {
      console.log('点击了确认')
    })
    .catch(() => {
      console.log('点击了取消')
    })
}

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
:::

## 多实例调用

通过 `selector` 区分页面内多个实例，`useDialog(selector)` 会绑定到指定实例。

```html
<wd-dialog selector="dialog-a" />
<wd-dialog selector="dialog-b" />
<wd-button @click="openA">打开 A</wd-button>
<wd-button @click="openB">打开 B</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialogA = useDialog('dialog-a')
const dialogB = useDialog('dialog-b')

const openA = () => {
  dialogA.alert({ title: 'A 实例', msg: '这是 A 弹框' })
}

const openB = () => {
  dialogB.alert({ title: 'B 实例', msg: '这是 B 弹框' })
}
```

## 确认前拦截

`beforeConfirm` 接收当前输入值，支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">确认前拦截</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: '确认提交',
    msg: '将进行校验后提交',
    beforeConfirm: () => {
      toast.loading('校验中...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1200)
      })
    }
  })
}
```

## API

### Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 打开弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | 打开 Alert 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | 打开 Confirm 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | 打开 Prompt 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | 关闭当前弹框 | - | `void` |

### DialogResult

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 操作类型，可选值为 `confirm`、`cancel`、`modal`、`close` | ActionType | - |
| value | Prompt 模式下的输入值 | `string \| number` | - |

### useDialog

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定弹框实例标识，传空字符串时使用默认实例 | string | `''` |

### DialogOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | `''` |
| msg | 消息内容 | string | `''` |
| type | 弹框类型，可选值为 `alert`、`confirm`、`prompt` | DialogType | alert |
| theme | 操作区风格，可选值为 `button`、`text` | DialogTheme | button |
| zIndex | 弹窗层级 | number | 99 |
| lazyRender | 弹层内容懒渲染 | boolean | true |
| headerImage | 顶部通栏图片地址 | string | - |
| icon | 图标名称。可选值为 `success`、`info`、`warning`、`danger`，也支持自定义图标名 | string | - |
| iconColor | 图标颜色 | string | - |
| iconProps | 图标组件透传属性 | `Partial<IconProps>` | - |
| inputValue | Prompt 初始值 | `string \| number` | - |
| inputProps | Prompt 模式下 input 组件属性 | `Partial<InputProps>` | `{ type: 'text', modelValue: '' }` |
| textareaProps | Prompt 模式下 textarea 组件属性 | `Partial<TextareaProps>` | - |
| inputPattern | Prompt 输入正则校验规则 | RegExp | - |
| inputValidate | Prompt 输入函数校验规则，返回 `boolean` 或错误文本 | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt 校验失败提示文案 | string | `''` |
| actionLayout | 操作按钮排列方式，可选值为 `horizontal`、`vertical` | DialogActionLayout | horizontal |
| showCancelButton | 是否显示取消按钮 | boolean | `alert` 为 false，`confirm/prompt` 为 true |
| confirmButtonText | 确认按钮文案 | string | - |
| cancelButtonText | 取消按钮文案 | string | - |
| confirmButtonProps ^(1.5.0) | 确认按钮配置，支持字符串、对象或 `null` | DialogBoxButtonOption | `{}` |
| cancelButtonProps ^(1.5.0) | 取消按钮配置，支持字符串、对象或 `null` | DialogBoxButtonOption | 由 `showCancelButton` 推导 |
| actions | 自定义操作按钮数组；配置后优先级高于确认/取消按钮 | DialogAction[] | - |
| closeOnClickModal | 是否支持点击遮罩关闭 | boolean | false |
| showClose | 是否显示右上角关闭按钮 | boolean | false |
| beforeConfirm | 确认前拦截函数，返回 `boolean` 或 `Promise<boolean>` | DialogBeforeConfirm | - |
