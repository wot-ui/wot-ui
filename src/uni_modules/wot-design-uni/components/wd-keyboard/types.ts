import type { PropType, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type KeyboardMode = 'default' | 'custom' | 'car'
export type KeyType = '' | 'delete' | 'extra' | 'close'
export type CarKeyboardLang = 'zh' | 'en'

export interface Key {
  /**
   * key文本
   */
  text?: number | string
  /**
   * key的类型
   */
  type?: KeyType
  /**
   * 是否占2个key的宽度
   */
  wider?: boolean
}

export const keyboardProps = {
  ...baseProps,
  /**
   * 是否可见
   * 类型：boolean
   * 默认值：false
   */
  visible: makeBooleanProp(false),
  /**
   * 绑定的值
   * 类型：string
   * 默认值：''
   */
  modelValue: makeStringProp(''),
  /**
   * 标题
   * 类型：string
   */
  title: String,
  /**
   * 键盘模式
   * 类型：string
   * 可选值：'default' | 'custom' | 'car'
   * 默认值：'default'
   */
  mode: makeStringProp<KeyboardMode>('default'),
  /**
   * 层级
   * 类型：number
   * 默认值：100
   */
  zIndex: makeNumberProp(100),
  /**
   * 最大长度
   * 类型：number
   * 默认值：Infinity
   */
  maxlength: makeNumberProp(Infinity),
  /**
   * 是否显示删除键
   * 类型：boolean
   * 默认值：true
   */
  showDeleteKey: makeBooleanProp(true),
  /**
   * 是否随机键盘按键顺序
   * 类型：boolean
   * 默认值：false
   */
  randomKeyOrder: makeBooleanProp(false),
  /**
   * 确认按钮文本
   * 类型：string
   */
  closeText: String,
  /**
   * 删除按钮文本
   * 类型：string
   */
  deleteText: String,
  /**
   * 关闭按钮是否显示加载状态
   * 类型：boolean
   * 默认值：false
   */
  closeButtonLoading: makeBooleanProp(false),
  /**
   * 是否显示蒙层
   * 类型：boolean
   * 默认值：false
   */
  modal: makeBooleanProp(false),
  /**
   * 是否在点击外部时收起键盘
   * 类型：boolean
   * 默认值：true
   */
  hideOnClickOutside: makeBooleanProp(true),
  /**
   * 是否锁定滚动
   * 类型：boolean
   * 默认值：true
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 是否在底部安全区域内
   * 类型：boolean
   * 默认值：true
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 额外按键
   * 类型：string | string[]
   */
  extraKey: [String, Array] as PropType<string | Array<string>>,
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型：boolean
   * 默认值：false
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 车牌键盘语言模式 当mode=car时生效
   * 类型：string
   * 可选值：'zh' | 'en'
   */
  carLang: String as PropType<CarKeyboardLang>,
  /**
   * 是否自动切换车牌键盘语言 当mode=car且carLang是非受控状态时生效
   * 类型：boolean
   * 默认值：false
   */
  autoSwitchLang: makeBooleanProp(false)
}

export type KeyboardProps = ExtractPropTypes<typeof keyboardProps>
