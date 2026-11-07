# Glassmorphism

Wot UI ships a reusable glassmorphism layer inspired by Apple Liquid Glass, implemented within CSS capabilities: translucent surfaces, backdrop blur, saturation boost, hairline borders and soft shadows.

::: warning
This is a frosted-glass approximation, not full Apple Liquid Glass. Dynamic reflection, lighting and interactive morphing require native rendering and cannot be reproduced in CSS. Platforms without `backdrop-filter` fall back to translucent solid surfaces.
:::

## Quick start

Glass relies on theme tokens. Enable the built-in `glass` or `glass-dark` preset first:

```scss
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
@use './theme/presets.scss' as *;

page,
.wd-root-portal {
  @include glass-theme-vars();
}
```

Use `glass-dark-theme-vars()` for dark mode. The default themes also expose `--wot-glass-*` tokens, so a preset is optional.

## Three ways to enable glass

### 1. Component prop

Most containers, overlays, navigation and form components expose a `glass` prop:

```html
<wd-card title="Glass card" glass>
  <view>Frosted glass surface.</view>
</wd-card>

<wd-button glass>Glass button</wd-button>
```

### 2. Global utility

Components without a `glass` prop can use `.wd-glass`:

```html
<view class="wd-glass">Any container</view>
<wd-cell title="Glass cell" custom-class="wd-glass"></wd-cell>
```

### 3. Shared mixin

Reuse the same styles in your own SCSS:

```scss
@use '@wot-ui/ui/styles/mixin/glass.scss' as *;

.my-panel {
  @include glass;
}
```

## Supported components

| Category | Components | Enable with |
| --- | --- | --- |
| Containers | Card, Cell, CellGroup, Collapse, Empty, Loadmore, Sticky | `glass` |
| Overlays | Popup, Dialog, ActionSheet, FloatingPanel, Toast, Notify, NoticeBar, Popover, Tooltip, Tour | `glass` |
| Navigation | Navbar, Tabbar, Tabs, Sidebar, DropMenu, Segmented, Steps, Pagination, Grid | `glass` |
| Forms | Input, Textarea, Search, InputNumber, PasswordInput, Picker, SelectPicker, Cascader, DatetimePicker, Calendar, FormItem | `glass` |
| Data & media | Table, Tag, Badge, Avatar, Img, ImagePreview, VideoPreview, Swiper, SwipeAction, Upload, CountDown, CountTo, Backtop | `glass` |
| Anything else | Any element | `.wd-glass` or `@include glass;` |

## Examples

### Glass card + button

```html
<wd-card title="Today" glass>
  <view class="stat">12,480</view>
  <template #footer>
    <wd-button glass size="small">View details</wd-button>
  </template>
</wd-card>
```

### Glass navbar

```html
<wd-navbar title="Glass nav" glass fixed placeholder />
```

### Glass popup

```html
<wd-popup v-model="show" glass position="bottom" round>
  <view class="panel">Content</view>
</wd-popup>
```

### Glass input

```html
<wd-input v-model="keyword" glass placeholder="Search" />
```

## Custom tokens

| Token | Description | Default (light) |
| --- | --- | --- |
| `--wot-glass-surface` | Glass surface color | `rgba(255, 255, 255, 0.25)` |
| `--wot-glass-blur` | Backdrop blur radius | `12px` |
| `--wot-glass-saturate` | Backdrop saturation | `180%` |
| `--wot-glass-border` | Glass border color | `rgba(255, 255, 255, 0.3)` |
| `--wot-glass-shadow` | Glass shadow | `0 8px 32px 0 rgba(15, 23, 42, 0.12)` |
| `--wot-glass-radius` | Glass radius | `12px` |

Override example:

```css
.my-glass-panel {
  --wot-glass-blur: 20px;
  --wot-glass-saturate: 200%;
  --wot-glass-surface: rgba(255, 255, 255, 0.15);
}
```

## Platform and accessibility

- H5, modern WebViews and most mini programs support `backdrop-filter`; unsupported platforms degrade to translucent surfaces.
- Glass reduces text contrast. Keep body text at WCAG AA (4.5:1) or better; increase surface opacity or darken text when needed.
- Avoid stacking many glass layers on one screen: it hurts performance and weakens hierarchy.
- Decorative glass must never be the only carrier of information.
