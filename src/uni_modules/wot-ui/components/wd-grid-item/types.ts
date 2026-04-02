import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp, numericProp, makeBooleanProp } from '../../common/props'
import type { BadgeProps } from '../wd-badge/types'

/**
 * 页面跳转方式
 */
export type LinkType = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'

/**
 * GridItem 组件属性定义
 */
export const gridItemProps = {
  ...baseProps,
  /**
   * GridItem 下方文字样式
   * 类型: string
   * 默认值: ''
   */
  customText: makeStringProp(''),
  /**
   * GridItem 上方 icon 样式
   * 类型: string
   * 默认值: ''
   */
  customIcon: makeStringProp(''),
  /**
   * 文字
   * 类型: string
   * 默认值: ''
   */
  text: String,
  /**
   * 点击后跳转的链接地址
   * 类型: string
   * 默认值: ''
   */
  url: String,
  /**
   * 页面跳转方式
   * 可选值: 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'
   * 默认值: 'navigateTo'
   */
  linkType: makeStringProp<LinkType>('navigateTo'),
  /**
   * 图标名称，可选值见 wd-icon 组件
   * 类型: string
   * 默认值: ''
   */
  icon: makeStringProp(''),
  /**
   * 图标颜色
   * 类型: string
   * 默认值: ''
   */
  iconColor: String,
  /**
   * 图标类名前缀
   * 类型: string
   * 默认值: ''
   */
  iconPrefix: String,
  /**
   * 徽标显示值
   * 类型: string | number
   * 默认值: ''
   */
  value: numericProp,
  /**
   * 是否点状徽标
   * 类型: boolean
   * 默认值: false
   */
  isDot: Boolean,
  /**
   * 徽标最大值
   * 类型: number
   * 默认值: 99
   */
  max: Number,
  /**
   * 徽标属性，透传给 Badge 组件
   * 类型: Partial<BadgeProps>
   * 默认值: {}
   */
  badgeProps: Object as PropType<Partial<BadgeProps>>,
  /**
   * 是否超出隐藏，显示省略号
   * 类型: boolean
   * 默认值: false
   */
  ellipsis: makeBooleanProp(false)
}

/**
 * GridItem 组件属性类型
 */
export type GridItemProps = ExtractPropTypes<typeof gridItemProps>
