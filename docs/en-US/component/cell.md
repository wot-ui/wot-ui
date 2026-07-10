# Cell

Cell is used for information display and light interaction. Can be used independently or managed uniformly with `wd-cell-group` for layout and style.

## Component Type

### Basic Usage

```html
<wd-cell-group>
  <wd-cell title="Title Text" value="Content" />
  <wd-cell title="Title Text" label="Description Info" value="Content" />
</wd-cell-group>
```

### Group Title

```html
<wd-cell-group title="Transaction Management" value="Content">
  <wd-cell title="Title Text" value="Content" />
  <wd-cell title="Title Text" label="Description Info" value="Content" />
</wd-cell-group>
```

## Component State

### Click Feedback

```html
<wd-cell title="Title Text" value="Content" clickable @click="showToast" />
```

## Component Variant

### Placeholder

```html
<wd-cell-group>
  <wd-cell title="Username" placeholder="Please enter username" />
  <wd-cell title="Phone" value="188****8888" placeholder="Please enter phone" />
  <wd-cell title="Left Align" placeholder="Please enter content" value-align="left" />
  <wd-cell title="Center Align" placeholder="Please enter content" value-align="center" />
</wd-cell-group>
```

### Page Navigation

```html
<wd-cell-group>
  <wd-cell title="Help & Feedback" is-link to="/pages/index/Index" />
  <wd-cell title="Settings" value="Content" is-link to="/pages/button/Index" replace />
</wd-cell-group>
```

### Arrow Direction

```html
<wd-cell-group>
  <wd-cell title="Up Arrow" is-link arrow-direction="up" />
  <wd-cell title="Down Arrow" is-link arrow-direction="down" />
  <wd-cell title="Left Arrow" is-link arrow-direction="left" />
  <wd-cell title="Default Arrow (Right)" is-link />
</wd-cell-group>
```

## Component Style

### Icon Settings

Set `prefix-icon` to use built-in icons, or use `prefix` slot to customize leading icon.

```html
<wd-cell-group>
  <wd-cell title="Title Text" value="Content" prefix-icon="settings" />
  <wd-cell title="Title Text" value="Content">
    <template #prefix>
      <view class="cell-icon"></view>
    </template>
  </wd-cell>
</wd-cell-group>
```

When both `prefix-icon` and `suffix-icon` use CSS icons, it is recommended to set `css-icon` to `true` and pass each icon prop as its own CSS icon class. If you pass a string class name directly to `css-icon`, the prefix and suffix icons will share the same CSS class.

```html
<wd-cell css-icon prefix-icon="i-carbon-user" suffix-icon="i-carbon-chevron-right" />
```

### Large Size

```html
<wd-cell-group>
  <wd-cell size="large" title="Title Text" value="Content" />
  <wd-cell size="large" title="Title Text" value="Content" prefix-icon="settings" is-link />
  <wd-cell size="large" title="Title Text" label="Description Info" value="Content" />
</wd-cell-group>
```

### Vertical Center

```html
<wd-cell-group>
  <wd-cell title="Title Text" value="Content" center />
  <wd-cell title="Title Text" label="Description Info" value="Content" center />
</wd-cell-group>
```

### Rounded Card Style

```html
<wd-cell-group insert>
  <wd-cell title="Title Text" value="Content" />
  <wd-cell title="Title Text" label="Description Info" value="Content" />
</wd-cell-group>
```

## Special Style

### Display Border

```html
<wd-cell-group title="Transaction Management" border>
  <wd-cell title="Title Text" value="Content" />
  <wd-cell :border="false" title="Title Text" label="This cell doesn't want border" value="Content" />
  <wd-cell title="Title Text" label="Description Info" value="Content" />
</wd-cell-group>
```

### Form Properties

```html
<wd-cell-group border>
  <wd-cell title="Required" required>
    <wd-rate v-model="rate" />
  </wd-cell>
  <wd-cell title="Required Star on Right" required asterisk-position="end">
    <wd-rate v-model="rate1" />
  </wd-cell>
  <wd-cell title="Vertical Layout" layout="vertical" required asterisk-position="end">
    <wd-slider v-model="slider" />
  </wd-cell>
</wd-cell-group>
```

### Set Left Width

```html
<wd-cell
  title="Title Text"
  label="This is description text, this is description text, this is description text"
  title-width="200px"
  value="Content"
/>
```

### Content Ellipsis

```html
<wd-cell-group>
  <wd-cell title="Normal Display" value="This is a very long, very long, very long, very long, very long content" />
  <wd-cell title="Ellipsis Display" value="This is a very long, very long, very long, very long, very long content" ellipsis />
  <wd-cell title="Left Align Ellipsis" value="This is a very long, very long, very long, very long, very long content" value-align="left" ellipsis />
</wd-cell-group>
```

### Custom Content

```html
<wd-cell-group>
  <wd-cell title="Title Text" center>
    <wd-button size="small" plain>Button</wd-button>
  </wd-cell>
  <wd-cell title="Title Text" center>
    <wd-switch v-model="switchValue" />
  </wd-cell>
  <wd-cell title="Title Text" is-link to="/pages/index/index">
    <view class="custom-text">Order</view>
  </wd-cell>
  <wd-cell>
    <template #title>
      <view>
        <view style="display: inline-block">Title Text</view>
        <view class="end-time">Expires in 25 days</view>
      </view>
    </template>
  </wd-cell>
</wd-cell-group>
```

## CellGroup Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Group title | string | - |
| value | Group right content | string | - |
| border | Whether to show outer border | boolean | false |
| insert | Whether to display as rounded card style | boolean | false |
| center | Whether to center content vertically | boolean | false |
| size | Cell size, supports `large` | string | - |
| title-width | Left title width | `string \| number` | - |
| layout | Cell layout method, supports `horizontal / vertical` | string | - |
| value-align | Right content alignment, supports `left / right / center` | string | - |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Cell Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Left title | string | - |
| value | Right content | `string \| number` | `''` |
| placeholder | Placeholder, only displayed when value is empty | string | - |
| label | Description info below title | string | - |
| prefix-icon | Leading icon name | string | - |
| suffix-icon | Trailing icon name | string | - |
| icon-size | Icon size | `string \| number` | - |
| icon-prefix | Icon class prefix | string | - |
| css-icon | CSS icon, see Icon component for usage | `boolean \| string` | `false` |
| to | Navigation address | string | - |
| replace | Whether to replace current page history when navigating | boolean | false |
| clickable | Whether to enable click feedback | boolean | false |
| is-link | Whether to show right arrow and enable click feedback | boolean | false |
| arrow-direction | Arrow direction (only effective when is-link is true), supports `left / up / down / right` | string | right |
| size | Cell size, supports `large` | string | - |
| border | Whether to show inner border, priority is higher than cell-group same name attribute | boolean | Inherited from CellGroup |
| title-width | Left title width | `string \| number` | Inherited from CellGroup |
| center | Whether to center vertically | boolean | Inherited from CellGroup |
| layout | Cell layout method, supports `horizontal / vertical` | string | Inherited from CellGroup |
| value-align | Right content alignment, supports `left / right / center` | string | Inherited from CellGroup |
| required | Whether to show required asterisk | boolean | false |
| asterisk-position | Required asterisk position, supports `start / end` | string | start |
| hide-asterisk | Whether to hide required asterisk | boolean | false |
| ellipsis | Whether to truncate content with ellipsis when exceeding | boolean | false |
| use-title-slot | Whether to enable title slot | boolean | true |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |
| custom-prefix-class | Leading icon custom style class | string | `''` |
| custom-suffix-class | Trailing icon custom style class | string | `''` |
| custom-label-class | Label area custom style class | string | `''` |
| custom-value-class | Value area custom style class | string | `''` |
| custom-title-class | Title area custom style class | string | `''` |

## Cell Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking cell when clickable or is-link is true | - |

## CellGroup Slots

| name | Description | Parameters |
| --- | --- | --- |
| title | Group title | - |
| value | Group right content | - |

## Cell Slots

| name | Description | Parameters |
| --- | --- | --- |
| prefix | Leading icon area | - |
| title | Title area | - |
| label | Description info area | - |
| default | Right content area | - |
| suffix | Trailing icon area (effective when is-link is false) | - |
