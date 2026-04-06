# Sidebar

Vertically displayed navigation bar, used to switch between different content areas.

## Component Types

### Basic Usage

Bind the current selected item's value through `v-model`.

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="Tag Name" />
  <wd-sidebar-item :value="1" label="Tag Name" />
  <wd-sidebar-item :value="2" label="Tag Name" />
</wd-sidebar>
```

```ts
const active = ref(0)
```

## Component States

### Badge Tips

Set `is-dot` to display a dot badge; set `badge` or `badge-props` to display a numeric badge.

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="Tag Name" is-dot />
  <wd-sidebar-item :value="1" label="Tag Name" badge="5" />
  <wd-sidebar-item :value="2" label="Tag Name" :badge-props="{ type: 'warning', value: 55, max: 99 }" />
</wd-sidebar>
```

### Disabled and Async Switching

Set `disabled` to disable the current option; set `before-change` to execute synchronous or asynchronous logic before switching.

```html
<wd-sidebar v-model="active" :before-change="beforeChange">
  <wd-sidebar-item :value="0" label="Tag Name" />
  <wd-sidebar-item :value="1" label="Tag Name" disabled />
  <wd-sidebar-item :value="2" label="Tag Name" />
</wd-sidebar>
```

```ts
import type { SidebarBeforeChange } from '@/uni_modules/wot-ui/components/wd-sidebar/types'

const beforeChange: SidebarBeforeChange = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}
```

## Special Styles

### Anchor Usage Example

Sidebar can be combined with `scroll-view` to achieve anchor switching for long content pages. Examples in the repository can be found in `src/subPages/sidebar/demo1.vue`.

### Page Switching Usage Example

Sidebar can also be used as a left-side directory, with the right content area switching full-screen based on the current selected item. Examples in the repository can be found in `src/subPages/sidebar/demo2.vue`.

### Custom Icon Example

Set the `icon` property of `wd-sidebar-item` to display different icons in the navigation item. Examples in the repository can be found in `src/subPages/sidebar/demo3.vue`.

## Sidebar Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| model-value / v-model | Current active item's value | `string \| number` | `0` |
| before-change | Hook before switching, receives target value, returns `boolean` or `Promise<boolean>` | `function` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Sidebar Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when active item switches | `{ value, label }` |

## Sidebar Slots

| Name | Description |
| --- | --- |
| default | SidebarItem list |

## Sidebar External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |

## SidebarItem Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| label | Current option title | `string` | - |
| value | Current option value, unique identifier | `string \| number` | - |
| badge | Badge display value | `string \| number` | - |
| badge-props | Custom badge properties, will be passed to Badge component | `Partial<BadgeProps>` | - |
| icon | Icon name | `string` | - |
| is-dot | Whether to display dot badge | `boolean` | `false` |
| max | Badge maximum value | `number` | `99` |
| disabled | Whether to disable the current option | `boolean` | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## SidebarItem Slots

| Name | Description |
| --- | --- |
| icon | Custom icon content |
