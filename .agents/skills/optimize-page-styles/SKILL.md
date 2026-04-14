---
name: optimize-page-styles
description: 优化 subPages 演示页面中的样式，将硬编码的颜色、字号、间距、圆角等替换为 wot-ui 设计系统语义变量。允许直接使用已全局注入的 variable.scss Sass 变量，也允许使用 CSS 自定义属性；不需要额外引入 variable.scss。消除手写的暗色模式覆盖块，统一使用语义变量实现自适应主题。同时将 class 命名统一为 BEM 规范。
---

# 优化 subPages 样式：语义变量 + BEM 命名

本 Skill 用于将 `src/subPages` 中演示页面的硬编码样式替换为 `src/uni_modules/wot-ui/styles/variable.scss` 中定义的语义变量，并将 class 命名统一为 BEM（Block Element Modifier）规范。

## 职责边界

- **只负责**：subPages 中 `<style>` 块里的样式优化和 class 命名规范化（同时修改 `<template>` 中对应的 `class` 属性）。
- **不负责**：组件源码样式、Demo 逻辑变更、文档迁移。
- **不需要**在页面中引入 `variable.scss`——项目已全局注入相关变量，样式中可直接使用 `$text-main`、`$spacing-main`、`$radius-large` 等 Sass 变量，也可使用 `var(--wot-xxx)`。

## 前置知识

### BEM 命名规范

subPages 中的 class 命名必须遵循 BEM 规范，与组件库本身的命名约定保持一致。

#### BEM 三要素

| 要素 | 格式 | 分隔符 | 说明 |
|------|------|--------|------|
| **Block（块）** | `block-name` | — | 独立的功能模块，使用 kebab-case |
| **Element（元素）** | `block-name__element` | `__`（双下划线） | 块的组成部分，不能脱离块独立存在 |
| **Modifier（修饰符）** | `block-name--modifier` | `--`（双连字符） | 块或元素的变体/状态 |

> 项目 BEM 配置（`_config.scss`）：`$elementSeparator: '__'`，`$modifierSeparator: '--'`，`$state-prefix: 'is-'`

#### subPages 的 Block 命名约定

每个 subPage 使用 `page-<component>` 作为顶层 Block，例如：
- `page-popup`、`page-button`、`page-card`、`page-tabs`

页面内自定义的功能区域使用独立的 Block，例如：
- `user-card`、`info-card`、`moment-card`、`list-group`、`footer-group`

#### SCSS 嵌套写法

BEM 配合 SCSS `&` 嵌套，避免重复书写 Block 名称：

```scss
// ✅ 正确：使用 & 嵌套
.user-card {
  display: flex;

  &__avatar {
    width: $n-88;
  }

  &__title {
    font-size: $typography-body-size-extra-large;
  }

  &--highlighted {
    border: $stroke-main solid $primary-6;
  }
}

// ❌ 错误：平级重复写 Block 名
.user-card { ... }
.user-card__avatar { ... }
.user-card__title { ... }
```

#### 常见反模式与修正

| 反模式 | 问题 | 修正 |
|--------|------|------|
| `.content` | 太泛，无 Block 归属 | `.page-tabs__content` 或 `.<block>__content` |
| `.title` | 太泛，全局易冲突 | `.page-popup__title` 或 `.<block>__title` |
| `.large` | 语义不清 | `.page-tabs__content--large` |
| `.section` | 太泛 | `.page-tabs__section` |
| `.footer` | 太泛 | `.page-form__footer` |
| `.block` | 太泛 | `.page-transition__block` |
| `.demo-button` | 缺少页面 Block 前缀 | `.page-form__action` 或保持在 Block 作用域内 |
| `.demo-row` | 缺少页面 Block 前缀 | `.page-button__row` |
| `.demo-container` | 缺少页面 Block 前缀 | `.page-sticky__container` |
| `.nested-popup-content` | 连字符连接而非 BEM | `.nested-popup__content` |
| `.nested-title` | 扁平命名，应归属 Block | `.nested-popup__title` |
| `.nested-desc` | 扁平命名 | `.nested-popup__desc` |
| `.nested-buttons` | 扁平命名 | `.nested-popup__buttons` |
| `.custom-txt` | 扁平命名 | `.page-popup__text` 或 `.<block>__text` |
| `.custom-container` | 太泛 | `.page-sticky__box` |

#### Element 命名约定（常用）

| 场景 | 推荐 Element 名 |
|------|------------------|
| 头像 | `__avatar` |
| 图片 | `__image` |
| 标题 | `__title` |
| 描述/副标题 | `__desc` |
| 内容区 | `__content` |
| 底部区域 | `__footer` |
| 操作区 | `__action` |
| 标签 | `__label` / `__tag` |
| 元数据 | `__meta` |
| 行/列 | `__row` / `__col` |
| 图片容器 | `__image-box` |
| 按钮组 | `__buttons` |
| 文本 | `__text` |

#### Modifier 命名约定（常用）

| 场景 | 推荐 Modifier 名 |
|------|-------------------|
| 尺寸 | `--small` / `--large` |
| 对齐 | `--left` / `--right` / `--center` |
| 状态 | `--active` / `--disabled` / `--highlighted` |
| 变体 | `--plain` / `--round` |

#### 状态类

与组件库保持一致，使用 `is-` 前缀：
- `is-active`、`is-disabled`、`is-open`

### 变量来源

语义变量定义在 `src/uni_modules/wot-ui/styles/variable.scss`。项目已全局注入这些 Sass 变量及对应的 CSS 自定义属性，页面中无需 `@use` 或 `@import`。

### 变量使用方式

优先级按使用场景区分：

1. **`<style lang="scss">` 中优先使用全局 Sass 变量**
  - 例如：`color: $text-main;`、`gap: $spacing-loose;`、`border-radius: $radius-large;`
  - 原因：与现有 SCSS 书写方式更一致，可读性更高，也不需要重复写 `var(--wot-xxx)`。
2. **字符串形式的内联样式、`custom-style`、运行时拼接样式中使用 CSS 自定义属性**
  - 例如：`custom-style="margin-left: var(--wot-spacing-main);"`
  - 原因：这些位置不能安全使用 Sass 变量。
3. **两种写法都允许，但同一段样式保持一致**
  - 如果文件原本以 Sass 变量为主，继续沿用 Sass 变量。
  - 如果某段必须写在字符串里，则使用 `var(--wot-xxx)`。

### 变量类别速查

| 类别      | 变量前缀 / 示例                                                                                             | 说明                     |
| --------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ |
| 文字色    | `--wot-text-main` / `--wot-text-secondary` / `--wot-text-auxiliary` / `--wot-text-disabled` / `--wot-text-placeholder` / `--wot-text-white` | 主文本、次要文本、辅助文本、禁用、占位、白色文本 |
| 图标色    | `--wot-icon-main` / `--wot-icon-secondary` / `--wot-icon-auxiliary`                                          | 与文字色同级             |
| 填充色    | `--wot-filled-bottom` / `--wot-filled-content` / `--wot-filled-strong` / `--wot-filled-extra-strong` / `--wot-filled-oppo` / `--wot-filled-zero` | 容器背景色按强度分级     |
| 边框色    | `--wot-border-main` / `--wot-border-light` / `--wot-border-strong` / `--wot-border-extra-strong` / `--wot-border-white` / `--wot-border-zero` | 边框按强度分级         |
| 分割线色  | `--wot-divider-main` / `--wot-divider-light` / `--wot-divider-strong`                                        | 分割线色               |
| 主色      | `--wot-primary-1` ~ `--wot-primary-10`                                                                       | 品牌主色 10 级           |
| 危险色    | `--wot-danger-main` / `hover` / `clicked` / `disabled` / `particular` / `surface`                             | 危险状态色             |
| 成功色    | `--wot-success-main` / `hover` / ...                                                                          | 成功状态色             |
| 警告色    | `--wot-warning-main` / `hover` / ...                                                                          | 警告状态色             |
| 反馈色    | `--wot-feedback-hover` / `--wot-feedback-active` / `--wot-feedback-accent`                                    | 交互反馈色               |
| 遮罩/透明 | `--wot-opacfilled-main-cover` / `--wot-opacfilled-light-cover` / `--wot-opacfilled-tooltip-toast-cover`       | 遮罩与蒙层              |
| 间距      | `--wot-spacing-zero` ~ `--wot-spacing-ultra-spacious`                                                         | 元素间距               |
| 内边距    | `--wot-padding-zero` ~ `--wot-padding-ultra-spacious`                                                         | 内边距                 |
| 圆角      | `--wot-radius-zero` / `small` / `main` / `large` / `extra-large` / `super-large` / `ultra-large` / `radius-full` | 圆角                   |
| 字号      | `--wot-typography-label-size-*` / `--wot-typography-body-size-*` / `--wot-typography-title-size-*`             | 字号分 label/body/title 三级 |
| 行高      | `--wot-typography-label-line-height-size-*` / `--wot-typography-body-line-height-size-*` / `--wot-typography-title-line-height-size-*` | 行高对应字号级别       |
| 字重      | `--wot-font-weight-regular` / `medium` / `semibold` / `bold` / ...                                            | 字重                   |
| 边框宽度  | `--wot-stroke-zero` / `light` / `main` / `blod`                                                               | 边框线宽              |
| 基础尺寸  | `--wot-n-0` ~ `--wot-n-375` / `--wot-n-full`                                                                  | 基础数字（px）        |
| 透明度    | `--wot-opacity-disabled` / `dimmer` / `oveylay` / `backdrop` / `main`                                         | 透明度                 |
| 基础颜色  | `--wot-base-black` / `--wot-base-white` / `--wot-base-transparent`                                            | 黑/白/透明            |
| 色阶颜色  | `--wot-blue-1` ~ `--wot-blue-10` / `red` / `green` / `orange` / `yellow` / `coolgrey` / ...                   | 原始色阶（优先用语义变量） |

### 间距枚举对照（包括 spacing 和 padding）

| 语义名          | 默认值 |
| --------------- | ------ |
| `zero`          | 0px    |
| `ultra-tight`   | 2px    |
| `super-tight`   | 4px    |
| `extra-tight`   | 6px    |
| `tight`         | 8px    |
| `main`          | 10px   |
| `loose`         | 12px   |
| `extra-loose`   | 16px   |
| `super-loose`   | 20px   |
| `ultra-loose`   | 24px   |
| `spacious`      | 28px   |
| `extra-spacious`| 32px   |
| `super-spacious`| 40px   |
| `ultra-spacious`| 48px   |

### 圆角枚举对照

| 语义名         | 默认值 |
| -------------- | ------ |
| `zero`         | 0px    |
| `small`        | 2px    |
| `main`         | 4px    |
| `large`        | 8px    |
| `extra-large`  | 12px   |
| `super-large`  | 16px   |
| `ultra-large`  | 20px   |
| `radius-full`  | 9999px |

### 字号枚举对照

**Label 级**（说明文字、标注）

| 语义名          | 默认值 |
| --------------- | ------ |
| `super-small`   | 9px    |
| `extra-small`   | 10px   |
| `small`         | 11px   |
| `main`          | 12px   |
| `large`         | 14px   |

**Body 级**（正文）

| 语义名          | 默认值 |
| --------------- | ------ |
| `main`          | 14px   |
| `large`         | 15px   |
| `extra-large`   | 16px   |
| `super-large`   | 17px   |
| `ultra-large`   | 18px   |

**Title 级**（标题）

| 语义名          | 默认值 |
| --------------- | ------ |
| `main`          | 18px   |
| `large`         | 20px   |
| `extra-large`   | 24px   |

## 执行步骤

### 第一步：扫描目标文件

使用 grep 查找当前目标 subPage 文件中的硬编码样式和非 BEM class 名：

```bash
# 找出硬编码颜色、字号、间距、圆角等的位置
grep -n 'color:.*#\|font-size:.*[0-9]\(px\|rpx\)\|padding:.*[0-9]\(px\|rpx\)\|margin:.*[0-9]\(px\|rpx\)\|background.*:.*#\|border.*:.*#\|gap:.*[0-9]\(px\|rpx\)\|border-radius:.*[0-9]\(px\|rpx\)\|font-weight:.*[0-9]' <target-file>

# 找出所有 class 名，检查是否符合 BEM
grep -n 'class="' <target-file>
```

### 第二步：分析与映射

对每个硬编码值，按以下优先级选择替换方案：

1. **颜色值** → 匹配语义变量
  - `color: black` / `color: #000` / `color: #1D1F29` → `color: $text-main`（或 `var(--wot-text-main)`）
  - `color: #666` / `color: #4E5369` → `color: $text-auxiliary`
  - `color: #999` / `color: #A9ACB8` → `color: $text-placeholder`
  - `color: #333` / `color: #272B3B` → `color: $text-secondary`
  - `color: white` / `color: #fff` → `color: $text-white`
  - `background: #fff` / `background-color: #ffffff` → `background: $filled-oppo` （白色容器背景）
  - `background: #f7f8fa` / 浅灰背景 → `background: $filled-bottom`
  - `background: #f2f3f5` → `background: $filled-content`
  - `border-color: #eee` / 浅灰边框 → `border-color: $border-light`
  - `background: #0083ff` / 主色蓝 → `background: $primary-6`

2. **字号** → 匹配排版变量
  - `9px` → `$typography-label-size-super-small`
  - `10px` → `$typography-label-size-extra-small`
  - `11px` → `$typography-label-size-small`
  - `12px` → `$typography-label-size-main`
  - `14px`（用于标注/辅助文字） → `$typography-label-size-large` 或 `$typography-body-size-main`（用于正文）
  - `15px` → `$typography-body-size-large`
  - `16px` → `$typography-body-size-extra-large`
  - `17px` → `$typography-body-size-super-large`
  - `18px` → `$typography-body-size-ultra-large` 或 `$typography-title-size-main`（标题）
  - `20px` → `$typography-title-size-large`
  - `24px` → `$typography-title-size-extra-large`

3. **字重** → 匹配字重变量
  - `font-weight: 400` / `normal` → `$font-weight-regular`
  - `font-weight: 500` / `600` → `$font-weight-medium`
  - `font-weight: 700` / `bold` → `$font-weight-semibold` 或 `$font-weight-bold`

4. **间距 / 内边距 / gap** → 匹配间距或内边距变量
  - `0px` → `$spacing-zero`（若差异不大可保持 0）
  - `2px` → `$spacing-ultra-tight`
  - `4px` → `$spacing-super-tight`
  - `6px` → `$spacing-extra-tight`
  - `8px` → `$spacing-tight`
  - `10px` → `$spacing-main`
  - `12px` → `$spacing-loose`
  - `15px` → 取近似 `$spacing-extra-loose`（16px）或保留
  - `16px` → `$spacing-extra-loose`
  - `20px` → `$spacing-super-loose`
  - `24px` → `$spacing-ultra-loose`
  - `28px` → `$spacing-spacious`
  - `32px` → `$spacing-extra-spacious`
  - `40px` → `$spacing-super-spacious`
  - `48px` → `$spacing-ultra-spacious`
  - padding 类似，用 `$padding-*` 系列

5. **圆角** → 匹配圆角变量
  - `2px` → `$radius-small`
  - `4px` → `$radius-main`
  - `8px` → `$radius-large`
  - `12px` → `$radius-extra-large`
  - `16px` → `$radius-super-large`
  - `20px` → `$radius-ultra-large`
  - `9999px` / `50%`（胶囊） → `$radius-full`

6. **边框宽度** → 匹配 stroke 变量
  - `0.5px` → `$stroke-light`
  - `1px` → `$stroke-main`
  - `2px` → `$stroke-bold`

7. **固定尺寸** → 对于非间距类的固定大小可使用 `$n-*`

### 第三步：规范 BEM 命名

审查 `<template>` 中所有 `class` 属性和 `<style>` 中所有选择器，将不符合 BEM 规范的 class 名统一重命名。

**操作要点**：

1. **确定页面顶层 Block**：通常为 `page-<component>`（如 `page-popup`、`page-tabs`）。
2. **泛化 class 归入 Block**：如 `.content` → `.page-tabs__content`，`.title` → `.page-popup__title`。
3. **拆分不规范的连字符名**：如 `.nested-popup-content` → `.nested-popup__content`。
4. **Modifier 用 `--` 分隔**：如 `.footer-group.right` → `.footer-group--right`（已遵循的保持）。
5. **同步修改 `<template>` 和 `<style>`**——class 重命名必须在模板和样式中同步修改，保持一致。
6. **SCSS 嵌套优化**——重命名后使用 `&__element` / `&--modifier` 嵌套写法，减少重复。
7. **页面内独立功能区可以有自己的 Block**——不必所有元素都挂在 `page-xxx` 下，与页面 Block 并列即可。

### 第四步：消除暗色模式手动覆盖

语义变量（如 `--wot-text-main`、`--wot-filled-oppo`）在 light/dark 主题切换时会自动重新映射。

如果原文件中有以下模式：

```scss
.wot-theme-dark {
  .xxx {
    color: $-dark-color;
    background: $-dark-background2;
  }
}
```

替换了硬编码颜色为语义变量后，这些 `.wot-theme-dark` 覆盖块应当被**删除**，因为语义变量已经自动适配暗色主题。

**判断规则**：
- 如果 `.wot-theme-dark` 块中的覆盖仅仅是将浅色硬编码值换成暗色值（与语义变量的 dark theme 映射一致），则删除此块。
- 如果 `.wot-theme-dark` 块中有其他非颜色相关的样式覆盖（如布局调整），则保留。

### 第五步：去除多余的 `@use` 引入

替换为 CSS 自定义属性后，如果原文件样式块中有以下引入：

```scss
@use '../../uni_modules/wot-ui/styles/variable.scss' as *;
```

可以**删除**该引入，因为 Sass 变量与 CSS 自定义属性都已全局可用，不需要通过 SCSS `@use` 引入。

> **注意**：即使文件中继续使用 SCSS `$variable` 形式，也不需要为 `variable.scss` 额外添加 `@use`。只有在文件依赖其他未全局注入的 SCSS 模块时，才保留对应引入。

### 第六步：逐一替换并验证

1. 一次处理一个文件。
2. 对每个硬编码值执行替换。
3. **替换时保持注释**——如果原样式有解释性注释，保留或更新。
4. **class 重命名要同步 `<template>` 和 `<style>`**——两处同时修改，保持一致。
5. **不改动 `<script>` 中的逻辑**。
6. 对于 rpx 单位的值，同样使用对照表换算后映射。常见的 rpx 值除以 2 即为 px 值：`20rpx` = `10px` → `$spacing-main`；如果是在字符串内联样式中，则写成 `var(--wot-spacing-main)`。
7. 对于确实没有合适语义变量对应的值（如 `height: 250vh`、`width: 100vw`、极特殊的像素值），**保留原值**不做替换。
8. 对于 `line-height: 1.4` / `line-height: 1.5` 等无单位的行高倍数，如果当前元素使用的 `font-size` 有对应的语义字号（如 `$typography-body-size-main`），则应将其 `line-height` 一并替换为同级别的行高变量（如 `$typography-body-line-height-size-main`）。如果没有对应的 `font-size`，则保留原值不做替换。

### 第七步：验证

替换完成后检查：

1. **无遗漏**：再次 grep 确认该文件中没有残留的硬编码颜色、字号、间距。
2. **BEM 合规**：确认所有 class 均符合 BEM 规范，无泛化 class 名。
3. **模板与样式一致**：确认 `<template>` 中的 class 名与 `<style>` 中的选择器完全匹配。
4. **语法正确**：确保 `$token` 或 `var(--wot-xxx)` 写法正确，无拼写错误。
5. **暗色模式块已清理**：确保无多余的 `.wot-theme-dark` 覆盖。

## 注意事项

1. **不要过度替换**：动画时长（`transition`、`animation-duration`）、`z-index`、`opacity` 数值（除非有对应变量）、视口单位（`vh`、`vw`）、百分比（`50%`、`100%`）保持原值。
2. **rpx 处理**：uni-app 中 rpx 等于 1/2 px（设计稿 375），按实际 px 值查找对应变量。
3. **无需引入文件**：Sass 变量和 CSS 自定义属性都已全局注入，不需要任何 `@use variable.scss` / `@import variable.scss`。
4. **优先语义变量**：优先使用语义层变量（如 `$text-main`、`$filled-oppo`、`$primary-6`，或对应的 `--wot-*` CSS 变量），而非底层色阶变量（如 `$blue-6` / `--wot-blue-6`）。底层色阶只在语义层没有合适选项时使用。
5. **`custom-style` 中的内联样式也在范围内**：如果 `<template>` 中 `custom-style="padding: 20px;"` 等有硬编码值，同样可以替换，但要注意内联样式的写法是 CSS 字符串，不是 SCSS，因此这里应使用 `var(--wot-xxx)`。

## 输出示例

### 示例一：sticky 页面（语义变量 + BEM + 暗色覆盖清理）

#### 替换前

**template:**
```html
<view class="page-sticky page-sticky__stage">
  <view class="demo-container">...</view>
  <view class="custom-container">...</view>
</view>
```

**style:**
```scss
.page-sticky {
  &__stage {
    height: 250vh;
  }
}

.wot-theme-dark {
  .custom-container {
    background: $-dark-background2;
  }
}

.demo-container {
  padding: 15px 0;
  color: #666;
}

.custom-container {
  height: 120px;
  width: 100vw;
  background-color: #ffffff;
}
```

#### 替换后

**template:**
```html
<view class="page-sticky page-sticky--stage">
  <view class="page-sticky__container">...</view>
  <view class="page-sticky__box">...</view>
</view>
```

**style:**
```scss
.page-sticky {
  &--stage {
    height: 250vh;
  }

  &__container {
    padding: var(--wot-padding-extra-loose) 0;
    color: var(--wot-text-auxiliary);
  }

  &__box {
    height: 120px;
    width: 100vw;
    background-color: var(--wot-filled-oppo);
  }
}
/* .wot-theme-dark 块已删除：语义变量自动适配暗色主题 */
```

**变更要点：**
- `page-sticky__stage` → `page-sticky--stage`（stage 是修饰符而非子元素）
- `.demo-container` → `.page-sticky__container`（归入 Block）
- `.custom-container` → `.page-sticky__box`（归入 Block）
- 硬编码颜色 / 间距替换为语义变量
- 删除 `.wot-theme-dark` 覆盖块

---

### 示例二：popup 页面（BEM 重命名）

#### 替换前

**template:**
```html
<text class="custom-txt">...</text>
<view class="nested-popup-content">
  <text class="nested-title">...</text>
  <text class="nested-desc">...</text>
  <view class="nested-buttons">...</view>
</view>
```

**style:**
```scss
.page-popup {
  .custom-txt {
    color: black;
    font-size: 40rpx;
    border-radius: 32rpx;
  }

  .nested-popup-content {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  .nested-title {
    color: black;
    font-size: 36rpx;
    font-weight: bold;
  }

  .nested-desc {
    color: #666;
    font-size: 28rpx;
    margin: 10rpx 0;
  }

  .nested-buttons {
    display: flex;
    gap: 20rpx;
    margin-top: 20rpx;
  }
}

.wot-theme-dark {
  .page-popup {
    .custom-txt,
    .nested-title {
      color: $-dark-color;
    }
    .nested-desc {
      color: $-dark-color3;
    }
  }
}
```

#### 替换后

**template:**
```html
<text class="page-popup__text">...</text>
<view class="nested-popup">
  <text class="nested-popup__title">...</text>
  <text class="nested-popup__desc">...</text>
  <view class="nested-popup__buttons">...</view>
</view>
```

**style:**
```scss
.page-popup {
  &__text {
    color: var(--wot-text-main);
    font-size: var(--wot-typography-title-size-large);
    border-radius: var(--wot-radius-super-large);
  }
}

.nested-popup {
  display: flex;
  flex-direction: column;
  gap: var(--wot-spacing-main);

  &__title {
    color: var(--wot-text-main);
    font-size: var(--wot-typography-title-size-main);
    font-weight: var(--wot-font-weight-bold);
    text-align: center;
  }

  &__desc {
    color: var(--wot-text-auxiliary);
    font-size: var(--wot-typography-body-size-main);
    margin: var(--wot-spacing-extra-tight) 0;
  }

  &__buttons {
    display: flex;
    gap: var(--wot-spacing-main);
    margin-top: var(--wot-spacing-main);
  }
}
/* .wot-theme-dark 块已删除：语义变量自动适配暗色主题 */
```

**变更要点：**
- `.custom-txt` → `.page-popup__text`（归入页面 Block）
- `.nested-popup-content` → `.nested-popup`（提升为独立 Block）
- `.nested-title/desc/buttons` → `.nested-popup__title/desc/buttons`（成为 Block 的 Element）
- 所有硬编码值替换为语义变量（含 rpx → 换算后匹配）
- 删除 `.wot-theme-dark` 覆盖块

---

### 示例三：tabs 页面（语义变量 + 泛化 class 修正）

#### 替换前

**template:**
```html
<view class="content">内容</view>
<view class="large">内容</view>
<view class="section">...</view>
<view class="title">标题</view>
```

**style:**
```scss
.tabs-theme-item {
  margin-bottom: 20px;

  &__label {
    margin-bottom: 10px;
    padding-left: 15px;
    font-size: 14px;
    color: #666;
  }
}

.content {
  height: 120px;
  text-align: center;
}
.large {
  line-height: 320px;
  text-align: center;
}
.title {
  font-size: 32rpx;
  padding: 24rpx 0;
}
```

#### 替换后

**template:**
```html
<view class="page-tabs__content">内容</view>
<view class="page-tabs__content page-tabs__content--large">内容</view>
<view class="page-tabs__section">...</view>
<view class="page-tabs__title">标题</view>
```

**style:**
```scss
.tabs-theme-item {
  margin-bottom: var(--wot-spacing-super-loose);

  &__label {
    margin-bottom: var(--wot-spacing-main);
    padding-left: var(--wot-padding-extra-loose);
    font-size: var(--wot-typography-body-size-main);
    color: var(--wot-text-auxiliary);
  }
}

.page-tabs {
  &__content {
    height: 120px;
    text-align: center;

    &--large {
      line-height: 320px;
    }
  }

  &__section {
    // ...
  }

  &__title {
    font-size: var(--wot-typography-body-size-extra-large);
    padding: var(--wot-padding-loose) 0;
  }
}
```

**变更要点：**
- `.content` → `.page-tabs__content`
- `.large` → `.page-tabs__content--large`（Modifier）
- `.title` → `.page-tabs__title`
- `.section` → `.page-tabs__section`
- 所有选择器统一嵌套在 `.page-tabs` Block 内
