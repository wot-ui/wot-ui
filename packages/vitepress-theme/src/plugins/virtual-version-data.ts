import type { Plugin } from 'vite'
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve, relative, sep } from 'path'
import type { WotVirtualVersionDataOptions } from '../types.js'

const VERSION_DATA_ID = 'virtual:wot-vitepress-theme/version-data'
const RESOLVED_VERSION_DATA_ID = '\0virtual:wot-vitepress-theme/version-data'

// 从 Markdown 文件中提取版本信息
function extractVersionFromMarkdown(filePath: string): string | null {
  if (!existsSync(filePath)) return null

  try {
    const content = readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const versionMatch = frontmatter.match(/version:\s*(['"]?)([^'"\n]+)\1/)

      if (versionMatch) {
        return versionMatch[2].trim()
      }
    }
  } catch (e) {
    console.warn(`Failed to read file ${filePath}:`, e)
  }

  return null
}

// 扫描所有文档目录，提取版本信息
function scanAllVersions(docsRoot: string): Record<string, string> {
  const versionData: Record<string, string> = {}
  const docsDir = resolve(docsRoot)

  if (!existsSync(docsDir)) {
    console.warn('Docs directory not found:', docsDir)
    return versionData
  }

  function traverse(currentDir: string) {
    try {
      const files = readdirSync(currentDir)

      files.forEach((file) => {
        // Skip hidden files/dirs and specific folders
        if (file.startsWith('.') || file === 'public' || file === 'node_modules') return

        const fullPath = resolve(currentDir, file)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          traverse(fullPath)
        } else if (file.endsWith('.md')) {
          const version = extractVersionFromMarkdown(fullPath)

          if (version) {
            // Calculate relative path from docs root
            const relPath = relative(docsDir, fullPath)
            // Normalize path separators and add leading slash
            const normalizedPath = '/' + relPath.split(sep).join('/').replace(/\.md$/, '')

            versionData[normalizedPath] = version
            console.log(`✅ Found version info in ${normalizedPath}:`, version)
          }
        }
      })
    } catch (e) {
      console.warn(`Failed to scan directory ${currentDir}:`, e)
    }
  }

  traverse(docsDir)
  return versionData
}

export function virtualVersionDataPlugin(options: WotVirtualVersionDataOptions = {}): Plugin {
  let versionData: Record<string, string> = {}

  return {
    name: 'virtual-version-data',
    resolveId(id) {
      if (id === VERSION_DATA_ID) {
        return RESOLVED_VERSION_DATA_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VERSION_DATA_ID) {
        return `export const versionData = ${JSON.stringify(versionData, null, 2)}`
      }
    },
    configResolved() {
      try {
        versionData = scanAllVersions(options.docsRoot ?? process.cwd())
        console.log('✅ Version data generated successfully')
      } catch (e) {
        console.error('❌ Failed to generate version data:', e)
      }
    }
  }
}
