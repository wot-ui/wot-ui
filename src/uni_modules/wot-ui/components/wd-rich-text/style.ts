const styleProperties = new Set(
  (
    'color background-color font-size font-weight font-style font-family text-align text-decoration text-indent ' +
    'line-height letter-spacing white-space word-break overflow-wrap vertical-align width height max-width min-width ' +
    'margin margin-top margin-right margin-bottom margin-left padding padding-top padding-right padding-bottom padding-left ' +
    'border border-width border-style border-color border-radius border-collapse border-spacing table-layout list-style-type display'
  ).split(' ')
)

const enums: Record<string, string[]> = {
  display: ['block', 'inline', 'inline-block', 'none'],
  'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'],
  'text-align': ['left', 'right', 'center', 'justify', 'start', 'end'],
  'font-style': ['normal', 'italic', 'oblique'],
  'word-break': ['normal', 'break-all', 'keep-all', 'break-word'],
  'overflow-wrap': ['normal', 'break-word', 'anywhere'],
  'border-collapse': ['collapse', 'separate'],
  'table-layout': ['auto', 'fixed'],
  'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman']
}

/** 按引号和括号层级切分声明，避免字体名中的分号被误认为新声明。 */
function declarations(value: string): string[] {
  const result: string[] = []
  let start = 0
  let quote = ''
  let depth = 0
  for (let index = 0; index < value.length; index++) {
    const char = value[index]
    if (quote) {
      if (char === quote && value[index - 1] !== '\\') quote = ''
    } else if (char === '"' || char.charCodeAt(0) === 39) quote = char
    else if (char === '(') depth++
    else if (char === ')') depth--
    else if (char === ';' && depth === 0) {
      result.push(value.slice(start, index))
      start = index + 1
    }
    if (depth < 0) return result
  }
  if (!quote && depth === 0) result.push(value.slice(start))
  return result
}

/** 仅保留受支持的内联排版；先校验声明结构，再校验属性及值。 */
export function sanitizeStyle(value: string): string {
  const styles = new Map<string, string>()
  for (const declaration of declarations(value)) {
    const colon = declaration.indexOf(':')
    if (colon < 0) continue
    const property = declaration.slice(0, colon).trim().toLowerCase()
    let content = declaration.slice(colon + 1).trim()
    if (!styleProperties.has(property) || !content || /[\\@{}<>!]|\/\*|url\s*\(|expression\s*\(/i.test(content)) continue
    // 字体名可以包含中文或引号内的分号，但不允许声明注入。
    if (property === 'font-family') {
      if (!/^(?:"[^"\\]*"|'[^'\\]*'|[\w\u0080-\uffff -]+)(?:\s*,\s*(?:"[^"\\]*"|'[^'\\]*'|[\w\u0080-\uffff -]+))*$/.test(content)) continue
    } else if (!/^[\w\s#.,%()+\-/'"]+$/.test(content)) continue
    if (
      Array.from(content.matchAll(/\b([a-z][a-z-]*)\s*\(/gi)).some(
        (match) => !['rgb', 'rgba', 'hsl', 'hsla', 'calc', 'var', 'min', 'max', 'clamp'].includes(match[1].toLowerCase())
      )
    )
      continue
    if (enums[property]) {
      content = content.toLowerCase()
      if (![...enums[property], 'inherit', 'initial', 'unset'].includes(content)) continue
    }
    styles.set(property, content)
  }
  return Array.from(styles, ([property, content]) => `${property}:${content};`).join('')
}

/** 获取最后一条真实声明，忽略字符串中的伪属性。 */
export function getStyleValue(value: string, property: string): string | undefined {
  let result: string | undefined
  for (const declaration of declarations(value)) {
    const colon = declaration.indexOf(':')
    if (declaration.slice(0, colon).trim().toLowerCase() === property) result = declaration.slice(colon + 1).trim()
  }
  return result
}
