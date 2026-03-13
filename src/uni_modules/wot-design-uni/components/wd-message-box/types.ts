/*
 * @Author: weisheng
 * @Date: 2024-04-08 22:34:01
 * @LastEditTime: 2026-01-29 23:07:18
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-message-box/types.ts
 * 记得注释
 */
import { baseProps, makeStringProp, makeBooleanProp, makeNumberProp } from '../common/props'
import type { ButtonProps } from '../wd-button/types'
import { type IconProps } from '../wd-icon/types'
import { type InputType, type InputProps } from '../wd-input/types'
import { type TextareaProps } from '../wd-textarea/types'
import type { PropType } from 'vue'

export type MessageType = 'alert' | 'confirm' | 'prompt'
export type MessageTheme = 'button' | 'text'
export type MessageActionLayout = 'horizontal' | 'vertical'
export type MessageSelector = string | { selector: string; rootPortal?: boolean } // Compatible with selector usage

// 内置图标类型
export type MessageBuiltinIconType = 'success' | 'info' | 'warning' | 'danger'

// 内置图标配置映射
export const MESSAGE_BUILTIN_ICON_MAP: Record<MessageBuiltinIconType, string> = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'exclamation-circle-fill',
  danger: 'close-circle-fill'
}

export type MessageAction = Partial<ButtonProps> & {
  text?: string
  click?: () => void | Promise<void>
}

// 统一按钮配置类型：字符串(仅文本) | 对象(透传Props + text) | null(不显示)
export type MessageBoxButtonOption =
  | string
  | (Partial<ButtonProps> & {
      /** 按钮文本 */
      text?: string
    })
  | null

export type MessageInputType = InputType | 'textarea'

export type MessageOptions = {
  /**
   * 是否显示弹窗
   * 类型: boolean
   */
  show?: boolean
  /**
   * 标题
   * 类型: string
   */
  title?: string
  /**
   * 消息内容
   * 类型: string
   */
  msg?: string
  /**
   * 弹窗类型
   * 类型: MessageType
   * @default 'alert'
   */
  type?: MessageType
  /**
   * 弹窗风格
   * 类型: MessageTheme
   * 可选值: 'button' | 'text'
   * @default 'button'
   */
  theme?: MessageTheme
  /**
   * 弹窗层级
   * 类型: number
   * @default 99
   */
  zIndex?: number
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型: boolean
   */
  lazyRender?: boolean

  // --- 视觉增强 ---
  /**
   * 顶部通栏图片地址
   * 类型: string
   */
  headerImage?: string
  /**
   * 状态图标
   * 类型: string
   * 支持内置类型: 'success' | 'info' | 'warning' | 'danger'
   * 也支持任意图标名称（默认 primary 颜色）
   */
  icon?: string
  /**
   * 自定义图标颜色
   * 类型: string
   */
  iconColor?: string
  /**
   * 透传Icon组件属性
   * 类型: Partial<IconProps>
   */
  iconProps?: Partial<IconProps>

  // --- 输入框配置 (Type='prompt') ---
  /**
   * 当type为prompt时，输入框的初始值
   * 优先级高于 inputProps.modelValue 和 textareaProps.modelValue
   * 类型: string | number
   */
  inputValue?: string | number
  /**
   * 当type为prompt时，内嵌 input 组件的属性
   * 类型: Partial<InputProps>
   */
  inputProps?: Partial<InputProps>
  /**
   * 当type为prompt时，内嵌 textarea 组件的属性，优先级高于扁平化属性
   * 类型: Partial<TextareaProps>
   */
  textareaProps?: Partial<TextareaProps>
  /**
   * 当type为prompt时，输入框正则校验，点击确定按钮时进行校验
   * 类型: RegExp
   */
  inputPattern?: RegExp
  /**
   * 当type为prompt时，输入框校验函数，点击确定按钮时进行校验
   * 类型: (inputValue: string | number) => boolean | string
   */
  inputValidate?: (inputValue: string | number) => boolean | string
  /**
   * 当type为prompt时，输入框检验不通过时的错误提示文案
   * 类型: string
   */
  inputError?: string
  /**
   * 是否显示错误信息
   * 类型: boolean
   */
  showErr?: boolean
  // --- 操作栏配置 ---
  /**
   * 按钮排列方式
   * 类型: MessageActionLayout
   * @default 'horizontal'
   */
  actionLayout?: MessageActionLayout

  /**
   * 是否显示取消按钮
   * 类型: boolean
   */
  showCancelButton?: boolean
  /**
   * 确定按钮文案
   * 类型: string
   */
  confirmButtonText?: string
  /**
   * 取消按钮文案
   * 类型: string
   */
  cancelButtonText?: string

  /**
   * 确认按钮配置（高级）
   * 类型: MessageBoxButtonOption
   * - 字符串: 设置按钮文本
   * - 对象: 透传 ButtonProps 并可设置 text 属性
   * - null: 隐藏按钮
   */
  confirmButtonProps?: MessageBoxButtonOption
  /**
   * 取消按钮配置（高级）
   * 类型: MessageBoxButtonOption
   * - 字符串: 设置按钮文本
   * - 对象: 透传 ButtonProps 并可设置 text 属性
   * - null: 隐藏按钮
   */
  cancelButtonProps?: MessageBoxButtonOption

  /**
   * 自定义操作按钮列表 (用于三按钮等复杂场景)
   * 优先级高于 confirmButtonProps / cancelButtonProps
   * 类型: MessageAction[]
   */
  actions?: MessageAction[]

  // --- 交互与关闭 ---
  /**
   * 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'
   * 类型: boolean
   */
  closeOnClickModal?: boolean
  /**
   * 是否展示关闭按钮
   * 类型: boolean
   */
  showClose?: boolean

  /**
   * 确认前钩子，支持返回 Promise 阻断关闭
   * 类型: (options: MessageBeforeConfirmOption) => Promise<boolean> | boolean | void
   */
  beforeConfirm?: (options: MessageBeforeConfirmOption) => Promise<boolean> | boolean | void
}

export type MessageBeforeConfirmOption = {
  resolve: (isPass: boolean) => void
}

export type MessageOptionsWithCallBack = MessageOptions & {
  show?: boolean
  success?: (res: MessageResult) => void
  fail?: (res: MessageResult) => void
}

export type ActionType = 'confirm' | 'cancel' | 'modal' | 'close'

export type InputValidate = (inputValue: string | number) => boolean

export interface MessageResult {
  action: ActionType
  value?: string | number
}

export interface Message {
  // 通用显示方法
  show(options: MessageOptions | string): Promise<MessageResult>
  // 快捷方法
  alert(options: MessageOptions | string): Promise<MessageResult>
  confirm(options: MessageOptions | string): Promise<MessageResult>
  prompt(options: MessageOptions | string): Promise<MessageResult>
  close(): void
}

export const messageBoxProps = {
  ...baseProps,
  /**
   * 指定唯一标识
   * 类型: string
   * 默认值: ''
   */
  selector: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型: boolean
   * 默认值: false
   */
  rootPortal: makeBooleanProp(false),
  // show: makeBooleanProp(false), // 组件内通常由 v-model 或 show prop 控制，这里复用 baseProps 或单独定义
  /**
   * 标题
   * 类型: string
   * 默认值: ''
   */
  title: makeStringProp(''),
  /**
   * 消息内容
   * 类型: string
   * 默认值: ''
   */
  msg: makeStringProp(''),
  /**
   * 弹窗类型
   * 类型: MessageType
   * 可选值: 'alert' | 'confirm' | 'prompt'
   * 默认值: 'alert'
   */
  type: makeStringProp<MessageType>('alert'),
  /**
   * 弹窗风格
   * 类型: MessageTheme
   * 可选值: 'button' | 'text'
   * 默认值: 'button'
   */
  theme: makeStringProp<MessageTheme>('button'),
  /**
   * 弹窗层级
   * 类型: number
   * 默认值: 99
   */
  zIndex: makeNumberProp(99),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型: boolean
   * 默认值: true
   */
  lazyRender: makeBooleanProp(true),
  /**
   * 顶部通栏图片地址
   * 类型: string
   */
  headerImage: String,
  /**
   * 状态图标
   * 类型: string
   * 支持内置类型: 'success' | 'info' | 'warning' | 'danger'
   * 也支持任意图标名称（默认 primary 颜色）
   */
  icon: String,
  /**
   * 自定义图标颜色
   * 类型: string
   */
  iconColor: String,
  /**
   * 透传Icon组件属性
   * 类型: object
   */
  iconProps: Object,

  // Input
  /**
   * 当type为prompt时，内嵌 input 组件的属性
   * 类型: Object
   */
  inputProps: Object as PropType<Partial<InputProps>>,
  /**
   * 当type为prompt时，内嵌 textarea 组件的属性
   * 类型: Object
   */
  textareaProps: Object as PropType<Partial<TextareaProps>>,
  /**
   * 当type为prompt时，输入框正则校验，点击确定按钮时进行校验
   * 类型: RegExp
   */
  inputPattern: RegExp,
  /**
   * 当type为prompt时，输入框校验函数，点击确定按钮时进行校验
   * 类型: InputValidate
   */
  inputValidate: Function as PropType<MessageOptions['inputValidate']>,
  /**
   * 当type为prompt时，输入框检验不通过时的错误提示文案
   * 类型: string
   */
  inputError: String,
  /**
   * 是否显示错误信息
   * 类型: boolean
   * 默认值: undefined
   */
  showErr: {
    type: Boolean
  },
  // Buttons
  /**
   * 按钮排列方式
   * 类型: MessageActionLayout
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 'horizontal'
   */
  actionLayout: makeStringProp<MessageActionLayout>('horizontal'),
  /**
   * 确认按钮配置
   * 类型: string | object | null
   */
  confirmButtonProps: {
    type: [String, Object, null] as PropType<MessageBoxButtonOption>
  },
  /**
   * 取消按钮配置
   * 类型: string | object | null
   */
  cancelButtonProps: {
    type: [String, Object, null] as PropType<MessageBoxButtonOption>
  },
  /**
   * 是否显示取消按钮
   * 类型: boolean
   * 默认值: undefined
   */
  showCancelButton: {
    type: Boolean
  },
  /**
   * 确定按钮文案
   * 类型: string
   */
  confirmButtonText: String,
  /**
   * 取消按钮文案
   * 类型: string
   */
  cancelButtonText: String,
  /**
   * 自定义操作按钮列表 (用于三按钮等复杂场景)
   * 类型: Array<MessageAction>
   */
  actions: Array as PropType<MessageAction[]>,

  // Interaction
  /**
   * 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'
   * 类型: boolean
   * 默认值: false
   */
  closeOnClickModal: makeBooleanProp(false),
  /**
   * 是否展示关闭按钮
   * 类型: boolean
   * 默认值: false
   */
  showClose: Boolean,
  /**
   * 确认前钩子，支持返回 Promise 阻断关闭
   * 类型: (options: MessageBeforeConfirmOption) => Promise<boolean> | boolean | void
   */
  beforeConfirm: Function as PropType<MessageOptions['beforeConfirm']>
}
