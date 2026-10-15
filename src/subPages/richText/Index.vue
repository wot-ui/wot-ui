<template>
  <!-- #ifdef H5 -->
  <component :is="Regression" v-if="isRegression" />
  <component :is="Performance" v-if="isPerformance" />
  <!-- #endif -->
  <page-wraper v-if="!isRegression && !isPerformance" :use-wx-ad="false" :use-reward-fab="false" :enable-preset-theme="false">
    <view class="page-rich-text">
      <demo-group title="组件类型">
        <demo-group-item title="基础图文 · 周末出走">
          <view class="page-rich-text__article">
            <wd-rich-text
              :content="articleContent"
              :class-styles="journalStyles"
              :tag-style="articleTagStyle"
              selectable
              @link-click="handleArticleLink"
            />
          </view>
          <view v-if="articleMessage" class="page-rich-text__feedback">{{ articleMessage }}</view>
        </demo-group-item>
      </demo-group>
      <demo-group title="组件状态">
        <demo-group-item title="内容更新与空状态">
          <view class="page-rich-text__actions">
            <wd-button size="small" @click="currentContent = updatedNoticeContent">更新来信</wd-button>
            <wd-button size="small" plain @click="currentContent = ''">清空内容</wd-button>
            <wd-button size="small" plain @click="currentContent = noticeContent">恢复来信</wd-button>
          </view>
          <view class="page-rich-text__dynamic">
            <wd-rich-text :content="currentContent"><view class="page-rich-text__empty">还没有新的来信，去看看窗外吧。</view></wd-rich-text>
          </view>
        </demo-group-item>
        <demo-group-item title="图片加载失败与占位">
          <wd-rich-text :content="failedImageContent" error-image="/static/icon/app.png" />
          <view class="page-rich-text__hint">照片暂不可用时，用自定义占位图承接。</view>
        </demo-group-item>
      </demo-group>
      <demo-group title="组件变体">
        <demo-group-item title="图片预览">
          <view class="page-rich-text__photo">
            <wd-rich-text
              :content="previewContent"
              :class-styles="journalStyles"
              loading-image="/static/icon/app.png"
              lazy-load
              @image-load="imageSize = `${$event.width} × ${$event.height}`"
            />
          </view>
          <view v-if="imageSize" class="page-rich-text__hint">照片尺寸：{{ imageSize }}，轻触预览原图。</view>
        </demo-group-item>
        <demo-group-item title="链接点击">
          <view class="page-rich-text__links"><wd-rich-text :content="linkContent" @link-click="handleLink" /></view>
          <view v-if="linkMessage" class="page-rich-text__feedback">{{ linkMessage }}</view>
        </demo-group-item>
        <demo-group-item title="图片链接">
          <view class="page-rich-text__photo">
            <wd-rich-text :content="customImageContent" @link-click="imageMessage = '你打开了「山野手记」的阅读入口。'" />
          </view>
          <view class="page-rich-text__hint">轻触照片，打开阅读入口。</view>
          <view v-if="imageMessage" class="page-rich-text__feedback">{{ imageMessage }}</view>
        </demo-group-item>
      </demo-group>
      <demo-group title="组件样式">
        <demo-group-item title="标签与 class 样式 · 一封邀请函">
          <view class="page-rich-text__invitation">
            <wd-rich-text
              :content="invitationContent"
              :tag-style="invitationTagStyle"
              :class-styles="invitationStyles"
              @link-click="invitationMessage = '邀请已收下，周末见！'"
            />
          </view>
          <view v-if="invitationMessage" class="page-rich-text__feedback">{{ invitationMessage }}</view>
        </demo-group-item>
        <demo-group-item title="主题与文字样式">
          <view class="page-rich-text__actions">
            <wd-button size="small" plain @click="dark = !dark">{{ dark ? '切换浅色' : '切换深色' }}</wd-button>
          </view>
          <wd-config-provider :theme="dark ? 'dark' : 'light'">
            <view class="page-rich-text__theme">
              <wd-rich-text
                :content="themeContent"
                custom-style="--wot-rich-text-font-size:16px;--wot-rich-text-line-height:1.9;"
                @link-click="themeMessage = '愿这段故事，陪你度过一个安静的夜晚。'"
              />
            </view>
          </wd-config-provider>
          <view v-if="themeMessage" class="page-rich-text__feedback">{{ themeMessage }}</view>
        </demo-group-item>
      </demo-group>
      <demo-group title="布局能力">
        <demo-group-item title="有序与嵌套列表"><wd-rich-text :content="listContent" /></demo-group-item>
        <demo-group-item title="宽表格横向滚动">
          <view class="page-rich-text__hint">向左右滑动，查看完整行程。</view>
          <view class="page-rich-text__table"><wd-rich-text :content="tableContent" /></view>
        </demo-group-item>
        <demo-group-item title="列宽与合并单元格">
          <view class="page-rich-text__merged-table">
            <wd-rich-text :content="mergedTableContent" @link-click="tableMessage = '轻徒步准备：舒适的鞋、饮水和一件外套。'" />
          </view>
          <view v-if="tableMessage" class="page-rich-text__feedback">{{ tableMessage }}</view>
        </demo-group-item>
      </demo-group>
      <demo-group title="内容形态">
        <demo-group-item title="编辑器内容">
          <view class="page-rich-text__editor">
            <view class="page-rich-text__actions">
              <wd-button
                v-for="(sample, index) in editorSamples"
                :key="sample.name"
                size="small"
                :variant="editorIndex === index ? 'base' : 'plain'"
                @click="editorIndex = index"
              >
                {{ sample.name }}
              </wd-button>
            </view>
            <view class="page-rich-text__hint">{{ editorSamples[editorIndex].note }}</view>
            <view class="page-rich-text__editor-content">
              <wd-rich-text :content="editorSamples[editorIndex].content" @link-click="editorMessage = '清单已备好，下一站，去见山。'" />
            </view>
            <view v-if="editorMessage" class="page-rich-text__feedback">{{ editorMessage }}</view>
          </view>
        </demo-group-item>
        <demo-group-item title="音视频 · 有声旅行手记">
          <view class="page-rich-text__media">
            <view class="page-rich-text__hint">选择片段定位，轻触播放器开始。也可以用下方按钮控制当前片段。</view>
            <view class="page-rich-text__actions">
              <wd-button
                v-for="item in mediaItems"
                :key="item.id"
                size="small"
                :variant="selectedMedia === item.id ? 'base' : 'plain'"
                @click="locateMedia(item.id)"
              >
                {{ item.title }}
              </wd-button>
            </view>
            <wd-rich-text
              :key="mediaRevision"
              ref="mediaRef"
              :content="mediaArticle"
              enable-anchor
              @media-play="updateMediaState($event, '播放中')"
              @media-pause="updateMediaState($event, '已暂停')"
              @media-ended="updateMediaState($event, '已结束')"
              @media-timeupdate="updateMediaTime"
              @error="handleMediaError"
            />
            <view class="page-rich-text__media-controls">
              <view class="page-rich-text__hint">
                {{ selectedMediaTitle }} · {{ mediaStates[selectedMedia] || '待播放' }} · {{ mediaTimes[selectedMedia] || '0 / 0 秒' }}
              </view>
              <view class="page-rich-text__actions">
                <wd-button size="small" @click="controlMedia('play')">播放片段</wd-button>
                <wd-button size="small" variant="plain" @click="controlMedia('pause')">暂停片段</wd-button>
                <wd-button size="small" variant="plain" @click="controlMedia('seek')">跳至 5 秒</wd-button>
              </view>
              <view v-if="mediaMessage" class="page-rich-text__hint">{{ mediaMessage }}</view>
              <view v-if="mediaFailed" class="page-rich-text__actions">
                <wd-button size="small" variant="plain" @click="reloadMedia">重新加载音视频</wd-button>
                <text class="page-rich-text__hint">将重置两段播放进度，重新加载后请手动播放。</text>
              </view>
            </view>
          </view>
        </demo-group-item>
        <demo-group-item title="长文章 · 完整旅行手记">
          <view id="rich-text-long-article" class="page-rich-text__long-section">
            <view class="page-rich-text__hint">从晨光到归途，六段值得慢慢读的时光。</view>
            <wd-button size="small" plain @click="toggleLongArticle">{{ showLongArticle ? '收起手记' : '展开完整手记' }}</wd-button>
            <view v-if="showLongArticle" class="page-rich-text__long">
              <view class="page-rich-text__directory">
                <view class="page-rich-text__hint">选择章节，跳到你想读的地方。</view>
                <view class="page-rich-text__actions">
                  <wd-button v-for="heading in headings" :key="heading.id" size="small" plain @click="jumpToHeading(heading.id)">
                    {{ heading.text }}
                  </wd-button>
                </view>
              </view>
              <view v-if="anchorMessage" class="page-rich-text__hint">{{ anchorMessage }}</view>
              <wd-rich-text
                ref="longArticleRef"
                :content="longArticle"
                :class-styles="journalStyles"
                :tag-style="articleTagStyle"
                enable-anchor
                @load="updateHeadings"
                @link-click="handleAnchorLink"
              />
              <wd-button size="small" plain @click="toggleLongArticle">收起手记，回到开头</wd-button>
            </view>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { onHide, onLoad } from '@dcloudio/uni-app'
import WdRichText from '../../uni_modules/wot-ui/components/wd-rich-text/wd-rich-text.vue'
import type {
  RichTextExpose,
  RichTextHeading,
  RichTextLinkClick,
  RichTextMediaEvent,
  RichTextMediaTimeUpdate,
  RichTextError
} from '../../uni_modules/wot-ui/components/wd-rich-text/types'
import {
  articleContent,
  journalStyles,
  noticeContent,
  updatedNoticeContent,
  failedImageContent,
  previewContent,
  linkContent,
  customImageContent,
  invitationContent,
  invitationStyles,
  themeContent,
  listContent,
  tableContent,
  mergedTableContent,
  editorSamples,
  videoContent,
  audioContent,
  createLongArticle
} from './content'

const isRegression = ref(false)
const isPerformance = ref(false)
// #ifdef H5
import { defineAsyncComponent } from 'vue'
const Regression = import.meta.env.DEV ? defineAsyncComponent(() => import('../../../tests/e2e/fixtures/rich-text/Regression.vue')) : undefined
const Performance = import.meta.env.DEV ? defineAsyncComponent(() => import('../../../tests/e2e/fixtures/rich-text/Performance.vue')) : undefined
onLoad((query) => {
  isRegression.value = import.meta.env.DEV && query?.__rich_text_regression === '1'
  isPerformance.value = import.meta.env.DEV && !isRegression.value && query?.__rich_text_performance === '1'
})
// #endif

const articleTagStyle = { p: 'line-height:1.95;margin:0 0 16px;', th: 'text-align:left;', td: 'font-size:13px;' }
const invitationTagStyle = { p: 'text-align:center;line-height:1.9;', h2: 'text-align:center;' }
const currentContent = ref(noticeContent)
const dark = ref(false)
const articleMessage = ref('')
const linkMessage = ref('')
const imageMessage = ref('')
const imageSize = ref('')
const invitationMessage = ref('')
const themeMessage = ref('')
const tableMessage = ref('')
const editorIndex = ref(0)
const editorMessage = ref('')
const mediaRef = ref<RichTextExpose>()
const mediaItems = [
  { id: 'trip-video', title: '旅途片段' },
  { id: 'reading-audio', title: '阅读时光' }
]
const selectedMedia = ref('trip-video')
const selectedMediaTitle = computed(() => mediaItems.find((item) => item.id === selectedMedia.value)?.title)
const mediaArticle = `<h3>01 / 留住路上的片刻</h3>${videoContent}<h3>02 / 给文字配一段旋律</h3>${audioContent}`
const mediaStates = ref<Record<string, string>>({})
const mediaTimes = ref<Record<string, string>>({})
const mediaMessage = ref('')
const mediaRevision = ref(0)
const mediaFailed = ref(false)
function reloadMedia() {
  mediaRef.value?.pauseMedia()
  mediaRevision.value++
  mediaStates.value = {}
  mediaTimes.value = {}
  mediaFailed.value = false
  mediaMessage.value = '重新加载后，请点击播放片段。'
}
async function locateMedia(id: string) {
  selectedMedia.value = id
  mediaMessage.value = ''
  try {
    await mediaRef.value?.scrollToAnchor(id, { offset: 60, duration: 0 })
  } catch {
    mediaMessage.value = '片段暂时无法定位，请稍后再试。'
  }
}
function controlMedia(action: 'play' | 'pause' | 'seek') {
  const target = mediaRef.value
  const accepted =
    action === 'play'
      ? target?.playMedia(selectedMedia.value)
      : action === 'pause'
      ? target?.pauseMedia(selectedMedia.value)
      : target?.seekMedia(selectedMedia.value, 5)
  mediaMessage.value = accepted ? (action === 'seek' ? '已请求跳转至 5 秒，以实际播放进度为准。' : '') : '片段暂不可用，请检查资源后重试。'
}
function updateMediaState(event: RichTextMediaEvent, state: string) {
  mediaStates.value[event.id] = state
}
function updateMediaTime(event: RichTextMediaTimeUpdate) {
  mediaTimes.value[event.id] = `${Math.floor(event.currentTime)} / ${Math.floor(event.duration)} 秒`
}
function handleMediaError(event: RichTextError) {
  if (event.source === 'audio' || event.source === 'video') {
    mediaFailed.value = true
    mediaStates.value[event.source === 'video' ? 'trip-video' : 'reading-audio'] = '加载失败'
    mediaMessage.value = '部分片段暂时无法加载，请检查网络后重新加载音视频。'
  }
}
const showLongArticle = ref(false)
const longArticle = ref('')
const longArticleRef = ref<RichTextExpose>()
const headings = ref<RichTextHeading[]>([])
const anchorMessage = ref('')
function updateHeadings() {
  headings.value = longArticleRef.value?.getHeadings().filter((heading) => heading.level === 3) || []
}
async function jumpToHeading(id: string) {
  try {
    await longArticleRef.value?.scrollToAnchor(id, { offset: 60, duration: 0 })
    anchorMessage.value = ''
  } catch {
    anchorMessage.value = '章节位置已变化，请重新选择。'
  }
}
function handleAnchorLink({ href }: RichTextLinkClick) {
  if (href.startsWith('#')) void jumpToHeading(href.slice(1))
}

function handleArticleLink() {
  articleMessage.value = '行前准备：舒适的鞋、饮水、轻食和随身垃圾袋。'
}
function handleLink({ href }: RichTextLinkClick) {
  linkMessage.value = href === '/journal/gear' ? '清单已打开：带上饮水和轻外套，轻装出发。' : '这段旅途，值得分享给你在意的人。'
}
async function toggleLongArticle() {
  if (!showLongArticle.value) {
    longArticle.value = createLongArticle()
    showLongArticle.value = true
    return
  }
  showLongArticle.value = false
  longArticle.value = ''
  headings.value = []
  anchorMessage.value = ''
  await nextTick()
  uni.pageScrollTo({ selector: '#rich-text-long-article', duration: 0 })
}
onHide(() => {
  mediaRef.value?.pauseMedia()
})
</script>
<style lang="scss" scoped>
.page-rich-text {
  --wot-rich-text-link-color: var(--wot-success-main);
  &__article {
    padding: $padding-extra-loose;
    border: $stroke-main solid $border-main;
    border-radius: $radius-large;
    background: $filled-oppo;
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-main;
    margin-bottom: $spacing-extra-loose;
  }
  &__hint {
    color: $text-secondary;
    font-size: $typography-body-size-main;
    line-height: $typography-body-line-height-size-main;
    margin-bottom: $spacing-loose;
  }
  &__feedback {
    color: $success-main;
    background: $success-surface;
    padding: $padding-main;
    margin-top: $spacing-main;
    border-radius: $radius-main;
    font-size: $typography-body-size-main;
  }
  &__empty {
    padding: $padding-loose;
    text-align: center;
    color: $text-secondary;
    background: $filled-content;
    border-radius: $radius-large;
  }
  &__photo {
    max-width: 320px;
  }
  &__invitation {
    padding: $padding-loose;
    border: $stroke-main solid $border-main;
    border-radius: $radius-large;
  }
  &__editor-content {
    padding: $padding-loose;
    border: $stroke-main solid $border-main;
    border-radius: $radius-large;
    background: $filled-oppo;
  }
  &__theme {
    padding: $padding-loose;
    background: $filled-content;
    border-radius: $radius-large;
  }
  &__media-controls {
    margin-top: $spacing-loose;
  }
  &__long {
    margin-top: $spacing-ultra-loose;
  }
}
</style>
