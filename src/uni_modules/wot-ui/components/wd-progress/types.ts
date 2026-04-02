/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2026-03-04 15:53:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-progress/types.ts
 * 记得注释
 */
import type { PropType, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../../common/props'

/**
 * 进度条状态
 * 可选值: 'success' | 'danger' | 'warning'
 */
export type ProgressStatus = 'success' | 'danger' | 'warning'

/**
 * 进度条颜色对象
 */
export type ProgressColor = {
  /**
   * 颜色
   * 类型: string
   */
  color: string
  /**
   * 百分比
   * 类型: number
   */
  percentage: number
}

/**
 * 百分比显示位置和对齐方式配置
 */
export type PercentPosition = {
  /**
   * 文本对齐方式
   * 可选值: 'left' | 'center' | 'right'
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 文本在进度条内部还是外部
   * 可选值: 'inner' | 'outer'
   */
  type?: 'inner' | 'outer'
}

export const progressProps = {
  ...baseProps,
  /**
   * 进度条颜色，如果为 string 类型，那么整个进度条都为该颜色；如果为 array 类型，那么进度条随进度变化而改变状态色。
   * 类型: string | string[] | ProgressColor[]
   */
  color: {
    type: [String, Array] as PropType<string | string[] | ProgressColor[]>
  },
  /**
   * 进度增加1%所需毫秒数
   * 类型: number
   * 默认值: 30
   */
  duration: makeNumberProp(30),
  /**
   * 进度数值，最大值100
   * 类型: number
   * 默认值: 0
   */
  percentage: makeNumberProp(0),
  /**
   * 是否隐藏进度条上的文字
   * 类型: boolean
   * 默认值: false
   */
  hideText: makeBooleanProp(false),
  /**
   * 进度条状态。
   * 可选值: 'danger' | 'success' | 'warning'
   */
  status: String as PropType<ProgressStatus>,
  /**
   * 百分比位置配置信息。
   * 类型: PercentPosition
   * 默认值: { align: 'right', type: 'outer' }
   */
  percentPosition: {
    type: Object as PropType<PercentPosition>,
    default: () => ({ align: 'right', type: 'outer' })
  }
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
