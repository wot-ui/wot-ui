import type { ExtractPropTypes, PropType, InjectionKey, ComputedRef } from 'vue'
import { makeStringProp, baseProps } from '../../common/props'
import type { ButtonConfig, GlobalConfig, TagConfig } from './global-config'
import type { ConfigProviderThemeVars } from './theme-vars'

// 兼容历史从 wd-config-provider/types 深度导入 ConfigProviderThemeVars 的用法
export type { ConfigProviderThemeVars }

export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  },
  /**
   * Button 组件全局配置，支持 size / variant / type / round
   */
  button: {
    type: Object as PropType<ButtonConfig>,
    default: () => ({})
  },
  /**
   * Tag 组件全局配置，支持 size / variant / round
   */
  tag: {
    type: Object as PropType<TagConfig>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigProviderProvide = {
  globalConfig: ComputedRef<GlobalConfig>
  themeStyle: ComputedRef<string>
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide> = Symbol('wd-config-provider')
