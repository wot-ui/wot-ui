# 定制主题

`V2` 版本，组件主题系统基于 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) 构建，通过覆盖这些 CSS 变量，可以实现定制主题、动态切换主题、局部定制和组件级覆盖等功能。

## 主题变量
`Design Token` 是设计上承载设计决策的最小实体 ，也就是主题变量，我们的 `Design Token` 采用三层架构：基础变量、语义变量和组件变量，通过修改 `Design Token` 可以实现不同的组件样式。在这里 [theme](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme) 你可以看到组件库的全部 `Design Token`。

### 基础变量

基础变量是纯粹的视觉常量，无业务语义，如：
```css
--wot-blue-6: #1C64FDFF;
```

### 语义变量
语义变量是赋予设计决策业务含义的变量，它将基础变量与具体的业务场景做出了映射，如：
```css
--wot-primary-6: var(--wot-blue-6);
```

### 组件变量
组件变量是 `Design Token` 三层架构的最顶层，直接关联具体的 UI 组件属性，通过引用语义变量，将设计决策映射到具体组件的特定部位（如背景色、文本色、边框、图标等），从而实现组件样式的封装与管理，如：
```css
--wot-button-primary-bg: var(--wot-primary-6);
```

## 全局自定义
当你希望整个应用都使用同一品牌视觉时，推荐通过全局覆盖 [语义变量](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme/light.scss) 来实现，如果你要实现完整主题的定制，建议使用 [预设主题](#预设主题)。

```scss
/* App.vue */
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

## 局部自定义
当你只希望主题在某个页面、某个模块或某个组件树内生效时，推荐使用 [ConfigProvider](/component/config-provider)。

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import type { ConfigProviderThemeVars } from '@wot-ui/ui'

const themeVars = reactive<ConfigProviderThemeVars>({
  primary6: '#07c160',
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <wd-button type="primary">提交</wd-button>
  </wd-config-provider>
</template>
```

### 组件级局部覆盖

如果你只想调整某个具体组件，也可以直接在类名作用域下覆盖组件变量：

```css
.marketing-banner {
  --wot-button-primary-bg: #7c3aed;
  --wot-button-primary-color: #ffffff;
}
```

## 预设主题

如果你需要维护多套可复用主题，例如品牌 A、品牌 B，又或者想要动态切换主题，建议使用独立的 SCSS 主题文件来组织。

当前我们在 [src/theme/presets.scss](https://github.com/wot-ui/wot-ui/tree/main/src/theme/presets.scss) 中提供了多个主题的示例，包含 `shadcn`、`cartoon`、`illustration`、`nutui`、`vant`、`tdesign` 等主题。
::: code-group
```scss [css]
/* src/theme/brand-a.scss */
@mixin brand-a-theme-vars {
  --wot-primary-1: #e8f3ff;
  --wot-primary-2: #c7e0ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;

  --wot-text-main: #1d1f29;
  --wot-text-secondary: #4e5369;
  --wot-border-main: #e5e6eb;
  --wot-filled-bottom: #f7f8fa;
}

.wot-theme-brand-a,
.wot-theme-brand-a .wd-root-portal {
  @include brand-a-theme-vars();
}
```

```scss [App.vue]
/* App.vue */
<!-- 在入口文件引入主题变量 -->
@use './uni_modules/wot-ui/styles/theme/index.scss' as *;
@use './theme/brand-a.scss' as *;
```
```html [config-provider]
<!-- 在 `config-provider` 中配置主题变量 -->
<template>
  <wd-config-provider theme="brand-a">
    <wd-button type="primary">提交</wd-button>
  </wd-config-provider>
</template>
```
:::

### Skills
如果你是 `vibe coding` 用户，我们也提供了 [Skills](https://github.com/wot-ui/wot-ui/tree/main/.agents/skills/generate-theme) 用于帮助开发者生成自定义主题，欢迎使用。


## 相关文档

- [ConfigProvider 全局配置](/component/config-provider)
- [useConfigProvider](/component/use-config-provider)

