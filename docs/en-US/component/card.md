# Card

Used to display product images, prices and other information.

## Component Type

### Basic Usage

Set title through `title`, pass content through default slot, use `footer` slot for bottom operation area.

```html
<wd-card title="Yueyang Tower Record">
  <view class="content-text">
    When spring scenery is bright and calm, waves are still, the sky and water merge into one vast expanse of blue, seagulls hover and gather, glittering fish swim, shore plants flourish in green.
  </view>
  <template #footer>
    <wd-button size="small" plain>Read Full Text</wd-button>
  </template>
</wd-card>
```

### Rectangle Card

Set `type="rectangle"` to use rectangle card style.

```html
<wd-card title="Life Record" type="rectangle">
  <view class="list-group">
    <view class="list-item">
      <image src="https://wot-ui.cn/assets/panda.jpg" class="list-item__image" mode="aspectFill" />
      <view class="list-item__content">
        <view class="list-item__title">Great Weather Today</view>
        <view class="list-item__desc">Feb 11, 2026 Sunny 22°C</view>
      </view>
    </view>
  </view>
  <template #footer>
    <wd-button size="small" plain>Like</wd-button>
  </template>
</wd-card>
```

## Component Style

### Complex Card

Build higher information density card content by combining images, tags, and attribute blocks.

```html
<wd-card title="Pet Profile">
  <view class="info-card">...</view>
  <template #footer>
    <wd-button size="small" plain>Like (1.2w)</wd-button>
  </template>
</wd-card>
```

## Content Form

### Custom Title

Use `title` slot to customize title area content.

```html
<wd-card type="rectangle">
  <template #title>
    <view class="custom-title">
      <view>Hobbies</view>
      <view class="custom-title__tip">
        <wd-icon name="heart" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
        Source of Happiness
      </view>
    </view>
  </template>
  <view class="list-group">...</view>
</wd-card>
```

## Special Style

### Remove Footer

Bottom area will not render when `footer` slot is not passed.

```html
<wd-card title="Wonderful Moments" type="rectangle">
  <view class="moment-card">...</view>
</wd-card>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Card title | string | - |
| type | Card type, supports `rectangle` | string | - |
| custom-title-class | Title area custom class name | string | `''` |
| custom-content-class | Content area custom class name | string | `''` |
| custom-footer-class | Bottom area custom class name | string | `''` |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |

## Slots

| name | Description |
| --- | --- |
| default | Card content |
| title | Card title |
| footer | Bottom operation content |
