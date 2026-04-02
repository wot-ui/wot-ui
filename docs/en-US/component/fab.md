# Fab Floating Action Button

Floating action button component that displays a group of action buttons when pressed.

:::warning
Since `uni-app` components cannot monitor clicks outside themselves, to automatically close the `fab` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab). Monitor click event bubbling on the root element of the page.

If there is a scenario where the user manually clicks somewhere other than `fab` to slide out the `fab`, you need to add `@click.stop=""` to the clicked element (in this case, the button) to prevent event bubbling to the root element, avoiding triggering `closeOutside` which would close the manually opened `fab`.
:::

## Component Type

### Basic Usage

Set the trigger type through `type`, and set whether the floating button is disabled through `disabled`.

::: code-group
```html [vue/html]
<wd-fab :type="type">
  <wd-button @click="showToast('Triple Like')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Add to Favorites')" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Give Coin')" custom-class="custom-button" type="danger" round>
    <wd-icon name="money-circle" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Like')" custom-class="custom-button" type="warning" round>
    <wd-icon name="thumb-up" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```
```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { FabType } from '@/uni_modules/wot-ui/components/wd-fab/types'

const { show: showToast } = useToast()
const type = ref<FabType>('primary')
```
```scss [scss]
:deep(.custom-button) {
  min-width: auto !important;
  box-sizing: border-box;
  width: 32px !important;
  height: 32px !important;
  border-radius: 16px !important;
  margin: 8rpx;
}
```
:::

## Component Variant

### Position and Direction

Through `position` to set the floating button trigger's position, and `direction` to set the opening direction of action buttons.

::: code-group
```html [vue/html]
<wd-fab :position="position" :direction="direction">
  <wd-button @click="showToast('Triple Like')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Add to Favorites')" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```
```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { FabPosition, FabDirection } from '@/uni_modules/wot-ui/components/wd-fab/types'

const { show: showToast } = useToast()
const position = ref<FabPosition>('left-bottom')
const direction = ref<FabDirection>('top')
```
:::

## Component State

### Action Menu Expand/Collapse

Control the expansion/collapse of the action button menu through `v-model:active`

::: code-group
```html [vue/html]
<wd-button @click="active = !active">Toggle Display</wd-button>
<wd-fab v-model:active="active"></wd-fab>
```
```ts [typescript]
import { ref } from 'vue'

const active = ref<boolean>(false)
```
:::

### Draggable Button

Set `draggable` to `true` to enable dragging for the button.

::: code-group
```html [vue/html]
<wd-fab :draggable="true"></wd-fab>
```
:::

:::warning
After enabling dragging, the `direction` property will be invalid, and the pop-up direction will be automatically calculated based on the position after dragging. After dragging is completed, the button will automatically snap to the edge.
:::

## Special Style

### Custom Trigger

Customize the trigger through the `trigger` slot, `expandable` controls whether clicking the trigger expands/collapses the action button menu's default inner logic.

::: code-group
```html [vue/html]
<wd-fab position="left-bottom" :expandable="false">
  <template #trigger="{ disabled }">
    <wd-button @click="handleClick" icon="share" type="danger" :disabled="disabled">Share with Friends</wd-button>
  </template>
</wd-fab>
```
```ts [typescript]
import { useToast } from '@/uni_modules/wot-ui'

const { show: showToast } = useToast()

const handleClick = () => {
  showToast('Share with Friends')
}
```
:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model:active ^(0.1.57) | Whether activated | boolean | `false` |
| type ^(0.1.57) | Floating button type, optional values are `primary`, `success`, `info`, `warning`, `danger` | string | `primary` |
| position ^(0.1.57) | Floating button position, optional values are `left-top`, `right-top`, `left-bottom`, `right-bottom`, `left-center`, `right-center`, `top-center`, `bottom-center` | string | `right-bottom` |
| draggable ^(1.2.19) | Whether button can be dragged | boolean | `false` |
| direction ^(0.1.57) | Floating button menu pop-up direction, optional values are `top`, `right`, `bottom`, `left` | string | `top` |
| disabled ^(0.1.57) | Whether disabled | boolean | `false` |
| inactive-icon ^(0.1.57) | Icon when floating button is not expanded | string | `'add'` |
| active-icon ^(0.1.57) | Icon when floating button is expanded | string | `'close'` |
| z-index ^(0.1.57) | Custom floating button layer level | number | `99` |
| gap ^(1.2.26) | Custom gap between floating button and viewport edges | FabGap | `{ top: 16, right: 16, bottom: 16, left: 16 }` |
| expandable ^(1.3.11) | Controls whether to expand menu when clicked, triggers `click` event when set to `false` | boolean | `true` |

### FabGap

| Parameter | Description | Type |
| --- | --- | --- |
| top | Top distance | number |
| bottom | Bottom distance | number |
| left | Left distance | number |
| right | Right distance | number |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking the floating component without triggering the inner logic, when `expandable` is `false` ^(1.3.11) | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Expand menu ^(0.1.57) | - |
| close | Collapse menu ^(0.1.57) | - |

## Slots

| name | Description |
| --- | --- |
| default | Action buttons area content ^(0.1.57) |
| trigger | Trigger slot, used for completely decoupling click trigger area component ^(1.3.11) |

## External Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root custom style class ^(0.1.57) |