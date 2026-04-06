# Transition

Used to apply transition effects when elements enter or leave.

## Component Types

### Fade In/Out

Specify fade in/out related animations through `name`, suitable for prompts, floating layers, local content switching and other scenarios.

```html
<wd-transition :show="show" name="fade">
  <view>Content</view>
</wd-transition>
```

### Slide Animation

Built-in four slide directions: `slide-up`, `slide-down`, `slide-left`, `slide-right`.

```html
<wd-transition :show="show" name="slide-up">
  <view>Content</view>
</wd-transition>
```

### Zoom Animation

Built-in two zoom animations: `zoom-in` and `zoom-out`.

```html
<wd-transition :show="show" name="zoom-in">
  <view>Content</view>
</wd-transition>
```
## Special Styles

### Custom Animation

Customize enter and leave animation class names through `enter-class`, `enter-active-class`, `enter-to-class`, `leave-class`, `leave-active-class`, `leave-to-class`.

`duration` supports numbers, and also supports configuring enter and leave durations separately, for example `{ enter: 700, leave: 1000 }`.

::: code-group

```html [vue]
<wd-transition
  :show="customShow"
  :duration="{ enter: 700, leave: 1000 }"
  enter-class="custom-enter"
  enter-active-class="custom-enter-active"
  enter-to-class="custom-enter-to"
  leave-class="custom-leave"
  leave-active-class="custom-leave-active"
  leave-to-class="custom-leave-to"
  custom-class="block"
/>
```

```scss [scss]
:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}

:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}

:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| show | Whether to show component | `boolean` | `false` |
| duration | Animation execution time, supports uniform duration or setting enter and leave durations separately | `number \| boolean \| Record<string, number>` | `300` |
| lazy-render | Whether to render content on first show | `boolean` | `false` |
| name | Animation type, optional values are `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `zoom-in`, `zoom-out`, also supports array combining multiple animations | `TransitionName \| TransitionName[]` | - |
| destroy | Whether to hide content via `display: none` after animation ends | `boolean` | `true` |
| enter-class | Enter transition start state class name | `string` | `''` |
| enter-active-class | Enter transition active state class name | `string` | `''` |
| enter-to-class | Enter transition end state class name | `string` | `''` |
| leave-class | Leave transition start state class name | `string` | `''` |
| leave-active-class | Leave transition active state class name | `string` | `''` |
| leave-to-class | Leave transition end state class name | `string` | `''` |
| disable-touch-move | Whether to prevent touch scrolling | `boolean` | `false` |
| custom-style | Custom root node style | `string` | `''` |
| custom-class | Custom root node style class | `string` | `''` |

### TransitionName Animation Types

| Name | Description |
| --- | --- |
| fade | Fade in/out |
| fade-down | Fade down |
| fade-left | Fade left |
| fade-right | Fade right |
| fade-up | Fade up |
| slide-down | Slide down |
| slide-left | Slide left |
| slide-right | Slide right |
| slide-up | Slide up |
| zoom-in | Zoom in |
| zoom-out | Zoom out |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| before-enter | Triggered before enter | - |
| enter | Triggered when entering | - |
| after-enter | Triggered after enter | - |
| before-leave | Triggered before leave | - |
| leave | Triggered when leaving | - |
| after-leave | Triggered after leave | - |
| click | Triggered when clicking component | - |

## Slots

| Name | Description |
| --- | --- |
| default | Content that needs animation effect |
