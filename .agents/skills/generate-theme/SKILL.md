---
name: generate-theme
description: 为 wot-ui 生成单文件主题 SCSS，并在 App.vue 中挂载语义变量。
metadata:
  applyTo: "src/themes/styles/*.scss"
---

# 主题文件生成技能

本技能用于为 wot-ui 生成单个主题文件。目标产物对齐现有的主题风格：在 src/themes/styles 下新增一个 SCSS 文件，主题文件内同时包含 mixin 和挂载选择器，App.vue 只负责 `@use` 引入。

> [!IMPORTANT]
> **产物约束**：只生成一个主题文件，不生成 dark 主题文件，也不要改造为 light/dark 双文件结构。
>
> **写法约束**：主题文件中的语义变量 value 直接填写固定色值，如 `#1677FFFF`、`#00000014`、`transparent`。不要继续写成 `var(--wot-xxx)`。

---

## 一、目标结构

新增主题时，目标结构如下：

```scss
src/
├── App.vue
└── themes/
    └── styles/
        └── {主题名}.scss
```

其中：

1. src/themes/styles/{主题名}.scss：包含一个 `@mixin {主题名}-theme-vars`，并在文件内完成挂载
2. src/App.vue：只需要通过 `@use './themes/styles/{主题名}.scss' as {主题名};` 引入主题文件
3. 不新增 `dark.scss`、不修改 `uni_modules/wot-ui/styles/theme/index.scss`

---

## 二、参考实现

以现有 antd 主题为标准，生成结果应接近下面这种结构：

```scss
@mixin antd-theme-vars {
  /* Ant Design inspired light semantic tokens */
  /* Primary */
  --wot-primary-1: #E6F4FFFF;
  --wot-primary-2: #BAE0FFFF;
  // ...
  --wot-primary-10: #001D66FF;

  /* Danger */
  --wot-danger-main: #F14646FF;
  // ...

  /* Text */
  --wot-text-main: #1D1F29FF;
  // ...
}

page,
.wot-theme-ant,
.wot-theme-ant .wd-root-portal {
  @include antd-theme-vars();
}
```

App.vue 中只需要引入主题文件：

```scss
@use './themes/styles/{主题名}.scss' as {主题名};
```

注意：挂载选择器应直接写在 `{主题名}.scss` 内，App.vue 不再重复写 `page, .wot-theme-{主题名}` 这一段。

---

## 三、语义变量完整清单

主题文件必须包含以下所有语义变量。缺少任何一个都可能导致组件样式不完整。

### 3.1 主色（Primary）

```scss
--wot-primary-1: #F5F8FFFF;
--wot-primary-2: #E5EDFFFF;
--wot-primary-3: #B8CFFFFF;
--wot-primary-4: #7CA4FFFF;
--wot-primary-5: #4480FFFF;
--wot-primary-6: #1C64FDFF;
--wot-primary-7: #164ED1FF;
--wot-primary-8: #1341ADFF;
--wot-primary-9: #0F3285FF;
--wot-primary-10: #0A235CFF;
```

### 3.2 功能色（Danger / Success / Warning）

```scss
--wot-danger-main: #F14646FF;
--wot-danger-hover: #FB7C7CFF;
--wot-danger-clicked: #DC2C2CFF;
--wot-danger-disabled: #FFC9C9FF;
--wot-danger-particular: #FFE3E3FF;
--wot-danger-surface: #FFF5F5FF;

--wot-success-main: #12B886FF;
--wot-success-hover: #59CDAAFF;
--wot-success-clicked: #0F956CFF;
--wot-success-disabled: #B8EADBFF;
--wot-success-particular: #E7F8F3FF;
--wot-success-surface: #F3FBF9FF;

--wot-warning-main: #F57F00FF;
--wot-warning-hover: #FFA94DFF;
--wot-warning-clicked: #D05706FF;
--wot-warning-disabled: #FFD8A8FF;
--wot-warning-particular: #FFE8CCFF;
--wot-warning-surface: #FFF6EBFF;
```

### 3.3 文字（Text）

```scss
--wot-text-main: #1D1F29FF;
--wot-text-secondary: #4E5369FF;
--wot-text-auxiliary: #868A9CFF;
--wot-text-disabled: #C9CBD4FF;
--wot-text-placeholder: #A9ACB8FF;
--wot-text-white: #FFFFFFFF;
```

### 3.4 图标（Icon）

```scss
--wot-icon-main: #1D1F29FF;
--wot-icon-secondary: #4E5369FF;
--wot-icon-auxiliary: #868A9CFF;
--wot-icon-disabled: #C9CBD4FF;
--wot-icon-placeholder: #A9ACB8FF;
--wot-icon-white: #FFFFFFFF;
```

### 3.5 边框（Border）

```scss
--wot-border-extra-strong: #868A9CFF;
--wot-border-strong: #C9CBD4FF;
--wot-border-main: #E5E6EBFF;
--wot-border-light: #F2F3F5FF;
--wot-border-white: #FFFFFFFF;
--wot-border-zero: transparent;
```

### 3.6 填充（Filled）

```scss
--wot-filled-extra-strong: #C9CBD4FF;
--wot-filled-strong: #E5E6EBFF;
--wot-filled-content: #F2F3F5FF;
--wot-filled-bottom: #F7F8FAFF;
--wot-filled-oppo: #FFFFFFFF;
--wot-filled-zero: transparent;
```

### 3.7 分割线（Divider）

```scss
--wot-divider-main: #00000014;
--wot-divider-light: #0000000A;
--wot-divider-strong: #00000026;
--wot-divider-white: #FFFFFFFF;
```

### 3.8 反馈（Feedback）

```scss
--wot-feedback-hover: #0000000A;
--wot-feedback-active: #00000014;
--wot-feedback-accent: #1C64FD14;
```

### 3.9 透明填充（Opacfilled）

```scss
--wot-opacfilled-tooltip-toast-cover: #000000BF;
--wot-opacfilled-main-cover: #0000008C;
--wot-opacfilled-light-cover: #0000004D;
```

### 3.10 Picker View 遮罩

```scss
--wot-picker-view-mask-start-color: #FFFFFFD9;
--wot-picker-view-mask-end-color: #FFFFFF33;
```

### 3.11 分类色（Classify Application）

```scss
--wot-classifyapplication-yellow-background: #FFFAF1FF;
--wot-classifyapplication-yellow-border: #FDD78CFF;
--wot-classifyapplication-yellow-content: #FAAD14FF;
--wot-classifyapplication-Cyan-background: #F4FBFDFF;
--wot-classifyapplication-Cyan-border: #BDEAF1FF;
--wot-classifyapplication-Cyan-content: #22B8CFFF;
--wot-classifyapplication-Purple-background: #F9F8FFFF;
--wot-classifyapplication-Purple-border: #D0BFFFFF;
--wot-classifyapplication-Purple-content: #8059F3FF;
--wot-classifyapplication-Grape-background: #FBF6FDFF;
--wot-classifyapplication-Grape-border: #EEBEFAFF;
--wot-classifyapplication-Grape-content: #AE3EC9FF;
--wot-classifyapplication-Pink-background: #FFF0F6FF;
--wot-classifyapplication-Pink-border: #FCC2D7FF;
--wot-classifyapplication-Pink-content: #FF357CFF;
```

---

## 四、生成步骤

### 步骤 1：确定主题需求

生成前需要确认：

1. 主题名称，例如 `antd`、`ocean`、`forest`
2. 主题风格描述，例如品牌化、偏中性、偏高对比
3. 主色 10 阶是否全部自定义
4. danger、success、warning 是否沿用默认值
5. 文本、边框、填充、反馈态是否需要整体调性调整

### 步骤 2：生成主题文件

创建 src/themes/styles/{主题名}.scss，格式如下：

```scss
@mixin {主题名}-theme-vars {
  /* {主题描述} semantic tokens */
  /* Primary */
  --wot-primary-1: #E6F4FFFF;
  --wot-primary-2: #BAE0FFFF;
  // ...

  /* Danger */
  --wot-danger-main: #F14646FF;
  // ...

  /* Text */
  --wot-text-main: #1D1F29FF;
  // ...
}

page,
.wot-theme-{主题名},
.wot-theme-{主题名} .wd-root-portal {
  @include {主题名}-theme-vars();
}
```

要求：

1. 只保留一个 mixin
2. mixin 名为 `{主题名}-theme-vars`
3. 所有值都使用固定色值
4. 在同一个文件里完成 `page`、`.wot-theme-{主题名}`、`.wot-theme-{主题名} .wd-root-portal` 的挂载
5. 注释风格尽量与 antd.scss 保持一致

### 步骤 3：接入 App.vue

在 src/App.vue 的 `<style lang="scss">` 中新增：

```scss
@use './themes/styles/{主题名}.scss' as {主题名};
```

如果项目里已经有其他主题样式，不要破坏原有 `@use` 顺序和已有主题块，只追加当前主题的 `@use`。

### 步骤 4：验证

生成后检查：

- [ ] 主题文件位于 src/themes/styles/{主题名}.scss
- [ ] 文件包含一个 `@mixin {主题名}-theme-vars`，并在文件内完成挂载
- [ ] 所有 3.1 到 3.11 的语义变量都已包含
- [ ] 所有 value 都是固定色值或 `transparent`
- [ ] 主题文件中已通过 `.wot-theme-{主题名}` 和 `.wot-theme-{主题名} .wd-root-portal` 正确挂载
- [ ] App.vue 中只保留 `@use './themes/styles/{主题名}.scss' as {主题名};`
- [ ] 主题文件中的 mixin 调用形式为 `@include {主题名}-theme-vars();`

---

## 五、完整模板

```scss
@mixin {主题名}-theme-vars {
  /* {主题描述} semantic tokens */
  /* Primary */
  --wot-primary-1: #F5F8FFFF;
  --wot-primary-2: #E5EDFFFF;
  --wot-primary-3: #B8CFFFFF;
  --wot-primary-4: #7CA4FFFF;
  --wot-primary-5: #4480FFFF;
  --wot-primary-6: #1C64FDFF;
  --wot-primary-7: #164ED1FF;
  --wot-primary-8: #1341ADFF;
  --wot-primary-9: #0F3285FF;
  --wot-primary-10: #0A235CFF;

  /* Danger */
  --wot-danger-main: #F14646FF;
  --wot-danger-hover: #FB7C7CFF;
  --wot-danger-clicked: #DC2C2CFF;
  --wot-danger-disabled: #FFC9C9FF;
  --wot-danger-particular: #FFE3E3FF;
  --wot-danger-surface: #FFF5F5FF;

  /* Success */
  --wot-success-main: #12B886FF;
  --wot-success-hover: #59CDAAFF;
  --wot-success-clicked: #0F956CFF;
  --wot-success-disabled: #B8EADBFF;
  --wot-success-particular: #E7F8F3FF;
  --wot-success-surface: #F3FBF9FF;

  /* Warning */
  --wot-warning-main: #F57F00FF;
  --wot-warning-hover: #FFA94DFF;
  --wot-warning-clicked: #D05706FF;
  --wot-warning-disabled: #FFD8A8FF;
  --wot-warning-particular: #FFE8CCFF;
  --wot-warning-surface: #FFF6EBFF;

  /* Text */
  --wot-text-main: #1D1F29FF;
  --wot-text-secondary: #4E5369FF;
  --wot-text-auxiliary: #868A9CFF;
  --wot-text-disabled: #C9CBD4FF;
  --wot-text-placeholder: #A9ACB8FF;
  --wot-text-white: #FFFFFFFF;

  /* Icon */
  --wot-icon-main: #1D1F29FF;
  --wot-icon-secondary: #4E5369FF;
  --wot-icon-auxiliary: #868A9CFF;
  --wot-icon-disabled: #C9CBD4FF;
  --wot-icon-placeholder: #A9ACB8FF;
  --wot-icon-white: #FFFFFFFF;

  /* Border */
  --wot-border-extra-strong: #868A9CFF;
  --wot-border-strong: #C9CBD4FF;
  --wot-border-main: #E5E6EBFF;
  --wot-border-light: #F2F3F5FF;
  --wot-border-white: #FFFFFFFF;
  --wot-border-zero: transparent;

  /* Filled */
  --wot-filled-extra-strong: #C9CBD4FF;
  --wot-filled-strong: #E5E6EBFF;
  --wot-filled-content: #F2F3F5FF;
  --wot-filled-bottom: #F7F8FAFF;
  --wot-filled-oppo: #FFFFFFFF;
  --wot-filled-zero: transparent;

  /* Divider */
  --wot-divider-main: #00000014;
  --wot-divider-light: #0000000A;
  --wot-divider-strong: #00000026;
  --wot-divider-white: #FFFFFFFF;

  /* Feedback */
  --wot-feedback-hover: #0000000A;
  --wot-feedback-active: #00000014;
  --wot-feedback-accent: #1C64FD14;

  /* Opacity filled */
  --wot-opacfilled-tooltip-toast-cover: #000000BF;
  --wot-opacfilled-main-cover: #0000008C;
  --wot-opacfilled-light-cover: #0000004D;

  /* Picker view mask */
  --wot-picker-view-mask-start-color: #FFFFFFD9;
  --wot-picker-view-mask-end-color: #FFFFFF33;

  /* Classify application */
  --wot-classifyapplication-yellow-background: #FFFAF1FF;
  --wot-classifyapplication-yellow-border: #FDD78CFF;
  --wot-classifyapplication-yellow-content: #FAAD14FF;
  --wot-classifyapplication-Cyan-background: #F4FBFDFF;
  --wot-classifyapplication-Cyan-border: #BDEAF1FF;
  --wot-classifyapplication-Cyan-content: #22B8CFFF;
  --wot-classifyapplication-Purple-background: #F9F8FFFF;
  --wot-classifyapplication-Purple-border: #D0BFFFFF;
  --wot-classifyapplication-Purple-content: #8059F3FF;
  --wot-classifyapplication-Grape-background: #FBF6FDFF;
  --wot-classifyapplication-Grape-border: #EEBEFAFF;
  --wot-classifyapplication-Grape-content: #AE3EC9FF;
  --wot-classifyapplication-Pink-background: #FFF0F6FF;
  --wot-classifyapplication-Pink-border: #FCC2D7FF;
  --wot-classifyapplication-Pink-content: #FF357CFF;
}

page,
.wot-theme-{主题名},
.wot-theme-{主题名} .wd-root-portal {
  @include {主题名}-theme-vars();
}
```

---

## 六、注意事项

1. 不要生成 dark 主题文件
2. 不要要求修改 uni_modules 内置的 theme/index.scss
3. 默认优先把挂载逻辑收进主题文件，保持 App.vue 只负责引入
4. 只有在用户明确要求时，才同时帮他把 App.vue 一并接好
