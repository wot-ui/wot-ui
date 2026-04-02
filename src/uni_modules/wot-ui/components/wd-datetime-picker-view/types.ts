import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp, type Numeric } from '../../common/props'

export type DateTimeType = 'date' | 'year-month' | 'time' | 'datetime' | 'year'

export const datetimePickerViewProps = {
  ...baseProps,
  /**
   * 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
   * 类型: string | number
   * 必填
   */
  modelValue: makeRequiredProp([String, Number]),
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
   * 选择器类型
   * 类型: string
   * 可选值: 'date' | 'year-month' | 'time' | 'datetime' | 'year'
   * 默认值: 'datetime'
   */
  type: makeStringProp<DateTimeType>('datetime'),
  /**
   * 自定义过滤选项的函数，返回列的选项数组
   * 类型: function
   */
  filter: Function as PropType<DatetimePickerViewFilter>,
  /**
   * 自定义弹出层选项文案的格式化函数，返回一个字符串
   * 类型: function
   */
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  /**
   * 自定义列的格式化函数
   * 类型: function
   */
  columnFormatter: Function as PropType<DatetimePickerViewColumnFormatter>,
  /**
   * 最小日期
   * 类型: number
   * 默认值: 十年前的1月1日
   */
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  /**
   * 最大日期
   * 类型: number
   * 默认值: 十年后的12月31日
   */
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31).getTime()),
  /**
   * 最小小时，time类型时生效
   * 类型: number
   * 默认值: 0
   */
  minHour: makeNumberProp(0),
  /**
   * 最大小时，time类型时生效
   * 类型: number
   * 默认值: 23
   */
  maxHour: makeNumberProp(23),
  /**
   * 最小分钟，time类型时生效
   * 类型: number
   * 默认值: 0
   */
  minMinute: makeNumberProp(0),
  /**
   * 最大分钟，time类型时生效
   * 类型: number
   * 默认值: 59
   */
  maxMinute: makeNumberProp(59),
  /**
   * 是否显示秒选择，仅在 time 和 datetime 类型下生效
   * 类型: boolean
   * 默认值: false
   */
  useSecond: makeBooleanProp(false),
  /**
   * 最小秒数，仅在 time 和 datetime 类型下生效
   * 类型: number
   * 默认值: 0
   */
  minSecond: makeNumberProp(0),
  /**
   * 最大秒数，仅在 time 和 datetime 类型下生效
   * 类型: number
   * 默认值: 59
   */
  maxSecond: makeNumberProp(59),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   * 类型: boolean
   * 默认值: false
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 范围选择时，开始时间的最小值，用于处理开始时间和结束时间的联动
   * 类型: number
   */
  boundaryMinDate: Number,
  /**
   * 范围选择时，结束时间的最大值，用于处理开始时间和结束时间的联动
   * 类型: number
   */
  boundaryMaxDate: Number
}

export type DatetimePickerViewColumnType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'

export type DatetimePickerViewOption = {
  /**
   * 选项值
   * 类型: string | number
   */
  value: number
  /**
   * 选项显示文本
   * 类型: string | number
   */
  label: string
  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled?: boolean
}

export type DatetimePickerViewColumn = {
  type: DatetimePickerViewColumnType
  values: number[]
}
export type DatetimePickerViewFilter = (options: DatetimePickerViewColumn) => number[]

export type DatetimePickerViewFormatter = (type: DatetimePickerViewColumnType, value: Numeric) => string

export type DatetimePickerViewColumnFormatter = (columns: DatetimePickerViewOption[][]) => DatetimePickerViewOption[][]

export type DatetimePickerViewProps = ExtractPropTypes<typeof datetimePickerViewProps>

export type DatetimePickerViewExpose = {
  getSelectedOptions: () => Record<string, any> | Record<string, any>[] | undefined
  correctValue: (value: string | number) => string | number
  getOriginColumns: () => DatetimePickerViewColumn[]
}

export type DatetimePickerViewInstance = ComponentPublicInstance<DatetimePickerViewProps, DatetimePickerViewExpose>
