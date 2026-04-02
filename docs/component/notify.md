# Notify 消息通知

通知类组件，用于在页面顶部展示通知信息。

## 组件状态

### 基础用法

需要在页面中引入该组件，作为挂载点。

::: code-group

```html
<wd-notify />
```

```ts
import { useNotify } from '@/uni_modules/wot-ui'

const { showNotify, closeNotify } = useNotify()

// 3 秒后自动关闭
showNotify('通知内容')

// 主动关闭
closeNotify()
```

:::

### 自定义配置

支持自定义颜色、弹出位置、展示时长以及是否显示关闭按钮。

::: code-group

```ts
// 自定义颜色
showNotify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
})

// 自定义位置
showNotify({
  message: '自定义位置',
  position: 'bottom'
})

// 自定义时长
showNotify({
  message: '自定义时长',
  duration: 1000
})

// 显示关闭按钮
showNotify({
  message: '通知内容',
  closable: true,
  duration: 0
})
```

:::

## 组件类型

### 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种通知类型，默认为 `danger`。

::: code-group

```ts
// 主要通知
showNotify({ type: 'primary', message: '通知内容' })

// 成功通知
showNotify({ type: 'success', message: '通知内容' })

// 危险通知
showNotify({ type: 'danger', message: '通知内容' })

// 警告通知
showNotify({ type: 'warning', message: '通知内容' })
```

:::

## 组件样式

### 悬浮通知

通过 `variant` 属性设置为 `floating` 可展示悬浮卡片式通知。悬浮通知具有独立的外边距、圆角与阴影，并且其前缀图标会自动适配当前 `type` 的状态主色。

::: code-group

```ts
showNotify({
  type: 'primary',
  message: '通知内容',
  variant: 'floating',
  closable: true
})
```

:::

## 内容形态

### 使用 Notify 组件

如果需要在 Notify 内嵌入组件或其他自定义内容，可以直接使用 Notify 组件，并使用默认插槽进行定制。

::: code-group

```html
<wd-button type="primary" @click="showNotify">使用 Notify 组件调用</wd-button>
<wd-notify type="success" :safe-height="safeHeight" v-model:visible="visible">
  <wd-icon name="check-outline" size="inherit" color="inherit" />
  成功通知
</wd-notify>
```

```ts
import { ref, onMounted } from 'vue'

let timer: ReturnType<typeof setTimeout>
export default {
  setup() {
    const visible = ref(false)
    const safeHeight = ref(0)

    const showNotify = () => {
      visible.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
      }, 3000)
    }

    onMounted(() => {
      // #ifdef H5
      safeHeight.value = 44
      // #endif
    })

    return {
      visible,
      showNotify,
      safeHeight
    }
  }
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `warning` `danger` | `NotifyType` | `danger` |
| message | 展示文案，支持通过`\n`换行 | `string \| number` | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | `number` | `3000` |
| visible | 显示状态（支持 v-model） | `boolean` | `false` |
| position | 弹出位置，可选值为 `top` `bottom` | `NotifyPosition` | `top` |
| color | 字体颜色 | `string` | - |
| background | 背景颜色 | `string` | - |
| z-index | 将组件的 z-index 层级设置为一个固定值 | `number` | `99` |
| safe-height | 顶部安全高度 | `number \| string` | - |
| selector | 指定唯一标识 | `string` | - |
| root-portal | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 | `boolean` | `false` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| variant | 展示形态，可选值为 `filled` `floating` | `NotifyVariant` | `filled` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击时的回调函数 | `(event: MouseEvent) => void` |
| closed | 关闭时的回调函数 | `() => void` |
| opened | 展示后的回调函数 | `() => void` |

## Slots

| name | 说明 |
| --- | --- |
| default | 自定义通知内容 |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| showNotify | 展示提示 | `NotifyOptions` / `string` |
| closeNotify | 关闭提示 | - |
| setNotifyDefaultOptions | 修改默认配置，影响所有的 `showNotify` 调用 | `NotifyOptions` |
| resetNotifyDefaultOptions | 重置默认配置，影响所有的 `showNotify` 调用 | - |

## Options

调用 `showNotify`、 `setNotifyDefaultOptions` 等方法时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `warning` `danger` | `NotifyType` | `danger` |
| message | 展示文案，支持通过`\n`换行 | `string \| number` | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | `number` | `3000` |
| position | 弹出位置，可选值为 `top` `bottom` | `NotifyPosition` | `top` |
| color | 字体颜色 | `string` | - |
| background | 背景颜色 | `string` | - |
| zIndex | 将组件的 z-index 层级设置为一个固定值 | `number` | `99` |
| safeHeight | 顶部安全高度 | `number \| string` | - |
| rootPortal | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 | `boolean` | `false` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| variant | 展示形态，可选值为 `filled` `floating` | `NotifyVariant` | `filled` |
| customClass | 根节点样式类名 | `string` | - |
| customStyle | 根节点样式 | `string` | - |
| onClick | 点击时的回调函数 | `(event: MouseEvent) => void` | - |
| onClosed | 关闭时的回调函数 | `() => void` | - |
| onOpened | 展示后的回调函数 | `() => void` | - |