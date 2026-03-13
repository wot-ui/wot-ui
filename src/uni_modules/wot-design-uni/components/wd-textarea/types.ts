import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { InputClearTrigger, InputMode } from '../wd-input/types'

export type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

export const textareaProps = {
  ...baseProps,
  /**
   * 自定义文本域容器class名称
   */
  customTextareaContainerClass: makeStringProp(''),
  /**
   * 自定义文本域class名称
   */
  customTextareaClass: makeStringProp(''),
  // 原生属性
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(''),
  /**
   * 占位文本
   */
  placeholder: String,
  /**
   * 指定placeholder的样式
   */
  placeholderStyle: String,
  /**
   * 指定placeholder的样式类
   */
  placeholderClass: makeStringProp(''),
  /**
   * 禁用输入框
   */
  disabled: makeBooleanProp(false),
  /**
   * 最大输入长度，设置为-1表示不限制最大长度
   */
  maxlength: makeNumberProp(-1),
  /**
   * 自动聚焦并拉起键盘
   */
  autoFocus: makeBooleanProp(false),
  /**
   * 获取焦点
   */
  focus: makeBooleanProp(false),
  /**
   * 是否自动增高输入框高度
   */
  autoHeight: makeBooleanProp(false),
  /**
   * 如果textarea处于position:fixed区域，需要设置此属性为true
   */
  fixed: makeBooleanProp(false),
  /**
   * 指定光标与键盘的距离
   */
  cursorSpacing: makeNumberProp(0),
  /**
   * 指定focus时的光标位置
   */
  cursor: makeNumberProp(-1),
  /**
   * 设置键盘右下角按钮的文字
   */
  confirmType: String as import('vue').PropType<ConfirmType>,
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: makeBooleanProp(false),
  /**
   * 是否显示键盘上方带有"完成"按钮那一栏
   */
  showConfirmBar: makeBooleanProp(true),
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: makeNumberProp(-1),
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: makeNumberProp(-1),
  /**
   * 键盘弹起时是否自动上推页面
   */
  adjustPosition: makeBooleanProp(true),
  /**
   * 是否去掉iOS下的默认内边距
   */
  disableDefaultPadding: makeBooleanProp(false),
  /**
   * focus状态下点击页面时是否不收起键盘
   */
  holdKeyboard: makeBooleanProp(false),
  // 非原生属性
  /**
   * 显示为密码框
   */
  showPassword: makeBooleanProp(false),
  /**
   * 是否显示清空按钮
   */
  clearable: makeBooleanProp(false),
  /**
   * 输入框只读状态
   */
  readonly: makeBooleanProp(false),
  /**
   * 前置图标，icon组件中的图标类名
   */
  prefixIcon: String,
  /**
   * 是否显示字数限制，需要同时设置maxlength
   */
  showWordLimit: makeBooleanProp(false),
  /**
   * 设置输入框错误状态（红色）
   */
  error: makeBooleanProp(false),
  /**
   * 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
   */
  clearTrigger: makeStringProp<InputClearTrigger>('always'),
  /**
   * 是否在点击清除按钮时聚焦输入框
   */
  focusWhenClear: makeBooleanProp(true),
  /**
   * 是否忽略组件内对文本合成系统事件的处理
   */
  ignoreCompositionEvent: makeBooleanProp(true),
  /**
   * 提供数据类型提示
   */
  inputmode: makeStringProp<InputMode>('text'),
  /**
   * 支付宝小程序，避免 textarea 弹出键盘后出现内容上移
   */
  enableNative: makeBooleanProp(true),
  /**
   * 紧凑模式，移除内边距和背景色，在结合 cell 或 form-item 使用时建议开启
   * 类型: boolean
   * 默认值: false
   */
  compact: makeBooleanProp(false)
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
