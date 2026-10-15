/** Data 图片只接受带正确文件签名、最大 64 KiB 的栅格图片；不接受 SVG 或 HTML。 */
function isDataImage(value: string): boolean {
  if (value.length > 87500) return false
  const match = /^data:image\/(png|jpeg|gif|webp);base64,([a-z\d+/]+={0,2})$/i.exec(value)
  if (!match || match[2].length % 4 !== 0) return false
  const data = match[2]
  const size = (data.length / 4) * 3 - (data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0)
  if (size > 65536) return false
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const bytes: number[] = []
  let bits = 0
  let buffer = 0
  for (const char of data.slice(0, 16)) {
    if (char === '=') break
    buffer = (buffer << 6) | alphabet.indexOf(char)
    bits += 6
    if (bits >= 8) {
      bits -= 8
      bytes.push((buffer >> bits) & 255)
    }
  }
  const startsWith = (signature: number[]) => signature.every((byte, index) => bytes[index] === byte)
  switch (match[1].toLowerCase()) {
    case 'png':
      return startsWith([137, 80, 78, 71, 13, 10, 26, 10])
    case 'jpeg':
      return startsWith([255, 216, 255])
    case 'gif':
      return startsWith([71, 73, 70, 56]) && [55, 57].includes(bytes[4]) && bytes[5] === 97
    case 'webp':
      return startsWith([82, 73, 70, 70]) && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
    default:
      return false
  }
}

/** 链接和资源分开校验；不依赖浏览器 URL 或 Node API。 */
export function sanitizeUrl(value: string, image = false, allowDataImage = false): string {
  const url = value.trim().replace(/ /g, '%20')
  if (image && allowDataImage && /^data:/i.test(url)) return isDataImage(url) ? url : ''
  const hasControl = Array.from(url).some((char) => char.charCodeAt(0) < 32 || (char.charCodeAt(0) >= 127 && char.charCodeAt(0) <= 159))
  if (!url || hasControl || /[\\<>]/.test(url)) return ''
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(url)?.[1].toLowerCase()
  if (scheme && !['http', 'https', ...(image ? [] : ['mailto', 'tel'])].includes(scheme)) return ''
  if (image && url[0] === '#') return ''
  return url
}

/** 只转换资源路径，href 保持业务路由语义。基址采用网页文件/目录的相对路径语义。 */
export function resolveResourceUrl(value: string, baseUrl = '', allowDataImage = false): string {
  const url = sanitizeUrl(value, true, allowDataImage)
  if (!url || !baseUrl || /^[a-z][a-z\d+.-]*:/i.test(url)) return url
  const base = /^(https?):\/\/([^/?#]+)([^?#]*)(?:\?[^#]*)?(?:#.*)?$/i.exec(sanitizeUrl(baseUrl, true))
  if (!base) return ''
  if (url.startsWith('//')) return sanitizeUrl(base[1] + ':' + url, true)
  const basePath = base[3] || '/'
  const suffixIndex = url.search(/[?#]/)
  const path = suffixIndex === -1 ? url : url.slice(0, suffixIndex)
  const suffix = suffixIndex === -1 ? '' : url.slice(suffixIndex)
  const resolved = path.startsWith('/') ? path : path ? basePath.slice(0, basePath.lastIndexOf('/') + 1) + path : basePath
  const segments: string[] = []
  const pieces = resolved.split('/')
  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i]
    const dot = piece.replace(/%2e/gi, '.')
    if (dot === '..') segments.pop()
    else if (dot !== '.') segments.push(piece)
    if (i === pieces.length - 1 && ['.', '..'].includes(dot)) segments.push('')
  }
  return sanitizeUrl(`${base[1]}://${base[2]}/${segments.join('/')}${suffix}`, true)
}

/** Data 图片可显示，但不自动交给跨端预览接口。 */
export const canPreviewImage = (src: string) => !!src && !/^data:/i.test(src)
