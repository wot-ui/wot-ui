<template>
  <page-wraper>
    <view class="page-skeleton">
      <demo-group title="组件类型">
        <demo-group-item v-for="item in themeList" :key="item.value" :title="item.title">
          <wd-skeleton :theme="item.value" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('gong-ge-gu-jia-ping')">
          <wd-skeleton :row-col="grid" />
        </demo-group-item>
        <demo-group-item :title="$t('dan-yuan-ge-gu-jia-ping')">
          <view class="skeleton-row">
            <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
            <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
          </view>
          <view class="skeleton-row skeleton-row--top">
            <wd-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
            <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('tu-pian-zu-he-gu-jia-ping')">
          <wd-skeleton :row-col="imageGroup" />
          <wd-skeleton :custom-style="{ marginTop: '20px' }" :row-col="imageGroup" />
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item :title="$t('jian-bian-jia-zai-dong-hua')">
          <wd-skeleton animation="gradient" theme="paragraph" />
        </demo-group-item>
        <demo-group-item :title="$t('shan-shuo-jia-zai-dong-hua')">
          <view class="skeleton-row">
            <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
            <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('cha-cao-nei-rong')">
          <view class="switch-label">{{ $t('qie-huan-xian-shi') }}</view>
          <wd-switch v-model="showContent" />
          <view class="switch-gap"></view>
          <wd-skeleton :row-col="grid" :loading="showContent">
            <wd-grid>
              <wd-grid-item icon-size="32px" icon="camera" :text="$t('wen-zi-10')" />
              <wd-grid-item icon-size="32px" icon="camera" :text="$t('wen-zi-10')" />
              <wd-grid-item icon-size="32px" icon="camera" :text="$t('wen-zi-10')" />
              <wd-grid-item icon-size="32px" icon="camera" :text="$t('wen-zi-10')" />
              <wd-grid-item icon-size="32px" icon="camera" :text="$t('wen-zi-10')" />
            </wd-grid>
          </wd-skeleton>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { SkeletonRowCol, SkeletonProps } from '../../uni_modules/wot-ui/components/wd-skeleton/types'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const themeList = [
  { title: t('tou-xiang-gu-jia-ping'), value: 'avatar' },
  { title: t('tu-pian-gu-jia-ping'), value: 'image' },
  { title: t('wen-ben-gu-jia-ping'), value: 'text' },
  { title: t('duan-la-gu-jia-ping'), value: 'paragraph' }
] as Array<{ title: string; value: SkeletonProps['theme'] }>
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' }
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' }
  ]
] as SkeletonRowCol[]
const imageGroup = [{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]] as SkeletonRowCol[]

const showContent = ref(true)
</script>
<style lang="scss" scoped>
.page-skeleton {
  .skeleton-row {
    display: flex;

    &--top {
      margin-top: 20px;
    }
  }

  .switch-label {
    margin-bottom: 10px;
  }

  .switch-gap {
    height: 20px;
  }
}
</style>
