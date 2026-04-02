---
trigger: always_on
description: wot-ui 组件 SCSS 变量命名规范的可复用规则，包含属性关键词、状态/变体命名、语义令牌等参考表
---

# SCSS 变量命名规则

本规则定义了 wot-ui 组件 SCSS 变量的命名标准，供相关 SKILL 引用。

---

## 一、设计令牌架构

采用三层设计令牌架构，由底层到上层逐级引用：

| 层级 | 名称 | 说明 | 示例 |
|------|------|------|------|
| L1 | 基础令牌 (Base Tokens) | 原始色值、数值，无语义 | `--wot-blue-6`, `--wot-n-16` |
| L2 | 语义令牌 (Semantic Tokens) | 具有语义的通用变量 | `$primary-6`, `$text-main`, `$padding-main` |
| L3 | 组件令牌 (Component Tokens) | 组件级别的专属变量 | `$button-primary-bg` |

---

## 二、核心命名格式

### 2.1 概念定义

*   **元素 (Element)**：组件内部的子部件，如 `title`、`icon`、`dot`、`arrow`、`desc` 等。
*   **变体 (Variant)**：类型或尺寸的变化，如 `primary`、`success`、`small`、`large` 等。
*   **属性 (Attribute)**：CSS 属性关键词，如 `bg`、`color`、`font-size` 等。
*   **状态 (State)**：交互状态，如 `hover`、`active`、`disabled` 等。

### 2.2 SCSS 变量格式

```scss
// 无元素时（变体在属性前）
$组件名-变体-属性-状态: var(--wot-组件名-变体-属性-状态, $语义令牌) !default;

// 有元素时（元素在属性前）
$组件名-元素-属性-变体-状态: var(--wot-组件名-元素-属性-变体-状态, $语义令牌) !default;
```

### 2.3 核心规则

1. **CSS 变量前缀**：必须使用 `--wot-` 前缀
2. **语义化默认值**：必须使用语义令牌（如 `$primary-6`），禁止硬编码值（如 `#1c64fd`）
3. **!default 标记**：所有变量必须添加 `!default`，允许用户覆盖
4. **无前缀横杠**：变量名不能以 `-` 开头（❌ `$-button-bg`）

---

## 三、属性关键词表

| 关键词 | 含义 | 使用场景 | 示例 |
|--------|------|----------|------|
| `bg` | 背景色 | 背景颜色 | `$input-bg`, `$cell-bg-active` |
| `color` | 文字/图标色 | 前景颜色 | `$input-color`, `$icon-color` |
| `border` | 边框色 | 边框颜色 | `$input-border-color` |
| `font-size` | 字号 | 文字大小 | `$button-font-size-small` |
| `font-weight` | 字重 | 文字粗细 | `$title-font-weight` |
| `line-height` | 行高 | 行高 | `$cell-title-line-height` |
| `size` | 尺寸 | 宽高、图标大小等 | `$cell-arrow-size` |
| `width` | 宽度 | 固定宽度 | `$popup-width` |
| `height` | 高度 | 固定高度 | `$badge-height` |
| `padding` | 内边距 | 内边距 | `$cell-padding` |
| `margin` | 外边距 | 外边距 | `$cell-margin-horizontal` |
| `spacing` | 间距 | 元素之间的间距 | `$cell-icon-spacing-right` |
| `radius` | 圆角 | 圆角半径 | `$button-radius` |
| `shadow` | 阴影 | 盒阴影 | `$popup-shadow` |
| `z-index` | 层级 | 堆叠层级 | `$popup-z-index` |
| `transition-duration` | 过渡时长 | 动画/过渡时长 | `$button-transition-duration` |
| `opacity` | 透明度 | 透明度 | `$button-opacity-disabled` |

---

## 四、状态与变体后缀

### 4.1 交互状态后缀

| 后缀 | 含义 | 示例 |
|------|------|------|
| `-hover` | 悬停状态 | `$button-primary-bg-hover` |
| `-active` | 激活/按下状态 | `$button-primary-bg-active` |
| `-focus` | 聚焦状态 | `$input-border-color-focus` |
| `-disabled` | 禁用状态 | `$button-primary-bg-disabled` |
| `-checked` | 选中状态 | `$checkbox-bg-checked` |
| `-loading` | 加载状态 | `$button-opacity-loading` |

### 4.2 类型变体后缀

| 后缀 | 含义 |
|------|------|
| `-primary` | 主要类型 |
| `-success` | 成功类型 |
| `-warning` | 警告类型 |
| `-danger` / `-error` | 危险/错误类型 |
| `-info` | 信息类型 |
| `-plain` | 朴素/镂空样式 |
| `-text` | 文字按钮样式 |

### 4.3 尺寸变体后缀

| 后缀 | 含义 |
|------|------|
| `-mini` | 迷你尺寸 |
| `-small` | 小尺寸 |
| `-medium` / `-main` | 中等/默认尺寸 |
| `-large` | 大尺寸 |

### 4.4 方向后缀（用于复合属性）

| 后缀 | 含义 | 示例 |
|------|------|------|
| `-horizontal` | 水平方向 | `$cell-padding-horizontal` |
| `-vertical` | 垂直方向 | `$cell-padding-vertical` |
| `-top` | 上方 | `$cell-margin-top` |
| `-bottom` | 下方 | `$cell-margin-bottom` |
| `-left` | 左侧 | `$cell-icon-spacing-left` |
| `-right` | 右侧 | `$cell-icon-spacing-right` |

---

## 五、命名示例对照表

| 场景 | 正确命名 ✅ | 错误命名 ❌ |
|------|------------|------------|
| 按钮主色背景 | `$button-primary-bg` | `$button-color-primary-bg`, `$button-bg-primary` |
| 按钮主色激活态背景 | `$button-primary-bg-active` | `$button-primary-active-bg` |
| 按钮主色文字颜色 | `$button-primary-text` | `$button-text-primary`, `$button-text-color-primary` |
| 输入框字号 | `$input-font-size` | `$input-fs`, `$input-fontSize` |
| 单元格标题颜色 | `$cell-title-color` | `$cell-color-title` |
| 输入框边框聚焦色 | `$input-border-color-focus` | `$input-focus-border-color` |
| 弹窗圆角 | `$popup-radius` | `$popup-border-radius` |
| 禁用态透明度 | `$button-opacity-disabled` | `$button-disabled-opacity` |
| 小尺寸高度 | `$button-height-small` | `$button-small-height` |
| 激活态背景 | `$cell-bg-active` | `$cell-active-bg` |
| 图标右间距 | `$cell-icon-spacing-right` | `$cell-spacing-icon-right` |

---

## 六、语义令牌参考表

组件变量的默认值应优先引用以下语义令牌：

### 6.1 颜色令牌

| 类别 | 令牌示例 |
|------|---------|
| 主色 | `$primary-1` ~ `$primary-10` |
| 功能色 | `$danger-main`, `$success-main`, `$warning-main` |
| 文字色 | `$text-main`, `$text-secondary`, `$text-auxiliary`, `$text-disabled`, `$text-placeholder`, `$text-white` |
| 图标色 | `$icon-main`, `$icon-secondary`, `$icon-disabled` |
| 边框色 | `$border-main`, `$border-light`, `$border-strong` |
| 填充色 | `$filled-oppo`, `$filled-bottom`, `$filled-content` |
| 基础色 | `$base-white`, `$base-black` |

### 6.2 尺寸令牌

| 类别 | 令牌示例 |
|------|---------|
| 数值 | `$n-8`, `$n-12`, `$n-14`, `$n-16`, `$n-20`, `$n-24`, `$n-32`, `$n-48` ... |
| 间距 | `$padding-zero`, `$padding-ultra-tight` (2px), `$padding-super-tight` (4px), `$padding-extra-tight` (6px), `$padding-tight` (8px), `$padding-main` (10px), `$padding-loose` (12px), `$padding-extra-loose` (16px) |
| 同样间距 | `$spacing-zero`, `$spacing-ultra-tight`, `$spacing-super-tight`, `$spacing-extra-tight`, `$spacing-tight`, `$spacing-main`, `$spacing-loose`, `$spacing-extra-loose` |

### 6.3 圆角令牌

| 令牌 | 值 |
|------|-----|
| `$radius-zero` | 0 |
| `$radius-small` | 2px |
| `$radius-main` | 4px |
| `$radius-large` | 8px |
| `$radius-extra-large` | 12px |
| `$radius-super-large` | 16px |
| `$radius-radius-full` | 9999px |

### 6.4 字体令牌

| 类别 | 令牌示例 |
|------|---------|
| 字号 | `$typography-label-size-extra-small` (10px), `$typography-label-size-main` (12px), `$typography-body-size-main` (14px), `$typography-body-size-extra-large` (16px), `$typography-title-size-extra-large` (24px) |
| 字重 | `$font-weight-regular` (400), `$font-weight-medium` (500), `$font-weight-semibold` (600), `$font-weight-bold` (700) |

### 6.5 其他令牌

| 类别 | 令牌示例 |
|------|---------|
| 透明度 | `$opacity-disabled` (0.4) |

---

## 七、变量映射参考表（旧版 → 新版）

迁移旧版变量时使用此映射表：

### 7.1 颜色映射

| 旧版值 | 新版语义 Token |
|--------|----------------|
| `$-color-theme` | `$primary-6` |
| `$-color-danger` | `$danger-main` |
| `$-color-success` | `$success-main` |
| `$-color-warning` | `$warning-main` |
| `$-color-info` | `$filled-content` |
| `$-color-white` | `$base-white` 或 `$text-white` |
| `$-color-black` | `$base-black` 或 `$text-main` |
| `$-color-content` | `$text-main` |
| `$-color-secondary` | `$text-secondary` |
| `$-color-aid` | `$text-auxiliary` |
| `$-color-tip` | `$text-placeholder` |
| `$-color-bg` | `$filled-bottom` |
| `$-color-border` | `$border-main` |
| `$-color-border-light` | `$border-light` |

### 7.2 字号映射

| 旧版值 | 新版语义 Token |
|--------|----------------|
| `$-fs-big` (24px) | `$typography-title-size-extra-large` |
| `$-fs-title` (16px) | `$typography-body-size-extra-large` |
| `$-fs-content` (14px) | `$typography-body-size-main` |
| `$-fs-secondary` (12px) | `$typography-label-size-main` |
| `$-fs-aid` (10px) | `$typography-label-size-extra-small` |

### 7.3 字重映射

| 旧版值 | 新版语义 Token |
|--------|----------------|
| `$-fw-medium` (500) | `$font-weight-medium` |
| `400` | `$font-weight-regular` |
| `700` | `$font-weight-semibold` |

### 7.4 间距映射

| 旧版值 | 新版语义 Token |
|--------|----------------|
| `$-size-side-padding` (15px) | `$padding-loose` (12px) 或 `$padding-extra-loose` (16px) |
| 具体像素值 (如 `16px`) | 对应的 `$n{数字}` (如 `$n-16`) |

---

## 八、组件变量组织结构

每个组件的 SCSS 变量应按以下顺序组织：

```scss
// ============================================================
// {组件名} 组件变量
// ============================================================

// 1. 基础样式变量（无变体）
$button-radius: var(--wot-button-radius, $radius-main) !default;
$button-border-width: var(--wot-button-border-width, 1px) !default;

// 2. 颜色变量 - 按类型分组
// 2.1 Primary
$button-primary-bg: var(--wot-button-primary-bg, $primary-6) !default;
$button-primary-bg-active: var(--wot-button-primary-bg-active, $primary-7) !default;
$button-primary-text: var(--wot-button-primary-text, $filled-oppo) !default;

// 2.2 Success
$button-success-bg: var(--wot-button-success-bg, $success-main) !default;

// 2.3 Plain 样式
$button-primary-plain-bg: var(--wot-button-primary-plain-bg, transparent) !default;
$button-primary-plain-border: var(--wot-button-primary-plain-border, $primary-6) !default;

// 3. 尺寸变量 - 按尺寸分组
// 3.1 Mini
$button-font-size-mini: var(--wot-button-font-size-mini, $n-12) !default;
$button-height-mini: var(--wot-button-height-mini, $n-24) !default;

// 3.2 Small
$button-font-size-small: var(--wot-button-font-size-small, $n-14) !default;
$button-height-small: var(--wot-button-height-small, $n-32) !default;

// 4. 状态变量
$button-opacity-disabled: var(--wot-button-opacity-disabled, 0.6) !default;
$button-opacity-loading: var(--wot-button-opacity-loading, 0.6) !default;
```

---

## 九、注意事项

1. **变量命名顺序**：
   - **有元素**：`组件名 → 元素 → 属性 → 变体 → 状态`
   - **无元素**：`组件名 → 变体 → 属性 → 状态`（变体在属性前，便于分组）

2. **避免过度嵌套**：变量名层级不超过 5 层
   ```scss
   // ✅ 适中
   $button-primary-bg-active
   $button-primary-plain-border-hover
   
   // ❌ 过长
   $button-primary-plain-text-color-hover-disabled
   ```

3. **保持一致性**：同一组件内相同类型的变量使用统一的命名模式

---

## 十、检查清单

审计或迁移时，确保以下事项：

- [ ] 移除变量名前的 `-` 前缀（如 `$-button-bg` → `$button-bg`）
- [ ] CSS 变量使用 `--wot-` 前缀
- [ ] 统一背景色使用 `-bg` 后缀
- [ ] 统一文字色使用 `-color` 后缀
- [ ] 统一字号使用 `-font-size` 后缀
- [ ] 确保所有变量引用语义令牌而非硬编码值
- [ ] 确保所有变量添加 `!default` 标识
- [ ] 命名顺序正确（无元素：变体在属性前；有元素：元素在属性前）