/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-01-19 16:46:33
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-overlay/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const overlayProps = {
  ...baseProps,
  /**
   * 是否展示遮罩层
   * 类型: boolean
   * 默认值: false
   */
  show: makeBooleanProp(false),
  /**
   * 动画时长，单位毫秒
   * 类型: Record<string, number> | number | boolean
   * 默认值: 300
   */
  duration: {
    type: [Object, Number, Boolean] as PropType<Record<string, number> | number | boolean>,
    default: 300
  },
  /**
   * 是否锁定滚动
   * 类型: boolean
   * 默认值: true
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 层级
   * 类型: number
   * 默认值: 10
   */
  zIndex: makeNumberProp(10)
}
