/*
 * wd-action-sheet types
 * --------------------
 * 组件动作面板相关的 TypeScript 类型定义与 props 元数据。
 * 只包含类型与注释，不包含运行时逻辑。请保持注释为中文以便编辑器提示友好。
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

/**
 * 动作面板选项
 */
export type Action = {
  /**
   * 选项显示文本
   * 示例: '删除', '分享到群'
   */
  name: string
  /**
   * 附加描述信息（可选），在二级描述场景展示
   * 示例: '将图片保存到本地'
   */
  description?: string
  /**
   * 文本颜色，例如 '#ff0000' 或 'var(--wot-danger)'
   */
  color?: string
  /**
   * 是否禁用该选项
   * 默认: false
   */
  disabled?: boolean
  /**
   * 是否显示加载态（优先展示 loading，而非文字）
   */
  loading?: boolean
}

/**
 * 宫格面板选项
 */
export type Panel = {
  /**
   * 图标标识，支持以下用法：
   * - 传入内置图标名（例如 'user', 'share-internal'）
   * - 传入图片 URL（例如 'https://...'）
   * 组件将根据值自动判断并渲染 Icon 组件或图片元素。
   */
  icon: string
  /**
   * 标题文本，显示在图标下方
   */
  title: string
}

/**
 * 单行宫格（即一组 Panel）
 */
export type PanelRow = Panel[]

/**
 * 支持的 panels 类型：可以是单行 Panel 数组，也可以是多行（二级数组）
 * 示例:
 * ```ts
 * // 单行
 * panels: [{ icon: 'user', title: '好友' }, { icon: 'qrcode', title: '二维码' }]
 * // 多行
 * panels: [[{ icon: 'user', title: '好友' }], [{ icon: 'save', title: '保存' }]]
 * ```
 */
export type Panels = Array<Panel | PanelRow>

export const actionSheetProps = {
  ...baseProps,
  /**
   * title 头部样式类
   * 类型: string
   * 默认值: ''
   */
  customTitleClass: makeStringProp(''),
  /**
   * 设置菜单显示隐藏
   * 类型: boolean
   * 默认值: false
   */
  modelValue: makeBooleanProp(false),
  /**
   * 菜单选项
   * 类型: Action[]
   * 默认值: []
   */
  actions: makeArrayProp<Action>(),
  /**
   * 自定义宫格面板项。
   * - 可传入单行数组: `Panel[]`（会渲染为一行宫格）
   * - 可传入二维数组: `Panel[][]`（会按行渲染多行宫格）
   * 类型: Array<Panel | Panel[]>
   * 默认值: []
   */
  panels: makeArrayProp<Panel | Panel[]>(),
  /**
   * 标题
   * 类型: string
   * 默认值: ''
   */
  title: String,
  /**
   * 取消按钮文案
   * 类型: string
   * 默认值: ''
   */
  cancelText: String,
  /**
   * 点击选项后是否关闭菜单
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickAction: makeBooleanProp(true),
  /**
   * 点击遮罩是否关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹框动画持续时间
   * 类型: number
   * 默认值: 200
   */
  duration: makeNumberProp(200),
  /**
   * 菜单层级
   * 类型: number
   * 默认值: 10
   */
  zIndex: makeNumberProp(10),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型: boolean
   * 默认值: true
   */
  lazyRender: makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * 类型: boolean
   * 默认值: true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型: boolean
   * 默认值: false
   */
  rootPortal: makeBooleanProp(false)
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
