import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export const gapProps = {
  ...baseProps,
  /**
   * 背景颜色
   * 类型: string
   * 默认值: 'transparent'
   */
  bgColor: makeStringProp('transparent'),
  /**
   * 是否开启底部安全区适配
   * 类型: boolean
   * 默认值: false
   */
  safeAreaBottom: makeBooleanProp(false),
  /**
   * 间隔槽高度，支持传入数值（单位px）或字符串（如 '20rpx'）
   * 类型: string | number
   * 默认值: 15
   */
  height: makeNumericProp(15)
}

export type GapProps = ExtractPropTypes<typeof gapProps>
