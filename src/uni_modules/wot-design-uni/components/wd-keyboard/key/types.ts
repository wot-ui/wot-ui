import type { ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../../common/props'

export type NumberKeyType = '' | 'delete' | 'extra' | 'close'

export const keyProps = {
  /**
   * 键盘按键类型
   * 类型：string
   * 可选值：'' | 'delete' | 'extra' | 'close'
   */
  type: makeStringProp<NumberKeyType>(''),
  /**
   * 按键文本
   * 类型：string | number
   */
  text: makeNumericProp(''),
  /**
   * 是否占据更宽的空间
   * 类型：boolean
   * 默认值：false
   */
  wider: makeBooleanProp(false),
  /**
   * 是否是大按键
   * 类型：boolean
   * 默认值：false
   */
  large: makeBooleanProp(false),
  /**
   * 是否正在加载中
   * 类型：boolean
   * 默认值：false
   */
  loading: makeBooleanProp(false),
  /**
   * 是否为车牌键盘模式
   * 类型：boolean
   * 默认值：false
   */
  isCar: makeBooleanProp(false)
}

export type KeyProps = ExtractPropTypes<typeof keyProps>
