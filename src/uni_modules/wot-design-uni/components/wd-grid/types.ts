import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

/**
 * 格子内容排列方向
 */
export type GridDirection = 'horizontal' | 'vertical'

/**
 * Grid 组件属性定义
 */
export const gridProps = {
  ...baseProps,
  /**
   * 是否开启格子点击反馈
   * 类型: boolean
   * 默认值: false
   */
  clickable: makeBooleanProp(false),
  /**
   * 是否将格子固定为正方形
   * 类型: boolean
   * 默认值: false
   */
  square: makeBooleanProp(false),
  /**
   * 列数
   * 类型: number
   * 默认值: 0（自动根据子元素数量计算）
   */
  column: Number,
  /**
   * 是否显示边框
   * 类型: boolean
   * 默认值: false
   */
  border: makeBooleanProp(false),
  /**
   * 背景颜色
   * 类型: string
   * 默认值: ''
   */
  bgColor: makeStringProp(''),
  /**
   * 格子之间的间距，默认单位为px
   * 类型: number
   * 默认值: 0
   */
  gutter: Number,
  /**
   * 自定义内容区域hover-class
   * 类型: string
   * 默认值: ''
   */
  hoverClass: String,
  /**
   * 是否将格子内容居中显示
   * 类型: boolean
   * 默认值: true
   */
  center: makeBooleanProp(true),
  /**
   * 格子内容排列的方向
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 'vertical'
   */
  direction: makeStringProp<GridDirection>('vertical'),
  /**
   * 是否调换图标和文本的位置
   * 类型: boolean
   * 默认值: false
   */
  reverse: makeBooleanProp(false),
  /**
   * 图标大小，默认单位为px
   * 类型: string
   * 默认值: '28px'
   */
  iconSize: String
}

/**
 * Grid 组件属性类型
 */
export type GridProps = ExtractPropTypes<typeof gridProps>

/**
 * Grid 组件注入给子组件的数据
 */
export type GridProvide = {
  props: Partial<GridProps>
}

/**
 * Grid 组件注入键
 */
export const GRID_KEY: InjectionKey<GridProvide> = Symbol('wd-grid')
