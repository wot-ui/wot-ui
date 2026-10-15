/** 常用命名实体。名称区分大小写，仅显式列出的 HTML 大写别名可用。 */
const namedEntities: Readonly<Record<string, string>> = {
  amp: '&',
  AMP: '&',
  lt: '<',
  LT: '<',
  gt: '>',
  GT: '>',
  quot: '"',
  QUOT: '"',
  apos: '\u0027',
  nbsp: '\u00a0',
  ensp: '\u2002',
  emsp: '\u2003',
  thinsp: '\u2009',
  zwnj: '\u200c',
  zwj: '\u200d',
  lrm: '\u200e',
  rlm: '\u200f',
  semi: ';',
  ndash: '–',
  mdash: '—',
  middot: '·',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  laquo: '«',
  raquo: '»',
  bull: '•',
  hellip: '…',
  copy: '©',
  reg: '®',
  trade: '™',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  deg: '°',
  plusmn: '±',
  times: '×',
  divide: '÷',
  micro: 'µ',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  harr: '↔'
}

/** 保留 HTML 对旧 Windows-1252 数字引用的修正，例如 &#128; 显示为欧元符号。 */
const legacyCodePoints: Readonly<Record<number, number>> = {
  128: 0x20ac,
  130: 0x201a,
  131: 0x0192,
  132: 0x201e,
  133: 0x2026,
  134: 0x2020,
  135: 0x2021,
  136: 0x02c6,
  137: 0x2030,
  138: 0x0160,
  139: 0x2039,
  140: 0x0152,
  142: 0x017d,
  145: 0x2018,
  146: 0x2019,
  147: 0x201c,
  148: 0x201d,
  149: 0x2022,
  150: 0x2013,
  151: 0x2014,
  152: 0x02dc,
  153: 0x2122,
  154: 0x0161,
  155: 0x203a,
  156: 0x0153,
  158: 0x017e,
  159: 0x0178
}

/**
 * 单次解码带分号的常用命名实体及数字实体，文本与属性采用相同规则。
 * 未知、缺少分号或格式错误的实体保留原文；不重新扫描替换结果。
 */
export function decodeEntities(value: string): string {
  return value.replace(/&(#(?:[xX][\da-fA-F]+|\d+)|[a-zA-Z][a-zA-Z\d]*);/g, (entity, name: string) => {
    if (name[0] !== '#') return Object.prototype.hasOwnProperty.call(namedEntities, name) ? namedEntities[name] : entity
    const hex = name[1] === 'x' || name[1] === 'X'
    const codePoint = parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10)
    if (codePoint === 0 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) return '\ufffd'
    return String.fromCodePoint(legacyCodePoints[codePoint] ?? codePoint)
  })
}
