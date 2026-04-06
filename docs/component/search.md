# Search 搜索框

搜索框组件，支持输入框聚焦、失焦、输入、搜索、取消、清空事件。

## 组件类型

### 基本用法

`v-model` 设置输入框绑定值，`change` 监听输入事件，`search` 监听搜索事件，`cancel` 监听取消事件，`clear` 监听清空事件。

```html
<wd-search v-model="value" @search="search" @clear="clear" @cancel="cancel" @change="change" />
```

```ts
const value = ref<string>('')

function search({ value }: { value: string }) {
  console.log('搜索', value)
}
function clear() {
  console.log('重置')
}
function cancel({ value }: { value: string }) {
  console.log('取消', value)
}
function change({ value }: { value: string }) {
  console.log('输入', value)
}
```

## 组件状态

### 自动聚焦

设置 `focus` 属性，组件挂载后自动聚焦。

```html
<wd-search v-model="value" focus />
```

### 清空后自动聚焦

设置 `focus-when-clear`，点击清空按钮后重新聚焦输入框。

```html
<wd-search v-model="value" focus-when-clear />
```

### 禁用并隐藏取消按钮

设置 `disabled` 和 `hide-cancel`。可用于跳转到独立搜索页的入口场景。

```html
<wd-search disabled hide-cancel @click="handleDisabledClick" />
```

## 组件变体

### 样式变体

通过 `variant` 切换不同视觉样式，可选值为 `plain`、`filled`、`light`。

```html
<wd-search variant="plain" v-model="value" />
<wd-search variant="filled" v-model="value" />
<wd-search variant="light" v-model="value" />
```

## 组件样式

### 输入框提示文案靠左

设置 `placeholder-left` 属性。

```html
<wd-search placeholder-left />
```

### 设置最大长度

通过 `maxlength` 限制输入框最大长度，`-1` 表示不限制。

```html
<wd-search v-model="value" :maxlength="4" />
```

### 自定义文案

通过 `placeholder` 修改占位文本，`cancel-txt` 修改取消按钮文案。

```html
<wd-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
```

## 特殊样式

### 自定义左侧插槽

通过 `prefix` 插槽自定义搜索框左侧内容。

```html
<wd-search v-model="value">
  <template #prefix>
    <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
      <view class="search-type">
        <text>{{ searchType }}</text>
        <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
      </view>
    </wd-popover>
  </template>
</wd-search>
```

```typescript
const searchType = ref<string>('全部')
const value = ref<string>('')
const menu = ref([
  {
    content: '全部'
  },
  {
    content: '订单号'
  },
  {
    content: '退款单号'
  }
])

function changeSearchType({ item }) {
  searchType.value = item.content
}
```

```scss
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
```

### 自定义输入框右侧图标

```html
<wd-search v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
</wd-search>
```

### 自定义右侧插槽

```html
<wd-search v-model="value">
  <template #suffix>
    <view>筛选条件</view>
  </template>
</wd-search>
```

### 多种插槽组合

```html
<wd-search variant="plain" v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
  <template #suffix>
    <view class="action-icons">
      <wd-icon name="filter" size="20px"></wd-icon>
      <wd-icon name="plus-circle-fill" size="20px"></wd-icon>
    </view>
  </template>
</wd-search>
```


## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入框内容，双向绑定 | `string` | `''` |
| custom-input-class | 自定义输入框类名 | `string` | `''` |
| placeholder | 搜索框占位文本 | `string` | `'搜索'` |
| cancel-txt | 搜索框右侧文本 | `string` | `'取消'` |
| variant | 搜索框变体，可选值为 `plain`、`filled`、`light` | `string` | `'plain'` |
| hide-cancel | 是否隐藏右侧文本 | `boolean` | `false` |
| disabled | 是否禁用搜索框 | `boolean` | `false` |
| maxlength | 原生属性，设置最大长度，`-1` 表示无限制 | `number \| string` | `-1` |
| placeholder-left | placeholder 是否左对齐 | `boolean` | `false` |
| focus | 是否自动聚焦 | `boolean` | `false` |
| focus-when-clear | 是否在点击清空按钮后聚焦输入框 | `boolean` | `false` |
| placeholder-style | 原生属性，指定 placeholder 的样式，目前仅支持 `color`、`font-size` 和 `font-weight` | `string` | - |
| placeholder-class | 原生属性，指定 placeholder 的样式类 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 输入框聚焦事件 | `{ value }` |
| blur | 输入框失焦事件 | `{ value }` |
| search | 输入框搜索事件 | `{ value }` |
| clear | 点击清空按钮时触发 | - |
| cancel | 点击右侧文本时触发 | `{ value }` |
| change | 输入框内容变化时触发 | `{ value }` |
| click | 禁用状态下点击组件时触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| prefix | 输入框左侧自定义内容 |
| input-suffix | 输入框内部右侧自定义内容 |
| suffix | 输入框右侧自定义内容 |
