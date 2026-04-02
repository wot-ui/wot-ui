# SortButton 排序按钮

用于展示排序按钮，支持升序、降序、重置三种状态。

## 组件类型

### 基本用法

使用 `v-model` 绑定当前排序状态，取值为 `-1`、`0`、`1`，分别表示降序、重置状态、升序。

```html
<wd-sort-button v-model="value" title="价格" @change="handleChange" />
```

```ts
const value = ref(0)

function handleChange({ value }) {
  console.log(value)
}
```

## 组件变体

### 允许重置

设置 `allow-reset` 后，排序按钮可回到重置状态。

```html
<wd-sort-button v-model="value" title="价格" allow-reset />
```

### 优先切换为降序

设置 `desc-first` 后，首次切换优先进入降序。

```html
<wd-sort-button v-model="value" title="价格" desc-first />
```

## 组件样式

### 显示下划线

设置 `line` 显示下划线。

```html
<wd-sort-button v-model="value" title="价格" line />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前排序方向值，`1` 表示升序，`0` 表示重置状态，`-1` 表示降序 | `SortButtonValue` | `0` |
| title | 排序按钮文案 | `string` | `''` |
| allow-reset | 是否允许重置为未选中状态 | `boolean` | `false` |
| desc-first | 是否优先切换为降序 | `boolean` | `false` |
| line | 是否显示下划线 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 排序方向变化时触发 | `{ value }` |

