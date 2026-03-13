import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarTimeFormatter, CalendarType } from '../types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

/**
 * 月份信息
 */
/**
 * 月份信息
 */
export interface MonthInfo {
  /** 日期时间戳 */
  date: number
  /** 高度 */
  height: number
}

export const monthPanelProps = {
  /**
   * 日期类型
   * 类型: CalendarType
   * 可选值: 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'
   * 默认值: 'date'
   */
  type: makeStringProp<CalendarType>('date'),
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   * 类型: number | (number | null)[] | null
   * 默认值: null
   */
  value: {
    type: [Number, Array, null] as PropType<number | (number | null)[] | null>,
    default: null
  },
  /**
   * 最小日期，为 13 位时间戳
   * 类型: number
   * 默认值: 当前日期 - 6个月
   */
  minDate: makeNumberProp(defaultMinDate),
  /**
   * 最大日期，为 13 位时间戳
   * 类型: number
   * 默认值: 当前日期 + 6个月
   */
  maxDate: makeNumberProp(defaultMaxDate),
  /**
   * 周起始天
   * 类型: number
   * 默认值: 0
   */
  firstDayOfWeek: makeNumberProp(0),
  /**
   * 日期格式化函数
   * 类型: CalendarFormatter
   */
  formatter: Function as PropType<CalendarFormatter>,
  /**
   * type 为范围选择时有效，最大日期范围
   * 类型: number
   */
  maxRange: Number,
  /**
   * type 为范围选择时有效，选择超出最大日期范围时的错误提示文案
   * 类型: string
   */
  rangePrompt: String,
  /**
   * type 为范围选择时有效，是否允许选择同一天
   * 类型: boolean
   * 默认值: false
   */
  allowSameDay: makeBooleanProp(false),
  /**
   * 是否展示面板标题，自动计算当前滚动的日期月份
   * 类型: boolean
   * 默认值: false
   */
  showPanelTitle: makeBooleanProp(false),
  /**
   * 选中日期所使用的当日内具体时刻
   * 类型: number[][]
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  /**
   * 可滚动面板的高度
   * 类型: number
   * 默认值: 378
   */
  panelHeight: makeNumberProp(378),
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
   * type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
   * 类型: CalendarTimeFilter
   */
  timeFilter: Function as PropType<CalendarTimeFilter>,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，用于格式化时间选择器的数据
   * 类型: CalendarTimeFormatter
   */
  timeFormatter: Function as PropType<CalendarTimeFormatter>,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
   * 类型: boolean
   * 默认值: false
   */
  hideSecond: makeBooleanProp(false),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   * 类型: boolean
   * 默认值: false
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 切换模式
   * 类型: 'none' | 'month' | 'year-month'
   * 可选值: none 平铺展示所有月份/年份，不展示切换按钮 | month 支持按月切换，展示上个月/下个月按钮 | year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮
   * 默认值: 'none'
   */
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none')
}

export type MonthPanelProps = ExtractPropTypes<typeof monthPanelProps>

export type MonthPanelTimeType = 'start' | 'end' | ''

export type MonthPanelExpose = {
  /**
   * 使当前日期或者选中日期滚动到可视区域
   */
  scrollIntoView: () => void
}

export type MonthPanelInstance = ComponentPublicInstance<MonthPanelProps, MonthPanelExpose>
