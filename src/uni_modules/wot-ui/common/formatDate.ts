/**
 * 轻量级日期格式化工具，用于替代 dayjs
 */

/**
 * 日期格式化函数，替代 dayjs.format()
 * @description 将日期格式化为指定格式的字符串
 * @param date 日期（时间戳或 Date 对象）
 * @param format 格式模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的字符串
 *
 * @example
 * formatDate(Date.now(), 'YYYY-MM-DD') // '2026-02-02'
 * formatDate(1706860800000, 'YYYY年MM月DD日') // '2026年02月02日'
 * formatDate(new Date(), 'HH:mm:ss') // '14:30:00'
 *
 * 支持的 tokens:
 * - YYYY: 4位年份
 * - YY: 2位年份
 * - MM: 2位月份（补零）
 * - M: 月份
 * - DD: 2位日期（补零）
 * - D: 日期
 * - HH: 2位小时（补零，24小时制）
 * - H: 小时（24小时制）
 * - mm: 2位分钟（补零）
 * - m: 分钟
 * - ss: 2位秒数（补零）
 * - s: 秒数
 */
export function formatDate(date: number | Date, format: string): string {
  const d = date instanceof Date ? date : new Date(date)

  // 检查日期是否有效
  if (isNaN(d.getTime())) {
    return 'Invalid Date'
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()

  // 定义 token 到值的映射（按长度降序排列以确保正确匹配）
  const tokens: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MM: String(month).padStart(2, '0'),
    M: String(month),
    DD: String(day).padStart(2, '0'),
    D: String(day),
    HH: String(hours).padStart(2, '0'),
    H: String(hours),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds)
  }

  // 按 token 长度降序排列，确保先匹配长 token（如 YYYY 优先于 YY）
  const pattern = Object.keys(tokens)
    .sort((a, b) => b.length - a.length)
    .join('|')

  return format.replace(new RegExp(pattern, 'g'), (match) => tokens[match] || match)
}
