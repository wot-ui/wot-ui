<template>
  <page-wraper>
    <view class="page-video-preview">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa')">
          <wd-button @click="open">{{ $t('dian-ji-yu-lan-shi-pin') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('duo-shi-li-tiao-yong')">
          <view class="page-video-preview__button-row">
            <wd-button @click="open">{{ $t('mo-ren-shi-li') }}</wd-button>
            <wd-button @click="openSub">{{ $t('zhi-ding-shi-li') }}</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('quan-ping-yu-lan')">
          <wd-button @click="openFullScreen">{{ $t('dian-ji-yu-lan-quan-ping-shi-pin') }}</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('zu-jian-shi-li-tiao-yong')">
          <wd-button @click="openByRef">{{ $t('tong-guo-ref-da-kai') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <wd-video-preview ref="videoPreviewRef" />
      <wd-video-preview selector="sub-preview" />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { type PreviewVideo, type VideoPreviewInstance, type VideoPreviewOptions } from '@/uni_modules/wot-ui/components/wd-video-preview/types'
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'
import { computed, ref } from 'vue'
import blackMao from '../img/black_mao.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { previewVideo } = useVideoPreview()
const { previewVideo: previewSubVideo } = useVideoPreview('sub-preview')

const videoPreviewRef = ref<VideoPreviewInstance>()

const video = computed<PreviewVideo>(() => ({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: t('shi-pin-yu-lan')
}))

const subVideo = computed<PreviewVideo>(() => ({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: t('zhi-ding-shi-li-yu-lan')
}))

const fullScreenVideo = computed<VideoPreviewOptions>(() => ({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: t('quan-ping-yu-lan'),
  fullScreen: true
}))

function open() {
  previewVideo(video.value)
}

function openSub() {
  previewSubVideo(subVideo.value)
}

function openFullScreen() {
  previewVideo(fullScreenVideo.value)
}

function openByRef() {
  videoPreviewRef.value?.open(video.value)
}
</script>

<style lang="scss" scoped>
.page-video-preview {
  &__button-row {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-loose;
  }
}
</style>
