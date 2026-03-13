import type { ExtractPropTypes, InjectionKey, ComputedRef } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeRequiredProp, numericProp } from '../common/props'
import type { TableColumnProps } from '../wd-table-column/types'
import type { PropType } from 'vue'

/**
 * span-method 回调参数
 */
export interface SpanMethodParams {
  /** 当前行的数据对象 */
  row: Record<string, any>
  /** 当前列的配置（字段名和标题） */
  column: { prop: string; label: string }
  /** 当前行索引（从 0 开始） */
  rowIndex: number
  /** 当前列索引（从 0 开始） */
  columnIndex: number
}

/**
 * span-method 返回值，定义单元格的合并行列数
 */
export interface SpanMethodResult {
  /**
   * 合并的行数
   * 1 表示正常不合并，大于 1 表示向下合并 N 行，0 表示该单元格被合并隐藏
   */
  rowspan: number
  /**
   * 合并的列数
   * 1 表示正常不合并，大于 1 表示向右合并 N 列，0 表示该单元格被合并隐藏
   */
  colspan: number
}

/**
 * 合并单元格的回调函数类型
 * @param params - 包含行数据、列配置、行列索引
 * @returns 返回合并配置 { rowspan, colspan }，返回 void 时使用默认 { 1, 1 }
 */
export type SpanMethod = (params: SpanMethodParams) => SpanMethodResult | void

export const tableProps = {
  ...baseProps,
  /**
   * 表格显示的数据数组
   * 类型: Record<string, any>[]
   */
  data: makeRequiredProp(Array<Record<string, any>>),
  /**
   * 是否显示表格边框
   * 默认值: true
   */
  border: makeBooleanProp(true),
  /**
   * 是否显示斑马纹（奇偶行不同背景色）
   * 默认值: true
   */
  stripe: makeBooleanProp(true),
  /**
   * 表格最大高度，超出后纵向滚动
   * 类型: string | number
   */
  height: numericProp,
  /**
   * 是否显示表头
   * 默认值: true
   */
  showHeader: makeBooleanProp(true),
  /**
   * 单元格文本是否超出两行后省略
   * 默认值: false
   */
  ellipsis: makeBooleanProp(false),
  /**
   * 是否显示索引列，传入对象可自定义索引列配置
   * 类型: boolean | Partial<TableColumnProps>
   * 默认值: false
   */
  index: {
    type: [Object, Boolean] as PropType<boolean | Omit<Partial<TableColumnProps>, 'prop'>>,
    default: false
  },
  /**
   * 是否固定表头（使用 CSS sticky 定位）
   * 默认值: true
   */
  fixedHeader: makeBooleanProp(true),
  /**
   * 合并单元格的回调方法
   * 类型: SpanMethod
   * 默认值: undefined
   */
  spanMethod: {
    type: Function as PropType<SpanMethod>,
    default: undefined
  },
  /**
   * 是否开启虚拟滚动（大数据量时只渲染可视区域行）
   * 默认值: false
   */
  virtual: makeBooleanProp(false),
  /**
   * 行高（虚拟滚动时必填，用于计算可视行范围和总滚动高度）
   * 类型: number
   * 默认值: 44
   */
  rowHeight: makeNumericProp(44),
  /**
   * 可视区域上下各额外预渲染的行数
   * 类型: number
   * 默认值: 5
   */
  buffer: makeNumericProp(5)
}

/** 表格 Props 类型 */
export type TableProps = ExtractPropTypes<typeof tableProps>

/**
 * 表格组件通过 provide/inject 向子列组件提供的接口
 */
export type TableProvide = {
  /** 表格 props（不含 index、customStyle、customClass） */
  props: Omit<TableProps, 'index' | 'customStyle' | 'customClass'>
  /** 表格滚动状态 */
  state: {
    /** 当前水平滚动偏移量，用于固定列阴影判断 */
    scrollLeft: number
  }
  /** 当前可视行范围（虚拟滚动时只渲染此范围内的行） */
  visibleRange: ComputedRef<{ start: number; end: number }>
  /**
   * 行点击事件回调
   * @param index - 被点击行的索引
   */
  rowClick: (index: number) => void
  /**
   * 判断指定列是否为最后一个固定列
   * @param column - 列配置（含 fixed 和 prop）
   * @returns 是否为最后一个固定列
   */
  getIsLastFixed: (column: { fixed: boolean; prop: string }) => boolean
  /**
   * 获取指定列的固定 left 偏移量
   * @param columnIndex - 列索引
   * @returns CSS left 值字符串
   */
  getFixedLeft: (columnIndex: number) => string
  /**
   * 获取指定单元格的合并信息
   * @param rowIndex - 行索引
   * @param columnIndex - 列索引
   * @returns 合并配置 { rowspan, colspan }
   */
  getSpan: (rowIndex: number, columnIndex: number) => SpanMethodResult
}

/** 表格组件的 InjectionKey */
export const TABLE_KEY: InjectionKey<TableProvide> = Symbol('wd-table')
