/*
 * @Author: weisheng
 * @Date: 2024-04-08 22:34:01
 * @LastEditTime: 2026-01-30 13:49:35
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-dialog/types.ts
 * 记得注释
 */
import { baseProps, makeStringProp, makeBooleanProp, makeNumberProp } from '../../common/props'
import type { ButtonProps } from '../wd-button/types'
import { type IconProps } from '../wd-icon/types'
import { type InputType, type InputProps } from '../wd-input/types'
import { type TextareaProps } from '../wd-textarea/types'
import type { PropType } from 'vue'

export type DialogType = 'alert' | 'confirm' | 'prompt'
export type DialogTheme = 'button' | 'text'
export type DialogActionLayout = 'horizontal' | 'vertical'
export type DialogSelector = string | { selector: string; rootPortal?: boolean }

// 内置图标类型
export type DialogBuiltinIconType = 'success' | 'info' | 'warning' | 'danger'

// 内置图标配置映射
export const DIALOG_BUILTIN_ICON_MAP: Record<DialogBuiltinIconType, string> = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'exclamation-circle-fill',
  danger: 'close-circle-fill'
}

/**
 * OpenType 事件回调接口
 * 用于支持按钮开放能力的事件处理
 */
export interface DialogButtonOpenTypeEvents {
  /** 获取用户信息回调 (open-type="getUserInfo") */
  onGetuserinfo?: (detail: any) => void
  /** 客服消息回调 (open-type="contact") */
  onContact?: (detail: any) => void
  /** 获取手机号回调 (open-type="getPhoneNumber") */
  onGetphonenumber?: (detail: any) => void
  /** 获取实时手机号回调 (open-type="getRealtimePhoneNumber") */
  onGetrealtimephonenumber?: (detail: any) => void
  /** 错误回调 */
  onError?: (detail: any) => void
  /** 打开 APP 成功回调 (open-type="launchApp") */
  onLaunchapp?: (detail: any) => void
  /** 打开设置页回调 (open-type="openSetting") */
  onOpensetting?: (detail: any) => void
  /** 选择头像回调 (open-type="chooseAvatar") */
  onChooseavatar?: (detail: any) => void
  /** 同意隐私协议回调 (open-type="agreePrivacyAuthorization") */
  onAgreeprivacyauthorization?: (detail: any) => void
}

/**
 * OpenType 事件属性名列表（用于从按钮配置中过滤）
 */
export const OPEN_TYPE_EVENT_KEYS: (keyof DialogButtonOpenTypeEvents)[] = [
  'onGetuserinfo',
  'onContact',
  'onGetphonenumber',
  'onGetrealtimephonenumber',
  'onError',
  'onLaunchapp',
  'onOpensetting',
  'onChooseavatar',
  'onAgreeprivacyauthorization'
]

export type DialogAction = Partial<ButtonProps> &
  DialogButtonOpenTypeEvents & {
    text?: string
    click?: () => void | Promise<void>
  }

// 统一按钮配置类型：字符串(仅文本) | 对象(透传Props + text + openType事件) | null(不显示)
export type DialogBoxButtonOption =
  | string
  | (Partial<ButtonProps> &
      DialogButtonOpenTypeEvents & {
        /** 按钮文本 */
        text?: string
      })
  | null

export type DialogInputType = InputType | 'textarea'

export type DialogOptions = {
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
   * 类型: DialogType
   * @default 'alert'
   */
  type?: DialogType
  /**
   * 弹窗风格
   * 类型: DialogTheme
   * 可选值: 'button' | 'text'
   * @default 'button'
   */
  theme?: DialogTheme
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
   * 类型: DialogActionLayout
   * @default 'horizontal'
   */
  actionLayout?: DialogActionLayout

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
   * 类型: DialogBoxButtonOption
   * - 字符串: 设置按钮文本
   * - 对象: 透传 ButtonProps 并可设置 text 属性
   * - null: 隐藏按钮
   */
  confirmButtonProps?: DialogBoxButtonOption
  /**
   * 取消按钮配置（高级）
   * 类型: DialogBoxButtonOption
   * - 字符串: 设置按钮文本
   * - 对象: 透传 ButtonProps 并可设置 text 属性
   * - null: 隐藏按钮
   */
  cancelButtonProps?: DialogBoxButtonOption

  /**
   * 自定义操作按钮列表 (用于三按钮等复杂场景)
   * 优先级高于 confirmButtonProps / cancelButtonProps
   * 类型: DialogAction[]
   */
  actions?: DialogAction[]

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
   * 确认前钩子，接收当前输入值，返回 false 可阻止确认，支持 Promise<boolean>
   * 类型: DialogBeforeConfirm
   */
  beforeConfirm?: DialogBeforeConfirm
}

export type DialogBeforeConfirm = (value: string | number) => boolean | Promise<boolean>

export type DialogOptionsWithCallBack = DialogOptions & {
  show?: boolean
  success?: (res: DialogResult) => void
  fail?: (res: DialogResult) => void
}

export type ActionType = 'confirm' | 'cancel' | 'modal' | 'close'

export type InputValidate = (inputValue: string | number) => boolean

export interface DialogResult {
  action: ActionType
  value?: string | number
}

export interface Dialog {
  // 通用显示方法
  show(options: DialogOptions | string): Promise<DialogResult>
  // 快捷方法
  alert(options: DialogOptions | string): Promise<DialogResult>
  confirm(options: DialogOptions | string): Promise<DialogResult>
  prompt(options: DialogOptions | string): Promise<DialogResult>
  close(): void
}

export const dialogProps = {
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
   * 类型: DialogType
   * 可选值: 'alert' | 'confirm' | 'prompt'
   * 默认值: 'alert'
   */
  type: makeStringProp<DialogType>('alert'),
  /**
   * 弹窗风格
   * 类型: DialogTheme
   * 可选值: 'button' | 'text'
   * 默认值: 'button'
   */
  theme: makeStringProp<DialogTheme>('button'),
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
  /**
   * 当type为prompt时，内嵌 input 组件的属性
   * 类型: object
   */
  inputProps: Object as PropType<Partial<InputProps>>,
  /**
   * 当type为prompt时，内嵌 textarea 组件的属性
   * 类型: object
   */
  textareaProps: Object as PropType<Partial<TextareaProps>>,
  /**
   * 当type为prompt时，输入框正则校验，点击确定按钮时进行校验
   * 类型: RegExp
   */
  inputPattern: RegExp,
  /**
   * 当type为prompt时，输入框校验函数，点击确定按钮时进行校验
   * 类型: (inputValue: string | number) => boolean | string
   */
  inputValidate: Function as PropType<DialogOptions['inputValidate']>,
  /**
   * 当type为prompt时，输入框检验不通过时的错误提示文案
   * 类型: string
   */
  inputError: String,
  /**
   * 是否显示错误信息
   * 类型: boolean
   */
  showErr: {
    type: Boolean
  },
  /**
   * 按钮排列方式
   * 类型: DialogActionLayout
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: 'horizontal'
   */
  actionLayout: makeStringProp<DialogActionLayout>('horizontal'),
  /**
   * 确认按钮配置
   * 类型: DialogBoxButtonOption
   */
  confirmButtonProps: {
    type: [String, Object, null] as PropType<DialogBoxButtonOption>
  },
  /**
   * 取消按钮配置
   * 类型: DialogBoxButtonOption
   */
  cancelButtonProps: {
    type: [String, Object, null] as PropType<DialogBoxButtonOption>
  },
  /**
   * 是否显示取消按钮
   * 类型: boolean
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
   * 类型: DialogAction[]
   */
  actions: Array as PropType<DialogAction[]>,
  /**
   * 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'
   * 类型: boolean
   * 默认值: false
   */
  closeOnClickModal: makeBooleanProp(false),
  /**
   * 是否展示关闭按钮
   * 类型: boolean
   */
  showClose: Boolean,
  /**
   * 确认前钩子，支持返回 Promise 阻断关闭
   * 类型: (options: DialogBeforeConfirmOption) => Promise<boolean> | boolean | void
   */
  beforeConfirm: Function as PropType<DialogOptions['beforeConfirm']>
}
