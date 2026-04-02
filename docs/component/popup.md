# Popup 弹出层

弹出层组件，用于展示弹窗、信息提示等内容。

## 组件类型

### 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<wd-popup v-model="show" custom-style="border-radius: 32rpx;" @close="handleClose">
  <text class="custom-txt">弹弹弹</text>
</wd-popup>
```

```css
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
```

### 弹出位置

设置 `position`，可选值为 `center`、`top`、`right`、`bottom`、`left`，默认值为 `center`。

```html
<wd-popup v-model="show" position="top" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="right" custom-style="width: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="bottom" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="left" custom-style="width: 200px;" @close="handleClose"></wd-popup>
```

## 组件状态

### 关闭按钮

设置 `closable` 属性。

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### 禁用遮罩点击

通过设置 `close-on-click-modal="false"`，可以禁用点击遮罩层关闭弹出层。

```html
<wd-popup v-model="show" position="bottom" :close-on-click-modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### 禁用遮罩

通过设置 `modal="false"`，可以关闭遮罩层，使底层内容仍可交互。

```html
<wd-popup v-model="show" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 组件样式

### 底部安全区

通过设置 `safe-area-inset-bottom="true"`，可以确保底部弹层在刘海屏机型上不会被安全区域遮挡。

```html
<wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 特殊样式

### 锁定滚动

`lock-scroll` 用于锁定背景滚动。在小程序和 APP 中，如果还需要彻底防止页面滚动穿透，推荐配合 `page-meta` 控制页面 `overflow`。

```html
<!-- page-meta 只能作为页面第一个节点 -->
<page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>

<wd-popup v-model="show" lock-scroll position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

:::tip 提示
H5 端默认已经处理滚动锁定，一般不需要额外处理滚动穿透。
:::

### 嵌套弹窗与 root-portal

当使用 `root-portal` 属性时，弹出层会从当前页面结构中脱离出来，用于避免父元素的 `transform`、`filter` 等样式影响弹层的 fixed 定位。

不同平台的实现方式如下：

- H5：使用 Vue 3 的 teleport 特性
- APP：使用 renderjs 将元素移动到 uni-app 根节点
- 微信小程序 / 支付宝小程序：使用 root-portal 组件
- 其他平台：不支持此能力

```html
<wd-popup v-model="showParent" position="center" custom-style="padding: 20px; border-radius: 16px;">
  <wd-button type="success" size="small" @click="showChild = true">打开传送子弹窗</wd-button>

  <wd-popup v-model="showChild" root-portal position="center" custom-style="padding: 20px; border-radius: 16px;">
    <text>这个子弹窗会脱离父层级渲染</text>
  </wd-popup>
</wd-popup>
```

:::tip 提示
`root-portal` 主要用于解决复杂布局中的层级和定位问题，建议在有明确需要时再开启。
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 弹出层是否显示 | `boolean` | `false` |
| transition | 动画类型，参见 `wd-transition` 组件的 `name` | `TransitionName` | - |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| position | 弹出位置，可选值为 `center`、`top`、`right`、`bottom`、`left` | `string` | `center` |
| close-on-click-modal | 点击遮罩是否关闭弹出层 | `boolean` | `true` |
| duration | 动画持续时间 | `number \| boolean` | `300` |
| modal | 是否显示遮罩 | `boolean` | `true` |
| z-index | 弹层层级 | `number` | `10` |
| hide-when-close | 关闭时是否隐藏弹层节点 | `boolean` | `true` |
| modal-style | 自定义遮罩样式 | `string` | - |
| safe-area-inset-bottom | 底部弹层是否适配底部安全区 | `boolean` | `false` |
| lazy-render | 弹层内容是否懒渲染 | `boolean` | `true` |
| lock-scroll ^(0.1.30) | 是否锁定背景滚动，锁定后蒙层内内容也将无法滚动 | `boolean` | `true` |
| root-portal ^(1.11.0) | 是否从页面结构中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| round | 是否开启圆角，开启后根据弹出位置自动适配（底部弹出→上圆角，顶部弹出→下圆角，居中→四圆角） | `boolean` | `false` |
| custom-class | 自定义根节点类名 | `string` | - |
| custom-style | 自定义弹层样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 弹出层关闭时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| before-enter | 进入前触发 | - |
| enter | 进入时触发 | - |
| after-enter | 进入后触发 | - |
| before-leave | 离开前触发 | - |
| leave | 离开时触发 | - |
| after-leave | 离开后触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 弹层内容 |
