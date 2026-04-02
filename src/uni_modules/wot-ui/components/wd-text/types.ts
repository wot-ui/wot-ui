import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../../common/props'

/**
 * 主题类型
 */
export type TextType = 'default' | 'primary' | 'success' | 'warning' | 'error'

/**
 * 文本处理模式
 */
export type TextMode = 'text' | 'date' | 'phone' | 'name' | 'price'

/**
 * 文本装饰类型
 */
export type TextDecoration = 'none' | 'underline' | 'line-through' | 'overline'

export const textProps = {
  ...baseProps,
  /**
   * 主题类型
   * 类型: TextType
   * 可选值: 'default' | 'primary' | 'success' | 'warning' | 'error'
   * 默认值: default
   */
  type: makeStringProp<TextType>('default'),
  /**
   * 文字内容
   * 类型: string | number
   */
  text: makeNumericProp(''),
  /**
   * 字体大小
   * 类型: string
   */
  size: makeStringProp(''),
  /**
   * 文本处理的匹配模式
   * 类型: TextMode
   * 可选值: 'text' | 'date' | 'phone' | 'name' | 'price'
   * 默认值: text
   */
  mode: makeStringProp<TextMode>('text'),
  /**
   * 文字装饰，下划线、中划线等
   * 类型: TextDecoration
   * 可选值: 'none' | 'underline' | 'line-through' | 'overline'
   * 默认值: none
   */
  decoration: makeStringProp<TextDecoration>('none'),
  /**
   * mode为phone时，点击文本是否拨打电话
   * 类型: boolean
   * 默认值: false
   */
  call: makeBooleanProp(false),
  /**
   * 是否粗体
   * 类型: boolean
   * 默认值: false
   */
  bold: makeBooleanProp(false),
  /**
   * 是否脱敏，当mode为phone和name时生效
   * 类型: boolean
   * 默认值: false
   */
  format: makeBooleanProp(false),
  /**
   * 文本颜色
   * 类型: string
   */
  color: makeStringProp(''),
  /**
   * 前缀内容
   * 类型: string
   */
  prefix: String,
  /**
   * 后缀内容
   * 类型: string
   */
  suffix: String,
  /**
   * 文本显示的行数，超出此行数将显示省略号，最大值为5
   * 类型: number
   */
  lines: Number,
  /**
   * 文本行高
   * 类型: string
   */
  lineHeight: makeStringProp(''),
  /**
   * 自定义根节点样式
   * 类型: string
   */
  customStyle: makeStringProp(''),
  /**
   * 自定义根节点样式类
   * 类型: string
   */
  customClass: makeStringProp('')
}

export type TextProps = ExtractPropTypes<typeof textProps>
