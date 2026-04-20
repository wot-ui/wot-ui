import type { InjectionKey } from 'vue'
import type { WotResolvedThemeOptions } from '../types'

export const wotThemeOptionsKey: InjectionKey<WotResolvedThemeOptions> = Symbol('wot-vitepress-theme-options')
