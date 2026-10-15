<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="false" :enable-preset-theme="false">
    <view class="page-rich-text">
      <view class="page-rich-text__notice">展示 HTML 图文内容，支持图片预览和链接事件。</view>
      <demo-group title="组件类型">
        <demo-group-item title="语义标签与列表编号">
          <view class="page-rich-text__expanded-tags"><wd-rich-text :content="expandedTagsContent" /></view>
        </demo-group-item>
        <demo-group-item title="基础图文"><wd-rich-text :content="articleContent" selectable /></demo-group-item>
        <demo-group-item title="排版与实体：静态和交互对照">
          <view class="page-rich-text__normalization"><wd-rich-text :content="normalizationContent" /></view>
          <view class="page-rich-text__normalization-interactive"><wd-rich-text :content="normalizationInteractiveContent" /></view>
        </demo-group-item>
        <demo-group-item title="连续段落">
          <view class="page-rich-text__static"><wd-rich-text :content="staticContent" /></view>
        </demo-group-item>
      </demo-group>
      <demo-group title="组件状态">
        <demo-group-item title="内容替换与清空">
          <view class="page-rich-text__actions">
            <wd-button size="small" @click="currentContent = inlineContent">替换</wd-button>
            <wd-button size="small" @click="currentContent = ''">清空</wd-button>
            <wd-button size="small" @click="currentContent = imageContent">恢复</wd-button>
          </view>
          <view class="page-rich-text__dynamic">
            <wd-rich-text :content="currentContent" @link-click="handleLink" :preview-image="false" @image-click="handleImage">空内容</wd-rich-text>
          </view>
        </demo-group-item>
      </demo-group>
      <demo-group title="组件变体">
        <demo-group-item title="图片预览">
          <wd-rich-text content='<img src="https://wot-ui.cn/assets/redpanda.jpg" alt="小熊猫" width="120">' lazy-load />
        </demo-group-item>
      </demo-group>
      <demo-group title="组件样式">
        <demo-group-item title="标签与 class 样式">
          <view class="page-rich-text__style-map">
            <wd-rich-text :content="styledContent" :tag-style="{ p: 'line-height:2' }" :class-styles="{ 'article-note': 'font-weight:bold' }" />
          </view>
        </demo-group-item>
        <demo-group-item title="主题继承">
          <wd-button size="small" @click="dark = !dark">切换局部主题</wd-button>
          <wd-config-provider :theme="dark ? 'dark' : 'light'">
            <view class="page-rich-text__theme">
              <wd-rich-text :content="staticContent" />
              <wd-rich-text :content="inlineContent" @link-click="handleLink" />
            </view>
          </wd-config-provider>
        </demo-group-item>
      </demo-group>
      <demo-group title="布局能力">
        <demo-group-item title="明确列宽与长文本">
          <view class="page-rich-text__column-static"><wd-rich-text :content="staticColumnTableContent" /></view>
          <view class="page-rich-text__column-grid"><wd-rich-text :content="columnTableContent" @link-click="handleLink" /></view>
        </demo-group-item>
        <demo-group-item title="行内链接与换行">
          <view class="page-rich-text__inline"><wd-rich-text :content="inlineContent" @link-click="handleLink" /></view>
        </demo-group-item>
        <demo-group-item title="图片及图片链接">
          <view class="page-rich-text__images">
            <wd-rich-text :content="imageContent" @link-click="handleLink" :preview-image="false" @image-click="handleImage" />
          </view>
        </demo-group-item>
        <demo-group-item title="静态表格对照">
          <view class="page-rich-text__native-table"><wd-rich-text :content="staticTableContent" /></view>
        </demo-group-item>
        <demo-group-item title="交互表格">
          <view class="page-rich-text__table">
            <wd-rich-text :content="tableContent" @link-click="handleLink" :preview-image="false" @image-click="handleImage" />
          </view>
        </demo-group-item>
        <demo-group-item title="交互合并单元格">
          <view class="page-rich-text__merged-table"><wd-rich-text :content="mergedTableContent" @link-click="handleLink" /></view>
        </demo-group-item>
        <demo-group-item title="嵌套列表">
          <view class="page-rich-text__list"><wd-rich-text :content="listContent" @link-click="handleLink" /></view>
        </demo-group-item>
        <demo-group-item title="长内容合并">
          <view class="page-rich-text__long"><wd-rich-text :content="longContent" /></view>
        </demo-group-item>
      </demo-group>
      <demo-group title="内容形态">
        <demo-group-item title="编辑器真实导出">
          <view v-for="(fixture, name) in editorFixtures" :key="name" :class="`page-rich-text__export-${name}`">
            <wd-rich-text :content="fixture.html" @link-click="handleLink" />
          </view>
        </demo-group-item>
        <demo-group-item title="视频：点击加载示例">
          <wd-button v-if="!showVideo" size="small" @click="showVideo = true">加载视频</wd-button>
          <wd-rich-text v-else :content="videoContent" />
        </demo-group-item>
      </demo-group>
      <view class="page-rich-text__events">链接 {{ linkCount }}；图片 {{ imageCount }}；{{ lastEvent }}</view>
    </view>
    <view class="page-rich-text__anchor-regression">
      <wd-button size="small" @click="jumpInContainer">定位容器第二节</wd-button>
      <scroll-view id="rich-text-regression-scroll" scroll-y :scroll-top="containerScrollTop" style="height: 240px">
        <wd-rich-text ref="containerArticle" enable-anchor :content="anchorContent" />
      </scroll-view>
      <wd-rich-text enable-anchor :content="anchorContent" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import editorFixtures from '../../../fixtures/rich-text-editors.json'
import { columnTableContent, staticColumnTableContent } from '../../../fixtures/rich-text-tables'
import type { RichTextExpose } from '../../../../src/uni_modules/wot-ui/components/wd-rich-text/types'
import PageWraper from '../../../../src/components/page-wraper/page-wraper.vue'
import DemoGroup from '../../../../src/components/demo-group/demo-group.vue'
import DemoGroupItem from '../../../../src/components/demo-group-item/demo-group-item.vue'
import WdButton from '../../../../src/uni_modules/wot-ui/components/wd-button/wd-button.vue'
import WdConfigProvider from '../../../../src/uni_modules/wot-ui/components/wd-config-provider/wd-config-provider.vue'
import WdRichText from '../../../../src/uni_modules/wot-ui/components/wd-rich-text/wd-rich-text.vue'
import type { RichTextImageClick, RichTextLinkClick } from '../../../../src/uni_modules/wot-ui/components/wd-rich-text/types'
import {
  staticContent,
  inlineContent,
  imageContent,
  staticTableContent,
  tableContent,
  listContent,
  longContent,
  articleContent,
  normalizationContent,
  normalizationInteractiveContent,
  expandedTagsContent,
  mergedTableContent,
  styledContent,
  videoContent
} from '../../../fixtures/rich-text'

const currentContent = ref<string>(imageContent)
const dark = ref(false)
const showVideo = ref(false)
const linkCount = ref(0)
const imageCount = ref(0)
const lastEvent = ref('等待交互')
function handleLink(event: RichTextLinkClick) {
  linkCount.value++
  lastEvent.value = event.href
}
function handleImage(event: RichTextImageClick) {
  imageCount.value++
  lastEvent.value = `${event.index}: ${event.src}`
}

const containerArticle = ref<RichTextExpose>()
const containerScrollTop = ref(0)
const anchorContent =
  '<h2 id="first">容器第一节</h2><p style="height:300px">第一节正文</p><h2 id="second">容器第二节</h2><p style="height:300px">第二节正文</p>'
async function jumpInContainer() {
  const anchor = await containerArticle.value!.getAnchorRect('second')
  uni
    .createSelectorQuery()
    .select('#rich-text-regression-scroll')
    .boundingClientRect()
    .select('#rich-text-regression-scroll')
    .scrollOffset(() => {})
    .exec((results) => {
      containerScrollTop.value = results[1].scrollTop + anchor.top - results[0].top
    })
}
</script>
<style lang="scss" scoped>
.page-rich-text {
  &__notice {
    padding: $padding-loose;
    color: $text-secondary;
  }
  &__actions {
    display: flex;
    gap: $spacing-main;
    margin-bottom: $spacing-main;
  }
  &__theme {
    margin-top: $spacing-main;
    padding: $padding-main;
    background: $filled-content;
  }
  &__events {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $padding-main;
    background: $filled-content;
    color: $text-main;
    z-index: 10;
  }
}
</style>
