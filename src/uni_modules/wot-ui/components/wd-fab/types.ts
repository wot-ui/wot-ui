import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import type { PropType } from 'vue'

/**
 * 浮动按钮类型
 */
export type FabType = 'primary' | 'success' | 'info' | 'warning' | 'danger'

/**
 * 浮动按钮位置
 */
export type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'left-center' | 'right-center' | 'top-center' | 'bottom-center'

/**
 * 浮动按钮菜单弹出方向
 */
export type FabDirection = 'top' | 'right' | 'bottom' | 'left'

/**
 * 浮动按钮边界间距配置
 */
export type FabGap = Partial<Record<FabDirection, number>>
export const fabProps = {
  ...baseProps,
  /**
   * 是否激活展开菜单
   * 类型: boolean
   * 默认值: false
   */
  active: makeBooleanProp(false),
  /**
   * 按钮类型
   * 类型: FabType
   * 可选值: 'primary' | 'success' | 'info' | 'warning' | 'danger'
   * 默认值: 'primary'
   */
  type: makeStringProp<FabType>('primary'),
  /**
   * 悬浮按钮位置
   * 类型: FabPosition
   * 可选值: 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'left-center' | 'right-center' | 'top-center' | 'bottom-center'
   * 默认值: 'right-bottom'
   */
  position: makeStringProp<FabPosition>('right-bottom'),
  /**
   * 菜单弹出方向
   * 类型: FabDirection
   * 可选值: 'top' | 'right' | 'bottom' | 'left'
   * 默认值: 'top'
   */
  direction: makeStringProp<FabDirection>('top'),
  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 未展开时的图标名称
   * 类型: string
   * 默认值: 'plus'
   */
  inactiveIcon: makeStringProp('plus'),
  /**
   * 展开时的图标名称
   * 类型: string
   * 默认值: 'close'
   */
  activeIcon: makeStringProp('close'),
  /**
   * 自定义 z-index 层级
   * 类型: number
   * 默认值: 99
   */
  zIndex: makeNumberProp(99),
  /**
   * 是否可拖动
   * 类型: boolean
   * 默认值: false
   */
  draggable: makeBooleanProp(false),
  /**
   * 距离屏幕边界的间距，可分别设置上下左右
   * 类型: FabGap
   * 默认值: { top: 16, right: 16, bottom: 16, left: 16 }
   */
  gap: {
    type: Object as PropType<FabGap>,
    default: () => ({})
  },
  /**
   * 点击时是否展开菜单
   * 类型: boolean
   * 默认值: true
   */
  expandable: makeBooleanProp(true)
}

export type FabProps = ExtractPropTypes<typeof fabProps>

/**
 * Fab 组件暴露的方法
 */
export type FabExpose = {
  /**
   * 展开菜单
   */
  open: () => void
  /**
   * 收起菜单
   */
  close: () => void
}

/**
 * Fab 组件实例类型
 */
export type FabInstance = ComponentPublicInstance<FabProps, FabExpose>
