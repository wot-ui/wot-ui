# DropMenu 下拉菜单

向下或向上弹出的菜单列表。

## 组件类型

### 基础用法

基础用法需要绑定 `v-model` 和 `options`。

`options` 为对象数组，默认结构为 `{ label, value, tip }`。

因为 `uni-app` 组件无法直接监听组件外部点击，为了在点击页面其他区域时自动关闭下拉菜单，建议结合 `useQueue` 在页面根节点监听点击冒泡并调用 `closeOutside`。

:::warning 提示
如果存在点击外部按钮手动打开 `drop-menu` 的场景，需要在该按钮上添加 `@click.stop`，避免触发 `closeOutside` 后立即关闭。
:::

```html
<view @click="closeOutside">
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
    <wd-drop-menu-item v-model="value2" :options="option2" @change="handleChange2" />
  </wd-drop-menu>
</view>
```

```ts
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()
const value1 = ref(0)
const value2 = ref(0)

const option1 = ref([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1 },
  { label: '活动商品', value: 2 }
])
const option2 = ref([
  { label: '综合', value: 0 },
  { label: '销量', value: 1 },
  { label: '上架时间', value: 2 }
])

const handleChange1 = ({ value }: { value: string | number }) => {
  console.log(value)
}
const handleChange2 = ({ value }: { value: string | number }) => {
  console.log(value)
}
```

## 组件状态

### 禁用菜单

通过 `disabled` 禁用菜单项。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" disabled :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

## 组件变体

### 向上展开

将 `direction` 设为 `up` 可使菜单向上展开。

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

### 异步打开/关闭 ^(1.3.7)

`before-toggle` 在菜单打开/关闭前触发，接收 `{ status }`，支持返回 `boolean` 或 `Promise<boolean>`。

:::warning 提示
`before-toggle` 仅作用于当前 `wd-drop-menu-item`，不能阻止其他菜单项的开关行为。
:::

```html
<wd-dialog />
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" :before-toggle="handleBeforeToggle" />
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-design-uni'
import type { DropMenuItemBeforeToggle } from '@/uni_modules/wot-design-uni/components/wd-drop-menu-item/types'

const dialog = useDialog()
const value = ref(0)
const option = ref([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1, tip: '这是补充信息' },
  { label: '长筛选项', value: 2 }
])

const handleBeforeToggle: DropMenuItemBeforeToggle = ({ status }) => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        title: status ? '异步打开' : '异步关闭',
        msg: status ? '确定要打开下拉菜单吗' : '确定要关闭下拉菜单吗'
      })
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}
```

## 组件样式

### 自定义菜单选项

可以结合布局组件实现筛选栏联动展示。

```html
<view style="display: flex; background: #fff; text-align: center">
  <wd-drop-menu style="flex: 1; min-width: 0">
    <wd-drop-menu-item v-model="value1" :options="option1" />
  </wd-drop-menu>
  <view style="flex: 1">
    <wd-sort-button v-model="value2" title="上架时间" />
  </view>
</view>
```

### 自定义菜单图标 ^(1.3.7)

可通过 `icon` 设置右侧图标，通过 `icon-size` 设置图标尺寸。

```html
<wd-drop-menu>
  <wd-drop-menu-item title="地图" icon="location" icon-size="14px" />
</wd-drop-menu>
```

## 特殊样式

### 自定义菜单内容

通过默认插槽自定义菜单内容；自定义内容场景下，通常通过实例方法 `close` 手动关闭菜单。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" />
  <wd-drop-menu-item ref="dropMenu" title="筛选" @opened="handleOpened">
    <view>
      <wd-slider v-model="sliderValue" ref="slider" />
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" label="描述信息" value="内容" />
      <view style="padding: 0 10px 20px; box-sizing: border-box">
        <wd-button block size="large" @click="confirm">主要按钮</wd-button>
      </view>
    </view>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import type { SliderInstance } from '@/uni_modules/wot-design-uni/components/wd-slider/types'
import type { DropMenuItemInstance } from '@/uni_modules/wot-design-uni/components/wd-drop-menu-item/types'

const dropMenu = ref<DropMenuItemInstance>()
const slider = ref<SliderInstance>()
const sliderValue = ref(30)

const confirm = () => {
  dropMenu.value?.close()
}

const handleOpened = () => {
  slider.value?.initSlider()
}
```

## DropMenu Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| z-index | 弹层层级 | `number` | `12` |
| direction | 菜单展开方向，可选值为 `up`、`down` | `DropDirection` | `'down'` |
| modal | 是否展示蒙层 | `boolean` | `true` |
| close-on-click-modal | 是否点击蒙层时关闭 | `boolean` | `true` |
| duration | 菜单展开/收起动画时长，单位 ms | `number` | `200` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## DropMenuItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 当前选中值 | `string \| number` | - |
| disabled | 是否禁用菜单 | `boolean` | `false` |
| options | 菜单选项列表，默认结构为 `{ label, value, tip }` | `Array<Record<string, any>>` | `[]` |
| icon-name | 选中项图标名称 | `string` | `'check'` |
| title | 菜单标题，设置后优先展示标题文案 | `string` | - |
| icon | 菜单右侧图标 | `string` | `'caret-down'` |
| icon-size | 菜单图标尺寸 | `string \| number` | - |
| before-toggle ^(1.3.7) | 菜单开关前拦截函数，接收 `{ status }`，返回 `boolean` 或 `Promise<boolean>` | `DropMenuItemBeforeToggle` | - |
| value-key | 选项值字段名 | `string` | `'value'` |
| label-key | 选项文本字段名 | `string` | `'label'` |
| tip-key | 选项说明字段名 | `string` | `'tip'` |
| custom-popup-class ^(1.5.0) | 自定义下拉 popup 样式类 | `string` | `''` |
| custom-popup-style ^(1.5.0) | 自定义下拉 popup 样式 | `string` | `''` |
| popup-height ^(1.13.0) | popup 高度，未设置时默认最大高度为 80% | `string` | `''` |
| root-portal ^(1.11.0) | 是否脱离页面文档流渲染，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## DropMenuItem Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `{ value, selectedItem }` |
| open | 菜单开始展开时触发 | - |
| opened | 菜单展开完成时触发 | - |
| close | 菜单开始关闭时触发 | - |
| closed | 菜单关闭完成时触发 | - |

## DropMenuItem Methods

通过 `ref` 可获取实例并调用以下方法：

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| getShowPop | 获取当前菜单是否展开 | - | boolean |
| open | 打开菜单 | - | void |
| close | 关闭菜单 | - | void |
| toggle | 切换菜单开关 | - | void |

## DropMenu Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 菜单项容器插槽 | - |

## DropMenuItem Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义菜单内容 | - |

