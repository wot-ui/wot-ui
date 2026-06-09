import { isUndefined, omitBy } from '../../common/util'
import type { ButtonSize, ButtonType, ButtonVariant } from '../wd-button/types'
import type { TagSize, TagVariant } from '../wd-tag/types'
import type { ConfigProviderThemeVars } from './types'

export interface ButtonConfig {
  size?: ButtonSize
  variant?: ButtonVariant
  type?: ButtonType
  round?: boolean
}

export interface TagConfig {
  size?: TagSize
  variant?: TagVariant
  round?: boolean
}

export interface GlobalConfig {
  theme: string
  themeVars: ConfigProviderThemeVars
  button: ButtonConfig
  tag: TagConfig
}

export type ConfigProviderInput = Partial<GlobalConfig>

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = Object.freeze({
  theme: 'light',
  themeVars: {},
  button: {},
  tag: {}
}) as GlobalConfig

export function mergeConfig(parent: GlobalConfig | null, input: ConfigProviderInput): GlobalConfig {
  const base = parent || DEFAULT_GLOBAL_CONFIG
  const cleaned = omitBy(input, isUndefined) as ConfigProviderInput
  return {
    theme: cleaned.theme || base.theme,
    themeVars: mergeBucket(base.themeVars, cleaned.themeVars),
    button: mergeBucket(base.button, cleaned.button),
    tag: mergeBucket(base.tag, cleaned.tag)
  }
}

// 剔除 override 自身的 undefined 键，避免 `:button="{ size: undefined }"` 抹掉外层已有的值
function mergeBucket<T extends object>(base: T, override?: T): T {
  if (!override) return base
  return { ...base, ...(omitBy(override as Record<string, unknown>, isUndefined) as T) }
}
