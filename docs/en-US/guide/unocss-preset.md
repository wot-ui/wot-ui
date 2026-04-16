# UnoCSS Preset

[@wot-ui/unocss-preset](https://github.com/wot-ui/unocss-preset) is the UnoCSS preset we provide to map `wot-ui` design tokens and theme variables into ready-to-use atomic classes.

After integrating it, you can directly use `wot-` prefixed classes in templates for colors, spacing, radius, font weights, typography, opacity, and strokes, without maintaining an extra layer of CSS variable mappings by hand.

```html
<view class="wot-bg-filled-oppo wot-rounded-xl wot-p-loose">
  <text class="wot-text-title-large wot-text-text-main wot-font-semibold">
    Wot UI UnoCSS Preset
  </text>
</view>
```

## When to Use It

`@wot-ui/unocss-preset` is a good fit if any of the following applies:

- Your project already uses `UnoCSS`
- You want to directly reuse `wot-ui` design tokens and theme variables
- You want to build `uni-app` / `Vue` page styles quickly with atomic classes

## What It Provides

This preset mainly provides three capabilities:

| Capability | Description |
| --- | --- |
| `theme` | Maps `wot-ui` semantic colors and base colors into the `UnoCSS` theme for color-related utilities |
| `rules` | Generates atomic rules such as `wot-text-*`, `wot-bg-*`, `wot-m-*`, `wot-p-*`, and `wot-rounded-*` |
| `preflights` | Automatically injects `wot-ui` CSS variables so these atomic classes resolve to the correct values |

By default, the class prefix is `wot-`, for example:

- `wot-text-primary`
- `wot-bg-danger-surface`
- `wot-m-main`
- `wot-rounded-md`
- `wot-text-body-main`

## Installation

::: code-group

```bash [npm]
npm i -D unocss
npm i @wot-ui/unocss-preset
```

```bash [yarn]
yarn add -D unocss
yarn add @wot-ui/unocss-preset
```

```bash [pnpm]
pnpm add -D unocss
pnpm add @wot-ui/unocss-preset
```

:::

## Usage

Create or update `unocss.config.ts` in the project root:

```ts
import { presetWot } from '@wot-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWot(),
  ],
})
```

After configuration, you can directly use `wot-` prefixed atomic classes in templates:

```vue
<template>
  <view class="wot-bg-filled-oppo wot-rounded-lg wot-p-main">
    <view class="wot-text-title-large wot-text-text-main">Title</view>
    <view class="wot-mt-tight wot-text-body-main wot-text-text-secondary">
      Use wot-ui design tokens to organize page styles quickly
    </view>
  </view>
</template>
```

## Configuration

You can pass options to `presetWot()` to customize its behavior:

```ts
presetWot({
  prefix: 'wot',
  preflight: true,
  baseTokens: false,
})
```

| Option | Default | Description | Example |
| --- | --- | --- | --- |
| `prefix` | `wot` | Utility class prefix | `wot-text-primary`, `wot-m-main` |
| `preflight` | `true` | Whether to automatically inject `wot-ui` CSS variables | `presetWot({ preflight: true })` |
| `baseTokens` | `false` | Whether to expose base palettes and raw token class names | `presetWot({ baseTokens: true })` |

### prefix

Controls the atomic class prefix. The default value is `wot`, so generated classes follow the `wot-*` format.

```ts
presetWot({
  prefix: 'wot',
})
```

### preflight

When enabled, `wot-ui` CSS variables are injected automatically. In most cases, you should keep the default value `true`. If you disable it, you need to ensure those variables are already available in your project, otherwise the classes may exist but render no visible styles.

### baseTokens

By default, the preset mainly exposes semantic tokens. When `baseTokens` is enabled, it additionally exposes base palettes and raw token class names for scenarios that need finer-grained control.

## Supported Rules

| Rule Type | Pattern | Example |
| --- | --- | --- |
| Colors | `wot-text-*` / `wot-bg-*` / `wot-border-*` | `wot-text-primary`, `wot-bg-danger-surface`, `wot-border-border-main` |
| Spacing | `wot-m-*` / `wot-gap-*` | `wot-m-main`, `wot-gap-tight`, `wot-gap-x-loose` |
| Padding | `wot-p-*` | `wot-p-main`, `wot-px-tight`, `wot-pb-loose` |
| Radius | `wot-rounded-*` | `wot-rounded-md`, `wot-rounded-full` |
| Font Weight | `wot-font-*` | `wot-font-medium`, `wot-font-semibold` |
| Typography | `wot-text-*` | `wot-text-body-main`, `wot-text-title-large` |
| Opacity | `wot-opacity-*` | `wot-opacity-disabled` |
| Stroke | `wot-border-stroke-*` | `wot-border-stroke-main` |

## Available Values

The following sections list the main values supported by each group of atomic classes. Use them by appending the value to the corresponding rule prefix.

### Color Utilities

| Item | Content |
| --- | --- |
| Applicable Prefixes | `wot-text-*`, `wot-bg-*`, `wot-border-*` |
| Primary | `primary`, `primary-1` ~ `primary-10` |
| Danger | `danger`, `danger-main`, `danger-hover`, `danger-clicked`, `danger-disabled`, `danger-particular`, `danger-surface` |
| Success | `success`, `success-main`, `success-hover`, `success-clicked`, `success-disabled`, `success-particular`, `success-surface` |
| Warning | `warning`, `warning-main`, `warning-hover`, `warning-clicked`, `warning-disabled`, `warning-particular`, `warning-surface` |
| Text Colors | `text-main`, `text-secondary`, `text-auxiliary`, `text-disabled`, `text-placeholder`, `text-white` |
| Icon Colors | `icon-main`, `icon-secondary`, `icon-auxiliary`, `icon-disabled`, `icon-placeholder`, `icon-white` |
| Border Colors | `border-extra-strong`, `border-strong`, `border-main`, `border-light`, `border-white`, `border-zero` |
| Filled Colors | `filled-extra-strong`, `filled-strong`, `filled-content`, `filled-bottom`, `filled-oppo`, `filled-zero` |
| Dividers | `divider-main`, `divider-light`, `divider-strong`, `divider-white` |
| Feedback Colors | `feedback-hover`, `feedback-active`, `feedback-accent` |
| Translucent Fills | `opacfilled-tooltip-toast-cover`, `opacfilled-main-cover`, `opacfilled-light-cover` |
| `Picker View Mask` | `picker-view-mask-start`, `picker-view-mask-end` |
| Categorized Colors | `classify-yellow-bg`, `classify-yellow-border`, `classify-yellow-content`, `classify-cyan-bg`, `classify-cyan-border`, `classify-cyan-content`, `classify-purple-bg`, `classify-purple-border`, `classify-purple-content`, `classify-grape-bg`, `classify-grape-border`, `classify-grape-content`, `classify-pink-bg`, `classify-pink-border`, `classify-pink-content` |
| Example | `wot-text-primary`, `wot-bg-filled-oppo`, `wot-border-border-main`, `wot-bg-classify-purple-content` |

### Spacing Utilities

| Item | Content |
| --- | --- |
| Applicable Prefixes | `wot-m-*`, `wot-mx-*`, `wot-my-*`, `wot-mt-*`, `wot-mr-*`, `wot-mb-*`, `wot-ml-*`, `wot-gap-*`, `wot-gap-x-*`, `wot-gap-y-*` |
| Available Values | `zero`, `ultra-tight`, `super-tight`, `extra-tight`, `tight`, `main`, `loose`, `extra-loose`, `super-loose`, `ultra-loose`, `spacious`, `extra-spacious`, `super-spacious`, `ultra-spacious` |
| Example | `wot-m-main`, `wot-mt-tight`, `wot-gap-x-loose` |

### Padding Utilities

| Item | Content |
| --- | --- |
| Applicable Prefixes | `wot-p-*`, `wot-px-*`, `wot-py-*`, `wot-pt-*`, `wot-pr-*`, `wot-pb-*`, `wot-pl-*` |
| Available Values | `zero`, `ultra-tight`, `super-tight`, `extra-tight`, `tight`, `main`, `loose`, `extra-loose`, `super-loose`, `ultra-loose`, `spacious`, `extra-spacious`, `super-spacious`, `ultra-spacious` |
| Example | `wot-p-main`, `wot-px-tight`, `wot-pb-loose` |

### Radius Utilities

| Item | Content |
| --- | --- |
| Applicable Prefix | `wot-rounded-*` |
| Available Values | `zero`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` |
| Example | `wot-rounded-md`, `wot-rounded-full` |

### Font Weight Utilities

| Item | Content |
| --- | --- |
| Applicable Prefix | `wot-font-*` |
| Available Values | `ultra-light`, `thin`, `light`, `regular`, `medium`, `semibold`, `bold` |
| Example | `wot-font-medium`, `wot-font-semibold` |

### Typography Utilities

| Item | Content |
| --- | --- |
| Applicable Prefix | `wot-text-*` |
| Title | `title-main`, `title-large`, `title-extra-large` |
| Body | `body-main`, `body-large`, `body-extra-large`, `body-super-large`, `body-ultra-large` |
| Label | `label-super-small`, `label-extra-small`, `label-small`, `label-main`, `label-large` |
| Example | `wot-text-body-main`, `wot-text-title-large`, `wot-text-label-large` |

### Opacity Utilities

| Item | Content |
| --- | --- |
| Applicable Prefix | `wot-opacity-*` |
| Available Values | `disabled`, `dimmer`, `overlay`, `main`, `backdrop` |
| Example | `wot-opacity-disabled`, `wot-opacity-main` |

### Stroke Utilities

| Item | Content |
| --- | --- |
| Applicable Prefix | `wot-border-stroke-*` |
| Available Values | `zero`, `light`, `main`, `bold` |
| Example | `wot-border-stroke-main`, `wot-border-stroke-bold` |

### Available When `baseTokens` Is Enabled

When `baseTokens: true` is enabled, base palettes and raw tokens are additionally exposed.

| Item | Content |
| --- | --- |
| Base Colors | `base-black`, `base-white`, `base-transparent` |
| Color Families | `blue-*`, `lightblue-*`, `pink-*`, `red-*`, `volcano-*`, `orange-*`, `yellow-*`, `green-*`, `cyan-*`, `purple-*`, `grape-*`, `coolgrey-*`, `neutralgrey-*`, `warmgrey-*` |
| Scale Range | Each family supports `1` ~ `10` |
| Extra Transparent Colors | Non-`grey` families additionally support `*-opac` |
| Opacity Scales | `opac-1_02`, `opac-2_04`, `opac-3_08`, `opac-4_15`, `opac-5_20`, `opac-6_30`, `opac-7_45`, `opac-7_55`, `opac-8_65`, `opac-9_75`, `opac-10_85` |
| White Opacity Scales | `opacwhite-1_02`, `opacwhite-2_04`, `opacwhite-3_08`, `opacwhite-4_15`, `opacwhite-5_20`, `opacwhite-6_30`, `opacwhite-7_45`, `opacwhite-7_55`, `opacwhite-8_65`, `opacwhite-9_75`, `opacwhite-10_85` |
| Example | `wot-bg-base-black`, `wot-text-blue-6`, `wot-border-opac-3_08` |

## Exports

The package exports `presetWot` by default and also exposes the following token maps for reuse in business projects:

- `SEMANTIC_COLOR_MAP`
- `BASE_COLOR_MAP`
- `SPACING_MAP`
- `PADDING_MAP`
- `RADIUS_MAP`
- `FONT_WEIGHT_MAP`
- `TYPOGRAPHY_MAP`
- `OPACITY_MAP`
- `STROKE_MAP`
