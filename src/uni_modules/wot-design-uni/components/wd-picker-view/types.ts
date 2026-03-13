import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp, type Numeric } from '../common/props'

/**
 * 选项对象
 */
export type PickerOption = {
  /**
   * 选项值
   * 类型: string | number
   */
  value: Numeric
  /**
   * 选项显示文本
   * 类型: string | number
   */
  label: Numeric
  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled?: boolean
  /**
   * 子选项
   * 类型: PickerOption[]
   */
  children?: PickerOption[]
  /**
   * 允许额外的自定义属性
   */
  [key: string]: any
}

/**
 * @deprecated Use PickerOption instead
 */
export type ColumnItem = PickerOption

export const pickerViewProps = {
  ...baseProps,
  /**
   * 选项高度
   * 类型: number
   * 默认值: 44
   */
  itemHeight: makeNumberProp(44),
  /**
   * 可见选项数量
   * 类型: number
   * 默认值: 6
   */
  visibleItemCount: makeNumberProp(6),
  /**
   * 选项对象中，value对应的 key
   * 类型: string
   * 默认值: 'value'
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项对象中，展示的文本对应的 key
   * 类型: string
   * 默认值: 'label'
   */
  labelKey: makeStringProp('label'),
  /**
   * 是否在手指松开时立即触发 picker-view 的 change 事件。若不开启则会在滚动动画结束后触发 change 事件
   * 类型: boolean
   * 默认值: false
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否开启级联模式
   * 类型: boolean
   * 默认值: false
   */
  cascade: makeBooleanProp(false),
  /**
   * 选项对象中，children 对应的 key
   * 类型: string
   * 默认值: 'children'
   */
  childrenKey: makeStringProp('children'),
  /**
   * 选中项
   * 类型: (string | number)[]
   * 默认值: []
   */
  modelValue: makeArrayProp<Numeric>(),
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   * 类型: Array<string | number | PickerOption | Array<string | number | PickerOption>>
   * 默认值: []
   */
  columns: makeArrayProp<PickerOption | Array<PickerOption>>()
}

export type PickerViewExpose = {
  /**
   * 获取所有列选中项
   * @returns {PickerOption[]} 选中项
   */
  getSelectedOptions: () => PickerOption[]
  /**
   * 获取所有列的选中值
   * @returns {Numeric[]} 选中值
   */
  getSelectedValues: () => Numeric[]
  /**
   * 获取所有列数据
   * @returns {PickerOption[][]} 所有列数据
   */
  getColumnsData: () => PickerOption[][]
  /**
   * 获取指定列的数据
   * @param {number} columnIndex 列索引
   * @returns {PickerOption[]} 指定列数据
   */
  getColumnData: (columnIndex: number) => PickerOption[]
  /**
   * 获取指定列的选中项下标
   * @param {number} columnIndex 列索引
   * @returns {number} 选中项下标
   */
  getColumnIndex: (columnIndex: number) => number
  /**
   * 获取所有列选中项的 label
   * @returns {string[]} label 数组
   */
  getSelectedLabels: () => string[]
  /**
   * 获取所有列的选中下标
   * @returns {number[]} 选中下标数组
   */
  getSelectedIndex: () => number[]
  /**
   * 重置列数据
   * @param {Array<string | number | PickerOption | Array<string | number | PickerOption>>} columns 新的列数据
   */
  resetColumns: (columns: Array<string | number | PickerOption | Array<string | number | PickerOption>>) => void
}

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>

export type PickerViewInstance = ComponentPublicInstance<PickerViewProps, PickerViewExpose>
