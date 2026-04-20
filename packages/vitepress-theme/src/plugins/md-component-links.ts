import type { Plugin } from 'vite'
import path from 'path'
import i18n from '../locales/md-component-links.js'
import type { WotMdComponentLinksOptions } from '../types.js'

function kebabToCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

export function mdComponentLinksPlugin(options: WotMdComponentLinksOptions): Plugin {
  return {
    name: 'md-component-links',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!id.includes('/component')) return
      if (id.includes('/use-')) return

      const componentId = path.basename(id, '.md')
      const componentName = `wd-${componentId}`
      const camelComponentId = kebabToCamelCase(componentId)
      const demoUrl = `${options.repoUrl.replace(/\/$/, '')}/${options.demoSourceRoot.replace(/^\/+/, '').replace(/\/$/, '')}/${camelComponentId}`
      const componentUrl = `${options.repoUrl.replace(/\/$/, '')}/${options.componentSourceRoot
        .replace(/^\/+/, '')
        .replace(/\/$/, '')}/${componentName}`

      const lang = id.includes('/en-US/') ? 'en-US' : 'zh-CN'
      const { sourceCode, document, component } = i18n[lang]

      return {
        code: `${code}\n## ${sourceCode}\n<ExternalLink href=${demoUrl}>${document}</ExternalLink> • <ExternalLink href=${componentUrl}>${component}</ExternalLink>`
      }
    }
  }
}
