# Fab Floating Action Button

Floating action button component that displays a set of action buttons when pressed.

:::warning
Because `uni-app` components cannot listen to clicks outside themselves, in order to automatically close `fab` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab) and listen for click event bubbling on the page's root element.

If there is a scenario where the user manually clicks outside the `fab` (such as a button) to slide out the `fab`, you need to add `@click.stop=""` to the clicked element (the button in this case) to prevent the event from bubbling to the root element, avoiding triggering `closeOutside` which would close the manually opened `fab`.
:::

## Component Type

### Basic Usage

Set the trigger type of the floating button via `type`, and whether the floating button is disabled via `disabled`.

::: code-group
```html [vue/html]
<wd-fab :type="type">
  <wd-button @click="showToast('Triple Combo')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('I want to favorite')" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('I want to tip')" custom-class="custom-button" type="danger" round>
    <wd-icon name="money-circle" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('I want to like')" custom-class="custom-button" type="warning" round>
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

## Component Variants

### Position and Direction

Set the trigger position of the floating button via `position`, and the opening direction of the action buttons via `direction`.

::: code-group
```html [vue/html]
<wd-fab :position="position" :direction="direction">
  <wd-button @click="showToast('Triple Combo')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('I want to favorite')" custom-class="custom-button" type="success" round>
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

Control the expand/collapse of the action button menu via `v-model:active`.

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

Set `draggable` attribute to `true` to enable button dragging capability.

::: code-group
```html [vue/html]
<wd-fab :draggable="true"></wd-fab>
```
:::

:::warning
After enabling dragging, the `direction` attribute will become ineffective. The popup direction will be automatically calculated based on the dragged position. After dragging is complete, the button will automatically snap to the edge.
:::

## Special Style

### Custom Trigger

Customize the trigger via the `trigger` slot. `expandable` controls whether clicking the trigger triggers the default internal expand/collapse capability.

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
| v-model:active | Whether active | `boolean` | `false` |
| type | Floating button type, optional values are `primary`, `success`, `info`, `warning`, `danger` | `FabType` | `'primary'` |
| position | Floating button position, optional values are `left-top`, `right-top`, `left-bottom`, `right-bottom`, `left-center`, `right-center`, `top-center`, `bottom-center` | `FabPosition` | `'right-bottom'` |
| draggable | Whether the button can be dragged | `boolean` | `false` |
| direction | Floating button menu popup direction, optional values are `top`, `right`, `bottom`, `left` | `FabDirection` | `'top'` |
| disabled | Whether disabled | `boolean` | `false` |
| inactive-icon | Icon when floating button is not expanded | `string` | `'plus'` |
| active-icon | Icon when floating button is expanded | `string` | `'close'` |
| z-index | Custom floating button z-index | `number` | `99` |
| gap | Custom spacing between floating button and visible area edge | `FabGap` | `{ top: 16, right: 16, bottom: 16, left: 16 }` |
| expandable | Used to control whether to expand menu on click. When set to `false`, triggers `click` event | `boolean` | `true` |
| custom-class | Custom class name for root node | `string` | `''` |
| custom-style | Custom style for root node | `string` | `''` |

### FabGap

| Parameter | Description | Type |
| --- | --- | --- |
| top | Spacing from top | number |
| bottom | Spacing from bottom | number |
| left | Spacing from left | number |
| right | Spacing from right | number |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | When `expandable` is set to `false`, triggered when clicking inside the floating component but not triggering internal logic | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Expand menu | - |
| close | Collapse menu | - |

## Slots

| name | Description |
| --- | --- |
| default | Action button area content |
| trigger | Trigger slot, used for fully customizing the click trigger anchor area |
