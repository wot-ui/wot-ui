import type { PropType } from 'vue'
import { baseProps, makeRequiredProp } from '../../common/props'

export type RadioType = 'dot' | 'circle' | 'square' | 'button'

export type RadioPlacement = 'left' | 'right'

export type RadioDirection = 'horizontal' | 'vertical'

export const radioProps = {
  ...baseProps,
  /**
   * 选中时的值
   */
  value: makeRequiredProp([String, Number, Boolean]),
  /**
   * 单选框类型
   * 可选值: dot | circle | square | button
   * 默认值: 继承自 radio-group
   */
  type: String as PropType<RadioType>,
  /**
   * 选中的颜色
   * 默认值: 继承自 radio-group
   */
  checkedColor: String,
  /**
   * 未选中状态的颜色
   * 默认值: 继承自 radio-group
   */
  uncheckedColor: String,
  /**
   * 是否禁用
   * 默认值: 继承自 radio-group
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * 是否只读
   * 默认值: 继承自 radio-group
   */
  readonly: {
    type: Boolean,
    default: void 0
  },
  /**
   * 布局方向
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 继承自 radio-group
   */
  direction: String as PropType<RadioDirection>,
  /**
   * 图标位置
   * 可选值: 'left' | 'right'
   * 默认值: 继承自 radio-group
   */
  placement: String as PropType<RadioPlacement>,
  /**
   * 自定义label文本类名
   */
  customLabelClass: String
}
