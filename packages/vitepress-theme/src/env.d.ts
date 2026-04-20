/**
 * 支持在主题入口中直接导入样式文件。
 */
declare module '*.css' {
  const css: string
  export default css
}

/**
 * 兼容后续样式资源按 SCSS 形式暴露的场景。
 */
declare module '*.scss' {
  const css: string
  export default css
}

/**
 * 显式覆盖主题入口中使用的样式副作用导入路径，兼容编辑器诊断。
 */
declare module 'element-plus/dist/index.css'
declare module 'element-plus/theme-chalk/dark/css-vars.css'
declare module './theme/styles/vars.css'
declare module './theme/styles/custom.css'

/**
 * Vue 单文件组件类型声明。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

/**
 * 版本徽标插件生成的虚拟模块声明。
 */
declare module 'virtual:wot-vitepress-theme/version-data' {
  export const versionData: Record<string, string>
}

/**
 * VitePress 默认主题内部组合式模块声明。
 */
declare module 'vitepress/dist/client/theme-default/composables/outline.js'
declare module 'vitepress/dist/client/theme-default/composables/sidebar.js'
