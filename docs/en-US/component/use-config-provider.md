# useConfigProvider

Used to inject global configuration (such as theme variables) in JS logic, solving issues in environments like WeChat mini programs where parent `ConfigProvider` configuration cannot be obtained due to component rendering mechanism limitations (such as native slot scope isolation) or using `root-portal`.

::: tip Hint
Needs to be used with the `ConfigProvider` component, using the `ConfigProvider` component to wrap your components. Used to solve the limitation of dependency injection in mini program side, causing the inability to obtain parent `ConfigProvider` configuration in some scenarios.
:::

## Basic Usage

```ts
import { useConfigProvider } from '@/uni_modules/wot-ui'
import { reactive, ref } from 'vue'

// Use reactive
const themeVars = reactive({
  primary6: '#ff4d4f',
  buttonPrimaryBg: '#07c160'
})

useConfigProvider({ themeVars, button: { size: 'small', variant: 'plain' } })

// Or use ref
const themeVarsRef = ref({
  primary6: '#2c68ff'
})

useConfigProvider({ themeVars: themeVarsRef, button: { size: 'large', type: 'success', round: true }, tag: { size: 'medium', variant: 'light', round: true } })
```

## API

### Parameters

| Parameter | Description | Type | Default Value | Minimum Version |
|-----|------|------|--------|---------|
| themeVars | Theme variable object, supports reactive updates | `ConfigProviderThemeVars` \| `Ref<ConfigProviderThemeVars>` | - | 1.14.0 |
| theme | Theme style, options: `light`, `dark` | `string` \| `Ref<string>` | `'light'` | 1.14.0 |
| button | Button global config, supports `size` / `variant` / `type` / `round` | `{ size?: string; variant?: string; type?: string; round?: boolean }` \| `Ref<ButtonConfig>` | `{}` | - |
| tag | Tag global config, supports `size` / `variant` / `round` | `{ size?: string; variant?: string; round?: boolean }` \| `Ref<TagConfig>` | `{}` | - |
