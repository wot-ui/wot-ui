# Picker 选择器

Picker 包含了一个弹出层（`wd-popup`）与一个选择器视图（`wd-picker-view`），不包含外层的触发元素（如 Input、Cell 等）。通常需要结合 `wd-cell` 或表单相关组件来触发显示。

## 基础用法

需结合一个外部触发器，比如 `wd-cell`，并通过绑定 `v-model` 来保存选中的内容数组，利用 `v-model:visible` 控制 Picker 的显示或隐藏。

::: code-group

```html
<wd-cell title="单列选项" placeholder="请选择" :value="value[0]" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref<string[]>([])
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
```

:::

## 多列

`columns` 属性传入二维数组，此时 `value` 为对应列选中项 `value` 的一维数组。

::: code-group

```html
<wd-cell title="多列" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref([])
const displayValue = ref('')

const columns = ref([
  [
    { label: '中山大学', value: '1' },
    { label: '中南大学', value: '2' },
    { label: '华南理工大学', value: '3' }
  ],
  [
    { label: '计算机科学与技术', value: '1' },
    { label: '软件工程', value: '2' },
    { label: '通信工程', value: '3' }
  ]
])

const handleConfirm = ({ selectedItems }: any) => {
  displayValue.value = selectedItems.map((item: any) => item.label).join(', ')
}
```

:::

## 多级联动

设置 `cascade` 属性，并将 `columns` 设定为带层级的树状结构（通过 `children` 嵌套子项）。
可以结合自定义的展示函数进行页面回填格式化。

::: code-group

```html
<wd-cell title="多级联动" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" cascade @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref(['110000', '110100', '110102'])
const displayValue = ref('北京 - 北京市 - 西城区')

const columns = ref([
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
          { label: '朝阳区', value: '110105' }
        ]
      }
    ]
  }
])

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems.map((item: any) => item.label).join(' - ')
}
```

:::



## 自定义弹窗标题

可通过 `title` 属性为内部弹窗配置顶部提示性文字标题。

::: code-group

```html
<wd-cell title="标题" :value="value[0]" is-link @click="showTitle = true" />
<wd-picker v-model="value" v-model:visible="showTitle" :columns="columns" title="请选择您心仪的选项" />
```

:::

## 确定前校验

设置 `before-confirm` 函数，在用户点击弹出层右上角“完成”按钮时进行拦截，支持返回 `boolean` 或 `Promise<boolean>` 控制是否允许选定并关闭弹窗。

::: code-group

```html
<wd-toast />
<wd-cell title="选项拦截" :value="value[0]" is-link @click="show = true" />
<wd-picker :columns="columns" v-model="value" v-model:visible="show" :before-confirm="beforeConfirm" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
const show = ref(false)
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
const value = ref<string[]>([])

const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      // 假设选项2与选项3被判断为无效选择
      if (['2', '3'].includes(value[0])) {
        toast.error('该选项校验不通过，请重新选择')
        resolve(false)
      } else {
        resolve(true)
      }
    }, 1000)
  })
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项。单列选择器为长度为 1 的数组，多列则为对应多项值组成的数组 | `(string \| number)[]` | `[]` |
| v-model:visible | 控制选择器弹出层的显示与隐藏 | `boolean` | `false` |
| columns | 选项数据结构数组配置，对于多列使用二维数组，多级联动结合 cascade 嵌套 children | `PickerOption[] \| PickerOption[][]` | `[]` |
| cascade | 是否开启级联模式 | `boolean` | `false` |
| title | 弹出层大标题 | `string` | - |
| cancel-button-text | 顶部操作栏左侧取消按钮文案 | `string` | - |
| confirm-button-text | 顶部操作栏右侧确认按钮文案 | `string` | - |
| value-key | 选项对象中负责标示值的键名 | `string` | `'value'` |
| label-key | 选项对象中负责呈现文本的键名 | `string` | `'label'` |
| children-key | 级联模式中对应的下一级子级键名 | `string` | `'children'` |
| item-height | 内部滚筒每个选项的单个高度（px） | `number` | `44` |
| visible-item-count | 单屏视窗内最多可见的选项数量 | `number` | `6` |
| before-confirm | 确定前校验函数，接收 `(value)` 参数，返回 `boolean` 或 `Promise<boolean>` | `Function` | - |
| close-on-click-modal | 点击遮罩层时是否关闭弹窗 | `boolean` | `true` |
| z-index | 弹出层层级深度 | `number` | `15` |
| safe-area-inset-bottom | 弹出面板是否设置默认的底部安全距离 | `boolean` | `true` |
| immediate-change | 是否在手指松开时立即触发 `change` 而非滚动结束 ^(1.2.25) | `boolean` | `false` |
| root-portal | 是否开启 `root-portal` 将组件脱离当前节点进行渲染 ^(1.11.0) | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-view-class | pickerView 组件的外部自定义样式类 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击完成按钮触发 | `{ value, selectedItems }` |
| cancel | 点击取消或蒙层关闭触发 | - |
| open | 打开弹出层选择器时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开 Picker 弹窗 | - |
| close | 关闭 Picker 弹窗 | - |


