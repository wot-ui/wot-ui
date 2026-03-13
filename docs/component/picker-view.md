#  PickerView 选择器视图

选择器视图，用于从一组数据中选择单个或多个值。

## 基本用法

单列选择器，给 `columns` 传入一个数值数组，设置 `v-model` 绑定值。选项可以为字符串，也可以为对象，如果为对象则默认取选项 `label` 属性为选项内容进行渲染，`v-model` 获取的值为选项 `value` 属性的值，如果选项 `value` 属性不存在，则取选项 `label` 的值。

```html
<wd-picker-view :columns="columns" v-model="value" @change="onChange" />
```
```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const value3 = ref<string>('')
function onChange({ selectedValues, columnIndex }) {
  toast.show(`当前选中项: ${selectedValues}, 下标: ${columnIndex}`)
}
```

当 `columns` 选项为对象时，其数据结构为：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|-----|------|---------|
| value | string / number / boolean | 选项值，如果 value 属性不存在，则使用 label 作为选项的值 | - |
| label | string | 选项文本内容 | - |
| disabled | boolean | 选项是否禁用 | - |

## 禁用选项

选项可以为对象，设置 `disabled` 属性。

```html
<wd-picker-view :columns="columns" v-model="value" disabled />
```
```typescript
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const value = ref('选项3')
```

## 加载中

设置 `loading` 属性。

```html
<wd-picker-view :columns="columns" loading />
```
## 多列

`columns` 属性设置为二维数组，`value` 为数组。

```html
<wd-picker-view :columns="columns" v-model="value" />
```
```typescript
const value = ref(['中南大学', '软件工程'])

const columns = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])

```

## 多级联动

> 从 2.0 版本开始，多级联动采用新的实现方式。推荐使用 `cascade` 属性搭配树形数据结构（带 `children` 字段）实现级联选择。

设置 `cascade` 属性为 `true`，并传入带有 `children` 字段的树形数据。组件会自动根据选中项展开对应的下级数据。

```html
<wd-picker-view :columns="cascadeColumns" v-model="value" cascade />
```

```typescript
const value = ref(['110000', '110100', '110102'])

const cascadeColumns = ref([
  {
    label: '北京',
    value: '110000',
    children: [
      {
        label: '北京市',
        value: '110100',
        children: [
          { label: '东城区', value: '110101' },
          { label: '西城区', value: '110102' },
          { label: '朝阳区', value: '110105' },
          { label: '丰台区', value: '110106' },
          { label: '石景山区', value: '110107' }
        ]
      }
    ]
  },
  {
    label: '广东省',
    value: '440000',
    children: [
      {
        label: '广州市',
        value: '440100',
        children: [
          { label: '荔湾区', value: '440103' },
          { label: '越秀区', value: '440104' },
          { label: '海珠区', value: '440105' }
        ]
      },
      {
        label: '深圳市',
        value: '440300',
        children: [
          { label: '罗湖区', value: '440303' },
          { label: '福田区', value: '440304' }
        ]
      }
      // ... 更多城市
    ]
  }
])
```


## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model | 选中项，如果为多列选择器，则其类型应为数组 | string / number / boolean / array | - | - | - |
| columns | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器；如果开启 cascade，则为树形数据（带 children） | array | - | - | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | string | - | #4D80F0 | - |
| columns-height | picker内部滚筒高 | number | - | 231 | - |
| item-height | picker item的高度 | number | - | 35 | 1.13.0 |
| value-key | 选项对象中，value对应的 key | string | - | value | - |
| label-key | 选项对象中，展示的文本对应的 key | string | - | label | - |
| cascade | 是否开启级联模式，开启后 columns 应为树形数据（带 children） | boolean | - | false | 2.0.0 |
| children-key | 级联模式下，选项对象中 children 对应的 key | string | - | children | 2.0.0 |
| immediate-change | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 | boolean | - | false | 1.2.25 |


 

## Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| getSelectedLabels | 获取所有列选中项的文本，返回值为一个数组 | - | - |
| getColumnIndex | 获取某一列的选中项下标 | columnIndex | - |
| getColumnData | 获取某一列的选项 | columnIndex | - |
| getColumnsData | 获取所有列的选项数据 | - | - |
| getSelectedOptions | 获取所有列的选中项 | - | - |
| getSelectedValues | 获取所有列的选中值 | - | - |
| getSelectedIndex | 获取所有列的选中下标 | - | - |
| resetColumns | 重置列数据为指定列数据 | columns（类型与props中columns相同） | 1.3.9 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|------|--------|
| change | 选项值修改时触发 | { selectedValues, selectedOptions, selectedIndexes, columnIndex } | - |
| pickstart | 当滚动选择开始时候触发事件 | - | - |
| pickend | 当滚动选择结束时候触发事件 | - | - |

**change 事件参数说明：**

| 参数名 | 说明 | 类型 |
|-------|------|------|
| selectedValues | 所有列的选中值数组 | Array<string \| number> |
| selectedOptions | 所有列的选中项对象数组 | Array<PickerOption> |
| selectedIndexes | 所有列的选中下标数组 | Array<number> |
| columnIndex | 当前变化的列索引（单列时为选中项下标） | number |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
