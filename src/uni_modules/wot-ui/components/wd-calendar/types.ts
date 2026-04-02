/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2026-02-03 10:14:38
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-calendar/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../wd-calendar-view/types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

export const calendarProps = {
  ...baseProps,
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   * 类型: number | number[] | null
   * 默认值: null
   */
  modelValue: makeRequiredProp([Number, Array, null] as PropType<number | number[] | null>),
  /**
   * 日期类型
   * 类型: CalendarType
   * 可选值: 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'
   * 默认值: 'date'
   */
  type: makeStringProp<CalendarType>('date'),
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
   * 选中日期所使用的当日内具体时刻
   * 类型: string | string[]
   */
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>
  },
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
   * 类型: CalendarTimeFilter
   */
  timeFilter: Function as PropType<CalendarTimeFilter>,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
   * 类型: boolean
   * 默认值: false
   */
  hideSecond: makeBooleanProp(false),
  /**
   * 弹出层标题
   * 类型: string
   */
  title: String,
  /**
   * 点击遮罩是否关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹框层级
   * 类型: number
   * 默认值: 15
   */
  zIndex: makeNumberProp(15),
  /**
   * 是否显示确定按钮
   * 类型: boolean
   * 默认值: true
   */
  showConfirm: makeBooleanProp(true),
  /**
   * 确定按钮文字
   * 类型: string
   */
  confirmText: String,
  /**
   * 自定义范围选择类型的面板内部回显，返回一个字符串
   * 类型: CalendarInnerDisplayFormat
   */
  innerDisplayFormat: Function as PropType<CalendarInnerDisplayFormat>,
  /**
   * 是否超出隐藏
   * 类型: boolean
   * 默认值: false
   */
  ellipsis: makeBooleanProp(false),
  /**
   * 是否显示类型切换功能
   * 类型: boolean
   * 默认值: false
   */
  showTypeSwitch: makeBooleanProp(false),
  /**
   * 快捷选项，为对象数组，其中对象的 text 必传
   * 类型: Record<string, any>[]
   */
  shortcuts: makeArrayProp<Record<string, any>>(),
  /**
   * 快捷操作点击回调
   * 类型: CalendarOnShortcutsClick
   */
  onShortcutsClick: Function as PropType<CalendarOnShortcutsClick>,
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * 类型: boolean
   * 默认值: true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 确定前校验函数，接收目标 value，返回 false 可阻止确认，支持返回 Promise<boolean>
   * 类型: CalendarBeforeConfirm
   */
  beforeConfirm: Function as PropType<CalendarBeforeConfirm>,
  /**
   * 自定义视图类名
   * 类型: string
   */
  customViewClass: makeStringProp(''),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   * 类型: boolean
   * 默认值: false
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型: boolean
   * 默认值: false
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 控制弹窗显示
   * 类型: boolean
   * 默认值: false
   */
  visible: makeBooleanProp(false),
  /**
   * 可滚动面板的高度
   * 类型: number
   * 默认值: 316
   */
  panelHeight: makeNumberProp(316),
  /**
   * 是否展示面板标题，自动计算当前滚动的日期月份
   * 类型: boolean
   * 默认值: true
   */
  showPanelTitle: makeBooleanProp(true),
  /**
   * 切换模式
   * 类型: 'none' | 'month' | 'year-month'
   * 可选值: none 平铺展示所有月份/年份，不展示切换按钮 | month 支持按月切换，展示上个月/下个月按钮 | year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮
   * 默认值: 'none'
   */
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none'),
  /**
   * 弹框动画持续时间
   * 类型: number
   * 默认值: 200
   */
  duration: makeNumberProp(200)
}

export type CalendarInnerDisplayFormat = (value: number, rangeType: 'start' | 'end', type: CalendarType) => string

export type CalendarBeforeConfirm = (value: number | number[] | null) => boolean | Promise<boolean>

export type CalendarOnShortcutsClickOption = {
  item: Record<string, any>
  index: number
}

export type CalendarOnShortcutsClick = (option: CalendarOnShortcutsClickOption) => number | number[]

export type CalendarExpose = {
  /**
   * 关闭时间选择器弹窗
   */
  close: () => void
  /**
   * 打开时间选择器弹窗
   */
  open: () => void
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export type CalendarInstance = ComponentPublicInstance<CalendarProps, CalendarExpose>
