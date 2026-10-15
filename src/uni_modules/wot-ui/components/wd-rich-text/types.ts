import type { RichTextParseErrorCode } from './limits'
import type { ComponentPublicInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../../common/props'

/** 解析器清洗后的内部节点，不作为组件输入 API。 */
export type RichTextTag =
  | 'div'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'strong'
  | 'em'
  | 'u'
  | 's'
  | 'sub'
  | 'sup'
  | 'a'
  | 'img'
  | 'ul'
  | 'ol'
  | 'li'
  | 'table'
  | 'colgroup'
  | 'col'
  | 'thead'
  | 'tbody'
  | 'tfoot'
  | 'tr'
  | 'td'
  | 'th'
  | 'br'
  | 'hr'
  | 'blockquote'
  | 'pre'
  | 'code'
  | 'mark'
  | 'small'
  | 'ins'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'figure'
  | 'figcaption'
  | 'caption'
  | 'video'
  | 'audio'
  | 'source'
export type RichTextInputNode =
  | { type: 'text'; text: string }
  | { type: 'element'; name: RichTextTag; attrs?: Record<string, string>; children?: RichTextInputNode[] }

/** 可直接交给原生 rich-text 的节点，只有转换层能够构造。 */
export type NativeRichTextNode = { type: 'text'; text: string } | { name: string; attrs: Record<string, string>; children: NativeRichTextNode[] }

/** 解析选项；样式映射的值仍须经过统一清洗。 */
export interface RichTextParseOptions {
  enableAnchor?: boolean
  baseUrl?: string
  allowDataImage?: boolean
  tagStyle?: Record<string, string>
  classStyles?: Record<string, string>
}

/** 每次转换独立分配节点 ID，渲染策略与原始输入分离。 */
export interface RichTextRenderNode {
  id: string
  kind: 'static' | 'text' | 'element' | 'link' | 'image' | 'table' | 'media'
  name: string
  style: string
  text?: string
  marker?: string
  href?: string
  src?: string
  imageIndex?: number
  /** 用于原生预览的地址；空字符串表示此图片不参与预览。 */
  previewSrc?: string
  anchorId?: string
  alt?: string
  imageStyle?: string
  fixedHeight?: boolean
  children: RichTextRenderNode[]
  nativeNodes?: NativeRichTextNode[]
  tableStyle?: string
  /** HTML 中的媒体 ID，与内部渲染 ID 分离。 */
  mediaId?: string
  mediaType?: 'video' | 'audio'
  sources?: string[]
  poster?: string
  loop?: boolean
  muted?: boolean
}

export interface RichTextImageClick {
  src: string
  index: number
}
/** 图片成功加载后的实际像素尺寸，不是页面布局尺寸。 */
export interface RichTextImageLoad extends RichTextImageClick {
  width: number
  height: number
}
/** 标题目录条目；id 仅用于本组件的定位方法。 */
export interface RichTextHeading {
  id: string
  level: number
  text: string
}
/** 相对 uni-app 内容视口的位置，单位 px；H5 不含顶部导航栏。 */
export interface RichTextAnchorRect {
  top: number
  left: number
  width: number
  height: number
}
export interface RichTextAnchorOptions {
  /** 顶部预留距离，单位 px。默认 0。 */
  offset?: number
  /** 滚动动画时长，单位 ms。默认 300。 */
  duration?: number
}
export interface RichTextLinkClick {
  href: string
}
export interface RichTextMediaEvent {
  /** HTML 中的媒体 ID；未设置时为空字符串。 */
  id: string
  type: 'video' | 'audio'
  src: string
}

/** 平台实际上报的播放进度，单位秒。未知或无效时间归零。 */
export interface RichTextMediaTimeUpdate extends RichTextMediaEvent {
  currentTime: number
  duration: number
}
/** 内部媒体控制器；返回值仅表示是否已向平台发出指令。 */
export interface RichTextMediaController {
  id: string
  play: () => boolean
  pause: () => boolean
  seek: (seconds: number) => boolean
}

/** 内容解析或资源加载错误。 */
export type RichTextError =
  | { source: 'parse'; message: string; code?: RichTextParseErrorCode }
  | { source: 'image'; src: string; index: number }
  | { source: 'video' | 'audio'; src: string; message: string }
/** 内容解析完成，尚不代表图片加载完成。 */
export interface RichTextLoad {
  imageCount: number
}
/** 组件暴露方法。 */
export interface RichTextExpose {
  getText: () => string
  /** 同步发送播放指令，建议在用户点击事件内调用。 */
  playMedia: (id: string) => boolean
  /** 不传 ID 时暂停全部；传 ID 时只暂停目标。 */
  pauseMedia: (id?: string) => boolean
  /** 跳转到指定秒数，不主动开始播放。 */
  seekMedia: (id: string, seconds: number) => boolean
  getHeadings: () => RichTextHeading[]
  getAnchorRect: (id: string) => Promise<RichTextAnchorRect>
  scrollToAnchor: (id: string, options?: RichTextAnchorOptions) => Promise<void>
}
export interface RichTextRenderContext {
  selectable: () => boolean
  lazyLoad: () => boolean
  loadingImage: () => string
  errorImage: () => string
  imageLoad: (event: RichTextImageLoad) => void
  registerAnchor: (id: string, measure: () => Promise<RichTextAnchorRect>) => () => void
  imageError: (event: RichTextImageClick) => void
  imageClick: (event: RichTextImageClick) => void
  linkClick: (event: RichTextLinkClick) => void
  registerMedia: (id: string, controller: RichTextMediaController) => () => void
  mediaEvent: (id: string, event: 'play' | 'pause' | 'ended', detail: RichTextMediaEvent) => void
  mediaTimeUpdate: (event: RichTextMediaTimeUpdate) => void
  mediaError: (event: Extract<RichTextError, { source: 'video' | 'audio' }>) => void
}
export const richTextContextKey: InjectionKey<RichTextRenderContext> = Symbol('wd-rich-text')

export const richTextProps = {
  ...baseProps,
  /**
   * HTML 内容，支持的标签、属性和样式会经过白名单过滤。
   * 类型: string
   * 默认值: ''
   */
  content: makeStringProp(''),
  /**
   * 是否允许选择文字，具体行为取决于平台。
   * 类型: boolean
   * 默认值: false
   */
  selectable: makeBooleanProp(false),
  /**
   * 是否在点击普通图片时调用 uni.previewImage；有效图片链接仅触发链接事件，无效链接内图片按普通图片处理。
   * 类型: boolean
   * 默认值: true
   */
  previewImage: makeBooleanProp(true),
  /**
   * 是否开启图片懒加载，具体行为取决于平台。
   * 类型: boolean
   * 默认值: false
   */
  lazyLoad: makeBooleanProp(false),
  /**
   * 图片加载中占位图，地址经过资源校验；加载失败后退回文字占位。
   * 类型: string
   * 默认值: ''
   */
  loadingImage: makeStringProp(''),
  /**
   * 图片失败占位图，失败时退回 alt 文字。
   * 类型: string
   * 默认值: ''
   */
  errorImage: makeStringProp(''),
  /**
   * 开启标题目录和锚点定位；仅展开需要定位的节点及其祖先。
   * 类型: boolean
   * 默认值: false
   */
  enableAnchor: makeBooleanProp(false),
  /** 图片资源的 HTTP(S) 基址，支持文件或目录地址；不转换 href。默认值: ''。 */
  baseUrl: makeStringProp(''),
  /** 是否允许最大 64 KiB 的 PNG/JPEG/GIF/WebP Base64 图片；默认不自动预览。默认值: false。 */
  allowDataImage: makeBooleanProp(false),
  /** 标签默认内联样式；优先级低于 classStyles 和内容内联样式。默认值: {}。 */
  tagStyle: { type: Object as PropType<Record<string, string>>, default: () => ({}) },
  /** HTML class 到内联样式的显式映射，不向宿主页面透传 class。默认值: {}。 */
  classStyles: { type: Object as PropType<Record<string, string>>, default: () => ({}) }
}
export type RichTextProps = ExtractPropTypes<typeof richTextProps>
export type RichTextInstance = ComponentPublicInstance<RichTextProps, RichTextExpose>
