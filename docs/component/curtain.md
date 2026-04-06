# Curtain 幕帘

一般用于公告类图片弹窗展示。

## 组件类型

### 基本用法

通过 `v-model` 控制显示与隐藏；`src` 为幕帘图片地址；`to` 为点击图片后的跳转链接；`width` 为图片宽度（高度按原图比例自动计算）。

```html
<wd-button @click="open = true">展示幕帘</wd-button>
<wd-curtain v-model="open" :src="img" :to="link" :width="280" />
```

## 组件样式

### 修改关闭按钮位置

`close-position` 可选值为 `inset`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right`。

```html
<wd-curtain v-model="showTopLeft" :src="img" :to="link" close-position="top-left" :width="280" />
<wd-curtain v-model="showTop" :src="img" :to="link" close-position="top" :width="280" />
<wd-curtain v-model="showTopRight" :src="img" :to="link" close-position="top-right" :width="280" />
```

## 组件状态

### 点击遮罩可关闭

设置 `close-on-click-modal` 后，点击遮罩会关闭幕帘。

```html
<wd-curtain v-model="open" :src="img" :to="link" close-position="bottom-right" :width="280" close-on-click-modal />
```

## 特殊样式

### 自定义关闭按钮

通过 `close` 插槽自定义关闭按钮内容和交互。

```html
<wd-curtain v-model="open" :src="img" :width="280">
  <template #close>
    <view class="custom-close" @click="open = false">关闭</view>
  </template>
</wd-curtain>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 绑定值，控制幕帘显示与关闭 | boolean | false |
| value | 绑定值（已废弃，请使用 `modelValue`） | boolean | false |
| src | 幕帘图片地址，必须使用网络地址 | string | - |
| width | 幕帘图片宽度，默认单位 px | number | - |
| to | 幕帘图片点击链接 | string | - |
| close-position | 关闭按钮位置，可选值为 `inset`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right` | string | `inset` |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | false |
| hide-when-close | 关闭时是否隐藏弹出层（`display: none`） | boolean | true |
| z-index | 设置层级 | number | 10 |
| custom-close-class | 关闭按钮自定义类名 | string | `''` |
| custom-close-style | 关闭按钮自定义样式 | string | `''` |
| root-portal | 是否从页面中脱离，用于解决 fixed 失效问题（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单，仅微信小程序支持 | boolean | false |
| close-on-click | 点击图片时是否关闭幕帘 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击幕帘图片时触发 | - |
| close | 弹出层关闭时触发 | - |
| closed | 弹出层关闭动画结束后触发 | - |
| click-modal | 点击遮罩时触发 | - |
| beforeenter | 进入前触发 | - |
| enter | 进入时触发 | - |
| afterenter | 进入后触发 | - |
| beforeleave | 离开前触发 | - |
| leave | 离开时触发 | - |
| afterleave | 离开后触发 | - |
| load | 图片加载完成时触发 | `event` |
| error | 图片加载失败时触发。图片加载失败后，即使 `modelValue` 为 `true` 也不会展示幕帘 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| close | 自定义关闭按钮 | - |
