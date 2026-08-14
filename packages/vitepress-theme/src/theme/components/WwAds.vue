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

      <div class="site-support-card__header">
        <span class="site-support-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 20.5S4 16 4 9.8C4 6.6 6.1 4.5 8.9 4.5c1.5 0 2.5.7 3.1 1.6.6-.9 1.6-1.6 3.1-1.6 2.8 0 4.9 2.1 4.9 5.3 0 6.2-8 10.7-8 10.7Z" />
          </svg>
        </span>
        <div class="site-support-card__content">
          <p class="site-support-card__title">支持 Wot UI</p>
          <p class="site-support-card__description">本站依靠赞助维持运营，感谢将我们加入白名单。</p>
        </div>
      </div>

      <div class="site-support-card__actions">
        <a class="site-support-card__primary" href="https://wwads.cn/page/whitelist-wwads" target="_blank" rel="nofollow noopener">
          加入白名单
          <svg aria-hidden="true" viewBox="0 0 12 12">
            <path d="m4 2 4 4-4 4" />
          </svg>
        </a>
        <a class="site-support-card__secondary" href="/reward/sponsor">赞助本站</a>
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
  box-sizing: border-box;
  padding: 16px;
  margin-top: 20px;
  overflow: hidden;
  color: var(--vp-c-text-2);
  background: linear-gradient(145deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft) 52%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-1);
}

.site-support-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vt-c-accent-mint));
  content: '';
}

.site-support-card__header {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding-right: 18px;
}

.site-support-card__icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-radius: 8px;
}

.site-support-card__icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.site-support-card__content {
  min-width: 0;
}

.site-support-card__title,
.site-support-card__description {
  margin: 0;
}

.site-support-card__title {
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
}

.site-support-card__description {
  margin-top: 3px;
  font-size: 12px;
  line-height: 1.6;
}

.site-support-card__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;
  font-size: 12px;
}

.site-support-card__primary,
.site-support-card__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 10px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s, transform 0.2s;
}

.site-support-card__primary {
  gap: 4px;
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.site-support-card__primary:hover {
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-2);
}

.site-support-card__primary svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.site-support-card__secondary {
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}

.site-support-card__secondary:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-2);
}

.site-support-card__primary:active,
.site-support-card__secondary:active {
  transform: translateY(1px);
}

.site-support-card__primary:focus-visible,
.site-support-card__secondary:focus-visible,
.site-support-card__close:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
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
  border-radius: 6px;
  place-items: center;
  transition: color 0.2s, background-color 0.2s;
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

@media (prefers-reduced-motion: reduce) {
  .site-support-card__primary,
  .site-support-card__secondary,
  .site-support-card__close {
    transition: none;
  }
}
</style>
