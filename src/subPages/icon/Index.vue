<template>
  <view class="icon-page">
    <page-wraper>
      <view class="icon-page__container">
        <!-- 搜索区域 -->
        <view class="icon-page__search">
          <wd-search
            v-model="keyword"
            :placeholder="$t('sou-ni-suo-xiang')"
            variant="plain"
            @change="handleSearch"
            @clear="handleClear"
            cancel-txt="取消"
            hide-cancel
          />
        </view>

        <!-- 图标列表 -->
        <view class="icon-page__content">
          <view v-for="(cat, category) in showCategorized" :key="category" class="icon-page__category">
            <view class="icon-page__category-title">{{ cat.title }}</view>
            <view class="icon-page__list">
              <view v-for="(icon, index) in cat.list" :key="index" class="icon-page__item" @click="handleClick(icon)">
                <view class="icon-page__item-icon-wrapper">
                  <wd-icon :name="icon" size="24px" custom-class="icon-page__item-icon" />
                </view>
                <view class="icon-page__item-name">{{ icon }}</view>
              </view>
            </view>
          </view>

          <!-- 空状态 -->
          <wd-empty v-if="isEmpty" icon="search" :tip="$t('dang-qian-wu-xiang-guan-tu-biao')" custom-class="icon-page__empty" />
        </view>
      </view>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useNotify } from '@/uni_modules/wot-ui'
import { useI18n } from 'vue-i18n'

const { showNotify } = useNotify()
const { t } = useI18n()

/** 搜索关键词 */
const keyword = ref<string>('')

/**
 * 分类图标数据
 * 包含方向、编辑、通用、交互、媒体、提示等多个类别
 */
const categorizedIcons = computed<Record<string, { title: string; list: string[] }>>(() => {
  return {
    direction: {
      title: t('fang-xiang-lei-tu-biao'),
      list: [
        'arrow-down',
        'arrow-fall',
        'arrow-left',
        'arrow-right',
        'arrow-rise',
        'arrow-up',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-up',
        'del',
        'double-down',
        'double-left',
        'double-right',
        'double-up',
        'down',
        'down-circle',
        'drag-arrow',
        'expand',
        'left',
        'left-circle',
        'menu-fold',
        'menu-unfold',
        'multiple-horizontal',
        'right',
        'right-circle',
        'rotate-left',
        'rotate-right',
        'shrink',
        'sort-fill',
        'sort-fill-1',
        'swap',
        'to-bottom',
        'to-left',
        'to-right',
        'to-top',
        'up',
        'up-circle'
      ]
    },
    edit: {
      title: t('bian-ji-lei-tu-biao'),
      list: [
        'align-center',
        'align-left',
        'align-right',
        'bg-colors',
        'bold',
        'brush',
        'circular',
        'copy',
        'delete',
        'deleteall',
        'edit',
        'eraser',
        'filter',
        'filter-fill',
        'find-replace',
        'font-colors',
        'formula',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'highlight',
        'italic',
        'line-height',
        'link',
        'number',
        'oblique-line',
        'ordered-list',
        'original-size',
        'paste',
        'quote',
        'redo',
        'scissor',
        'sort',
        'sort-ascending',
        'sort-descending',
        'strikethrough',
        'textarea',
        'underline',
        'undo',
        'unordered-list',
        'zoom-in',
        'zoom-out'
      ]
    },
    general: {
      title: t('tong-yong-lei-tu-biao'),
      list: [
        'Fire',
        'application',
        'apps',
        'archive',
        'book',
        'branch',
        'bug',
        'bulb',
        'calendar-line',
        'camera',
        'camera-fill',
        'cloud',
        'command',
        'common',
        'company',
        'compass',
        'copyright',
        'dashboard',
        'desktop',
        'dice',
        'drag-dot',
        'drag-dot-vertical',
        'drive-file',
        'ear',
        'email',
        'empty',
        'failpayment',
        'experiment',
        'face-frown-fill',
        'face-meh-fill',
        'face-smile-fill',
        'file',
        'file-audio',
        'file-image',
        'file-pdf',
        'file-video',
        'folder',
        'folder-add',
        'folder-delete',
        'gift',
        'idcard',
        'image',
        'image-close',
        'image-failloading',
        'interaction',
        'keyboard',
        'language',
        'layout',
        'loading',
        'locate',
        'location',
        'lock',
        'loop',
        'man',
        'menu',
        'mind-mapping',
        'mobile',
        'module-fill',
        'moon',
        'moon-fill',
        'mosaic',
        'nav',
        'no-collection',
        'no-comment',
        'no-content',
        'no-message',
        'no-product',
        'no-result',
        'no-wifi',
        'notification',
        'notification-close',
        'old-version',
        'organization',
        'pen',
        'pen-fill',
        'phone',
        'printer',
        'public',
        'pushpin',
        'qrcode',
        'robot',
        'robot-add',
        'safe',
        'shake',
        'skin',
        'stamp',
        'storage',
        'store',
        'subscribe',
        'subscribe-add',
        'subscribed',
        'sun',
        'sun-fill',
        'tag',
        'tags',
        'thunderbolt',
        'time-line',
        'tool',
        'trophy',
        'unlock',
        'user',
        'user-add',
        'user-group',
        'video-camera',
        'wifi',
        'woman'
      ]
    },
    'interactive-button': {
      title: t('jiao-hu-lei-tu-biao'),
      list: [
        'Export',
        'Launch',
        'at',
        'barcode',
        'buble-circle-fill',
        'clock-circle-fill',
        'cloud-download',
        'code',
        'code-block',
        'code-square',
        'download',
        'eye',
        'eye-fill',
        'eye-invisible',
        'eye-invisible-fill',
        'headset',
        'headset-fill',
        'headset-off',
        'headset-off-fill',
        'heart',
        'heart-fill',
        'history',
        'home',
        'home-fill',
        'import',
        'lightning-circle-fill',
        'list',
        'message',
        'message-banned',
        'mfill',
        'mic',
        'more',
        'more-vertical',
        'poweroff',
        'refresh',
        'reply',
        'save',
        'scan',
        'search-line',
        'select-all',
        'send',
        'settings',
        'share-alt',
        'share-external',
        'share-internal',
        'star',
        'star-fill',
        'sync',
        'thumb-down',
        'thumb-down-fill',
        'thumb-up',
        'thumb-up-fill',
        'translate',
        'upload',
        'voice'
      ]
    },
    media: {
      title: t('mei-ti-lei-tu-biao'),
      list: [
        'backward',
        'forward',
        'fullscreen',
        'fullscreen-exit',
        'live-broadcast',
        'music',
        'mute',
        'mute-fill',
        'pause',
        'pause-circle',
        'pause-circle-fill',
        'play-arrow',
        'play-arrow-fill',
        'play-circle',
        'play-circle-fill',
        'record',
        'record-stop',
        'skip-next',
        'skip-next-fill',
        'skip-previous',
        'skip-previous-fill',
        'sound',
        'sound-fill'
      ]
    },
    tips: {
      title: t('ti-shi-lei-tu-biao'),
      list: [
        'check',
        'check-circle',
        'check-circle-fill',
        'check-circle-radio-fill',
        'check-half-square-fill',
        'check-square',
        'check-square-fill',
        'clock-circle',
        'close',
        'close-circle',
        'close-circle-fill',
        'division',
        'doublecheck',
        'exclamation',
        'exclamation-circle',
        'exclamation-circle-fill',
        'exclamation-polygon-fill',
        'info',
        'info-circle',
        'info-circle-fill',
        'minus',
        'minus-circle',
        'minus-circle-fill',
        'minus-square',
        'minus-square-3px',
        'page-fill',
        'plus',
        'plus-circle',
        'plus-circle-fill',
        'plus-square',
        'plus-square-3px',
        'question',
        'question-circle',
        'question-circle-fill',
        'stop',
        'uncheck-circle',
        'uncheck-square'
      ]
    }
  }
})

const showCategorized = ref<Record<string, { title: string; list: string[] }>>({})

/** 判断是否为空状态 */
const isEmpty = computed(() => Object.values(showCategorized.value).every((v) => !v.list.length))

/** 页面挂载时初始化图标列表 */
onMounted(() => {
  showCategorized.value = categorizedIcons.value
})

/**
 * 处理搜索事件，根据关键词过滤图标
 */
function handleSearch() {
  const key = keyword.value
  if (!key) {
    showCategorized.value = categorizedIcons.value
    return
  }
  const result: Record<string, { title: string; list: string[] }> = {}
  const source = categorizedIcons.value
  Object.keys(source).forEach((cat) => {
    const list = source[cat].list.filter((str) => str.includes(key))
    if (list.length) result[cat] = { title: source[cat].title, list }
  })
  showCategorized.value = result
}

/**
 * 处理清空搜索，恢复全部图标
 */
function handleClear() {
  keyword.value = ''
  showCategorized.value = categorizedIcons.value
}

/**
 * 处理图标点击事件，复制图标代码到剪贴板
 * @param {string} icon - 被点击的图标名称
 */
function handleClick(icon: string) {
  // #ifdef H5
  uni.setClipboardData({
    data: `<wd-icon name="${icon}" size="24px"></wd-icon>`,
    showToast: false,
    success: () => {
      showNotify({
        type: 'success',
        duration: 1500,
        message: t('fu-zhi-cheng-gong') + ` <wd-icon name="${icon}" size="24px"></wd-icon>`
      })
    }
  })
  // #endif
}
</script>
<style lang="scss" scoped>
// 组件级 CSS 变量定义
$icon-page-bg: var(--wot-icon-page-bg, $filled-oppo) !default;
$icon-content-bg: var(--wot-icon-content-bg, $filled-oppo) !default;
$icon-category-title-color: var(--wot-icon-category-title-color, $text-secondary) !default;
$icon-item-color: var(--wot-icon-item-color, $text-secondary) !default;
$icon-item-bg-hover: var(--wot-icon-item-bg-hover, $filled-bottom) !default;
$icon-list-gap: var(--wot-icon-list-gap, $spacing-tight) !default;

.icon-page {
  background-color: $icon-page-bg;
  width: 100vw;
}

.icon-page__container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: $icon-page-bg;
  overflow-y: auto;
}

.icon-page__search {
  position: sticky;
  top: 0;
  z-index: 10;
  :deep(.wd-search) {
    background-color: transparent;
  }
}

.icon-page__content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.icon-page__category {
  background-color: $icon-content-bg;
  margin-bottom: $spacing-ultra-tight;
}

.icon-page__category-title {
  padding: $padding-loose $padding-extra-loose;
  font-size: $typography-label-size-main;
  line-height: $typography-label-line-height-size-main;
  font-weight: $font-weight-medium;
  color: $icon-category-title-color;
  background-color: $filled-bottom;
  letter-spacing: 0.5px;
}

.icon-page__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $icon-list-gap;
  padding: $padding-loose;
  background-color: $icon-content-bg;
}

.icon-page__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $padding-main;
  border-radius: $radius-main;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background-color: $icon-item-bg-hover;
    transform: scale(0.95);
  }
}

.icon-page__item-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $n-48;
  height: $n-48;
  margin-bottom: $padding-main;
  border-radius: $radius-large;
  background-color: $filled-bottom;
  transition: all 0.2s ease;

  .icon-page__item:active & {
    background-color: $border-main;
  }
}

:deep(.icon-page__item-icon) {
  color: $icon-main;
  transition: color 0.2s ease;
}

.icon-page__item-name {
  font-size: $typography-label-size-small;
  color: $icon-item-color;
  text-align: center;
  word-break: break-word;
  transition: color 0.2s ease;
  max-width: $n-88;
  line-height: $typography-label-line-height-size-small;
}

.icon-page__empty {
  padding: $padding-ultra-loose $padding-main;
}

// 暗黑模式支持
.icon-page--dark {
  background-color: $filled-extra-strong;

  .icon-page__search {
    background-color: $filled-strong;
    box-shadow: 0 $n-1 $n-4 rgba(255, 255, 255, 0.1);
  }

  .icon-page__category {
    background-color: $filled-strong;
  }

  .icon-page__category-title {
    background-color: $filled-extra-strong;
    color: $text-secondary;
  }

  .icon-page__list {
    background-color: $filled-strong;
  }

  .icon-page__item-icon-wrapper {
    background-color: $filled-extra-strong;
  }

  :deep(.icon-page__item-icon) {
    color: $text-secondary;
  }

  .icon-page__item-name {
    color: $text-auxiliary;
  }
}
</style>
