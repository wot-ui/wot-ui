# Circle 环形进度条

圆环形进度条组件，支持颜色定制、渐变色、方向控制和插槽内容。

## 组件类型

### 基础用法

通过 `v-model` 绑定当前进度，`text` 控制中间文本。

```html
<wd-circle v-model="current" :text="`${current}%`" />
```

## 组件样式

### 宽度控制

通过 `stroke-width` 控制进度条宽度。

```html
<wd-circle v-model="current" :stroke-width="6" />
```

### 颜色定制

通过 `color` 控制进度条颜色，`layer-color` 控制轨道颜色。

```html
<wd-circle v-model="current" color="#ee0a24" layer-color="#eee" />
```

### 渐变色

`color` 支持对象格式定义渐变色。

```html
<wd-circle v-model="current" :color="gradientColor" />
```

```ts
const gradientColor = {
  '0': 'red',
  '100': 'white'
}
```

### 逆时针方向

设置 `clockwise` 为 `false`，进度从逆时针方向展开。

```html
<wd-circle v-model="current" :clockwise="false" />
```

### 大小定制

通过 `size` 控制圆环直径。

```html
<wd-circle v-model="current" :size="120" />
```

## 内容形态

### 使用默认插槽

不传 `text` 时可使用默认插槽自定义中心内容。

```html
<wd-circle v-model="current" :stroke-width="6">
  <view style="color: red">{{ current }}%</view>
</wd-circle>
```

## 特殊样式

### 进度控制

```html
<wd-button type="primary" size="small" @click="doAdd">增加</wd-button>
<wd-button type="danger" size="small" @click="doDecre">减少</wd-button>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前进度 | number | 0 |
| size | 圆环直径，单位 px | number | 120 |
| color | 进度条颜色，支持字符串或渐变对象 | `string \| Record<string, string>` | `#1C64FD` |
| layer-color | 轨道颜色 | string | `#F2F3F5` |
| fill | 填充颜色 | string | - |
| speed | 动画速度，单位 rate/s | number | 50 |
| text | 圆环中间文字 | string | - |
| stroke-width | 进度条宽度，单位 px | number | 18 |
| stroke-linecap | 端点形状，可选值为 `butt`、`round`、`square` | string | round |
| clockwise | 是否顺时针增加 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义圆环中心内容（仅在 `text` 为空时显示） | - |
