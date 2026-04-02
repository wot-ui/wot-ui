import { type ExtractPropTypes, type InjectionKey, type PropType, type ComponentPublicInstance } from 'vue'
import type { CheckboxDirection, CheckboxPlacement, CheckboxType } from '../wd-checkbox/types'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

export type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean
      skipDisabled?: boolean
    }

export type RequiredModelValue = {
  modelValue: Array<string | number | boolean>
}

export type checkboxGroupProvide = {
  props: Partial<Omit<CheckboxGroupProps, 'modelValue'>> & RequiredModelValue
  changeSelectState: (value: string | number | boolean) => void
}

export const CHECKBOX_GROUP_KEY: InjectionKey<checkboxGroupProvide> = Symbol('wd-checkbox-group')

export const checkboxGroupProps = {
  ...baseProps,
  /**
   * 绑定值
   * 默认值: []
   */
  modelValue: {
    type: Array as PropType<Array<string | number | boolean>>,
    default: () => []
  },
  /**
   * 单选框形状
   * 可选值: circle | square | button | dot
   * 默认值: circle
   */
  type: makeStringProp<CheckboxType>('circle'),
  /**
   * 选中的颜色
   */
  checkedColor: String,
  /**
   * 未选中时的颜色
   */
  uncheckedColor: String,
  /**
   * 禁用
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 只读
   * 默认值: false
   */
  readonly: makeBooleanProp(false),
  /**
   * 最小选中的数量
   * 默认值: 0
   */
  min: makeNumberProp(0),
  /**
   * 最大选中的数量
   * 0 为无限数量
   * 默认值: 0
   */
  max: makeNumberProp(0),
  /**
   * 设置大小
   * 可选值: large
   */
  size: String,
  /**
   * 文本位置
   * 可选值: left | right
   * 默认值: left
   */
  placement: makeStringProp<CheckboxPlacement>('left'),
  /**
   * 布局方向
   * 可选值: horizontal | vertical
   * 默认值: vertical
   */
  direction: makeStringProp<CheckboxDirection>('vertical')
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxGroupExpose = {
  toggleAll: (options?: CheckboxGroupToggleAllOptions) => void
}

export type CheckboxGroupInstance = ComponentPublicInstance<CheckboxGroupProps, CheckboxGroupExpose>
