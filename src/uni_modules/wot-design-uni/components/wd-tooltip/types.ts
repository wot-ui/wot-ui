/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-03-04 11:02:59
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-tooltip/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'
import type { PlacementType, PopoverOffset } from '../composables/usePopover'

export type { PlacementType, PopoverOffset }

export const tooltipProps = {
  ...baseProps,

  /**
   * 自定义箭头样式类名
   * 类型: string
   * 默认值: ''
   */
  customArrow: makeStringProp(''),

  /**
   * 自定义弹出层样式类名
   * 类型: string
   * 默认值: ''
   */
  customPop: makeStringProp(''),

  /**
   * 是否显示 Tooltip 箭头
   * 类型: boolean
   * 默认值: true
   */
  visibleArrow: makeBooleanProp(true),

  /**
   * 显示的内容，也可以通过 slot#content 传入
   * 类型: string | Array<Record<string, any>>
   * 默认值: -
   */
  content: {
    type: [String, Array] as PropType<string | Array<Record<string, any>>>
  },

  /**
   * Tooltip 的出现位置
   * 类型: string
   * 可选值: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
   * 默认值: 'bottom'
   */
  placement: makeStringProp<PlacementType>('bottom'),

  /**
   * 出现位置的偏移量
   * 类型: number | number[] | { x: number; y: number }
   * 默认值: 0
   */
  offset: {
    type: [Number, Array, Object] as PropType<PopoverOffset>,
    default: 0
  },
  /**
   * Tooltip 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 是否显示关闭按钮
   * 类型: boolean
   * 默认值: false
   */
  showClose: makeBooleanProp(false),

  /**
   * Tooltip 的显示状态，通过 v-model 绑定
   * 类型: boolean
   * 默认值: false
   */
  modelValue: makeBooleanProp(false)
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export type TooltipExpose = {
  /**
   * 打开 tooltip
   */
  open: () => void
  /**
   * 关闭 tooltip
   */
  close: () => void
  /**
   * 重新测量弹出层尺寸并更新定位（用于 content 插槽场景）
   */
  updatePosition: () => void
}

export type TooltipInstance = ComponentPublicInstance<TooltipProps, TooltipExpose>
