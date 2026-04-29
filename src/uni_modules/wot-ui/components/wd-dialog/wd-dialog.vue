<template>
  <wd-popup
    transition="zoom-in"
    v-model="dialogState.show"
    :close-on-click-modal="dialogState.closeOnClickModal"
    :lazy-render="dialogState.lazyRender"
    custom-class="wd-dialog"
    @click-modal="toggleModal('modal')"
    :z-index="dialogState.zIndex"
    :duration="200"
    :root-portal="rootPortal"
  >
    <view :class="rootClass">
      <wd-icon v-if="dialogState.showClose" custom-class="wd-dialog__close" name="close" @click="toggleModal('close')"></wd-icon>
      <slot name="header" />
      <view :class="bodyClass">
        <slot name="image">
          <image v-if="dialogState.headerImage" mode="widthFix" class="wd-dialog__img" :src="dialogState.headerImage"></image>
        </slot>
        <slot name="title" :icon="dialogState.icon" :title="dialogState.title" :iconProps="dialogState.iconProps">
          <view v-if="dialogState.iconProps?.name || dialogState.title" class="wd-dialog__title">
            <wd-icon
              v-if="dialogState.iconProps?.name"
              :custom-class="`wd-dialog__icon ${iconTypeClass}`"
              :name="dialogState.iconProps.name"
              :color="dialogState.iconProps.color"
              :size="dialogState.iconProps.size"
            ></wd-icon>
            {{ dialogState.title }}
          </view>
        </slot>
        <view class="wd-dialog__content" v-if="dialogState.type === 'prompt' || !!dialogState.msg || $slots.default">
          <slot
            :msg="dialogState.msg"
            :type="dialogState.type"
            :inputValue="inputVal"
            :showErr="dialogState.showErr"
            :inputError="dialogState.inputError"
          >
            <block v-if="dialogState.type === 'prompt'">
              <wd-textarea
                v-if="dialogState.textareaProps"
                v-model="inputVal"
                custom-class="wd-dialog__input"
                v-bind="textareaPropsWithoutModelValue"
              />
              <wd-input v-else v-model="inputVal" custom-class="wd-dialog__input" v-bind="inputPropsWithoutModelValue" />
              <view v-if="dialogState.showErr" class="wd-dialog__input-error">
                {{ dialogState.inputError || translate('inputNoValidate') }}
              </view>
            </block>
            <text v-else class="wd-dialog__content-text">{{ dialogState.msg }}</text>
          </slot>
        </view>
      </view>
      <slot name="actions" :confirm="() => toggleModal('confirm')" :cancel="() => toggleModal('cancel')" :close="() => toggleModal('close')">
        <view
          :class="`wd-dialog__actions ${dialogState.actionLayout === 'vertical' ? 'wd-dialog__actions--vertical' : ''} ${
            dialogState.actionLayout === 'vertical' || showCancelButton || (dialogState.actions && dialogState.actions.length > 1)
              ? 'wd-dialog__flex'
              : 'wd-dialog__block'
          } ${dialogState.theme === 'text' ? 'is-text' : ''}`"
        >
          <block v-if="customActions && customActions.length">
            <wd-button
              v-for="(btn, index) in customActions"
              :key="index"
              v-bind="getActionButtonProps(btn)"
              @click="handleAction(btn, index)"
              @getuserinfo="(e: any) => handleOpenTypeEvent(btn, 'onGetuserinfo', e)"
              @contact="(e: any) => handleOpenTypeEvent(btn, 'onContact', e)"
              @getphonenumber="(e: any) => handleOpenTypeEvent(btn, 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleOpenTypeEvent(btn, 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleOpenTypeEvent(btn, 'onError', e)"
              @launchapp="(e: any) => handleOpenTypeEvent(btn, 'onLaunchapp', e)"
              @opensetting="(e: any) => handleOpenTypeEvent(btn, 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleOpenTypeEvent(btn, 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleOpenTypeEvent(btn, 'onAgreeprivacyauthorization', e)"
              custom-class="wd-dialog__actions-btn"
            >
              {{ btn.text }}
            </wd-button>
          </block>
          <block v-else>
            <wd-button
              v-bind="customCancelProps"
              v-if="showCancelButton"
              @click="toggleModal('cancel')"
              @getuserinfo="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetuserinfo', e)"
              @contact="(e: any) => handleButtonOpenTypeEvent('cancel', 'onContact', e)"
              @getphonenumber="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleButtonOpenTypeEvent('cancel', 'onError', e)"
              @launchapp="(e: any) => handleButtonOpenTypeEvent('cancel', 'onLaunchapp', e)"
              @opensetting="(e: any) => handleButtonOpenTypeEvent('cancel', 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleButtonOpenTypeEvent('cancel', 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleButtonOpenTypeEvent('cancel', 'onAgreeprivacyauthorization', e)"
            >
              {{ getCancelText() }}
            </wd-button>
            <wd-button
              v-bind="customConfirmProps"
              v-if="showConfirmButton"
              @click="toggleModal('confirm')"
              @getuserinfo="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetuserinfo', e)"
              @contact="(e: any) => handleButtonOpenTypeEvent('confirm', 'onContact', e)"
              @getphonenumber="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleButtonOpenTypeEvent('confirm', 'onError', e)"
              @launchapp="(e: any) => handleButtonOpenTypeEvent('confirm', 'onLaunchapp', e)"
              @opensetting="(e: any) => handleButtonOpenTypeEvent('confirm', 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleButtonOpenTypeEvent('confirm', 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleButtonOpenTypeEvent('confirm', 'onAgreeprivacyauthorization', e)"
            >
              {{ getConfirmText() }}
            </wd-button>
          </block>
        </view>
      </slot>
    </view>
  </wd-popup>
</template>
<script lang="ts">
export default {
  name: 'wd-dialog',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdPopup from '../wd-popup/wd-popup.vue'
import wdButton from '../wd-button/wd-button.vue'
import wdInput from '../wd-input/wd-input.vue'
import wdTextarea from '../wd-textarea/wd-textarea.vue'
import { computed, inject, reactive, ref, watch } from 'vue'
import {
  dialogProps,
  type DialogBeforeConfirm,
  type DialogOptionsWithCallBack,
  type DialogResult,
  type DialogBuiltinIconType,
  DIALOG_BUILTIN_ICON_MAP,
  type DialogAction,
  type DialogButtonOpenTypeEvents,
  OPEN_TYPE_EVENT_KEYS
} from './types'
import { defaultOptions, getDialogDefaultOptionKey } from '.'
import { callInterceptor } from '../../common/interceptor'
import { deepAssign, isDef, isFunction, isObj, isString, isUndefined, omitBy } from '../../common/util'
import { useTranslate } from '../../composables/useTranslate'
import type { ButtonProps, ButtonVariant } from '../wd-button/types'

const props = defineProps(dialogProps)

const { translate } = useTranslate('dialog')

// 当前图标的内置类型（用于添加 class）
const iconType = ref<string>('')

// 图标类型对应的 class
const iconTypeClass = computed(() => {
  return iconType.value ? `is-${iconType.value}` : ''
})

const rootClass = computed(() => {
  return `wd-dialog__container ${props.customClass}`
})

const bodyClass = computed(() => {
  return `wd-dialog__body  ${dialogState.type === 'prompt' ? 'is-prompt' : ''}`
})

const messageOptionKey = getDialogDefaultOptionKey(props.selector)
const messageOption = inject(messageOptionKey, ref<DialogOptionsWithCallBack>(defaultOptions)) // message选项

const inputVal = ref<string | number>('') // 输入框当前值

const dialogState = reactive<DialogOptionsWithCallBack>({
  msg: '', // 消息内容
  show: false, // 是否显示弹框
  title: '', // 标题
  closeOnClickModal: false, // 是否支持点击蒙层关闭
  type: 'alert', // 弹框类型
  inputProps: {
    type: 'text',
    modelValue: ''
  }, // 输入框属性
  inputError: '', // 输入框错误提示文案
  showErr: false, // 是否显示错误提示
  zIndex: 99, // 弹窗层级
  lazyRender: true, // 弹层内容懒渲染
  headerImage: '', // 顶部图片
  showClose: false, // 是否显示关闭按钮
  actionLayout: 'horizontal', // 按钮排列方式
  theme: 'button' // 弹窗按钮风格
})

/**
 * 获取确认按钮文本
 * 从 confirmButtonProps 获取（快捷属性已在 index.ts 中合并）
 */
function getConfirmText(): string {
  const { confirmButtonProps } = dialogState
  if (isString(confirmButtonProps)) {
    return confirmButtonProps
  }
  if (isDef(confirmButtonProps) && isObj(confirmButtonProps) && confirmButtonProps.text) {
    return confirmButtonProps.text as string
  }
  return translate('confirm')
}

/**
 * 获取取消按钮文本
 * 从 cancelButtonProps 获取（快捷属性已在 index.ts 中合并）
 */
function getCancelText(): string {
  const { cancelButtonProps } = dialogState
  if (isString(cancelButtonProps)) {
    return cancelButtonProps
  }
  if (isDef(cancelButtonProps) && isObj(cancelButtonProps) && cancelButtonProps.text) {
    return cancelButtonProps.text as string
  }
  return translate('cancel')
}

/**
 * 是否显示取消按钮
 * cancelButtonProps 为 null 时隐藏，有值时显示（快捷属性已在 index.ts 中合并）
 */
const showCancelButton = computed(() => {
  return isDef(dialogState.cancelButtonProps)
})

/**
 * 是否显示确认按钮
 * confirmButtonProps 为 null 时隐藏，其他情况显示
 */
const showConfirmButton = computed(() => {
  return isDef(dialogState.confirmButtonProps)
})

/**
 * 输入框属性（排除 modelValue，避免覆盖 v-model）
 */
const inputPropsWithoutModelValue = computed(() => {
  if (!dialogState.inputProps) return {}
  const { modelValue, ...rest } = dialogState.inputProps
  return rest
})

/**
 * 文本域属性（排除 modelValue，避免覆盖 v-model）
 */
const textareaPropsWithoutModelValue = computed(() => {
  if (!dialogState.textareaProps) return {}
  const { modelValue, ...rest } = dialogState.textareaProps
  return rest
})

/**
 * 自定义 actions 按钮列表（当 theme 为 text 时强制 variant 为 text）
 */
const customActions = computed(() => {
  if (!dialogState.actions || !dialogState.actions.length) return []
  return dialogState.actions.map((action) => {
    if (dialogState.theme === 'text') {
      return { ...action, variant: 'text' as ButtonVariant }
    }
    return action
  })
})

/**
 * 从按钮配置中提取用于 v-bind 的 props（排除 openType 事件回调和 click）
 * @param btn 按钮配置
 */
function getActionButtonProps(btn: DialogAction) {
  const result: Record<string, any> = {}
  for (const key in btn) {
    // 排除 openType 事件回调、click 和 text
    if (!OPEN_TYPE_EVENT_KEYS.includes(key as keyof DialogButtonOpenTypeEvents) && key !== 'click' && key !== 'text') {
      result[key] = (btn as any)[key]
    }
  }
  return result
}

/**
 * 处理 actions 按钮的 openType 事件
 * @param btn 按钮配置
 * @param eventName 事件名
 * @param event 事件详情
 */
function handleOpenTypeEvent(btn: DialogAction, eventName: keyof DialogButtonOpenTypeEvents, event: any) {
  const handler = btn[eventName]
  if (isFunction(handler)) {
    handler(event)
  }
}

/**
 * 处理确认/取消按钮的 openType 事件
 * @param type 按钮类型
 * @param eventName 事件名
 * @param event 事件详情
 */
function handleButtonOpenTypeEvent(type: 'confirm' | 'cancel', eventName: keyof DialogButtonOpenTypeEvents, event: any) {
  const buttonProps = type === 'confirm' ? dialogState.confirmButtonProps : dialogState.cancelButtonProps
  if (isDef(buttonProps) && isObj(buttonProps)) {
    const handler = (buttonProps as DialogAction)[eventName]
    if (isFunction(handler)) {
      handler(event)
    }
  }
}

/**
 * 确认按钮属性
 */
const customConfirmProps = computed(() => {
  const defaultProps: Partial<ButtonProps> = {
    block: true
  }
  let buttonProps: Partial<ButtonProps> = { ...defaultProps }

  const { confirmButtonProps } = dialogState

  if (isDef(confirmButtonProps) && isObj(confirmButtonProps)) {
    // 从 confirmButtonProps 中排除 text 属性（text 单独处理为按钮文本）
    const { text, ...restProps } = confirmButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  // 当 theme 为 text 时，强制 variant 为 text，优先于用户传入的类型
  if (dialogState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} wd-dialog__actions-btn wd-dialog__actions-btn--confirm`
  return buttonProps
})

/**
 * 取消按钮属性
 */
const customCancelProps = computed(() => {
  const defaultProps: Partial<ButtonProps> = {
    block: true,
    type: 'info',
    variant: 'plain'
  }
  let buttonProps: Partial<ButtonProps> = { ...defaultProps }

  const { cancelButtonProps } = dialogState

  if (isDef(cancelButtonProps) && isObj(cancelButtonProps)) {
    // 从 cancelButtonProps 中排除 text 属性（text 单独处理为按钮文本）
    const { text, ...restProps } = cancelButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  // 当 theme 为 text 时，强制 variant 为 text，优先于用户传入的类型
  if (dialogState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} wd-dialog__actions-btn`
  return buttonProps
})

// 监听options变化展示
watch(
  () => messageOption.value,
  (newVal: DialogOptionsWithCallBack) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => dialogState.show,
  (newValue) => {
    resetErr(!!newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 点击操作
 * @param action
 */
function toggleModal(action: 'confirm' | 'cancel' | 'modal' | 'close') {
  if (action === 'modal' && !dialogState.closeOnClickModal) {
    return
  }
  if (dialogState.type === 'prompt' && action === 'confirm' && !validate()) {
    return
  }
  switch (action) {
    case 'confirm':
      if (dialogState.beforeConfirm) {
        callInterceptor(dialogState.beforeConfirm as DialogBeforeConfirm, {
          args: [inputVal.value],
          done: () =>
            handleConfirm({
              action: action,
              value: inputVal.value
            })
        })
      } else {
        handleConfirm({
          action: action,
          value: inputVal.value
        })
      }
      break
    case 'cancel':
      handleCancel({
        action: action
      })
      break
    case 'modal':
    case 'close':
      handleCancel({
        action: action
      })
      break
  }
}

/**
 * @description 处理自定义动作按钮点击
 * @param action 按钮配置
 * @param index 索引
 */
function handleAction(action: any, index: number) {
  if (action.disabled || action.loading) return

  // 如果提供了点击回调
  if (isFunction(action.click)) {
    action.click()
  }

  // 默认关闭弹窗，除非显式指定不关闭（暂未支持 preventClose 属性，默认关闭）
  // 也可以扩展：如果 click 返回 false，则不关闭
  handleConfirm({
    action: 'confirm', // 或者新增 'action' 类型？但 Types 里 action 是必须的且枚举。
    // 为了兼容，这里仍返回 confirm 或者是 context？
    // 稍微 hack 一下，actions 场景下通常用户自己在 click 里处理了业务，这里主要是利用 confirm 回调来关闭
    value: inputVal.value
  })
}

/**
 * 确认回调
 * @param result
 */
function handleConfirm(result: DialogResult) {
  dialogState.show = false
  if (isFunction(dialogState.success)) {
    dialogState.success(result)
  }
}

/**
 * 取消回调
 * @param result
 */
function handleCancel(result: DialogResult) {
  dialogState.show = false
  if (isFunction(dialogState.fail)) {
    dialogState.fail(result)
  }
}

/**
 * 如果存在校验规则行为，则进行判断校验是否通过规则。默认不存在校验直接铜鼓。
 */
function validate() {
  if (dialogState.inputPattern && !dialogState.inputPattern.test(String(inputVal.value))) {
    dialogState.showErr = true
    return false
  }
  if (isFunction(dialogState.inputValidate)) {
    const validateResult = dialogState.inputValidate(inputVal.value!)
    if (!validateResult) {
      dialogState.showErr = true
      return false
    }
  }
  dialogState.showErr = false
  return true
}

/**
 * @description show关闭时，销毁错误提示
 * @param val
 */
function resetErr(val: boolean) {
  if (val === false) {
    dialogState.showErr = false
  }
}

watch(
  () => inputVal.value,
  (val) => {
    if (val === '') {
      dialogState.showErr = false
    }
  }
)

/**
 * 重置message选项值
 * @param option message选项值
 */
function reset(option: DialogOptionsWithCallBack) {
  if (option) {
    dialogState.title = isDef(option.title) ? option.title : ''
    dialogState.show = option.show
    dialogState.closeOnClickModal = option.closeOnClickModal
    dialogState.msg = option.msg
    dialogState.type = option.type
    dialogState.inputProps = option.inputProps
    dialogState.textareaProps = option.textareaProps
    // 初始化 inputVal，优先级：inputValue > textareaProps.modelValue > inputProps.modelValue
    if (isDef(option.inputValue)) {
      inputVal.value = option.inputValue!
    } else if (option.textareaProps && isDef(option.textareaProps.modelValue)) {
      inputVal.value = option.textareaProps.modelValue!
    } else if (option.inputProps && isDef(option.inputProps.modelValue)) {
      inputVal.value = option.inputProps.modelValue!
    } else {
      inputVal.value = ''
    }

    dialogState.inputPattern = option.inputPattern!
    dialogState.inputValidate = option.inputValidate
    dialogState.success = option.success
    dialogState.fail = option.fail
    dialogState.beforeConfirm = option.beforeConfirm
    dialogState.inputError = option.inputError
    dialogState.showErr = option.showErr
    dialogState.zIndex = option.zIndex
    dialogState.lazyRender = option.lazyRender
    // 按钮配置（快捷属性已在 index.ts 中合并）
    dialogState.confirmButtonProps = option.confirmButtonProps
    dialogState.cancelButtonProps = option.cancelButtonProps
    dialogState.headerImage = option.headerImage
    // 图标配置（快捷属性已在 index.ts 中合并到 iconProps）
    // 处理内置图标类型映射
    const iconName = option.iconProps?.name || option.icon
    if (iconName && iconName in DIALOG_BUILTIN_ICON_MAP) {
      const builtinIcon = DIALOG_BUILTIN_ICON_MAP[iconName as DialogBuiltinIconType]
      dialogState.iconProps = { ...option.iconProps, name: builtinIcon }
      iconType.value = iconName // 记录内置类型用于添加 class
    } else {
      dialogState.iconProps = option.iconProps
      iconType.value = '' // 非内置类型，使用默认样式
    }
    dialogState.showClose = option.showClose
    dialogState.actionLayout = option.actionLayout
    dialogState.theme = option.theme
    // 自定义操作按钮
    dialogState.actions = option.actions
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
