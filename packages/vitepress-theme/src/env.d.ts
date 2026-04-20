declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

declare module 'virtual:wot-vitepress-theme/version-data' {
  export const versionData: Record<string, string>
}

declare module 'vitepress/dist/client/theme-default/composables/outline.js'
declare module 'vitepress/dist/client/theme-default/composables/sidebar.js'
