/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-04-06 23:08:37
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-password-input/types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../../common/props'

export const passwordInputProps = {
  ...baseProps,
  /**
   * 绑定的值
   */
  modelValue: makeStringProp(''),
  /**
   * 是否隐藏密码内容
   */
  mask: makeBooleanProp(true),
  /**
   * 输入框下方文字提示
   */
  info: makeStringProp(''),
  /**
   * 输入框下方错误提示
   */
  errorInfo: makeStringProp(''),
  /**
   * 输入框格子之间的间距，如 20px 2em，默认单位为 px
   */
  gutter: makeNumericProp(0),
  /**
   * 密码最大长度
   */
  length: makeNumberProp(6),
  /**
   * 是否已聚焦，聚焦时会显示光标
   */
  focused: makeBooleanProp(true),
  /**
   * 是否启用原生输入，以支持粘贴和系统键盘。H5 上同时支持短信验证码自动填充。
   * 开启后仍用格子展示内容。粘贴追加到已有内容后，再过滤为数字并截断到 length。
   * 自动填充不依赖 mask，且只在 H5 设置：autocomplete="one-time-code"，并设置 text-content-type="oneTimeCode"（uni-app H5 会把它映射成 autocomplete）。
   * text-content-type 仅 App-nvue-iOS 有效。本组件是 Vue 文件，不在 App-vue 上承诺短信验证码建议。
   * 掩码只影响格子展示。关闭时保持仅展示、由 Keyboard 录入的行为。
   * 类型: boolean
   * 默认值: false
   */
  nativeInput: makeBooleanProp(false)
}
