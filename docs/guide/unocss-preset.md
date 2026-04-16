# UnoCSS Preset

[@wot-ui/unocss-preset](https://github.com/wot-ui/unocss-preset) 是我们提供的 `UnoCSS` 预设，用来把 `wot-ui` 的设计 token 和主题变量映射成可直接使用的原子类。

接入后，你可以直接在模板中使用 `wot-` 前缀类名完成颜色、间距、圆角、字重、排版、透明度和描边等样式编排，而不需要手动维护一套额外的 CSS 变量映射。

```html
<view class="wot-bg-filled-oppo wot-rounded-xl wot-p-loose">
  <text class="wot-text-title-large wot-text-text-main wot-font-semibold">
    Wot UI UnoCSS Preset
  </text>
</view>
```

## 适用场景

如果你满足以下任一场景，推荐使用 `@wot-ui/unocss-preset`：

- 项目已经接入 `UnoCSS`
- 希望直接复用 `wot-ui` 的设计 token 与主题变量
- 希望通过原子类快速搭建 `uni-app` / `Vue` 页面样式

## 它提供了什么

这个预设主要提供三部分能力：

| 能力 | 说明 |
| --- | --- |
| `theme` | 把 `wot-ui` 的语义色和基础色映射到 `UnoCSS theme`，供颜色类规则使用 |
| `rules` | 生成 `wot-text-*`、`wot-bg-*`、`wot-m-*`、`wot-p-*`、`wot-rounded-*` 等原子类规则 |
| `preflights` | 自动注入 `wot-ui` 的 CSS 变量，确保这些原子类能拿到正确的变量值 |

默认情况下，类名前缀为 `wot-`，例如：

- `wot-text-primary`
- `wot-bg-danger-surface`
- `wot-m-main`
- `wot-rounded-md`
- `wot-text-body-main`

## 安装

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

## 使用

在项目根目录创建或更新 `unocss.config.ts`：

```ts
import { presetWot } from '@wot-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWot(),
  ],
})
```

完成配置后，就可以直接在模板中使用 `wot-` 前缀原子类：

```vue
<template>
  <view class="wot-bg-filled-oppo wot-rounded-lg wot-p-main">
    <view class="wot-text-title-large wot-text-text-main">标题</view>
    <view class="wot-mt-tight wot-text-body-main wot-text-text-secondary">
      使用 wot-ui 设计 token 快速组织页面样式
    </view>
  </view>
</template>
```

## 配置项

你可以通过 `presetWot()` 传入配置项来自定义行为：

```ts
presetWot({
  prefix: 'wot',
  preflight: true,
  baseTokens: false,
})
```

| 配置项 | 默认值 | 说明 | 示例 |
| --- | --- | --- | --- |
| `prefix` | `wot` | 工具类前缀 | `wot-text-primary`、`wot-m-main` |
| `preflight` | `true` | 是否自动注入 `wot-ui` CSS 变量 | `presetWot({ preflight: true })` |
| `baseTokens` | `false` | 是否开放基础色板和原始 token 类名 | `presetWot({ baseTokens: true })` |

### prefix

用于控制原子类前缀。默认是 `wot`，对应生成的类名格式为 `wot-*`。

```ts
presetWot({
  prefix: 'wot',
})
```

### preflight

开启后会自动注入 `wot-ui` 相关 CSS 变量，通常推荐保持默认值 `true`。如果关闭它，需要你自行确保这些变量已在项目中可用，否则类名可能存在但样式不生效。

### baseTokens

默认情况下，预设主要暴露语义化 token。开启 `baseTokens` 后，还会额外开放基础色板和原始 token 类名，适合需要更细粒度控制的场景。

## 支持的规则

| 规则类型 | 前缀模式 | 示例 |
| --- | --- | --- |
| 颜色 | `wot-text-*` / `wot-bg-*` / `wot-border-*` | `wot-text-primary`、`wot-bg-danger-surface`、`wot-border-border-main` |
| 间距 | `wot-m-*` / `wot-gap-*` | `wot-m-main`、`wot-gap-tight`、`wot-gap-x-loose` |
| 内边距 | `wot-p-*` | `wot-p-main`、`wot-px-tight`、`wot-pb-loose` |
| 圆角 | `wot-rounded-*` | `wot-rounded-md`、`wot-rounded-full` |
| 字重 | `wot-font-*` | `wot-font-medium`、`wot-font-semibold` |
| 排版 | `wot-text-*` | `wot-text-body-main`、`wot-text-title-large` |
| 透明度 | `wot-opacity-*` | `wot-opacity-disabled` |
| 描边 | `wot-border-stroke-*` | `wot-border-stroke-main` |

## 可用变量值

以下为各类原子类支持的主要变量值，使用时将它们拼接到对应规则后即可。

### 颜色类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-text-*`、`wot-bg-*`、`wot-border-*` |
| 主色 | `primary`、`primary-1` ~ `primary-10` |
| 危险色 | `danger`、`danger-main`、`danger-hover`、`danger-clicked`、`danger-disabled`、`danger-particular`、`danger-surface` |
| 成功色 | `success`、`success-main`、`success-hover`、`success-clicked`、`success-disabled`、`success-particular`、`success-surface` |
| 警告色 | `warning`、`warning-main`、`warning-hover`、`warning-clicked`、`warning-disabled`、`warning-particular`、`warning-surface` |
| 文字色 | `text-main`、`text-secondary`、`text-auxiliary`、`text-disabled`、`text-placeholder`、`text-white` |
| 图标色 | `icon-main`、`icon-secondary`、`icon-auxiliary`、`icon-disabled`、`icon-placeholder`、`icon-white` |
| 边框色 | `border-extra-strong`、`border-strong`、`border-main`、`border-light`、`border-white`、`border-zero` |
| 填充色 | `filled-extra-strong`、`filled-strong`、`filled-content`、`filled-bottom`、`filled-oppo`、`filled-zero` |
| 分割线 | `divider-main`、`divider-light`、`divider-strong`、`divider-white` |
| 反馈色 | `feedback-hover`、`feedback-active`、`feedback-accent` |
| 半透明填充 | `opacfilled-tooltip-toast-cover`、`opacfilled-main-cover`、`opacfilled-light-cover` |
| `Picker View Mask` | `picker-view-mask-start`、`picker-view-mask-end` |
| 分类色 | `classify-yellow-bg`、`classify-yellow-border`、`classify-yellow-content`、`classify-cyan-bg`、`classify-cyan-border`、`classify-cyan-content`、`classify-purple-bg`、`classify-purple-border`、`classify-purple-content`、`classify-grape-bg`、`classify-grape-border`、`classify-grape-content`、`classify-pink-bg`、`classify-pink-border`、`classify-pink-content` |
| 示例 | `wot-text-primary`、`wot-bg-filled-oppo`、`wot-border-border-main`、`wot-bg-classify-purple-content` |

### 间距类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-m-*`、`wot-mx-*`、`wot-my-*`、`wot-mt-*`、`wot-mr-*`、`wot-mb-*`、`wot-ml-*`、`wot-gap-*`、`wot-gap-x-*`、`wot-gap-y-*` |
| 可用值 | `zero`、`ultra-tight`、`super-tight`、`extra-tight`、`tight`、`main`、`loose`、`extra-loose`、`super-loose`、`ultra-loose`、`spacious`、`extra-spacious`、`super-spacious`、`ultra-spacious` |
| 示例 | `wot-m-main`、`wot-mt-tight`、`wot-gap-x-loose` |

### 内边距类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-p-*`、`wot-px-*`、`wot-py-*`、`wot-pt-*`、`wot-pr-*`、`wot-pb-*`、`wot-pl-*` |
| 可用值 | `zero`、`ultra-tight`、`super-tight`、`extra-tight`、`tight`、`main`、`loose`、`extra-loose`、`super-loose`、`ultra-loose`、`spacious`、`extra-spacious`、`super-spacious`、`ultra-spacious` |
| 示例 | `wot-p-main`、`wot-px-tight`、`wot-pb-loose` |

### 圆角类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-rounded-*` |
| 可用值 | `zero`、`sm`、`md`、`lg`、`xl`、`2xl`、`3xl`、`full` |
| 示例 | `wot-rounded-md`、`wot-rounded-full` |

### 字重类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-font-*` |
| 可用值 | `ultra-light`、`thin`、`light`、`regular`、`medium`、`semibold`、`bold` |
| 示例 | `wot-font-medium`、`wot-font-semibold` |

### 排版类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-text-*` |
| Title | `title-main`、`title-large`、`title-extra-large` |
| Body | `body-main`、`body-large`、`body-extra-large`、`body-super-large`、`body-ultra-large` |
| Label | `label-super-small`、`label-extra-small`、`label-small`、`label-main`、`label-large` |
| 示例 | `wot-text-body-main`、`wot-text-title-large`、`wot-text-label-large` |

### 透明度类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-opacity-*` |
| 可用值 | `disabled`、`dimmer`、`overlay`、`main`、`backdrop` |
| 示例 | `wot-opacity-disabled`、`wot-opacity-main` |

### 描边类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-border-stroke-*` |
| 可用值 | `zero`、`light`、`main`、`bold` |
| 示例 | `wot-border-stroke-main`、`wot-border-stroke-bold` |

### 开启 `baseTokens` 后可用

当 `baseTokens: true` 时，会额外开放基础色板与原始 token。

| 项目 | 内容 |
| --- | --- |
| 基础色 | `base-black`、`base-white`、`base-transparent` |
| 色阶家族 | `blue-*`、`lightblue-*`、`pink-*`、`red-*`、`volcano-*`、`orange-*`、`yellow-*`、`green-*`、`cyan-*`、`purple-*`、`grape-*`、`coolgrey-*`、`neutralgrey-*`、`warmgrey-*` |
| 色阶范围 | 每个家族支持 `1` ~ `10` |
| 额外透明色 | 非 `grey` 家族额外支持 `*-opac` |
| 透明阶 | `opac-1_02`、`opac-2_04`、`opac-3_08`、`opac-4_15`、`opac-5_20`、`opac-6_30`、`opac-7_45`、`opac-7_55`、`opac-8_65`、`opac-9_75`、`opac-10_85` |
| 白色透明阶 | `opacwhite-1_02`、`opacwhite-2_04`、`opacwhite-3_08`、`opacwhite-4_15`、`opacwhite-5_20`、`opacwhite-6_30`、`opacwhite-7_45`、`opacwhite-7_55`、`opacwhite-8_65`、`opacwhite-9_75`、`opacwhite-10_85` |
| 示例 | `wot-bg-base-black`、`wot-text-blue-6`、`wot-border-opac-3_08` |

## 导出内容

包默认导出 `presetWot`，并额外导出以下 token maps，便于业务侧复用：

- `SEMANTIC_COLOR_MAP`
- `BASE_COLOR_MAP`
- `SPACING_MAP`
- `PADDING_MAP`
- `RADIUS_MAP`
- `FONT_WEIGHT_MAP`
- `TYPOGRAPHY_MAP`
- `OPACITY_MAP`
- `STROKE_MAP`