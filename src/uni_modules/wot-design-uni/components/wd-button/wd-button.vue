<template>
  <button
    :id="buttonId"
    :hover-class="`${disabled || loading ? '' : 'wd-button--active'}`"
    :style="customStyle"
    :class="[
      'wd-button',
      'is-' + type,
      'is-' + size,
      isIcon ? 'is-icon' : '',
      round ? 'is-round' : '',
      hairline ? 'is-hairline' : '',
      variant !== 'base' ? 'is-' + variant : '',
      disabled ? 'is-disabled' : '',
      block ? 'is-block' : '',
      loading ? 'is-loading' : '',
      customClass
    ]"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :open-type="openTypeValue"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    :session-from="sessionFrom"
    :lang="lang"
    :hover-stop-propagation="hoverStopPropagation"
    :scope="scope"
    @click="handleClick"
    @getAuthorize="handleGetAuthorize"
    @getuserinfo="handleGetUserInfo"
    @contact="handleContact"
    @getphonenumber="handleGetPhoneNumber"
    @getrealtimephonenumber="handleGetRealtimePhoneNumber"
    @error="handleError"
    @launchapp="handleLaunchApp"
    @opensetting="handleOpenSetting"
    @chooseavatar="handleChooseAvatar"
    @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
  >
    <view class="wd-button__content">
      <wd-loading v-if="loading" v-bind="customLoadingProps"></wd-loading>
      <wd-icon v-else-if="icon" custom-class="wd-button__icon" :name="icon" :classPrefix="classPrefix"></wd-icon>
      <view class="wd-button__text" v-if="$slots.default || text">
        <slot>{{ text }}</slot>
      </view>
    </view>
  </button>
</template>

<script lang="ts">
export default {
  name: 'wd-button',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, useSlots } from 'vue'
import { buttonProps } from './types'
import { isDef, omitBy, isUndefined } from '../common/util'
import { type LoadingProps } from '../wd-loading/types'

const slots = useSlots()

const props = defineProps(buttonProps)
const emit = defineEmits<{
  (e: 'click', event: any): void
  (e: 'getuserinfo', event: any): void
  (e: 'contact', event: any): void
  (e: 'getphonenumber', event: any): void
  (e: 'getrealtimephonenumber', event: any): void
  (e: 'error', event: any): void
  (e: 'launchapp', event: any): void
  (e: 'opensetting', event: any): void
  (e: 'chooseavatar', event: any): void
  (e: 'agreeprivacyauthorization', event: any): void
}>()

/**
 * 加载配置项
 */
const customLoadingProps = computed(() => {
  const loadingProps: Partial<LoadingProps> = isDef(props.loadingProps) ? omitBy(props.loadingProps, isUndefined) : {}
  loadingProps.customSpinnerClass = `${isDef(loadingProps.customSpinnerClass) ? loadingProps.customSpinnerClass : ''} wd-button__loading`
  loadingProps.inheritColor = isDef(loadingProps.inheritColor) ? loadingProps.inheritColor : true
  return loadingProps
})

/**
 * 开放能力类型
 */
const openTypeValue = computed(() => {
  return props.disabled || props.loading ? undefined : props.openType
})

/**
 * 是否仅展示图标
 */
const isIcon = computed(() => {
  return !slots.default && !props.text && props.icon
})

/**
 * 处理点击事件
 * @param event
 */
function handleClick(event: any) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

/**
 * 支付宝小程序授权
 * @param event
 */
function handleGetAuthorize(event: any) {
  if (props.scope === 'phoneNumber') {
    handleGetPhoneNumber(event)
  } else if (props.scope === 'userInfo') {
    handleGetUserInfo(event)
  }
}

/**
 * 获取用户信息回调
 * @param event
 */
function handleGetUserInfo(event: any) {
  emit('getuserinfo', event)
}

/**
 * 客服会话回调
 * @param event
 */
function handleContact(event: any) {
  emit('contact', event)
}

/**
 * 获取手机号回调
 * @param event
 */
function handleGetPhoneNumber(event: any) {
  emit('getphonenumber', event)
}

/**
 * 获取实时手机号回调
 * @param event
 */
function handleGetRealtimePhoneNumber(event: any) {
  emit('getrealtimephonenumber', event)
}

/**
 * 当使用开放能力发生错误时回调
 * @param event
 */
function handleError(event: any) {
  emit('error', event)
}

/**
 * 打开 APP 成功的回调
 * @param event
 */
function handleLaunchApp(event: any) {
  emit('launchapp', event)
}

/**
 * 在打开授权设置页后回调
 * @param event
 */
function handleOpenSetting(event: any) {
  emit('opensetting', event)
}

/**
 * 获取头像回调
 * @param event
 */
function handleChooseAvatar(event: any) {
  emit('chooseavatar', event)
}

/**
 * 隐私协议授权回调
 * @param event
 */
function handleAgreePrivacyAuthorization(event: any) {
  emit('agreeprivacyauthorization', event)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
