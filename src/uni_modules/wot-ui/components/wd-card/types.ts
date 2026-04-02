/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-02-11 21:21:59
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-card/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../../common/props'

export type CardType = 'rectangle'

export const cardProps = {
  ...baseProps,
  /**
   * 卡片标题
   * 类型: string
   * 默认值: -
   */
  title: String,
  /**
   * 卡片类型
   */
  type: String as PropType<CardType>,
  /**
   * 标题自定义样式
   * 类型: string
   * 默认值: ''
   */
  customTitleClass: makeStringProp(''),
  /**
   * 内容自定义样式
   * 类型: string
   * 默认值: ''
   */
  customContentClass: makeStringProp(''),
  /**
   * 底部自定义样式
   * 类型: string
   * 默认值: ''
   */
  customFooterClass: makeStringProp('')
}

export type CardProps = ExtractPropTypes<typeof cardProps>
