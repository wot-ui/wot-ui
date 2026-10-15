/** 示例均为 HTML 字符串，与业务接口返回的图文内容一致。 */
export const staticContent = '<p>第一段静态文字。</p><p>第二段保留<strong>强调文字</strong>与正常排版。</p><p>第三段静态文字。</p>'
export const inlineContent =
  '<p>前文<a href="/pages/detail">行内链接</a>后文</p><p>很长的前文用于验证自然换行，<a href="/pages/detail">较长的链接文字应该在窄屏中自然换行，不应独占一整行</a>，最后仍有后文。</p>'
const image = '<img src="/static/icon/app.png" alt="Wot UI" width="80" height="48">'
export const imageContent = `<p>图片前${image}图片后</p><p><a href="/pages/image-detail">${image}</a></p>`
export const staticTableContent =
  '<table style="width:600px"><tbody><tr><th>名称</th><th>内容</th></tr><tr><td>图文</td><td>静态表格文字</td></tr></tbody></table>'
export const tableContent = `<table style="width:600px"><tbody><tr><th>名称</th><th>内容</th></tr><tr><td>图文</td><td>${image}<a href="/pages/detail">表格链接</a></td></tr></tbody></table>`
export const listContent =
  '<ul><li>第一项<a href="/pages/detail">列表链接</a></li><li>第二项<ul><li>嵌套项<a href="/pages/detail">嵌套链接</a></li></ul></li></ul>'
export const longContent = Array.from({ length: 120 }, (_, index) => `<p>静态段落 ${index + 1}：用于验证连续内容合并。</p>`).join('')
export const articleContent =
  '<h2>图文阅读</h2><p>支持<strong>强调</strong>、<em>斜体</em>与换行：<br>第二行 &amp; HTML 实体。</p><blockquote>内容会随主题切换文字颜色。</blockquote><pre><code>const message = &quot;Hello Wot UI&quot;\nmessage.length</code></pre>'

export const normalizationContent = '<p><u>下划线</u>、<s>删除线</s>、&copy;、&NotEqualTilde;、&#x1f600;、&amp;lt;</p><pre><code> A\n  B</code></pre>'
export const normalizationInteractiveContent =
  '<p><u>下划线</u>、<s>删除线</s>、&copy;、&NotEqualTilde;、&#x1f600;、&amp;lt;<a href="/pages/detail">链接</a></p><pre><code> A\n  B<a href="/pages/detail">链接</a></code></pre>'

export const expandedTagsContent =
  '<figure><figcaption><mark>重点</mark> <small>补充说明</small></figcaption></figure><dl><dt>术语</dt><dd>定义内容</dd></dl><ol start="3" type="A"><li>第三项<a href="/pages/detail">链接</a></li><li>第四项</li></ol>'
export const mergedTableContent =
  '<table style="width:600px"><caption>合并单元格</caption><tbody><tr><th rowspan="2">分类</th><th colspan="2">内容<a href="/pages/detail">链接</a></th></tr><tr><td>第一列</td><td>第二列</td></tr></tbody></table>'
export const styledContent = '<p class="ql-align-center article-note">通过标签与 class 映射设置排版</p>'
export const videoContent = '<video title="示例视频" controls src="https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4"></video>'
