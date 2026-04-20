import type { DefaultTheme, HeadConfig, UserConfig } from 'vitepress'
import type { PluginOption } from 'vite'

export interface WotThemeAnalyticsOptions {
  trackBaiduRoute?: boolean
}

export interface WotThemeBannerOptions {
  urls: string[]
}

export interface WotThemeSponsorOptions {
  urls: string[]
}

export interface WotThemeAdsOptions {
  wwadsId?: string
  urls?: string[]
}

export interface WotThemeTeamOptions {
  urls: string[]
}

export interface WotThemeFriendlyOptions {
  urls: string[]
}

export interface WotThemeCasesOptions {
  urls: string[]
}

export interface WotThemeDemoIframeOptions {
  assetBase?: string
}

export interface WotVitePressThemeOptions {
  analytics?: false | WotThemeAnalyticsOptions
  banner?: false | WotThemeBannerOptions
  sponsors?: false | WotThemeSponsorOptions
  ads?: false | WotThemeAdsOptions
  team?: false | WotThemeTeamOptions
  friendly?: false | WotThemeFriendlyOptions
  cases?: false | WotThemeCasesOptions
  demoIframe?: false | WotThemeDemoIframeOptions
}

export interface WotLlmsFeatureOptions {
  domain: string
  ignoreFiles?: string[]
}

export interface WotMdComponentLinksOptions {
  repoUrl: string
  demoSourceRoot: string
  componentSourceRoot: string
}

export interface WotMdScssVarsOptions {
  componentScssRoot: string
  componentMap?: Record<string, string[]>
}

export interface WotVirtualVersionDataOptions {
  docsRoot?: string
}

export interface WotMarkdownSourceOptions {
  componentLinks?: false | WotMdComponentLinksOptions
  scssVars?: false | WotMdScssVarsOptions
  versionBadge?: boolean
  virtualVersionData?: false | WotVirtualVersionDataOptions
}

export interface WotVitePressFeatureOptions {
  llms?: false | WotLlmsFeatureOptions
  compression?: false | Record<string, unknown>
}

export interface WotVitePressConfigOptions {
  title: string
  description: string
  head?: HeadConfig[]
  locales?: UserConfig['locales']
  themeConfig?: DefaultTheme.Config
  vite?: UserConfig['vite']
  markdown: WotMarkdownSourceOptions
  features?: WotVitePressFeatureOptions
}

export interface WotResolvedThemeOptions {
  analytics: {
    trackBaiduRoute: boolean
  }
  banner: false | WotThemeBannerOptions
  sponsors: false | WotThemeSponsorOptions
  ads: false | WotThemeAdsOptions
  team: false | WotThemeTeamOptions
  friendly: false | WotThemeFriendlyOptions
  cases: false | WotThemeCasesOptions
  demoIframe: false | WotThemeDemoIframeOptions
}

export type WotVitePlugin = Exclude<PluginOption, null | false | undefined>
