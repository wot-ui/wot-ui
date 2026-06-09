import { computed, provide, unref, type MaybeRef } from 'vue'
import { type ConfigProviderThemeVars } from '../components/wd-config-provider/types'
import { objToStyle } from '../common/util'
import {
  mergeConfig,
  type GlobalConfig,
  type ConfigProviderInput,
  type ButtonConfig,
  type TagConfig
} from '../components/wd-config-provider/global-config'

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

export interface UseConfigProviderOptions {
  themeVars?: MaybeRef<ConfigProviderThemeVars>
  theme?: MaybeRef<string>
  button?: MaybeRef<ButtonConfig>
  tag?: MaybeRef<TagConfig>
}

export function useConfigProvider(options: UseConfigProviderOptions = {}) {
  const { themeVars, theme, button, tag } = options

  const themeStyle = computed(() => {
    const styleObj = mapThemeVarsToCSSVars(unref(themeVars) || {})
    return styleObj ? `${objToStyle(styleObj)}` : ''
  })

  const globalConfig = computed<GlobalConfig>(() => {
    return mergeConfig(null, {
      theme: unref(theme) || 'light',
      themeVars: unref(themeVars) || {},
      button: unref(button) || {},
      tag: unref(tag) || {}
    } as ConfigProviderInput)
  })

  provide(USE_CONFIG_PROVIDER_KEY, {
    themeStyle,
    globalConfig
  })
}
