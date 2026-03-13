import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, makeNumericProp, numericProp } from '../common/props'

/**
 * 必填星号位置
 * 可选值: 'start' | 'end'
 */
export type CellAsteriskPosition = 'start' | 'end'

/**
 * 单元格布局方式
 * 可选值: 'horizontal' | 'vertical'
 */
export type CellLayout = 'horizontal' | 'vertical'

/**
 * 右侧内容对齐方式
 * 可选值: 'left' | 'right' | 'center'
 */
export type CellValueAlign = 'left' | 'right' | 'center'

/**
 * 箭头方向
 * 可选值: 'left' | 'up' | 'down' | 'right'
 */
export type CellArrowDirection = 'left' | 'up' | 'down' | 'right'

/**
 * 单元格大小
 * 可选值: 'large'
 */
export type CellSize = 'large'

export const cellProps = {
  ...baseProps,
  /**
   * 左侧标题
   * 类型: string
   */
  title: String,
  /**
   * 右侧内容
   * 类型: string | number
   * 默认值: ''
   */
  value: makeNumericProp(''),
  /**
   * 占位符，仅在 value 为空时显示
   * 类型: string
   */
  placeholder: String,
  /**
   * 前置图标类名
   * 类型: string
   */
  prefixIcon: String,
  /**
   * 后置图标类名
   * 类型: string
   */
  suffixIcon: String,
  /**
   * 图标大小
   * 类型: string | number
   */
  iconSize: numericProp,
  /**
   * 图标类名前缀，用于使用自定义图标
   * 类型: string
   */
  iconPrefix: String,
  /**
   * 标题下方的描述信息
   * 类型: string
   */
  label: String,
  /**
   * 点击后跳转的链接地址
   * 类型: string
   */
  to: String,
  /**
   * 跳转时是否替换当前页面历史
   * 类型: boolean
   * 默认值: false
   */
  replace: makeBooleanProp(false),
  /**
   * 是否开启点击反馈
   * 类型: boolean
   * 默认值: false
   */
  clickable: makeBooleanProp(false),
  /**
   * 是否展示右侧箭头并开启点击反馈
   * 类型: boolean
   * 默认值: false
   */
  isLink: makeBooleanProp(false),
  /**
   * 单元格大小
   * 类型: CellSize
   * 可选值: 'large'
   */
  size: String as PropType<CellSize>,
  /**
   * 是否显示内边框
   * 类型: boolean
   * 默认值: 继承自 CellGroup
   */
  border: makeBooleanProp(void 0),
  /**
   * 左侧标题宽度
   * 类型: string | number
   */
  titleWidth: numericProp,
  /**
   * 是否垂直居中
   * 类型: boolean
   * 默认值: 继承自 CellGroup
   */
  center: makeBooleanProp(void 0),
  /**
   * 是否显示表单必填星号
   * 类型: boolean
   * 默认值: false
   */
  required: makeBooleanProp(false),
  /**
   * 单元格布局方式
   * 类型: CellLayout
   * 可选值: 'horizontal' | 'vertical'
   */
  layout: String as PropType<CellLayout>,
  /**
   * 右侧内容对齐方式
   * 类型: CellValueAlign
   * 可选值: 'left' | 'right' | 'center'
   */
  valueAlign: String as PropType<CellValueAlign>,
  /**
   * 是否超出隐藏显示省略号
   * 类型: boolean
   * 默认值: false
   */
  ellipsis: makeBooleanProp(false),
  /**
   * 是否启用 title 插槽
   * 类型: boolean
   * 默认值: true
   */
  useTitleSlot: makeBooleanProp(true),
  /**
   * 必填星号位置
   * 类型: CellAsteriskPosition
   * 可选值: 'start' | 'end'
   * 默认值: 'start'
   */
  asteriskPosition: makeStringProp<CellAsteriskPosition>('start'),
  /**
   * 是否隐藏必填星号
   * 类型: boolean
   * 默认值: false
   */
  hideAsterisk: makeBooleanProp(false),
  /**
   * 箭头方向，仅在 isLink 为 true 时生效
   * 类型: CellArrowDirection
   * 可选值: 'left' | 'up' | 'down' | 'right'
   * 默认值: 'right'
   */
  arrowDirection: makeStringProp<CellArrowDirection>('right'),
  /**
   * 前置图标自定义样式类
   * 类型: string
   * 默认值: ''
   */
  customPrefixClass: makeStringProp(''),
  /**
   * 后置图标自定义样式类
   * 类型: string
   * 默认值: ''
   */
  customSuffixClass: makeStringProp(''),
  /**
   * label 插槽的自定义样式类
   * 类型: string
   * 默认值: ''
   */
  customLabelClass: makeStringProp(''),
  /**
   * value 插槽的自定义样式类
   * 类型: string
   * 默认值: ''
   */
  customValueClass: makeStringProp(''),
  /**
   * title 插槽的自定义样式类
   * 类型: string
   * 默认值: ''
   */
  customTitleClass: makeStringProp('')
}

export type CellProps = ExtractPropTypes<typeof cellProps>
