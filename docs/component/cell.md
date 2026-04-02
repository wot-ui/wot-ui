# Cell 单元格

单元格用于信息展示与轻交互，可独立使用，也可通过 `wd-cell-group` 统一管理布局与样式。

## 组件类型

### 基本用法

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 分组标题

```html
<wd-cell-group title="交易管理" value="内容">
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 组件状态

### 点击反馈

```html
<wd-cell title="标题文字" value="内容" clickable @click="showToast" />
```

## 组件变体

### Placeholder

```html
<wd-cell-group>
  <wd-cell title="用户名" placeholder="请输入用户名" />
  <wd-cell title="手机号" value="188****8888" placeholder="请输入手机号" />
  <wd-cell title="左对齐" placeholder="请输入内容" value-align="left" />
  <wd-cell title="居中对齐" placeholder="请输入内容" value-align="center" />
</wd-cell-group>
```

### 页面跳转

```html
<wd-cell-group>
  <wd-cell title="帮助与反馈" is-link to="/pages/index/Index" />
  <wd-cell title="设置" value="内容" is-link to="/pages/button/Index" replace />
</wd-cell-group>
```

### 箭头方向

```html
<wd-cell-group>
  <wd-cell title="向上箭头" is-link arrow-direction="up" />
  <wd-cell title="向下箭头" is-link arrow-direction="down" />
  <wd-cell title="向左箭头" is-link arrow-direction="left" />
  <wd-cell title="默认箭头(向右)" is-link />
</wd-cell-group>
```

## 组件样式

### 图标设置

设置 `prefix-icon` 使用内置图标，或使用 `prefix` 插槽自定义前置图标。

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" prefix-icon="settings" />
  <wd-cell title="标题文字" value="内容">
    <template #prefix>
      <view class="cell-icon"></view>
    </template>
  </wd-cell>
</wd-cell-group>
```

### 大尺寸

```html
<wd-cell-group>
  <wd-cell size="large" title="标题文字" value="内容" />
  <wd-cell size="large" title="标题文字" value="内容" prefix-icon="settings" is-link />
  <wd-cell size="large" title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 垂直居中

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" center />
  <wd-cell title="标题文字" label="描述信息" value="内容" center />
</wd-cell-group>
```

### 圆角卡片风格

```html
<wd-cell-group insert>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 特殊样式

### 展示边框线

```html
<wd-cell-group title="交易管理" border>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell :border="false" title="标题文字" label="这一个 cell 不想要边框" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 表单属性

```html
<wd-cell-group border>
  <wd-cell title="必填" required>
    <wd-rate v-model="rate" />
  </wd-cell>
  <wd-cell title="必填星号在右侧" required asterisk-position="end">
    <wd-rate v-model="rate1" />
  </wd-cell>
  <wd-cell title="上下结构" layout="vertical" required asterisk-position="end">
    <wd-slider v-model="slider" />
  </wd-cell>
</wd-cell-group>
```

### 设置左侧宽度

```html
<wd-cell
  title="标题文字"
  label="这里是文字描述这里是文字描述这里是文字描述"
  title-width="200px"
  value="内容"
/>
```

### 内容省略

```html
<wd-cell-group>
  <wd-cell title="正常显示" value="这是一段很长很长很长很长很长很长的内容" />
  <wd-cell title="省略号显示" value="这是一段很长很长很长很长很长很长的内容" ellipsis />
  <wd-cell title="左对齐省略" value="这是一段很长很长很长很长很长很长的内容" value-align="left" ellipsis />
</wd-cell-group>
```

### 自定义内容

```html
<wd-cell-group>
  <wd-cell title="标题文字" center>
    <wd-button size="small" plain>按钮</wd-button>
  </wd-cell>
  <wd-cell title="标题文字" center>
    <wd-switch v-model="switchValue" />
  </wd-cell>
  <wd-cell title="标题文字" is-link to="/pages/index/index">
    <view class="custom-text">订购</view>
  </wd-cell>
  <wd-cell>
    <template #title>
      <view>
        <view style="display: inline-block">标题文字</view>
        <view class="end-time">25天后到期</view>
      </view>
    </template>
  </wd-cell>
</wd-cell-group>
```

## CellGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | string | - |
| value | 分组右侧内容 | string | - |
| border | 是否展示外边框 | boolean | false |
| insert | 是否展示为圆角卡片风格 | boolean | false |
| center | 是否使内容垂直居中 | boolean | false |
| size | 单元格大小，支持 `large` | string | - |
| title-width | 左侧标题宽度 | `string \| number` | - |
| layout | 单元格布局方式，支持 `horizontal / vertical` | string | - |
| value-align | 右侧内容对齐方式，支持 `left / right / center` | string | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Cell Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | string | - |
| value | 右侧内容 | `string \| number` | `''` |
| placeholder | 占位符，仅在 value 为空时显示 | string | - |
| label | 标题下方描述信息 | string | - |
| prefix-icon | 前置图标名 | string | - |
| suffix-icon | 后置图标名 | string | - |
| icon-size | 图标大小 | `string \| number` | - |
| icon-prefix | 图标类名前缀 | string | - |
| to | 跳转地址 | string | - |
| replace | 跳转时是否替换当前页面历史 | boolean | false |
| clickable | 是否开启点击反馈 | boolean | false |
| is-link | 是否展示右侧箭头并开启点击反馈 | boolean | false |
| arrow-direction | 箭头方向（仅在 is-link 为 true 时生效），支持 `left / up / down / right` | string | right |
| size | 单元格大小，支持 `large` | string | - |
| border | 是否显示内边框，优先级高于 cell-group 同名属性 | boolean | 继承自 CellGroup |
| title-width | 左侧标题宽度 | `string \| number` | 继承自 CellGroup |
| center | 是否垂直居中 | boolean | 继承自 CellGroup |
| layout | 单元格布局方式，支持 `horizontal / vertical` | string | 继承自 CellGroup |
| value-align | 右侧内容对齐方式，支持 `left / right / center` | string | 继承自 CellGroup |
| required | 是否显示必填星号 | boolean | false |
| asterisk-position | 必填星号位置，支持 `start / end` | string | start |
| hide-asterisk | 是否隐藏必填星号 | boolean | false |
| ellipsis | 内容是否超出隐藏显示省略号 | boolean | false |
| use-title-slot | 是否启用 title 插槽 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |
| custom-prefix-class | 前置图标自定义样式类 | string | `''` |
| custom-suffix-class | 后置图标自定义样式类 | string | `''` |
| custom-label-class | label 区域自定义样式类 | string | `''` |
| custom-value-class | value 区域自定义样式类 | string | `''` |
| custom-title-class | title 区域自定义样式类 | string | `''` |

## Cell Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 当 clickable 或 is-link 为 true 时，点击单元格触发 | - |

## CellGroup Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| title | 分组标题 | - |
| value | 分组右侧内容 | - |

## Cell Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| prefix | 前置图标区域 | - |
| title | 标题区域 | - |
| label | 描述信息区域 | - |
| default | 右侧内容区域 | - |
| suffix | 后置图标区域（is-link 为 false 时生效） | - |
