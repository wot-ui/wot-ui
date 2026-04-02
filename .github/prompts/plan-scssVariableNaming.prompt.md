# wot-ui 组件 SCSS 变量命名规范

---

## 一、设计令牌架构

采用三层设计令牌架构，由底层到上层逐级引用：

| 层级 | 名称 | 说明 | 示例 |
|------|------|------|------|
| L1 | 基础令牌 (Base Tokens) | 原始色值、数值，无语义 | `--wot-blue-6`, `--wot-n-16` |
| L2 | 语义令牌 (Semantic Tokens) | 具有语义的通用变量 | `$primary-6`, `$text-main`, `$padding-main` |
| L3 | 组件令牌 (Component Tokens) | 组件级别的专属变量 | `$button-primary-bg` |

---

## 二、命名格式规范

### 2.1 CSS 变量命名格式

**有元素时：**
```
--wot-{组件名}-{元素}-{属性}-{变体}-{状态}
```

**无元素时（通用属性）：**
```
--wot-{组件名}-{变体}-{属性}-{状态}
```

- **组件名**：小写，多词用 `-` 连接，如 `button`、`date-picker`
- **元素**：可选，组件内部元素名，如 `title`、`icon`、`arrow`
- **属性**：见下方关键词表，如 `color`、`bg`、`font-size`、`height`
- **变体**：可选，类型或尺寸变体，如 `primary`、`small`；**颜色相关属性时变体在属性前**
- **状态**：可选，交互状态，如 `hover`、`active`、`disabled`

### 2.2 SCSS 变量命名格式

**有元素时：**
```scss
$组件名-元素-属性-变体-状态: var(--wot-组件名-元素-属性-变体-状态, $语义令牌) !default;
```

**无元素时（按类型/尺寸分组的属性）：**
```scss
$组件名-变体-属性-状态: var(--wot-组件名-变体-属性-状态, $语义令牌) !default;
```

**示例：**
```scss
// ✅ 正确 - 有元素（元素-属性-变体-状态）
$cell-title-color: var(--wot-cell-title-color, $text-main) !default;
$cell-title-font-size: var(--wot-cell-title-font-size, $n-16) !default;
$input-border-color-focus: var(--wot-input-border-color-focus, $primary-6) !default;

// ✅ 正确 - 无元素，按类型分组（变体-属性-状态）
$button-primary-bg: var(--wot-button-primary-bg, $primary-6) !default;
$button-primary-bg-active: var(--wot-button-primary-bg-active, $primary-7) !default;
$button-primary-text: var(--wot-button-primary-text, $filled-oppo) !default;
$button-success-bg: var(--wot-button-success-bg, $success-main) !default;
$button-danger-bg: var(--wot-button-danger-bg, $danger-main) !default;

// ✅ 正确 - 无元素，按尺寸分组
$button-height-small: var(--wot-button-height-small, $n-32) !default;
$button-font-size-small: var(--wot-button-font-size-small, $n-14) !default;

// ✅ 正确 - 无元素无变体
$input-bg: var(--wot-input-bg, $filled-oppo) !default;
$button-radius: var(--wot-button-radius, $radius-main) !default;

// ❌ 错误 - 不要使用前缀 `-`
$-button-bg: ...;

// ❌ 错误 - 元素和属性顺序错误
$cell-color-title: ...;  // 应该是 $cell-title-color

// ❌ 错误 - 多余的 color- 前缀
$button-color-primary-bg: ...;  // 应该是 $button-primary-bg
```

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
| `size` | 尺寸 | 宽高、图标大小等 | `$cell-size-arrow` |
| `width` | 宽度 | 固定宽度 | `$popup-width` |
| `height` | 高度 | 固定高度 | `$badge-height` |
| `padding` | 内边距 | 内边距 | `$cell-padding` |
| `margin` | 外边距 | 外边距 | `$cell-margin-horizontal` |
| `spacing` | 间距 | 元素之间的间距 | `$cell-spacing-icon` |
| `radius` | 圆角 | 圆角半径 | `$button-radius` |
| `shadow` | 阴影 | 盒阴影 | `$popup-shadow` |
| `z-index` | 层级 (z-index) | 堆叠层级 | `$popup-z-index` |
| `transition-duration` | 过渡时长 | 动画/过渡时长 | `$button-transition-duration` |
| `opacity` | 透明度 | 透明度 | `$disabled-opacity` |

---

## 四、状态与变体命名

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

---

## 五、组件变量组织结构

每个组件的 SCSS 变量应按以下顺序组织：

```scss
// ============================================================
// Button 组件变量
// ============================================================

// 1. 基础样式变量
$button-radius: var(--wot-button-radius, $radius-main) !default;
$button-border-width: var(--wot-button-border-width, 1px) !default;

// 2. 颜色变量 - 按类型分组
// 2.1 Primary
$button-primary-bg: var(--wot-button-primary-bg, $primary-6) !default;
$button-primary-bg-active: var(--wot-button-primary-bg-active, $primary-7) !default;
$button-primary-bg-disabled: var(--wot-button-primary-bg-disabled, $primary-3) !default;
$button-primary-text: var(--wot-button-primary-text, $filled-oppo) !default;

// 2.2 Success
$button-success-bg: var(--wot-button-success-bg, $success-main) !default;
$button-success-bg-active: var(--wot-button-success-bg-active, $success-clicked) !default;

// 2.3 Plain 样式
$button-primary-plain-bg: var(--wot-button-primary-plain-bg, transparent) !default;
$button-primary-plain-border: var(--wot-button-primary-plain-border, $primary-6) !default;

// 3. 尺寸变量 - 按尺寸分组
// 3.1 Mini
$button-font-size-mini: var(--wot-button-font-size-mini, $n-12) !default;
$button-height-mini: var(--wot-button-height-mini, $n-24) !default;
$button-padding-mini: var(--wot-button-padding-mini, $padding-tight $padding-main) !default;

// 3.2 Small
$button-font-size-small: var(--wot-button-font-size-small, $n-14) !default;
$button-height-small: var(--wot-button-height-small, $n-32) !default;
$button-padding-small: var(--wot-button-padding-small, $padding-main $padding-loose) !default;

// 4. 状态变量
$button-opacity-disabled: var(--wot-button-opacity-disabled, 0.6) !default;
$button-opacity-loading: var(--wot-button-opacity-loading, 0.6) !default;
```

---

## 六、命名示例对照表

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

## 七、语义令牌引用规范

组件变量的默认值应优先引用语义令牌，而非硬编码值：

```scss
// ✅ 正确 - 引用语义令牌
$button-primary-bg: var(--wot-button-primary-bg, $primary-6) !default;
$input-color: var(--wot-input-color, $text-main) !default;
$cell-padding: var(--wot-cell-padding, $padding-loose) !default;

// ❌ 错误 - 硬编码值
$button-primary-bg: var(--wot-button-primary-bg, #1c64fd) !default;
$input-color: var(--wot-input-color, #333333) !default;
$cell-padding: var(--wot-cell-padding, 16px) !default;
```

**语义令牌分类：**

| 类别 | 令牌示例 |
|------|---------|
| 主色 | `$primary-1` ~ `$primary-10` |
| 功能色 | `$danger-main`, `$success-main`, `$warning-main` |
| 文字色 | `$text-main`, `$text-secondary`, `$text-auxiliary`, `$text-disabled`, `$text-placeholder` |
| 图标色 | `$icon-main`, `$icon-secondary`, `$icon-disabled` |
| 边框色 | `$border-main`, `$border-light`, `$border-strong` |
| 填充色 | `$filled-oppo`, `$filled-bottom`, `$filled-content` |
| 间距 | `$padding-tight`, `$padding-main`, `$padding-loose` |
| 圆角 | `$radius-small`, `$radius-main`, `$radius-large`, `$radius-full` |
| 数值 | `$n-12`, `$n-14`, `$n-16`, `$n-20` ... |

---

## 八、注意事项

1. **所有组件变量必须添加 `!default`**，允许用户覆盖。

2. **变量命名顺序**：
   - **有元素**：`组件名 → 元素 → 属性 → 变体 → 状态`
   - **无元素**：`组件名 → 变体 → 属性 → 状态`（变体在属性前，便于分组）

3. **颜色相关属性的变体位置**：
   ```scss
   // ✅ 变体在属性前（便于按类型分组）
   $button-primary-bg
   $button-primary-text
   $button-success-bg
   
   // ❌ 变体在属性后
   $button-bg-primary
   ```

4. **复合属性使用方向后缀**：
   ```scss
   $cell-padding-horizontal: ...;  // 水平内边距
   $cell-padding-vertical: ...;    // 垂直内边距
   $cell-margin-top: ...;          // 上外边距
   $cell-icon-spacing-right: ...;  // 图标右侧间距
   ```

5. **避免过度嵌套**：变量名层级不超过 5 层。
   ```scss
   // ✅ 适中
   $button-primary-bg-active
   $button-primary-plain-border-hover
   
   // ❌ 过长
   $button-primary-plain-text-color-hover-disabled
   ```

6. **保持一致性**：同一组件内相同类型的变量使用统一的命名模式。

---

## 九、迁移检查清单

对于现有变量，请检查并统一以下问题：

- [ ] 移除变量名前的 `-` 前缀（如 `$-button-bg` → `$button-bg`）
- [ ] 统一背景色使用 `-bg` 后缀
- [ ] 统一文字色使用 `-color` 后缀
- [ ] 统一字号使用 `-font-size` 后缀
- [ ] 确保所有变量引用语义令牌而非硬编码值
- [ ] 确保所有变量添加 `!default` 标识

---

如需要，我可以进一步细化某个部分或帮你检查现有组件的变量命名一致性。