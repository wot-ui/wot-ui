import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const navbarProps = {
  ...baseProps,
  /**
   * 标题文字
   * 类型: string
   * 默认值: ''
   */
  title: String,
  /**
   * 左侧文案
   * 类型: string
   * 默认值: ''
   */
  leftText: String,
  /**
   * 右侧文案
   * 类型: string
   * 默认值: ''
   */
  rightText: String,
  /**
   * 是否显示左侧箭头
   * 类型: boolean
   * 默认值: false
   */
  leftArrow: makeBooleanProp(false),
  /**
   * 是否显示下边框
   * 类型: boolean
   * 默认值: false
   */
  bordered: makeBooleanProp(false),
  /**
   * 是否固定到顶部
   * 类型: boolean
   * 默认值: false
   */
  fixed: makeBooleanProp(false),
  /**
   * 固定在顶部时，是否在标签位置生成一个等高的占位元素
   * 类型: boolean
   * 默认值: false
   */
  placeholder: makeBooleanProp(false),
  /**
   * 导航栏 z-index
   * 类型: number
   * 默认值: 10
   */
  zIndex: makeNumberProp(10),
  /**
   * 是否开启顶部安全区适配
   * 类型: boolean
   * 默认值: false
   */
  safeAreaInsetTop: makeBooleanProp(false),
  /**
   * 是否禁用左侧按钮，禁用时透明度降低，且无法点击
   * 类型: boolean
   * 默认值: false
   */
  leftDisabled: makeBooleanProp(false),
  /**
   * 是否禁用右侧按钮，禁用时透明度降低，且无法点击
   * 类型: boolean
   * 默认值: false
   */
  rightDisabled: makeBooleanProp(false)
}

export type NavbarProps = ExtractPropTypes<typeof navbarProps>
