<template>
  <wd-popup
    transition="zoom-in"
    v-model="messageState.show"
    :close-on-click-modal="messageState.closeOnClickModal"
    :lazy-render="messageState.lazyRender"
    custom-class="wd-message-box"
    @click-modal="toggleModal('modal')"
    :z-index="messageState.zIndex"
    :duration="200"
    :root-portal="rootPortal"
  >
    <view :class="rootClass">
      <wd-icon v-if="messageState.showClose" custom-class="wd-message-box__close" name="close" @click="toggleModal('modal')"></wd-icon>
      <slot name="header" />
      <view :class="bodyClass">
        <slot name="image">
          <image v-if="messageState.headerImage" mode="widthFix" class="wd-message-box__img" :src="messageState.headerImage"></image>
        </slot>
        <slot name="title" :icon="messageState.icon" :title="messageState.title" :iconProps="messageState.iconProps">
          <view v-if="messageState.iconProps?.name || messageState.title" class="wd-message-box__title">
            <wd-icon
              v-if="messageState.iconProps?.name"
              :custom-class="`wd-message-box__icon ${iconTypeClass}`"
              :name="messageState.iconProps.name"
              :color="messageState.iconProps.color"
              :size="messageState.iconProps.size"
            ></wd-icon>
            {{ messageState.title }}
          </view>
        </slot>
        <view class="wd-message-box__content" v-if="messageState.type === 'prompt' || !!messageState.msg || $slots.default">
          <slot
            :msg="messageState.msg"
            :type="messageState.type"
            :inputValue="inputVal"
            :showErr="messageState.showErr"
            :inputError="messageState.inputError"
          >
            <block v-if="messageState.type === 'prompt'">
              <wd-textarea
                v-if="messageState.textareaProps"
                v-model="inputVal"
                custom-class="wd-message-box__input"
                v-bind="textareaPropsWithoutModelValue"
              />
              <wd-input v-else v-model="inputVal" custom-class="wd-message-box__input" v-bind="inputPropsWithoutModelValue" />
              <view v-if="messageState.showErr" class="wd-message-box__input-error">
                {{ messageState.inputError || translate('inputNoValidate') }}
              </view>
            </block>
            <text v-else class="wd-message-box__content-text">{{ messageState.msg }}</text>
          </slot>
        </view>
      </view>
      <slot name="actions" :confirm="() => toggleModal('confirm')" :cancel="() => toggleModal('cancel')" :close="() => toggleModal('modal')">
        <view
          :class="`wd-message-box__actions ${messageState.actionLayout === 'vertical' ? 'wd-message-box__actions--vertical' : ''} ${
            messageState.actionLayout === 'vertical' || showCancelButton || (messageState.actions && messageState.actions.length > 1)
              ? 'wd-message-box__flex'
              : 'wd-message-box__block'
          } ${messageState.theme === 'text' ? 'is-text' : ''}`"
        >
          <block v-if="customActions && customActions.length">
            <wd-button
              v-for="(btn, index) in customActions"
              :key="index"
              v-bind="btn"
              @click="handleAction(btn, index)"
              custom-class="wd-message-box__actions-btn"
            >
              {{ btn.text }}
            </wd-button>
          </block>
          <block v-else>
            <wd-button v-bind="customCancelProps" v-if="showCancelButton" @click="toggleModal('cancel')">
              {{ getCancelText() }}
            </wd-button>
            <wd-button v-bind="customConfirmProps" v-if="showConfirmButton" @click="toggleModal('confirm')">
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
  name: 'wd-message-box',
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
import { messageBoxProps, type MessageOptionsWithCallBack, type MessageResult, MESSAGE_BUILTIN_ICON_MAP, type MessageBuiltinIconType } from './types'
import { defaultOptions, getMessageDefaultOptionKey } from '.'
import { deepAssign, isDef, isFunction, isObj, isString, isUndefined, omitBy } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import type { ButtonProps, ButtonVariant } from '../wd-button/types'

const props = defineProps(messageBoxProps)

const { translate } = useTranslate('message-box')

// 当前图标的内置类型（用于添加 class）
const iconType = ref<string>('')

// 图标类型对应的 class
const iconTypeClass = computed(() => {
  return iconType.value ? `is-${iconType.value}` : ''
})

const rootClass = computed(() => {
  return `wd-message-box__container ${props.customClass}`
})

const bodyClass = computed(() => {
  return `wd-message-box__body  ${messageState.type === 'prompt' ? 'is-prompt' : ''}`
})

const messageOptionKey = getMessageDefaultOptionKey(props.selector)
const messageOption = inject(messageOptionKey, ref<MessageOptionsWithCallBack>(defaultOptions)) // message选项

const inputVal = ref<string | number>('') // 输入框当前值

const messageState = reactive<MessageOptionsWithCallBack>({
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
  const { confirmButtonProps } = messageState
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
  const { cancelButtonProps } = messageState
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
  return isDef(messageState.cancelButtonProps)
})

/**
 * 是否显示确认按钮
 * confirmButtonProps 为 null 时隐藏，其他情况显示
 */
const showConfirmButton = computed(() => {
  return isDef(messageState.confirmButtonProps)
})

/**
 * 输入框属性（排除 modelValue，避免覆盖 v-model）
 */
const inputPropsWithoutModelValue = computed(() => {
  if (!messageState.inputProps) return {}
  const { modelValue, ...rest } = messageState.inputProps
  return rest
})

/**
 * 文本域属性（排除 modelValue，避免覆盖 v-model）
 */
const textareaPropsWithoutModelValue = computed(() => {
  if (!messageState.textareaProps) return {}
  const { modelValue, ...rest } = messageState.textareaProps
  return rest
})

/**
 * 自定义 actions 按钮列表（当 theme 为 text 时强制 variant 为 text）
 */
const customActions = computed(() => {
  if (!messageState.actions || !messageState.actions.length) return []
  return messageState.actions.map((action) => {
    if (messageState.theme === 'text') {
      return { ...action, variant: 'text' as ButtonVariant }
    }
    return action
  })
})

/**
 * 确认按钮属性
 */
const customConfirmProps = computed(() => {
  const defaultProps: Partial<ButtonProps> = {
    block: true
  }
  let buttonProps: Partial<ButtonProps> = { ...defaultProps }

  const { confirmButtonProps } = messageState

  if (isDef(confirmButtonProps) && isObj(confirmButtonProps)) {
    // 从 confirmButtonProps 中排除 text 属性（text 单独处理为按钮文本）
    const { text, ...restProps } = confirmButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  // 当 theme 为 text 时，强制 variant 为 text，优先于用户传入的类型
  if (messageState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} wd-message-box__actions-btn wd-message-box__actions-btn--confirm`
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

  const { cancelButtonProps } = messageState

  if (isDef(cancelButtonProps) && isObj(cancelButtonProps)) {
    // 从 cancelButtonProps 中排除 text 属性（text 单独处理为按钮文本）
    const { text, ...restProps } = cancelButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  // 当 theme 为 text 时，强制 variant 为 text，优先于用户传入的类型
  if (messageState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} wd-message-box__actions-btn`
  return buttonProps
})

// 监听options变化展示
watch(
  () => messageOption.value,
  (newVal: MessageOptionsWithCallBack) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => messageState.show,
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
function toggleModal(action: 'confirm' | 'cancel' | 'modal') {
  if (action === 'modal' && !messageState.closeOnClickModal) {
    return
  }
  if (messageState.type === 'prompt' && action === 'confirm' && !validate()) {
    return
  }
  switch (action) {
    case 'confirm':
      if (messageState.beforeConfirm) {
        messageState.beforeConfirm({
          resolve: (isPass) => {
            if (isPass) {
              handleConfirm({
                action: action,
                value: inputVal.value
              })
            }
          }
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
    default:
      handleCancel({
        action: 'modal'
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
function handleConfirm(result: MessageResult) {
  messageState.show = false
  if (isFunction(messageState.success)) {
    messageState.success(result)
  }
}

/**
 * 取消回调
 * @param result
 */
function handleCancel(result: MessageResult) {
  messageState.show = false
  if (isFunction(messageState.fail)) {
    messageState.fail(result)
  }
}

/**
 * 如果存在校验规则行为，则进行判断校验是否通过规则。默认不存在校验直接铜鼓。
 */
function validate() {
  if (messageState.inputPattern && !messageState.inputPattern.test(String(inputVal.value))) {
    messageState.showErr = true
    return false
  }
  if (isFunction(messageState.inputValidate)) {
    const validateResult = messageState.inputValidate(inputVal.value!)
    if (!validateResult) {
      messageState.showErr = true
      return false
    }
  }
  messageState.showErr = false
  return true
}

/**
 * @description show关闭时，销毁错误提示
 * @param val
 */
function resetErr(val: boolean) {
  if (val === false) {
    messageState.showErr = false
  }
}

watch(
  () => inputVal.value,
  (val) => {
    if (val === '') {
      messageState.showErr = false
    }
  }
)

/**
 * 重置message选项值
 * @param option message选项值
 */
function reset(option: MessageOptionsWithCallBack) {
  if (option) {
    messageState.title = isDef(option.title) ? option.title : ''
    messageState.show = option.show
    messageState.closeOnClickModal = option.closeOnClickModal
    messageState.msg = option.msg
    messageState.type = option.type
    messageState.inputProps = option.inputProps
    messageState.textareaProps = option.textareaProps
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

    messageState.inputPattern = option.inputPattern!
    messageState.inputValidate = option.inputValidate
    messageState.success = option.success
    messageState.fail = option.fail
    messageState.beforeConfirm = option.beforeConfirm
    messageState.inputError = option.inputError
    messageState.showErr = option.showErr
    messageState.zIndex = option.zIndex
    messageState.lazyRender = option.lazyRender
    // 按钮配置（快捷属性已在 index.ts 中合并）
    messageState.confirmButtonProps = option.confirmButtonProps
    messageState.cancelButtonProps = option.cancelButtonProps
    messageState.headerImage = option.headerImage
    // 图标配置（快捷属性已在 index.ts 中合并到 iconProps）
    // 处理内置图标类型映射
    const iconName = option.iconProps?.name || option.icon
    if (iconName && iconName in MESSAGE_BUILTIN_ICON_MAP) {
      const builtinIcon = MESSAGE_BUILTIN_ICON_MAP[iconName as MessageBuiltinIconType]
      messageState.iconProps = { ...option.iconProps, name: builtinIcon }
      iconType.value = iconName // 记录内置类型用于添加 class
    } else {
      messageState.iconProps = option.iconProps
      iconType.value = '' // 非内置类型，使用默认样式
    }
    messageState.showClose = option.showClose
    messageState.actionLayout = option.actionLayout
    messageState.theme = option.theme
    // 自定义操作按钮
    messageState.actions = option.actions
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
