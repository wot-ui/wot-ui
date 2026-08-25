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

const BLOCK_CONFIRMATION_DELAY = 200

let wwadsScript: HTMLScriptElement | null = null
let adBait: HTMLElement | null = null
let contentObserver: MutationObserver | null = null
let viewportObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let verificationFrame: number | undefined
let confirmationTimer: number | undefined
let hostInViewport = false

function cancelVerification() {
  if (verificationFrame !== undefined) {
    window.cancelAnimationFrame(verificationFrame)
    verificationFrame = undefined
  }
  if (confirmationTimer !== undefined) {
    window.clearTimeout(confirmationTimer)
    confirmationTimer = undefined
  }
}

function revealSupportCard() {
  cancelVerification()
  contentObserver?.disconnect()
  viewportObserver?.disconnect()
  resizeObserver?.disconnect()
  showSupportCard.value = true
}

function isExplicitlyHidden(element: Element) {
  const style = window.getComputedStyle(element)

  return style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse' || Number(style.opacity) === 0
}

function isVisible(element: Element) {
  const rect = element.getBoundingClientRect()

  return !isExplicitlyHidden(element) && rect.width > 0 && rect.height > 0
}

function hasVisibleAd() {
  const element = wwadsSlot.value
  if (!element || element.childElementCount === 0) return false

  const knownCreativeElements = Array.from(element.querySelectorAll(':scope > .wwads-img, :scope > .wwads-content .wwads-text'))
  const contentElements = knownCreativeElements.length
    ? knownCreativeElements
    : Array.from(element.children).filter((child) => !child.classList.contains('wwads-hide'))

  return isVisible(element) && contentElements.some(isVisible)
}

function hasBlockingEvidence() {
  const slot = wwadsSlot.value
  const host = wwadsHost.value
  if (!hostInViewport || !host || !slot) return false
  if (slot.parentElement !== host) return false
  if (slot.childElementCount > 0 && hasVisibleAd()) return false

  if (isExplicitlyHidden(slot) || adBait?.parentElement !== host || !isVisible(adBait)) return true

  return slot.childElementCount > 0
}

function confirmBlocking() {
  confirmationTimer = undefined
  if (hasBlockingEvidence()) revealSupportCard()
}

function verifyAd() {
  verificationFrame = undefined
  if (!hasBlockingEvidence()) {
    if (confirmationTimer !== undefined) {
      window.clearTimeout(confirmationTimer)
      confirmationTimer = undefined
    }
    return
  }

  if (confirmationTimer === undefined) {
    confirmationTimer = window.setTimeout(confirmBlocking, BLOCK_CONFIRMATION_DELAY)
  }
}

function scheduleVerification() {
  if (!hostInViewport || verificationFrame !== undefined) return

  verificationFrame = window.requestAnimationFrame(verifyAd)
}

function observeAdContent() {
  const slot = wwadsSlot.value
  if (!slot) return

  resizeObserver?.disconnect()
  resizeObserver?.observe(slot)
  if (adBait) resizeObserver?.observe(adBait)
  Array.from(slot.children).forEach((child) => resizeObserver?.observe(child))
  scheduleVerification()
}

onMounted(() => {
  const host = wwadsHost.value
  const slot = wwadsSlot.value
  if (!wwadsId || !host || !slot) return

  adBait = document.createElement('div')
  adBait.className = 'adsbox ad-banner ad-placement'
  adBait.setAttribute('aria-hidden', 'true')
  adBait.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;pointer-events:none;'
  host.appendChild(adBait)

  // 空广告位可能源于懒加载或网络问题，只有明确的隐藏证据才视为拦截。
  contentObserver = new MutationObserver(observeAdContent)
  contentObserver.observe(slot, { attributes: true, attributeFilter: ['class', 'hidden', 'style'], childList: true, subtree: true })

  resizeObserver = new ResizeObserver(scheduleVerification)
  observeAdContent()

  viewportObserver = new IntersectionObserver(([entry]) => {
    hostInViewport = entry.isIntersecting
    if (hostInViewport) scheduleVerification()
  })
  viewportObserver.observe(host)

  wwadsScript = document.createElement('script')
  wwadsScript.src = 'https://cdn.wwads.cn/js/makemoney.js'
  wwadsScript.async = true
  wwadsScript.onerror = scheduleVerification
  host.appendChild(wwadsScript)
})

onBeforeUnmount(() => {
  cancelVerification()
  contentObserver?.disconnect()
  viewportObserver?.disconnect()
  resizeObserver?.disconnect()
  wwadsScript?.remove()
  adBait?.remove()
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
