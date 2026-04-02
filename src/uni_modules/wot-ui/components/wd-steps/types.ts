import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

export const stepsProps = {
  ...baseProps,

  /**
   * 当前激活的步骤进度，以数字表示。
   * 类型: number
   * 默认值: 0
   */
  active: makeNumberProp(0),

  /**
   * 是否为垂直方向的步骤条。
   * 类型: boolean
   * 默认值: false
   */
  vertical: makeBooleanProp(false),

  /**
   * 是否为点状步骤条样式。
   * 类型: boolean
   * 默认值: false
   */
  dot: makeBooleanProp(false),

  /**
   * 步骤条之间的间距，默认为自动计算。
   * 如果指定，则使用此值作为间距。
   * 类型: string
   * 默认值: ''
   */
  space: makeStringProp(''),

  /**
   * 是否将步骤条水平居中显示，只对横向步骤条有效。
   * 类型: boolean
   * 默认值: false
   */
  alignCenter: makeBooleanProp(false)
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export type StepsProvide = {
  props: Partial<StepsProps>
}

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol('wd-steps')
