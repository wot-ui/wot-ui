<template>
  <page-wraper>
    <view class="page-signature">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('ji-chu-yong-fa-0')">
          <wd-signature :export-scale="2" background-color="#ffffff" @confirm="confirm" @clear="clear" />
        </demo-group-item>
        <demo-group-item :title="$t('li-shi-ji-lu')">
          <wd-signature enable-history background-color="#f5f5f5" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item :title="$t('bi-feng-mo-shi-ji-chu')">
          <wd-signature pressure :height="300" />
        </demo-group-item>
        <demo-group-item :title="$t('bi-feng-mo-shi-zi-ding-yi')">
          <wd-signature pressure :height="300" :min-width="1" :max-width="6" :min-speed="1.5" background-color="#f5f5f5" />
          <view class="tip-text">{{ $t('kuai-su-shu-xie-chan-sheng-xi-xian-tiao-man-su-shu-xie-chan-sheng-cu-xian-tiao') }}</view>
        </demo-group-item>
        <demo-group-item :title="$t('bi-feng-mo-shi-li-shi-ji-lu')">
          <wd-signature pressure enable-history :height="300" :min-width="1" :max-width="6" background-color="#f5f5f5" />
          <view class="tip-text">{{ $t('jie-he-li-shi-ji-lu-zhi-chi-bi-feng-xiao-guo-de-che-xiao-yu-hui-fu') }}</view>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('zi-ding-yi-an-niu')">
          <wd-signature :disabled="disabled" enable-history :step="3">
            <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
              <wd-button v-if="disabled" block @click="changeDisabled">{{ $t('kai-shi-qian-ming') }}</wd-button>
              <block v-if="!disabled">
                <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">{{ $t('che-hui') }}</wd-button>
                <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">{{ $t('hui-fu') }}</wd-button>
                <wd-button size="small" plain @click="clear">{{ $t('qing-chu') }}</wd-button>
                <wd-button size="small" @click="confirm">{{ $t('que-ding') }}</wd-button>
              </block>
            </template>
          </wd-signature>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-hua-bi')">
          <wd-signature pen-color="#0083ff" :line-width="4" />
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item :title="$t('dan-chuang-zhong-shi-yong')">
          <wd-button type="primary" @click="showPopup = true">{{ $t('da-kai-qian-ming-ban') }}</wd-button>

          <wd-popup
            v-model="showPopup"
            closable
            safe-area-inset-bottom
            position="bottom"
            custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
            @after-enter="signatureRef?.init()"
          >
            <wd-signature ref="signatureRef" :height="300" enable-history pressure background-color="#f5f5f5" @confirm="handlePopupConfirm" />
          </wd-popup>
        </demo-group-item>
        <demo-group-item :title="$t('heng-ping-qian-ming')">
          <wd-button type="primary" @click="toSignatureLandscape">{{ $t('shi-yong-heng-ping-qian-ming') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-ui/components/wd-signature/types'
import { ref } from 'vue'

const img = ref<Partial<SignatureResult>>({})

const disabled = ref(true)

function confirm(result: SignatureResult) {
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function clear() {
  img.value = {}
}

function changeDisabled() {
  disabled.value = false
}

const showPopup = ref(false)
const signatureRef = ref<SignatureInstance>()

function handlePopupConfirm(result: SignatureResult) {
  showPopup.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function toSignatureLandscape() {
  uni.navigateTo({
    url: '/subPages/signature/Landscape'
  })
}
</script>

<style lang="scss" scoped>
.page-signature {
  .tip-text {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
