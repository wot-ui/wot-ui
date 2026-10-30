# Pagination 分页

当数据量过多时，使用分页分解数据。

## 组件类型

### 基本用法

通过 `v-model` 来绑定当前页码，`total`设置总条数，`page-size`设置一页展示条数，默认为10条，总页数通过`total`和`page-size`自动计算。

```html
<wd-pagination v-model="value" :total="190" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## 组件变体

### 按钮风格

通过 `button-variant` 设置按钮风格，可选值为 `text`、`plain`、`dashed`、`base`。

```html
<wd-pagination v-model="value1" :total="190" button-variant="plain" />
<wd-pagination v-model="value2" :total="190" button-variant="dashed" />
<wd-pagination v-model="value3" :total="190" button-variant="base" />
```

### Icon 图标

设置 `show-icon` 属性，将分页导航展示为Icon图标。

```html
<wd-pagination v-model="value" :total="19" @change="handleChange" show-icon />
```

### 文字提示

设置 `show-message` 属性，展示文字提示。

```html
<wd-pagination 
  v-model="value" 
  :total="total" 
  :page-size="pageSize" 
  @change="handleChange" 
  show-icon 
  show-message
/>
```

```typescript
const value = ref<number>(1)
const total = ref<number>(160)
const pageSize = ref<number>(20)
```

## 内容形态

### 自定义插槽

组件提供 `prev`、`size`、`next`、`message` 四个插槽，可用于自定义分页按钮、中间页码信息和底部提示。

```html
<wd-pagination v-model="value" :total="190" show-message>
  <template #prev="{ modelValue }">
    <wd-button :disabled="modelValue <= 1" size="small" type="danger" @click="value -= 1">上一页</wd-button>
  </template>
  <template #next="{ modelValue, totalPageNum }">
    <wd-button :disabled="modelValue >= totalPageNum" size="small" type="danger" @click="value += 1">下一页</wd-button>
  </template>
  <template #size="{ modelValue, totalPageNum }">
    <view class="custom-pagination__content">
      <text class="custom-pagination__page">{{ modelValue }}</text>
      <text class="custom-pagination__separator">/</text>
      <text class="custom-pagination__total">{{ totalPageNum }}</text>
    </view>
  </template>
  <template #message="{ total }">
    <view class="custom-pagination__message">当前第{{ value }}页，共{{ total }}条数据</view>
  </template>
</wd-pagination>
```

```scss
.custom-pagination__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.custom-pagination__page {
  color: #f00;
}

.custom-pagination__separator {
  margin: 0 5px;
}

.custom-pagination__total {
  color: #00f;
}

.custom-pagination__message {
  margin-top: 10px;
  color: #999;
  text-align: center;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前页码 | `number` | - |
| total-page | 总页数；传入 `total` 时会优先根据 `total` 与 `page-size` 计算 | `number` | `1` |
| total | 总数据条数 | `number` | `0` |
| page-size | 每页条数 | `number` | `10` |
| prev-text | 上一页按钮文字；未设置时使用内置国际化文案 | `string` | - |
| next-text | 下一页按钮文字；未设置时使用内置国际化文案 | `string` | - |
| show-icon | 是否展示翻页图标 | `boolean` | `false` |
| show-message | 是否展示文字提示 | `boolean` | `false` |
| button-variant | 分页按钮风格，可选值为 `base`、`plain`、`dashed`、`text` | `ButtonVariant` | `text` |
| hide-if-one-page | 总页数只有一页时是否隐藏 | `boolean` | `false` |
| glass | 是否启用玻璃（glassmorphism）样式 | boolean | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 页码变化时触发 | `{ value }` |
| update:modelValue | `v-model` 更新时触发 | `value: number` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| prev | 自定义上一页按钮 | `{ modelValue, totalPageNum, total, pageSize }` |
| size | 自定义中间页码显示区域 | `{ modelValue, totalPageNum, total, pageSize }` |
| next | 自定义下一页按钮 | `{ modelValue, totalPageNum, total, pageSize }` |
| message | 自定义底部提示信息，仅在 `show-message` 为 `true` 时生效 | `{ modelValue, totalPageNum, total, pageSize }` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
