/**
 * 生成固定版本编辑器的真实 HTML 导出样本，不引入组件运行时依赖。
 * npm install --prefix /tmp/wot-rich-text-editor-fixtures --ignore-scripts quill@2.0.3 @wangeditor/editor@5.1.23 tinymce@7.9.1 jsdom@24.1.3
 * node tests/scripts/generate-rich-text-editor-fixtures.mjs /tmp/wot-rich-text-editor-fixtures/node_modules
 */
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const modules = resolve(process.argv[2] || '/tmp/wot-rich-text-editor-fixtures/node_modules')
const require = createRequire(resolve(modules, '../package.json'))
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><body><div id="quill"></div><div id="tiny"></div></body></html>', {
  url: 'https://editor.example.test/',
  pretendToBeVisual: true,
  runScripts: 'outside-only'
})
const { window } = dom
// jsdom 没有排版引擎；这里的纯文本代码块只需 textContent 语义。
Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
  get() {
    return this.textContent
  },
  set(value) {
    this.textContent = value
  }
})
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} })
window.document.execCommand = () => false
// TinyMCE 这里只转义 schema 中的标准标签名；遇到其他输入直接拒绝。
window.CSS = {
  escape: (name) => {
    if (!/^[a-z][a-z0-9-]*$/i.test(name)) throw new Error(`Unexpected schema tag: ${name}`)
    return name
  }
}
const load = (path) => window.eval(readFileSync(resolve(modules, path), 'utf8'))
const versions = { quill: '2.0.3', '@wangeditor/editor': '5.1.23', tinymce: '7.9.1' }
for (const [name, version] of Object.entries(versions)) {
  if (JSON.parse(readFileSync(resolve(modules, name, 'package.json'), 'utf8')).version !== version) throw new Error(`Expected ${name}@${version}`)
}

load('quill/dist/quill.js')
const quill = new window.Quill('#quill')
quill.setContents([
  { insert: '山野来信', attributes: { size: 'large', font: 'serif' } },
  { insert: '\n', attributes: { align: 'center' } },
  { insert: '\n' },
  { insert: '慢下来，听见风。' },
  { insert: '\n', attributes: { indent: 1 } },
  { insert: '出发' },
  { insert: '\n', attributes: { list: 'ordered' } },
  { insert: '带上水' },
  { insert: '\n', attributes: { list: 'bullet', indent: 1 } },
  { insert: '收好行囊' },
  { insert: '\n', attributes: { list: 'checked' } },
  { insert: '阅读清单', attributes: { link: '/journal/gear' } },
  { insert: '\n', attributes: { list: 'unchecked' } },
  { insert: 'const trip = "weekend";' },
  { insert: '\n', attributes: { 'code-block': true } }
])
const quillHtml = quill.getSemanticHTML()

load('@wangeditor/editor/dist/index.js')
const wang = window.wangEditor.createEditor({
  content: [
    { type: 'header2', children: [{ text: '山野来信' }] },
    { type: 'paragraph', textAlign: 'center', children: [{ text: '周末，去见山。', bold: true }] },
    { type: 'paragraph', children: [{ text: '' }] },
    { type: 'paragraph', indent: '2em', children: [{ text: '慢下来，听见风。' }] },
    {
      type: 'paragraph',
      children: [{ type: 'image', src: '/static/icon/app.png', alt: '旅途图示', style: { width: '80px', height: '80px' }, children: [{ text: '' }] }]
    },
    { type: 'pre', children: [{ type: 'code', language: 'javascript', children: [{ text: 'const trip = "weekend";\n  go();' }] }] },
    {
      type: 'table',
      width: '100%',
      children: [
        {
          type: 'table-row',
          children: [
            { type: 'table-cell', children: [{ text: '时刻' }] },
            { type: 'table-cell', children: [{ type: 'link', url: '/journal/gear', children: [{ text: '阅读清单' }] }] }
          ]
        }
      ]
    }
  ]
})
const wangHtml = wang.getHtml()

// wangEditor 的 UMD 包附带旧 Promise polyfill，恢复 jsdom 宿主的现代 Promise。
window.Promise = Promise
load('tinymce/tinymce.js')
load('tinymce/icons/default/icons.js')
load('tinymce/models/dom/model.js')
load('tinymce/plugins/table/plugin.js')
const [tiny] = await window.tinymce.init({
  target: window.document.querySelector('#tiny'),
  inline: true,
  theme: false,
  skin: false,
  content_css: false,
  plugins: 'table',
  license_key: 'gpl'
})
tiny.setContent(
  '<h2>山野来信</h2><p>&nbsp;</p><p style="padding-left:40px">慢下来，听见风。</p><figure class="image"><img src="/static/icon/app.png" alt="旅途图示" width="80" height="80"><figcaption>01 / 在路上</figcaption></figure><table style="border-collapse:collapse;width:100%"><colgroup><col style="width:25%"><col style="width:75%"></colgroup><tbody><tr><th colspan="2">周末计划</th></tr><tr><td>09:00</td><td><a href="/journal/gear">阅读清单</a></td></tr></tbody></table>'
)
const tinyHtml = tiny.getContent()
const result = {
  quill: { version: versions.quill, api: 'getSemanticHTML()', html: quillHtml },
  wangEditor: { version: versions['@wangeditor/editor'], api: 'getHtml()', html: wangHtml },
  tinyMCE: { version: versions.tinymce, api: 'getContent()', html: tinyHtml }
}
writeFileSync(new URL('../fixtures/rich-text-editors.json', import.meta.url), JSON.stringify(result, null, 2) + '\n')
tiny.remove()
window.close()
console.log('Generated editor fixtures:', Object.keys(result).join(', '))
