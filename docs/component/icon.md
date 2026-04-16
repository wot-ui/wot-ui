# Icon 图标

基于字体的图标集。

## 组件类型

### 基础用法

通过 `name` 属性设置使用哪个图标。

```html
<wd-icon name="del" />
```

## 组件样式

### 图标颜色

设置 `color` 属性。

```html
<wd-icon name="del" color="#0083ff" />
```

### 图标大小

设置 `size` 属性。

```html
<wd-icon name="del" size="20px" />
```

## 特殊样式

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

``` css
/* 路径 src/iconfont/index.css */

@font-face {
  font-family: "fish";
  src: url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff2?t=1721314121733') format('woff2'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff?t=1721314121733') format('woff'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.ttf?t=1721314121733') format('truetype');
}

.fish {
  font-family: "fish" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fish-kehuishouwu:before {
  content: "\e627";
}

```
```html
<!-- app.vue -->
<style>
@import '@/iconfont/index.css';
</style>
```

```html
<!-- 通过 class-prefix 指定类名为 fish -->
<wd-icon class-prefix="fish" name="kehuishouwu" />
```

### CSS 类名图标 (UnoCSS)

如果项目中使用了 [UnoCSS](https://unocss.dev/) 等 CSS 引擎，你可以通过设置 `css-icon` 为 `true`，此时传入的 `name` 会直接被作为 CSS 类名使用，而不会拼接任何前缀。

```html
<wd-icon css-icon name="i-ep-apple" />
<wd-icon css-icon name="i-carbon-sun" />

<!-- 也可以直接传图标类名给 css-icon 而无需再传 name -->
<wd-icon css-icon="i-carbon-sun" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称或图片链接 | `string` | - |
| color	| 图标的颜色 | `string` | `inherit` |
| size | 图标的字体大小 | `string \| number` | `inherit` |
| class-prefix | 类名前缀，用于使用自定义图标 | `string` | `wd-icon` |
| css-icon | CSS 图标，为 `true` 时 `name` 直接作为 CSS class 而不会拼接 `class-prefix` 前缀，也可以直接传图标类名 | `boolean \| string` | `false` |
| custom-style | 根节点样式 | `string` | - |
| custom-class | 根节点样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击图标时触发 | `event` |
