/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-02-09 16:22:40
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-tab/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, numericProp } from '../common/props'
import type { BadgeProps } from '../wd-badge/types'

export const tabProps = {
  ...baseProps,
  /**
   * 唯一标识符，默认为索引
   * 类型: number | string
   */
  name: numericProp,
  /**
   * tab 的标题
   * 类型: string
   */
  title: String,
  /**
   * 是否禁用，无法点击
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否懒加载，切换到该tab时才加载内容
   * 类型: boolean
   * 默认值: true
   */
  lazy: makeBooleanProp(true),
  /**
   * 徽标属性，透传给 Badge 组件
   * 类型: object
   */
  badgeProps: Object as PropType<Partial<BadgeProps>>
}

export type TabProps = ExtractPropTypes<typeof tabProps>
