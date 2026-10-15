import { RichTextParseError, richTextLimits } from './limits'
import { sanitizeStyle, getStyleValue } from './style'
export { sanitizeStyle } from './style'
import { resolveResourceUrl, sanitizeUrl } from './resource'
export { sanitizeUrl } from './resource'
import { decodeEntities } from './entities'
export { decodeEntities } from './entities'
import type { RichTextInputNode, RichTextTag, RichTextParseOptions } from './types'

const tags = new Set(
  'div p h1 h2 h3 h4 h5 h6 span strong em u s sub sup a img ul ol li table colgroup col thead tbody tfoot tr td th br hr blockquote pre code mark small ins dl dt dd figure figcaption caption video audio source'.split(
    ' '
  )
)
const aliases: Record<string, string> = {
  b: 'strong',
  i: 'em',
  del: 's',
  strike: 's',
  section: 'div',
  article: 'div',
  header: 'div',
  footer: 'div',
  main: 'div',
  nav: 'div',
  aside: 'div',
  address: 'div'
}
const discarded = new Set('script style iframe object embed svg math head template canvas textarea title xmp plaintext'.split(' '))
const voidTags = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '))
const blocks = new Set('div p h1 h2 h3 h4 h5 h6 ul ol table blockquote pre hr dl dt dd figure figcaption caption video audio'.split(' '))
const editorStyles = new Map([
  ['ql-size-small', 'font-size:0.75em'],
  ['ql-size-large', 'font-size:1.5em'],
  ['ql-size-huge', 'font-size:2.5em'],
  ['ql-font-serif', 'font-family:Georgia, serif'],
  ['ql-font-monospace', 'font-family:monospace']
])

/** 解码并过滤属性，合并编辑器预设、用户映射与内联样式。 */
function parseAttributes(source: string, name: string, options: RichTextParseOptions): Record<string, string> {
  const attrs: Record<string, string> = {}
  let classes: string[] = []
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  let match: RegExpExecArray | null
  while ((match = pattern.exec(source))) {
    const key = match[1].toLowerCase()
    const value = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '')
    if (key === 'style') attrs.style = sanitizeStyle(value)
    else if (
      key === 'id' &&
      !['source', 'col', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'].includes(name) &&
      (options.enableAnchor || name === 'video' || name === 'audio') &&
      value &&
      value.length <= 128 &&
      !/\s/.test(value) &&
      !Array.from(value).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
    )
      attrs.id = value
    else if (key === 'original-src' && name === 'img') attrs[key] = resolveResourceUrl(value, options.baseUrl, options.allowDataImage)
    else if (key === 'data-preview' && name === 'img' && value === 'false') attrs[key] = 'false'
    else if (key === 'href' && name === 'a') attrs.href = sanitizeUrl(value)
    else if (key === 'src' && ['img', 'audio', 'video', 'source'].includes(name))
      attrs.src = resolveResourceUrl(value, options.baseUrl, name === 'img' && options.allowDataImage)
    else if (key === 'poster' && ['video', 'audio'].includes(name)) attrs.poster = resolveResourceUrl(value, options.baseUrl, options.allowDataImage)
    else if (key === 'title' && ['video', 'audio'].includes(name)) attrs.title = value
    else if (['loop', 'muted'].includes(key) && ['video', 'audio'].includes(name)) attrs[key] = 'true'
    else if (key === 'class') classes = value.split(/\s+/)
    else if (key === 'data-list' && name === 'li' && ['checked', 'unchecked'].includes(value)) attrs[key] = value
    else if (key === 'start' && name === 'ol' && /^-?\d{1,6}$/.test(value)) attrs.start = value
    else if (key === 'type' && name === 'ol' && ['1', 'a', 'A', 'i', 'I'].includes(value)) attrs.type = value
    else if (key === 'alt' && name === 'img') attrs.alt = value
    else if (['width', 'height'].includes(key) && /^(?:\d+(?:\.\d+)?)(?:px|%)?$/.test(value)) attrs[key] = value
    else if (['colspan', 'rowspan'].includes(key) && ['td', 'th'].includes(name) && /^[1-9]\d?$/.test(value)) attrs[key] = value
    else if (key === 'span' && ['col', 'colgroup'].includes(name) && /^[1-9]\d?$/.test(value)) attrs.span = value
  }
  const configured = [
    options.tagStyle?.[name],
    ...classes.map((token) => {
      const alignment = /^ql-align-(center|right|justify)$/.exec(token)?.[1]
      const indent = /^ql-indent-([1-8])$/.exec(token)?.[1]
      return [
        alignment ? `text-align:${alignment}` : '',
        indent ? `padding-left:${Number(indent) * 3}em` : '',
        editorStyles.get(token),
        Object.prototype.hasOwnProperty.call(options.classStyles || {}, token) ? options.classStyles?.[token] : ''
      ]
        .filter(Boolean)
        .join(';')
    }),
    attrs.style
  ]
    .filter(Boolean)
    .join(';')
  if (configured) attrs.style = sanitizeStyle(configured)
  return attrs
}

/**
 * 将 HTML 转为清洗后的节点树。处理常见缺失闭合标签，不模拟完整浏览器纠错。
 * 限制输入、节点数和嵌套深度，避免异常内容阻塞小程序逻辑线程。
 */
export function parseHtml(content: string, options: RichTextParseOptions = {}): RichTextInputNode[] {
  if (content.length > richTextLimits.input) throw new RichTextParseError('INPUT_LIMIT', 'HTML content exceeds 200000 characters')
  if (JSON.stringify([options.tagStyle, options.classStyles, options.baseUrl]).length > richTextLimits.input) {
    throw new RichTextParseError('INPUT_LIMIT', 'HTML parse options exceed 200000 characters')
  }
  const root: RichTextInputNode[] = []
  const stack: { name: string; children: RichTextInputNode[]; whiteSpace: string }[] = [{ name: '', children: root, whiteSpace: 'normal' }]
  let index = 0
  let count = 0
  let outputSize = 0
  /** 将节点加入当前父节点，并在写入前检查节点数与输出体积预算。 */
  function append(node: RichTextInputNode) {
    if (++count > richTextLimits.nodes) throw new RichTextParseError('NODE_LIMIT', 'HTML content exceeds 10000 nodes')
    outputSize += JSON.stringify(node).length
    if (outputSize > richTextLimits.output) throw new RichTextParseError('OUTPUT_LIMIT', 'HTML node data exceeds 2000000 characters')
    stack[stack.length - 1].children.push(node)
  }
  /** 解码文本并按继承的 white-space 规则折叠空白，保留预格式化内容。 */
  function text(value: string) {
    if (!value) return
    const whiteSpace = stack[stack.length - 1].whiteSpace
    let decoded = decodeEntities(value).replace(/\r\n?/g, '\n')
    if (whiteSpace === 'normal' || whiteSpace === 'nowrap') decoded = decoded.replace(/[\t\n\f ]+/g, ' ')
    else if (whiteSpace === 'pre-line') decoded = decoded.replace(/[\t\f ]+/g, ' ')
    append({ type: 'text', text: decoded })
  }
  /** 响应显式结束标签，关闭最近匹配的元素及其未闭合子元素。 */
  function close(name: string) {
    for (let i = stack.length - 1; i > 0; i--) {
      if (stack[i].name === name) {
        stack.length = i
        return
      }
    }
  }
  /** 补全可省略的结束标签；遇到容器边界即停止，避免关闭外层列表或表格。 */
  function closeWithin(names: string[], boundaries: string[]) {
    for (let i = stack.length - 1; i > 0; i--) {
      if (names.includes(stack[i].name)) {
        stack.length = i
        return
      }
      if (boundaries.includes(stack[i].name)) return
    }
  }
  while (index < content.length) {
    if (content[index] !== '<') {
      const next = content.indexOf('<', index)
      const end = next < 0 ? content.length : next
      text(content.slice(index, end))
      index = end
      continue
    }
    if (content.startsWith('<!--', index)) {
      const end = content.indexOf('-->', index + 4)
      index = end < 0 ? content.length : end + 3
      continue
    }
    if (/^<!|^<\?/.test(content.slice(index, index + 2))) {
      const end = content.indexOf('>', index + 2)
      index = end < 0 ? content.length : end + 1
      continue
    }
    const head = /^<(\/?)\s*([a-z][a-z\d:-]*)(?=[\s/>]|$)/i.exec(content.slice(index))
    if (!head) {
      text('<')
      index++
      continue
    }
    let end = index + head[0].length
    let quote = ''
    for (; end < content.length; end++) {
      const char = content[end]
      if (quote) {
        if (char === quote) quote = ''
      } else if (char === '"' || char.charCodeAt(0) === 39) quote = char
      else if (char === '>') break
    }
    if (end === content.length) {
      text(content.slice(index))
      break
    }
    const rawName = head[2].toLowerCase()
    const name = Object.prototype.hasOwnProperty.call(aliases, rawName) ? aliases[rawName] : rawName
    const rawAttrs = content.slice(index + head[0].length, end)
    index = end + 1
    if (head[1]) {
      close(name)
      continue
    }
    if (discarded.has(name)) {
      if (!voidTags.has(name)) {
        const closing = new RegExp(`</\\s*${name}\\s*>`, 'gi')
        closing.lastIndex = index
        const found = closing.exec(content)
        index = found ? closing.lastIndex : content.length
      }
      continue
    }
    if (name === 'source' && !['video', 'audio'].includes(stack[stack.length - 1].name)) continue
    if (name === 'col' && !['table', 'colgroup'].includes(stack[stack.length - 1].name)) continue
    if (name === 'colgroup') closeWithin(['colgroup'], ['table'])
    if (name === 'colgroup' && stack[stack.length - 1].name !== 'table') continue
    if (blocks.has(name)) closeWithin(['p'], ['div', 'li', 'td', 'th'])
    if (name === 'li') closeWithin(['li'], ['ul', 'ol'])
    // 表格分组允许省略结束标签，不能将后续行留在列组或前一个行组内。
    if (['thead', 'tbody', 'tfoot'].includes(name)) closeWithin(['colgroup', 'thead', 'tbody', 'tfoot'], ['table'])
    if (['tr', 'td', 'th', 'caption'].includes(name)) closeWithin(['colgroup'], ['table', 'tr'])
    if (name === 'tr') closeWithin(['tr'], ['table'])
    if (name === 'td' || name === 'th') closeWithin(['td', 'th'], ['tr', 'table'])
    if (name === 'a') closeWithin(['a'], [])
    const children: RichTextInputNode[] = []
    const attrs = parseAttributes(rawAttrs, name, options)
    const ownWhiteSpace = getStyleValue(attrs.style || '', 'white-space')
    const inheritedWhiteSpace = stack[stack.length - 1].whiteSpace
    const whiteSpace =
      ownWhiteSpace === 'initial'
        ? 'normal'
        : ownWhiteSpace && !['inherit', 'unset'].includes(ownWhiteSpace)
        ? ownWhiteSpace
        : name === 'pre'
        ? 'pre-wrap'
        : inheritedWhiteSpace
    if (tags.has(name)) append({ type: 'element', name: name as RichTextTag, attrs, children })
    // 未知标签仅去除包装；内容仍经过同一解析与清洗流程。
    if (!voidTags.has(name) && !/\/\s*$/.test(rawAttrs)) {
      if (stack.length > richTextLimits.depth) throw new RichTextParseError('DEPTH_LIMIT', 'HTML nesting exceeds 128 levels')
      stack.push({ name, children: tags.has(name) ? children : stack[stack.length - 1].children, whiteSpace })
    }
  }
  return root
}

/** 提取可读文本，保留段落、换行及图片替代文字。 */
export function getPlainText(nodes: RichTextInputNode[]): string {
  /** 递归提取节点文字，用换行和制表符保留段落及表格单元格边界。 */
  function visit(node: RichTextInputNode): string {
    if (node.type === 'text') return node.text
    if (node.name === 'br') return '\n'
    if (node.name === 'img') return node.attrs?.alt || ''
    const value = (node.children || []).map(visit).join('')
    return value + (blocks.has(node.name) || ['li', 'tr'].includes(node.name) ? '\n' : ['td', 'th'].includes(node.name) ? '\t' : '')
  }
  return nodes.map(visit).join('').trim()
}
