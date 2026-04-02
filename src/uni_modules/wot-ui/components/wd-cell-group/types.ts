import { type PropType, type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, numericProp } from '../../common/props'
import type { CellLayout, CellSize, CellValueAlign } from '../wd-cell/types'

export type CellGroupProvide = {
  props: {
    /**
     * 是否显示边框线
     * 类型: boolean
     */
    border?: boolean
    /**
     * 是否使内容垂直居中
     * 类型: boolean
     */
    center?: boolean
    /**
     * 单元格大小
     * 类型: CellSize
     */
    size?: CellSize
    /**
     * 左侧标题宽度
     * 类型: string | number
     */
    titleWidth?: string | number
    /**
     * 单元格布局方式
     * 类型: CellLayout
     */
    layout?: CellLayout
    /**
     * 右侧内容对齐方式
     * 类型: CellValueAlign
     */
    valueAlign?: CellValueAlign
  }
}

export const CELL_GROUP_KEY: InjectionKey<CellGroupProvide> = Symbol('wd-cell-group')

export const cellGroupProps = {
  ...baseProps,
  /**
   * 分组标题
   * 类型: string
   */
  title: String,
  /**
   * 分组右侧内容
   * 类型: string
   */
  value: String,
  /**
   * 是否展示外边框
   * 类型: boolean
   * 默认值: false
   */
  border: makeBooleanProp(false),
  /**
   * 是否展示为圆角卡片风格
   * 类型: boolean
   * 默认值: false
   */
  insert: makeBooleanProp(false),
  /**
   * 是否使内容垂直居中
   * 类型: boolean
   * 默认值: false
   */
  center: makeBooleanProp(false),
  /**
   * 单元格大小
   * 类型: CellSize
   * 可选值: 'large'
   */
  size: String as PropType<CellSize>,
  /**
   * 左侧标题宽度
   * 类型: string | number
   */
  titleWidth: numericProp,
  /**
   * 单元格布局方式
   * 类型: CellLayout
   * 可选值: 'horizontal' | 'vertical'
   */
  layout: String as PropType<CellLayout>,
  /**
   * 右侧内容对齐方式
   * 类型: CellValueAlign
   * 可选值: 'left' | 'right' | 'center'
   */
  valueAlign: String as PropType<CellValueAlign>
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
