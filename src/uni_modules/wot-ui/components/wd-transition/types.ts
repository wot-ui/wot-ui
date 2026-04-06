/*
 * @Author: weisheng
 * @Date: 2026-03-13 17:20:03
 * @LastEditTime: 2026-04-06 23:06:51
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-transition/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../../common/props'

export type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'zoom-in'
  | 'zoom-out'

export const transitionProps = {
  ...baseProps,
  /**
   * 是否展示组件
   * 类型: boolean
   * 默认值: false
   */
  show: makeBooleanProp(false),
  /**
   * 动画执行时间，单位毫秒
   * 类型: Record<string, number> | number | boolean
   * 默认值: 300
   */
  duration: {
    type: [Object, Number, Boolean] as PropType<Record<string, number> | number | boolean>,
    default: 300
  },
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型: boolean
   * 默认值: false
   */
  lazyRender: makeBooleanProp(false),
  /**
   * 动画类型
   * 类型: TransitionName | TransitionName[]
   * 可选值: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'
   * 默认值: 'fade'
   */
  name: [String, Array] as PropType<TransitionName | TransitionName[]>,
  /**
   * 是否在动画结束时销毁子节点（display: none）
   * 类型: boolean
   * 默认值: true
   */
  destroy: makeBooleanProp(true),
  /**
   * 进入过渡的开始状态
   * 类型: string
   * 默认值: ''
   */
  enterClass: makeStringProp(''),
  /**
   * 进入过渡的激活状态
   * 类型: string
   * 默认值: ''
   */
  enterActiveClass: makeStringProp(''),
  /**
   * 进入过渡的结束状态
   * 类型: string
   * 默认值: ''
   */
  enterToClass: makeStringProp(''),
  /**
   * 离开过渡的开始状态
   * 类型: string
   * 默认值: ''
   */
  leaveClass: makeStringProp(''),
  /**
   * 离开过渡的激活状态
   * 类型: string
   * 默认值: ''
   */
  leaveActiveClass: makeStringProp(''),
  /**
   * 离开过渡的结束状态
   * 类型: string
   * 默认值: ''
   */
  leaveToClass: makeStringProp(''),
  /**
   * 是否阻止触摸滚动
   * 类型: boolean
   * 默认值: false
   */
  disableTouchMove: makeBooleanProp(false)
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>
