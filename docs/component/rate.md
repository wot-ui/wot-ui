# Rate 评分

用于快速评价，或展示评分结果。

## 组件类型

### 基本用法

设置 `v-model` 绑定当前分数，`num` 用于设置总分，默认值为 `5`。

```html
<wd-rate v-model="value" @change="handleChange" />
```

```ts
const value = ref(5)

function handleChange({ value }: { value: number }) {
  console.log(value)
}
```

## 组件状态

### 只读

设置 `readonly` 属性。

```html
<wd-rate v-model="value" readonly />
```

### 禁用

设置 `disabled` 属性。

```html
<wd-rate v-model="value" disabled />
```

## 组件样式

### 修改选中颜色

可以通过 `active-color` 修改选中图标颜色，也支持传入双色数组实现分段颜色。

```html
<wd-rate v-model="value" active-color="linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)" />
<wd-rate
  v-model="value"
  :active-color="[
    'linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)',
    'linear-gradient(315deg, rgba(245, 34, 34, 1) 0%, rgba(255, 117, 102, 1) 100%)'
  ]"
/>
```

### 修改图标与颜色

可以通过 `icon`、`active-icon` 分别设置未选中和选中图标，结合 `active-color` 自定义视觉风格。

```html
<wd-rate v-model="value" block icon="Fire" active-icon="Fire" active-color="var(--wot-red-6)" />
<wd-rate v-model="value" block icon="thumb-down-fill" active-icon="thumb-up-fill" active-color="var(--wot-green-6)" />
```

### 修改大小与间隔

通过 `size` 修改图标大小，`space` 修改图标间距。

```html
<wd-rate v-model="value" size="36" space="12px" />
```

## 特殊样式

### 允许半选

设置 `allow-half` 属性。

```html
<wd-rate v-model="value" allow-half />
```

### 允许清空评分

设置 `clearable` 属性后，再次点击当前最小分值时可清空评分。与 `allow-half` 组合时，可清空半星评分。

```html
<wd-rate v-model="value" clearable />
<wd-rate v-model="value" clearable allow-half />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前分数 | `number \| null` | `null` |
| num | 评分最大值 | `number` | `5` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 图标大小 | `string` | - |
| space | 图标间距 | `string \| number` | - |
| color | 未选中图标颜色 | `string` | - |
| active-color | 选中图标颜色，支持 `string` 或 `string[]` | `string \| string[]` | - |
| icon | 未选中图标类名 | `string` | `'star-fill'` |
| active-icon | 选中图标类名 | `string` | `'star-fill'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allow-half | 是否允许半选 | `boolean` | `false` |
| clearable | 是否允许再次点击后清除 | `boolean` | `false` |
| block | 是否块级显示 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 点击图标修改分值时触发 | `{ value }` |

