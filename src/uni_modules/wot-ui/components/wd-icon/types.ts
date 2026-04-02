/*
 * @Author: weisheng
 * @Date: 2025-07-17 10:27:32
 * @LastEditTime: 2026-01-23 14:57:01
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-icon/types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp, numericProp } from '../../common/props'
import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  ...baseProps,
  /**
   * 图标名称，支持使用图片链接
   * 类型: string
   */
  name: makeRequiredProp(String),
  /**
   * 图标颜色
   * 类型: string
   */
  color: String,
  /**
   * 图标字体大小
   * 类型: string | number
   */
  size: numericProp,
  /**
   * 类名前缀，用于使用自定义图标
   * 类型: string
   * 默认值: wd-icon
   */
  classPrefix: makeStringProp('wd-icon'),
  /**
   * 是否为 CSS 类名图标（如 UnoCSS 图标），为 true 时 name 直接作为 CSS class 使用
   * 类型: boolean
   * 默认值: false
   */
  cssIcon: makeBooleanProp(false)
}

export type IconProps = ExtractPropTypes<typeof iconProps>
