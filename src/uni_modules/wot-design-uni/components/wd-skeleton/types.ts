import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

/**
 * 骨架图主题样式
 * @type {'text' | 'avatar' | 'paragraph' | 'image'}
 */
export type SkeletonTheme = 'text' | 'avatar' | 'paragraph' | 'image'

/**
 * 骨架图加载动画类型
 * @type {'gradient' | 'flashed'}
 */
export type SkeletonAnimation = 'gradient' | 'flashed'

/**
 * 骨架图行列配置对象
 */
export type SkeletonRowColObj = {
  /** 占位符类型 */
  type?: 'rect' | 'circle' | 'text'
  /** 占位符宽高（正方形） */
  size?: string | number
  /** 占位符宽度 */
  width?: string | number
  /** 占位符高度 */
  height?: string | number
  /** 占位符外边距（简写） */
  margin?: string | number
  /** 占位符背景色 */
  background?: string
  /** 占位符左外边距 */
  marginLeft?: string | number
  /** 占位符右外边距 */
  marginRight?: string | number
  /** 占位符圆角半径 */
  borderRadius?: string | number
  /** 占位符背景色（等同于 background） */
  backgroundColor?: string
  /** 其他自定义属性 */
  [key: string]: any
}

/**
 * 骨架图行列配置类型
 * 支持：数字、配置对象、配置对象数组
 * @example
 * ```
 * // 示例1: [1, 1, 2] 表示三行，分别为1列、1列、2列
 * // 示例2: [1, { width: '100px' }] 表示两行，第二行自定义宽度
 * // 示例3: [1, [{ width: '50%' }, { width: '50%' }]] 表示两行，第二行两列
 * ```
 */
export type SkeletonRowCol = number | SkeletonRowColObj | Array<SkeletonRowColObj>

export const skeletonProps = {
  /**
   * 骨架图风格
   * 可选值: 'text' | 'avatar' | 'paragraph' | 'image'
   * 默认值: 'text'
   */
  theme: makeStringProp<SkeletonTheme>('text'),

  /**
   * 行列配置，用于自定义骨架图的行列数量及各项样式
   * 类型: Array<number | SkeletonRowColObj | Array<SkeletonRowColObj>>
   * 默认值: []
   * @example
   * ```
   * // 三行，分别显示为一列、一列、两列的占位符
   * [1, 1, 2]
   *
   * // 三行，第三行自定义宽度
   * [1, 1, { width: '100px' }]
   *
   * // 第三行包含两列，分别设置宽度和右外边距
   * [1, 1, [{ width: '50%' }, { width: '50%', marginRight: '10px' }]]
   * ```
   */
  rowCol: makeArrayProp<SkeletonRowCol>(),

  /**
   * 是否显示骨架图（加载中）
   * 默认值: true
   */
  loading: makeBooleanProp(true),

  /**
   * 加载动画类型
   * 可选值: 'gradient' | 'flashed' | ''
   * 默认值: ''（无动画）
   */
  animation: {
    type: String as PropType<SkeletonAnimation>,
    default: ''
  },

  /**
   * 自定义样式类名
   * 类型: string | string[] | Record<string, boolean>
   * 默认值: ''
   */
  customClass: {
    type: [String, Array, Object],
    default: ''
  },

  /**
   * 自定义内联样式
   * 类型: CSSProperties
   * 默认值: {}
   */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default() {
      return {}
    }
  }
}

/**
 * 骨架图组件 Props 类型
 */
export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
