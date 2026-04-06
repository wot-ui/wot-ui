/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2026-01-23 14:59:32
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-loading/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp, numericProp } from '../../common/props'

export type LoadingType = 'circular' | 'spinner' | 'dots' // 提示信息加载状态类型

export type LoadingDirection = 'horizontal' | 'vertical' // 加载指示器方向，可选值：'horizontal' | 'vertical'，默认值：'vertical'

export const loadingProps = {
  ...baseProps,
  /**
   * 自定义加载指示器样式类
   * 类型: string
   */
  customSpinnerClass: makeStringProp(''),
  /**
   * 加载指示器类型
   * 类型: LoadingType
   * 可选值: 'circular' | 'spinner' | 'dots'
   * 默认值: 'circular'
   */
  type: makeStringProp<LoadingType>('circular'),
  /**
   * 设置加载指示器颜色
   * 类型: string
   */
  color: String,
  /**
   * 设置加载指示器大小
   * 类型: string | number
   */
  size: numericProp,
  /**
   * 加载指示器方向
   * 类型: LoadingDirection
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 'vertical'
   */
  direction: makeStringProp<LoadingDirection>('vertical'),
  /**
   * 加载指示器文字
   * 类型: string
   */
  text: String,
  /**
   * 是否继承父元素颜色
   * 类型: boolean
   * 默认值: false
   */
  inheritColor: Boolean
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
