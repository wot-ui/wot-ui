import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'
import { type CellValueAlign, type CellAsteriskPosition, type CellLayout, type CellSize } from '../wd-cell/types'

export const formItemProps = {
  ...baseProps,
  /**
   * 表单域 model 字段名
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * 标题
   */
  title: String,
  /**
   * 前置图标类名
   */
  prefixIcon: String,
  /**
   * 图标大小
   */
  iconSize: numericProp,
  /**
   * 类名前缀，用于使用自定义图标
   */
  iconPrefix: String,
  /**
   * 描述信息
   */
  label: String,
  /**
   * 是否开启点击反馈
   */
  clickable: makeBooleanProp(false),
  /**
   * 是否展示右侧箭头并开启点击反馈
   */
  isLink: makeBooleanProp(false),
  // ========== 可继承属性（使用 undefined 默认值）==========
  /**
   * 设置单元格大小，可选值：large
   * 类型: CellSize
   */
  size: String as PropType<CellSize>,
  /**
   * 是否展示边框线
   * 类型: boolean
   */
  border: makeBooleanProp(void 0),
  /**
   * 设置左侧标题宽度
   * 类型: string | number
   */
  titleWidth: numericProp,
  /**
   * 是否使内容垂直居中
   * 类型: boolean
   */
  center: makeBooleanProp(void 0),
  /**
   * 是否必填
   * 类型: boolean
   */
  required: makeBooleanProp(void 0),
  /**
   * 表单布局方式
   * 类型: CellLayout
   * 可选值: 'horizontal' | 'vertical'
   */
  layout: String as PropType<CellLayout>,
  /**
   * value 文字对齐方式
   * 类型: CellValueAlign
   * 可选值: 'left' | 'right' | 'center'
   */
  valueAlign: String as PropType<CellValueAlign>,
  /**
   * 是否超出隐藏，显示省略号
   * 类型: boolean
   */
  ellipsis: makeBooleanProp(void 0),
  /**
   * 必填星号位置
   * 类型: CellAsteriskPosition
   * 可选值: 'start' | 'end'
   */
  asteriskPosition: String as PropType<CellAsteriskPosition>,
  /**
   * 是否隐藏必填星号
   * 类型: boolean
   */
  hideAsterisk: makeBooleanProp(void 0),
  /**
   * 前置图标自定义样式类
   */
  customPrefixClass: makeStringProp(''),
  /**
   * label 使用 slot 时的自定义样式
   */
  customLabelClass: makeStringProp(''),
  /**
   * value 使用 slot 时的自定义样式
   */
  customValueClass: makeStringProp(''),
  /**
   * title 使用 slot 时的自定义样式
   */
  customTitleClass: makeStringProp('')
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
