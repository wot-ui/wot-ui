# Popover 气泡

常用于展示提示信息或菜单操作。

Popover 的定位规则与 [Tooltip](/component/tooltip.html) 保持一致，支持 12 个方向的弹出位置，并提供内容插槽和菜单模式。

:::warning
因为 `uni-app` 组件无法监听点击自己以外的地方，为了在点击页面其他地方时自动关闭 `popover`，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），并在页面根元素上监听点击事件冒泡。

如果存在用户手动点击 `popover` 以外某个地方如按钮弹出 `popover` 的场景，则需要在该元素上加 `@click.stop=""` 阻止事件冒泡到根元素上，避免触发 `closeOutside` 把要手动打开的 `popover` 关闭。
:::

## 组件类型

### 普通模式

默认使用 `normal` 模式，直接通过 `content` 展示一段文本内容。

::: code-group
```html [vue/html]
<view @click="closeOutside">
  <wd-popover v-model="showBasic" content="这是一段信息。">
    <wd-button>点击展示</wd-button>
  </wd-popover>
</view>
```
```ts [typescript]
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const showBasic = ref<boolean>(false)
```
:::

### 菜单模式

设置 `mode="menu"` 后，`content` 需要传入 `PopoverMenuItem[]`。点击菜单项后会自动关闭当前气泡，并触发 `menuclick` 事件。

::: code-group
```html [vue/html]
<wd-popover v-model="showMenu" mode="menu" :content="menuItems" @menuclick="handleMenuClick">
  <wd-button>列表</wd-button>
</wd-popover>
```
```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { PopoverMenuItem } from '@/uni_modules/wot-ui/components/wd-popover/types'

const { show: showToast } = useToast()
const showMenu = ref<boolean>(false)
const menuItems: PopoverMenuItem[] = [
  {
    iconClass: 'check',
    content: '全部标记已读'
  },
  {
    iconClass: 'delete',
    content: '清空最近会话'
  },
  {
    iconClass: 'subscribe',
    content: '消息订阅设置'
  },
  {
    iconClass: 'scan',
    content: '消息异常检测'
  }
]

function handleMenuClick({ item }: { item: PopoverMenuItem }) {
  showToast('选择了' + item.content)
}
```
:::

### PopoverMenuItem

`mode="menu"` 时，`content` 数组内每一项的数据结构如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 菜单项文案 | string | - |
| iconClass | 菜单项图标类名，不设置时只展示标题 | string | - |

## 组件状态

### 受控显隐

通过 `v-model` 控制 Popover 的显示与隐藏，外部按钮和触发目标都可以驱动显隐状态变化。

::: code-group
```html [vue/html]
<wd-button plain size="small" @click.stop="showControlled = !showControlled">
  {{ showControlled ? '关闭' : '打开' }}
</wd-button>

<wd-popover v-model="showControlled" content="通过 v-model 控制显隐" placement="top">
  <wd-button>触发目标</wd-button>
</wd-popover>
```
```ts [typescript]
import { ref } from 'vue'

const showControlled = ref<boolean>(false)
```
:::

### 禁用

设置 `disabled` 后，点击触发目标不会打开气泡。

```html
<wd-popover disabled content="禁用状态">
  <wd-button>禁用状态</wd-button>
</wd-popover>
```

## 组件变体

### 弹出位置

通过 `placement` 指定弹出位置，支持 `top`、`bottom`、`left`、`right` 及各自的 `start`、`end` 对齐方式。

::: code-group
```html [vue/html]
<wd-radio-group v-model="placement" direction="horizontal" type="dot">
  <wd-radio v-for="item in placementItems" :key="item" :value="item">{{ item }}</wd-radio>
</wd-radio-group>

<wd-popover v-model="showPlacement" :content="'当前方向：' + placement" :placement="placement">
  <wd-button>{{ placement }}</wd-button>
</wd-popover>
```
```ts [typescript]
import { ref } from 'vue'
import type { PlacementType } from '@/uni_modules/wot-ui/components/wd-popover/types'

const placement = ref<PlacementType>('bottom')
const showPlacement = ref<boolean>(false)
const placementItems = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
] as const
```
:::

## 组件样式

### 内容插槽

通过 `content` 插槽可以自定义气泡内容结构和样式，不需要额外开启开关属性。

::: code-group
```html [vue/html]
<wd-popover v-model="showCustom">
  <template #content>
    <view class="pop-content">这是一段自定义样式的内容。</view>
  </template>
  <wd-button>点击展示</wd-button>
</wd-popover>
```
```ts [typescript]
import { ref } from 'vue'

const showCustom = ref<boolean>(false)
```
```scss [scss]
.pop-content {
  position: relative;
  z-index: 500;
  border-radius: 4px;
  background: #fff;
  color: #8268de;
  font-weight: 600;
  padding: 10px;
  width: 150px;
}
```
:::

### 显示关闭按钮

设置 `show-close` 后，会在气泡内容区域右上角显示关闭按钮。

```html
<wd-popover v-model="showClosable" content="这是一段信息。" show-close>
  <wd-button>显示关闭按钮</wd-button>
</wd-popover>
```

## 特殊样式

### 动态内容与位置更新

当使用 `content` 插槽且插槽内容尺寸发生变化时，可以通过组件实例的 `updatePosition` 重新测量并更新定位。

::: code-group
```html [vue/html]
<wd-popover v-model="showDynamic" ref="popoverRef" :placement="placement">
  <template #content>
    <view class="pop-content" :style="{ width: `${dynamicWidth}px` }">
      <view class="status">当前宽度：{{ dynamicWidth }}px</view>
      <wd-button size="small" @click="changeSize">改变大小并更新</wd-button>
    </view>
  </template>
  <wd-button>动态内容</wd-button>
</wd-popover>
```
```ts [typescript]
import { nextTick, ref } from 'vue'
import type { PlacementType, PopoverInstance } from '@/uni_modules/wot-ui/components/wd-popover/types'

const placement = ref<PlacementType>('bottom')
const showDynamic = ref<boolean>(false)
const dynamicWidth = ref<number>(150)
const popoverRef = ref<PopoverInstance | null>(null)

function changeSize() {
  dynamicWidth.value = dynamicWidth.value === 150 ? 250 : 150
  nextTick(() => {
    popoverRef.value?.updatePosition()
  })
}
```
```scss [scss]
.status {
  margin-bottom: 10px;
}
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示气泡 | `boolean` | `false` |
| content | 显示内容，`normal` 模式下为字符串，`menu` 模式下为 `PopoverMenuItem[]`，也可以通过 `content` 插槽传入 | `string \| PopoverMenuItem[]` | - |
| mode | 当前显示模式，可选值为 `normal`、`menu` | `PopoverMode` | `normal` |
| placement | 弹出位置，可选值为 `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `PlacementType` | `bottom` |
| offset | 偏移量，支持 number、number[] 或 `{ x: number, y: number }` | `PopoverOffset` | `0` |
| visible-arrow | 是否显示箭头 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-arrow | 箭头节点自定义类名 | `string` | `''` |
| custom-pop | 气泡内容容器自定义类名 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 气泡显示时触发 | - |
| close | 气泡隐藏时触发 | - |
| change | 显隐状态变化时触发 | `{ show: boolean }` |
| menuclick | `menu` 模式下点击选项时触发 | `{ item: PopoverMenuItem; index: number }` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开气泡 | - |
| close | 关闭气泡 | - |
| updatePosition | 重新测量内容尺寸并更新定位 | - |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 触发器区域内容 | - |
| content | 自定义气泡内容 | - |

