# Divider 分割线

用于将内容分隔为多个区域。

## 组件类型

### 基本使用

默认渲染一条水平分割线。

```html
<wd-divider />
```

### 展示文本

使用默认插槽在分割线中间插入内容。

```html
<wd-divider>展示文本</wd-divider>
```

## 组件变体

### 内容位置

通过 `content-position` 指定内容所在位置。

```html
<wd-divider>中间</wd-divider>
<wd-divider content-position="left">左侧</wd-divider>
<wd-divider content-position="right">右侧</wd-divider>
```

### 虚线

添加 `dashed` 使分割线渲染为虚线。

```html
<wd-divider dashed>虚线分割</wd-divider>
```

## 组件样式

### 自定义渲染内容

使用默认插槽渲染自定义内容。

```html
<wd-divider>
  <wd-icon name="down" size="20" />
</wd-divider>
```

### 自定义颜色

设置 `color` 自定义分割线颜色。

```html
<wd-divider color="#4D80F0">自定义颜色</wd-divider>
```

## 特殊样式

### 垂直分割线

添加 `vertical` 使分割线渲染为垂直方向，垂直模式下默认插槽不生效。

```html
<view class="content">
  文本
  <wd-divider vertical />
  文本
  <wd-divider vertical dashed />
  文本
  <wd-divider vertical :hairline="false" />
  文本
  <wd-divider vertical color="#1989fa" />
  文本
</view>
```

```css
.content {
  padding: 12rpx 15px;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 自定义颜色，支持所有合法颜色值 | `string` | - |
| content-position ^(1.5.0) | 内容位置，可选值为 `left`、`center`、`right` | `DividerPosition` | `'center'` |
| dashed ^(1.5.0) | 是否显示为虚线 | `boolean` | `false` |
| vertical ^(1.5.0) | 是否显示为垂直分割线 | `boolean` | `false` |
| hairline ^(1.5.0) | 是否显示为 0.5px 细线 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 分割线内容，仅在 `vertical` 为 `false` 时生效 | - |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
