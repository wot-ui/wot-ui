import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../../common/props'

/**
 * 步骤状态类型
 * 可选值: 'finished' | 'process' | 'error' | 'wait'
 */
export type StepStatus = 'finished' | 'process' | 'error' | 'wait'

export const stepProps = {
  ...baseProps,
  /**
   * 步骤标题，如果没有则使用默认文案。
   * 当只有标题而没有描述时，标题的字号会小2号。
   * 类型: string
   * 默认值: ''
   */
  title: String,

  /**
   * 步骤描述。
   * 类型: string
   * 默认值: ''
   */
  description: String,

  /**
   * 步骤图标。
   * 类型: string
   * 默认值: ''
   */
  icon: String,

  /**
   * 步骤状态
   * 类型: StepStatus
   * 可选值: 'finished' | 'process' | 'error' | 'wait'
   * 默认值: 'wait'
   */
  status: String as PropType<StepStatus>
}

export type StepProps = ExtractPropTypes<typeof stepProps>
