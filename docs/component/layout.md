# Layout 布局

用于快速进行布局。

## 布局能力

### 基础用法

`Layout` 组件提供了 `24列` 栅格，通过在 `wd-col` 上设置 `span` 属性，通过计算当前内容所占百分比进行分栏。

注意：分栏布局仅提供布局，即元素宽度，内部样式用户可根据需要通过 `custom-class` 或修改内部标签来自行定义样式。

::: code-group

```html
<wd-row>
  <wd-col :span="24"><view class="bg-dark1">span: 24</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="12"><view class="bg-dark">span: 12</view></wd-col>
  <wd-col :span="12"><view class="bg-light">span: 12</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
</wd-row>
```

```scss
.bg-dark1,
.bg-dark,
.bg-light {
  border-radius: 4px;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.bg-dark1 {
  background: #99a9bf;
  color: #fff;
}
.bg-dark {
  background: #d3dce6;
}
.bg-light {
  background: #e5e9f2;
}
```

:::

### 分栏偏移

`offset` 属性可以设置分栏的偏移量，计算方式以及偏移大小与 `span` 相同。

```html
<wd-row>
  <wd-col :span="4"><view class="bg-dark">span: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
</wd-row>
```

### 分栏间隔

通过 `gutter` 属性可以设置列元素之间的间距，默认间距为 0。

```html
<wd-row :gutter="20">
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
```

### Justify 对齐

通过 `justify` 属性可以设置主轴对齐方式，可选值为 `start`、`center`、`end`、`space-between`、`space-around`、`space-evenly`。

```html
<wd-row justify="center">
  <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
  <wd-col :span="6"><view class="bg-light">center</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
</wd-row>
<wd-row justify="end">
  <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
  <wd-col :span="6"><view class="bg-light">end</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
</wd-row>
<wd-row justify="space-between">
  <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
  <wd-col :span="6"><view class="bg-light">between</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
</wd-row>
<wd-row justify="space-around">
  <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
  <wd-col :span="6"><view class="bg-light">around</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
</wd-row>
```

### Align 对齐

通过 `align` 属性可以设置交叉轴对齐方式，可选值为 `top`、`middle`、`bottom`。

```html
<wd-row align="middle">
  <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">middle</view></wd-col>
  <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">middle</view></wd-col>
  <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">middle</view></wd-col>
</wd-row>
<wd-row align="bottom">
  <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">bottom</view></wd-col>
  <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">bottom</view></wd-col>
  <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">bottom</view></wd-col>
</wd-row>
```

## Row Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 列元素之间的间距（单位为 px） | `number` | `0` |
| justify | 主轴对齐方式，可选值为 `start`、`center`、`end`、`space-between`、`space-around`、`space-evenly` | `string` | `start` |
| align | 交叉轴对齐方式，可选值为 `top`、`middle`、`bottom` | `string` | `top` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Col Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列元素宽度（栅格占据的列数，共 24 列） | `number` | `24` |
| offset | 列元素偏移距离（栅格左侧的间隔列数） | `number` | `0` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Row Slots

| name | 说明 |
| --- | --- |
| default | 行内容 |

## Col Slots

| name | 说明 |
| --- | --- |
| default | 列内容 |
