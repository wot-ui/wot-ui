<template>
  <page-wraper>
    <view class="page-bar-code">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('bar-code-chang-jian-ge-shi')">
          <view v-for="item in commonFormatItems" :key="item.label" class="page-bar-code__item">
            <view class="page-bar-code__label">{{ item.label }}</view>
            <wd-bar-code :value="item.value" :format="item.format" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('bar-code-wen-zi-wei-zhi')">
          <view class="page-bar-code__item">
            <view class="page-bar-code__label">{{ $t('bar-code-wen-zi-zai-shang-fang') }}</view>
            <wd-bar-code value="1234567890" text-position="top" />
          </view>
          <view class="page-bar-code__item">
            <view class="page-bar-code__label">{{ $t('bar-code-wen-zi-zai-xia-fang') }}</view>
            <wd-bar-code value="1234567890" text-position="bottom" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('bar-code-wen-zi-jian-ju')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" :text-margin="10" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('bar-code-yin-cang-wen-zi')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" :display-value="false" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('bar-code-zi-ding-yi-yan-se')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" line-color="#4D80F0" background="#E0EAFF" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('bar-code-zi-ding-yi-chi-cun')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" :width="4" :height="80" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('bar-code-zi-ti-yang-shi')">
          <view class="page-bar-code__item">
            <wd-bar-code value="1234567890" font-options="bold italic" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('bar-code-zhi-chi-ge-shi')">
          <view v-for="item in allFormatItems" :key="item.label" class="page-bar-code__item">
            <view class="page-bar-code__label">{{ item.label }}</view>
            <wd-bar-code :value="item.value" :format="item.format" />
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { BarCodeFormat } from '@/uni_modules/wot-ui/components/wd-bar-code/types'

type FormatItem = {
  label: string
  value: string
  format: BarCodeFormat
}

const commonFormatItems = [
  { label: 'EAN13', value: '690123456789', format: 'EAN13' },
  { label: 'CODE39', value: 'CODE39', format: 'CODE39' },
  { label: 'ITF14', value: '1234567890123', format: 'ITF14' }
] as const satisfies readonly FormatItem[]

const allFormatItems = [
  { label: 'CODE128', value: 'CODE128', format: 'CODE128' },
  { label: 'CODE128A', value: 'CODE128A', format: 'CODE128A' },
  { label: 'CODE128B', value: 'CODE128B', format: 'CODE128B' },
  { label: 'CODE128C', value: '123456', format: 'CODE128C' },
  { label: 'EAN13', value: '690123456789', format: 'EAN13' },
  { label: 'EAN8', value: '1234567', format: 'EAN8' },
  { label: 'UPC', value: '12345678901', format: 'UPC' },
  { label: 'UPCE', value: '123456', format: 'UPCE' },
  { label: 'CODE39', value: 'CODE39', format: 'CODE39' },
  { label: 'ITF14', value: '1234567890123', format: 'ITF14' },
  { label: 'MSI', value: '123456', format: 'MSI' },
  { label: 'MSI10', value: '123456', format: 'MSI10' },
  { label: 'MSI11', value: '123456', format: 'MSI11' },
  { label: 'MSI1010', value: '123456', format: 'MSI1010' },
  { label: 'MSI1110', value: '123456', format: 'MSI1110' },
  { label: 'pharmacode', value: '1234', format: 'pharmacode' },
  { label: 'codabar', value: 'A123456A', format: 'codabar' }
] as const satisfies readonly FormatItem[]
</script>

<style lang="scss" scoped>
.page-bar-code {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $spacing-extra-loose;
    padding: $padding-loose;
    background: $filled-oppo;
    border-radius: $radius-main;
  }

  &__label {
    margin-bottom: $spacing-tight;
    color: $text-secondary;
    font-size: $typography-body-size-main;
    line-height: $typography-body-line-height-size-main;
  }
}
</style>
