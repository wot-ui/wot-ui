import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../../common/props'

export const slideVerifyProps = {
  ...baseProps,
  /**
   * 容错范围（单位：px），距离终点多少距离内视为验证通过
   * 类型: number
   * 默认值: 10
   */
  tolerance: {
    type: Number,
    default: 10
  },

  /**
   * 提示文字
   * 类型: string
   * 默认值: ''
   */
  text: makeStringProp(''),

  /**
   * 验证成功提示文字
   * 类型: string
   * 默认值: ''
   */
  successText: makeStringProp(''),

  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 背景颜色
   * 类型: string
   */
  backgroundColor: String,

  /**
   * 激活时的背景颜色
   * 类型: string
   */
  activeBackgroundColor: String,

  /**
   * 滑块图标名称
   * 类型: string
   * 默认值: 'double-right'
   */
  icon: makeStringProp('double-right'),

  /**
   * 成功图标名称
   * 类型: string
   * 默认值: 'check-circle-fill'
   */
  successIcon: makeStringProp('check-circle-fill'),

  /**
   * 图标大小（单位：px）
   * 类型: string | number
   * 默认值: 20
   */
  iconSize: numericProp,

  /**
   * 成功图标大小（单位：px）
   * 类型: string | number
   * 默认值: 12
   */
  successIconSize: numericProp
}

export type SlideVerifyProps = ExtractPropTypes<typeof slideVerifyProps>

export type SlideVerifyExpose = {
  /**
   * 初始化尺寸信息
   */
  init: () => Promise<void>
  /**
   * 重置验证组件到初始状态
   */
  reset: () => void
}

export type SlideVerifyEmits = {
  /** 验证成功事件 */
  success: []
  /** 验证失败事件 */
  fail: []
}

export type SlideVerifyInstance = ComponentPublicInstance<SlideVerifyProps, SlideVerifyExpose>
