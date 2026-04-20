import { defineConfig } from 'vitepress'
import viteCompression from 'vite-plugin-compression'
import llmstxt from 'vitepress-plugin-llms'
import { fileURLToPath, URL } from 'node:url'
import type { PluginOption } from 'vite'
import { mdScssVarsPlugin } from './plugins/md-scss-vars.js'
import { mdComponentLinksPlugin } from './plugins/md-component-links.js'
import { mdVersionBadgePlugin } from './plugins/md-version-badge.js'
import { virtualVersionDataPlugin } from './plugins/virtual-version-data.js'
import type { WotLlmsFeatureOptions, WotVitePlugin, WotVitePressConfigOptions } from './types.js'

function normalizeAlias(alias: any) {
  if (!alias) return []
  return Array.isArray(alias) ? alias : Object.entries(alias).map(([find, replacement]) => ({ find, replacement }))
}

function normalizePlugins(plugins: PluginOption[] | undefined): WotVitePlugin[] {
  return (plugins ?? []).filter(Boolean) as WotVitePlugin[]
}

function createLlmsPlugin(options: false | WotLlmsFeatureOptions | undefined) {
  if (!options) return null

  return llmstxt({
    domain: options.domain,
    ignoreFiles: options.ignoreFiles ?? []
  }) as unknown as PluginOption
}

function createCompressionPlugin(options: false | Record<string, unknown> | undefined) {
  if (options === false) return null

  return viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
    ...(options ?? {})
  })
}

function createInternalAliases() {
  return [
    {
      find: /^.*\/VPSidebar\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPSidebar.vue', import.meta.url))
    },
    {
      find: /^.*\/VPContent\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPContent.vue', import.meta.url))
    },
    {
      find: /^.*\/VPDoc\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPDoc.vue', import.meta.url))
    },
    {
      find: /^.*\/VPLocalNav\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPLocalNav.vue', import.meta.url))
    },
    {
      find: /^.*\/VPNavBar\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPNavBar.vue', import.meta.url))
    },
    {
      find: /^.*\/VPSidebarItem\.vue$/,
      replacement: fileURLToPath(new URL('./theme/components/VPSidebarItem.vue', import.meta.url))
    }
  ]
}

function mergeNoExternal(existing: any) {
  const merged = new Set<string>(['element-plus'])
  const noExternal = existing?.noExternal

  if (Array.isArray(noExternal)) {
    noExternal.forEach((item) => {
      if (typeof item === 'string') {
        merged.add(item)
      }
    })
  }

  return {
    ...existing,
    noExternal: Array.from(merged)
  } as any
}

export function createWotVitePressConfig(options: WotVitePressConfigOptions) {
  const userVite: any = options.vite ?? {}
  const internalPlugins: WotVitePlugin[] = [
    createLlmsPlugin(options.features?.llms),
    options.markdown.scssVars !== false
      ? mdScssVarsPlugin({
          componentScssRoot: options.markdown.scssVars?.componentScssRoot ?? '',
          componentMap: options.markdown.scssVars?.componentMap
        })
      : null,
    options.markdown.componentLinks !== false
      ? mdComponentLinksPlugin({
          repoUrl: options.markdown.componentLinks?.repoUrl ?? '',
          demoSourceRoot: options.markdown.componentLinks?.demoSourceRoot ?? '',
          componentSourceRoot: options.markdown.componentLinks?.componentSourceRoot ?? ''
        })
      : null,
    options.markdown.versionBadge !== false ? mdVersionBadgePlugin() : null,
    options.markdown.virtualVersionData !== false
      ? virtualVersionDataPlugin({
          docsRoot: options.markdown.virtualVersionData?.docsRoot
        })
      : null,
    createCompressionPlugin(options.features?.compression)
  ].filter(Boolean) as WotVitePlugin[]

  return defineConfig({
    title: options.title,
    description: options.description,
    head: options.head,
    locales: options.locales,
    themeConfig: options.themeConfig,
    vite: {
      ...userVite,
      plugins: [...internalPlugins, ...normalizePlugins(userVite.plugins)],
      ssr: mergeNoExternal(userVite.ssr),
      resolve: {
        ...userVite.resolve,
        alias: [...createInternalAliases(), ...normalizeAlias(userVite.resolve?.alias)]
      }
    }
  })
}

export type { WotVitePressConfigOptions } from './types.js'
