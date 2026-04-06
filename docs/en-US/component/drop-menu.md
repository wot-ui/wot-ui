# DropMenu

Menu list that pops up downward or upward.

## Component Type

### Basic Usage

Basic usage requires binding `v-model` and `options`.

`options` is an object array, default structure is `{ label, value, tip }`.

Because `uni-app` components cannot directly listen to clicks outside the component, to automatically close the dropdown menu when clicking other areas of the page, it is recommended to combine with `useQueue` to listen to click bubbling at the page root node and call `closeOutside`.

:::warning Tip
If there is a scenario where clicking an external button manually opens `drop-menu`, you need to add `@click.stop` to that button to avoid triggering `closeOutside` and immediately closing.
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
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const value1 = ref(0)
const value2 = ref(0)

const option1 = ref([
  { label: 'All Products', value: 0 },
  { label: 'New Products', value: 1 },
  { label: 'Promotion Products', value: 2 }
])
const option2 = ref([
  { label: 'Comprehensive', value: 0 },
  { label: 'Sales', value: 1 },
  { label: 'Shelf Time', value: 2 }
])

const handleChange1 = ({ value }: { value: string | number }) => {
  console.log(value)
}
const handleChange2 = ({ value }: { value: string | number }) => {
  console.log(value)
}
```

## Component State

### Disabled Menu

Disable menu item through `disabled`.

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" disabled :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

## Component Variant

### Expand Upward

Set `direction` to `up` to make menu expand upward.

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

### Async Open/Close

`before-toggle` triggers before menu opens/closes, receives `{ status }`, supports returning `boolean` or `Promise<boolean>`.

:::warning Tip
`before-toggle` only acts on the current `wd-drop-menu-item` and cannot prevent the open/close behavior of other menu items.
:::

```html
<wd-dialog />
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" :before-toggle="handleBeforeToggle" />
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-ui'
import type { DropMenuItemBeforeToggle } from '@/uni_modules/wot-ui/components/wd-drop-menu-item/types'

const dialog = useDialog()
const value = ref(0)
const option = ref([
  { label: 'All Products', value: 0 },
  { label: 'New Products', value: 1, tip: 'This is supplementary info' },
  { label: 'Long Filter Option', value: 2 }
])

const handleBeforeToggle: DropMenuItemBeforeToggle = ({ status }) => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        title: status ? 'Async Open' : 'Async Close',
        msg: status ? 'Confirm to open dropdown menu?' : 'Confirm to close dropdown menu?'
      })
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}
```

## Component Style

### Custom Menu Options

Can combine with layout components to achieve filter bar linkage display.

```html
<view style="display: flex; background: #fff; text-align: center">
  <wd-drop-menu style="flex: 1; min-width: 0">
    <wd-drop-menu-item v-model="value1" :options="option1" />
  </wd-drop-menu>
  <view style="flex: 1">
    <wd-sort-button v-model="value2" title="Shelf Time" />
  </view>
</view>
```

### Custom Menu Icon

Can set right icon through `icon`, set icon size through `icon-size`.

```html
<wd-drop-menu>
  <wd-drop-menu-item title="Map" icon="location" icon-size="14px" />
</wd-drop-menu>
```

## Special Style

### Custom Menu Content

Customize menu content through default slot; in custom content scenarios, usually manually close menu through instance method `close`.

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" />
  <wd-drop-menu-item ref="dropMenu" title="Filter" @opened="handleOpened">
    <view>
      <wd-slider v-model="sliderValue" ref="slider" />
      <wd-cell title="Title Text" value="Content" />
      <wd-cell title="Title Text" label="Description Info" value="Content" />
      <view style="padding: 0 10px 20px; box-sizing: border-box">
        <wd-button block size="large" @click="confirm">Primary Button</wd-button>
      </view>
    </view>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import type { SliderInstance } from '@/uni_modules/wot-ui/components/wd-slider/types'
import type { DropMenuItemInstance } from '@/uni_modules/wot-ui/components/wd-drop-menu-item/types'

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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| z-index | Popup z-index | `number` | `12` |
| direction | Menu expand direction, optional values are `up`, `down` | `DropDirection` | `'down'` |
| modal | Whether to show mask | `boolean` | `true` |
| close-on-click-modal | Whether to close when clicking mask | `boolean` | `true` |
| duration | Menu expand/collapse animation duration, unit ms | `number` | `200` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## DropMenuItem Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model / modelValue | Current selected value | `string \| number` | - |
| disabled | Whether to disable menu | `boolean` | `false` |
| options | Menu option list, default structure is `{ label, value, tip }` | `Array<Record<string, any>>` | `[]` |
| icon-name | Selected item icon name | `string` | `'check'` |
| title | Menu title, after setting, title text is displayed with priority | `string` | - |
| icon | Menu right icon | `string` | `'caret-down'` |
| icon-size | Menu icon size | `string \| number` | - |
| before-toggle | Menu toggle pre-interception function, receives `{ status }`, returns `boolean` or `Promise<boolean>` | `DropMenuItemBeforeToggle` | - |
| value-key | Option value field name | `string` | `'value'` |
| label-key | Option text field name | `string` | `'label'` |
| tip-key | Option description field name | `string` | `'tip'` |
| custom-popup-class | Custom dropdown popup style class | `string` | `''` |
| custom-popup-style | Custom dropdown popup style | `string` | `''` |
| popup-height | Popup height, when not set, default max height is 80% | `string` | `''` |
| root-portal | Whether to detach from page document flow rendering, used to solve fixed invalidation problem | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## DropMenuItem Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when selected value changes | `{ value, selectedItem }` |
| open | Triggered when menu starts to expand | - |
| opened | Triggered when menu expansion completes | - |
| close | Triggered when menu starts to close | - |
| closed | Triggered when menu closing completes | - |

## DropMenuItem Methods

Instance methods can be obtained through `ref`:

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| getShowPop | Get whether current menu is expanded | - | boolean |
| open | Open menu | - | void |
| close | Close menu | - | void |
| toggle | Toggle menu switch | - | void |

## DropMenu Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Menu item container slot | - |

## DropMenuItem Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom menu content | - |
