# ConfigProvider 全局配置

用于为 `Wot` 组件提供主题模式和主题变量配置，支持深色模式、主题定制和跨组件树共享配置。

## 组件类型

### 深色模式

将 `theme` 设置为 `dark` 后，可以让当前 `ConfigProvider` 包裹范围内的 `Wot` 组件切换为深色风格。
::: tip 提示
`ConfigProvider` 只影响 `Wot` 组件自身的主题表现，不会自动修改页面全局文本色或背景色。你可以结合全局样式自行处理页面背景和文本颜色。
:::
```vue
<wd-config-provider theme="dark">
  <wd-button type="primary">深色模式按钮</wd-button>
</wd-config-provider>
```




## 切换主题

通过响应式地更新 `theme`，可以在浅色和深色模式之间切换。

::: code-group

```vue [vue]
<wd-config-provider :theme="theme">
  <wd-button type="primary">当前模式：{{ theme }}</wd-button>
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

## 主题定制

### 通过 CSS 变量覆盖

`Wot UI` 组件通过 CSS 变量组织样式。你可以直接覆盖这些变量来调整组件外观。

```css
:root,
page {
  --wot-button-primary-bg: green;
}
```

### 通过 ConfigProvider 覆盖

`ConfigProvider` 支持通过 `theme-vars` 覆盖主题变量，仅影响当前包裹范围内的组件。

::: tip 提示
`ConfigProvider` 仅影响它的子组件样式，不会直接修改全局 `root` 节点样式。
:::

::: code-group

```html [vue]
<wd-config-provider :theme-vars="themeVars">
  <view style="margin: 16px">
    <wd-button round block type="primary">提交</wd-button>
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

### 在 TypeScript 中使用

在 TypeScript 中定义 `themeVars` 时，建议使用组件库提供的 `ConfigProviderThemeVars` 类型，以获得完整的类型提示。

::: code-group

```ts [ts]
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#ffffff'
}
```

```ts [ts]
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-design-uni/components/wd-config-provider/types'

const localThemeVars: ConfigProviderThemeVars = {
  cellTitleColor: '#4d80f0'
}
```

:::



## 特殊样式

### 全局共享

如需在应用层共享主题配置，可以结合虚拟根组件 [uni-ku-root](https://github.com/uni-ku/root) 使用。

#### 安装

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

#### 引入

- CLI 项目：直接编辑根目录下的 vite.config.(js|ts)
- HBuilderX 项目：需要在根目录下创建 vite.config.(js|ts)

```ts
import { defineConfig } from 'vite'
import UniKuRoot from '@uni-ku/root'
import Uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [UniKuRoot(), Uni()]
})
```

::: tip
若存在会修改 pages.json 的插件，需要将 `UniKuRoot` 放置在这些插件之后。
:::

#### 使用

1. 创建根组件并处理全局配置组件。

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

2. 编写控制主题的组合式函数。

```ts
import type { ConfigProviderThemeVars } from 'wot-design-uni'
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

3. 在任意页面中使用切换主题模式。

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">切换主题，当前模式：{{ theme }}</button>
</template>
```

## 组合式函数

### useConfigProvider

详细文档请查看 [useConfigProvider](/component/use-config-provider)。

在微信小程序等环境中，由于组件渲染机制限制，被渲染在插槽中的组件或通过 `root-portal` 移动到根节点的组件，可能无法继承外层 `ConfigProvider` 的 provide 上下文。为了解决这个问题，组件库提供了 `useConfigProvider`，允许你在逻辑层显式注入配置。

#### 引入

```ts
import { useConfigProvider } from 'wot-design-uni'
```

#### 使用

`useConfigProvider` 接受一个包含 `themeVars` 的对象，`themeVars` 支持普通对象、`reactive` 对象或 `Ref` 对象。

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useConfigProvider } from 'wot-design-uni'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})

useConfigProvider({ themeVars })
</script>
```

## ConfigProvider Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题风格，可选值为 `light`、`dark` | string | `light` |
| theme-vars | 自定义主题变量 | `ConfigProviderThemeVars` | `{}` |
| custom-class ^(1.3.9) | 根节点自定义样式类 | string | `''` |
| custom-style ^(1.3.9) | 根节点自定义样式 | string | `''` |

## ConfigProvider Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于包裹需要应用主题的子组件 |
