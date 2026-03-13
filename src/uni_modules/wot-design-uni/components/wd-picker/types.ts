import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp, type Numeric } from '../common/props'
import type { PickerOption, PickerViewInstance } from '../wd-picker-view/types'

export const pickerProps = {
  ...baseProps,
  /**
   * pickerView 外部自定义样式
   * 类型: string
   * 默认值: ''
   */
  customViewClass: makeStringProp(''),
  /* popup */
  /**
   * 弹出层标题
   * 类型: string
   * 默认值: -
   */
  title: String,
  /**
   * 取消按钮文案
   * 类型: string
   * 默认值: -
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   * 类型: string
   * 默认值: -
   */
  confirmButtonText: String,
  /**
   * 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数
   * 类型: PickerBeforeConfirm
   * 默认值: -
   */
  beforeConfirm: Function as PropType<PickerBeforeConfirm>,
  /**
   * 点击蒙层关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 底部安全区域内
   * 类型: boolean
   * 默认值: true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
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
   * 选项值对应的键名
   * 类型: string
   * 默认值: 'value'
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项文本对应的键名
   * 类型: string
   * 默认值: 'label'
   */
  labelKey: makeStringProp('label'),
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
   * 类型: (string | number | boolean)[]
   * 默认值: []
   */
  modelValue: makeArrayProp<Numeric>(),
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   * 类型: Array<string | number | PickerOption | Array<string | number | PickerOption>>
   * 默认值: []
   */
  columns: makeArrayProp<PickerOption | Array<PickerOption>>(),
  /**
   * 自定义层级
   * 类型: number
   * 默认值: 15
   */
  zIndex: makeNumberProp(15),
  /**
   * 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
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

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export type PickerDisplayFormat = (item: PickerOption | PickerOption[], vl: { valueKey: string; labelKey: string }) => string

export type PickerBeforeConfirm = (value: Numeric[], resolve: (isPass: boolean) => void, picker: PickerInstance) => void

export type PickerExpose = {
  /**
   * 打开picker弹框
   */
  open: () => void
  /**
   * 关闭picker弹框
   */
  close: () => void
}

export type PickerInstance = ComponentPublicInstance<PickerExpose, PickerProps>
