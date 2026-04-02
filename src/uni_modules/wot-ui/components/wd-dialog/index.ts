import { inject, provide, ref } from 'vue'
import type { Dialog, DialogOptions, DialogOptionsWithCallBack, DialogResult, DialogType } from './types'
import { deepMerge, isDef, isObj, isString } from '../../common/util'
import { type IconProps } from '../wd-icon/types'

const dialogDefaultOptionKey = '__MESSAGE_OPTION__'

const None = Symbol('None')

// 默认模板
export const defaultOptions: DialogOptionsWithCallBack = {
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

/**
 * Dialog 弹窗函数式调用
 * @param selector 唯一标识，用于区分多个弹窗实例
 */
export function useDialog(selector: string = ''): Dialog {
  const dialogOptionKey = selector ? dialogDefaultOptionKey + selector : dialogDefaultOptionKey
  const dialogOption = inject(dialogOptionKey, ref<DialogOptionsWithCallBack | typeof None>(None)) // Dialog选项
  if (dialogOption.value === None) {
    dialogOption.value = defaultOptions
    provide(dialogOptionKey, dialogOption)
  }

  const createMethod = (type: DialogType) => {
    // 优先级：options->DialogOptions->defaultOptions
    return (options: DialogOptions | string) => {
      const dialogOptions = deepMerge({ type: type }, isString(options) ? { title: options } : options) as DialogOptions

      // 先设置默认值（只有当用户未配置时）
      if (dialogOptions.cancelButtonProps === undefined && dialogOptions.showCancelButton === undefined) {
        if (dialogOptions.type === 'confirm' || dialogOptions.type === 'prompt') {
          dialogOptions.showCancelButton = true
        } else {
          dialogOptions.showCancelButton = false
        }
      }

      // 合并快捷属性到高级配置（快捷属性优先级更高）
      normalizeButtonProps(dialogOptions)
      normalizeIconProps(dialogOptions)

      if (
        dialogOptions.actions &&
        dialogOptions.actions.length > 0 &&
        (dialogOptions.confirmButtonProps !== undefined || dialogOptions.cancelButtonProps !== undefined)
      ) {
        console.warn(
          '[wot-ui] DialogBox: actions 和 confirmButtonProps/cancelButtonProps 同时配置时，将使用 actions 配置，confirmButtonProps/cancelButtonProps 将被忽略'
        )
      }
      return show(dialogOptions)
    }
  }

  /**
   * 合并按钮快捷属性到 confirmButtonProps/cancelButtonProps
   * 快捷属性（confirmButtonText/cancelButtonText/showCancelButton）优先级高于 Props 对象内的属性
   */
  function normalizeButtonProps(options: DialogOptions) {
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
  function normalizeIconProps(options: DialogOptions) {
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

  /**
   * 显示弹窗
   * @param option 弹窗配置项或标题
   */
  const show = (option: DialogOptions | string) => {
    // 返回一个promise
    return new Promise<DialogResult>((resolve, reject) => {
      const options = deepMerge(defaultOptions, isString(option) ? { title: option } : option)
      dialogOption.value = deepMerge(options, {
        show: true,
        success: (res: DialogResult) => {
          close()
          resolve(res)
        },
        fail: (res: DialogResult) => {
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

  /**
   * 关闭弹窗
   */
  const close = () => {
    if (dialogOption.value !== None) {
      dialogOption.value.show = false
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

export const getDialogDefaultOptionKey = (selector: string) => {
  return selector ? `${dialogDefaultOptionKey}${selector}` : dialogDefaultOptionKey
}
