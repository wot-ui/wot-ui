import { describe, expect, expectTypeOf, test, vi, beforeEach } from 'vitest'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import WdRichText from '../../src/uni_modules/wot-ui/components/wd-rich-text/wd-rich-text.vue'
import { compileRichText } from '../../src/uni_modules/wot-ui/components/wd-rich-text/transform'
import { parseHtml, decodeEntities, sanitizeStyle, sanitizeUrl } from '../../src/uni_modules/wot-ui/components/wd-rich-text/parser'
import type { RichTextExpose, RichTextInstance, RichTextProps, RichTextRenderNode } from '../../src/uni_modules/wot-ui/components/wd-rich-text/types'
import { staticContent, inlineContent, imageContent, tableContent, staticTableContent, longContent, listContent } from '../fixtures/rich-text'
import editorFixtures from '../fixtures/rich-text-editors.json'
import { columnTableContent, staticColumnTableContent } from '../fixtures/rich-text-tables'
import { getPlainText } from '../../src/uni_modules/wot-ui/components/wd-rich-text/parser'
import { layoutTable } from '../../src/uni_modules/wot-ui/components/wd-rich-text/table'

interface MockSelectorQuery {
  in: () => MockSelectorQuery
  select: (selector: string) => MockSelectorQuery
  selectViewport?: () => MockSelectorQuery
  boundingClientRect: (callback: (rect: unknown) => void) => MockSelectorQuery
  scrollOffset?: (callback: (offset: unknown) => void) => MockSelectorQuery
  exec: () => void
}

function flatten(nodes: RichTextRenderNode[]): RichTextRenderNode[] {
  return nodes.flatMap((node) => [node, ...flatten(node.children)])
}

test('RichTextInstance 区分组件属性与公开方法', () => {
  expectTypeOf<RichTextInstance['$props']>().toMatchTypeOf<RichTextProps>()
  expectTypeOf<RichTextInstance['playMedia']>().toEqualTypeOf<RichTextExpose['playMedia']>()
  expectTypeOf<RichTextInstance['getHeadings']>().toEqualTypeOf<RichTextExpose['getHeadings']>()
})

describe('编辑器正式导出内容兼容', () => {
  test.each(Object.entries(editorFixtures))('%s 导出的段落、链接和空行可解析，编辑器元数据不进入渲染树', (_, fixture) => {
    const input = parseHtml(fixture.html)
    const result = compileRichText(input)
    expect(getPlainText(input)).toContain('山野来信')
    expect(getPlainText(input)).toContain('慢下来，听见风。')
    expect(flatten(result.nodes).some((node) => node.kind === 'link' && node.href?.endsWith('journal/gear'))).toBe(true)
    expect(JSON.stringify(result)).not.toMatch(/data-language|data-list|data-href|contenteditable|target|noopener/)
  })
  test('Quill 字号字体、缩进、空段落、嵌套列表和任务状态均保留', () => {
    const result = compileRichText(parseHtml(editorFixtures.quill.html))
    const native = JSON.stringify(result.nodes[0].nativeNodes)
    expect(native).toContain('font-size:1.5em;')
    expect(native).toContain('font-family:Georgia, serif;')
    expect(native).toContain('padding-left:3em;')
    expect(native).toContain('min-height:1em;')
    expect(native).toContain('☑')
    expect(result.nodes[0].nativeNodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'ol',
          children: [expect.objectContaining({ name: 'li', children: expect.arrayContaining([expect.objectContaining({ name: 'ul' })]) })]
        })
      ])
    )
    expect(flatten(result.nodes).find((node) => node.name === 'li')?.marker).toBe('☐\u00a0')
    expect(getPlainText(parseHtml(editorFixtures.quill.html))).toContain('const trip = "weekend";')
  })
  test('wangEditor 图片尺寸、代码缩进，以及 TinyMCE 图注和列宽保留', () => {
    const wang = compileRichText(parseHtml(editorFixtures.wangEditor.html))
    expect(wang.images).toEqual(['/static/icon/app.png'])
    expect(flatten(wang.nodes).find((node) => node.kind === 'image')?.style).toContain('width:80px;height:80px;')
    expect(getPlainText(parseHtml(editorFixtures.wangEditor.html))).toContain('\n  go();')
    const tiny = compileRichText(parseHtml(editorFixtures.tinyMCE.html, { baseUrl: 'https://example.test/' }))
    expect(tiny.images).toEqual(['https://example.test/static/icon/app.png'])
    expect(getPlainText(parseHtml(editorFixtures.tinyMCE.html))).toContain('01 / 在路上')
    expect(flatten(tiny.nodes).find((node) => node.kind === 'table')?.tableStyle).toContain('grid-template-columns:25% 75%')
  })
  test('编辑器预设遵循配置与内联样式优先级，未知类和危险样式仍过滤', () => {
    const input = parseHtml('<p class="ql-size-large ql-font-monospace constructor" style="font-size:18px;position:fixed">A</p>', {
      classStyles: { 'ql-size-large': 'font-size:20px;background-image:url(javascript:x)' }
    })
    expect(input).toMatchObject([{ attrs: { style: 'font-size:18px;font-family:monospace;' } }])
    expect(parseHtml('<p class="ql-size-small">A</p><p class="ql-size-huge">B</p>')).toMatchObject([
      { attrs: { style: 'font-size:0.75em;' } },
      { attrs: { style: 'font-size:2.5em;' } }
    ])
  })
})

describe('表格列宽与长文本', () => {
  const table = (content: string) => {
    const node = parseHtml(content)[0]
    if (node.type !== 'element') throw new Error('Expected a table')
    return node
  }
  test('省略列组、行组、行和单元格的结束标签时，保留全部行及列宽', () => {
    for (const content of ['A', '<a href="/a">A</a>']) {
      const node = table(
        `<table><colgroup><col width="30%"><col width="70%"><thead><tr><th>标题<th>说明<tbody><tr><td>${content}<td>B<tfoot><tr><td>C<td>D</table>`
      )
      expect(node.children?.map((child) => child.type === 'element' && child.name)).toEqual(['colgroup', 'thead', 'tbody', 'tfoot'])
      const layout = layoutTable(node)
      expect(layout.widths).toEqual(['30%', '70%'])
      expect(layout.cells.map((cell) => getPlainText([cell.node]))).toEqual(['标题', '说明', 'A', 'B', 'C', 'D'])
      expect(layout.cells.map((cell) => cell.row)).toEqual([1, 1, 2, 2, 3, 3])
      expect(JSON.stringify(compileRichText([node]))).toContain('说明')
      expect(JSON.stringify(compileRichText([node]))).toContain('D')
    }
  })
  test.each(['tr', 'td', 'th', 'caption'])('%s 开始时闭合未结束的 colgroup', (tag) => {
    const node = table(`<table><colgroup><col><${tag}>A</${tag}></table>`)
    expect(node.children?.map((child) => child.type === 'element' && child.name)).toEqual(['colgroup', tag])
  })
  test('连续 colgroup 省略闭合标签时仍保留各组列宽', () => {
    const node = table('<table><colgroup><col width="30%"><colgroup><col width="70%"><tr><td>A<td>B</table>')
    expect(layoutTable(node).widths).toEqual(['30%', '70%'])
    expect(layoutTable(node).cells).toHaveLength(2)
  })
  test('嵌套表格的行组自动闭合不能越过当前 table', () => {
    const node = table('<table><tbody><tr><td><table><colgroup><col><tbody><tr><td>内层</table></td></tr><tr><td>外层</table>')
    expect(layoutTable(node).cells.map((cell) => getPlainText([cell.node]))).toEqual(['内层', '外层'])
    expect(node.children).toHaveLength(1)
  })
  test('原生路径保留列节点，交互路径保留同一列比例与合并关系，不修改输入', () => {
    const input = parseHtml(columnTableContent)
    const before = JSON.stringify(input)
    const grid = compileRichText(input).nodes[0]
    expect(grid.tableStyle).toContain('grid-template-columns:25% 75%')
    expect(grid.children[0].style).toContain('grid-column:1 / span 2')
    expect(grid.children[1].style).toContain('grid-row:2 / span 2')
    expect(grid.children[2].style).toContain('width:auto;min-width:0;')
    expect(grid.tableStyle).toContain('overflow-wrap:anywhere')
    expect(JSON.stringify(input)).toBe(before)
    const native = compileRichText(parseHtml(staticColumnTableContent)).nodes[0].nativeNodes
    expect(JSON.stringify(native)).toContain('colgroup')
    expect(JSON.stringify(native)).toContain('width:25%')
    expect(JSON.stringify(native)).toContain('table-layout:fixed')
  })
  test('col 优先，span 展开，缺失列取首个有效单列单元格，跨列宽度不猜测', () => {
    const layout = layoutTable(
      table(
        '<table><colgroup><col width="80" span="2"><col></colgroup><tr><td width="500">A</td><td>B</td><td style="width:40%">C</td><td>D</td></tr><tr><td colspan="4" width="900">E</td></tr></table>'
      )
    )
    expect(layout.widths).toEqual(['80px', '80px', '40%', undefined])
    expect(
      layoutTable(table('<table><colgroup span="2" width="30%"></colgroup><tr><td>A</td><td>B</td><td width="120">C</td></tr></table>')).widths
    ).toEqual(['30%', '30%', '120px'])
    expect(layoutTable(table('<table><colgroup width="30%"><col><col width="20%"></colgroup><tr><td>A</td><td>B</td></tr></table>')).widths).toEqual([
      '30%',
      '20%'
    ])
  })
  test('按最终 width 声明取值，auto 与不确定单位回落，缺失列自动分配', () => {
    const node = table(
      '<table><col width="50" style="width:auto"><col style="width:calc(100% - 2px)"><tr><td style="width:20%;width:30%">A<a href="/x">链接</a></td><td style="width:4em">B</td></tr></table>'
    )
    expect(layoutTable(node).widths).toEqual(['30%', undefined])
    expect(compileRichText([node]).nodes[0].tableStyle).toContain('grid-template-columns:30% minmax(0,1fr)')
    expect(sanitizeStyle('table-layout:fixed;table-layout:invalid')).toBe('table-layout:fixed;')
    expect(
      compileRichText(parseHtml('<table style="display:none"><col width="80"><tr><td><a href="/">隐藏表格</a></td></tr></table>')).nodes[0].tableStyle
    ).toContain(';display:none;grid-template-columns:80px;')
  })
  test('嵌套表格列宽互不污染，多余列定义不创建可见组件或锚点', () => {
    const input = parseHtml(
      '<table><colgroup id="hidden" span="99" width="20%"></colgroup><tr><td><a href="/a">A</a><table><col width="40"><tr><td><a href="/b">B</a></td></tr></table></td></tr></table>',
      { enableAnchor: true }
    )
    const tables = flatten(compileRichText(input, true).nodes).filter((node) => node.kind === 'table')
    expect(tables.map((node) => node.tableStyle?.match(/grid-template-columns:([^;]+)/)?.[1])).toEqual(['20%', '40px'])
    expect(JSON.stringify(tables)).not.toContain('hidden')
    expect(parseHtml('<col width="20"><p>正文</p>')).toMatchObject([{ name: 'p' }])
  })
  test('行列扩张仍受资源预算约束，列节点与属性经过统一清洗', () => {
    for (const content of ['A', '<a href="/">A</a>']) {
      expect(() =>
        compileRichText(parseHtml('<table><colgroup>' + '<col span="99">'.repeat(102) + `</colgroup><tr><td>${content}</td></tr></table>`))
      ).toThrow(expect.objectContaining({ code: 'OUTPUT_LIMIT' }))
    }
    expect(() =>
      compileRichText(
        parseHtml('<table><tr><td rowspan="99" colspan="99"><a href="/">A</a></td></tr>' + '<tr><td colspan="99">B</td></tr>'.repeat(99) + '</table>')
      )
    ).toThrow(expect.objectContaining({ code: 'OUTPUT_LIMIT' }))
    expect(
      parseHtml('<table><colgroup onclick="x"><col span="999999" width="javascript:x" style="width:expression(x);position:fixed"></colgroup></table>')
    ).toMatchObject([{ children: [{ attrs: {}, children: [{ attrs: { style: '' } }] }] }])
  })
})

describe('RichText 渲染决策', () => {
  test('静态段落整体合并且不修改输入', () => {
    const before = JSON.stringify(staticContent)
    const result = compileRichText(parseHtml(staticContent))
    expect(result.nodes).toHaveLength(1)
    expect(result.nodes[0].nativeNodes).toHaveLength(3)
    expect(JSON.stringify(staticContent)).toBe(before)
    expect(compileRichText(parseHtml(longContent)).nodes).toHaveLength(1)
  })
  test('交互段落展开祖先，保持文字、链接、文字的顺序', () => {
    const paragraph = compileRichText(parseHtml(inlineContent)).nodes[0]
    expect(paragraph.kind).toBe('element')
    expect(paragraph.children.map((node) => node.kind)).toEqual(['text', 'link', 'text'])
    expect(paragraph.children[1].href).toBe('/pages/detail')
  })
  test('重复图片保留出现顺序，列表内交互不丢失', () => {
    const result = compileRichText(parseHtml(imageContent))
    expect(result.images).toEqual(['/static/icon/app.png', '/static/icon/app.png'])
    expect(
      flatten(result.nodes)
        .filter((node) => node.kind === 'image')
        .map((node) => node.imageIndex)
    ).toEqual([0, 1])
    expect(flatten(compileRichText(parseHtml(listContent)).nodes).filter((node) => node.kind === 'link')).toHaveLength(2)
  })
  test('静态表格保留原生节点，交互表格展开单元格', () => {
    expect(compileRichText(parseHtml(staticTableContent)).nodes[0].nativeNodes?.[0]).toHaveProperty('name', 'table')
    const interactive = compileRichText(parseHtml(tableContent)).nodes[0]
    expect(interactive.nativeNodes).toBeUndefined()
    expect(flatten([interactive]).filter((node) => node.kind === 'image')).toHaveLength(1)
    expect(flatten([interactive]).filter((node) => node.kind === 'link')).toHaveLength(1)
  })
  test('点击链接只发一次事件且不丢失内容', async () => {
    const wrapper = mount(WdRichText, { global: { stubs: { 'rich-text': true } }, props: { previewImage: false, content: inlineContent } })
    await wrapper.find('.wd-rich-text__link').trigger('tap')
    expect(wrapper.emitted('link-click')).toEqual([[{ href: '/pages/detail' }]])
    expect(wrapper.text()).toContain('前文行内链接后文')
    wrapper.unmount()
  })
  test('图片链接只发链接事件，多实例不串扰', async () => {
    const first = mount(WdRichText, { global: { stubs: { 'rich-text': true } }, props: { previewImage: false, content: imageContent } })
    const second = mount(WdRichText, { global: { stubs: { 'rich-text': true } }, props: { previewImage: false, content: imageContent } })
    await first.findAll('.wd-rich-text__image-box')[1].trigger('tap')
    expect(first.emitted('link-click')).toEqual([[{ href: '/pages/image-detail' }]])
    expect(first.emitted('image-click')).toBeUndefined()
    expect(second.emitted('link-click')).toBeUndefined()
    first.unmount()
    second.unmount()
  })
  test('图片失败状态在内容替换后复位，清空时无残留节点', async () => {
    const wrapper = mount(WdRichText, {
      global: { stubs: { 'rich-text': true } },
      props: { previewImage: false, content: imageContent },
      slots: { default: '空内容' }
    })
    await wrapper.find('.wd-rich-text__image').trigger('error')
    expect(wrapper.find('.is-error').exists()).toBe(true)
    await wrapper.setProps({ content: imageContent + ' ' })
    expect(wrapper.find('.is-error').exists()).toBe(false)
    await wrapper.setProps({ content: '' })
    expect(wrapper.find('.wd-rich-text__image').exists()).toBe(false)
    expect(wrapper.text()).toBe('空内容')
    wrapper.unmount()
  })
})

describe('HTML 解析与内容清洗', () => {
  test('大小写、引号内大于号、别名、实体与 Unicode', () => {
    const nodes = parseHtml('<P title="a>b">A &amp; B &#x1f600; <B>粗体</B><br/>尾部</P>')
    expect(nodes).toMatchObject([
      { name: 'p', children: [{ text: 'A & B 😀 ' }, { name: 'strong', children: [{ text: '粗体' }] }, { name: 'br' }, { text: '尾部' }] }
    ])
    expect(decodeEntities('&lt;&#0;&#xD800;&#1114112;&unknown;')).toBe('<���&unknown;')
    expect(decodeEntities('&constructor;')).toBe('&constructor;')
  })
  test('未闭合标签、未知包装和无效尖括号仍保留文字', () => {
    expect(parseHtml('<widget><p>一<p>二</widget>')).toMatchObject([
      { name: 'p', children: [{ text: '一' }] },
      { name: 'p', children: [{ text: '二' }] }
    ])
    expect(parseHtml('1 < 2')).toEqual([
      { type: 'text', text: '1 ' },
      { type: 'text', text: '<' },
      { type: 'text', text: ' 2' }
    ])
    expect(parseHtml('<p title="unfinished')).toEqual([{ type: 'text', text: '<p title="unfinished' }])
  })
  test('自动闭合列表项和表格单元格，保留静态合并单元格', () => {
    const tree = parseHtml('<ul><li>一<li>二</ul><table><tr><td colspan=2>一<td>二<tr><td>三</table>')
    expect(tree[0]).toMatchObject({ children: [{ name: 'li' }, { name: 'li' }] })
    expect(tree[1]).toMatchObject({ children: [{ name: 'tr', children: [{ attrs: { colspan: '2' } }, { name: 'td' }] }, { name: 'tr' }] })
  })
  test('脚本、样式、嵌入内容和事件属性不能进入渲染树', () => {
    const result = parseHtml(
      '<!doctype html><!--comment--><script>attack()</script><style>body{display:none}</style><iframe>hidden</iframe><svg><a>hidden</a></svg><p onclick="attack()" class="external" id="global">可见</p>'
    )
    expect(result).toEqual([{ type: 'element', name: 'p', attrs: {}, children: [{ type: 'text', text: '可见' }] }])
    expect(parseHtml('<script>unclosed<p>hidden')).toEqual([])
    expect(parseHtml('<!--unclosed')).toEqual([])
  })
  test.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'java\nscript:alert(1)',
    '/images/a\u0000b.png',
    '/images/a\u007fb.png',
    '/images/a\u0085b.png',
    'data:text/html,test',
    'vbscript:test',
    'file:///tmp/test',
    '\\evil.test'
  ])('拒绝协议或控制字符：%s', (url) => {
    expect(sanitizeUrl(url)).toBe('')
  })
  test('普通 URL 空格编码为 %20，实体空格和资源基址保持一致', () => {
    expect(sanitizeUrl(' /uploads/my photo.jpg ', true)).toBe('/uploads/my%20photo.jpg')
    expect(sanitizeUrl('https://example.test/my%20photo.jpg', true)).toBe('https://example.test/my%20photo.jpg')
    expect(sanitizeUrl('/search?q=hello world')).toBe('/search?q=hello%20world')
    expect(parseHtml('<img src="my&#32;photo.jpg"><a href="/my page">链接</a>', { baseUrl: 'https://example.test/photo album/' })).toMatchObject([
      { attrs: { src: 'https://example.test/photo%20album/my%20photo.jpg' } },
      { attrs: { href: '/my%20page' } }
    ])
    expect(sanitizeUrl('java script:alert(1)')).toBe('java%20script:alert(1)')
  })
  test('解码之后检查地址协议，样式函数和全局定位被过滤', () => {
    expect(
      parseHtml(
        '<a href="java&#x73;cript&#58;alert(1)" style="color:red;position:fixed;z-index:9;background-image:url(https://a);width:expression(alert(1))">内容</a>'
      )
    ).toMatchObject([{ attrs: { href: '', style: 'color:red;' } }])
    expect(sanitizeStyle('COLOR:rgb(1, 2, 3);font-size:16px;width:calc(100% - 2px);color:var(--article-color);display:flex;')).toBe(
      'color:var(--article-color);font-size:16px;width:calc(100% - 2px);'
    )
    expect(sanitizeStyle('color:e\\78pression(foo);width:/*x*/100px;behavior:url(a);font-size:20px!important;')).toBe('')
    expect(sanitizeUrl('mailto:a@example.com')).toBe('mailto:a@example.com')
    expect(sanitizeUrl('mailto:a@example.com', true)).toBe('')
    expect(sanitizeUrl('/static/a.png', true)).toBe('/static/a.png')
    expect(sanitizeUrl('https://example.com/a.png', true)).toBe('https://example.com/a.png')
    expect(sanitizeUrl('#section', true)).toBe('')
  })
  test('普通空白折叠，pre 内保留换行与缩进', () => {
    expect(parseHtml('<p>A\n  B</p><pre> A\n  B</pre>')).toMatchObject([{ children: [{ text: 'A B' }] }, { children: [{ text: ' A\n  B' }] }])
  })
  test('异常体量和嵌套深度明确报错', () => {
    expect(() => parseHtml('a'.repeat(200001))).toThrow('200000')
    expect(() => parseHtml('<span>'.repeat(129))).toThrow('128')
    expect(() => parseHtml('<br>'.repeat(10001))).toThrow('10000')
  })
  test('嵌套静态表格保留独立滚动容器，块间空白不阻止合并', () => {
    const nodes = compileRichText(parseHtml('<div><table><tr><td>A</td></tr></table></div>')).nodes
    expect(nodes[0].children[0].kind).toBe('table')
    expect(nodes[0].children[0].nativeNodes).toBeDefined()
    expect(compileRichText(parseHtml('<p>A</p>\n<p>B</p>')).nodes).toHaveLength(1)
  })
})

describe('RichText 正式 API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    uni.previewImage = vi.fn()
  })
  const global = { stubs: { 'rich-text': true } }
  test('交互表格控制递归实例数量，文字选择切换、实体及链接更新正常', async () => {
    const content = '<table>' + '<tr><td>文字 &amp; 实体</td><td><a href="/detail">查看<strong>详情</strong></a></td></tr>'.repeat(40) + '</table>'
    const wrapper = mount(WdRichText, { global, props: { content, selectable: true } })
    // 40 行各保留行、两个单元格、链接、加粗，共 200 个实例；文本不另占实例。
    expect(wrapper.findAllComponents({ name: 'wd-rich-text-node' }).length).toBeLessThanOrEqual(201)
    expect(wrapper.find('.wd-rich-text__td').text()).toBe('文字 & 实体')
    expect(wrapper.findAll('.wd-rich-text__text').every((node) => node.attributes('selectable') === 'true')).toBe(true)
    await wrapper.setProps({ selectable: false })
    expect(wrapper.findAll('.wd-rich-text__text').every((node) => node.attributes('selectable') === 'false')).toBe(true)
    await wrapper.setProps({ content: content.replaceAll('/detail', '/updated').replaceAll('详情', '新内容') })
    await wrapper.find('.wd-rich-text__link').trigger('tap')
    expect(wrapper.emitted('link-click')).toEqual([[{ href: '/updated' }]])
    expect(wrapper.find('.wd-rich-text__strong').text()).toBe('新内容')
    wrapper.unmount()
  })
  test('默认空内容、样式透传和 getText', async () => {
    const wrapper = mount(WdRichText, { global, props: { customClass: 'article', customStyle: 'color: red;' }, slots: { default: '暂无内容' } })
    expect(wrapper.text()).toBe('暂无内容')
    expect(wrapper.classes()).toContain('article')
    expect(wrapper.attributes('style')).toContain('color: red')
    await wrapper.setProps({ content: '<p>第一行<br>第二行<img src="/x" alt="图示"></p><script>隐藏</script>', selectable: true })
    expect(wrapper.vm.getText()).toBe('第一行\n第二行图示')
    expect(wrapper.classes()).toContain('is-selectable')
    expect(wrapper.find('.wd-rich-text__break').exists()).toBe(true)
    wrapper.unmount()
  })
  test('普通图片默认预览，重复 URL 保留点击索引，关闭预览仍发事件', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: imageContent } })
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(uni.previewImage).toHaveBeenCalledWith({ urls: ['/static/icon/app.png', '/static/icon/app.png'], current: 0 })
    await wrapper.setProps({ previewImage: false })
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(uni.previewImage).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('image-click')).toHaveLength(2)
    await wrapper.findAll('.wd-rich-text__image-box')[1].trigger('tap')
    expect(uni.previewImage).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('link-click')).toHaveLength(1)
    wrapper.unmount()
  })
  test('链接协议被过滤后不触发导航，图片仍按普通图片预览', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<a href="javascript:alert(1)">文字<img src="/a.png"></a>' } })
    await wrapper.find('.wd-rich-text__link').trigger('tap')
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(wrapper.emitted('link-click')).toBeUndefined()
    expect(uni.previewImage).toHaveBeenCalledWith({ urls: ['/a.png'], current: 0 })
    wrapper.unmount()
  })
  test('图片失败上报一次，懒加载属性与尺寸透传', async () => {
    const wrapper = mount(WdRichText, {
      global,
      props: { content: '<img src="/missing.png" width="100" height="60" alt="无法加载">', lazyLoad: true }
    })
    const image = wrapper.find('.wd-rich-text__image')
    expect(image.attributes('loading')).toBe('lazy')
    expect(wrapper.find('.wd-rich-text__image-box').attributes('style')).toContain('width: 100px')
    await image.trigger('error')
    expect(wrapper.text()).toBe('无法加载')
    expect(wrapper.emitted('error')).toEqual([[{ source: 'image', src: '/missing.png', index: 0 }]])
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(uni.previewImage).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  test('内容完成事件区分解析错误，清空旧内容及提取文本', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<p>旧内容</p>' } })
    await flushPromises()
    expect(wrapper.emitted('load')).toEqual([[{ imageCount: 0 }]])
    await wrapper.setProps({ content: '<span>'.repeat(129) })
    await flushPromises()
    expect(wrapper.emitted('error')?.[0]).toEqual([{ source: 'parse', message: 'HTML nesting exceeds 128 levels', code: 'DEPTH_LIMIT' }])
    expect(wrapper.vm.getText()).toBe('')
    expect(wrapper.find('.wd-rich-text__static').exists()).toBe(false)
    await wrapper.setProps({ content: imageContent })
    await flushPromises()
    expect(wrapper.emitted('load')?.at(-1)).toEqual([{ imageCount: 2 }])
    wrapper.unmount()
  })
})

describe('RichText 跨渲染路径基础兼容', () => {
  test('原生白名单之外的排版标签转换后保留子内容及样式', () => {
    const result = compileRichText(parseHtml('<p><u>下划线</u><s>删除线</s></p><pre><code> A\n  B</code></pre>'))
    expect(result.nodes[0].nativeNodes).toMatchObject([
      {
        name: 'p',
        children: [
          { name: 'span', attrs: { style: expect.stringContaining('text-decoration:underline') }, children: [{ text: '下划线' }] },
          { name: 'span', attrs: { style: expect.stringContaining('text-decoration:line-through') }, children: [{ text: '删除线' }] }
        ]
      },
      {
        name: 'div',
        attrs: { style: expect.stringContaining('white-space:pre-wrap') },
        children: [{ name: 'code', children: [{ text: ' A\n  B' }] }]
      }
    ])
  })
  test('轻量实体解码保留未知名称与字面实体，校正非法数字引用', () => {
    expect(decodeEntities('&AMP; &NotEqualTilde; &#x1f600; &#x80; &amp;lt;')).toBe('& &NotEqualTilde; 😀 € &lt;')
    expect(parseHtml('<a href="https://a.test/?x=&notit=1">&notit;</a>')).toMatchObject([
      { attrs: { href: 'https://a.test/?x=&notit=1' }, children: [{ text: '&notit;' }] }
    ])
    const tree = compileRichText(parseHtml('<p>&amp;lt; &amp;amp; &lt;</p><p><a href="/x">&amp;lt; &amp;amp; &lt;</a></p>'))
    expect(tree.nodes[0].nativeNodes?.[0]).toMatchObject({ children: [{ text: '&amp;lt; &amp;amp; <' }] })
    expect(tree.nodes[1].children[0].children[0].text).toBe('&lt; &amp; <')
  })
  test('常用命名实体覆盖标点、空格、货币和箭头，名称严格区分大小写', () => {
    expect(decodeEntities('&amp;&lt;&gt;&quot;&apos;&AMP;&LT;&GT;&QUOT;')).toBe('&<>"\'&<>"')
    expect(decodeEntities('&nbsp;&ensp;&emsp;&thinsp;')).toBe('\u00a0\u2002\u2003\u2009')
    expect(decodeEntities('&copy;&reg;&trade;&yen;&euro;&hellip;&mdash;&ldquo;&rdquo;&larr;&rarr;&times;&divide;')).toBe('©®™¥€…—“”←→×÷')
    expect(decodeEntities('&Amp;&COPY;&constructor;&toString;&NotEqualTilde;')).toBe('&Amp;&COPY;&constructor;&toString;&NotEqualTilde;')
  })
  test('实体必须以分号结束，错误数字格式保留原文且不重复解码', () => {
    const malformed = '&amp &copy &#65 &#x41 &#; &#x; &#-1; &#12oops; &#xGG; &notit;'
    expect(decodeEntities(malformed)).toBe(malformed)
    expect(decodeEntities('&amp;copy; &#38;lt; &amp;#65; &amp;amp;')).toBe('&copy; &lt; &#65; &amp;')
  })
  test('数字引用支持完整 Unicode 码点、十六进制大小写及异常边界', () => {
    expect(decodeEntities('&#20013;&#x4e2d;&#X1F600;&#128512;')).toBe('中中😀😀')
    expect(decodeEntities('&#xD7FF;&#xE000;&#x10FFFF;')).toBe('\ud7ff\ue000\u{10ffff}')
    expect(decodeEntities('&#0;&#xD800;&#xDFFF;&#x110000;')).toBe('����')
    expect(decodeEntities(`&#${'9'.repeat(400)};`)).toBe('�')
    expect(decodeEntities('&#128;&#x80;&#x91;')).toBe('€€‘')
  })
  test('属性同样只解码一次，并在解码后校验地址；编码标签保持文本', () => {
    expect(parseHtml('<a href="https://a.test/?x=1&amp;y=2&amp;copy;&copy;">&lt;img&gt;</a>')).toMatchObject([
      { attrs: { href: 'https://a.test/?x=1&y=2&copy;©' }, children: [{ type: 'text', text: '<img>' }] }
    ])
    expect(parseHtml('<a href="java&#x73;cript&#58;alert(1)">链接</a>')).toMatchObject([{ attrs: { href: '' } }])
    expect(parseHtml('<img alt="&NotEqualTilde; &#x1f600; &amp;lt;">')).toMatchObject([{ attrs: { alt: '&NotEqualTilde; 😀 &lt;' } }])
  })
  test('white-space 遵循继承及子节点覆盖，不提前丢失排版空白', () => {
    const nodes = parseHtml(
      '<div style="white-space:pre-wrap"> A\n  <span>B\n C</span><span style="white-space:normal">D\n  E</span></div><pre style="white-space:normal">F\n  G</pre><p style="white-space:pre-line">H\n  I</p>'
    )
    expect(nodes).toMatchObject([
      { children: [{ text: ' A\n  ' }, { children: [{ text: 'B\n C' }] }, { children: [{ text: 'D E' }] }] },
      { children: [{ text: 'F G' }] },
      { children: [{ text: 'H\n I' }] }
    ])
  })
})

describe('RichText 常用内容扩展', () => {
  const pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WxoAAAAASUVORK5CYII='
  const global = { stubs: { 'rich-text': true } }
  test('资源基址支持目录、文件、父路径、查询及协议相对地址，保留业务 href', () => {
    const nodes = parseHtml('<img src="../a.png"><img src="/root.png"><img src="?v=2"><img src="//cdn.test/a.png"><a href="/pages/detail">详情</a>', {
      baseUrl: 'https://example.test/articles/page.html?v=1'
    })
    expect(nodes).toMatchObject([
      { attrs: { src: 'https://example.test/a.png' } },
      { attrs: { src: 'https://example.test/root.png' } },
      { attrs: { src: 'https://example.test/articles/page.html?v=2' } },
      { attrs: { src: 'https://cdn.test/a.png' } },
      { attrs: { href: '/pages/detail' } }
    ])
    expect(parseHtml('<img src="./a.png">', { baseUrl: 'https://example.test/articles/' })).toMatchObject([
      { attrs: { src: 'https://example.test/articles/a.png' } }
    ])
    expect(parseHtml('<img src="a.png">', { baseUrl: 'javascript:bad' })).toMatchObject([{ attrs: { src: '' } }])
  })
  test('Base64 图片必须显式开启，并验证类型、文件签名及大小', () => {
    expect(sanitizeUrl(pixel, true)).toBe('')
    expect(sanitizeUrl(pixel, true, true)).toBe(pixel)
    expect(sanitizeUrl('data:image/svg+xml;base64,PHN2Zz4=', true, true)).toBe('')
    expect(sanitizeUrl('data:image/png;base64,PHNjcmlwdD4=', true, true)).toBe('')
    expect(
      sanitizeUrl('data:image/jpeg;base64,' + Buffer.concat([Buffer.from([255, 216, 255]), Buffer.alloc(65534)]).toString('base64'), true, true)
    ).toBe('')
  })
  test('Data 图片点击仍发事件，原生预览仅包含可预览地址且索引对应', async () => {
    uni.previewImage = vi.fn()
    const wrapper = mount(WdRichText, { global, props: { allowDataImage: true, content: `<img src="${pixel}"><img src="/network.png">` } })
    await wrapper.findAll('.wd-rich-text__image-box')[0].trigger('tap')
    expect(wrapper.emitted('image-click')?.[0]).toEqual([{ src: pixel, index: 0 }])
    expect(uni.previewImage).not.toHaveBeenCalled()
    await wrapper.findAll('.wd-rich-text__image-box')[1].trigger('tap')
    expect(uni.previewImage).toHaveBeenCalledWith({ urls: ['/network.png'], current: 0 })
    wrapper.unmount()
  })
  test('默认样式、编辑器 class、显式 class 映射和内联样式按优先级合并且仍清洗', () => {
    expect(
      parseHtml('<p class="ql-align-center custom" style="color:green">正文</p>', {
        tagStyle: { p: 'color:red;line-height:2' },
        classStyles: { custom: 'color:blue;font-size:18px;position:fixed' }
      })
    ).toMatchObject([{ attrs: { style: 'color:green;line-height:2;text-align:center;font-size:18px;' } }])
    expect(parseHtml('<div class="ql-indent-2">缩进</div>')).toMatchObject([{ attrs: { style: 'padding-left:6em;' } }])
    expect(sanitizeStyle('font-family:"A;B", "宋体";white-space:PRE-WRAP;display:flex;color:red')).toBe(
      'font-family:"A;B", "宋体";white-space:pre-wrap;color:red;'
    )
    expect(parseHtml('<p style="font-family:\'a;white-space:pre\'">A\n B</p>')).toMatchObject([{ children: [{ text: 'A B' }] }])
    expect(sanitizeStyle('color:rgb(1,2,3;display:none')).toBe('')
  })
  test('新增语义标签转换为原生允许节点，保留排版和列表属性', () => {
    const result = compileRichText(
      parseHtml(
        '<figure><figcaption><mark>标题</mark><small>小字</small><ins>新增</ins></figcaption></figure><dl><dt>术语</dt><dd>定义</dd></dl><ol start="3" type="A"><li>第三项</li></ol>'
      )
    )
    expect(result.nodes[0].nativeNodes).toMatchObject([
      { name: 'div', children: [{ name: 'div', children: [{ name: 'span' }, { name: 'span' }, { name: 'ins' }] }] },
      { name: 'dl', children: [{ name: 'dt' }, { name: 'dd' }] },
      { name: 'ol', attrs: { start: '3', type: 'A' } }
    ])
    const items = flatten(compileRichText(parseHtml('<ol start="3" type="A"><li>第三项<a href="/x">链接</a></li><li>第四项</li></ol>')).nodes).filter(
      (node) => node.name === 'li'
    )
    expect(items.map((node) => node.marker)).toEqual(['C.\u00a0', 'D.\u00a0'])
  })
  test('资源基址与样式选项响应式更新，样式变更保留正确空白', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<p>A\n  B<img src="a.png"></p>', baseUrl: 'https://one.test/' } })
    expect(wrapper.find('.wd-rich-text__image').attributes('src')).toBe('https://one.test/a.png')
    await wrapper.setProps({ baseUrl: 'https://two.test/', tagStyle: { p: 'white-space:pre-wrap' } })
    expect(wrapper.find('.wd-rich-text__image').attributes('src')).toBe('https://two.test/a.png')
    expect(wrapper.vm.getText()).toBe('A\n  B')
    wrapper.unmount()
  })
})

describe('RichText 交互合并表格与资源预算', () => {
  test('跨行占位与跨列坐标不覆盖，保留链接和表格标题', () => {
    const table = compileRichText(
      parseHtml(
        '<table><caption>标题</caption><tbody><tr><td rowspan="2">A<a href="/a">链接</a></td><td colspan="2">B</td></tr><tr><td>C</td><td>D</td></tr></tbody></table>'
      )
    ).nodes[0]
    expect(table.tableStyle).toContain('grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)')
    expect(table.children[0].style).toContain('grid-row:1')
    expect(table.children[1].style).toContain('grid-row:2 / span 2;grid-column:1 / span 1')
    expect(table.children[2].style).toContain('grid-row:2 / span 1;grid-column:2 / span 2')
    expect(table.children[3].style).toContain('grid-row:3 / span 1;grid-column:2 / span 1')
    expect(table.children[4].style).toContain('grid-row:3 / span 1;grid-column:3 / span 1')
    expect(flatten([table]).find((node) => node.kind === 'link')?.href).toBe('/a')
  })
  test('跨行合并不穿过 thead/tbody 边界，静态表格仍走原生节点', () => {
    const content =
      '<table><thead><tr><th rowspan="3" colspan="2">H</th></tr></thead><tbody><tr><td>A<a href="/a">链接</a></td><td>B</td></tr></tbody></table>'
    const table = compileRichText(parseHtml(content)).nodes[0]
    expect(table.children[0].style).toContain('grid-row:1 / span 1;grid-column:1 / span 2')
    expect(table.children[1].style).toContain('grid-row:2 / span 1;grid-column:1 / span 1')
    expect(compileRichText(parseHtml(content.replace('<a href="/a">链接</a>', ''))).nodes[0].nativeNodes).toBeDefined()
  })
  test('阈值错误可按 code 区分，配置样式不能无限放大输出', () => {
    expect(() => parseHtml('a'.repeat(200001))).toThrow(expect.objectContaining({ code: 'INPUT_LIMIT' }))
    expect(() => parseHtml('<span>'.repeat(129))).toThrow(expect.objectContaining({ code: 'DEPTH_LIMIT' }))
    expect(() => parseHtml('<br>'.repeat(10001))).toThrow(expect.objectContaining({ code: 'NODE_LIMIT' }))
    expect(() => parseHtml('<p>a</p>'.repeat(1000), { tagStyle: { p: `font-family:"${'a'.repeat(3000)}"` } })).toThrow(
      expect.objectContaining({ code: 'OUTPUT_LIMIT' })
    )
  })
})

describe('RichText 媒体生命周期', () => {
  const global = { stubs: { 'rich-text': true } }
  test('视频多来源失败切换、事件透传及卸载暂停', async () => {
    const videoContext = { pause: vi.fn(), play: vi.fn() }
    uni.createVideoContext = vi.fn(() => videoContext as unknown as UniApp.VideoContext)
    const wrapper = mount(WdRichText, {
      global,
      props: {
        content: '<video poster="/cover.png" onplay="attack()"><source src="javascript:bad"><source src="/one.mp4"><source src="/two.mp4"></video>'
      }
    })
    const video = wrapper.find('video')
    expect(video.attributes('src')).toBe('/one.mp4')
    expect(video.attributes('onplay')).toBeUndefined()
    await video.trigger('play')
    expect(wrapper.emitted('media-play')).toEqual([[{ id: '', type: 'video', src: '/one.mp4' }]])
    await video.trigger('error')
    await nextTick()
    expect(video.attributes('src')).toBe('/two.mp4')
    expect(wrapper.emitted('error')).toBeUndefined()
    await video.trigger('error')
    expect(wrapper.emitted('error')).toEqual([[{ source: 'video', src: '/two.mp4', message: 'Media loading failed' }]])
    expect(wrapper.find('.wd-rich-text__media-error').exists()).toBe(true)
    wrapper.unmount()
    expect(videoContext.pause).toHaveBeenCalled()
  })
  test('用户暂停视频后，来源切换不应重新播放', async () => {
    const videoContext = { pause: vi.fn(), play: vi.fn() }
    uni.createVideoContext = vi.fn(() => videoContext as unknown as UniApp.VideoContext)
    const wrapper = mount(WdRichText, { global, props: { content: '<video><source src="/one.mp4"><source src="/two.mp4"></video>' } })
    const video = wrapper.find('video')
    await video.trigger('play')
    await video.trigger('pause')
    await video.trigger('error')
    await nextTick()
    expect(video.attributes('src')).toBe('/two.mp4')
    expect(videoContext.play).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  test('iOS 音频初始化时不向空资源播放器提交选项，仍由用户手动播放', async () => {
    let onError = (_event: { errMsg: string; errCode: number }) => {}
    const audio = {
      src: '',
      play: vi.fn(),
      pause: vi.fn(),
      stop: vi.fn(),
      destroy: vi.fn(),
      onPlay: vi.fn(),
      onPause: vi.fn(),
      onEnded: vi.fn(),
      onTimeUpdate: vi.fn(),
      onError: (callback: typeof onError) => {
        onError = callback
      }
    }
    for (const option of ['autoplay', 'loop', 'volume']) {
      Object.defineProperty(audio, option, {
        set() {
          // 模拟 iOS 原生播放器对空资源配置的异步错误回调。
          if (!audio.src) queueMicrotask(() => onError({ errMsg: 'MediaError', errCode: -5 }))
        }
      })
    }
    uni.createInnerAudioContext = vi.fn(() => audio as unknown as UniApp.InnerAudioContext)
    const wrapper = mount(WdRichText, { global, props: { content: '<audio src="/music.mp3" loop muted></audio>' } })
    await flushPromises()
    expect(wrapper.emitted('error')).toBeUndefined()
    expect(audio.play).not.toHaveBeenCalled()
    await wrapper.get('.wd-rich-text__audio-control').trigger('tap')
    expect(audio.play).toHaveBeenCalledOnce()
    wrapper.unmount()
  })
  test('音频手动播放、互斥暂停、重试、销毁与延迟回调隔离', async () => {
    function createAudio() {
      let play = () => {}
      let pause = () => {}
      let ended = () => {}
      let error = (_event: { errMsg: string }) => {}
      const api = {
        src: '',
        autoplay: false,
        loop: false,
        volume: 1,
        play: vi.fn(() => play()),
        pause: vi.fn(() => pause()),
        stop: vi.fn(),
        destroy: vi.fn(),
        onTimeUpdate: vi.fn(),
        onPlay: (callback: () => void) => {
          play = callback
        },
        onPause: (callback: () => void) => {
          pause = callback
        },
        onEnded: (callback: () => void) => {
          ended = callback
        },
        onError: (callback: typeof error) => {
          error = callback
        }
      }
      return { api, error: () => error({ errMsg: 'failed' }), ended: () => ended(), play: () => play() }
    }
    const first = createAudio()
    const second = createAudio()
    uni.createInnerAudioContext = vi.fn().mockReturnValueOnce(first.api).mockReturnValueOnce(second.api)
    const wrapper = mount(WdRichText, {
      global,
      props: {
        content:
          '<audio title="第一首" loop muted><source src="/one.mp3"><source src="/backup.mp3"></audio><audio title="第二首" src="/two.mp3"></audio>'
      }
    })
    expect(first.api.autoplay).toBe(false)
    expect(first.api.loop).toBe(true)
    expect(first.api.volume).toBe(0)
    await wrapper.findAll('.wd-rich-text__audio-control')[0].trigger('tap')
    expect(wrapper.emitted('media-play')?.[0]).toEqual([{ id: '', type: 'audio', src: '/one.mp3' }])
    first.error()
    await nextTick()
    expect(first.api.src).toBe('/backup.mp3')
    expect(first.api.play).toHaveBeenCalledTimes(2)
    await wrapper.findAll('.wd-rich-text__audio-control')[1].trigger('tap')
    expect(first.api.pause).toHaveBeenCalled()
    wrapper.vm.pauseMedia()
    expect(second.api.pause).toHaveBeenCalled()
    second.ended()
    expect(wrapper.emitted('media-ended')).toEqual([[{ id: '', type: 'audio', src: '/two.mp3' }]])
    await wrapper.setProps({ content: '' })
    expect(first.api.destroy).toHaveBeenCalledOnce()
    expect(second.api.destroy).toHaveBeenCalledOnce()
    const count = wrapper.emitted('media-play')?.length
    first.play()
    first.error()
    expect(wrapper.emitted('media-play')).toHaveLength(count || 0)
    expect(wrapper.emitted('error')).toBeUndefined()
    wrapper.unmount()
  })
  test('来源被过滤的媒体展示错误状态，source 不能独立输出', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<source src="/orphan.mp4"><video src="data:text/html,attack"></video>' } })
    await nextTick()
    expect(wrapper.emitted('error')).toEqual([[{ source: 'video', src: '', message: 'No playable source' }]])
    expect(wrapper.findAll('.wd-rich-text__media')).toHaveLength(1)
    wrapper.unmount()
  })
})

describe('RichText review 回归', () => {
  const global = { stubs: { 'rich-text': true } }
  test('父组件内联样式对象重建或键顺序变化时不重新 load，也不重置图片状态', async () => {
    const version = ref(0)
    const onLoad = vi.fn()
    const parent = defineComponent({
      setup: () => () =>
        h(WdRichText, {
          content: '<p><img src="/photo.png"></p>',
          tagStyle: version.value % 2 ? { p: 'line-height:2', img: 'width:60px' } : { img: 'width:60px', p: 'line-height:2' },
          classStyles: { note: 'color:red' },
          onLoad
        })
    })
    const wrapper = mount(parent, { global })
    await flushPromises()
    const image = wrapper.find('.wd-rich-text__image')
    await image.trigger('load')
    version.value++
    await flushPromises()
    expect(onLoad).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.wd-rich-text__image').element).toBe(image.element)
    expect(wrapper.find('.is-loading').exists()).toBe(false)
    wrapper.unmount()
  })
  test('样式映射原地增删改能更新内容，同一轮修改仅触发一次 load', async () => {
    const tagStyle = reactive<Record<string, string>>({ p: 'white-space:normal' })
    const classStyles = reactive<Record<string, string>>({ note: 'color:red' })
    const wrapper = mount(WdRichText, { global, props: { content: '<p class="note">A\n  B<a href="/x">链接</a></p>', tagStyle, classStyles } })
    await flushPromises()
    tagStyle.p = 'white-space:pre-wrap'
    classStyles.note = 'color:blue'
    await flushPromises()
    expect(wrapper.vm.getText()).toBe('A\n  B链接')
    expect(wrapper.find('.wd-rich-text__p').attributes('style')).toContain('color: blue')
    expect(wrapper.emitted('load')).toHaveLength(2)
    delete tagStyle.p
    delete classStyles.note
    await flushPromises()
    expect(wrapper.vm.getText()).toBe('A B链接')
    expect(wrapper.find('.wd-rich-text__p').attributes('style')).not.toContain('color: blue')
    expect(wrapper.emitted('load')).toHaveLength(3)
    classStyles.note = 'color:green'
    await flushPromises()
    expect(wrapper.find('.wd-rich-text__p').attributes('style')).toContain('color: green')
    expect(wrapper.emitted('load')).toHaveLength(4)
    wrapper.unmount()
  })
  test('图片高度按最终声明判断，忽略字体字符串中的伪 height', () => {
    const nodes = compileRichText(
      parseHtml(
        '<img height="60" style="height:auto"><img style="height:auto;height:40px"><img style="font-family:&quot;test;height:50px&quot;"><img height="60" style="height:AUTO">'
      )
    ).nodes
    expect(nodes.map((node) => node.fixedHeight)).toEqual([false, true, false, false])
    expect(nodes.map((node) => node.imageStyle)).toEqual(['height:auto;', 'height:100%;', 'height:auto;', 'height:auto;'])
  })
  test.each(['javascript:x', '', undefined])('无效链接 %s 内的图片回退普通图片点击与预览', async (href) => {
    const preview = vi.spyOn(uni as { previewImage: (options: UniApp.PreviewImageOptions) => void }, 'previewImage').mockImplementation(() => {})
    const wrapper = mount(WdRichText, {
      global,
      props: { content: `<a ${href === undefined ? '' : `href="${href}"`}><span><img src="https://a.test/photo.png"></span></a>` }
    })
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(wrapper.emitted('link-click')).toBeUndefined()
    expect(wrapper.emitted('image-click')).toEqual([[{ src: 'https://a.test/photo.png', index: 0 }]])
    expect(preview).toHaveBeenCalledWith({ urls: ['https://a.test/photo.png'], current: 0 })
    wrapper.unmount()
    preview.mockRestore()
  })
  test('过滤后零节点仍显示插槽并触发成功 load', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<script>ignored()</script>' }, slots: { default: '暂无内容' } })
    await flushPromises()
    expect(wrapper.text()).toBe('暂无内容')
    expect(wrapper.vm.getText()).toBe('')
    expect(wrapper.emitted('load')).toEqual([[{ imageCount: 0 }]])
    expect(wrapper.emitted('error')).toBeUndefined()
    wrapper.unmount()
  })
})

describe('图片体验增强', () => {
  const global = { stubs: { 'rich-text': true } }
  test('缩略图与原图分离，禁用项不进入预览列表，索引仍按内容计数', async () => {
    uni.previewImage = vi.fn()
    const wrapper = mount(WdRichText, {
      global,
      props: {
        baseUrl: 'https://images.test/articles/',
        content: '<img src="a.jpg" original-src="../full.jpg"><img src="b.jpg" data-preview="false"><img src="c.jpg">'
      }
    })
    expect(wrapper.find('.wd-rich-text__image').attributes('src')).toBe('https://images.test/articles/a.jpg')
    await wrapper.findAll('.wd-rich-text__image-box')[0].trigger('tap')
    expect(uni.previewImage).toHaveBeenLastCalledWith({ urls: ['https://images.test/full.jpg', 'https://images.test/articles/c.jpg'], current: 0 })
    await wrapper.findAll('.wd-rich-text__image-box')[1].trigger('tap')
    expect(wrapper.emitted('image-click')?.at(-1)).toEqual([{ src: 'https://images.test/articles/b.jpg', index: 1 }])
    expect(uni.previewImage).toHaveBeenCalledTimes(1)
    await wrapper.findAll('.wd-rich-text__image-box')[2].trigger('tap')
    expect(uni.previewImage).toHaveBeenLastCalledWith({ urls: ['https://images.test/full.jpg', 'https://images.test/articles/c.jpg'], current: 1 })
    wrapper.unmount()
  })
  test('原图和占位图也校验协议，恶意原图退回展示地址', async () => {
    uni.previewImage = vi.fn()
    const wrapper = mount(WdRichText, {
      global,
      props: {
        content: '<img src="/safe.jpg" original-src="java&#x73;cript:attack()">',
        loadingImage: 'javascript:attack()',
        errorImage: 'data:text/html,attack'
      }
    })
    expect(wrapper.find('.wd-rich-text__image-placeholder').exists()).toBe(false)
    await wrapper.find('.wd-rich-text__image-box').trigger('tap')
    expect(uni.previewImage).toHaveBeenCalledWith({ urls: ['/safe.jpg'], current: 0 })
    wrapper.unmount()
  })
  test('占位图失败后退回文字，不重复上报资源错误，也不参与加载事件', async () => {
    const wrapper = mount(WdRichText, {
      global,
      props: { content: '<img src="/photo.jpg" alt="照片暂不可用">', loadingImage: '/loading.jpg', errorImage: '/error.jpg' }
    })
    await wrapper.find('.wd-rich-text__image-placeholder').trigger('load')
    expect(wrapper.emitted('image-load')).toBeUndefined()
    await wrapper.find('.wd-rich-text__image-placeholder').trigger('error')
    expect(wrapper.text()).toBe('…')
    await wrapper.find('.wd-rich-text__image').trigger('error')
    expect(wrapper.find('.wd-rich-text__image-placeholder').attributes('src')).toBe('/error.jpg')
    await wrapper.find('.wd-rich-text__image-placeholder').trigger('error')
    expect(wrapper.text()).toBe('照片暂不可用')
    expect(wrapper.emitted('error')).toHaveLength(1)
    await wrapper.setProps({ errorImage: '/another.jpg' })
    expect(wrapper.find('.wd-rich-text__image-placeholder').attributes('src')).toBe('/another.jpg')
    wrapper.unmount()
  })
  test('成功加载只上报一次实际尺寸，旧内容的迟到事件被忽略', async () => {
    const wrapper = mount(WdRichText, { global, props: { content: '<img src="/photo.jpg">', loadingImage: '/loading.jpg' } })
    const image = wrapper.find('.wd-rich-text__image')
    Object.defineProperties(image.element, { naturalWidth: { value: 800 }, naturalHeight: { value: 600 } })
    await image.trigger('load')
    await image.trigger('load')
    expect(wrapper.emitted('image-load')).toEqual([[{ src: '/photo.jpg', index: 0, width: 800, height: 600 }]])
    expect(wrapper.find('.wd-rich-text__image-placeholder').exists()).toBe(false)
    await wrapper.setProps({ content: '<img src="/new.jpg">' })
    await image.trigger('error')
    expect(wrapper.emitted('error')).toBeUndefined()
    wrapper.find('.wd-rich-text__image').element.dispatchEvent(new CustomEvent('load', { detail: { width: 100, height: 50 } }))
    await nextTick()
    expect(wrapper.emitted('image-load')?.at(-1)).toEqual([{ src: '/new.jpg', index: 0, width: 100, height: 50 }])
    wrapper.unmount()
  })
})

describe('目录与锚点', () => {
  const global = { stubs: { 'rich-text': true } }
  test('默认仍合并静态内容；开启后只展开定位节点和祖先，编号避免碰撞', () => {
    const content = '<div><h2>第一章</h2><p>一</p><p>二</p><h3 id="heading-1">第二节</h3><h3 id="heading-1">重复</h3><p id="正文">目标</p></div>'
    expect(compileRichText(parseHtml(content)).nodes).toHaveLength(1)
    const tree = compileRichText(parseHtml(content, { enableAnchor: true }), true)
    expect(tree.headings).toEqual([
      { id: 'heading-2', level: 2, text: '第一章' },
      { id: 'heading-1', level: 3, text: '第二节' },
      { id: 'heading-3', level: 3, text: '重复' }
    ])
    expect(flatten(tree.nodes).filter((n) => n.kind === 'static')[0].nativeNodes).toHaveLength(2)
    expect(flatten(tree.nodes).some((n) => n.anchorId === '正文')).toBe(true)
    expect(JSON.stringify(tree.nodes)).not.toContain('"id":"heading-1"')
  })
  test('媒体中不会显示的备用标题不进入目录或占用编号', () => {
    const content = '<video id="movie"><h2 id="heading-1">备用标题</h2></video><h2>正文</h2>'
    const tree = compileRichText(parseHtml(content, { enableAnchor: true }), true)
    expect(tree.headings).toEqual([{ id: 'heading-1', level: 2, text: '正文' }])
    expect(flatten(tree.nodes).find((node) => node.kind === 'media')?.anchorId).toBe('movie')
  })
  test('首次 load 时父组件可通过 ref 读取目录，卸载后不再上报', async () => {
    const article = ref<InstanceType<typeof WdRichText>>()
    const onLoad = vi.fn(() => article.value?.getHeadings())
    const parent = mount(
      defineComponent({
        setup: () => () => h(WdRichText, { ref: article, enableAnchor: true, content: '<h2 id="intro">目录</h2>', onLoad })
      }),
      { global }
    )
    await flushPromises()
    expect(onLoad).toHaveBeenCalledTimes(1)
    expect(onLoad.mock.results[0].value).toEqual([{ id: 'intro', level: 2, text: '目录' }])
    parent.unmount()
    const removed = mount(WdRichText, { global, props: { content: '<p>快速卸载</p>' } })
    removed.unmount()
    await flushPromises()
    expect(removed.emitted('load')).toBeUndefined()
  })
  test('目录副本不会修改内部数据；更新和关闭后移除旧锚点', async () => {
    const wrapper = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="intro">A <em>B</em></h2>' } })
    expect(wrapper.vm.getHeadings()).toEqual([{ id: 'intro', level: 2, text: 'A B' }])
    wrapper.vm.getHeadings()[0].text = '修改副本'
    expect(wrapper.vm.getHeadings()[0].text).toBe('A B')
    await wrapper.setProps({ content: '<h3>新内容</h3>' })
    await expect(wrapper.vm.getAnchorRect('intro')).rejects.toThrow('Anchor not found')
    await wrapper.setProps({ enableAnchor: false })
    expect(wrapper.vm.getHeadings()).toEqual([])
    await expect(wrapper.vm.scrollToAnchor('heading-1')).rejects.toThrow()
    wrapper.unmount()
  })
  test('内容 ID 不透传到 DOM，多实例使用独立的生成 ID', () => {
    const first = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="正文:#x">标题</h2>' } })
    const second = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="正文:#x">标题</h2>' } })
    const one = first.find('.wd-rich-text__h2').attributes('id')
    const two = second.find('.wd-rich-text__h2').attributes('id')
    expect(one).toMatch(/^wd-rt-anchor-\d+$/)
    expect(one).not.toBe(two)
    first.unmount()
    second.unmount()
  })
  test('位置查询与页面滚动量相加，偏移用于预留顶部空间', async () => {
    const query: MockSelectorQuery = {
      in: vi.fn(() => query),
      select: vi.fn(() => query),
      selectViewport: vi.fn(() => query),
      boundingClientRect: vi.fn((cb) => {
        cb({ top: 120, left: 10, width: 300, height: 30 })
        return query
      }),
      scrollOffset: vi.fn((cb) => {
        cb({ scrollTop: 200 })
        return query
      }),
      exec: vi.fn()
    }
    const querySpy = vi.spyOn(uni, 'createSelectorQuery').mockReturnValue(query as unknown as UniApp.SelectorQuery)
    const scrollSpy = vi
      .spyOn(uni as { pageScrollTo: (options: UniApp.PageScrollToOptions) => void }, 'pageScrollTo')
      .mockImplementation((options) => {
        options.success?.({ errMsg: 'ok' })
      })
    const wrapper = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="a">标题</h2>' } })
    try {
      await expect(wrapper.vm.getAnchorRect('a')).resolves.toEqual({ top: 120, left: 10, width: 300, height: 30 })
      await wrapper.vm.scrollToAnchor('a', { offset: 40, duration: 0 })
      expect(scrollSpy).toHaveBeenCalledWith(expect.objectContaining({ scrollTop: 280, duration: 0 }))
      expect(query.select).toHaveBeenCalledWith(expect.stringMatching(/^#wd-rt-anchor-/))
      await expect(wrapper.vm.scrollToAnchor('a', { offset: NaN })).rejects.toThrow('Invalid')
    } finally {
      wrapper.unmount()
      querySpy.mockRestore()
      scrollSpy.mockRestore()
    }
  })
  test('隐藏节点与异步测量期间被替换的内容不产生错误滚动', async () => {
    let measure: (rect: unknown) => void = () => {}
    const query: MockSelectorQuery = {
      in: vi.fn(() => query),
      select: vi.fn(() => query),
      boundingClientRect: vi.fn((cb) => {
        measure = cb
        return query
      }),
      exec: vi.fn()
    }
    const spy = vi.spyOn(uni, 'createSelectorQuery').mockReturnValue(query as unknown as UniApp.SelectorQuery)
    const wrapper = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="a">标题</h2>' } })
    try {
      const hidden = wrapper.vm.getAnchorRect('a')
      await nextTick()
      measure(null)
      await expect(hidden).rejects.toThrow('not visible')
      const stale = wrapper.vm.getAnchorRect('a')
      await nextTick()
      await wrapper.setProps({ content: '<h2 id="b">新标题</h2>' })
      measure({ top: 10, left: 0, width: 100, height: 30 })
      await expect(stale).rejects.toThrow('Content changed')
    } finally {
      wrapper.unmount()
      spy.mockRestore()
    }
  })
})

describe('RichText 媒体控制', () => {
  const global = { stubs: { 'rich-text': true } }
  function setupVideo(content = '<video id="trip" src="/trip.mp4"></video><video id="lake" src="/lake.mp4"></video>') {
    const contexts: Array<{ play: ReturnType<typeof vi.fn>; pause: ReturnType<typeof vi.fn>; seek: ReturnType<typeof vi.fn> }> = []
    uni.createVideoContext = vi.fn(() => {
      const context = { play: vi.fn(), pause: vi.fn(), seek: vi.fn() }
      contexts.push(context)
      return context as unknown as UniApp.VideoContext
    })
    return { wrapper: mount(WdRichText, { global, props: { content } }), contexts }
  }
  test('通过 HTML ID 同步控制目标，未开启锚点也可控制；平台事件确认播放并暂停其他媒体', async () => {
    const { wrapper, contexts } = setupVideo()
    expect(wrapper.vm.playMedia('trip')).toBe(true)
    expect(contexts[0].play).toHaveBeenCalledOnce()
    expect(contexts[1].play).not.toHaveBeenCalled()
    expect(wrapper.emitted('media-play')).toBeUndefined()
    expect(wrapper.vm.seekMedia('lake', 5.5)).toBe(true)
    expect(contexts[1].seek).toHaveBeenCalledWith(5.5)
    expect(contexts[1].play).not.toHaveBeenCalled()
    await wrapper.findAll('video')[0].trigger('play')
    expect(wrapper.emitted('media-play')).toEqual([[{ id: 'trip', type: 'video', src: '/trip.mp4' }]])
    expect(contexts[1].pause).toHaveBeenCalledOnce()
    expect(wrapper.vm.pauseMedia('trip')).toBe(true)
    expect(contexts[0].pause).toHaveBeenCalledOnce()
    expect(wrapper.vm.pauseMedia()).toBe(true)
    expect(contexts[1].pause).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })
  test('缺失、空、重复 ID 和非法进度不会向平台发送指令', async () => {
    const { wrapper, contexts } = setupVideo('<video id="same" src="/a.mp4"></video><video id="same" src="/b.mp4"></video>')
    for (const id of ['', 'missing', 'same']) {
      expect(wrapper.vm.playMedia(id)).toBe(false)
      expect(wrapper.vm.pauseMedia(id)).toBe(false)
      expect(wrapper.vm.seekMedia(id, 5)).toBe(false)
    }
    await wrapper.setProps({ content: '<video id="valid" src="/a.mp4"></video>' })
    for (const seconds of [-1, NaN, Infinity]) expect(wrapper.vm.seekMedia('valid', seconds)).toBe(false)
    contexts.forEach((context) => {
      expect(context.play).not.toHaveBeenCalled()
      expect(context.seek).not.toHaveBeenCalled()
    })
    expect(wrapper.vm.seekMedia('valid', 0)).toBe(true)
    wrapper.unmount()
  })
  test('媒体加载失败、内容替换及卸载后控制返回 false，旧节点不再上报进度', async () => {
    const { wrapper, contexts } = setupVideo('<video id="trip" src="/trip.mp4"></video>')
    const video = wrapper.find('video')
    await video.trigger('timeupdate', { detail: { currentTime: 2.5, duration: 20 } })
    expect(wrapper.emitted('media-timeupdate')).toEqual([[{ id: 'trip', type: 'video', src: '/trip.mp4', currentTime: 2.5, duration: 20 }]])
    await video.trigger('timeupdate', { detail: { currentTime: NaN, duration: Infinity } })
    expect(wrapper.emitted('media-timeupdate')?.[1][0]).toMatchObject({ currentTime: 0, duration: 0 })
    await video.trigger('error')
    expect(wrapper.vm.playMedia('trip')).toBe(false)
    expect(wrapper.vm.pauseMedia('trip')).toBe(false)
    expect(wrapper.vm.seekMedia('trip', 5)).toBe(false)
    await wrapper.setProps({ content: '' })
    expect(wrapper.vm.playMedia('trip')).toBe(false)
    expect(contexts[0].play).not.toHaveBeenCalled()
    const exposed = wrapper.vm
    wrapper.unmount()
    expect(exposed.pauseMedia()).toBe(false)
  })
  test('来源切换等待渲染时，主动暂停取消续播', async () => {
    const { wrapper, contexts } = setupVideo('<video id="trip"><source src="/a.mp4"><source src="/b.mp4"></video>')
    wrapper.vm.playMedia('trip')
    const switching = wrapper.find('video').trigger('error')
    wrapper.vm.pauseMedia('trip')
    await switching
    await nextTick()
    expect(wrapper.find('video').attributes('src')).toBe('/b.mp4')
    expect(contexts[0].play).toHaveBeenCalledOnce()
    wrapper.unmount()
  })
  test('音频按 ID 控制，进度来自音频上下文；旧回调在内容替换后失效', async () => {
    const callbacks: Record<string, () => void> = {}
    const audio = {
      src: '',
      currentTime: 3.25,
      duration: 18,
      play: vi.fn(),
      pause: vi.fn(),
      seek: vi.fn(),
      stop: vi.fn(),
      destroy: vi.fn(),
      onPlay: (cb: () => void) => {
        callbacks.play = cb
      },
      onPause: (cb: () => void) => {
        callbacks.pause = cb
      },
      onEnded: (cb: () => void) => {
        callbacks.ended = cb
      },
      onError: vi.fn(),
      onTimeUpdate: (cb: () => void) => {
        callbacks.time = cb
      }
    }
    uni.createInnerAudioContext = vi.fn(() => audio as unknown as UniApp.InnerAudioContext)
    const wrapper = mount(WdRichText, { global, props: { content: '<audio id="music" src="/music.mp3"></audio>' } })
    expect(wrapper.vm.playMedia('music')).toBe(true)
    expect(audio.play).toHaveBeenCalledOnce()
    callbacks.play()
    expect(wrapper.emitted('media-play')?.[0][0]).toMatchObject({ id: 'music', type: 'audio' })
    expect(wrapper.vm.seekMedia('music', 5)).toBe(true)
    expect(audio.seek).toHaveBeenCalledWith(5)
    callbacks.time()
    expect(wrapper.emitted('media-timeupdate')?.[0][0]).toEqual({ id: 'music', type: 'audio', src: '/music.mp3', currentTime: 3.25, duration: 18 })
    wrapper.vm.pauseMedia('music')
    expect(audio.pause).toHaveBeenCalledOnce()
    callbacks.pause()
    callbacks.ended()
    expect(wrapper.emitted('media-pause')?.[0][0]).toMatchObject({ id: 'music' })
    expect(wrapper.emitted('media-ended')?.[0][0]).toMatchObject({ id: 'music' })
    await wrapper.setProps({ content: '' })
    callbacks.time()
    expect(wrapper.emitted('media-timeupdate')).toHaveLength(1)
    expect(audio.destroy).toHaveBeenCalledOnce()
    wrapper.unmount()
  })
})

describe('RichText 媒体锚点与布局校正', () => {
  const global = { stubs: { 'rich-text': true } }
  function mockPage() {
    let scrollTop = 0
    let targetTop = 200
    const query: MockSelectorQuery = {
      in: vi.fn(() => query),
      select: vi.fn(() => query),
      selectViewport: vi.fn(() => query),
      boundingClientRect: vi.fn((callback) => {
        callback({ top: targetTop - scrollTop, left: 0, width: 300, height: 100 })
        return query
      }),
      scrollOffset: vi.fn((callback) => {
        callback({ scrollTop })
        return query
      }),
      exec: vi.fn()
    }
    const querySpy = vi.spyOn(uni, 'createSelectorQuery').mockReturnValue(query as unknown as UniApp.SelectorQuery)
    const scrollSpy = vi
      .spyOn(uni as { pageScrollTo: (options: UniApp.PageScrollToOptions) => void }, 'pageScrollTo')
      .mockImplementation((options) => {
        scrollTop = options.scrollTop!
        options.success?.({ errMsg: 'ok' })
      })
    return {
      querySpy,
      scrollSpy,
      shift: () => {
        targetTop += 80
      }
    }
  }
  test('滚动期间图片改变布局，动画结束后校正一次；定位媒体不会播放', async () => {
    vi.useFakeTimers()
    const page = mockPage()
    const video = { play: vi.fn(), pause: vi.fn(), seek: vi.fn() }
    uni.createVideoContext = vi.fn(() => video as unknown as UniApp.VideoContext)
    const wrapper = mount(WdRichText, {
      global,
      props: { enableAnchor: true, content: '<img src="/cover.jpg"><video id="trip" src="/trip.mp4"></video>' }
    })
    try {
      const locating = wrapper.vm.scrollToAnchor('trip', { offset: 40, duration: 300 })
      await flushPromises()
      expect(page.scrollSpy).toHaveBeenCalledWith(expect.objectContaining({ scrollTop: 160, duration: 300 }))
      page.shift()
      await wrapper.find('img').trigger('load')
      await vi.advanceTimersByTimeAsync(300)
      await locating
      expect(page.scrollSpy).toHaveBeenCalledTimes(2)
      expect(page.scrollSpy).toHaveBeenLastCalledWith(expect.objectContaining({ scrollTop: 240, duration: 0 }))
      expect(video.play).not.toHaveBeenCalled()
    } finally {
      wrapper.unmount()
      page.querySpy.mockRestore()
      page.scrollSpy.mockRestore()
      vi.useRealTimers()
    }
  })
  test('新定位取消旧定位的校正，内容替换取消尚未结束的定位', async () => {
    vi.useFakeTimers()
    const page = mockPage()
    const wrapper = mount(WdRichText, { global, props: { enableAnchor: true, content: '<h2 id="a">章节</h2>' } })
    try {
      const first = wrapper.vm.scrollToAnchor('a', { duration: 300 }).catch((error: Error) => error.message)
      await flushPromises()
      await wrapper.vm.scrollToAnchor('a', { duration: 0 })
      expect(await first).toMatch(/interrupted/)
      expect(page.scrollSpy).toHaveBeenCalledTimes(2)
      const stale = wrapper.vm.scrollToAnchor('a', { duration: 300 }).catch((error: Error) => error.message)
      await flushPromises()
      await wrapper.setProps({ content: '' })
      expect(await stale).toMatch(/interrupted/)
      await vi.advanceTimersByTimeAsync(300)
      expect(page.scrollSpy).toHaveBeenCalledTimes(3)
    } finally {
      wrapper.unmount()
      page.querySpy.mockRestore()
      page.scrollSpy.mockRestore()
      vi.useRealTimers()
    }
  })
})
