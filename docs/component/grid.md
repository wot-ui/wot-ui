# Grid 宫格

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 组件类型

### 基础用法

基础用法需要通过 `icon` 指定图标名称以及 `text` 属性指定文字。默认显示为一行。

```html
<wd-grid clickable>
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 内容插槽

通过 `wd-grid-item` 的默认插槽可以自定义宫格内容。

```html
<wd-grid>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
</wd-grid>
```

```scss
.img {
  width: 100%;
  height: 90px;
}
```

## 组件变体

### 自定义列数

通过 `column` 属性可以自定义宫格列数。未定义该属性时，默认显示为一行。

```html
<wd-grid :column="3">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 正方形格子

通过 `square` 属性开启正方形格属性。此时每一个 `GridItem` 宽高相等。

> 注意：开启 `square` 后，不建议再通过样式自定义 `GridItem` 的高度。

```html
<wd-grid square :column="4" border :gutter="10">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

## 组件样式

### 自定义背景颜色

通过 `bg-color` 属性可以自定义宫格背景颜色。

```html
<wd-grid bg-color="rgba(0, 0, 0, 0.02)">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 开启边框

通过 `border` 属性可以开启边框线展示。

```html
<wd-grid border :column="3">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 设定格间隙

通过 `gutter` 属性设置格子之间的距离。

```html
<wd-grid :gutter="10" :column="4">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 提示信息

设置 `is-dot` 属性后，会在图标右上角展示一个小红点。也可通过 `value`、`max` 设置徽标显示内容。

```html
<wd-grid>
  <wd-grid-item is-dot icon="gift" text="文字" />
  <wd-grid-item value="100" :max="99" icon="desktop" text="文字" />
</wd-grid>
```

## 布局能力

### 横向布局

通过 `direction` 属性可以设置内容的排列方向，默认为 `vertical`（纵向），可设置为 `horizontal`（横向）。配合 `reverse` 属性可以调换图标和文本的位置。

```html
<wd-grid direction="horizontal" :column="2">
  <wd-grid-item icon="image" text="图标居左" />
  <wd-grid-item icon="settings" text="设置选项" />
</wd-grid>

<wd-grid direction="horizontal" reverse :column="2" border>
  <wd-grid-item icon="image" text="图标居右" />
  <wd-grid-item icon="settings" text="设置选项" />
</wd-grid>
```

## 特殊样式

### 图标插槽

通过具名插槽 `icon` 可以自定义图标位的内容。

```html
<wd-grid>
  <wd-grid-item text="文字" icon-size="36px">
    <template #icon>
      <image class="slot-img" :src="joy" />
    </template>
  </wd-grid-item>
</wd-grid>
```

### 文字插槽

通过具名插槽 `text` 可以自定义文字位的内容。

```html
<wd-grid>
  <wd-grid-item icon="image">
    <template #text>
      <view class="text">自定义文字插槽</view>
    </template>
  </wd-grid-item>
</wd-grid>
```

### 自定义样式

通过 `custom-class` 或外部样式类可以深度定制样式。如果文字过长想单行显示并使用省略号，可以设置 `ellipsis` 为 `true`。

```html
<wd-grid>
  <wd-grid-item custom-class="custom-item" ellipsis icon="search-line" text="这是自定义样式的宫格项这是自定义样式的宫格项这是自定义样式的宫格项" />
</wd-grid>
```

```scss
:deep(.custom-item) {
  color: #e2231a;
  text-align: left !important;
}
```

### 页面导航

通过 `clickable` 属性开启可点击状态，并通过 `url` 和 `link-type` 属性设置页面跳转。

```html
<wd-grid clickable>
  <wd-grid-item link-type="navigateTo" url="/pages/button/Index" icon="edit" text="Navigate to ..." />
</wd-grid>
```

## Grid Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数 | `number` | - |
| border | 是否显示边框 | `boolean` | `false` |
| gutter | 格子之间的间距，默认单位为 `px` | `number` | - |
| square | 是否将格子固定为正方形 | `boolean` | `false` |
| clickable | 是否开启格子点击反馈 | `boolean` | `false` |
| bg-color | 背景颜色设置 | `string` | - |
| hover-class ^(1.9.0) | 指定 grid-item 按下去的样式类 | `string` | `'wd-grid-item__content--hover'` |
| center | 是否将格子内容居中显示 | `boolean` | `true` |
| direction | 格子内容排列的方向，可选值为 `horizontal`、`vertical` | `string` | `'vertical'` |
| reverse | 是否调换图标和文本的位置 | `boolean` | `false` |
| icon-size | 图标大小，默认单位为 `px` | `string` | `'28px'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## GridItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字内容 | `string` | - |
| ellipsis | 是否超出隐藏显示省略号 | `boolean` | `false` |
| icon | 图标名称，可选值见 `wd-icon` 组件 | `string` | - |
| icon-color | 图标颜色 | `string` | - |
| icon-prefix | 图标类名前缀 | `string` | - |
| is-dot | 是否显示图标右上角小红点 | `boolean` | `false` |
| value | 图标右上角徽标显示值 | `string \| number` | - |
| max | 图标右上角徽标最大值，超过最大值会显示 `{max}+` | `number` | `99` |
| badge-props ^(0.1.50) | 自定义徽标属性，透传给 [Badge 组件](/component/badge#attributes) | `BadgeProps` | - |
| url | 点击后跳转的链接地址 | `string` | - |
| link-type | 页面跳转方式，可选值为 `navigateTo`、`switchTab`、`reLaunch`、`redirectTo` | `string` | `'navigateTo'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## GridItem Events

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击(跳转)事件 | - |

## Grid Slot

| name | 说明 |
| --- | --- |
| default | 宫格内容 |

## GridItem Slot

| name | 说明 |
| --- | --- |
| default | 宫格项默认内容（自定义全部内容） |
| icon | 图标位内容 |
| text | 文本位内容 |

## Grid 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

## GridItem 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
| custom-text | 文字样式 |
| custom-icon | 图标样式 |
