import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../../common/props'

/**
 * 标签类型
 * 可选值: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'volcano' | 'lightblue' | 'cyan' | 'pink' | 'purple'
 */
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'volcano' | 'lightblue' | 'cyan' | 'pink' | 'purple'

/**
 * 标签变体
 * 可选值: 'light' | 'dark' | 'plain' | 'dashed' | 'text'
 */
export type TagVariant = 'light' | 'dark' | 'plain' | 'dashed' | 'text'

/**
 * 标签尺寸
 * 可选值: 'small' | 'medium' | 'large' | 'extra-large' | 'default'
 */
export type TagSize = 'small' | 'medium' | 'large' | 'extra-large' | 'default'

export const tagProps = {
  ...baseProps,

  /**
   * 标签尺寸
   * 类型: TagSize
   * 可选值: 'small' | 'medium' | 'large' | 'extra-large' | 'default'
   * 默认值: 'default'
   */
  size: makeStringProp<TagSize>('default'),
  /**
   * 标签类型
   * 类型: TagType
   * 可选值: 'default' | 'primary' | 'danger' | 'warning' | 'success' | 'volcano' | 'lightblue' | 'cyan' | 'pink' | 'purple'
   * 默认值: 'default'
   */
  type: makeStringProp<TagType>('default'),
  /**
   * 左侧图标
   * 类型: string
   * 默认值: ''
   */
  icon: makeStringProp(''),
  /**
   * 是否可关闭（只对圆角类型支持）
   * 类型: boolean
   * 默认值: false
   */
  closable: makeBooleanProp(false),
  /**
   * 是否为新增标签
   * 类型: boolean
   * 默认值: false
   */
  dynamic: makeBooleanProp(false),
  /**
   * 文字颜色
   * 类型: string
   * 默认值: ''
   */
  color: makeStringProp(''),
  /**
   * 背景色和边框色
   * 类型: string
   * 默认值: ''
   */
  bgColor: makeStringProp(''),
  /**
   * 圆角类型
   * 类型: boolean
   * 默认值: false
   */
  round: makeBooleanProp(false),
  /**
   * 标记类型
   * 类型: boolean
   * 默认值: false
   */
  mark: makeBooleanProp(false),
  /**
   * 标签变体
   * 类型: TagVariant
   * 可选值: 'light' | 'dark' | 'plain' | 'dashed' | 'text'
   * 默认值: 'dark'
   */
  variant: makeStringProp<TagVariant>('dark')
}

export type TagProps = ExtractPropTypes<typeof tagProps>
