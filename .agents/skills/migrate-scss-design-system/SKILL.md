---
name: migrate-scss-design-system
description: 将组件的旧版 SCSS 设计系统变量迁移到新版语义化设计系统
applyTo: "**/*.scss"
---

# SCSS 设计系统迁移技能

本技能用于将 wot-ui 组件从旧版 SCSS 变量系统迁移到新版语义化设计系统。

> [!NOTE]
> **规范参考**：本技能遵循 `@rules/scss-variable-naming.rule.md` 中定义的完整命名规范。变量映射表、语义令牌参考表等详见该规则文件。

---

## 新旧系统对比

### 引入方式

| 旧版 | 新版 |
|------|------|
| `@import "./../common/abstracts/_mixin.scss";` | `@use '../styles/mixin/mixin.scss' as *;` |
| `@import "./../common/abstracts/variable.scss";` | `@use '../styles/variable.scss' as *;` |

### 变量命名规范

| 旧版格式 | 新版格式 |
|----------|----------|
| `$-{组件名}-{属性}` | `${组件名}-{属性}` |
| 使用旧版变量文件中的值 | 使用语义化 token |

### 暗黑模式处理

- **旧版**：使用 `.wot-theme-dark` 包裹器显式定义暗黑样式
- **新版**：通过 CSS 变量自动支持主题切换，无需单独包裹器

---

## 迁移步骤

### 1. 更新引入语句

将文件顶部的 `@import` 替换为 `@use`：

```scss
// 旧版
@import "./../common/abstracts/_mixin.scss";
@import "./../common/abstracts/variable.scss";

// 新版
@use '../styles/mixin/mixin.scss' as *;
@use '../styles/variable.scss' as *;
```

---

### 2. 定义组件级 CSS 变量

在文件顶部（引入语句之后）定义组件的 CSS 变量，格式如下：

```scss
// 无元素时（变体在属性前）
$组件名-变体-属性-状态: var(--wot-组件名-变体-属性-状态, $语义令牌) !default;

// 有元素时（元素在属性前）
$组件名-元素-属性-变体-状态: var(--wot-组件名-元素-属性-变体-状态, $语义令牌) !default;
```

**示例**（badge 组件）：

```scss
// 基础变量（无元素无变体）
$badge-height: var(--wot-badge-height, $n16) !default;
$badge-padding: var(--wot-badge-padding, $padding-zero $padding-super-tight) !default;
$badge-color: var(--wot-badge-color, $text-white) !default;

// 有变体时：变体在属性前（danger 是变体，bg 是属性）
$badge-danger-bg: var(--wot-badge-danger-bg, $danger-main) !default;

// 有元素时：元素在属性前（dot 是元素，size 是属性）
$badge-dot-size: var(--wot-badge-dot-size, $n8) !default;
```

---

### 3. 变量映射参考

> [!TIP]
> 完整的变量映射表（颜色、字号、字重、圆角、间距等）请参考 `@rules/scss-variable-naming.rule.md` 第七节"变量映射参考表（旧版 → 新版）"。

常用映射速查：

| 旧版值 | 新版语义 Token |
|--------|----------------|
| `$-color-theme` | `$primary-6` |
| `$-color-danger` | `$danger-main` |
| `$-color-content` | `$text-main` |
| `$-color-secondary` | `$text-secondary` |
| `$-fs-content` (14px) | `$typography-body-size-main` |
| `$-fw-medium` (500) | `$font-weight-medium` |
| `4px` | `$radius-main` |
| `10px` | `$padding-main` |

---

### 4. 删除暗黑模式包裹器

移除 `.wot-theme-dark` 包裹器及其内容，暗黑模式将通过 CSS 变量自动支持：

```scss
// 删除此部分
.wot-theme-dark {
  @include b(组件名) {
    background-color: $-dark-background;
    // ...
  }
}
```

---

### 5. 更新样式中的变量引用

将样式规则中的旧版变量替换为新定义的组件级变量：

```scss
// 旧版
@include b(navbar) {
  height: $-navbar-height;
  background-color: $-navbar-background;
  color: $-navbar-color;
}

// 新版
@include b(navbar) {
  height: $navbar-height;
  background-color: $navbar-bg;
  color: $navbar-color;
}
```

---

## 迁移示例

### 迁移前 (navbar)

```scss
@import "./../common/abstracts/_mixin.scss";
@import "./../common/abstracts/variable.scss";

.wot-theme-dark {
  @include b(navbar) {
    background-color: $-dark-background;
    @include e(title) {
      color: $-dark-color;
    }
  }
}

@include b(navbar) {
  height: $-navbar-height;
  background-color: $-navbar-background;
  color: $-navbar-color;
  font-weight: $-navbar-title-font-weight;
  font-size: $-navbar-title-font-size;
}
```

### 迁移后 (navbar)

```scss
@use '../styles/mixin/mixin.scss' as *;
@use '../styles/variable.scss' as *;

// 组件级 CSS 变量定义
$navbar-height: var(--wot-navbar-height, $n48) !default;
$navbar-bg: var(--wot-navbar-bg, $filled-oppo) !default;
$navbar-color: var(--wot-navbar-color, $text-main) !default;
$navbar-title-font-weight: var(--wot-navbar-title-font-weight, $font-weight-medium) !default;
$navbar-title-font-size: var(--wot-navbar-title-font-size, $typography-body-size-extra-large) !default;
$navbar-disabled-opacity: var(--wot-navbar-disabled-opacity, $opacity-disabled) !default;
$navbar-arrow-size: var(--wot-navbar-arrow-size, $n22) !default;
$navbar-desc-font-size: var(--wot-navbar-desc-font-size, $typography-body-size-main) !default;
$navbar-desc-color: var(--wot-navbar-desc-color, $text-secondary) !default;

@include b(navbar) {
  height: $navbar-height;
  background-color: $navbar-bg;

  @include e(title) {
    color: $navbar-color;
    font-weight: $navbar-title-font-weight;
    font-size: $navbar-title-font-size;
  }

  @include when(disabled) {
    opacity: $navbar-disabled-opacity;
  }
}
```

---

## 检查清单

迁移完成后，确保以下事项（详见 `@rules/scss-variable-naming.rule.md` 第十节）：

- [ ] 文件顶部使用 `@use` 替代 `@import`
- [ ] 所有组件级变量使用 `$组件名-属性` 格式（无 `-` 前缀）
- [ ] **命名顺序检查**：
    - 无元素：`$组件名-变体-属性-状态` (如 `$button-primary-bg`)
    - 有元素：`$组件名-元素-属性-变体-状态` (如 `$cell-title-color`)
- [ ] 所有变量使用 `var(--wot-完整变量名, $语义令牌) !default` 格式
- [ ] 删除 `.wot-theme-dark` 包裹器
- [ ] 样式规则中引用新定义的组件级变量
- [ ] 变量值使用语义化 token 而非硬编码值
- [ ] 添加中文注释说明每个变量的用途
