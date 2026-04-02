/*
 * @Author: weisheng
 * @Date: 2026-03-13 17:20:03
 * @LastEditTime: 2026-03-20 15:40:21
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-swipe-action/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../../common/props'

/**
 * 滑动操作的状态
 * 可选值: 'left' | 'close' | 'right'
 */
export type SwipeActionStatus = 'left' | 'close' | 'right'

/**
 * 触发关闭的原因
 * 可选值: 'click' | 'swipe' | 'value'
 */
export type SwipeActionReason = 'click' | 'swipe' | 'value'

/**
 * 滑动/点击位置类型（'inside' 表示点击内容区域）
 * 可选值: 'left' | 'close' | 'right' | 'inside'
 */
export type SwipeActionPosition = SwipeActionStatus | 'inside'

/**
 * 关闭前回调函数类型
 * @param reason 触发关闭的原因
 * @param position 操作的位置
 * @returns 返回 true 或 Promise<true> 允许关闭；返回 false、Promise<false> 或不返回值时会阻止关闭
 */
export type SwipeActionBeforeClose = (reason: SwipeActionReason, position: SwipeActionPosition) => boolean | Promise<boolean>

/** 点击事件载荷 */
export interface SwipeActionClickEvent {
  /** 点击位置：'left' | 'right' | 'inside' */
  value: SwipeActionPosition
}

/** 组件暴露的实例方法 */
export interface SwipeActionExpose {
  /**
   * 关闭已展开的操作按钮，恢复为收起状态
   */
  close: (reason: SwipeActionReason, position?: SwipeActionPosition) => void
}

/** 组件事件定义 */
export interface SwipeActionEmits {
  /** 点击滑动项内容或左右操作按钮时触发 */
  (e: 'click', payload: SwipeActionClickEvent): void
  /** 滑动状态变化时触发（v-model 更新） */
  (e: 'update:modelValue', value: SwipeActionStatus): void
}

export const swipeActionProps = {
  ...baseProps,

  /**
   * 绑定值，表示当前滑动状态
   * 类型: SwipeActionStatus
   * 可选值: 'left' | 'close' | 'right'
   * 默认值: 'close'
   */
  modelValue: makeStringProp<SwipeActionStatus>('close'),

  /**
   * 是否禁用滑动操作，禁用后无法通过手势或点击滑动
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 关闭前的钩子，支持同步/异步；返回 true 才会继续关闭
   * 类型: SwipeActionBeforeClose
   * 默认值: 无
   */
  beforeClose: Function as PropType<SwipeActionBeforeClose>
}

export type SwipeActionProps = ExtractPropTypes<typeof swipeActionProps>
