# Badge


Number or status mark that appears next to buttons or icons.

## Component Type

### Display Message Count

Display message count via `value`, supports number or text.

```html
<wd-badge custom-class="badge" :value="12">
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="3" bg-color="green">
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="primary">
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="warning">
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="success">
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="info">
  <wd-button :round="false" type="danger" size="small">Replies</wd-button>
</wd-badge>
```

## Component State

### Dot Type

Set `is-dot` to mark with red dot.

```html
<wd-badge custom-class="badge" is-dot>Data Query</wd-badge>
<wd-badge custom-class="badge" is-dot>
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
```

### Display Zero Value

Control whether to display when `value=0` via `show-zero`. `is-dot` has higher priority than `show-zero`.

```html
<wd-badge custom-class="badge" :value="0" show-zero>
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0">
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0" is-dot>
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
```

## Component Variant

### Badge Shape

Switch badge shape via `shape`.

```html
<wd-badge custom-class="badge" :value="12" shape="square">
  <wd-button :round="false" type="info" size="small">Square</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="12" shape="bubble">
  <wd-button :round="false" type="info" size="small">Bubble</wd-button>
</wd-badge>
```

## Component Style

### Definable Max Value

Set max display value via `max`. Only effective when `value` is a number.

```html
<wd-badge custom-class="badge" :value="200" :max="99">
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="200" :max="10">
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
```

## Special Style

### Outlined Badge

Set `border` to display outlined badge.

```html
<wd-badge custom-class="badge" :value="12" border>
  <wd-button :round="false" type="primary" size="small">Outline</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" border type="primary">
  <wd-button :round="false" type="danger" size="small">Outline</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="999" border type="warning">
  <wd-button :round="false" type="success" size="small">Outline</wd-button>
</wd-badge>
```

## Content Form

### Custom Content

Set string `value` to display text content other than numbers.

```html
<wd-badge custom-class="badge" value="new">
  <wd-button :round="false" type="info" size="small">Comments</wd-button>
</wd-badge>
<wd-badge custom-class="badge" value="hot">
  <wd-button :round="false" type="info" size="small">Replies</wd-button>
</wd-badge>
```

```scss
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| value | Display value | string \| number | - |
| max | Maximum value, displays `{max}+` when exceeded, only effective when `value` is number | number | - |
| top | When positive, badge offsets downward by corresponding pixels | string \| number | - |
| right | When positive, badge offsets leftward by corresponding pixels | string \| number | - |
| is-dot | Red dot mark | boolean | false |
| hidden | Hide badge | boolean | false |
| type | Type, supports `primary / success / warning / danger / info` | string | - |
| bg-color | Background color | string | - |
| show-zero | Whether to display 0 | boolean | false |
| shape | Badge shape, supports `circle / square / bubble` | string | circle |
| border | Whether to display white outline | boolean | false |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

## Slots

| Name | Description |
| --- | --- |
| default | Content wrapped by badge |
