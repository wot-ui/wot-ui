# Skeleton 骨架屏

### 宫格骨架屏

通过 `row-col` 组合多行多列占位结构，可以构造宫格骨架屏。

### 主题类型
<wd-skeleton
  :row-col="[
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
  ]"
/>
通过 `theme` 设置不同骨架主题，常用于文本、头像、图片、段落等场景。

### 单元格骨架屏
<wd-skeleton theme="text" />
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
```
<wd-skeleton theme="image" />
<wd-skeleton theme="paragraph" />
```
### 渐变加载动画
## 组件样式
设置 `animation="gradient"` 开启渐变加载动画。
### 自定义行列

通过 `row-col` 自定义每一行占位结构，可组合宽高、圆角、类型等配置。
```html
<wd-skeleton :row-col="[{ width: '100%' }, { width: '80%' }, { width: '60%' }]" />
### 闪烁加载动画

设置 `animation="flashed"` 开启闪烁加载动画。

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
</view>
```

### 插槽内容

通过默认插槽写入实际内容。`loading` 为 `true` 时显示骨架屏，切换为 `false` 后显示插槽内容。

### 动画效果

设置 `animation` 开启动画效果，可选值为 `gradient`、`flashed`。
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />

### 自定义内容

设置 `loading` 为 `false` 后，显示默认插槽内容。

```html
<wd-skeleton :row-col="grid" :loading="showContent">
  <wd-grid>
    <wd-grid-item icon-size="32px" icon="picture" text="文字" />
    <wd-grid-item icon-size="32px" icon="picture" text="文字" />
    <wd-grid-item icon-size="32px" icon="picture" text="文字" />
    <wd-grid-item icon-size="32px" icon="picture" text="文字" />
    <wd-grid-item icon-size="32px" icon="picture" text="文字" />
  </wd-grid>
</wd-skeleton>
```

```ts
const showContent = ref(true)
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 骨架屏主题，可选值为 `text`、`avatar`、`paragraph`、`image` | `SkeletonTheme` | `'text'` |
| row-col | 自定义每行占位配置，用于设置行列数量、宽高、间距、圆角和占位类型等 | `SkeletonRowCol[]` | `[]` |
| loading | 是否显示骨架屏 | `boolean` | `true` |
| animation | 动画类型，可选值为 `gradient`、`flashed` | `SkeletonAnimation` | `''` |
| custom-class | 自定义样式类名 | `string \| string[] \| Record<string, boolean>` | `''` |
| custom-style | 自定义内联样式 | `CSSProperties` | `{}` |

## Slots

| name | 说明 |
| --- | --- |
| default | `loading` 结束后展示的实际内容 |

