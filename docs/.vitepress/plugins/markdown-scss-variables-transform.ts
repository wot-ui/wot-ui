import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

const COMPONENT_MAP: Record<string, string[]> = {
  table: ['wd-table', 'wd-table-column'],
  radio: ['wd-radio', 'wd-radio-group'],
  checkbox: ['wd-checkbox', 'wd-checkbox-group'],
  collapse: ['wd-collapse', 'wd-collapse-item'],
  'swipe-action': ['wd-swipe-action', 'wd-swipe-action-item'],
  grid: ['wd-grid', 'wd-grid-item'],
  tabs: ['wd-tabs', 'wd-tab'],
  steps: ['wd-steps', 'wd-step'],
  sidebar: ['wd-sidebar', 'wd-sidebar-item'],
  'index-bar': ['wd-index-bar', 'wd-index-anchor'],
  form: ['wd-form', 'wd-form-item']
}

function parseScssVariables(scssContent: string) {
  // Regex matches:
  // 1: Optional description comment
  // 2: SCSS variable name (e.g., picker-bg)
  // 3: CSS variable core name (e.g., picker-bg, which becomes --wot-picker-bg)
  // 4: Default value
  const SCSS_VAR_REGEX = /(?:\/\/\s*(.*)\n)?\$([a-zA-Z0-9-]+):\s*var\(--wot-([a-zA-Z0-9-]+),\s*(.+)\)(?:\s*!default)?\s*;/g

  const variables: Array<{ name: string; defaultValue: string; desc: string }> = []
  let match
  while ((match = SCSS_VAR_REGEX.exec(scssContent)) !== null) {
    variables.push({
      desc: match[1] ? match[1].trim() : '-',
      name: `--wot-${match[3]}`,
      defaultValue: match[4].trim()
    })
  }

  return variables
}

export function MarkdownScssVariablesTransform(): Plugin {
  return {
    name: 'md-scss-variables-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!id.includes('/component/')) return
      if (id.includes('/use-')) return

      const componentId = path.basename(id, '.md')

      // Find which components map to this doc
      const targetComponents = COMPONENT_MAP[componentId] || [`wd-${componentId}`]
      let allVariables: Array<{ name: string; defaultValue: string; desc: string }> = []

      // Try finding the root directory based on the `id` path up to "docs"
      const docsIndex = id.indexOf('/docs/')
      let rootDir = process.cwd()
      if (docsIndex !== -1) {
        rootDir = id.substring(0, docsIndex)
      }

      // Extract variables from each component's index.scss
      for (const comp of targetComponents) {
        const scssPath = path.resolve(rootDir, `src/uni_modules/wot-ui/components/${comp}/index.scss`)
        if (fs.existsSync(scssPath)) {
          const scssContent = fs.readFileSync(scssPath, 'utf8')
          const vars = parseScssVariables(scssContent)
          allVariables = allVariables.concat(vars)
        }
      }

      if (allVariables.length === 0) {
        return { code }
      }

      // Format markdown table
      let tableMd = `\n## 主题定制\n\n### CSS 变量\n\n组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 全局配置](/component/config-provider)。\n\n| 名称 | 默认值 | 描述 |\n| --- | --- | --- |\n`

      for (const v of allVariables) {
        tableMd += `| ${v.name} | ${v.defaultValue} | ${v.desc} |\n`
      }

      // Replace existing "## 主题定制" section or append it
      // This regex matches "## 主题定制" and everything after it until the next H2 ("## ") or EOF
      const themeSectionRegex = /\n*##\s+主题定制[\s\S]*?(?=\n##\s+|$)/
      let newCode = code
      if (themeSectionRegex.test(code)) {
        newCode = code.replace(themeSectionRegex, tableMd)
      } else {
        newCode = `${code}${tableMd}`
      }

      return { code: newCode }
    }
  }
}
