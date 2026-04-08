import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp, numericProp } from '../../common/props'
import { type TabsLineTheme } from '../wd-tabs/types'

/**
 * 级联选项数据结构
 */
export type CascaderOption = {
  /** 选项值 */
  value?: string | number
  /** 选项文本 */
  text?: string
  /** 子选项 */
  children?: CascaderOption[]
  /** 是否禁用 */
  disabled?: boolean
  /** 提示文案 */
  tip?: string
  /** 是否为叶子节点，为 true 时点击直接触发 confirm，不再调用 lazyLoad */
  isLeaf?: boolean
  /** 允许自定义其他属性 */
  [key: string]: any
}

/**
 * 级联面板状态数据
 */
export type CascaderTab = {
  /** 选项列表 */
  options: CascaderOption[]
  /** 已选中的选项 */
  selectedOption: CascaderOption | null
}

export const cascaderProps = {
  ...baseProps,
  /**
   * 选中项。静态模式下绑定叶子节点的值；异步模式下支持传入完整路径数组以自动逐级加载回显。
   * 类型: string | number | (string | number)[]
   * 默认值: -
   */
  modelValue: [String, Number, Array] as PropType<string | number | (string | number)[]>,
  /**
   * 层级选项数据，树形结构
   * 类型: Array<CascaderOption>
   * 默认值: []
   */
  options: makeArrayProp<CascaderOption>(),
  /**
   * 弹出层标题
   * 类型: string
   * 默认值: -
   */
  title: String,
  /**
   * 确定前校验函数，接收 (value, selectedOptions) 参数
   * 返回 false 可阻止确认，支持返回 Promise<boolean>。
   * 类型: CascaderBeforeConfirm
   * 默认值: -
   */
  beforeConfirm: Function as PropType<CascaderBeforeConfirm>,
  /**
   * 是否开启任意级可选。开启后点击节点仅更新当前路径，需通过右上角确认按钮提交。
   * 类型: boolean
   * 默认值: false
   */
  checkStrictly: makeBooleanProp(false),
  /**
   * 严格模式下确认按钮文案，为空时使用内置国际化文案。
   * 类型: string
   * 默认值: ''
   */
  confirmText: makeStringProp(''),
  /**
   * 选项对象中，value 对应的 key
   * 类型: string
   * 默认值: 'value'
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项对象中，展示的文本对应的 key
   * 类型: string
   * 默认值: 'text'
   */
  textKey: makeStringProp('text'),
  /**
   * 选项对象中，子节点对应的 key
   * 类型: string
   * 默认值: 'children'
   */
  childrenKey: makeStringProp('children'),
  /**
   * 选项对象中，提示文案对应的 key
   * 类型: string
   * 默认值: 'tip'
   */
  tipKey: makeStringProp('tip'),
  /**
   * 点击遮罩是否关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹窗层级
   * 类型: number
   * 默认值: 15
   */
  zIndex: makeNumberProp(15),
  /**
   * 弹出面板是否设置底部安全距离（iPhone X 等全面屏机型）
   * 类型: boolean
   * 默认值: true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 底部条宽度，单位像素或带单位的字符串
   * 类型: number | string
   * 默认值: -
   */
  lineWidth: numericProp,
  /**
   * 底部条高度，单位像素或带单位的字符串
   * 类型: number | string
   * 默认值: -
   */
  lineHeight: numericProp,
  /**
   * 底部条位置样式
   * 类型: string
   * 可选值: 'normal' | 'text' | 'underline' | 'dot'
   * 默认值: 'normal'
   */
  lineTheme: makeStringProp<TabsLineTheme>('normal'),
  /**
   * 是否使用 root-portal 脱离文档流（用于解决 fixed 失效或层级冲突问题）
   * 类型: boolean
   * 默认值: false
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 弹窗是否显示
   * 类型: boolean
   * 默认值: false
   */
  visible: makeBooleanProp(false),
  /**
   * 异步加载子节点的回调函数，提供后将启用异步加载模式。
   * option 为 null 时表示加载根节点；resolve([]) 表示该节点为叶子节点，触发 confirm。
   * 类型: CascaderLazyLoad
   * 默认值: -
   */
  lazyLoad: Function as PropType<CascaderLazyLoad>,
  /**
   * 选项对象中，标识叶子节点的 key，值为 true 时点击直接触发 confirm
   * 类型: string
   * 默认值: 'isLeaf'
   */
  isLeafKey: makeStringProp('isLeaf')
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

/**
 * 确认前的回调函数类型
 */
export type CascaderBeforeConfirm = (value: string | number, selectedOptions: CascaderOption[]) => boolean | Promise<boolean>

/**
 * 异步加载子节点的回调类型
 * @param option 父节点选项，null 表示加载根节点
 * @param tabIndex 当前加载的列下标
 * @param resolve 加载完成后调用，传入子选项列表；传入空数组表示该节点为叶子节点
 */
export type CascaderLazyLoad = (option: CascaderOption | null, tabIndex: number, resolve: (children: CascaderOption[]) => void) => void

/**
 * 组件暴露的方法实例
 */
export type CascaderExpose = {
  /**
   * 关闭 picker 弹框
   */
  close: () => void
  /**
   * 打开 picker 弹框
   */
  open: () => void
}

export type CascaderInstance = ComponentPublicInstance<CascaderExpose, CascaderProps>
