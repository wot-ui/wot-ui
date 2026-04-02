# Cascader 级联选择器

用于处理树形结构数据的分级选择，支持静态数据与异步加载两种模式。

::: tip 提示
省市区场景可直接使用 `@vant/area-data` 的 `useCascaderAreaData` 作为数据源。
:::

## 组件类型

### 基础用法

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### 初始选项

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### 自定义字段

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="customOptions"
  value-key="id"
  text-key="name"
  children-key="items"
  @confirm="handleConfirm"
/>
```

## 组件状态

### 禁用选项

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithDisabled" @confirm="handleConfirm" />
```

### 选项提示信息

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithTip" @confirm="handleConfirm" />
```

### 确定前校验

`before-confirm` 支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="options"
  :before-confirm="beforeConfirm"
  @confirm="handleConfirm"
/>
```

```ts
const beforeConfirm = async (value, selectedOptions) => {
  if (String(value) === '120000') return false
  return true
}
```

## 组件样式

### 展示格式化

```ts
const handleConfirm = ({ selectedOptions }) => {
  displayValue.value = `${selectedOptions[selectedOptions.length - 2].text}-${selectedOptions[selectedOptions.length - 1].text}`
}
```

### 设置标题

```html
<wd-cascader v-model="value" v-model:visible="show" title="选择地址" :options="options" @confirm="handleConfirm" />
```

## 特殊样式

### 异步加载

传入 `lazy-load` 后进入异步模式：`option = null` 时加载根节点，`resolve([])` 表示当前节点为叶子节点。

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

```ts
const lazyLoad = (option, tabIndex, resolve) => {
  fetchChildren(option ? String(option.value) : null).then(resolve)
}
```

### 异步加载（无初始值）

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

### 任意级可选

开启 `check-strictly` 后，点击节点仅更新当前路径，通过右上角确认按钮提交。

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" check-strictly @confirm="handleConfirm" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项。静态模式为叶子节点值；异步模式可传路径数组用于回显 | `string \| number \| (string \| number)[]` | - |
| visible / v-model:visible | 是否显示弹窗 | boolean | false |
| options | 层级选项数据（树形结构） | `CascaderOption[]` | `[]` |
| title | 弹出层标题 | string | - |
| before-confirm | 确定前校验函数，参数为 `(value, selectedOptions)`，返回 `boolean` 或 `Promise<boolean>` | `CascaderBeforeConfirm` | - |
| check-strictly | 是否开启任意级可选 | boolean | false |
| confirm-text | 严格模式下确认按钮文案 | string | `''` |
| value-key | 选项值字段名 | string | value |
| text-key | 选项文本字段名 | string | text |
| children-key | 子节点字段名 | string | children |
| tip-key | 提示文案字段名 | string | tip |
| is-leaf-key | 叶子节点标识字段名，值为 `true` 时点击即确认 | string | isLeaf |
| lazy-load | 异步加载回调，参数为 `(option, tabIndex, resolve)` | `CascaderLazyLoad` | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| z-index | 弹窗层级 | number | 15 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iPhone X 类型机型） | boolean | true |
| line-width | 底部条宽度，支持 number 或带单位字符串 | `number \| string` | - |
| line-height | 底部条高度，支持 number 或带单位字符串 | `number \| string` | - |
| line-theme | 底部条位置样式，支持 `normal / text / underline / dot` | string | normal |
| root-portal | 是否脱离文档流渲染（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## CascaderOption 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | `string \| number` |
| text | 选项文本 | string |
| children | 子选项 | `CascaderOption[]` |
| disabled | 是否禁用 | boolean |
| tip | 提示文案 | string |
| isLeaf | 是否为叶子节点（异步模式） | boolean |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 确认选择时触发 | 静态模式：`{ value, selectedOptions }`，`value` 为叶子值；异步模式：`{ value, selectedOptions }`，`value` 为路径数组 |
| close | 弹窗关闭时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开级联弹窗 | - |
| close | 关闭级联弹窗 | - |
