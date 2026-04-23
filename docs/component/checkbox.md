# Checkbox 复选框

用于在一组备选项中进行多选，支持普通样式、按钮样式、自定义图标及全选控制。

## 组件类型

### 基本用法

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3" type="square">多选 3</wd-checkbox>
  <wd-checkbox :name="4" type="dot">多选 4</wd-checkbox>
</wd-checkbox-group>
```

### 单独使用

`wd-checkbox` 可以不依赖 `wd-checkbox-group` 单独使用，通过 `v-model` 绑定选中状态（默认 `true-value` 为 `true`，`false-value` 为 `false`），也可通过 `true-value` / `false-value` 自定义选中与非选中时的值。

```html
<wd-checkbox v-model="checked">同意协议</wd-checkbox>
```

```ts
const checked = ref(false)
```

**自定义选中/非选中值**

```html
<wd-checkbox v-model="agree" true-value="yes" false-value="no">同意协议</wd-checkbox>
```

```ts
const agree = ref('no')
```

## 组件状态

### 禁用状态

```html
<wd-checkbox-group v-model="value" disabled>
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>

<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2" disabled>多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 半选状态

```html
<wd-checkbox v-model="checked" :indeterminate="indeterminate" @change="indeterminate = false">半选状态</wd-checkbox>
```

### 只读状态

```html
<wd-checkbox-group v-model="value" readonly>
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

## 组件变体

### 勾选在右侧

```html
<wd-checkbox-group v-model="value" placement="right">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 按钮样式

```html
<wd-checkbox-group v-model="value" type="button">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 同行展示

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 最小与最大可选数量

```html
<wd-checkbox-group v-model="value" :min="1" :max="3">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3">多选 3</wd-checkbox>
  <wd-checkbox :name="4">多选 4</wd-checkbox>
</wd-checkbox-group>
```

## 组件样式

### 修改选中颜色

```html
<wd-checkbox-group v-model="value" checked-color="#fa4350">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 修改未选中颜色

```html
<wd-checkbox-group v-model="value" unchecked-color="#fa4350">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 自定义图标

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">
    自定义图标
    <template #icon="{ isChecked }">
      <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
    </template>
  </wd-checkbox>
</wd-checkbox-group>
```

### 尺寸

```html
<wd-checkbox-group v-model="value" size="large">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

## 特殊样式

### 结合 Cell 使用

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-cell-group border value-align="right">
    <wd-cell title="点赞" clickable @click="toggle(1)">
      <wd-checkbox :name="1" />
    </wd-cell>
    <wd-cell title="投币" clickable @click="toggle(2)">
      <wd-checkbox :name="2" />
    </wd-cell>
    <wd-cell title="一键三连" clickable @click="toggle(3)">
      <wd-checkbox :name="3" />
    </wd-cell>
  </wd-cell-group>
</wd-checkbox-group>
```

### 全选切换

```html
<wd-button @click="checkboxGroup?.toggleAll()">全部切换</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(true)">全选</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(false)">全不选</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ skipDisabled: true })">全部切换（跳过禁用）</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ checked: true, skipDisabled: true })">全选（跳过禁用）</wd-button>

<wd-checkbox-group v-model="value" ref="checkboxGroup">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3" disabled>多选 3</wd-checkbox>
  <wd-checkbox :name="4">多选 4</wd-checkbox>
</wd-checkbox-group>
```

## Checkbox Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单独使用时的绑定值 | `string \| number \| boolean` | false |
| name | 在 CheckboxGroup 中的唯一标识值 | `string \| number \| boolean` | `''` |
| type | 形状类型，支持 `circle / square / button / dot` | string | 继承自 CheckboxGroup |
| checked-color | 选中颜色 | string | 继承自 CheckboxGroup |
| unchecked-color | 未选中颜色 | string | 继承自 CheckboxGroup |
| disabled | 是否禁用 | `boolean \| null` | 继承自 CheckboxGroup |
| readonly | 是否只读 | `boolean \| null` | 继承自 CheckboxGroup |
| indeterminate | 是否半选状态（样式优先级最高） | boolean | false |
| true-value | 单独使用时的选中值 | `string \| number \| boolean` | true |
| false-value | 单独使用时的非选中值 | `string \| number \| boolean` | false |
| size | 尺寸，支持 `large` | string | 继承自 CheckboxGroup |
| placement | 勾选图标位置，支持 `left / right` | string | 继承自 CheckboxGroup |
| direction | 布局方向，支持 `horizontal / vertical` | string | 继承自 CheckboxGroup |
| max-width | 文本最大宽度 | string | - |
| custom-label-class | label 文本自定义类名 | string | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## CheckboxGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值数组 | `Array<string \| number \| boolean>` | `[]` |
| type | 形状类型，支持 `circle / square / button / dot` | string | circle |
| checked-color | 选中颜色 | string | - |
| unchecked-color | 未选中颜色 | string | - |
| disabled | 是否禁用全部选项 | boolean | false |
| readonly | 是否只读全部选项 | boolean | false |
| min | 最小可选数量 | number | 0 |
| max | 最大可选数量，`0` 表示不限制 | number | 0 |
| size | 尺寸，支持 `large` | string | - |
| placement | 勾选图标位置，支持 `left / right` | string | left |
| direction | 布局方向，支持 `horizontal / vertical` | string | vertical |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Checkbox Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 单独使用时，绑定值变化后触发 | `{ value }` |

## CheckboxGroup Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 组选中值变化后触发 | `{ value }` |

## Checkbox Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| toggle | 切换当前选中状态 | - |

## CheckboxGroup Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| toggleAll | 批量切换全部选项状态 | `boolean \| { checked?: boolean; skipDisabled?: boolean }` |

## Checkbox Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义文本内容 | - |
| icon | 自定义图标 | `{ isChecked }` |

## CheckboxGroup Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 复选框列表内容 | - |
