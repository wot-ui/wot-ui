<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-button @click="open">点击预览视频</wd-button>
    </demo-block>

    <wd-video-preview ref="videoPreview1" />
  </page-wraper>
</template>

<script lang="ts" setup>
import { type PreviewVideo } from '@/uni_modules/wot-design-uni/components/wd-video-preview/types'
import { useVideoPreview } from '@/uni_modules/wot-design-uni/components/wd-video-preview'
import blackMao from '../img/black_mao.png'

const { previewVideo } = useVideoPreview()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: blackMao,
  title: '视频预览'
}

function open() {
  previewVideo(video)
}
</script>

<style lang="scss" scoped></style>
