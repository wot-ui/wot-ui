import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import { type LoadingProps } from '../wd-loading/types'

/**
 * 按钮类型
 * 可选值: 'primary' | 'success' | 'info' | 'warning' | 'danger'
 */
export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
/**
 * 按钮变体
 * 可选值: 'base' | 'plain' | 'dashed' | 'soft' | 'text'
 */
export type ButtonVariant = 'base' | 'plain' | 'dashed' | 'soft' | 'text'
/**
 * 按钮尺寸
 * 可选值: 'mini' | 'small' | 'medium' | 'large'
 */
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large'
/**
 * 语言
 * 可选值: 'zh_CN' | 'zh_TW' | 'en'
 */
export type ButtonLang = 'zh_CN' | 'zh_TW' | 'en'

/**
 * 开放能力类型
 */
export type ButtonOpenType =
  | 'feedback'
  | 'share'
  | 'getUserInfo'
  | 'contact'
  | 'getPhoneNumber'
  | 'getRealtimePhoneNumber'
  | 'launchApp'
  | 'openSetting'
  | 'chooseAvatar'
  | 'getAuthorize'
  | 'lifestyle'
  | 'contactShare'
  | 'openGroupProfile'
  | 'openGuildProfile'
  | 'openPublicProfile'
  | 'shareMessageToFriend'
  | 'addFriend'
  | 'addColorSign'
  | 'addGroupApp'
  | 'addToFavorites'
  | 'chooseAddress'
  | 'chooseInvoiceTitle'
  | 'login'
  | 'subscribe'
  | 'favorite'
  | 'watchLater'
  | 'openProfile'
  | 'agreePrivacyAuthorization'

/**
 * 支付宝小程序授权范围
 * 可选值: 'phoneNumber' | 'userInfo'
 */
export type ButtonScope = 'phoneNumber' | 'userInfo'

/**
 * 按钮属性定义
 */
export const buttonProps = {
  ...baseProps,
  /**
   * 圆角按钮
   * 默认值: false
   */
  round: makeBooleanProp(false),
  /**
   * 禁用按钮
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否细边框
   * 默认值: false
   */
  hairline: makeBooleanProp(false),
  /**
   * 块状按钮
   * 默认值: false
   */
  block: makeBooleanProp(false),
  /**
   * 按钮类型
   * 类型: ButtonType
   * 可选值: 'primary' | 'success' | 'info' | 'warning' | 'danger'
   * 默认值: 'primary'
   */
  type: makeStringProp<ButtonType>('primary'),
  /**
   * 按钮尺寸
   * 类型: ButtonSize
   * 可选值: 'mini' | 'small' | 'medium' | 'large'
   * 默认值: 'medium'
   */
  size: makeStringProp<ButtonSize>('medium'),
  /**
   * 图标类名
   */
  icon: String,
  /**
   * 类名前缀，用于使用自定义图标，用法参考 Icon 组件
   * 默认值: 'wd-icon'
   */
  classPrefix: makeStringProp('wd-icon'),
  /**
   * CSS 图标，用法参考 Icon 组件
   * 类型: boolean | string
   * 默认值: false
   */
  cssIcon: {
    type: [Boolean, String],
    default: false
  },
  /**
   * 加载中按钮
   * 默认值: false
   */
  loading: makeBooleanProp(false),
  /**
   * 加载图标颜色
   */
  loadingColor: String,
  /**
   * 开放能力
   * 类型: ButtonOpenType
   */
  openType: String as PropType<ButtonOpenType>,
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * 默认值: false
   */
  hoverStopPropagation: Boolean,
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   * 类型: ButtonLang
   * 可选值: 'zh_CN' | 'zh_TW' | 'en'
   */
  lang: String as PropType<ButtonLang>,
  /**
   * 会话来源，open-type="contact"时有效
   */
  sessionFrom: String,
  /**
   * 会话内消息卡片标题，open-type="contact"时有效
   */
  sendMessageTitle: String,
  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
   */
  sendMessagePath: String,
  /**
   * 会话内消息卡片图片，open-type="contact"时有效
   */
  sendMessageImg: String,
  /**
   * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   */
  appParameter: String,
  /**
   * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
   * 默认值: false
   */
  showMessageCard: Boolean,
  /**
   * 按钮的唯一标识，可用于设置隐私同意授权按钮的id
   */
  buttonId: String,
  /**
   * 支付宝小程序，当 open-type 为 getAuthorize 时有效
   * 类型: ButtonScope
   * 可选值: 'phoneNumber' | 'userInfo'
   */
  scope: String as PropType<ButtonScope>,
  /**
   * 加载配置项
   * 类型: Partial<LoadingProps>
   */
  loadingProps: Object as PropType<Partial<LoadingProps>>,
  /**
   * 点击按钮后，等待多少毫秒后出现点击态，单位毫秒
   * 默认值: 20
   */
  hoverStartTime: makeNumberProp(20),
  /**
   * 手指松开后，等待多少毫秒后移除点击态，单位毫秒
   * 默认值: 70
   */
  hoverStayTime: makeNumberProp(70),
  /**
   * 按钮文本
   */
  text: String,
  /**
   * 按钮变体
   * 类型: ButtonVariant
   * 可选值: 'base' | 'plain' | 'dashed' | 'soft' | 'text'
   * 默认值: 'base'
   */
  variant: makeStringProp<ButtonVariant>('base')
}

/**
 * 按钮组件属性
 */
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
