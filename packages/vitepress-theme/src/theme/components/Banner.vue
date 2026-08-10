<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useBanner } from '../composables/banner'

const open = ref(false) // 默认不显示，避免闪烁
const BANNER_STORAGE_KEY = 'wot-banner-dismissed-time'
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000 // 24小时的毫秒数

// 使用 banner composable 获取远程数据
const { data: bannerData } = useBanner()

// 计算当前要显示的 banner 信息（取第一个）
const currentBanner = computed(() => {
  return bannerData.value && bannerData.value.length > 0 ? bannerData.value[0] : null
})

/**
 * 检查是否应该显示横幅
 */
function checkShouldShowBanner() {
  if (typeof window === 'undefined') return true

  const dismissedTime = localStorage.getItem(BANNER_STORAGE_KEY)
  if (!dismissedTime) {
    // 首次访问，添加 banner-show class 以显示横幅
    document.documentElement.classList.add('banner-show')
    return true
  }

  const dismissedTimestamp = parseInt(dismissedTime, 10)
  const currentTime = Date.now()

  // 如果超过24小时，清除记录并显示横幅
  if (currentTime - dismissedTimestamp > TWENTY_FOUR_HOURS) {
    localStorage.removeItem(BANNER_STORAGE_KEY)
    document.documentElement.classList.add('banner-show')
    return true
  }

  // 未超过24小时，确保不显示横幅
  document.documentElement.classList.remove('banner-show')
  return false
}

function dismiss() {
  open.value = false
  document.documentElement.classList.remove('banner-show')

  // 存储当前时间戳到 localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())
  }
}

// 监听 banner 数据变化，只有当有数据时才进行展示逻辑校验
watch(
  currentBanner,
  (newBanner) => {
    if (newBanner) {
      // 有 banner 数据时，检查是否应该显示
      const shouldShow = checkShouldShowBanner()
      open.value = shouldShow
    } else {
      // 没有 banner 数据时，不显示横幅
      open.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="open && currentBanner" class="banner" role="region" aria-label="Announcement">
    <div class="banner__mesh" aria-hidden="true"></div>
    <div class="banner__orb banner__orb--purple" aria-hidden="true"></div>
    <div class="banner__orb banner__orb--cyan" aria-hidden="true"></div>

    <div class="vt-banner-text">
      <span class="vt-banner-badge" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d="M10 1.75c.38 3.96 2.54 6.12 6.5 6.5-3.96.38-6.12 2.54-6.5 6.5-.38-3.96-2.54-6.12-6.5-6.5 3.96-.38 6.12-2.54 6.5-6.5Z" />
          <path
            d="M15.75 13.25c.16 1.66 1.09 2.59 2.75 2.75-1.66.16-2.59 1.09-2.75 2.75-.16-1.66-1.09-2.59-2.75-2.75 1.66-.16 2.59-1.09 2.75-2.75Z"
          />
        </svg>
      </span>
      <p class="vt-banner-title">{{ currentBanner.title }}</p>
      <a target="_blank" class="vt-primary-action" :href="currentBanner.link">
        <span>{{ currentBanner.action }}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="m6 3 5 5-5 5" />
        </svg>
      </a>
    </div>
    <button class="banner__close" aria-label="Close banner" @click="dismiss">
      <svg class="close" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="m7 7 10 10M17 7 7 17" />
      </svg>
    </button>
  </div>
</template>

<style>
html.banner-show {
  --vp-layout-top-height: 64px;
}

/* 移动端优化高度 */
@media (max-width: 768px) {
  html.banner-show {
    --vp-layout-top-height: 56px;
  }
}

@media (max-width: 480px) {
  html.banner-show {
    --vp-layout-top-height: 48px;
  }
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-layout-top-height, 64px);
  padding: 0 64px;
  text-align: center;
  color: var(--vp-c-white);
  background: radial-gradient(circle at 18% -80%, rgba(128, 89, 243, 0.72), transparent 36%),
    radial-gradient(circle at 82% 160%, rgba(69, 199, 255, 0.38), transparent 34%), linear-gradient(110deg, #111127 0%, #111827 48%, #0c1b2a 100%);
  border-bottom: 1px solid rgba(137, 178, 255, 0.22);
  box-shadow: 0 8px 28px rgba(5, 8, 20, 0.28), inset 0 -1px 0 rgba(255, 255, 255, 0.04);
  display: none;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

html.banner-show .banner {
  display: flex;
}

.banner::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 8%, #8b5cf6 34%, #60a5fa 52%, #67e8f9 68%, transparent 92%);
  content: '';
  opacity: 0.85;
}

.banner__mesh {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(90deg, transparent, #000 28%, #000 72%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 28%, #000 72%, transparent);
}

.banner__orb {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  border-radius: 999px;
  filter: blur(28px);
  opacity: 0.55;
}

.banner__orb--purple {
  top: -44px;
  left: 12%;
  width: 260px;
  height: 84px;
  background: rgba(124, 58, 237, 0.48);
}

.banner__orb--cyan {
  right: 10%;
  bottom: -52px;
  width: 320px;
  height: 96px;
  background: rgba(34, 211, 238, 0.34);
}

.banner__close {
  position: absolute;
  right: 18px;
  top: 50%;
  width: 34px;
  height: 34px;
  transform: translateY(-50%);
  padding: 0;
  color: rgba(255, 255, 255, 0.68);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.banner__close:hover {
  color: var(--vp-c-white);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-50%) rotate(4deg);
}

.banner__close:active {
  transform: translateY(-50%) scale(0.94);
}

.banner__close:focus-visible,
.vt-primary-action:focus-visible {
  outline: 2px solid var(--vt-c-accent-cyan);
  outline-offset: 2px;
}

.close {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.8;
}

.vt-banner-text {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 1100px;
  color: var(--vp-c-white);
  line-height: 1;
}

.vt-banner-badge {
  position: relative;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  color: #e8ddff;
  background: linear-gradient(145deg, rgba(151, 117, 250, 0.28), rgba(68, 128, 255, 0.12));
  border: 1px solid rgba(196, 181, 253, 0.32);
  border-radius: 9px;
  box-shadow: 0 0 24px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.vt-banner-badge::after {
  position: absolute;
  inset: -4px;
  border: 1px solid rgba(196, 181, 253, 0.1);
  border-radius: 12px;
  content: '';
}

.vt-banner-badge svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
  filter: drop-shadow(0 0 6px rgba(196, 181, 253, 0.55));
}

.vt-banner-title {
  display: block;
  margin: 0;
  background: linear-gradient(90deg, #d8b4fe 0%, #a5b4fc 42%, #7dd3fc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.vt-primary-action {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  background: linear-gradient(115deg, #7c3aed 0%, #3b82f6 52%, #0891b2 100%);
  color: var(--vp-c-white);
  padding: 8px 13px 8px 15px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  box-shadow: 0 7px 20px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.24);
  font-size: 14px;
  font-weight: 650;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.vt-primary-action::before {
  position: absolute;
  top: -50%;
  left: -35%;
  width: 28px;
  height: 200%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.42), transparent);
  content: '';
  transform: rotate(20deg);
  transition: left 0.55s ease;
}

.vt-primary-action svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  transition: transform 0.25s ease;
}

.vt-primary-action:hover {
  border-color: rgba(255, 255, 255, 0.42);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.vt-primary-action:hover::before {
  left: 115%;
}

.vt-primary-action:hover svg {
  transform: translateX(2px);
}

.vt-primary-action:active {
  transform: translateY(0) scale(0.98);
}

/* 桌面端优化 */
@media (min-width: 769px) {
  .vt-banner-title::after {
    display: inline-block;
    width: 1px;
    height: 16px;
    margin-left: 12px;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.32), transparent);
    content: '';
    vertical-align: -3px;
  }
}

/* 平板端优化 */
@media (max-width: 768px) {
  .banner {
    padding: 0 54px 0 18px;
  }

  .banner__close {
    right: 12px;
    width: 30px;
    height: 30px;
  }

  .close {
    width: 16px;
    height: 16px;
  }

  .vt-banner-text {
    gap: 9px;
  }

  .vt-banner-title {
    overflow: hidden;
    font-size: 15px;
    text-overflow: ellipsis;
  }

  .vt-primary-action {
    padding: 7px 10px 7px 12px;
    font-size: 13px;
  }
}

/* 手机端优化 */
@media (max-width: 640px) {
  .banner {
    padding-left: 12px;
  }

  .vt-banner-text {
    width: 100%;
    gap: 8px;
  }

  .vt-banner-badge {
    width: 26px;
    height: 26px;
    border-radius: 8px;
  }

  .vt-banner-badge svg {
    width: 15px;
    height: 15px;
  }
}

/* 小屏手机优化 */
@media (max-width: 480px) {
  .banner {
    padding: 0 46px 0 12px;
  }

  .banner__close {
    right: 9px;
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }

  .vt-banner-text {
    justify-content: flex-start;
    gap: 7px;
  }

  .vt-banner-badge {
    display: none;
  }

  .vt-banner-title {
    min-width: 0;
    font-size: 12px;
    text-align: left;
  }

  .vt-primary-action {
    font-size: 12px;
    padding: 6px 8px 6px 9px;
    border-radius: 8px;
  }
}

/* 超小屏优化 */
@media (max-width: 375px) {
  .banner {
    padding-left: 9px;
  }

  .vt-banner-title {
    font-size: 11px;
  }

  .vt-primary-action {
    font-size: 11px;
    padding: 5px 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner__close,
  .vt-primary-action,
  .vt-primary-action::before,
  .vt-primary-action svg {
    transition: none;
  }
}
</style>
