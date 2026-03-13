import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumericProp, makeRequiredProp, makeStringProp } from '../common/props'

/**
 * 列的对齐方式
 * 可选值: 'left' | 'center' | 'right'
 */
export type AlignType = 'left' | 'center' | 'right'

/**
 * 列的排序方向
 * 可选值: 0（未排序） | 1（升序） | -1（降序）
 */
export type SortDirection = 0 | 1 | -1

/**
 * 表格列配置信息，用于排序事件回调等场景
 */
export interface TableColumn {
  /** 列对应的数据字段名 */
  prop: string
  /** 列的表头标题 */
  label: string
  /** 列宽度 */
  width: string | number
  /** 是否开启列排序 */
  sortable?: boolean
  /**
   * 列的对齐方式
   * 可选值: 'left' | 'center' | 'right'
   */
  align?: AlignType
  /**
   * 当前排序方向
   * 可选值: 0（未排序） | 1（升序） | -1（降序）
   */
  sortDirection: SortDirection
  /** 是否固定本列 */
  fixed?: boolean
}

export const tableColumnProps = {
  /**
   * 列对应的数据字段名
   * 类型: string
   */
  prop: makeRequiredProp(String),
  /**
   * 列的表头标题
   * 类型: string
   */
  label: makeRequiredProp(String),
  /**
   * 列宽度
   * 类型: string | number
   * 默认值: 100
   */
  width: makeNumericProp(100),
  /**
   * 是否开启列排序
   * 默认值: false
   */
  sortable: makeBooleanProp(false),
  /**
   * 是否固定本列（固定在左侧，不随水平滚动移动）
   * 默认值: false
   */
  fixed: makeBooleanProp(false),
  /**
   * 列的对齐方式
   * 可选值: 'left' | 'center' | 'right'
   * 默认值: 'left'
   */
  align: makeStringProp<AlignType>('left')
}

/** 表格列 Props 类型 */
export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>

/** 表格列组件实例类型 */
export type TableColumnInstance = ComponentPublicInstance<TableColumnProps>
