<template>
  <page-wraper>
    <view class="page-qr-code">
      <demo-group :title="$t('qrcode-ji-ben-fen-zu')">
        <demo-group-item :title="$t('qrcode-ji-ben')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qrcode-zi-ding-yi-chi-cun')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" :size="280" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qrcode-zi-ding-yi-yan-se')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" color-dark="#3c9cff" color-light="#f2f7ff" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('qrcode-yang-shi-fen-zu')">
        <demo-group-item :title="$t('qrcode-dai-logo')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" :logo="logoUrl" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qrcode-logo-yang-shi')">
          <view class="page-qr-code__center">
            <wd-qr-code
              text="https://wot-ui.cn"
              :logo="logoUrl"
              :logo-width="52"
              :logo-height="52"
              :logo-radius="12"
              logo-background-color="#ffffff"
              logo-border-color="#ffffff"
              :logo-border-width="4"
            />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qrcode-ma-dian-yang-shi')">
          <view class="page-qr-code__style-grid">
            <view class="page-qr-code__style-item">
              <wd-qr-code text="https://wot-ui.cn" dot-type="dots" :dot-scale="0.9" :size="140" />
              <text class="page-qr-code__style-label">{{ $t('qrcode-yuan-dian') }}</text>
            </view>
            <view class="page-qr-code__style-item">
              <wd-qr-code text="https://wot-ui.cn" dot-type="rounded" :size="140" />
              <text class="page-qr-code__style-label">{{ $t('qrcode-yuan-jiao') }}</text>
            </view>
            <view class="page-qr-code__style-item">
              <wd-qr-code text="https://wot-ui.cn" dot-type="liquid" :size="140" />
              <text class="page-qr-code__style-label">{{ $t('qrcode-ye-hua') }}</text>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('qrcode-jin-jie-fen-zu')">
        <demo-group-item :title="$t('qrcode-jian-bian')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" enable-gradient :gradient-direction="45" :gradient-colors="['#4f46e5', '#06b6d4', '#10b981']" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qrcode-bei-jing-tu-pian')">
          <view class="page-qr-code__center">
            <wd-qr-code text="https://wot-ui.cn" :background-image="logoUrl" color-dark="#22324a" color-light="rgba(255, 255, 255, 0.18)" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('qrcode-fang-fa-fen-zu')">
        <demo-group-item :title="$t('qrcode-dao-chu')">
          <view class="page-qr-code__center">
            <wd-qr-code ref="qrCodeRef" text="https://wot-ui.cn" :logo="logoUrl" />
          </view>

          <view class="page-qr-code__actions">
            <wd-button size="small" @click="handleExport">
              {{ $t('qrcode-dao-chu-an-niu') }}
            </wd-button>
          </view>

          <view v-if="imgSrc" class="page-qr-code__result">
            <text class="page-qr-code__result-title">{{ $t('qrcode-dao-chu-jie-guo') }}</text>
            <image :src="imgSrc" mode="aspectFit" class="page-qr-code__result-image" />
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { QrCodeInstance } from '@/uni_modules/wot-ui/components/wd-qr-code/types'

const { t } = useI18n()

const qrCodeRef = ref<QrCodeInstance>()
const imgSrc = ref('')

const logoUrl = 'https://img.yzcdn.cn/vant/cat.jpeg'

async function handleExport() {
  try {
    imgSrc.value = await qrCodeRef.value!.exportImage()
    uni.showToast({
      title: t('dao-chu-cheng-gong'),
      icon: 'success'
    })
  } catch (error) {
    void error
    uni.showToast({
      title: t('dao-chu-shi-bai'),
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.page-qr-code {
  &__center {
    display: flex;
    justify-content: center;
  }

  &__style-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $spacing-loose;

    @media screen and (min-width: 560px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__style-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacing-tight;
    padding: $spacing-loose;
    background: $filled-oppo;
    border-radius: $radius-large;
  }

  &__style-label {
    color: $text-secondary;
    font-size: $typography-body-size-main;
    line-height: $typography-body-line-height-size-main;
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: $spacing-loose;
  }

  &__result {
    margin-top: $spacing-loose;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacing-tight;
  }

  &__result-title {
    color: $text-secondary;
    font-size: $typography-body-size-main;
  }

  &__result-image {
    width: 200px;
    height: 200px;
    display: block;
    border-radius: $radius-large;
    overflow: hidden;
  }
}
</style>
