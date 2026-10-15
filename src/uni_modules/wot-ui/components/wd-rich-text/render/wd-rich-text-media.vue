<template>
  <view :id="anchorId" class="wd-rich-text__media" :style="node.style" @tap.stop>
    <text v-if="failed" class="wd-rich-text__media-error">{{ node.alt }} ×</text>
    <video
      v-else-if="node.mediaType === 'video'"
      :id="mediaId"
      class="wd-rich-text__video"
      :style="node.fixedHeight ? 'height:100%' : ''"
      :src="source"
      :poster="node.poster"
      :loop="node.loop"
      :muted="node.muted"
      :controls="true"
      :autoplay="false"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @timeupdate="handleTimeUpdate"
      @error="handleError"
    />
    <button v-else class="wd-rich-text__audio-control" @tap.stop="toggleAudio">{{ playing ? 'Ⅱ' : '▶' }} {{ node.alt }}</button>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'
import { measureAnchor } from '../anchor'
import { richTextContextKey, type RichTextRenderNode } from '../types'

defineOptions({
  name: 'wd-rich-text-media',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})
const props = defineProps({ node: { type: Object as PropType<RichTextRenderNode>, required: true }, anchorId: String })
const instance = getCurrentInstance()
const mediaId = `wd-rich-text-media-${instance?.uid}`
const context = inject(richTextContextKey)
const sourceIndex = ref(0)
const source = computed(() => props.node.sources?.[sourceIndex.value] || '')
const playing = ref(false)
const failed = ref(false)
let disposed = false
let unregisterAnchor: (() => void) | undefined
let playbackRequested = false
let audio: UniApp.InnerAudioContext | undefined
let video: UniApp.VideoContext | undefined
const unregister = context?.registerMedia(mediaId, { id: props.node.mediaId || '', play, pause, seek })

onMounted(() => {
  if (props.node.anchorId && props.anchorId)
    unregisterAnchor = context?.registerAnchor(props.node.anchorId, () => measureAnchor(props.anchorId!, instance!.proxy!))
  if (!source.value) {
    fail('No playable source')
    return
  }
  if (props.node.mediaType === 'audio') {
    if (typeof uni.createInnerAudioContext !== 'function') {
      fail('Audio is unavailable on this platform')
      return
    }
    audio = uni.createInnerAudioContext()
    audio.onPlay(handlePlay)
    audio.onPause(handlePause)
    audio.onEnded(handleEnded)
    audio.onTimeUpdate(() => {
      handleTimeUpdate({ detail: { currentTime: audio?.currentTime, duration: audio?.duration } })
    })
    audio.onError((error) => {
      void handleError({ detail: error })
    })
    // iOS 会立即将配置同步给原生播放器，空资源时设置播放选项可能触发 MediaError。
    audio.src = source.value
    audio.autoplay = false
    audio.loop = !!props.node.loop
    audio.volume = props.node.muted ? 0 : 1
  } else video = uni.createVideoContext(mediaId, instance?.proxy || undefined)
})
onBeforeUnmount(() => {
  disposed = true
  unregister?.()
  unregisterAnchor?.()
  audio?.stop()
  audio?.destroy()
  video?.pause()
})

/** 同步发送指令以保留用户点击上下文；实际播放由平台事件确认。 */
function play(): boolean {
  if (disposed || failed.value || (!audio && !video)) return false
  playbackRequested = true
  if (audio) audio.play()
  else video!.play()
  return true
}
/** 取消续播意图并发送暂停指令，避免用户暂停后换源又恢复播放。 */
function pause(): boolean {
  playbackRequested = false
  if (disposed || failed.value || (!audio && !video)) return false
  audio?.pause()
  video?.pause()
  return true
}
/** 向仍有效的播放器发送定位指令，不主动改变播放状态。 */
function seek(seconds: number): boolean {
  if (disposed || failed.value || (!audio && !video)) return false
  if (audio) audio.seek(seconds)
  else video!.seek(seconds)
  return true
}
/** 根据已收到的平台播放状态切换音频播放或暂停。 */
function toggleAudio() {
  if (playing.value) pause()
  else play()
}
/** 过滤卸载后的回调，将未知或无效进度归零后统一上报。 */
function handleTimeUpdate(event: { detail?: { currentTime?: number; duration?: number } }) {
  if (disposed || failed.value) return
  const finiteTime = (value?: number) => (typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0)
  context?.mediaTimeUpdate({
    id: props.node.mediaId || '',
    type: props.node.mediaType || 'video',
    src: source.value,
    currentTime: finiteTime(event.detail?.currentTime),
    duration: finiteTime(event.detail?.duration)
  })
}
/** 向父组件报告有效实例的播放状态，由父组件协调媒体互斥并转发事件。 */
function notify(event: 'play' | 'pause' | 'ended') {
  if (!disposed) context?.mediaEvent(mediaId, event, { id: props.node.mediaId || '', type: props.node.mediaType || 'video', src: source.value })
}
function handlePlay() {
  if (disposed || failed.value) return
  playbackRequested = true
  playing.value = true
  notify('play')
}
function handlePause() {
  if (disposed || failed.value) return
  playbackRequested = false
  playing.value = false
  notify('pause')
}
function handleEnded() {
  if (disposed || failed.value) return
  playbackRequested = false
  playing.value = false
  notify('ended')
}
/** 进入最终失败状态并只上报一次错误，后续延迟回调不再改变状态。 */
function fail(message: string) {
  if (disposed || failed.value) return
  failed.value = true
  playing.value = false
  context?.mediaError({ source: props.node.mediaType || 'video', src: source.value, message })
}
/** 按 source 顺序尝试下一地址；所有来源都失败后才上报一次错误。 */
async function handleError(event?: { detail?: { errMsg?: string } }) {
  if (disposed || failed.value) return
  if (sourceIndex.value + 1 < (props.node.sources?.length || 0)) {
    const resume = playing.value || playbackRequested
    playing.value = false
    sourceIndex.value++
    if (audio) {
      audio.src = source.value
      if (resume) audio.play()
    }
    await nextTick()
    if (!disposed && !failed.value && video && resume && playbackRequested) video.play()
  } else fail(event?.detail?.errMsg || 'Media loading failed')
}
</script>
<style lang="scss">
@use '../index.scss';
</style>
