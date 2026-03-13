/*
 * @Author: weisheng
 * @Date: 2024-03-15 11:36:12
 * @LastEditTime: 2024-03-18 10:48:33
 * @LastEditors: weisheng
 * @Description: Divider 分割线
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-divider/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type DividerPosition = 'center' | 'left' | 'right'
export type DividerDirection = 'horizontal' | 'vertical'

export const dividerProps = {
  ...baseProps,
  /**
   * 自定义颜色
   * 类型: string
   */
  color: String,
  /**
   * 内容位置
   * 类型: string
   * 可选值: 'left' | 'right' | 'center'
   * 默认值: 'center'
   */
  contentPosition: makeStringProp<DividerPosition>('center'),
  /**
   * 是否显示为虚线
   * 类型: boolean
   * 默认值: false
   */
  dashed: Boolean,
  /**
   * 是否为垂直分割线
   * 类型: boolean
   * 默认值: false
   */
  vertical: makeBooleanProp(false),
  /**
   * 是否显示为 0.5px 的线
   * 类型: boolean
   * 默认值: true
   */
  hairline: makeBooleanProp(true)
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
