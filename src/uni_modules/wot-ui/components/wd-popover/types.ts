import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../../common/props'
import type { PlacementType, PopoverMenuItem, PopoverOffset } from '../../composables/usePopover'

export type { PlacementType, PopoverMenuItem, PopoverOffset }

export type PopoverMode = 'menu' | 'normal'

export const popoverProps = {
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
   * 是否显示 popover 箭头
   * 类型: boolean
   * 默认值: true
   */
  visibleArrow: makeBooleanProp(true),

  /**
   * 显示的内容，也可以通过 slot#content 传入
   * 类型: string | PopoverMenuItem[]
   * 默认值: -
   */
  content: {
    type: [String, Array] as PropType<string | PopoverMenuItem[]>
  },

  /**
   * popover 的出现位置
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
   * 是否禁用 popover
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
   * 控制 popover 的显示状态
   * 类型: boolean
   * 默认值: false
   */
  modelValue: makeBooleanProp(false),

  /**
   * 当前显示的模式，决定内容的展现形式
   * 类型: string
   * 可选值: 'normal' | 'menu'
   * 默认值: 'normal'
   */
  mode: makeStringProp<PopoverMode>('normal')
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export type PopoverExpose = {
  /**
   * 打开 popover
   */
  open: () => void
  /**
   * 关闭 popover
   */
  close: () => void
  /**
   * 重新测量弹出层尺寸并更新定位（用于 content 插槽场景）
   */
  updatePosition: () => void
}

export type PopoverInstance = ComponentPublicInstance<PopoverProps, PopoverExpose>
