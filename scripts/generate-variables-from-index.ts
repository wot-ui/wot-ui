/* eslint-disable quotes */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function readFileSafe(p: string): string {
  return fs.readFileSync(p, 'utf8')
}

function resolvePaths() {
  const rootDir = path.resolve(__dirname, '..')
  const themeDir = path.join(rootDir, 'src/uni_modules/wot-ui/styles/theme')
  const baseDir = path.join(themeDir, 'base')
  const indexScss = path.join(themeDir, 'index.scss')
  const lightScss = path.join(themeDir, 'light.scss')
  const darkScss = path.join(themeDir, 'dark.scss')
  const variableScss = path.join(rootDir, 'src/uni_modules/wot-ui/styles/variable.scss')
  return { rootDir, themeDir, baseDir, indexScss, lightScss, darkScss, variableScss }
}

function extractRootBlocks(content: string): string[] {
  const blocks: string[] = []
  const regex = /:root\b[^{}]*\{[\s\S]*?\}/g
  let m: RegExpExecArray | null
  while ((m = regex.exec(content)) !== null) blocks.push(m[0])
  return blocks
}

function normalizeRefName(name: string): string {
  if (name.startsWith('number-')) return name.replace('number-', '')
  if (name.endsWith('-')) return name.slice(0, -1)
  return name
}

type ParsedVar = { name: string; rawValue: string; comments: string[]; source?: string }

function parseVarsFromContent(content: string): ParsedVar[] {
  const result: ParsedVar[] = []
  const blocks = extractRootBlocks(content)
  for (const b of blocks) {
    const lines = b.split(/\r?\n/)
    let commentsBuffer: string[] = []
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (trimmed.startsWith('/*') || trimmed.startsWith('//')) {
        commentsBuffer.push(line)
        continue
      }
      const m = trimmed.match(/^--wot-([\w-]+):\s*([^;]+);/)
      if (m) {
        const name = m[1]
        const rawValue = m[2].trim()
        result.push({ name, rawValue, comments: commentsBuffer })
        commentsBuffer = []
      }
    }
  }
  return result
}

function collectBaseVars(paths: ReturnType<typeof resolvePaths>): ParsedVar[] {
  const files = [
    path.join(paths.baseDir, 'color.scss'),
    path.join(paths.baseDir, 'number.scss'),
    path.join(paths.baseDir, 'font.scss'),
    path.join(paths.baseDir, 'opacity.scss'),
    path.join(paths.baseDir, 'radius.scss'),
    path.join(paths.baseDir, 'insets.scss'),
    path.join(paths.baseDir, 'stroke.scss'),
    path.join(paths.baseDir, 'typography.scss')
  ]
  const vars: ParsedVar[] = []
  for (const f of files) {
    if (!fs.existsSync(f)) continue
    const content = readFileSafe(f)
    const parsed = parseVarsFromContent(content)
    for (const item of parsed) vars.push({ ...item, source: path.basename(f) })
  }
  return vars
}

function collectLightSemanticVars(paths: ReturnType<typeof resolvePaths>): ParsedVar[] {
  const content = readFileSafe(paths.lightScss)
  const parsed = parseVarsFromContent(content)
  return parsed.map((v) => ({ ...v, source: 'light.scss' }))
}

function readExistingScssVars(variablePath: string): Set<string> {
  if (!fs.existsSync(variablePath)) return new Set()
  const content = readFileSafe(variablePath)
  const set = new Set<string>()
  const regex = /^\s*\$-([\w-]+):\s*var\(/gm
  let m: RegExpExecArray | null
  while ((m = regex.exec(content)) !== null) set.add(m[1])
  return set
}

function isVarFunction(value: string): boolean {
  return /^var\(\s*--wot-[\w-]+\s*\)$/.test(value)
}

function buildFallback(value: string): string {
  const m = value.match(/^var\(\s*--wot-([\w-]+)\s*\)$/)
  if (m) {
    const ref = normalizeRefName(m[1])
    return `$-${ref}`
  }
  return value
}

function categorize(name: string): string {
  if (name.startsWith('base-')) return '基础颜色'
  if (name.startsWith('blue-')) return '蓝色系列'
  if (name.startsWith('lightblue-')) return '亮蓝系列'
  if (name.startsWith('pink-')) return '粉色系列'
  if (name.startsWith('red-')) return '红色系列'
  if (name.startsWith('volcano-')) return '橘红色系列'
  if (name.startsWith('orange-')) return '橙色系列'
  if (name.startsWith('yellow-')) return '黄色系列'
  if (name.startsWith('green-')) return '绿色系列'
  if (name.startsWith('cyan-')) return '青色系列'
  if (name.startsWith('purple-')) return '紫色系列'
  if (name.startsWith('grape-')) return '靛色系列'
  if (name.startsWith('coolgrey-')) return '冷灰系列'
  if (name.startsWith('neutralgrey-')) return '中性灰系列'
  if (name.startsWith('warmgrey-')) return '暖灰系列'
  if (name.startsWith('opac-')) return '遮罩系列'
  if (name.startsWith('opacwhite-')) return '白遮罩系列'
  if (name.startsWith('opacity-')) return '透明度系列'
  if (name.startsWith('n') || name === 'nFull') return '基础数字'
  if (name.startsWith('font-weight-')) return '字重系列'
  if (name.startsWith('radius-')) return '圆角系列'
  if (name.startsWith('size-')) return '文字字号系列'
  if (name.startsWith('padding-')) return '内边距系列'
  if (name.startsWith('spacing-')) return '间距系列'
  if (name.startsWith('stroke-')) return '边框线系列'
  if (name.startsWith('typography-')) return '排版系列'
  if (name.startsWith('primary-')) return '主色系列'
  if (name.startsWith('danger-')) return '危险色系列'
  if (name.startsWith('success-')) return '成功色系列'
  if (name.startsWith('warning-')) return '警告色系列'
  if (name.startsWith('text-')) return '文字色系列'
  if (name.startsWith('icon-')) return '图标色系列'
  if (name.startsWith('border-')) return '边框色系列'
  if (name.startsWith('filled-')) return '填充色系列'
  if (name.startsWith('divider-')) return '分割线系列'
  if (name.startsWith('feedback-')) return '反馈色系列'
  if (name.startsWith('opacfilled-')) return '透明度填充'
  if (name.includes('classifyapplication-')) return '分类色系列'
  return '其他'
}

const CATEGORY_ORDER_BASE = [
  '基础颜色',
  '蓝色系列',
  '亮蓝系列',
  '粉色系列',
  '红色系列',
  '橘红色系列',
  '橙色系列',
  '黄色系列',
  '绿色系列',
  '青色系列',
  '紫色系列',
  '靛色系列',
  '冷灰系列',
  '中性灰系列',
  '暖灰系列',
  '遮罩系列',
  '白遮罩系列',
  '透明度系列',
  '基础数字',
  '字重系列',
  '排版系列',
  '圆角系列',
  '内边距系列',
  '间距系列',
  '边框线系列'
]

const CATEGORY_ORDER_SEMANTIC = [
  '主色系列',
  '危险色系列',
  '成功色系列',
  '警告色系列',
  '文字色系列',
  '图标色系列',
  '边框色系列',
  '填充色系列',
  '分割线系列',
  '反馈色系列',
  '透明度填充',
  '分类色系列'
]

function numFromNToken(token: string): number {
  if (token === 'nFull') return Number.POSITIVE_INFINITY
  const m = token.match(/^n(\d+)$/)
  if (m) return parseFloat(m[1])
  const m05 = token.match(/^n0?5$/)
  if (m05) return 0.5
  return NaN
}

function numFromOpacToken(token: string): number {
  const m = token.match(/(?:opac|opacwhite)-(\d+)_?(\d+)?/)
  if (!m) return NaN
  const intPart = parseInt(m[1], 10)
  const fracPart = m[2] ? parseInt(m[2], 10) : 0
  const frac = m[2] ? parseFloat('0.' + m[2]) : 0
  return intPart + (fracPart ? frac : 0)
}

function suffix(name: string, prefix: string): string {
  return name.startsWith(prefix + '-') ? name.slice(prefix.length + 1) : ''
}

const ORDER_MAPS: Record<string, string[]> = {
  border: ['extra-Strong', 'Strong', 'main', 'light', 'white'],
  text: ['main', 'secondary', 'auxiliary', 'placeholder-disabled', 'white'],
  icon: ['main', 'secondary', 'auxiliary', 'placeholder-disabled', 'white'],
  state: ['normal', 'hover', 'clicked', 'disabled', 'particular', 'surface'],
  feedback: ['hover', 'active', 'accent'],
  opacfilled: ['tooltip-toast-cover', 'main-cover', 'light-cover'],
  filled: ['extra-strong', 'strong', 'content', 'bottom', 'filled-white'],
  divider: ['main', 'light', 'strong', 'white'],
  opacity: ['opacity-disabled', 'opacity-dimmer', 'opacity-oveylay', 'opacity-backdrop', 'opacity-main'],
  radius: ['zero', 'small', 'main', 'large', 'extra-large', 'super-large', 'ultra-large', 'radius-full'],
  stroke: ['zero', 'light', 'main', 'blod'],
  typographyModules: ['label', 'body', 'title', 'display', 'headline'],
  typographyProps: [
    'font-family',
    'size-small',
    'size-main',
    'size-large',
    'line-height-size-small',
    'line-height-size-main',
    'line-height-size-large',
    'font-weight-light',
    'font-weight-main',
    'font-weight-strong',
    'font-weight-extra-strong',
    'font-weight'
  ],
  insets: [
    'zero',
    'ultra-tight',
    'super-tight',
    'extra-tight',
    'tight',
    'main',
    'loose',
    'extra-loose',
    'super-loose',
    'ultra-loose',
    'spacious',
    'extra-spacious',
    'super-spacious',
    'ultra-spacious'
  ]
}

function weightOrder(list: string[], key: string): number {
  const idx = list.indexOf(key)
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

function parseSemanticKey(name: string): { type: string; key: string } {
  if (name.startsWith('border-')) return { type: 'border', key: suffix(name, 'border') }
  if (name.startsWith('text-')) return { type: 'text', key: suffix(name, 'text') }
  if (name.startsWith('icon-')) return { type: 'icon', key: suffix(name, 'icon') }
  if (name.startsWith('filled-')) return { type: 'filled', key: suffix(name, 'filled') }
  if (name.startsWith('divider-')) return { type: 'divider', key: suffix(name, 'divider') }
  if (name.startsWith('opacfilled-')) return { type: 'opacfilled', key: suffix(name, 'opacfilled') }
  if (name.startsWith('radius-')) return { type: 'radius', key: suffix(name, 'radius') }
  if (name.startsWith('padding-') || name.startsWith('spacing-')) return { type: 'insets', key: name.split('-').slice(1).join('-') }
  if (name.startsWith('danger-') || name.startsWith('success-') || name.startsWith('warning-')) return { type: 'state', key: name.split('-')[1] }
  return { type: 'other', key: '' }
}

function getNumericFromRaw(it: ParsedVar): number {
  const m1 = it.rawValue.match(/var\(\s*--wot-number-n(\d+)\s*\)/)
  if (m1) return parseFloat(m1[1])
  const m2 = it.rawValue.match(/var\(\s*--wot-n(\d+)\s*\)/)
  if (m2) return parseFloat(m2[1])
  const m05 = it.rawValue.match(/var\(\s*--wot-n-0?5\s*\)/)
  if (m05) return 0.5
  return NaN
}

function sortWithinCategory(cat: string, list: ParsedVar[]): ParsedVar[] {
  const byNumberSuffix = [
    '蓝色系列',
    '亮蓝系列',
    '粉色系列',
    '红色系列',
    '橘红色系列',
    '橙色系列',
    '黄色系列',
    '绿色系列',
    '青色系列',
    '紫色系列',
    '靛色系列',
    '主色系列'
  ]
  if (byNumberSuffix.includes(cat)) {
    return list.sort((a, b) => {
      const sa = parseInt(a.name.split('-').pop() || '', 10)
      const sb = parseInt(b.name.split('-').pop() || '', 10)
      return (isNaN(sa) ? Number.MAX_SAFE_INTEGER : sa) - (isNaN(sb) ? Number.MAX_SAFE_INTEGER : sb)
    })
  }
  if (cat === '遮罩系列') return list.sort((a, b) => numFromOpacToken(a.name) - numFromOpacToken(b.name))
  if (cat === '白遮罩系列') return list.sort((a, b) => numFromOpacToken(a.name) - numFromOpacToken(b.name))
  if (cat === '透明度系列') {
    const order = ORDER_MAPS.opacity
    return list.sort((a, b) => weightOrder(order, a.name) - weightOrder(order, b.name))
  }
  if (cat === '基础数字') {
    return list.sort((a, b) => {
      const va = numFromNToken(a.name)
      const vb = numFromNToken(b.name)
      return (isNaN(va) ? Number.MAX_SAFE_INTEGER : va) - (isNaN(vb) ? Number.MAX_SAFE_INTEGER : vb)
    })
  }
  if (cat === '圆角系列')
    return list.sort((a, b) => weightOrder(ORDER_MAPS.radius, suffix(a.name, 'radius')) - weightOrder(ORDER_MAPS.radius, suffix(b.name, 'radius')))
  if (cat === '边框线系列')
    return list.sort((a, b) => weightOrder(ORDER_MAPS.stroke, suffix(a.name, 'stroke')) - weightOrder(ORDER_MAPS.stroke, suffix(b.name, 'stroke')))
  if (cat === '内边距系列' || cat === '间距系列') {
    return list.sort((a, b) => {
      const wa = weightOrder(ORDER_MAPS.insets, suffix(a.name, cat === '内边距系列' ? 'padding' : 'spacing'))
      const wb = weightOrder(ORDER_MAPS.insets, suffix(b.name, cat === '内边距系列' ? 'padding' : 'spacing'))
      if (wa !== wb) return wa - wb
      const na = getNumericFromRaw(a)
      const nb = getNumericFromRaw(b)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return a.name.localeCompare(b.name)
    })
  }
  if (cat === '边框色系列' || cat === '文字色系列' || cat === '图标色系列' || cat === '填充色系列' || cat === '分割线系列' || cat === '反馈色系列') {
    return list.sort((a, b) => {
      const sa = parseSemanticKey(a.name)
      const sb = parseSemanticKey(b.name)
      const map = ORDER_MAPS[sa.type] || ORDER_MAPS[sb.type]
      const wa = map ? weightOrder(map, sa.key) : Number.MAX_SAFE_INTEGER
      const wb = map ? weightOrder(map, sb.key) : Number.MAX_SAFE_INTEGER
      if (wa !== wb) return wa - wb
      return a.name.localeCompare(b.name)
    })
  }
  if (cat === '分类色系列') {
    const colorOrder = ['Yellow', 'Cyan', 'Purple', 'Grape', 'Pink']
    const subOrder = ['background', 'border', 'content']
    return list.sort((a, b) => {
      const pa = a.name.split('-').slice(1)
      const pb = b.name.split('-').slice(1)
      const ca = weightOrder(colorOrder, pa[0])
      const cb = weightOrder(colorOrder, pb[0])
      if (ca !== cb) return ca - cb
      const sa = weightOrder(subOrder, pa[1])
      const sb = weightOrder(subOrder, pb[1])
      if (sa !== sb) return sa - sb
      return a.name.localeCompare(b.name)
    })
  }
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

function renderGroupHeader(title: string): string {
  return `/* ${title} */\n`
}

function renderComments(lines: string[]): string {
  if (!lines || !lines.length) return ''
  return lines.map((l) => l).join('\n') + '\n'
}

function collectGroupComments(_list: ParsedVar[]): string[] {
  return []
}

function aliasForBase(name: string): string | null {
  const map: Record<string, string> = {
    // 仅用于去重检查：如果文件中已有旧命名，则跳过生成新命名
    'opacity-disabled': 'disable-opacity',
    'opacity-dimmer': 'dimmer-opacity',
    'opacity-oveylay': 'overlay-opacity',
    'opacity-main': 'main-opacity',
    'opacity-backdrop': 'backdrop-opacity'
  }
  return map[name] || null
}

function renderCategoryWithSubheaders(cat: string, list: ParsedVar[]): string {
  let out = ''
  if (cat === '图标色系列') {
    out += '/* 图标 */\n'
    for (const it of list) {
      const fallback = isVarFunction(it.rawValue) ? buildFallback(it.rawValue) : it.rawValue
      out += `$-${it.name}: var(--wot-${it.name}, ${fallback}) !default;\n`
    }
    return out + '\n'
  }
  if (cat === '排版系列') {
    const byModule = new Map<string, ParsedVar[]>()
    for (const it of list) {
      const parts = it.name.split('-')
      const module = parts[1]
      const key = parts.slice(2).join('-')
      if (!byModule.has(module)) byModule.set(module, [])
      byModule.get(module)!.push({ ...it, name: `typography-${module}-${key}` })
    }
    for (const module of ORDER_MAPS.typographyModules) {
      const items = byModule.get(module)
      if (!items || !items.length) continue
      out += `/* ${module} */\n`
      items.sort((a, b) => {
        const ka = a.name.split('-').slice(2).join('-')
        const kb = b.name.split('-').slice(2).join('-')
        const wa = weightOrder(ORDER_MAPS.typographyProps, ka)
        const wb = weightOrder(ORDER_MAPS.typographyProps, kb)
        if (wa !== wb) return wa - wb
        return a.name.localeCompare(b.name)
      })
      for (const it of items) {
        const fallback = isVarFunction(it.rawValue) ? buildFallback(it.rawValue) : it.rawValue
        out += `$-${it.name}: var(--wot-${it.name}, ${fallback}) !default;\n`
      }
      out += '\n'
    }
    return out
  }
  if (cat === '分类色系列') {
    const colorOrder = ['Yellow', 'Cyan', 'Purple', 'Grape', 'Pink']
    const colorCN: Record<string, string> = {
      Yellow: '黄色',
      Cyan: '蓝色',
      Purple: '紫色',
      Grape: '靛色',
      Pink: '粉色'
    }
    const byColor = new Map<string, ParsedVar[]>()
    for (const it of list) {
      const parts = it.name.split('-')
      const color = parts[1]
      if (!byColor.has(color)) byColor.set(color, [])
      byColor.get(color)!.push(it)
    }
    for (const color of colorOrder) {
      const items = byColor.get(color)
      if (!items || !items.length) continue
      out += `/* ${colorCN[color] || color} */\n`
      for (const it of items) {
        const fallback = isVarFunction(it.rawValue) ? buildFallback(it.rawValue) : it.rawValue
        out += `$-${it.name}: var(--wot-${it.name}, ${fallback}) !default;\n`
      }
      out += '\n'
    }
    return out
  }
  return ''
}

function generateScssLines(items: ParsedVar[], existingSet: Set<string>, orderType: 'base' | 'semantic'): string {
  const order = orderType === 'base' ? CATEGORY_ORDER_BASE : CATEGORY_ORDER_SEMANTIC
  const groups = new Map<string, ParsedVar[]>()
  for (const it of items) {
    const alt = aliasForBase(it.name)
    if (existingSet.has(it.name) || (alt ? existingSet.has(alt) : false)) continue
    const cat = categorize(it.name)
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(it)
  }
  let out = ''
  for (const cat of order) {
    if (!groups.has(cat)) continue
    out += renderGroupHeader(cat)
    const list = sortWithinCategory(cat, groups.get(cat)!)
    const subOut = renderCategoryWithSubheaders(cat, list)
    if (subOut) {
      out += subOut
    } else {
      for (const it of list) {
        const fallback = isVarFunction(it.rawValue) ? buildFallback(it.rawValue) : it.rawValue
        out += `$-${it.name}: var(--wot-${it.name}, ${fallback}) !default;\n`
      }
      out += '\n'
    }
  }
  return out
}

function main() {
  const paths = resolvePaths()
  try {
    const baseVars = collectBaseVars(paths)
    const lightVars = collectLightSemanticVars(paths)
    const existing = readExistingScssVars(paths.variableScss)
    const baseOut = generateScssLines(baseVars, existing, 'base')
    const lightOut = generateScssLines(lightVars, existing, 'semantic')
    const combined: string[] = []
    if (baseOut.trim()) combined.push('/* 自动生成-基础变量(light) */\n' + baseOut)
    if (lightOut.trim()) combined.push('/* 自动生成-语义变量(light) */\n' + lightOut)
    const header = "@import './mixin/function';\n@import './theme/index';\n\n"
    let original = ''
    let needPrependHeader = false
    if (fs.existsSync(paths.variableScss)) {
      original = readFileSafe(paths.variableScss)
      const hasFunc = original.includes("@import './mixin/function';")
      const hasTheme = original.includes("@import './theme/index';")
      needPrependHeader = !(hasFunc && hasTheme)
    } else {
      needPrependHeader = true
    }
    const prefix = needPrependHeader ? header : ''
    const suffix = combined.length ? '\n' + combined.join('\n') : ''
    const newContent = prefix + original + suffix
    if (newContent === original) {
      console.log('ℹ️ 无变更，未修改文件')
      return
    }
    fs.writeFileSync(paths.variableScss, newContent, 'utf8')
    const stats = {
      baseParsed: baseVars.length,
      lightParsed: lightVars.length,
      generatedLines: (combined.join('\n').match(/\$-/g) || []).length,
      skipped: existing.size
    }
    console.log('✅ 生成成功')
    console.log(`📁 写入: ${paths.variableScss}`)
    console.log(`📊 统计: 基础=${stats.baseParsed} 语义=${stats.lightParsed} 生成=${stats.generatedLines} 跳过已存在=${stats.skipped}`)
  } catch (e: any) {
    console.error('❌ 生成失败:', e.message)
    process.exit(1)
  }
}

main()

export { main }
