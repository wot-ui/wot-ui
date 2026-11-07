# Popover Popover

Commonly used for displaying prompt information or menu operations.

Popover's positioning rules are consistent with [Tooltip](/component/tooltip.html), supporting 12 popup directions, and providing content slots and menu modes.

:::warning
Because `uni-app` components cannot listen to clicks outside themselves, in order to automatically close `popover` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab) and listen for click event bubbling on the page root element.

If there is a scenario where the user manually clicks outside the `popover` (such as a button) to pop up the `popover`, you need to add `@click.stop=""` to that element to prevent the event from bubbling to the root element, avoiding triggering `closeOutside` which would close the manually opened `popover`.
:::

## Component Type

### Normal Mode

Default uses `normal` mode, directly displaying a text content via `content`.

::: code-group
```html [vue/html]
<view @click="closeOutside">
  <wd-popover v-model="showBasic" content="This is a piece of information.">
    <wd-button>Click to Show</wd-button>
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

### Menu Mode

After setting `mode="menu"`, `content` needs to be passed as `PopoverMenuItem[]`. Clicking a menu item will automatically close the current popover and trigger the `menuclick` event.

::: code-group
```html [vue/html]
<wd-popover v-model="showMenu" mode="menu" :content="menuItems" @menuclick="handleMenuClick">
  <wd-button>List</wd-button>
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
    content: 'Mark all as read'
  },
  {
    iconClass: 'delete',
    content: 'Clear recent conversations'
  },
  {
    iconClass: 'subscribe',
    content: 'Message subscription settings'
  },
  {
    iconClass: 'scan',
    content: 'Message anomaly detection'
  }
]

function handleMenuClick({ item }: { item: PopoverMenuItem }) {
  showToast('Selected ' + item.content)
}
```
:::

### PopoverMenuItem

When `mode="menu"`, the data structure for each item in the `content` array is as follows:

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| content | Menu item text | string | - |
| iconClass | Menu item icon class name, only title is displayed when not set | string | - |

## Component State

### Controlled Visibility

Control Popover's show/hide via `v-model`. External buttons and trigger targets can both drive visibility state changes.

::: code-group
```html [vue/html]
<wd-button plain size="small" @click.stop="showControlled = !showControlled">
  {{ showControlled ? 'Close' : 'Open' }}
</wd-button>

<wd-popover v-model="showControlled" content="Control visibility via v-model" placement="top">
  <wd-button>Trigger Target</wd-button>
</wd-popover>
```
```ts [typescript]
import { ref } from 'vue'

const showControlled = ref<boolean>(false)
```
:::

### Disabled

After setting `disabled`, clicking the trigger target will not open the popover.

```html
<wd-popover disabled content="Disabled state">
  <wd-button>Disabled State</wd-button>
</wd-popover>
```

## Component Variants

### Popup Position

Specify popup position via `placement`, supporting `top`, `bottom`, `left`, `right` and their respective `start`, `end` alignment methods.

::: code-group
```html [vue/html]
<wd-radio-group v-model="placement" direction="horizontal" type="dot">
  <wd-radio v-for="item in placementItems" :key="item" :value="item">{{ item }}</wd-radio>
</wd-radio-group>

<wd-popover v-model="showPlacement" :content="'Current direction: ' + placement" :placement="placement">
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

## Component Style

### Content Slot

You can customize the popover content structure and style through the `content` slot without needing to enable additional switch properties.

::: code-group
```html [vue/html]
<wd-popover v-model="showCustom">
  <template #content>
    <view class="pop-content">This is a custom styled content.</view>
  </template>
  <wd-button>Click to Show</wd-button>
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

### Show Close Button

After setting `show-close`, a close button will be displayed in the upper right corner of the popover content area.

```html
<wd-popover v-model="showClosable" content="This is a piece of information." show-close>
  <wd-button>Show Close Button</wd-button>
</wd-popover>
```

## Special Style

### Dynamic Content and Position Update

When using the `content` slot and the slot content size changes, you can re-measure and update positioning through the component instance's `updatePosition`.

::: code-group
```html [vue/html]
<wd-popover v-model="showDynamic" ref="popoverRef" :placement="placement">
  <template #content>
    <view class="pop-content" :style="{ width: `${dynamicWidth}px` }">
      <view class="status">Current width: {{ dynamicWidth }}px</view>
      <wd-button size="small" @click="changeSize">Change size and update</wd-button>
    </view>
  </template>
  <wd-button>Dynamic content</wd-button>
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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Whether to show popover | `boolean` | `false` |
| content | Display content, string in `normal` mode, `PopoverMenuItem[]` in `menu` mode, can also be passed via `content` slot | `string \| PopoverMenuItem[]` | - |
| mode | Current display mode, optional values are `normal`, `menu` | `PopoverMode` | `normal` |
| placement | Popup position, optional values are `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | `PlacementType` | `bottom` |
| offset | Offset, supports number, number[] or `{ x: number, y: number }` | `PopoverOffset` | `0` |
| visible-arrow | Whether to show arrow | `boolean` | `true` |
| disabled | Whether disabled | `boolean` | `false` |
| show-close | Whether to show close button | `boolean` | `false` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |
| custom-arrow | Custom class name for arrow node | `string` | `''` |
| custom-pop | Custom class name for popover content container | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| open | Triggered when popover shows | - |
| close | Triggered when popover hides | - |
| change | Triggered when visibility state changes | `{ show: boolean }` |
| menuclick | Triggered when clicking option in `menu` mode | `{ item: PopoverMenuItem; index: number }` |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Open popover | - |
| close | Close popover | - |
| updatePosition | Re-measure content size and update positioning | - |

## Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Trigger area content | - |
| content | Custom popover content | - |
