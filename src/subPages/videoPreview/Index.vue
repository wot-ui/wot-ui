<template>
  <page-wraper>
    <view class="page-video-preview">
      <demo-group title="组件类型">
        <demo-group-item title="基本用法">
          <wd-button @click="open">点击预览视频</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item title="多实例调用">
          <view class="button-row">
            <wd-button @click="open">默认实例</wd-button>
            <wd-button @click="openSub">指定实例</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item title="组件实例调用">
          <wd-button @click="openByRef">通过 ref 打开</wd-button>
        </demo-group-item>
      </demo-group>

      <wd-video-preview ref="videoPreviewRef" />
      <wd-video-preview selector="sub-preview" />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { type PreviewVideo, type VideoPreviewInstance } from '@/uni_modules/wot-ui/components/wd-video-preview/types'
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'
import { ref } from 'vue'
import blackMao from '../img/black_mao.png'

const { previewVideo } = useVideoPreview()
const { previewVideo: previewSubVideo } = useVideoPreview('sub-preview')

const videoPreviewRef = ref<VideoPreviewInstance>()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: '视频预览'
}

const subVideo: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: '指定实例预览'
}

function open() {
  previewVideo(video)
}

function openSub() {
  previewSubVideo(subVideo)
}

function openByRef() {
  videoPreviewRef.value?.open(video)
}
</script>

<style lang="scss" scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
