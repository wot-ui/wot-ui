<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import AsideSponsors from './AsideSponsors.vue'
import { wotThemeOptionsKey } from '../options'

const options = inject(wotThemeOptionsKey)
const wwadsId = options?.ads !== false ? options?.ads?.wwadsId : null

const wwadsHost = ref<HTMLElement | null>(null)
const wwadsSlot = ref<HTMLElement | null>(null)
const showSupportCard = ref(false)
const supportCardDismissed = ref(false)

let wwadsScript: HTMLScriptElement | null = null
let verificationTimer: number | undefined

function revealSupportCard() {
  if (verificationTimer !== undefined) {
    window.clearTimeout(verificationTimer)
    verificationTimer = undefined
  }
  showSupportCard.value = true
}

function hasVisibleAd() {
  const element = wwadsSlot.value
  if (!element || element.childElementCount === 0) return false

  const style = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width > 0 && rect.height > 0
}

function verifyAd() {
  verificationTimer = undefined
  if (!hasVisibleAd()) revealSupportCard()
}

onMounted(() => {
  if (!wwadsId || !wwadsHost.value) return

  wwadsScript = document.createElement('script')
  wwadsScript.src = 'https://cdn.wwads.cn/js/makemoney.js'
  wwadsScript.async = true
  wwadsScript.onerror = revealSupportCard
  wwadsHost.value.appendChild(wwadsScript)

  // 网络请求成功后，广告内容仍可能被拦截器通过样式规则隐藏。
  verificationTimer = window.setTimeout(verifyAd, 3000)
})

onBeforeUnmount(() => {
  if (verificationTimer !== undefined) window.clearTimeout(verificationTimer)
  wwadsScript?.remove()
})
</script>

<template>
  <AsideSponsors />
  <template v-if="wwadsId">
    <div v-if="!showSupportCard" ref="wwadsHost" class="site-aside-panel">
      <div ref="wwadsSlot" class="wwads-cn wwads-vertical" :data-id="wwadsId"></div>
    </div>

    <aside v-else-if="!supportCardDismissed" class="site-support-card" aria-label="支持本站" aria-live="polite">
      <button class="site-support-card__close" type="button" aria-label="隐藏提示" @click="supportCardDismissed = true">
        <svg aria-hidden="true" viewBox="0 0 12 12" width="10" height="10">
          <path d="M1.5 1.5l9 9m0-9l-9 9" />
        </svg>
      </button>
      <p class="site-support-card__title">感谢你支持 Wot UI</p>
      <p class="site-support-card__description">本站依靠赞助维持运营。若你正在使用内容拦截器，可以将本站加入白名单。</p>
      <div class="site-support-card__actions">
        <a href="https://wwads.cn/page/whitelist-wwads" target="_blank" rel="nofollow noopener">如何加入白名单</a>
        <a href="/reward/sponsor">赞助本站</a>
      </div>
    </aside>
  </template>
</template>

<style>
.site-aside-panel {
  padding: 1px 15px 10px;
  margin-top: 20px;
  background-color: var(--vp-c-bg-soft);
}

.wwads-vertical {
  background-color: transparent !important;
}

.wwads-text {
  color: var(--vp-c-text-2) !important;
}

.site-support-card {
  position: relative;
  padding: 16px;
  margin-top: 20px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.site-support-card__title,
.site-support-card__description {
  margin: 0;
}

.site-support-card__title {
  padding-right: 20px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
}

.site-support-card__description {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.6;
}

.site-support-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 10px;
  font-size: 12px;
}

.site-support-card__actions a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.site-support-card__actions a:hover {
  color: var(--vp-c-brand-2);
}

.site-support-card__close {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  width: 24px;
  height: 24px;
  padding: 0;
  color: var(--vp-c-text-3);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 50%;
  place-items: center;
}

.site-support-card__close:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.site-support-card__close path {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.5;
}
</style>
