import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../../common/props'

/**
 * notify 通知类型
 */
export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'
/**
 * notify 弹出位置
 */
export type NotifyPosition = 'top' | 'bottom'
/**
 * notify 展示形态
 */
export type NotifyVariant = 'filled' | 'floating'
/**
 * notify 属性定义
 */
export type NotifyProps = Omit<Partial<ExtractPropTypes<typeof notifyProps>>, 'selector'> & {
  /**
   * 点击时的回调函数
   * @param {MouseEvent} event 鼠标事件
   */
  onClick?: (event: MouseEvent) => void
  /**
   * 关闭时的回调函数
   */
  onClosed?: () => void
  /**
   * 打开时的回调函数
   */
  onOpened?: () => void
}
/**
 * notify 主题变量
 */
export type NotifyThemeVars = {
  notifyPadding?: string
  notifyFontSize?: string
  notifyTextColor?: string
  notifyLineHeight?: number | string
  notifyDangerBackground?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyWarningBackground?: string
}
export const notifyProps = {
  ...baseProps,
  /**
   * 类型
   * 类型: string
   * 可选值: 'primary' | 'success' | 'danger' | 'warning'
   * 默认值: 'danger'
   */
  type: makeStringProp<NotifyType>('danger'),
  /**
   * 字体颜色
   * 类型: string
   * 默认值: ''
   */
  color: makeStringProp(''),
  /**
   * 将组件的 z-index 层级设置为一个固定值
   * 类型: number
   * 默认值: 99
   */
  zIndex: makeNumberProp(99),
  /**
   * 显示状态
   * 类型: boolean
   * 默认值: false
   */
  visible: makeBooleanProp(false),
  /**
   * 展示文案，支持通过\n换行
   * 类型: string | number
   * 默认值: ''
   */
  message: makeNumericProp(''),
  /**
   * 指定唯一标识
   * 类型: string
   * 默认值: ''
   */
  selector: makeStringProp(''),
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失
   * 类型: number
   * 默认值: 3000
   */
  duration: makeNumberProp(3000),
  /**
   * 弹出位置
   * 类型: string
   * 可选值: 'top' | 'bottom'
   * 默认值: 'top'
   */
  position: makeStringProp<NotifyPosition>('top'),
  /**
   * 顶部安全高度
   * 类型: number
   * 默认值: -
   */
  safeHeight: Number,
  /**
   * 背景颜色
   * 类型: string
   * 默认值: ''
   */
  background: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型: boolean
   * 默认值: false
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 是否显示关闭按钮
   * 类型: boolean
   * 默认值: false
   */
  closable: makeBooleanProp(false),
  /**
   * 展示形态
   * 类型: string
   * 可选值: 'filled' | 'floating'
   * 默认值: 'filled'
   */
  variant: makeStringProp<NotifyVariant>('filled')
}
