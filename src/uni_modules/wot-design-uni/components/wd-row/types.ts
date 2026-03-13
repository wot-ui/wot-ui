import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 水平对齐方式
 */
export type RowJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'

/**
 * 垂直对齐方式
 */
export type RowAlign = 'top' | 'middle' | 'bottom'

export type RowProvide = {
  props: { gutter?: number }
}

export const ROW_KEY: InjectionKey<RowProvide> = Symbol('wd-row')

export const rowProps = {
  ...baseProps,
  /**
   * 列元素之间的间距（单位为 px）
   */
  gutter: makeNumberProp(0),
  /**
   * 主轴对齐方式
   */
  justify: makeStringProp<RowJustify>('start'),
  /**
   * 交叉轴对齐方式
   */
  align: makeStringProp<RowAlign>('top')
}

export type RowProps = ExtractPropTypes<typeof rowProps>
