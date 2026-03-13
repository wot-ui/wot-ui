/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-01-23 15:03:28
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-count-down/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export const countDownProps = {
  ...baseProps,
  /**
   * 倒计时时长
   * 类型: number
   * 默认值: 0
   */
  time: makeRequiredProp(Number),
  /**
   * 是否开启毫秒
   * 类型: boolean
   * 默认值: false
   */
  millisecond: makeBooleanProp(false),
  /**
   * 格式化时间
   * 类型: string
   * 默认值: HH:mm:ss
   */
  format: makeStringProp('HH:mm:ss'),
  /**
   * 是否自动开始
   * 类型: boolean
   * 默认值: true
   */
  autoStart: makeBooleanProp(true)
}

export type CountDownProps = ExtractPropTypes<typeof countDownProps>

export type CountDownExpose = {
  /**
   * 开始倒计时
   */
  start: () => void
  /**
   * 暂停倒计时
   */
  pause: () => void
  /**
   * 重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时
   */
  reset: () => void
}

export type CountDownInstance = ComponentPublicInstance<CountDownProps, CountDownExpose>
