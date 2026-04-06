# ConfigProvider

Used to provide theme mode and theme variable configuration for `Wot` components, supporting dark mode, theme customization and cross-component tree shared configuration.

## Component Type

### Dark Mode

Set `theme` to `dark` to switch `Wot` components within the current `ConfigProvider` wrapped range to dark style.
::: tip Tip
`ConfigProvider` only affects the theme performance of `Wot` components themselves, and will not automatically modify page global text color or background color. You can combine global styles to handle page background and text color yourself.
:::
```vue
<wd-config-provider theme="dark">
  <wd-button type="primary">Dark Mode Button</wd-button>
</wd-config-provider>
```

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

`useConfigProvider` accepts an object containing `themeVars`, `themeVars` supports plain objects, `reactive` objects or `Ref` objects.

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useConfigProvider } from '@wot-ui/ui'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})

useConfigProvider({ themeVars })
</script>
```

## ConfigProvider Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| theme | Theme style, optional values are `light`, `dark` | string | `light` |
| theme-vars | Custom theme variables | `ConfigProviderThemeVars` | `{}` |
| custom-class | Root node custom style class | string | `''` |
| custom-style | Root node custom style | string | `''` |

## ConfigProvider Slots

| Name | Description |
| --- | --- |
| default | Default slot, used to wrap child components that need to apply theme |
