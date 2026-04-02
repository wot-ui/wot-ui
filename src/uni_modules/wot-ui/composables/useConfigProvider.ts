import { computed, provide, unref, type Ref } from 'vue'
import { type ConfigProviderThemeVars } from '../components/wd-config-provider/types'
import { objToStyle } from '../common/util'

export const USE_CONFIG_PROVIDER_KEY = '__CONFIG_PROVIDER__'

export const kebabCase = (str: string): string => {
  str = str.replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
  return str
    .replace(/([a-z])([A-Z])/g, (_, p1, p2) => p1 + '-' + p2.toLowerCase())
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/(\d)([a-zA-Z])/g, '$1-$2')
}

export const mapThemeVarsToCSSVars = (themeVars: Record<string, string>) => {
  if (!themeVars) return
  const cssVars: Record<string, string> = {}
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--wot-${kebabCase(key)}`] = themeVars[key]
  })

  return cssVars
}

export function useConfigProvider({
  themeVars,
  theme
}: {
  themeVars?: ConfigProviderThemeVars | Ref<ConfigProviderThemeVars>
  theme?: string | Ref<string>
}) {
  const themeStyle = computed(() => {
    const styleObj = mapThemeVarsToCSSVars(unref(themeVars) || {})
    return styleObj ? `${objToStyle(styleObj)}` : ''
  })

  const themeValue = computed(() => {
    return unref(theme) || 'light'
  })

  provide(USE_CONFIG_PROVIDER_KEY, {
    themeStyle,
    theme: themeValue
  })
}
