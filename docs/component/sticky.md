#  Sticky 粘性布局

粘性布局组件，用于在页面滚动时将元素固定在指定位置。

## 组件类型

### 基本用法

将需要吸顶的内容包裹在 `wd-sticky` 组件内即可。

> 注意：被包裹的元素在样式中使用百分比单位 `width:xx%;height:xx%;` 无效，建议使用 `vh`、`vw`。

```html
<wd-sticky>
  <wd-button type="success">基础用法</wd-button>
</wd-sticky>
```

### 指定容器

将 `wd-sticky` 放入相对容器中，再使用 `wd-sticky-box` 包裹该容器，可限制吸顶区域。

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky>
      <wd-button type="warning">指定容器</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

```scss
.container {
  height: 120px;
  width: 100vw;
}
```

## 组件样式

### 吸顶距离

通过 `offset-top` 设置组件吸顶时与顶部的距离。

::: tip 提醒
在 H5 端默认导航栏为普通元素，所以吸顶距离会自动在 `offset-top` 的基础上增加 `44px`。当 H5 端使用自定义导航栏时，需要自行扣除这部分高度。
:::

```html
<wd-sticky :offset-top="50">
  <wd-button>吸顶距离</wd-button>
</wd-sticky>
```

### 相对容器吸顶距离

`offset-top` 也可以与 `wd-sticky-box` 组合使用。

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky :offset-top="150">
      <wd-button type="warning">相对容器吸顶距离</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

## 特殊样式

### 动态插入

`wd-sticky` 支持包裹动态生成的内容。

> 注意包裹动态生成的内容时，内容的宽高不小于 `1px`

```html
<wd-button type="info" plain @click="insert">点击插入</wd-button>
<wd-sticky>
  <wd-button v-if="show" type="danger">动态生成</wd-button>
</wd-sticky>
```

```ts
const show = ref(false)

function display() {
  show.value = true
}

function insert() {
  display()
}

onShow(() => {
  setTimeout(display, 5000)
})
```

## Sticky Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| z-index | 层级 | `number` | `1` |
| offset-top | 吸顶距离 | `number` | `0` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Sticky Slots

| name | 说明 |
| --- | --- |
| default | 需要吸顶的内容 |

## Sticky 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

## Sticky Box Slots

| name | 说明 |
| --- | --- |
| default | 相对容器内容 |

## Sticky Box 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |