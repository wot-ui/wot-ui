# Toast 轻提示

轻提示组件，用于消息通知、加载提示和操作结果反馈，支持组件挂载点配合 `useToast()` 进行函数式调用。

::: tip 提示
`Toast` 自 `1.7.0` 起支持通过组件 `props` 控制默认样式。函数式调用时，传入的 `options` 优先级高于组件 `props`。

全局调用方案可参考 [wot-starter](https://starter.wot-ui.cn/guide/feedback.html)，适合在路由守卫或请求拦截器中使用。
:::

## 组件类型

### 基本用法

需要先在页面中放置一个 `wd-toast` 作为挂载点，再通过 `useToast()` 调用提示。

::: code-group

```html [vue]
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts [ts]
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
```

:::

### 类型提示

支持成功、错误、警告和常规四种快捷提示。

```ts
toast.success('操作成功')
toast.error('手机验证码输入错误，请重新输入')
toast.warning('提示信息')
toast.info('常规提示信息')
```

## 组件状态

### 加载提示

`loading()` 默认不会自动关闭，适合等待异步请求完成后手动调用 `close()`。

```ts
toast.loading('3s后自动关闭')

setTimeout(() => {
  toast.close()
}, 3000)
```

### 加载类型

通过 `loadingType` 可切换不同加载样式，支持 `circular`、`spinner`、`dots`。

```ts
toast.loading({
  msg: '3s后自动关闭',
  loadingType: 'spinner',
  loadingColor: '#fff'
})
```

## 组件样式

### 使用图标

可以通过 `iconClass` 使用组件库内置图标，也可以配合 `classPrefix` 使用自定义图标。

::: code-group

```ts [内置图标]
toast.show({
  iconClass: 'star',
  msg: '使用组件库内部图标'
})
```

```ts [自定义图标]
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: '使用自定义图标'
})
```

:::

### 提示位置

通过 `position` 调整提示出现位置，支持 `top`、`middle-top`、`middle`、`bottom`。

```ts
toast.show({
  position: 'top',
  msg: '提示信息'
})

toast.show({
  position: 'middle',
  msg: '提示信息'
})

toast.show({
  position: 'bottom',
  msg: '提示信息'
})
```

### 排版方向

通过 `direction` 控制横向或纵向排版，常用于长文案或加载提示。

```ts
toast.success({
  msg: '纵向排版',
  direction: 'vertical'
})
```

## Toast Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 唯一挂载标识，多实例场景下用于区分不同 toast | `string` | `''` |
| msg ^(1.7.0) | 默认提示文案 | `string` | `''` |
| direction ^(1.7.0) | 默认排版方向，可选值为 `horizontal`、`vertical` | `ToastDirection` | `horizontal` |
| icon-name ^(1.7.0) | 默认图标类型，可选值为 `success`、`error`、`warning`、`loading`、`info` | `ToastIconType` | `''` |
| icon-size ^(1.7.0) | 默认图标大小 | `number` | - |
| loading-type ^(1.7.0) | 默认加载图标类型，可选值为 `circular`、`spinner`、`dots` | `ToastLoadingType` | `circular` |
| loading-color ^(1.7.0) | 默认加载图标颜色 | `string` | `#ffffff` |
| loading-size ^(1.7.0) | 默认加载图标大小 | `number` | - |
| icon-color ^(1.7.0) | 默认图标颜色 | `string` | - |
| position ^(1.7.0) | 默认提示位置，可选值为 `top`、`middle-top`、`middle`、`bottom` | `ToastPositionType` | `middle` |
| z-index ^(1.7.0) | 默认层级 | `number` | `100` |
| cover ^(1.7.0) | 是否显示透明遮罩层 | `boolean` | `false` |
| icon-class ^(1.7.0) | 默认图标类名 | `string` | `''` |
| class-prefix ^(1.7.0) | 图标类名前缀 | `string` | `wd-icon` |
| opened ^(1.7.0) | 完全展示后的回调 | <code>() =&gt; void</code> | - |
| closed ^(1.7.0) | 完全关闭后的回调 | <code>() =&gt; void</code> | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Toast Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| msg | 提示文案 | `string` | `''` |
| duration | 持续时间，单位毫秒，`0` 表示不自动关闭 | `number` | `2000` |
| direction | 排版方向，可选值为 `horizontal`、`vertical` | `ToastDirection` | `horizontal` |
| iconName | 图标类型，可选值为 `success`、`error`、`warning`、`loading`、`info` | `ToastIconType` | - |
| iconSize | 图标大小 | `number` | - |
| loadingType | 加载图标类型，可选值为 `circular`、`spinner`、`dots` | `ToastLoadingType` | - |
| loadingColor | 加载图标颜色 | `string` | - |
| loadingSize | 加载图标大小 | `number` | - |
| iconColor | 图标颜色 | `string` | - |
| position | 提示位置，可选值为 `top`、`middle-top`、`middle`、`bottom` | `ToastPositionType` | `middle` |
| show | 是否显示，仅内部状态使用 | `boolean` | - |
| zIndex | 层级 | `number` | `100` |
| cover | 是否显示透明遮罩层 | `boolean` | `false` |
| iconClass | 自定义图标类名 | `string` | `''` |
| classPrefix | 自定义图标类名前缀 | `string` | `wd-icon` |
| opened | 完全展示后的回调 | <code>() =&gt; void</code> | - |
| closed | 完全关闭后的回调 | <code>() =&gt; void</code> | - |

## Toast Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 展示普通提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| success | 展示成功提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| error | 展示错误提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| warning | 展示警告提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| info | 展示常规提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| loading | 展示加载提示 | <code>(options: ToastOptions &#124; string)</code> | - |
| close | 手动关闭当前提示 | - | - |
