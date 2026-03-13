---
name: generate-scss-variables
description: 为新组件或新特性快速生成符合设计系统规范的 SCSS 变量定义代码，或检查现有变量是否合规。
applyTo: "**/*.scss"
---

# SCSS 变量生成与检查技能

本技能旨在帮助开发者：
1.  为**新组件**或**现有组件的新属性**快速生成标准化的 component-level SCSS 变量定义。
2.  **检查**现有组件的 SCSS 变量是否符合设计系统规范。

> [!IMPORTANT]
> **职责区分**：
> *   如果你正在将旧版 SCSS 变量（如 `$-navbar-height`）迁移到新版系统，请使用 `migrate-scss-design-system` 技能。
> *   本技能用于**从零生成**新的变量定义代码，或**审计**现有代码。

> [!NOTE]
> **规范参考**：本技能遵循 `@rules/scss-variable-naming.rule.md` 中定义的完整命名规范，包括属性关键词表、状态/变体后缀、语义令牌参考表等。

---

## 核心规范速查

### 概念定义

*   **元素 (Element)**：组件内部的子部件，如 `title`、`icon`、`dot`、`arrow`、`desc` 等。
*   **变体 (Variant)**：类型或尺寸的变化，如 `primary`、`success`、`small`、`large` 等。

### 命名格式

```scss
// 无元素时（变体在属性前）
$组件名-变体-属性-状态: var(--wot-组件名-变体-属性-状态, $语义令牌) !default;

// 有元素时（元素在属性前）
$组件名-元素-属性-变体-状态: var(--wot-组件名-元素-属性-变体-状态, $语义令牌) !default;
```

### 检查点 (Checkpoints)

1.  **[命名层级] Structure**:
    *   **无元素时**: 变体(Variant) 必须在 属性(Attribute) **之前**。
        *   ❌ `$button-bg-primary`
        *   ✅ `$button-primary-bg` (primary 是变体，bg 是属性)
    *   **有元素时**: 元素(Element) 必须在 属性(Attribute) **之前**。
        *   ❌ `$cell-color-title`
        *   ✅ `$cell-title-color` (title 是元素，color 是属性)
2.  **[CSS变量] CSS Var**: 内部必须使用 CSS 变量，CSS 变量名与 SCSS 变量名保持结构一致（`--wot` 前缀）。
    *   ❌ `var(--button-color)`
    *   ✅ `var(--wot-button-color)`
3.  **[语义化] Fallback**: CSS 变量的默认值必须优先使用**语义化 Token**（详见 `@rules/scss-variable-naming.rule.md` 第六节）。
    *   ❌ `16px`, `#fff` (除非是特定的魔术值)
    *   ✅ `$n16`, `$base-white`
4.  **[默认值] Default**: 必须包含 `!default` 标记，以便用户覆盖。
5.  **[全称属性] Full Name**: 禁止使用缩写，必须使用 CSS 属性全称。
    *   ❌ `fs`, `bg`, `lh`
    *   ✅ `font-size`, `background` (或 `bg` 作为后缀特例，但属性名尽量全称，参考 rule 文件), `line-height`
    *   *注：`bg` 在变量后缀中作为 `background` 的通用简写是允许的（如 `$button-bg`），但在涉及具体 CSS 属性映射时，应优先对照 `scss-variable-naming.rule.md` 的关键词表。对于 `font-size`，严禁使用 `fs`。*

## 模式一：代码生成 (Generation)

### 使用指南
请提供：
1.  **组件名称** (如 `card`)
2.  **属性列表** 及意图 (如 `背景色：白色`)

### 输出示例
```scss
// 基础变量（无元素无变体）
$search-bg: var(--wot-search-bg, $base-white) !default;
$search-padding: var(--wot-search-padding, $padding-main) !default;

// 有元素时：元素在属性前（icon 是元素，color 是属性）
$search-icon-color: var(--wot-search-icon-color, $text-secondary) !default;
$search-icon-size: var(--wot-search-icon-size, $n16) !default;

// 有变体时：变体在属性前（primary 是变体，bg 是属性）
$search-primary-bg: var(--wot-search-primary-bg, $primary-6) !default;
$search-primary-color: var(--wot-search-primary-color, $base-white) !default;
```

## 模式二：规则检查 (Auditing)

当用户要求“检查变量命名”、“审计 SCSS 规范”时，请执行以下步骤：

1.  **读取文件**：读取组件的 `index.scss` 或相关样式文件。
2.  **逐行扫描**：查找所有以 `$` 开头的变量定义。
3.  **匹配验证**：针对每一行，对比上述【核心规范】。
4.  **输出报告**：
    *   ✅ **通过**：列出符合规范的变量（可折叠）。
    *   ❌ **失败**：列出不符合规范的变量，并说明原因（如“缺少 --wot 前缀”、“使用了硬编码值”）。
    *   🛠 **建议**：给出修正后的代码片段。

### 审计报告示例

> **🔍 SCSS 变量规范检查报告 (Component: `test-comp`)**
>
> ❌ **发现 3 个问题**：
>
> 1.  `$test-comp-height: 100px;`
>     *   🔴 **错误**：未使用 CSS 变量且使用了硬编码值。
>     *   🟢 **建议**：`$test-comp-height: var(--wot-test-comp-height, $n100) !default;` (假设 $n100 存在)
>
> 2.  `$test-comp-color: var(--test-comp-color, $text-main);`
>     *   🔴 **错误**：CSS 变量缺少 `--wot-` 前缀，且缺少 `!default`。
>     *   🟢 **建议**：`$test-comp-color: var(--wot-test-comp-color, $text-main) !default;`
>
> 3.  `$button-bg-primary: ...`
>     *   🔴 **错误**：顺序错误，变体(primary)应在属性(bg)之前。
>     *   🟢 **建议**：`$button-primary-bg: var(--wot-button-primary-bg, $primary-6) !default;`

---

## 任务指令

*   **生成**：根据描述输出 SCSS 代码，参考 `@rules/scss-variable-naming.rule.md` 中的语义令牌表和属性关键词表。
*   **检查**：读取文件 -> 对照 `@rules/scss-variable-naming.rule.md` 验证规范 -> 输出审计报告。
