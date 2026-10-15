/** 确定性合成样本，浏览器与宿主机共用；图片使用本地资源，排除外网波动。 */
const paragraph = '<p>沿着山路慢慢走，记录光线、树影和风的声音。<strong>停下来看看</strong>，再继续出发。</p>'
const image = '<img src="/static/icon/app.png" width="32" height="32" alt="本地图片">'
const rows = Array.from(
  { length: 120 },
  (_, row) =>
    `<tr>${Array.from(
      { length: 8 },
      (_, col) => `<td>${row + 1} 行 ${col + 1} 列${col === 7 ? '<a href="/detail">详情</a>' : ' · 行程安排'}</td>`
    ).join('')}</tr>`
).join('')

export const performanceSamples = [
  { id: 'article', title: '1000 段静态文章', html: paragraph.repeat(1000), enableAnchor: false },
  { id: 'images', title: '120 张图片与说明', html: `<p>图片说明</p>${image}`.repeat(120), enableAnchor: false },
  { id: 'table', title: '120 × 8 交互表格', html: `<table>${rows}</table>`, enableAnchor: false },
  {
    id: 'mixed',
    title: '120 组标题、图文与链接',
    html: Array.from(
      { length: 120 },
      (_, index) =>
        `<h2>章节 ${index + 1}</h2><p>出发之前<strong>准备行囊</strong>，查看<a href="/detail">路线说明</a>，再读一段手记。</p>${image}${paragraph}`
    ).join(''),
    enableAnchor: true
  }
] as const

export type PerformanceSample = (typeof performanceSamples)[number]

/** 同等规模替换，确保内容变化，排除 watch 跳过等值字符串的情况。 */
export function replacementContent(sample: PerformanceSample) {
  return sample.html.replace(/山路|图片说明|行程安排|准备行囊/g, '更新后的内容')
}
