import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../../common/props'
import type { DateTimeType, DatetimePickerViewFilter, DatetimePickerViewFormatter } from '../wd-datetime-picker-view/types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear() - 10, 0, 1).getTime()
const defaultMaxDate = new Date(now.getFullYear() + 10, 11, 31, 23, 59, 59).getTime()

export const datetimePickerProps = {
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
   * 弹出层标题
   * 类型: string
   */
  title: String,
  /**
   * 取消按钮文案
   * 类型: string
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   * 类型: string
   */
  confirmButtonText: String,
  /**
   * 点击遮罩是否关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * 类型: boolean
   * 默认值: true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 选项的key
   * 类型: string
   * 默认值: 'value'
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项的label
   * 类型: string
   * 默认值: 'label'
   */
  labelKey: makeStringProp('label'),
  /**
   * 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为 时间戳
   * 类型: string | number | Array<string | number>
   * 必填
   */
  modelValue: makeRequiredProp([String, Number, Array] as PropType<string | number | Array<string | number>>),
  /**
   * 选择器类型
   * 类型: string
   * 可选值: 'date' | 'year-month' | 'time' | 'datetime' | 'year'
   * 默认值: 'datetime'
   */
  type: makeStringProp<DateTimeType>('datetime'),
  /**
   * 最小日期
   * 类型: number
   * 默认值: 十年前的1月1日
   */
  minDate: makeNumberProp(defaultMinDate),
  /**
   * 最大日期
   * 类型: number
   * 默认值: 十年后的12月31日
   */
  maxDate: makeNumberProp(defaultMaxDate),
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
   * 是否启用秒选择，仅在 time 和 datetime 类型下生效
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
   * 确定前校验函数，接收 (value) 参数，返回 boolean 或 Promise<boolean>
   * 类型: function
   */
  beforeConfirm: Function as PropType<DatetimePickerBeforeConfirm>,
  /**
   * 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串
   * 类型: function
   */
  displayFormatTabLabel: Function as PropType<DatetimePickerDisplayFormatTabLabel>,

  /**
   * 弹窗层级
   * 类型: number
   * 默认值: 15
   */
  zIndex: makeNumberProp(15),
  /**
   * pickerView 外部自定义样式
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
  visible: makeBooleanProp(false)
}

export type DatetimePickerBeforeConfirm = (value: number | string | (number | string)[]) => boolean | Promise<boolean>

export type DatetimePickerDisplayFormatTabLabel = (items: Record<string, any>[]) => string

export type DatetimePickerExpose = {
  /**
   * 打开picker弹框
   */
  open: () => void
  /**
   * 关闭picker弹框
   */
  close: () => void
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>

export type DatetimePickerInstance = ComponentPublicInstance<DatetimePickerProps, DatetimePickerExpose>
