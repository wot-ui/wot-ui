# SelectPicker 单复选选择器

用于从一组选项中进行单选或多选，通常配合外部单元格或按钮控制弹层显示。

## 组件类型

### 基本用法

默认 `type` 为 `checkbox`，`v-model` 的值类型为数组。通常配合 `v-model:visible` 控制弹层开关。

```html
<wd-cell title="选择地址" :value="getDisplayValue(value)" is-link @click="show = true" />
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```ts
const columns = ref([
  { value: '101', label: '男装' },
  { value: '102', label: '奢侈品' },
  { value: '103', label: '女装' }
])

const value = ref<string[]>(['101'])
const show = ref(false)

function handleConfirm({ value }: { value: string[] }) {
  console.log(value)
}
```

### 类型切换

设置 `type="radio"` 开启单选模式，此时 `v-model` 的值类型为 `string`、`number` 或 `boolean`。

```html
<wd-select-picker type="radio" v-model="value" v-model:visible="show" :columns="columns" />
```

## 组件状态

### 禁用选项

选项数据支持 `disabled` 字段，用于禁用某一项。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```ts
const columns = ref([
  { value: '101', label: '男装', disabled: true },
  { value: '102', label: '奢侈品' },
  { value: '103', label: '女装' }
])
```

### 加载中

设置 `loading` 后会在内容区域显示加载状态。

```html
<wd-select-picker loading v-model="value" v-model:visible="show" :columns="columns" />
```

## 组件样式

### 设置标题

通过 `title` 自定义弹层标题。

```html
<wd-select-picker v-model="value" v-model:visible="show" title="多选" :columns="columns" />
```

### 可搜索

设置 `filterable` 开启本地搜索；单选和多选模式都支持。

```html
<wd-select-picker filterable v-model="value" v-model:visible="show" :columns="columns" />
<wd-select-picker filterable type="radio" v-model="singleValue" v-model:visible="show" :columns="columns" />
```

## 特殊样式

### 选项变化事件

选择器内部选项发生变化时，会触发 `change` 事件。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @change="handleChange" />
```

```ts
function handleChange({ value }: { value: string[] }) {
  console.log(value)
}
```

### 确定前校验

设置 `before-confirm`，可在点击确认按钮前执行同步或异步校验。返回 `false` 或 `Promise<false>` 时不会关闭弹层。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" :before-confirm="beforeConfirm" />
```

```ts
const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    if (value.length > 0) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
}
```

### 自动完成

`radio` 模式下可通过 `show-confirm="false"` 隐藏确认按钮，选中后自动完成。

```html
<wd-select-picker type="radio" :show-confirm="false" v-model="value" v-model:visible="show" :columns="columns" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项，`checkbox` 时为数组，`radio` 时为 `string`、`number` 或 `boolean` | `string \| number \| boolean \| (string \| number \| boolean)[]` | - |
| visible / v-model:visible | 控制弹层显示状态 | `boolean` | `false` |
| title | 弹出层标题 | `string` | `'选择器'` |
| checked-color | 单选框或复选框选中颜色 | `string` | - |
| min | 最小选中数量，仅 `checkbox` 生效 | `number` | `0` |
| max | 最大选中数量，`0` 表示不限制，仅 `checkbox` 生效 | `number` | `0` |
| select-size | 选择器内部选项尺寸 | `string` | - |
| loading | 是否显示加载状态 | `boolean` | `false` |
| loading-color | 加载图标颜色 | `string` | `'#4D80F0'` |
| close-on-click-modal | 点击遮罩是否关闭 | `boolean` | `true` |
| columns | 选择器数据，一维数组 | `Record<string, any>[]` | `[]` |
| type | 选择器类型，可选值为 `checkbox`、`radio` | `string` | `'checkbox'` |
| value-key | 选项对象中值字段的 key | `string` | `'value'` |
| label-key | 选项对象中展示文本字段的 key | `string` | `'label'` |
| confirm-button-text | 确认按钮文案 | `string` | `'确认'` |
| before-confirm | 确认前校验函数，接收当前选中值，返回 `boolean` 或 `Promise<boolean>` | `function` | - |
| z-index | 弹层层级 | `number` | `15` |
| safe-area-inset-bottom | 是否适配底部安全区 | `boolean` | `true` |
| filterable | 是否支持本地搜索 | `boolean` | `false` |
| filter-placeholder | 搜索框占位符 | `string` | `'搜索'` |
| scroll-into-view | 重新打开时是否滚动到选中项 | `boolean` | `true` |
| custom-content-class | 自定义弹层内容区域类名 | `string` | `''` |
| show-confirm | 是否显示确认按钮，仅 `radio` 模式生效 | `boolean` | `true` |
| root-portal | 是否从页面结构中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## 选项数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number \| boolean` | - |
| label | 选项文案 | `string` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择器内部选项变化时触发 | `{ value }` |
| cancel | 点击关闭按钮或遮罩关闭时触发 | - |
| confirm | 点击确认时触发 | `{ value, selectedItems }` |
| open | 弹层打开时触发 | - |
| close | 弹层关闭时触发 | - |

## Methods

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| open | 打开弹层 | `() => void` |
| close | 关闭弹层 | `() => void` |

