
# Skeleton 骨架屏

骨架屏用于内容加载时的占位展示，支持多种主题类型、行列自定义、动画效果和插槽内容。

## 组件类型

### 基本用法

通过 `theme` 设置不同骨架主题，常用于文本、头像、图片、段落等场景。

::: code-group
```html
<wd-skeleton theme="avatar" />
<wd-skeleton theme="image" />
<wd-skeleton theme="text" />
<wd-skeleton theme="paragraph" />
```
:::

## 组件样式

### 宫格骨架屏

通过 `row-col` 组合多行多列占位结构，可以构造宫格骨架屏。


::: code-group
```html
<wd-skeleton :row-col="grid" />
```
```ts
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' }
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' }
  ]
] as SkeletonRowCol[]
```
:::

### 单元格骨架屏

可以组合头像、矩形块与文本行，模拟常见单元格列表布局。

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
<view style="display: flex; margin-top: 20px">
  <wd-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
```

### 图片组合骨架屏

可以结合 `row-col` 自定义图片卡片与图文混排占位结构。

```html
<wd-skeleton :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
<wd-skeleton :custom-style="{ marginTop: '20px' }" :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
```

## 特殊样式

### 渐变加载动画

设置 `animation="gradient"` 开启渐变加载动画。

```html
<wd-skeleton animation="gradient" theme="paragraph" />
```

### 闪烁加载动画

设置 `animation="flashed"` 开启闪烁加载动画。

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
</view>
```

### 插槽内容

通过默认插槽写入实际内容，`loading` 为 `true` 时显示骨架屏，切换为 `false` 后显示插槽内容。

::: code-group
```html
<wd-skeleton :row-col="grid" :loading="showContent">
  <wd-grid>
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
  </wd-grid>
</wd-skeleton>
```
```ts
const showContent = ref(true)
```
:::

---

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 骨架屏主题，可选值为 `text`、`avatar`、`paragraph`、`image` | `SkeletonTheme` | `'text'` |
| row-col | 自定义每行占位配置，用于设置行列数量、宽高、间距、圆角和占位类型等，支持数字、对象、对象数组 | `SkeletonRowCol[]` | `[]` |
| loading | 是否显示骨架屏 | `boolean` | `true` |
| animation | 动画类型，可选值为 `gradient`、`flashed` | `SkeletonAnimation` | `''` |
| customClass | 自定义样式类名 | `string \| string[] \| Record<string, boolean>` | `''` |
| custom-style | 自定义内联样式 | `CSSProperties` | `{}` |

## Slots

| name | 说明 |
| --- | --- |
| default | `loading` 结束后展示的实际内容 |

## 类型说明

### SkeletonTheme

可选值：`'text' | 'avatar' | 'paragraph' | 'image'`

### SkeletonAnimation

可选值：`'gradient' | 'flashed'`

### SkeletonRowCol 配置示例

```ts
// 三行，分别显示为一列、一列、两列的占位符
[1, 1, 2]

// 三行，第三行自定义宽度
[1, 1, { width: '100px' }]

// 第三行包含两列，分别设置宽度和右外边距
[1, 1, [{ width: '50%' }, { width: '50%', marginRight: '10px' }]]
```

