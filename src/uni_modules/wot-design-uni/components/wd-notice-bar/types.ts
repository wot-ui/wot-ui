/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-01-30 19:06:29
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-notice-bar/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type NoticeBarType = 'warning' | 'info' | 'danger' | ''
export type NoticeBarScrollDirection = 'horizontal' | 'vertical'

export const noticeBarProps = {
  ...baseProps,
  /**
   * 设置通知栏文案
   * 类型: string | string[]
   * 默认值: ''
   */
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * 设置通知栏类型
   * 类型: NoticeBarType
   * 可选值: 'warning' | 'info' | 'danger'
   * 默认值: 'warning'
   */
  type: makeStringProp<NoticeBarType>('warning'),
  /**
   * 是否可滚动
   * 类型: boolean
   * 默认值: true
   */
  scrollable: makeBooleanProp(true),
  /**
   * 滚动延迟时间（秒）
   * 类型: number
   * 默认值: 1
   */
  delay: makeNumberProp(1),
  /**
   * 滚动速度（px/s）
   * 类型: number
   * 默认值: 50
   */
  speed: makeNumberProp(50),
  /**
   * 是否可关闭
   * 类型: boolean
   * 默认值: false
   */
  closable: makeBooleanProp(false),
  /**
   * 是否换行显示
   * 类型: boolean
   * 默认值: false
   */
  wrapable: makeBooleanProp(false),
  /**
   * 设置左侧图标，使用 icon 章节中的图标名
   * 类型: string
   */
  prefix: String,
  /**
   * 文字、图标颜色
   * 类型: string
   */
  color: String,
  /**
   * 背景颜色
   * 类型: string
   */
  backgroundColor: String,
  /**
   * 滚动方向
   * 类型: NoticeBarScrollDirection
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 'horizontal'
   */
  direction: makeStringProp<NoticeBarScrollDirection>('horizontal')
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>

export type NoticeBarExpose = {
  /**
   * 重置NoticeBar动画
   */
  reset: () => void
}

export type NoticeBarInstance = ComponentPublicInstance<NoticeBarProps, NoticeBarExpose>
