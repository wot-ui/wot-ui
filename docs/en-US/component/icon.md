# Icon

Font-based icon set.

## Upgrade from v1 to v2

`v2` reorganizes the built-in icon set. Some icon names have changed, while some icons are no longer provided. During an upgrade, choose replacements based on both visual appearance and business meaning instead of matching names alone.

The mappings below are common recommendations, not automatic replacement rules. Multiple `v1` icons may map to the same `v2` icon, so verify the business meaning and rendered result after migration. Icon names are case-sensitive; names such as `Launch` and `Export` must keep their initial uppercase letter.

- [Read the complete v1 → v2 migration guide](/en-US/guide/migration-v2#icon-migration)
- [Use the open-wot migration Skill to view the complete icon mappings](https://github.com/wot-ui/open-wot/tree/main/skills/migrate-v1-to-v2)

### Common name changes

| v1 icon name    | Recommended v2 name |
| --------------- | ------------------- |
| `add`           | `plus`              |
| `add-circle`    | `plus-circle`       |
| `decrease`      | `minus`             |
| `arrow-left`    | `left`              |
| `arrow-right`   | `right`             |
| `arrow-up`      | `up`                |
| `arrow-down`    | `down`              |
| `search`        | `search-line`       |
| `more`          | `more-vertical`     |
| `picture`       | `image`             |
| `eye-close`     | `eye-invisible`     |
| `setting`       | `settings`          |
| `help`          | `question`          |
| `check-outline` | `check-circle`      |
| `close-outline` | `close-circle`      |
| `fullsreen`     | `fullscreen`        |

```html
<!-- v1 -->
<wd-icon name="add" />
<wd-icon name="picture" />

<!-- v2 -->
<wd-icon name="plus" />
<wd-icon name="image" />
```

### Icons without an equivalent

If `v2` has no suitable visual or semantic equivalent, do not force a replacement. Choose another icon based on the business meaning, or use the custom icon support documented below to preserve the original appearance.

## Component Type

### Basic Usage

Set which icon to use through the `name` property.

```html
<wd-icon name="del" />
```

## Component Style

### Icon Color

Set the `color` property.

```html
<wd-icon name="del" color="#0083ff" />
```

### Icon Size

Set the `size` property.

```html
<wd-icon name="del" size="20px" />
```

## Special Style

### Custom Icons

If you need to use more icons on top of the existing Icon, you can import the font files and CSS files corresponding to third-party iconfont, and then use them directly in the Icon component.

``` css
/* Path src/iconfont/index.css */

@font-face {
  font-family: "fish";
  src: url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff2?t=1721314121733') format('woff2'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff?t=1721314121733') format('woff'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.ttf?t=1721314121733') format('truetype');
}

.fish {
  font-family: "fish" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fish-kehuishouwu:before {
  content: "\e627";
}

```
```html
<!-- app.vue -->
<style>
@import '@/iconfont/index.css';
</style>
```

```html
<!-- Specify class name as fish through class-prefix -->
<wd-icon class-prefix="fish" name="kehuishouwu" />
```

### CSS Class Icons (UnoCSS)

If your project uses [UnoCSS](https://unocss.dev/) or other CSS engines, you can set `css-icon` to `true`. In this case, the passed `name` will be directly used as a CSS class name without any prefix concatenation.

```html
<wd-icon css-icon name="i-ep-apple" />
<wd-icon css-icon name="i-carbon-sun" />

<!-- You can also pass the class name directly to css-icon without using name -->
<wd-icon css-icon="i-carbon-sun" />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| name | Icon name or image link | `string` | - |
| color	| Icon color | `string` | `inherit` |
| size | Icon font size | `string \| number` | `inherit` |
| class-prefix | Class name prefix, used for custom icons | `string` | `wd-icon` |
| css-icon | CSS icon. When `true`, `name` is used directly as the CSS class without prefix. You can also pass the class name directly | `boolean \| string` | `false` |
| custom-style | Root node style | `string` | - |
| custom-class | Root node style | `string` | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking the icon | `event` |
