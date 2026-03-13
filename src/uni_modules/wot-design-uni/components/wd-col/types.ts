import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp } from '../common/props'

export const colProps = {
  ...baseProps,
  /**
   * 列元素宽度（栅格占据的列数，共 24 列）
   */
  span: makeNumberProp(24),
  /**
   * 列元素偏移距离（栅格左侧的间隔列数）
   */
  offset: makeNumberProp(0)
}

export type ColProps = ExtractPropTypes<typeof colProps>
