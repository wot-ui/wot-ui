import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../../common/props'
import type { ImageMode } from '../wd-img/types'

/**
 * 头像尺寸类型
 * 可选值: 'large' | 'medium' | 'normal' | 'small'
 */
export type AvatarSize = 'large' | 'medium' | 'normal' | 'small'

/**
 * 头像形状类型
 * 可选值: 'square' | 'round'
 */
export type AvatarShape = 'square' | 'round'

/**
 * Avatar 组件 Props 定义
 */
export const avatarProps = {
  ...baseProps,

  /**
   * 图片地址
   * 类型: string
   * 默认值: ''
   */
  src: makeStringProp(''),
  /**
   * 文本内容
   * 类型: string
   * 默认值: 空字符串
   */
  text: makeStringProp(''),
  /**
   * 头像尺寸，支持预设尺寸或自定义大小
   * 类型: string | number | AvatarSize
   * 可选值: 'large' | 'medium' | 'normal' | 'small' 或带单位的字符串(如 40px、100rpx)
   * 默认值: 'normal'
   */
  size: {
    type: [String, Number] as PropType<string | number | AvatarSize>
  },
  /**
   * 头像形状
   * 类型: AvatarShape
   * 可选值: 'round' | 'square'
   * 默认值: 'round'
   */
  shape: String as PropType<AvatarShape>,
  /**
   * 背景颜色
   * 类型: string
   * 默认值: ''
   */
  bgColor: makeStringProp(''),

  /**
   * 文字颜色
   * 类型: string
   * 默认值: ''
   */
  color: makeStringProp(''),

  /**
   * 图标名称，用于显示 wd-icon 组件
   * 类型: string
   * 默认值: ''
   */
  icon: makeStringProp(''),

  /**
   * 图片加载失败时的占位文本
   * 类型: string
   * 默认值: ''
   */
  alt: makeStringProp(''),

  /**
   * 图片填充模式，与 uni-app image 组件的 mode 属性一致
   * 类型: ImageMode
   * 默认值: 'aspectFill'
   */
  mode: makeStringProp<ImageMode>('aspectFill'),

  /**
   * 内部标记，用于 avatar-group 组件内部使用
   * 类型: boolean
   * 默认值: false
   * @private
   */
  _internal: Boolean
}

/**
 * Avatar 组件 Props 类型
 */
export type AvatarProps = ExtractPropTypes<typeof avatarProps>
