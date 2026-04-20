import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Layout from './theme/Layout.vue'
import ExternalLink from './theme/components/ExternalLink.vue'
import SvgImage from './theme/components/SvgImage.vue'
import { wotThemeOptionsKey } from './theme/options'
import type { WotResolvedThemeOptions, WotVitePressThemeOptions } from './types'
import './theme/styles/vars.css'
import './theme/styles/custom.css'

declare global {
  interface Window {
    /**
     * 百度统计全局队列。
     */
    _hmt: any[]
  }
}

/**
 * 将用户传入的主题配置归一化为运行时可直接消费的结构。
 */
function resolveThemeOptions(options: WotVitePressThemeOptions = {}): WotResolvedThemeOptions {
  return {
    analytics: {
      trackBaiduRoute: options.analytics !== false && options.analytics?.trackBaiduRoute !== false
    },
    banner: options.banner ?? false,
    sponsors: options.sponsors ?? false,
    ads: options.ads ?? false,
    team: options.team ?? false,
    friendly: options.friendly ?? false,
    cases: options.cases ?? false,
    demoIframe: options.demoIframe ?? false,
    specialSponsor: options.specialSponsor ?? false
  }
}

/**
 * 为 VitePress 应用注入主题组件、插件和运行时配置。
 */
function enhanceAppWithOptions(ctx: EnhanceAppContext, options: WotResolvedThemeOptions) {
  const { app, router } = ctx

  app.component('SvgImage', SvgImage)
  app.component('ExternalLink', ExternalLink)
  app.use(ElementPlus as any)
  app.provide(wotThemeOptionsKey, options)

  if (!options.analytics.trackBaiduRoute || typeof window === 'undefined') {
    return
  }

  const trackPageView = (path: string) => {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', path])
    }
  }

  router.onAfterRouteChange = (to: string) => {
    setTimeout(() => {
      trackPageView(to)
    }, 100)
  }
}

/**
 * 创建 Wot VitePress 主题实例。
 */
export function createWotVitePressTheme(options: WotVitePressThemeOptions = {}): Theme {
  const resolvedOptions = resolveThemeOptions(options)

  return {
    extends: DefaultTheme,
    Layout,
    enhanceApp(ctx) {
      enhanceAppWithOptions(ctx, resolvedOptions)
    }
  } satisfies Theme
}

const theme = createWotVitePressTheme()

export default theme
export * from './types'
export * from './theme/composables/team.js'
export * from './theme/composables/sponsor.js'
export * from './theme/composables/adsData.js'
export * from './theme/composables/banner.js'
export * from './theme/composables/cases.js'
export * from './theme/composables/friendly.js'
