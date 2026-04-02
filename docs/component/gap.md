# Gap 间隔槽

用于页面布局中的间距占位，可替代 `margin` 或 `padding`，也可作为底部占位元素。

## 组件类型

### 基本使用

默认渲染一个高度为 `14px`、背景为透明色的间隔槽。

```html
<wd-gap />
```

## 组件变体

### 自定义背景色

通过 `bg-color` 设置背景颜色。

```html
<wd-gap bg-color="#4D80F0" />
```

### 自定义高度

通过 `height` 设置高度，支持数字和带单位字符串。

```html
<wd-gap bg-color="#4D80F0" height="120rpx" />
```

## 组件样式

### 自定义类名

通过 `custom-class` 扩展样式。

```html
<wd-gap custom-class="custom-gap" />
```

```css
.custom-gap {
  padding-bottom: 120rpx;
  background: #34d19d !important;
}
```

## 特殊样式

### 底部安全区

开启 `safe-area-bottom` 后会自动追加底部安全区内边距，适合底部固定占位场景。

```html
<wd-gap safe-area-bottom height="0" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 间隔槽高度，支持数字（单位 `px`）或字符串（如 `20rpx`） | `string \| number` | `14` |
| bg-color | 背景颜色 | `string` | `'transparent'` |
| safe-area-bottom | 是否开启底部安全区适配 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

