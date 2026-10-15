import { getStyleValue } from './style'
import type { RichTextInputNode } from './types'
import { RichTextParseError, richTextLimits } from './limits'

type ElementNode = Extract<RichTextInputNode, { type: 'element' }>

/** 列布局只接受确定的 px / % 宽度；auto、CSS 变量等交给自动列处理。 */
function columnWidth(node: ElementNode): string | undefined {
  const style = getStyleValue(node.attrs?.style || '', 'width')
  const value = style ?? node.attrs?.width
  if (!value || !/^(?:\d+(?:\.\d+)?)(?:px|%)?$/.test(value)) return
  return /^\d+(?:\.\d+)?$/.test(value) ? `${value}px` : value
}
export interface RichTextTableCell {
  node: ElementNode
  row: number
  column: number
  rowSpan: number
  colSpan: number
  inheritedStyle: string
}

/** 将合并单元格转换为有限大小的网格坐标，保留行组边界，避免跨度覆盖后续单元格。 */
export function layoutTable(table: ElementNode) {
  const groups: ElementNode[][] = []
  const groupStyles = new WeakMap<ElementNode, string>()
  const captions: ElementNode[] = []
  let directRows: ElementNode[] = []
  /** 将连续的直属行收为独立行组，防止 rowspan 越过后续显式行组。 */
  const flush = () => {
    if (directRows.length) groups.push(directRows)
    directRows = []
  }
  for (const node of table.children || []) {
    if (node.type !== 'element') continue
    if (node.name === 'tr') directRows.push(node)
    else if (['thead', 'tbody', 'tfoot'].includes(node.name)) {
      flush()
      const rows = (node.children || []).filter((child): child is ElementNode => child.type === 'element' && child.name === 'tr')
      rows.forEach((row) => groupStyles.set(row, node.attrs?.style || ''))
      groups.push(rows)
    } else if (node.name === 'caption') captions.push(node)
  }
  flush()
  const cells: RichTextTableCell[] = []
  const occupied = new Set<string>()
  let rowOffset = captions.length
  let columns = 1
  let merged = false
  for (const rows of groups) {
    rows.forEach((row, index) => {
      let column = 1
      const rowNumber = rowOffset + index + 1
      for (const node of row.children || []) {
        if (node.type !== 'element' || !['td', 'th'].includes(node.name)) continue
        const colSpan = Number(node.attrs?.colspan || 1)
        const rowSpan = Math.min(Number(node.attrs?.rowspan || 1), rows.length - index)
        merged ||= colSpan > 1 || rowSpan > 1
        // 需要整段连续空位，不仅检查起始格，避免重叠的 rowspan/colspan。
        while (Array.from({ length: colSpan }, (_, offset) => occupied.has(`${rowNumber}:${column + offset}`)).some(Boolean)) column++
        for (let y = rowNumber; y < rowNumber + rowSpan; y++) {
          for (let x = column; x < column + colSpan; x++) {
            occupied.add(`${y}:${x}`)
            if (occupied.size > richTextLimits.nodes) throw new RichTextParseError('OUTPUT_LIMIT', 'Table layout exceeds 10000 occupied cells')
          }
        }
        const rowStyle = (groupStyles.get(row) || '') + (row.attrs?.style || '')
        const inheritedStyle = [
          'color',
          'background-color',
          'font-size',
          'font-family',
          'font-weight',
          'font-style',
          'line-height',
          'letter-spacing',
          'text-align',
          'white-space',
          'word-break',
          'overflow-wrap',
          'text-decoration'
        ]
          .map((property) => {
            const value = getStyleValue(rowStyle, property)
            return value ? `${property}:${value};` : ''
          })
          .join('')
        cells.push({ node, row: rowNumber, column, rowSpan, colSpan, inheritedStyle })
        columns = Math.max(columns, column + colSpan - 1)
        column += colSpan
      }
    })
    rowOffset += rows.length
  }
  const widths: (string | undefined)[] = Array.from({ length: columns })
  let columnIndex = 0
  let declaredColumns = 0
  /** 在列数预算内展开 col/span，优先使用自身宽度，缺省时继承列组宽度。 */
  const addColumns = (node: ElementNode, inheritedWidth?: string) => {
    const span = Number(node.attrs?.span || 1)
    declaredColumns += span
    // 原生 col/span 也会扩张表格，不能只限制交互网格的可见列。
    if (declaredColumns > richTextLimits.nodes) throw new RichTextParseError('OUTPUT_LIMIT', 'Table layout exceeds 10000 declared columns')
    // 只读取实际单元格使用到的列；多余列声明不能扩张布局或绕过节点预算。
    for (let i = 0; i < span && columnIndex < columns; i++) widths[columnIndex++] = columnWidth(node) ?? inheritedWidth
  }
  for (const node of table.children || []) {
    if (node.type !== 'element') continue
    if (node.name === 'col') addColumns(node)
    else if (node.name === 'colgroup') {
      const cols = (node.children || []).filter((child): child is ElementNode => child.type === 'element' && child.name === 'col')
      if (cols.length) cols.forEach((col) => addColumns(col, columnWidth(node)))
      else addColumns(node)
    }
  }
  // col 优先；缺失时使用该列第一个有确定宽度的单列单元格，不猜测 colspan 内部的比例。
  for (const cell of cells) {
    if (cell.colSpan === 1 && widths[cell.column - 1] === undefined) widths[cell.column - 1] = columnWidth(cell.node)
  }
  return { cells, columns, captions, merged, widths }
}
