# RichText 富文本

用于展示文章、活动介绍等 HTML 内容，支持图文排版、图片预览、链接事件、表格和音视频。

适用于 H5、uni-app App-Vue 和小程序，不支持 App-nvue、uni-app x。文字选择、懒加载、合并表格和媒体播放的表现依平台而定。

::: details 内容支持与使用边界

- 支持标题、段落、强调、引用、代码、列表、图片、链接、表格及音视频；支持常用 HTML 实体和数字实体。
- 保留颜色、字体、间距、尺寸、边框等基础排版样式。不支持外部样式表、定位、Flex 或 Grid 内容布局。
- 脚本、事件属性、iframe、SVG 等不支持的嵌入内容会被过滤。建议使用结构完整的 HTML。
- 资源允许 HTTP(S)、协议相对地址和相对路径；链接还允许锚点、`mailto:` 和 `tel:`。资源须符合目标平台的域名与访问规则。
- 单次内容限制为 200000 个 UTF-16 代码单元、10000 个解析节点、128 层嵌套；解析后的输出数据也有大小限制。超限触发 `error` 并显示默认插槽，建议将超长文章拆分加载。
  :::

## 组件类型

### 基础图文

将 HTML 字符串传给 `content` 即可。标题、段落、引用和列表可组合成完整文章；`selectable` 允许在支持的平台选择文字。

```vue
<template>
  <wd-rich-text :content="content" selectable />
</template>

<script setup lang="ts">
const content = `
  <h1>周末出走 · 山野手记</h1>
  <p>沿着林间小路慢慢走，<strong>给生活留一点空白。</strong></p>
  <blockquote>把周末留给山野，把时间还给自己。</blockquote>
  <h2>出发前，装好这三样</h2>
  <ul><li>舒适的鞋</li><li>饮水与轻食</li><li>随身垃圾袋</li></ul>
`
</script>
```

## 组件状态

### 内容更新与空状态

更新 `content` 即可替换内容。空字符串、过滤后无可展示内容或解析失败时，显示默认插槽。

```vue
<template>
  <wd-button @click="content = ''">清空内容</wd-button>
  <wd-rich-text :content="content"><text>还没有新的来信</text></wd-rich-text>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p><strong>周末来信</strong></p><p>去户外走走，让眼睛看看远处。</p>')
</script>
```

### 图片加载失败

图片失败时显示 `alt` 替代文字，未设置时显示 `×`，同时触发 `error`。

```vue
<wd-rich-text content='<img src="" alt="这张照片暂时无法加载">' />
```

`loading-image` 和 `error-image` 分别设置加载中、失败时的占位图；占位图本身失败会退回文字，不会重复触发图片错误。

```vue
<wd-rich-text :content="content" loading-image="/static/loading.png" error-image="/static/error.png" @image-load="handleImageLoad" />
```

## 组件变体

### 图片预览

普通图片默认支持点击预览。设置 `lazy-load` 开启平台支持的懒加载，设置 `:preview-image="false"` 并监听 `image-click` 可自行处理图片点击。

```vue
<wd-rich-text content='<img src="https://example.com/lake.jpg" alt="山湖风景" width="100%">' lazy-load />
```

未设置尺寸时，图片按容器宽度等比显示。原生预览建议使用 HTTPS 图片；包内路径和 Data 图片的预览需按平台自行处理。

通过图片的 `original-src` 指定高清预览地址，`src` 仍用于显示缩略图。`data-preview="false"` 可让单张图片退出自动预览列表，但仍触发 `image-click`。这些图片属性也经过资源地址校验；无效原图地址退回展示地址。

```html
<img src="https://example.com/thumb.jpg" original-src="https://example.com/full.jpg" alt="山湖风景" />
<img src="https://example.com/logo.png" data-preview="false" alt="装饰图片" />
```

### 链接与图片链接

点击链接只触发 `link-click`，由业务决定导航或其他操作。有效链接包裹的图片也触发该事件；链接地址缺失或被过滤时，图片按普通图片处理。

```vue
<template>
  <wd-rich-text :content="content" @link-click="handleLink" />
</template>

<script setup lang="ts">
const content = '<p>出发前，读一读<a href="/pages/guide/index">行前准备清单</a>。</p>'
function handleLink({ href }: { href: string }) {
  if (href === '/pages/guide/index') uni.navigateTo({ url: href })
}
</script>
```

请将示例中的链接替换为实际页面地址，并在 `link-click` 回调中处理导航。

## 组件样式

### 标签与 class 样式

`tag-style` 设置标签默认样式，`class-styles` 为 HTML 中指定的 class 提供样式。下例将普通图文排成一封邀请函。

```vue
<template>
  <wd-rich-text :content="content" :tag-style="tagStyle" :class-styles="classStyles" />
</template>

<script setup lang="ts">
const content = '<p class="eyebrow">YOU ARE INVITED</p><h2>一起，去见山</h2><p>把一整个下午<br>交给阳光、草地和好朋友。</p>'
const tagStyle = { p: 'text-align:center;line-height:1.9;', h2: 'text-align:center;' }
const classStyles = { eyebrow: 'font-size:12px;letter-spacing:3px;color:var(--wot-success-main);' }
</script>
```

样式优先级为：默认样式 → `tag-style` → `class-styles` → HTML 内联样式。class 通过映射生效，不会直接使用页面同名 CSS。

### 主题与文字样式

默认文字随 Wot UI 主题变化。HTML 中的固定颜色会覆盖主题色，建议使用语义 CSS 变量。

```vue
<wd-rich-text
  content="<h3>山野里的晚安</h3><p>愿你今晚，也有一个好梦。</p>"
  custom-style="--wot-rich-text-font-size:16px;--wot-rich-text-line-height:1.9;"
/>
```

## 布局能力

### 列表与表格

支持有序、无序和嵌套列表。宽表格在组件内横向滚动，不会撑宽页面；表格可使用 `rowspan`、`colspan` 合并单元格。

```vue
<wd-rich-text
  content='<table style="width:560px;table-layout:fixed"><colgroup><col width="20%"><col width="30%"><col width="50%"></colgroup><tr><th>时间</th><th colspan="2">周末安排</th></tr><tr><td>09:00</td><td>湖畔集合</td><td>沿湖慢走</td></tr></table>'
/>
```

用 `colgroup` / `col` 的 `width` 属性或内联 `width` 设置列宽，支持像素和百分比。表格里的长单词默认允许换行；需要保持单行时可设置 `white-space:nowrap`，配合表格宽度横向查看。

::: details 列宽分配规则

静态表格使用原生表格布局，可用 `table-layout:fixed` 固定列宽。含链接、图片或锚点的表格在需要指定列宽或合并单元格时使用网格布局：列定义优先，其次取该列第一个有明确宽度的单列单元格，其余列平分剩余空间。不从跨列单元格的总宽度推算各列比例；建议直接声明 `col`。

网格列宽接受数字（按 px）、`px` 和 `%`，不解析 `em`、`calc()` 或 CSS 变量列宽；百分比按表格宽度计算，指定宽度合计过大时横向溢出。支持 `col` / `colgroup` 的 `span`（1–99），多余的列定义不扩张交互网格。原生布局与网格布局不保证像素级一致，请在目标平台确认效果。
:::

### 目录与锚点

设置 `enable-anchor` 后，可通过 `getHeadings()` 获取标题目录，用 `scrollToAnchor()` 滚动到章节。未开启时，`getHeadings()` 返回空数组。

```vue
<template>
  <wd-button v-for="item in headings" :key="item.id" @click="jump(item.id)">{{ item.text }}</wd-button>
  <wd-rich-text ref="article" :content="content" enable-anchor @load="headings = article?.getHeadings() || []" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { RichTextExpose, RichTextHeading } from '@/uni_modules/wot-ui/components/wd-rich-text/types'
const article = ref<RichTextExpose>()
const headings = ref<RichTextHeading[]>([])
const content = '<h2 id="intro">出发之前</h2><p>带上饮水和轻食。</p><h2>沿湖慢走</h2><p>让脚步慢下来。</p>'
async function jump(id: string) {
  try {
    await article.value?.scrollToAnchor(id, { offset: 16, duration: 300 })
  } catch {
    uni.showToast({ title: '章节暂时无法定位', icon: 'none' })
  }
}
</script>
```

标题优先使用 HTML 的 `id`，没有可用 ID 时生成编号；重复 ID 的第一个节点保留原 ID，后续同名标题获得独立编号。内容变化后请重新读取目录。空标题仍保留，业务可按 `text` 过滤。普通元素也可通过 ID 定位；`source`、`col`、`colgroup`、`thead`、`tbody`、`tfoot`、`tr` 不作为定位目标，可将 ID 放在表格、单元格或内部标题上。

组件不自动执行 `href="#intro"` 的跳转。业务在 `link-click` 中取出锚点 ID，再调用定位方法；带 URL 编码的片段由业务解码。隐藏、未渲染、已删除的目标以及内容更新期间失效的查询会返回 rejected Promise。

`scrollToAnchor()` 在动画结束后重新测量并最多校正一次，减少滚动期间图片加载引起的偏移。新的定位请求、内容替换或组件卸载会中断旧请求并 reject。方法完成后不持续跟随布局变化；后续图片加载完成可按需再次定位，建议提前设置图片宽高。

::: details 在 scroll-view 中定位
`scrollToAnchor()` 只滚动页面。容器内请用 `getAnchorRect(id)` 获取位置，并用同一套 `uni.createSelectorQuery()` 查询容器的 `top` 与 `scrollTop`，换算后更新容器的 `scroll-top`：

```ts
const nextScrollTop = currentScrollTop + anchor.top - container.top - offset
```

坐标单位为 px，采用 uni-app 内容视口坐标；H5 的顶部导航栏不计入 `top`。图片加载可能改变布局，方法每次重新测量，不缓存位置。`load` 不等待图片完成，需要稳定定位时请预留图片尺寸或在图片加载后操作。
:::

## 内容形态

### 编辑器内容

将编辑器导出的 HTML 传给 `content`：Quill 2 使用 `getSemanticHTML()`，wangEditor 使用 `getHtml()`，TinyMCE 使用 `getContent()`。无需加载编辑器的 CSS。

```vue
<wd-rich-text :content="htmlFromEditor" @link-click="handleLink" />
```

支持标准段落、空段落、嵌套列表、图注和代码空白。内置 Quill 的 `ql-align-center/right/justify`、`ql-indent-1`–`8`（每级 3em）、`ql-size-small/large/huge`、`ql-font-serif/monospace` 样式；任务列表的勾选状态只读展示。其他自定义类可用 `class-styles` 映射。

已验证 Quill 2.0.3、wangEditor 5.1.23 和 TinyMCE 7.9.1 通过上述 API 导出的 HTML 示例。编辑器内的 DOM、Delta/JSON、自定义插件和完整编辑器主题不在此范围；代码块保留文本与缩进，不自动进行语法高亮。

### 音视频

在 HTML 中使用 `video`、`audio`，也可通过直接子级 `source` 提供多个来源。媒体不会自动播放；视频提供原生控件，音频提供播放与暂停按钮。

给媒体设置唯一的 `id`，即可播放、暂停或跳转进度。需要定位到媒体时，同时开启 `enable-anchor`。

```vue
<template>
  <wd-button @click="locateVideo">定位视频</wd-button>
  <wd-button @click="richText?.playMedia('trip')">播放视频</wd-button>
  <wd-button @click="richText?.pauseMedia('trip')">暂停视频</wd-button>
  <wd-button @click="richText?.seekMedia('trip', 5)">跳至 5 秒</wd-button>
  <wd-rich-text ref="richText" :content="content" enable-anchor @media-timeupdate="handleProgress" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onHide } from '@dcloudio/uni-app'
import type { RichTextExpose, RichTextMediaTimeUpdate } from '@/uni_modules/wot-ui/components/wd-rich-text/types'

const richText = ref<RichTextExpose>()
const content = '<video id="trip" src="https://example.com/trip.mp4"></video><audio id="music" title="阅读时光" src="https://example.com/music.mp3"></audio>'
async function locateVideo() {
  try {
    await richText.value?.scrollToAnchor('trip', { offset: 16 })
  } catch {
    uni.showToast({ title: '片段暂时无法定位', icon: 'none' })
  }
}
function handleProgress({ id, currentTime, duration }: RichTextMediaTimeUpdate) {
  console.log(id, currentTime, duration)
}
onHide(() => richText.value?.pauseMedia())
</script>
```

定位和跳转进度不会主动播放。建议在用户点击时直接调用播放方法；是否实际播放以 `media-play` 等平台事件为准。播放时会暂停同一组件内的其他媒体，页面隐藏时可用 `pauseMedia()` 暂停全部。

三个控制方法返回 `boolean`：`true` 表示已发送控制指令，不代表资源已加载或播放、跳转已完成；目标尚未挂载、加载失败、ID 为空/不存在/重复，或秒数不是非负有限数时返回 `false`。请在组件 `load` 后调用。ID 最多 128 个字符串代码单元，不含空白或控制字符，建议在整篇内容中唯一。

`media-play`、`media-pause`、`media-ended` 和 `media-timeupdate` 包含媒体的 HTML `id` 与当前来源 `src`；未设置有效 ID 时 `id` 为空字符串。进度单位为秒，频率由平台决定，未知时长为 0；超出时长的跳转和资源未就绪时的跳转由平台处理。

视频封面请使用 HTTP(S) 网络图片地址。请替换示例地址，并确认目标平台支持资源格式及网络访问。

所有来源都失败后，组件显示失败占位并触发 `error`，不会自动循环重试。修正资源地址后更新 `content` 即可重新加载；若要重试原地址，可由业务更新组件的 `key` 重新挂载。重新挂载会重置该组件内全部媒体的播放进度，并保持不自动播放。

### 长文章

可通过 `v-if` 按需挂载长文章内容，在用户展开文章时加载，减少页面初始渲染的内容。

```vue
<template>
  <wd-button @click="expanded = !expanded">{{ expanded ? '收起文章' : '展开文章' }}</wd-button>
  <wd-rich-text v-if="expanded" :content="content" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ content: string }>()
const expanded = ref(false)
</script>
```

::: details 相对资源与 Base64 图片
`base-url` 仅补全图片、媒体和封面地址，不修改链接 `href`。请使用 HTTP(S) 绝对基址：末尾有 `/` 时按目录解析，否则按文件地址解析。未设置时沿用平台解析规则；基址无效时相对资源被过滤。

`allow-data-image` 默认关闭。开启后接受不超过 64 KiB 的 PNG/JPEG/GIF/WebP Base64 图片，不接受 SVG。Data 图片触发 `image-click`，但不自动调用原生预览。
:::

## Attributes

| 参数             | 说明                                 | 类型                     | 默认值  |
| ---------------- | ------------------------------------ | ------------------------ | ------- |
| loading-image    | 图片加载中占位图，失败后退回文字     | `string`                 | `''`    |
| error-image      | 图片失败占位图，失败后退回 alt       | `string`                 | `''`    |
| enable-anchor    | 开启标题目录与锚点定位               | `boolean`                | `false` |
| content          | HTML 字符串                          | `string`                 | `''`    |
| selectable       | 允许选择文字，实际行为依平台而定     | `boolean`                | `false` |
| preview-image    | 点击普通图片时自动预览               | `boolean`                | `true`  |
| lazy-load        | 开启平台支持的图片懒加载             | `boolean`                | `false` |
| base-url         | 资源基址；不转换链接 href            | `string`                 | `''`    |
| allow-data-image | 允许 PNG/JPEG/GIF/WebP Base64 图片，最大 64 KiB；不自动预览 | `boolean`                | `false` |
| tag-style        | 标签默认样式映射                     | `Record<string, string>` | `{}`    |
| class-styles     | class 到内联样式的显式映射           | `Record<string, string>` | `{}`    |
| custom-class     | 根节点自定义类名                     | `string`                 | `''`    |
| custom-style     | 根节点内联样式                       | `string`                 | `''`    |

## Events

| 事件名称    | 说明                                                         | 参数                                                                                                          |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| image-load  | 原内容中的图片成功加载，每个图片节点一次；不包含占位图       | `{ src: string, index: number, width: number, height: number }`，宽高为实际像素尺寸                           |
| load        | 成功解析及节点更新完成，包含过滤后为空的情况；不等待图片或音视频资源加载 | `{ imageCount: number }`                                                                                      |
| error       | 解析或资源错误                                               | parse：`{ source, message, code? }`；image：`{ source, src, index }`；audio/video：`{ source, src, message }` |
| link-click  | 点击有有效地址的链接，包括图片链接                           | `{ href: string }`                                                                                            |
| image-click | 点击普通图片，无论是否开启自动预览；加载失败的图片不触发     | `{ src: string, index: number }`                                                                              |
| media-play  | 音视频开始播放                                               | `{ id: string, type: 'video' \| 'audio', src: string }`                                                                   |
| media-pause | 音视频暂停                                                   | 同上                                                                                                          |
| media-ended | 音视频播放结束                                               | 同上                                                                                                          |
| media-timeupdate | 播放进度更新 | `{ id, type, src, currentTime: number, duration: number }`，单位秒 |

图片 `index` 为内容中的出现顺序，从 0 开始，包含图片链接及没有有效地址的图片。

## Methods

| 方法名称       | 说明                                                       | 参数                                                                             | 返回值                                     |
| -------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
| getHeadings    | 获取当前标题目录的副本，未开启时为空                       | -                                                                                | `RichTextHeading[]`：`{ id, level, text }` |
| getAnchorRect  | 查询目标在内容视口中的位置                                 | `id: string`                                                                     | `Promise<{ top, left, width, height }>`    |
| scrollToAnchor | 页面滚动至目标；offset 为顶部预留距离，duration 为动画时长 | `id: string, options?: { offset?: number, duration?: number }`，默认 0px / 300ms | `Promise<void>`                            |
| getText        | 获取过滤后的纯文本，保留段落、换行和图片替代文字           | -                                                                                | `string`                                   |
| playMedia | 播放指定媒体 | `id: string` | `boolean` |
| pauseMedia | 暂停指定媒体；不传 ID 暂停全部，至少一个已发送指令时返回 true | `id?: string` | `boolean` |
| seekMedia | 跳转播放进度，不主动播放 | `id: string, seconds: number` | `boolean` |

## Slots

| 名称    | 说明                                       |
| ------- | ------------------------------------------ |
| default | 内容为空、过滤后无渲染节点或解析失败时显示 |

## CSS Variables

| 名称                              | 说明                 |
| --------------------------------- | -------------------- |
| --wot-rich-text-color             | 正文颜色             |
| --wot-rich-text-font-size         | 正文字号             |
| --wot-rich-text-line-height       | 正文行高，默认 `1.7` |
| --wot-rich-text-link-color        | 链接颜色             |
| --wot-rich-text-video-height      | 未指定内容高度时的视频高度，默认 `225px` |
| --wot-rich-text-image-state-min-height | 图片加载或失败时的最小高度，默认使用基础尺寸变量 `--wot-n-48`（`48px`） |
| --wot-rich-text-image-state-color | 图片状态文字颜色     |
| --wot-rich-text-image-state-bg    | 图片状态背景色       |
