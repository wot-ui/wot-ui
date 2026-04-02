import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp, makeStringProp } from '../../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

/**
 * 月份信息
 */
/**
 * 年份信息
 */
export interface YearInfo {
  /** 日期时间戳 */
  date: number
  /** 高度 */
  height: number
}

export const yearPanelProps = {
  /**
   * 日期类型
   * 类型: CalendarType
   */
  type: makeRequiredProp(String as PropType<CalendarType>),
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   * 类型: number | (number | null)[] | null
   */
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),
  /**
   * 最小日期，为 13 位时间戳
   * 类型: number
   */
  minDate: makeRequiredProp(Number),
  /**
   * 最大日期，为 13 位时间戳
   * 类型: number
   */
  maxDate: makeRequiredProp(Number),
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
   * 默认值: true
   */
  showPanelTitle: makeBooleanProp(true),
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
   */
  panelHeight: makeRequiredProp(Number),
  /**
   * 切换模式
   * 类型: 'none' | 'month' | 'year-month'
   * 可选值: none 平铺展示所有月份/年份，不展示切换按钮 | month 支持按月切换，展示上个月/下个月按钮 | year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮
   * 默认值: 'none'
   */
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none')
}

export type YearPanelProps = ExtractPropTypes<typeof yearPanelProps>

export type YearPanelExpose = {
  /**
   * 使当前日期或者选中日期滚动到可视区域
   */
  scrollIntoView: () => void
}

export type YearPanelInstance = ComponentPublicInstance<YearPanelProps, YearPanelExpose>
