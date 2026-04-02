/*
 * @Author: weisheng
 * @Date: 2024-03-15 11:36:12
 * @LastEditTime: 2026-01-16 16:09:46
 * @LastEditors: weisheng
 * @Description: Badge 徽标组件类型定义
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-badge/types.ts
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../../common/props'

/**
 * 徽标类型
 * 可选值: 'primary' | 'success' | 'warning' | 'danger' | 'info'
 */
export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/**
 * 徽标形状
 * 可选值: 'circle' | 'square' | 'bubble'
 */
export type BadgeShape = 'circle' | 'square' | 'bubble'

/**
 * Badge 组件 Props 定义
 */
export const badgeProps = {
  ...baseProps,
  /**
   * 徽标形状
   * 类型: BadgeShape
   * 可选值: 'circle' | 'square' | 'bubble'
   * 默认值: 'circle'
   */
  shape: makeStringProp<BadgeShape>('circle'),
  /**
   * 显示值
   * 类型: string | number
   * 默认值: undefined
   */
  value: numericProp,
  /**
   * 当数值为 0 时，是否展示徽标
   * 类型: boolean
   * 默认值: false
   */
  showZero: makeBooleanProp(false),
  /**
   * 背景颜色
   * 类型: string
   * 默认值: undefined
   */
  bgColor: String,
  /**
   * 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
   * 类型: number
   * 默认值: undefined
   */
  max: Number,
  /**
   * 是否为红色点状标注
   * 类型: boolean
   * 默认值: false
   */
  isDot: Boolean,
  /**
   * 是否隐藏 badge
   * 类型: boolean
   * 默认值: false
   */
  hidden: Boolean,
  /**
   * 徽标类型
   * 类型: BadgeType
   * 可选值: 'primary' | 'success' | 'warning' | 'danger' | 'info'
   * 默认值: undefined
   */
  type: String as PropType<BadgeType>,
  /**
   * 为正时，角标向下偏移对应的像素
   * 类型: string | number
   * 默认值: undefined
   */
  top: numericProp,
  /**
   * 为正时，角标向左偏移对应的像素
   * 类型: string | number
   * 默认值: undefined
   */
  right: numericProp,
  /**
   * 是否显示白色描边
   * 类型: boolean
   * 默认值: false
   */
  border: makeBooleanProp(false)
}

/**
 * Badge 组件 Props 类型
 */
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
