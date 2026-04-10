# Avatar

Used to represent users or things, supporting image, text, or icon display.

## Component Type

### Basic Usage

Avatar supports three types: image, text, and icon.

```typescript
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
```

```html
<wd-avatar :src="avatarURL" />
<wd-avatar text="U" />
<wd-avatar icon="user" />
```

### Avatar Group Basic Usage

Use `wd-avatar-group` component to display a group of avatars.

```html
<wd-avatar-group>
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

## Component State

### Clickable

Implement click functionality by listening to `click` event.

```html
<wd-avatar size="large" :src="avatarURL" @click="handleClick" />
<wd-avatar size="large" text="Click Me" bg-color="#1E90FF" @click="handleClick" />
```

```typescript
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

const handleClick = () => {
  toast.show('Avatar clicked')
}
```

## Component Style

### Avatar Shape

Use `shape` property to set avatar shape, supports `round` (circle) and `square` (square), default is `round`.

```html
<wd-avatar :src="avatarURL" shape="square" />
<wd-avatar :src="avatarURL" shape="round" />
```

### Avatar Size

Supports preset sizes: `large`, `medium`, `normal`, `small`, default is `normal`. Can also pass number or string with unit (e.g., `40px`, `100rpx`) for custom size.

```html
<wd-avatar :src="avatarURL" size="large" />
<wd-avatar :src="avatarURL" size="medium" />
<wd-avatar :src="avatarURL" size="normal" />
<wd-avatar :src="avatarURL" size="small" />
<wd-avatar :src="avatarURL" :size="80" />
<wd-avatar :src="avatarURL" :size="60" />
<wd-avatar :src="avatarURL" size="40px" />
```

### Custom Colors

Use `bg-color` and `color` properties to customize background color and text color.

```html
<wd-avatar bg-color="#DC143C" color="#fff" text="W" />
<wd-avatar bg-color="#228B22" color="#fff" text="O" />
<wd-avatar bg-color="#1E90FF" color="#fff" text="T" />
<wd-avatar bg-color="#EEEEEE" color="#7B8198" icon="user" />
```

## Special Style

### Avatar with Badge

Combine with Badge component to display badge.

```html
<wd-badge modelValue="10" type="primary">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge modelValue="20" type="danger">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar text="A" shape="square" bg-color="#1E90FF" />
</wd-badge>
```

## Content Form

### Custom Content

Use default slot to customize avatar content.

```html
<wd-avatar>
  <view class="custom-content">VIP</view>
</wd-avatar>
<wd-avatar>
  <wd-icon name="star-fill" size="24px" color="#f0883a" />
</wd-avatar>
```

## Layout Capability

### Avatar Group Max Count

Use `max-count` property to limit the number of displayed avatars, excess will be shown as `+N`.

```html
<wd-avatar-group :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### Avatar Group Cascading Direction

Use `cascading` property to set cascading direction, supports `left-up` (left side on top) and `right-up` (right side on top).

```html
<wd-avatar-group cascading="left-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### Avatar Group Vertical Stack

Use `vertical` property to enable vertical direction stack display.

```html
<wd-avatar-group vertical :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group vertical cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

## Avatar Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| src | Image URL | string | `''` |
| text | Text content | string | `''` |
| icon | Icon name, uses wd-icon component | string | `''` |
| size | Avatar size, supports `large / medium / normal / small` or custom number/unit string | string \| number | normal |
| shape | Avatar shape, supports `round / square` | string | round |
| bg-color | Background color | string | `''` |
| color | Text color | string | `''` |
| alt | Placeholder text when image fails to load | string | `''` |
| mode | Image fill mode, same as uni-app image component's mode | string | aspectFill |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

## Avatar Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking avatar | - |
| error | Triggered when image fails to load | `event` |

## Avatar Slots

| Name | Description |
| --- | --- |
| default | Custom avatar content |

## AvatarGroup Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| max-count | Maximum display count, shows collapsed avatar when exceeded | number | - |
| cascading | Cascading direction, optional values are `left-up`, `right-up` | string | left-up |
| shape | Uniformly set avatar shape within group, optional values are `round`, `square` | string | round |
| size | Uniformly set avatar size within group, supports preset sizes or custom number/unit string | string \| number | normal |
| collapse-avatar | Collapsed avatar display text when exceeding max count | string | `''` |
| vertical | Whether to display vertically | boolean | false |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

## AvatarGroup Slots

| Name | Description |
| --- | --- |
| default | Avatar list, place wd-avatar components |
