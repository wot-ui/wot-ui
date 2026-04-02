import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../../common/props'
import type { RadioDirection, RadioPlacement, RadioType } from '../wd-radio/types'

export type CheckboxType = RadioType
export type CheckboxPlacement = RadioPlacement
export type CheckboxDirection = RadioDirection

export const checkboxProps = {
  ...baseProps,
  /**
   * 单选框选中时的值
   * 默认值: false
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: false
  },
  name: {
    type: [String, Number, Boolean],
    default: ''
  },
  /**
   * 单选框形状
   * 可选值: circle | square | button | dot
   * 默认值: 继承自 wd-checkbox-group
   */
  type: {
    type: String as PropType<CheckboxType>
  },
  /**
   * 选中的颜色
   * 默认值: 继承自 wd-checkbox-group
   */
  checkedColor: String,
  /**
   * 未选中时的颜色
   * 默认值: 继承自 wd-checkbox-group
   */
  uncheckedColor: String,
  /**
   * 禁用
   * 默认值: 继承自 wd-checkbox-group
   */
  disabled: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  /**
   * 是否为不确定状态（样式优先级最高）
   * 默认值: false
   */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /**
   * 只读
   * 默认值: 继承自 wd-checkbox-group
   */
  readonly: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  /**
   * 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用
   * 默认值: true
   */
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  /**
   * 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用
   * 默认值: false
   */
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  /**
   * 设置大小
   * 可选值: large
   * 默认值: 继承自 wd-checkbox-group
   */
  size: String,
  /**
   * 文字位置最大宽度
   */
  maxWidth: String,
  /**
   * 文本位置
   * 可选值: left | right
   * 默认值: 继承自 wd-checkbox-group
   */
  placement: String as PropType<CheckboxPlacement>,
  /**
   * 布局方向
   * 可选值: horizontal | vertical
   * 默认值: 继承自 wd-checkbox-group
   */
  direction: String as PropType<CheckboxDirection>,
  /**
   * 自定义label文本类名
   */
  customLabelClass: String
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export type CheckboxExpose = {
  /**
   *  切换当前选中状态
   */
  toggle: () => void
}

export type CheckboxInstance = ComponentPublicInstance<CheckboxProps, CheckboxExpose>
