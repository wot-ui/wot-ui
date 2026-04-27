# Custom Theme

In `V2` version, the component theme system is built based on [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties). By overriding these CSS variables, you can achieve theme customization, dynamic theme switching, local customization, and component-level overrides.

## Theme Variables
`Design Token` is the smallest entity in design that carries design decisions, which is the theme variable. Our `Design Token` adopts a three-layer architecture: basic variables, semantic variables, and component variables. By modifying `Design Token`, different component styles can be achieved. Here [theme](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme) you can see all `Design Tokens` of the component library.

### Basic Variables

Basic variables are pure visual constants with no business semantics, such as:
```css
--wot-blue-6: #1C64FDFF;
```

### Semantic Variables
Semantic variables are variables that give design decisions business meaning. They map basic variables to specific business scenarios, such as:
```css
--wot-primary-6: var(--wot-blue-6);
```

### Component Variables
Component variables are the top layer of the `Design Token` three-layer architecture, directly associated with specific UI component attributes. By referencing semantic variables, design decisions are mapped to specific parts of components (such as background color, text color, borders, icons, etc.), thereby achieving encapsulation and management of component styles, such as:
```css
--wot-button-primary-bg: var(--wot-primary-6);
```

## Global Customization
When you want the entire application to use the same brand visual, it is recommended to achieve this through global coverage of [semantic variables](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme/light.scss). If you want to implement complete theme customization, it is recommended to use [preset themes](#preset-themes).

```scss
/* App.vue */
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

## Local Customization
When you only want the theme to take effect within a certain page, module, or component tree, it is recommended to use [ConfigProvider](/component/config-provider).

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
    <wd-button type="primary">Submit</wd-button>
  </wd-config-provider>
</template>
```

### Component-level Local Override

If you only want to adjust a specific component, you can also directly override component variables under the class name scope:

```css
.marketing-banner {
  --wot-button-primary-bg: #7c3aed;
  --wot-button-primary-color: #ffffff;
}
```

## Preset Themes

If you need to maintain multiple reusable themes, such as Brand A, Brand B, or want to dynamically switch themes, it is recommended to organize them using independent SCSS theme files.

Currently, we provide examples of multiple themes in [src/theme/presets.scss](https://github.com/wot-ui/wot-ui/tree/main/src/theme/presets.scss), including `shadcn`, `cartoon`, `illustration`, `nutui`, `vant`, `tdesign` and other themes.
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

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
@use './theme/brand-a.scss' as *;
```
```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
@use './theme/brand-a.scss' as *;
```
```html [config-provider]
<!-- Configure theme variables in `config-provider` -->
<template>
  <wd-config-provider theme="brand-a">
    <wd-button type="primary">Submit</wd-button>
  </wd-config-provider>
</template>
```
:::

### Skills
If you are a `vibe coding` user, we also provide [Skills](https://github.com/wot-ui/wot-ui/tree/main/.agents/skills/generate-theme) to help developers generate custom themes, welcome to use.


## Related Documentation

- [ConfigProvider Global Configuration](/component/config-provider)
- [useConfigProvider](/component/use-config-provider)
