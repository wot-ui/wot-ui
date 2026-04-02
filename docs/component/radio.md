# Radio 单选框

单选框用于在一组备选项中进行单选。

## 组件类型

### 基本用法

`v-model` 为绑定值，即当前选中的 `wd-radio` 的 `value`。

```html
<wd-radio-group v-model="value">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio type="square" :value="2">单选框 2</wd-radio>
  <wd-radio type="dot" :value="3">单选框 3</wd-radio>
</wd-radio-group>
```

```ts
const value = ref(1)
```

### 按钮形态

设置 `type="button"`，可切换为按钮式单选。

```html
<wd-radio-group v-model="value" type="button">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

## 组件状态

### 禁用

可以在 `wd-radio-group` 上设置 `disabled`，统一禁用整组单选框；也可以在单个 `wd-radio` 上单独设置。

```html
<wd-radio-group v-model="value" disabled>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 只读状态

设置 `readonly` 后，单选项仍然展示当前值，但不会响应点击切换。

```html
<wd-radio-group v-model="value" readonly>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 允许取消选中

设置 `allow-uncheck` 后，点击当前已选中的单选项可以取消选中。

```html
<wd-radio-group v-model="value" allow-uncheck>
  <wd-radio :value="1">支持取消选中</wd-radio>
  <wd-radio :value="2">支持取消选中</wd-radio>
</wd-radio-group>
```

## 组件样式

### 图标位置

设置 `placement` 控制图标显示在文本左侧还是右侧。

```html
<wd-radio-group v-model="value" placement="right">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio :value="2">单选框 2</wd-radio>
</wd-radio-group>
```

### 修改选中的颜色

设置 `checked-color` 修改选中状态的图标颜色。

```html
<wd-radio-group v-model="value" checked-color="#fa4350">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 修改未选中颜色

设置 `unchecked-color` 修改未选中状态的图标颜色。

```html
<wd-radio-group v-model="value" unchecked-color="#fa4350">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

## 特殊样式

### Props 优先级

单个 `wd-radio` 上设置的属性优先级高于 `wd-radio-group`。

```html
<wd-radio-group v-model="value" type="button" disabled checked-color="#fa4350">
  <wd-radio :value="1" checked-color="#000" :disabled="false">选项一</wd-radio>
  <wd-radio :value="2" :disabled="false">选项二</wd-radio>
  <wd-radio :value="3">选项三</wd-radio>
</wd-radio-group>
```

### 结合 Cell 使用

可以将 `wd-radio` 放入 `wd-cell` 的右侧区域，配合整行点击实现列表选择效果。

```html
<wd-radio-group v-model="value">
  <wd-cell-group border insert>
    <wd-cell title="单选框 1" clickable @click="value = 1">
      <template #right-icon>
        <wd-radio :value="1" />
      </template>
    </wd-cell>
    <wd-cell title="单选框 2" clickable @click="value = 2">
      <template #right-icon>
        <wd-radio :value="2" />
      </template>
    </wd-cell>
  </wd-cell-group>
</wd-radio-group>
```

### 自定义图标

通过 `icon` 插槽可自定义选中与未选中图标。

```html
<wd-radio-group v-model="value">
  <wd-radio :value="1">
    自定义图标
    <template #icon="{ isChecked }">
      <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
    </template>
  </wd-radio>
</wd-radio-group>
```

## 布局能力

### 同行展示

设置 `direction="horizontal"`，可让单选框同行排列。

```html
<wd-radio-group v-model="value" direction="horizontal">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio :value="2">单选框 2</wd-radio>
</wd-radio-group>
```

## RadioGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中的值，会自动匹配对应 `wd-radio` 的 `value` | `string \| number \| boolean` | - |
| type | 单选框类型，可选值为 `circle`、`dot`、`square`、`button` | `string` | `circle` |
| checked-color | 选中状态的图标颜色 | `string` | - |
| unchecked-color | 未选中状态的图标颜色 | `string` | - |
| disabled | 是否禁用整组单选框 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| placement | 图标位置，可选值为 `left`、`right` | `string` | `left` |
| direction | 布局方向，可选值为 `horizontal`、`vertical` | `string` | `vertical` |
| allow-uncheck | 是否允许取消当前已选中的值 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## RadioGroup Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `{ value }` |

## Radio Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选项的值，会与 `wd-radio-group` 的 `v-model` 匹配 | `string \| number \| boolean` | - |
| type | 单选框类型，可选值为 `circle`、`dot`、`square`、`button` | `string` | 继承自 `wd-radio-group` |
| checked-color | 选中状态的图标颜色 | `string` | 继承自 `wd-radio-group` |
| unchecked-color | 未选中状态的图标颜色 | `string` | 继承自 `wd-radio-group` |
| disabled | 是否禁用当前单选项 | `boolean` | 继承自 `wd-radio-group` |
| readonly | 是否只读 | `boolean` | 继承自 `wd-radio-group` |
| placement | 图标位置，可选值为 `left`、`right` | `string` | 继承自 `wd-radio-group` |
| direction | 布局方向，可选值为 `horizontal`、`vertical` | `string` | 继承自 `wd-radio-group` |
| custom-label-class | 自定义文本节点类名 | `string` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 组件 | name | 说明 | 参数 |
| --- | --- | --- | --- |
| wd-radio | default | 单选项文本内容 | - |
| wd-radio | icon | 自定义图标内容 | `{ isChecked }` |

