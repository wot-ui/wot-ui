/*
 * @Author: weisheng
 * @Date: 2024-03-15 13:49:00
 * @LastEditTime: 2026-03-19 17:28:17
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-empty/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../../common/props'

export const emptyProps = {
  ...baseProps,

  /**
   * 缺省图片类型，支持传入图片 URL。
   * 类型: string
   * 可选值: 图标名或URL
   * 默认值: empty
   */
  icon: makeStringProp('empty'),
  /**
   * 图片大小，默认单位为 `px`。
   * 类型: string 或 number
   * 默认值: 空字符串
   */
  iconSize: [String, Number],
  /**
   * 提示文案。
   * 类型: string
   * 默认值: 空字符串
   */
  tip: makeStringProp('')
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
