# Grid

Grid can divide the page into equal-width blocks in the horizontal direction, used for displaying content or page navigation.

## Component Type

### Basic Usage

Basic usage requires specifying icon name through `icon` and text through `text` property. Default displays as one row.

```html
<wd-grid clickable>
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

### Content Slot

Customize grid content through `wd-grid-item` default slot.

```html
<wd-grid>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
</wd-grid>
```

```scss
.img {
  width: 100%;
  height: 90px;
}
```

## Component Variant

### Custom Column Count

Customize grid column count through `column` property. When this property is not defined, default displays as one row.

```html
<wd-grid :column="3">
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

### Square Grid

Enable square grid property through `square`. At this time, each `GridItem` has equal width and height.

> Note: After enabling `square`, it is not recommended to customize `GridItem` height through styles.

```html
<wd-grid square :column="4" border :gutter="10">
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

## Component Style

### Custom Background Color

Customize grid background color through `bg-color` property.

```html
<wd-grid bg-color="rgba(0, 0, 0, 0.02)">
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

### Enable Border

Enable border line display through `border` property.

```html
<wd-grid border :column="3">
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

### Set Grid Gap

Set distance between grids through `gutter` property.

```html
<wd-grid :gutter="10" :column="4">
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
  <wd-grid-item icon="image" text="Text" />
</wd-grid>
```

### Tip Information

After setting `is-dot` property, a small red dot will be displayed in the upper right corner of the icon. Badge display content can also be set through `value`, `max`.

```html
<wd-grid>
  <wd-grid-item is-dot icon="gift" text="Text" />
  <wd-grid-item value="100" :max="99" icon="desktop" text="Text" />
</wd-grid>
```

## Layout Capability

### Horizontal Layout

Set content arrangement direction through `direction` property, default is `vertical` (vertical), can be set to `horizontal` (horizontal). Cooperate with `reverse` property to swap icon and text positions.

```html
<wd-grid direction="horizontal" :column="2">
  <wd-grid-item icon="image" text="Icon on Left" />
  <wd-grid-item icon="settings" text="Settings Option" />
</wd-grid>

<wd-grid direction="horizontal" reverse :column="2" border>
  <wd-grid-item icon="image" text="Icon on Right" />
  <wd-grid-item icon="settings" text="Settings Option" />
</wd-grid>
```

## Special Style

### Icon Slot

Customize icon position content through named slot `icon`.

```html
<wd-grid>
  <wd-grid-item text="Text" icon-size="36px">
    <template #icon>
      <image class="slot-img" :src="joy" />
    </template>
  </wd-grid-item>
</wd-grid>
```

### Text Slot

Customize text position content through named slot `text`.

```html
<wd-grid>
  <wd-grid-item icon="image">
    <template #text>
      <view class="text">Custom Text Slot</view>
    </template>
  </wd-grid-item>
</wd-grid>
```

### Custom Style

Deeply customize styles through `custom-class` or external style classes. If text is too long and you want to display in single line with ellipsis, you can set `ellipsis` to `true`.

```html
<wd-grid>
  <wd-grid-item custom-class="custom-item" ellipsis icon="search-line" text="This is a custom styled grid item This is a custom styled grid item This is a custom styled grid item" />
</wd-grid>
```

```scss
:deep(.custom-item) {
  color: #e2231a;
  text-align: left !important;
}
```

### Page Navigation

Enable clickable state through `clickable` property, and set page jump through `url` and `link-type` properties.

```html
<wd-grid clickable>
  <wd-grid-item link-type="navigateTo" url="/pages/button/Index" icon="edit" text="Navigate to ..." />
</wd-grid>
```

## Grid Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| column | Column count | `number` | - |
| border | Whether to show border | `boolean` | `false` |
| gutter | Spacing between grids, default unit is `px` | `number` | - |
| square | Whether to fix grid as square | `boolean` | `false` |
| clickable | Whether to enable grid click feedback | `boolean` | `false` |
| bg-color | Background color setting | `string` | - |
| hover-class | Specify grid-item pressed style class | `string` | `'wd-grid-item__content--hover'` |
| center | Whether to center grid content display | `boolean` | `true` |
| direction | Grid content arrangement direction, optional values are `horizontal`, `vertical` | `string` | `'vertical'` |
| reverse | Whether to swap icon and text positions | `boolean` | `false` |
| icon-size | Icon size, default unit is `px` | `string` | `'28px'` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## GridItem Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| text | Text content | `string` | - |
| ellipsis | Whether to hide overflow and show ellipsis | `boolean` | `false` |
| icon | Icon name, optional values see `wd-icon` component | `string` | - |
| icon-color | Icon color | `string` | - |
| icon-prefix | Icon class name prefix | `string` | - |
| is-dot | Whether to show small red dot in upper right corner of icon | `boolean` | `false` |
| value | Badge display value in upper right corner of icon | `string \| number` | - |
| max | Badge maximum value in upper right corner of icon, exceeding maximum will display `{max}+` | `number` | `99` |
| badge-props | Custom badge properties, passed to [Badge component](/component/badge#attributes) | `BadgeProps` | - |
| url | Link address to jump to after clicking | `string` | - |
| link-type | Page jump method, optional values are `navigateTo`, `switchTab`, `reLaunch`, `redirectTo` | `string` | `'navigateTo'` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## GridItem Events

| Method Name | Description | Parameters |
| --- | --- | --- |
| click | Click (jump) event | - |

## Grid Slot

| name | Description |
| --- | --- |
| default | Grid content |

## GridItem Slot

| name | Description |
| --- | --- |
| default | Grid item default content (customize all content) |
| icon | Icon position content |
| text | Text position content |

## Grid External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |

## GridItem External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
| custom-text | Text style |
| custom-icon | Icon style |
