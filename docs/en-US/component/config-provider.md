# ConfigProvider

Used to provide theme mode and theme variable configuration for `Wot` components, supporting dark mode, theme customization and cross-component tree shared configuration.

## Component Type

### Dark Mode

Set `theme` to `dark` to switch `Wot` components within the current `ConfigProvider` wrapped range to dark style.

::: warning Note
Before using dark mode, you need to import the theme variable file in the entry file (e.g. `App.vue`):

- npm install: `@use '@wot-ui/ui/styles/theme/index.scss' as *;`
- uni_modules install: `@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;`
:::

::: tip Tip
`ConfigProvider` only affects the theme performance of `Wot` components themselves, and will not automatically modify page global text color or background color. You can combine global styles to handle page background and text color yourself.
:::

::: code-group
```vue [vue]
<wd-config-provider theme="dark">
  <wd-button type="primary">Dark Mode Button</wd-button>
</wd-config-provider>
```
```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```
```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```
:::

## Switch Theme

Switch between light and dark mode by responsively updating `theme`.

::: code-group

```vue [vue]
<wd-config-provider :theme="theme">
  <wd-button type="primary">Current Mode: {{ theme }}</wd-button>
</wd-config-provider>
```

```ts [ts]
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

setTimeout(() => {
  theme.value = 'dark'
}, 1000)
```

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```
```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

## Theme Customization

### Override via CSS Variables

`Wot UI` components organize styles through CSS variables. You can directly override these variables to adjust component appearance.

```css
:root,
page {
  --wot-button-primary-bg: green;
}
```

### Override via ConfigProvider

`ConfigProvider` supports overriding theme variables through `theme-vars`, only affecting components within the current wrapped range.

::: tip Tip
`ConfigProvider` only affects its child component styles, and will not directly modify global `root` node styles.
:::

::: code-group

```html [vue]
<wd-config-provider :theme-vars="themeVars">
  <view style="margin: 16px">
    <wd-button round block type="primary">Submit</wd-button>
  </view>
</wd-config-provider>
```

```ts [ts]
import { reactive } from 'vue'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})
```

:::

### Use in TypeScript

When defining `themeVars` in TypeScript, it is recommended to use the `ConfigProviderThemeVars` type provided by the component library for complete type hints.

::: code-group

```ts [ts]
import type { ConfigProviderThemeVars } from '@wot-ui/ui'

const themeVars: ConfigProviderThemeVars = {
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#ffffff'
}
```

```ts [ts]
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-ui/components/wd-config-provider/types'

const localThemeVars: ConfigProviderThemeVars = {
  cellTitleColor: '#4d80f0'
}
```

:::

## Special Style

### Global Sharing

If you need to share theme configuration at the application layer, you can combine with virtual root component [uni-ku-root](https://github.com/uni-ku/root).

#### Install

::: code-group

```bash [npm]
npm i -D @uni-ku/root
```

```bash [yarn]
yarn add -D @uni-ku/root
```

```bash [pnpm]
pnpm add -D @uni-ku/root
```

:::

#### Import

- CLI project: directly edit vite.config.(js|ts) in root directory
- HBuilderX project: need to create vite.config.(js|ts) in root directory

```ts
import { defineConfig } from 'vite'
import UniKuRoot from '@uni-ku/root'
import Uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [UniKuRoot(), Uni()]
})
```

::: tip
If there are plugins that modify pages.json, `UniKuRoot` needs to be placed after these plugins.
:::

#### Use

1. Create root component and handle global configuration component.

```vue
<script setup lang="ts">
import { useTheme } from './composables/useTheme'

const { theme, themeVars } = useTheme({
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#ffffff'
})
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </wd-config-provider>
</template>
```

2. Write composable function to control theme.

```ts
import type { ConfigProviderThemeVars } from '@wot-ui/ui'
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const themeVars = ref<ConfigProviderThemeVars>()

export function useTheme(vars?: ConfigProviderThemeVars) {
  if (vars) themeVars.value = vars

  function toggleTheme(mode?: 'light' | 'dark') {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    themeVars,
    toggleTheme
  }
}
```

3. Use theme mode switching in any page.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">Toggle Theme, Current Mode: {{ theme }}</button>
</template>
```

## Composable Function

### useConfigProvider

Detailed documentation please see [useConfigProvider](/component/use-config-provider).

In WeChat Mini Program and other environments, due to component rendering mechanism limitations, components rendered in slots or moved to root node through `root-portal` may not inherit the outer `ConfigProvider` provide context. To solve this problem, the component library provides `useConfigProvider`, allowing you to explicitly inject configuration at the logic layer.

#### Import

```ts
import { useConfigProvider } from '@wot-ui/ui'
```

#### Use

`useConfigProvider` accepts an object containing `themeVars` and other global config options. `themeVars` supports plain objects, `reactive` objects or `Ref` objects.

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useConfigProvider } from '@wot-ui/ui'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})

useConfigProvider({ themeVars, button: { size: 'small' } })
</script>
```

## Global Component Configuration

`ConfigProvider` supports setting unified defaults for child components, reducing repetitive configuration.

### Scope Overview

Different config keys affect different components. Configure only what you need.

| Config Key | Scope (Components Currently Affected) |
| --- | --- |
| `button.size` | `wd-button` |
| `button.variant` | `wd-button` |
| `button.type` | `wd-button` |
| `button.round` | `wd-button` |
| `tag.size` | `wd-tag` |
| `tag.variant` | `wd-tag` |
| `tag.round` | `wd-tag` |

::: tip Note
Components not listed above (e.g., `wd-input`, `wd-avatar`) are **not** affected by the global config at the moment. You still need to pass props directly to those components. The scope will be expanded in future releases.
:::

### Per-Component Configuration

Use `button` / `tag` props to set defaults for specific components.

- **`button`**: `{ size, variant, type, round }` — affects `wd-button` default size, variant, type, and round
- **`tag`**: `{ size, variant, round }` — affects `wd-tag` default size, variant, and round

::: code-group

```vue [vue]
<wd-config-provider :button="{ size: 'large', variant: 'plain', round: true }" :tag="{ size: 'small', variant: 'light' }">
  <wd-button>Large Plain Round Button</wd-button>
  <wd-tag>Small Light Tag</wd-tag>
</wd-config-provider>
```

:::

::: tip About Imperative APIs
Imperative APIs such as `useToast()` / `useDialog()` are invoked as plain functions and **do not read** the `ConfigProvider` config. Pass `options` directly at call time (e.g., `useToast().show({ msg, duration })`). This is an intentional design choice in wot-ui to avoid the synchronization issues caused by module-level singletons under Vite pre-bundling / multi-instance scenarios.
:::

### Configuration Priority

```text
component prop > per-component config (e.g. button.size) > component built-in default
```

### Scope Boundaries

1. **Nested merging**: `ConfigProvider` can be nested. Inner configs deep-merge with outer configs; same-named keys are overridden by the inner one, and unspecified keys are inherited from the outer.
2. **Portal / mini-program slot fallback**: Components teleported via `root-portal` or rendered inside native mini-program slots cannot read provider context through inject. Use the `useConfigProvider` composable to explicitly inject the theme at the logic layer (see [useConfigProvider](/en-US/component/use-config-provider)).

## ConfigProvider Attributes

| Parameter | Description | Type | Default Value | Scope |
| --- | --- | --- | --- | --- |
| theme | Theme style, options: `light`, `dark` | string | `light` | All Wot components |
| theme-vars | Custom theme variables | `ConfigProviderThemeVars` | `{}` | All Wot components |
| button | Button global config, supports `size` / `variant` / `type` / `round` | `{ size?: string; variant?: string; type?: string; round?: boolean }` | `{}` | `wd-button` |
| tag | Tag global config, supports `size` / `variant` / `round` | `{ size?: string; variant?: string; round?: boolean }` | `{}` | `wd-tag` |
| custom-class | Root node custom style class | string | `''` | Root node |
| custom-style | Root node custom style | string | `''` | Root node |

## ConfigProvider Slots

| Name | Description |
| --- | --- |
| default | Default slot, used to wrap child components that need to apply theme |
