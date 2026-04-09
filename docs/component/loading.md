# Loading 加载指示器

加载动画，用于表示加载中的过渡状态。

## 组件类型

### 类型

通过 `type` 属性设置指示器类型，可选值为 `circular`、`spinner`、`dots`、`wave`，默认为 `circular`。

```html
<wd-loading />
<wd-loading type="spinner" />
<wd-loading type="dots" />
<wd-loading type="wave" />
```

## 组件样式

### 颜色

通过 `color` 属性修改指示器的颜色。

```html
<wd-loading color="#fa34aa" />
<wd-loading type="spinner" color="#fa34aa" />
<wd-loading type="dots" color="#fa34aa" />
<wd-loading type="wave" color="#fa34aa" />
```

### 大小

通过 `size` 属性设置指示器的大小，支持 `number` / `string` 类型。

```html
<wd-loading :size="20" type="wave" />
<wd-loading :size="30" type="wave" />
<wd-loading size="50px" type="wave" />
```

## 内容形态

### 显示文字

通过 `text` 属性或默认插槽设置加载文字。

```html
<wd-loading text="加载中..."></wd-loading>
<wd-loading>加载中...</wd-loading>
<wd-loading type="spinner">加载中...</wd-loading>
<wd-loading type="wave">加载中...</wd-loading>
```

### 水平方向

通过 `direction` 属性设置文字与指示器的排列方向，可选值为 `vertical`、`horizontal`，默认为 `vertical`。

```html
<wd-loading direction="horizontal" text="加载中..."></wd-loading>
<wd-loading direction="horizontal">加载中...</wd-loading>
<wd-loading direction="horizontal" type="spinner">加载中...</wd-loading>
<wd-loading direction="horizontal" type="wave">加载中...</wd-loading>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 加载指示器类型，可选值为 `circular`、`spinner`、`dots`、`wave` | `LoadingType` | `circular` |
| color | 设置加载指示器颜色 | `string` | - |
| size | 设置加载指示器大小 | `number \| string` | - |
| text | 加载指示器文字 | `string` | - |
| direction | 排列方向，可选值为 `vertical`、`horizontal` | `LoadingDirection` | `vertical` |
| inherit-color | 是否继承父元素颜色 | `boolean` | `false` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |
| custom-spinner-class | 自定义加载指示器样式类 | `string` | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 加载文字内容 |
