# Tag 标签

用于标记状态或者概括主要内容。

## 组件类型

### 基本用法

通过 `type` 设置不同标签类型。

```html
<wd-tag>标签</wd-tag>
<wd-tag type="primary">常用标签</wd-tag>
<wd-tag type="danger">危险标签</wd-tag>
<wd-tag type="warning">警告标签</wd-tag>
<wd-tag type="success">成功标签</wd-tag>
```

## 组件变体

### 标签尺寸

通过 `size` 设置标签尺寸，支持 `small`、`medium`、`default`、`large`、`extra-large`。

```html
<wd-tag type="primary" size="small">小标签</wd-tag>
<wd-tag type="primary" size="medium">中标签</wd-tag>
<wd-tag type="primary">默认标签</wd-tag>
<wd-tag type="primary" size="large">较大标签</wd-tag>
<wd-tag type="primary" size="extra-large">特大标签</wd-tag>
```

### 浅色标签

设置 `variant="light"` 展示浅色标签。

```html
<wd-tag variant="light">标签</wd-tag>
<wd-tag type="primary" variant="light">常用标签</wd-tag>
<wd-tag type="danger" variant="light">危险标签</wd-tag>
```

### 镂空标签

设置 `variant="plain"` 展示镂空样式。

```html
<wd-tag variant="plain">标签</wd-tag>
<wd-tag type="primary" variant="plain">常用标签</wd-tag>
```

### 虚线标签

设置 `variant="dashed"` 展示虚线边框。

```html
<wd-tag variant="dashed">标签</wd-tag>
<wd-tag type="warning" variant="dashed">警告标签</wd-tag>
```

### 纯文本标签

设置 `variant="text"` 展示纯文本样式。

```html
<wd-tag variant="text">标签</wd-tag>
<wd-tag type="success" variant="text">成功标签</wd-tag>
```

## 组件样式

### 标记标签

设置 `mark` 生成标记样式。

```html
<wd-tag mark>标签</wd-tag>
<wd-tag type="primary" mark>常用标签</wd-tag>
```

### 幽灵标记标签

组合 `mark` 和 `variant="plain"` 展示幽灵标记样式。

```html
<wd-tag mark variant="plain">标签</wd-tag>
<wd-tag type="success" mark variant="plain">成功标签</wd-tag>
```

### 圆角标签

设置 `round` 生成圆角样式。

```html
<wd-tag round>标签</wd-tag>
<wd-tag type="primary" round>常用标签</wd-tag>
```

### 设置图标

可通过 `icon` 属性或 `icon` 插槽自定义左侧图标。

```html
<wd-tag icon="clock-circle" type="primary" mark>标签</wd-tag>

<wd-tag type="primary" mark>
  <text>插槽</text>
  <template #icon>
    <wd-icon name="thunderbolt" />
  </template>
</wd-tag>
```

### 自定义颜色

通过 `color` 设置文字颜色，通过 `bg-color` 设置背景色和边框色。

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
<wd-tag color="#FAA21E" bg-color="#FAA21E" variant="plain">标签</wd-tag>
```

## 特殊样式

### 可关闭

设置 `closable` 后，点击关闭按钮会触发 `close` 事件。

```html
<wd-tag v-for="(tag, index) in closableStrongTags" :key="index" :type="tag.type" closable @close="handleCloseStrongTag(index)">
  {{ tag.value }}
</wd-tag>
```

```ts
const closableStrongTags = ref([
  { type: 'default', value: '标签' },
  { type: 'primary', value: '常用' }
])

function handleCloseStrongTag(order: number) {
  closableStrongTags.value = closableStrongTags.value.filter((_, index) => index !== order)
}
```

### 新增标签

设置 `dynamic` 生成新增标签样式，输入确认后触发 `confirm` 事件；可通过 `add` 插槽自定义新增按钮内容。

::: code-group

```html [vue]
<wd-tag v-for="(tag, index) in dynamicTags" :key="index" type="primary" closable @close="handleClose1(index)">
  {{ tag }}
</wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm"></wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm">
  <template #add>
    <wd-icon name="pushpin" size="12px"></wd-icon>
    <text style="margin-left: 4px">自定义</text>
  </template>
</wd-tag>
```

```ts [ts]
const dynamicTags = ref(['标签一', '标签二'])

function handleClose1(order: number) {
  dynamicTags.value = dynamicTags.value.filter((item, index) => index !== order)
}

function handleConfirm({ value }: { value: string }) {
  if (!value) return
  dynamicTags.value = [...dynamicTags.value, value]
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 标签尺寸，可选值为 `small`、`medium`、`large`、`extra-large`、`default` | `TagSize` | `default` |
| type | 标签类型，可选值为 `default`、`primary`、`success`、`warning`、`danger`、`volcano`、`lightblue`、`cyan`、`pink`、`purple` | `TagType` | `default` |
| icon | 左侧图标 | `string` | `''` |
| icon-prefix | 图标类名前缀，用法参考 Icon 组件 | `string` | - |
| css-icon | CSS 图标，用法参考 Icon 组件 | `boolean \| string` | `false` |
| closable | 是否可关闭 | `boolean` | `false` |
| dynamic | 是否为新增标签 | `boolean` | `false` |
| color | 文字颜色 | `string` | `''` |
| bg-color | 背景色和边框色 | `string` | `''` |
| round | 是否圆角 | `boolean` | `false` |
| mark | 是否标记样式 | `boolean` | `false` |
| variant | 标签变体，可选值为 `light`、`dark`、`plain`、`dashed`、`text` | `TagVariant` | `dark` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击标签时触发 | `MouseEvent` |
| close | 点击关闭按钮时触发 | `MouseEvent` |
| confirm | 新增标签输入确认后触发 | `{ value: string }` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 标签内容 |
| icon | 自定义图标 |
| add | 自定义新增标签内容，`dynamic` 为 `true` 时生效 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |
