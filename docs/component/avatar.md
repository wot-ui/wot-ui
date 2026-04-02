---
version: 1.14.0
---

# Avatar 头像

用来代表用户或事物，支持图片、文本或图标展示。

## 组件类型

### 基础用法

头像支持三种类型：图片、文本、图标。

```typescript
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
```

```html
<wd-avatar :src="avatarURL" />
<wd-avatar text="U" />
<wd-avatar icon="user" />
```

### 头像组基础用法

使用 `wd-avatar-group` 组件可以展示一组头像。

```html
<wd-avatar-group>
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

## 组件状态

### 可点击

通过监听 `click` 事件实现点击功能。

```html
<wd-avatar size="large" :src="avatarURL" @click="handleClick" />
<wd-avatar size="large" text="点我" bg-color="#1E90FF" @click="handleClick" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const handleClick = () => {
  toast.show('点击头像')
}
```

## 组件样式

### 头像形状

使用 `shape` 属性设置头像形状，支持 `round`（圆形）和 `square`（方形），默认为 `round`。

```html
<wd-avatar :src="avatarURL" shape="square" />
<wd-avatar :src="avatarURL" shape="round" />
```

### 头像尺寸

支持预设尺寸：`large`、`medium`、`normal`、`small`，默认为 `normal`。也可以传入数字或带单位的字符串（如 `40px`、`100rpx`）自定义尺寸。

```html
<wd-avatar :src="avatarURL" size="large" />
<wd-avatar :src="avatarURL" size="medium" />
<wd-avatar :src="avatarURL" size="normal" />
<wd-avatar :src="avatarURL" size="small" />
<wd-avatar :src="avatarURL" :size="80" />
<wd-avatar :src="avatarURL" :size="60" />
<wd-avatar :src="avatarURL" size="40px" />
```

### 自定义颜色

使用 `bg-color` 和 `color` 属性自定义背景色和文字颜色。

```html
<wd-avatar bg-color="#DC143C" color="#fff" text="W" />
<wd-avatar bg-color="#228B22" color="#fff" text="O" />
<wd-avatar bg-color="#1E90FF" color="#fff" text="T" />
<wd-avatar bg-color="#EEEEEE" color="#7B8198" icon="user" />
```

## 特殊样式

### 带徽记的头像

结合 Badge 组件展示徽记。

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

## 内容形态

### 自定义内容

使用默认插槽自定义头像内容。

```html
<wd-avatar>
  <view class="custom-content">VIP</view>
</wd-avatar>
<wd-avatar>
  <wd-icon name="star-fill" size="24px" color="#f0883a" />
</wd-avatar>
```

## 布局能力

### 头像组最大数量

使用 `max-count` 属性限制显示的头像数量，超出部分会以 `+N` 形式展示。

```html
<wd-avatar-group :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### 头像组叠层方向

使用 `cascading` 属性设置叠层方向，支持 `left-up`（左侧叠在上层）和 `right-up`（右侧叠在上层）。

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

### 头像组垂直堆叠

使用 `vertical` 属性开启垂直方向堆叠展示。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | string | `''` |
| text | 文本内容 | string | `''` |
| icon | 图标名称，使用 wd-icon 组件 | string | `''` |
| size | 头像尺寸，支持 `large / medium / normal / small` 或自定义数值/单位字符串 | string \| number | normal |
| shape | 头像形状，支持 `round / square` | string | round |
| bg-color | 背景颜色 | string | `''` |
| color | 文字颜色 | string | `''` |
| alt | 图片加载失败时的占位文本 | string | `''` |
| mode | 图片填充模式，同 uni-app image 组件的 mode | string | aspectFill |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Avatar Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击头像时触发 | - |
| error | 图片加载失败时触发 | `event` |

## Avatar Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义头像内容 |

## AvatarGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max-count | 最大显示数量，超出后显示折叠头像 | number | - |
| cascading | 叠层方向，支持 `left-up / right-up` | string | left-up |
| shape | 统一设置组内头像形状，支持 `round / square` | string | round |
| size | 统一设置组内头像尺寸，支持预设尺寸或自定义数值/单位字符串 | string \| number | normal |
| collapse-avatar | 超出最大数量时折叠头像显示文本 | string | `''` |
| vertical | 是否垂直展示 | boolean | false |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## AvatarGroup Slots

| 名称 | 说明 |
| --- | --- |
| default | 头像列表，放置 wd-avatar 组件 |
