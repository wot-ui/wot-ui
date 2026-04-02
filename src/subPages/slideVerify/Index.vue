<template>
  <page-wraper>
    <view class="page-slide-verify">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('ji-chu-yong-fa')">
          <wd-slide-verify @success="handleSuccess" @fail="handleFail" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item :title="$t('jin-yong-zhuang-tai')">
          <wd-slide-verify disabled />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('zi-ding-yi-wen-an')">
          <wd-slide-verify :text="$t('qing-tuo-dong-hua-kuai')" :success-text="$t('yan-zheng-cheng-gong')" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-yan-se')">
          <wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-tu-biao')">
          <wd-slide-verify icon="arrow-right" success-icon="thumb-up-fill" />
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item :title="$t('zi-ding-yi-rong-cuo-fan-wei')">
          <wd-slide-verify :tolerance="20" />
        </demo-group-item>
        <demo-group-item :title="$t('zhong-zhi-fang-fa')">
          <wd-slide-verify ref="slideVerifyRef" @success="handleSuccess" @fail="handleFail" />
          <wd-button class="reset-button" type="primary" @click="handleReset">{{ $t('zhong-zhi') }}</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('cha-cao-yong-fa')">
          <wd-slide-verify>
            <template #text>
              <text>Slide right to complete verification</text>
            </template>
            <template #success-text>
              <text>{{ $t('yan-zheng-tong-guo') }}</text>
            </template>
            <template #icon>
              <view>ICON</view>
            </template>
            <template #success-icon>
              <view class="success-icon-text">OK</view>
            </template>
          </wd-slide-verify>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const { t } = useI18n()

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleSuccess() {
  toast.success(t('yan-zheng-cheng-gong'))
}

function handleFail() {
  toast.error(t('yan-zheng-shi-bai-qing-chong-shi'))
}

function handleReset() {
  slideVerifyRef.value?.reset()
  toast.info(t('yi-zhong-zhi'))
}
</script>

<style lang="scss" scoped>
.page-slide-verify {
  .reset-button {
    margin-top: 20px;
  }

  .success-icon-text {
    color: red;
  }
}
</style>
