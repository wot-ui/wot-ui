import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 主题类型
 */
export type CountToType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export const countToProps = {
  ...baseProps,
  /**
   * 文本颜色
   * 类型: string
   * 默认值: ''
   */
  color: makeStringProp(''),

  /**
   * 主题类型
   * 类型: CountToType
   * 可选值: 'default' | 'primary' | 'success' | 'warning' | 'error'
   * 默认值: 'default'
   */
  type: makeStringProp<CountToType>('default'),

  /**
   * 起始值
   * 类型: number
   * 默认值: 0
   */
  startVal: makeNumberProp(0),

  /**
   * 最终值
   * 类型: number
   * 默认值: 2024
   */
  endVal: makeNumberProp(2024),

  /**
   * 从起始值到结束值数字变动的时间，单位毫秒
   * 类型: number
   * 默认值: 3000
   */
  duration: makeNumberProp(3000),

  /**
   * 是否自动开始
   * 类型: boolean
   * 默认值: true
   */
  autoStart: makeBooleanProp(true),

  /**
   * 保留的小数位数，需大于等于0
   * 类型: number
   * 默认值: 0
   */
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },

  /**
   * 小数点符号
   * 类型: string
   * 默认值: '.'
   */
  decimal: makeStringProp('.'),

  /**
   * 千分位分隔符
   * 类型: string
   * 默认值: ','
   */
  separator: makeStringProp(','),

  /**
   * 前缀
   * 类型: string
   * 默认值: ''
   */
  prefix: makeStringProp(''),

  /**
   * 后缀
   * 类型: string
   * 默认值: ''
   */
  suffix: makeStringProp(''),

  /**
   * 是否使用缓动动画效果
   * 类型: boolean
   * 默认值: true
   */
  useEasing: makeBooleanProp(true)
}

export type CountToProps = ExtractPropTypes<typeof countToProps>

export type CountToExpose = {
  /**
   * 开始计数
   */
  start: () => void
  /**
   * 暂停计数
   */
  pause: () => void
  /**
   * 重置计数，若 autoStart 为 true，重置后会自动开始计数
   */
  reset: () => void
}

export type CountToInstance = ComponentPublicInstance<CountToProps, CountToExpose>
