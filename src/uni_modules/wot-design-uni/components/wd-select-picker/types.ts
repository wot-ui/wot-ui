import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type SelectPickerType = 'checkbox' | 'radio'

export const selectPickerProps = {
  ...baseProps,
  /** 弹出层标题 */
  title: String,
  /** 选中的颜色（单/复选框） */
  checkedColor: String,
  /** 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`） */
  min: makeNumberProp(0),
  /** 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`） */
  max: makeNumberProp(0),
  /** 设置 picker 内部的选项组尺寸大小 （单/复选框） */
  selectSize: String,
  /** 加载中 */
  loading: makeBooleanProp(false),
  /** 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 */
  loadingColor: makeStringProp('#4D80F0'),
  /** 点击遮罩是否关闭 */
  closeOnClickModal: makeBooleanProp(true),
  /** 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string */
  modelValue: makeRequiredProp([String, Number, Boolean, Array] as PropType<string | number | boolean | (string | number | boolean)[]>),
  /** 选择器数据，一维数组 */
  columns: makeArrayProp<Record<string, any>>(),
  /** 单复选选择器类型 */
  type: makeStringProp<SelectPickerType>('checkbox'),
  /** 选项对象中，value 对应的 key */
  valueKey: makeStringProp('value'),
  /** 选项对象中，展示的文本对应的 key */
  labelKey: makeStringProp('label'),
  /** 确认按钮文案 */
  confirmButtonText: String,
  /** 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 */
  beforeConfirm: Function as PropType<SelectPickerBeforeConfirm>,
  /** 弹窗层级 */
  zIndex: makeNumberProp(15),
  /** 弹出面板是否设置底部安全距离（iphone X 类型的机型） */
  safeAreaInsetBottom: makeBooleanProp(true),
  /** 可搜索（目前只支持本地搜索） */
  filterable: makeBooleanProp(false),
  /** 搜索框占位符 */
  filterPlaceholder: String,
  /** 重新打开是否滚动到选中项 */
  scrollIntoView: makeBooleanProp(true),
  /** 自定义内容样式类 */
  customContentClass: makeStringProp(''),
  /** 是否显示确认按钮（radio类型生效），默认值为：true */
  showConfirm: makeBooleanProp(true),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 控制弹窗显示
   */
  visible: makeBooleanProp(false)
}
export type SelectPickerProps = ExtractPropTypes<typeof selectPickerProps>

export type SelectPickerBeforeConfirm = (value: string | number | boolean | (string | number | boolean)[], resolve: (isPass: boolean) => void) => void

export type SelectPickerExpose = {
  // 打开picker弹框
  open: () => void
  // 关闭picker弹框
  close: () => void
}

export type SelectPickerInstance = ComponentPublicInstance<SelectPickerExpose, SelectPickerProps>
