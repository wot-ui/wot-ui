import { inject, provide, ref } from 'vue'
import type { Message, MessageOptions, MessageOptionsWithCallBack, MessageResult, MessageType } from './types'
import { deepMerge, isDef, isObj, isString } from '../common/util'
import { type IconProps } from '../wd-icon/types'

const messageDefaultOptionKey = '__MESSAGE_OPTION__'

const None = Symbol('None')

// 默认模板
export const defaultOptions: MessageOptionsWithCallBack = {
  title: '',
  show: false,
  closeOnClickModal: false,
  msg: '',
  type: 'alert',
  inputProps: {
    type: 'text',
    modelValue: ''
  },
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  inputError: '',
  theme: 'button',
  actionLayout: 'horizontal',
  confirmButtonProps: {}
}

export function useMessage(selector: string = ''): Message {
  const messageOptionKey = selector ? messageDefaultOptionKey + selector : messageDefaultOptionKey
  const messageOption = inject(messageOptionKey, ref<MessageOptionsWithCallBack | typeof None>(None)) // Message选项
  if (messageOption.value === None) {
    messageOption.value = defaultOptions
    provide(messageOptionKey, messageOption)
  }

  const createMethod = (type: MessageType) => {
    // 优先级：options->MessageOptions->defaultOptions
    return (options: MessageOptions | string) => {
      const messageOptions = deepMerge({ type: type }, isString(options) ? { title: options } : options) as MessageOptions

      // 先设置默认值（只有当用户未配置时）
      if (messageOptions.cancelButtonProps === undefined && messageOptions.showCancelButton === undefined) {
        if (messageOptions.type === 'confirm' || messageOptions.type === 'prompt') {
          messageOptions.showCancelButton = true
        } else {
          messageOptions.showCancelButton = false
        }
      }

      // 合并快捷属性到高级配置（快捷属性优先级更高）
      normalizeButtonProps(messageOptions)
      normalizeIconProps(messageOptions)

      // 警告：actions 和 confirmButtonProps/cancelButtonProps 同时配置时，actions 优先
      if (
        messageOptions.actions &&
        messageOptions.actions.length > 0 &&
        (messageOptions.confirmButtonProps !== undefined || messageOptions.cancelButtonProps !== undefined)
      ) {
        console.warn(
          '[wot-ui] MessageBox: actions 和 confirmButtonProps/cancelButtonProps 同时配置时，将使用 actions 配置，confirmButtonProps/cancelButtonProps 将被忽略'
        )
      }
      return show(messageOptions)
    }
  }

  /**
   * 合并按钮快捷属性到 confirmButtonProps/cancelButtonProps
   * 快捷属性（confirmButtonText/cancelButtonText/showCancelButton）优先级高于 Props 对象内的属性
   */
  function normalizeButtonProps(options: MessageOptions) {
    if (options.confirmButtonText) {
      if (isDef(options.confirmButtonProps) && isObj(options.confirmButtonProps)) {
        options.confirmButtonProps = { ...options.confirmButtonProps, text: options.confirmButtonText }
      } else if (!options.confirmButtonProps) {
        options.confirmButtonProps = options.confirmButtonText
      }
    }

    if (options.cancelButtonText) {
      if (isDef(options.cancelButtonProps) && isObj(options.cancelButtonProps)) {
        options.cancelButtonProps = { ...options.cancelButtonProps, text: options.cancelButtonText }
      } else if (!options.cancelButtonProps) {
        options.cancelButtonProps = options.cancelButtonText
      }
    }

    // 处理 showCancelButton
    if (options.showCancelButton === false && !isDef(options.cancelButtonProps)) {
      options.cancelButtonProps = null
    } else if (options.showCancelButton === true && !isDef(options.cancelButtonProps)) {
      // showCancelButton 为 true 时，设置为空对象让组件显示按钮，文本由组件内兜底
      options.cancelButtonProps = {}
    }
  }

  /**
   * 合并图标快捷属性到 iconProps
   * 快捷属性（icon/iconColor）优先级高于 Props 对象内的属性
   */
  function normalizeIconProps(options: MessageOptions) {
    if (options.icon || options.iconColor) {
      const iconProps: Partial<IconProps> = {}
      if (options.icon) {
        iconProps.name = options.icon
      }
      if (options.iconColor) {
        iconProps.color = options.iconColor
      }
      options.iconProps = { ...options.iconProps, ...iconProps }
    }
  }

  const show = (option: MessageOptions | string) => {
    // 返回一个promise
    return new Promise<MessageResult>((resolve, reject) => {
      const options = deepMerge(defaultOptions, isString(option) ? { title: option } : option)
      messageOption.value = deepMerge(options, {
        show: true,
        success: (res: MessageResult) => {
          close()
          resolve(res)
        },
        fail: (res: MessageResult) => {
          close()
          reject(res)
        }
      })
    })
  }

  // 打开Alert 弹框
  const alert = createMethod('alert')
  // 打开Confirm 弹框
  const confirm = createMethod('confirm')
  // 打开Prompt 弹框
  const prompt = createMethod('prompt')

  const close = () => {
    if (messageOption.value !== None) {
      messageOption.value.show = false
    }
  }
  return {
    show,
    alert,
    confirm,
    prompt,
    close
  }
}

export const getMessageDefaultOptionKey = (selector: string) => {
  return selector ? `${messageDefaultOptionKey}${selector}` : messageDefaultOptionKey
}
