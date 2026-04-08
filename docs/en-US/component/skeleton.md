# Skeleton

Skeleton screens are used for placeholder display during content loading, supporting multiple theme types, custom rows and columns, animation effects, and slot content.

## Component Types

### Basic Usage

Set different skeleton themes through `theme`, commonly used for text, avatar, image, paragraph and other scenarios.

::: code-group
```html
<wd-skeleton theme="avatar" />
<wd-skeleton theme="image" />
<wd-skeleton theme="text" />
<wd-skeleton theme="paragraph" />
```
:::

## Component Styles

### Grid Skeleton Screen

Construct a grid skeleton screen by combining multi-row and multi-column placeholder structures through `row-col`.


::: code-group
```html
<wd-skeleton :row-col="grid" />
```
```ts
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' }
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' }
  ]
] as SkeletonRowCol[]
```
:::

### Cell Skeleton Screen

Can combine avatar, rectangle block and text lines to simulate common cell list layouts.

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
<view style="display: flex; margin-top: 20px">
  <wd-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
```

### Image Combination Skeleton Screen

Can combine `row-col` to customize image card and text-image mixed layout placeholder structures.

```html
<wd-skeleton :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
<wd-skeleton :custom-style="{ marginTop: '20px' }" :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
```

## Special Styles

### Gradient Loading Animation

Set `animation="gradient"` to enable gradient loading animation.

```html
<wd-skeleton animation="gradient" theme="paragraph" />
```

### Flashing Loading Animation

Set `animation="flashed"` to enable flashing loading animation.

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
</view>
```

### Slot Content

Write actual content through the default slot. When `loading` is `true`, the skeleton screen is displayed; after switching to `false`, the slot content is displayed.

::: code-group
```html
<wd-skeleton :row-col="grid" :loading="showContent">
  <wd-grid>
    <wd-grid-item icon-size="32px" icon="camera" text="Text" />
    <wd-grid-item icon-size="32px" icon="camera" text="Text" />
    <wd-grid-item icon-size="32px" icon="camera" text="Text" />
    <wd-grid-item icon-size="32px" icon="camera" text="Text" />
    <wd-grid-item icon-size="32px" icon="camera" text="Text" />
  </wd-grid>
</wd-skeleton>
```
```ts
const showContent = ref(true)
```
:::

---

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| theme | Skeleton screen theme, optional values are `text`, `avatar`, `paragraph`, `image` | `SkeletonTheme` | `'text'` |
| row-col | Customize placeholder configuration for each row, used to set the number of rows and columns, width, height, spacing, rounded corners and placeholder type, etc. | `SkeletonRowCol[]` | `[]` |
| loading | Whether to display the skeleton screen | `boolean` | `true` |
| animation | Animation type, optional values are `gradient`, `flashed` | `SkeletonAnimation` | `''` |
| custom-class | Custom style class name | `string \| string[] \| Record<string, boolean>` | `''` |
| custom-style | Custom inline style | `CSSProperties` | `{}` |

## Slots

| Name | Description |
| --- | --- |
| default | Actual content displayed after `loading` ends |

## Type Definitions

### SkeletonTheme

Optional values: `'text' \| 'avatar' \| 'paragraph' \| 'image'`

### SkeletonAnimation

Optional values: `'gradient' \| 'flashed'`

### SkeletonRowCol Configuration Example

```ts
// Three rows, displayed as one column, one column, two columns of placeholders
[1, 1, 2]

// Three rows, third row with custom width
[1, 1, { width: '100px' }]

// The third row contains two columns, set width and right margin respectively
[1, 1, [{ width: '50%' }, { width: '50%', marginRight: '10px' }]]
```
