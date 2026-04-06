/*
 * @Author: weisheng
 * @Date: 2026-03-13 17:20:03
 * @LastEditTime: 2026-03-27 18:57:39
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-calendar-view/year/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

export const yearProps = {
  /**
   * 日期类型
   * 类型: CalendarType
   */
  type: makeRequiredProp(String as PropType<CalendarType>),
  /**
   * 日期时间戳
   * 类型: number
   */
  date: makeRequiredProp(Number),
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
   * 选中日期所使用的当日内具体时刻
   * 类型: number[][]
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  /**
   * 是否展示标题
   * 类型: boolean
   * 默认值: true
   */
  showTitle: makeBooleanProp(true)
}
