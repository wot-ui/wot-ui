import type { DefaultTheme, HeadConfig, UserConfig } from 'vitepress'
import type { PluginOption } from 'vite'

/**
 * 主题埋点配置。
 */
export interface WotThemeAnalyticsOptions {
  /**
   * 是否在路由切换后上报百度统计。
   */
  trackBaiduRoute?: boolean
}

/**
 * 顶部横幅配置。
 */
export interface WotThemeBannerOptions {
  /**
   * 横幅图片地址列表。
   */
  urls: string[]
}

/**
 * 侧边赞助位配置。
 */
export interface WotThemeSponsorOptions {
  /**
   * 赞助图片地址列表。
   */
  urls: string[]
}

/**
 * 广告位配置。
 */
export interface WotThemeAdsOptions {
  /**
   * WwAds 广告位 ID。
   */
  wwadsId?: string
  /**
   * 自定义广告素材地址列表。
   */
  urls?: string[]
}

/**
 * 团队成员展示配置。
 */
export interface WotThemeTeamOptions {
  /**
   * 团队成员数据地址列表。
   */
  urls: string[]
}

/**
 * 友情链接配置。
 */
export interface WotThemeFriendlyOptions {
  /**
   * 友情链接数据地址列表。
   */
  urls: string[]
}

/**
 * 案例展示配置。
 */
export interface WotThemeCasesOptions {
  /**
   * 案例数据地址列表。
   */
  urls: string[]
}

/**
 * Demo iframe 展示配置。
 */
export interface WotThemeDemoIframeOptions {
  /**
   * iframe 资源基础路径。
   */
  assetBase?: string
  /**
   * 是否启用二维码。
   */
  enabled?: boolean
}

/**
 * 主题运行时可选能力配置。
 */
export interface WotVitePressThemeOptions {
  /**
   * 埋点能力配置，传入 false 表示关闭。
   */
  analytics?: false | WotThemeAnalyticsOptions
  /**
   * 顶部横幅配置，传入 false 表示关闭。
   */
  banner?: false | WotThemeBannerOptions
  /**
   * 赞助位配置，传入 false 表示关闭。
   */
  sponsors?: false | WotThemeSponsorOptions
  /**
   * 特别赞助位配置，传入 false 表示关闭。
   */
  specialSponsor?: false | WotThemeSponsorOptions
  /**
   * 广告位配置，传入 false 表示关闭。
   */
  ads?: false | WotThemeAdsOptions
  /**
   * 团队成员模块配置，传入 false 表示关闭。
   */
  team?: false | WotThemeTeamOptions
  /**
   * 友情链接模块配置，传入 false 表示关闭。
   */
  friendly?: false | WotThemeFriendlyOptions
  /**
   * 案例模块配置，传入 false 表示关闭。
   */
  cases?: false | WotThemeCasesOptions
  /**
   * Demo iframe 配置，传入 false 表示关闭。
   */
  demoIframe?: false | WotThemeDemoIframeOptions
}

/**
 * LLM 文本导出功能配置。
 */
export interface WotLlmsFeatureOptions {
  /**
   * 生成的站点域名。
   */
  domain: string
  /**
   * 需要忽略的文档路径列表。
   */
  ignoreFiles?: string[]
}

/**
 * Markdown 组件源码链接配置。
 */
export interface WotMdComponentLinksOptions {
  /**
   * 仓库源码地址前缀。
   */
  repoUrl: string
  /**
   * Demo 源码根目录。
   */
  demoSourceRoot: string
  /**
   * 组件源码根目录。
   */
  componentSourceRoot: string
}

/**
 * Markdown SCSS 变量文档生成配置。
 */
export interface WotMdScssVarsOptions {
  /**
   * 组件样式源码根目录。
   */
  componentScssRoot: string
  /**
   * 文档组件名到实际组件名的映射表。
   */
  componentMap?: Record<string, string[]>
}

/**
 * 虚拟版本数据插件配置。
 */
export interface WotVirtualVersionDataOptions {
  /**
   * 文档根目录。
   */
  docsRoot?: string
}

/**
 * Markdown 增强能力配置集合。
 */
export interface WotMarkdownSourceOptions {
  /**
   * 组件源码链接能力配置。
   */
  componentLinks?: false | WotMdComponentLinksOptions
  /**
   * SCSS 变量文档能力配置。
   */
  scssVars?: false | WotMdScssVarsOptions
  /**
   * 是否开启版本徽标。
   */
  versionBadge?: boolean
  /**
   * 虚拟版本数据能力配置。
   */
  virtualVersionData?: false | WotVirtualVersionDataOptions
}

/**
 * VitePress 额外特性配置集合。
 */
export interface WotVitePressFeatureOptions {
  /**
   * LLM 文本导出能力配置。
   */
  llms?: false | WotLlmsFeatureOptions
  /**
   * 静态资源压缩配置。
   */
  compression?: false | Record<string, unknown>
}

/**
 * 创建 Wot VitePress 配置时接收的顶层参数。
 */
export interface WotVitePressConfigOptions {
  /**
   * 站点标题。
   */
  title: string
  /**
   * 站点默认语言。
   */
  lang: string
  /**
   * 站点描述。
   */
  description: string
  /**
   * 额外 head 配置。
   */
  head?: HeadConfig[]
  /**
   * 国际化语言包配置。
   */
  locales?: UserConfig['locales']
  /**
   * 默认主题配置。
   */
  themeConfig?: DefaultTheme.Config
  /**
   * 透传给 VitePress 的 Vite 配置。
   */
  vite?: UserConfig['vite']
  /**
   * Markdown 能力配置。
   */
  markdown: WotMarkdownSourceOptions
  /**
   * 额外特性配置。
   */
  features?: WotVitePressFeatureOptions
}

/**
 * 主题内部使用的归一化配置。
 */
export interface WotResolvedThemeOptions {
  /**
   * 埋点配置。
   */
  analytics: {
    /**
     * 是否在路由切换后上报百度统计。
     */
    trackBaiduRoute: boolean
  }
  /**
   * 归一化后的横幅配置。
   */
  banner: false | WotThemeBannerOptions
  /**
   * 归一化后的赞助位配置。
   */
  sponsors: false | WotThemeSponsorOptions
  /**
   * 归一化后的广告位配置。
   */
  ads: false | WotThemeAdsOptions
  /**
   * 归一化后的团队配置。
   */
  team: false | WotThemeTeamOptions
  /**
   * 归一化后的友情链接配置。
   */
  friendly: false | WotThemeFriendlyOptions
  /**
   * 归一化后的案例配置。
   */
  cases: false | WotThemeCasesOptions
  /**
   * 归一化后的 Demo iframe 配置。
   */
  demoIframe: false | WotThemeDemoIframeOptions
  /**
   * 归一化后的特别赞助位配置。
   */
  specialSponsor: false | WotThemeSponsorOptions
}

/**
 * 过滤空值后的有效 Vite 插件类型。
 */
export type WotVitePlugin = Exclude<PluginOption, null | false | undefined>
