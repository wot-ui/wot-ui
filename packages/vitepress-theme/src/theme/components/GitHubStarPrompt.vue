<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const REPO_URL = 'https://github.com/wot-ui/wot-ui'
const VISITED_COMPONENTS_KEY = 'wot-ui-star-visited-components'
const SNOOZE_KEY = 'wot-ui-star-prompt-snoozed-at'
const DISMISSED_KEY = 'wot-ui-star-prompt-dismissed'
const OPENED_KEY = 'wot-ui-star-prompt-opened-at'
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
const DWELL_TIME = 60 * 1000

const route = useRoute()
const visible = ref(false)
const ready = ref(false)
let dwellTimer: ReturnType<typeof setTimeout> | undefined

const isEnglish = computed(() => route.path.startsWith('/en-US/'))
const copy = computed(() => {
  if (isEnglish.value) {
    return {
      eyebrow: 'Open source grows with every Star',
      title: 'Has Wot UI helped?',
      description: 'Give us a GitHub Star so more uni-app developers can find it.',
      action: 'Star on GitHub',
      later: 'Later',
      never: 'Do not show again',
      close: 'Close star prompt'
    }
  }

  return {
    eyebrow: '开源项目持续进化中',
    title: 'Wot UI 帮到你了吗？',
    description: '给我们一个 GitHub Star，让更多 uni-app 开发者发现它。',
    action: '去 GitHub Star',
    later: '稍后再说',
    never: '不再提示',
    close: '关闭 Star 提示'
  }
})

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function isComponentDoc(path: string) {
  return path.startsWith('/component/') || path.startsWith('/en-US/component/')
}

function shouldBlockPrompt() {
  if (localStorage.getItem(DISMISSED_KEY) === 'true') return true

  const snoozedAt = Number(localStorage.getItem(SNOOZE_KEY) || 0)
  if (snoozedAt && Date.now() - snoozedAt < SEVEN_DAYS) return true

  const openedAt = Number(localStorage.getItem(OPENED_KEY) || 0)
  if (openedAt && Date.now() - openedAt < THIRTY_DAYS) return true

  return false
}

function tryShowPrompt() {
  if (!ready.value || visible.value || shouldBlockPrompt()) return

  visible.value = true
}

function recordComponentVisit(path: string) {
  if (!isComponentDoc(path)) return

  const visitedComponents = readJson<string[]>(VISITED_COMPONENTS_KEY, [])
  const nextVisitedComponents = Array.from(new Set([...visitedComponents, path])).slice(-20)
  localStorage.setItem(VISITED_COMPONENTS_KEY, JSON.stringify(nextVisitedComponents))

  if (nextVisitedComponents.length >= 2) {
    tryShowPrompt()
  }
}

function handleCopy(event: ClipboardEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  if (target.closest('.vp-doc pre, .vp-doc table, .vp-doc code')) {
    tryShowPrompt()
  }
}

function snooze() {
  visible.value = false
  localStorage.setItem(SNOOZE_KEY, Date.now().toString())
}

function dismissForever() {
  visible.value = false
  localStorage.setItem(DISMISSED_KEY, 'true')
}

function handleStarClick() {
  visible.value = false
  localStorage.setItem(OPENED_KEY, Date.now().toString())
}

onMounted(() => {
  ready.value = true
  recordComponentVisit(route.path)
  document.addEventListener('copy', handleCopy)
  dwellTimer = setTimeout(tryShowPrompt, DWELL_TIME)
})

onUnmounted(() => {
  document.removeEventListener('copy', handleCopy)

  if (dwellTimer) {
    clearTimeout(dwellTimer)
  }
})

watch(
  () => route.path,
  (path) => {
    if (ready.value) {
      recordComponentVisit(path)
    }
  }
)
</script>

<template>
  <ClientOnly>
    <Transition name="github-star-prompt">
      <div v-if="visible" class="github-star-prompt" role="dialog" aria-live="polite" :aria-label="copy.title">
        <div class="github-star-prompt__highlight" aria-hidden="true"></div>
        <button class="github-star-prompt__close" type="button" :aria-label="copy.close" @click="dismissForever">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
            />
          </svg>
        </button>

        <div class="github-star-prompt__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path
              d="M8 .25a.78.78 0 0 1 .7.44l1.9 3.86 4.26.62a.78.78 0 0 1 .43 1.33l-3.08 3 .73 4.24a.78.78 0 0 1-1.13.82L8 12.55l-3.81 2a.78.78 0 0 1-1.13-.82l.73-4.24-3.08-3a.78.78 0 0 1 .43-1.33l4.26-.62L7.3.69A.78.78 0 0 1 8 .25Z"
            />
          </svg>
        </div>

        <div class="github-star-prompt__body">
          <p class="github-star-prompt__eyebrow">{{ copy.eyebrow }}</p>
          <p class="github-star-prompt__title">{{ copy.title }}</p>
          <p class="github-star-prompt__description">{{ copy.description }}</p>
          <div class="github-star-prompt__actions">
            <a class="github-star-prompt__primary" :href="REPO_URL" target="_blank" rel="noreferrer" @click="handleStarClick">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
              {{ copy.action }}
            </a>
            <button class="github-star-prompt__secondary" type="button" @click="snooze">
              {{ copy.later }}
            </button>
            <button class="github-star-prompt__text" type="button" @click="dismissForever">
              {{ copy.never }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.github-star-prompt {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  display: flex;
  box-sizing: border-box;
  width: min(420px, calc(100vw - 32px));
  padding: 20px;
  overflow: hidden;
  border: 1px solid rgba(28, 100, 253, 0.16);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 255, 0.96));
  box-shadow: 0 22px 64px rgba(30, 41, 59, 0.16), 0 8px 22px rgba(28, 100, 253, 0.08);
  color: var(--vp-c-text-1);
  backdrop-filter: blur(16px);
}

.dark .github-star-prompt {
  border-color: rgba(124, 164, 255, 0.24);
  background: linear-gradient(180deg, rgba(35, 39, 50, 0.98), rgba(25, 28, 38, 0.96));
  box-shadow: 0 26px 68px rgba(0, 0, 0, 0.42), 0 8px 24px rgba(28, 100, 253, 0.16);
}

.github-star-prompt__highlight {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vt-c-accent-mint), #f0b429);
}

.github-star-prompt__close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text-3);
  background: rgba(255, 255, 255, 0.58);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.dark .github-star-prompt__close {
  background: rgba(255, 255, 255, 0.06);
}

.github-star-prompt__close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.github-star-prompt__close svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.github-star-prompt__icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: 14px;
  border-radius: 8px;
  color: #b7791f;
  background: linear-gradient(180deg, #fff8da, #ffe9a8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 10px 24px rgba(217, 154, 22, 0.18);
}

.dark .github-star-prompt__icon {
  color: #f6c667;
  background: linear-gradient(180deg, rgba(246, 198, 103, 0.22), rgba(217, 154, 22, 0.12));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 28px rgba(0, 0, 0, 0.24);
}

.github-star-prompt__icon svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.github-star-prompt__body {
  position: relative;
  z-index: 1;
  min-width: 0;
  padding-right: 22px;
}

.github-star-prompt__eyebrow {
  margin: 0 0 4px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
}

.github-star-prompt__title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.4;
}

.github-star-prompt__description {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.github-star-prompt__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.github-star-prompt__primary,
.github-star-prompt__secondary,
.github-star-prompt__text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}

.github-star-prompt__primary {
  gap: 7px;
  border: 1px solid #24292f;
  color: var(--vp-c-white);
  background: #24292f;
  box-shadow: 0 10px 22px rgba(36, 41, 47, 0.18);
}

.github-star-prompt__primary:hover {
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
}

.github-star-prompt__primary svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.github-star-prompt__secondary {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.github-star-prompt__secondary:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
}

.github-star-prompt__text {
  border: 0;
  color: var(--vp-c-text-3);
  background: transparent;
}

.github-star-prompt__text:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.github-star-prompt-enter-active,
.github-star-prompt-leave-active {
  transition: opacity 0.24s, transform 0.24s;
}

.github-star-prompt-enter-from,
.github-star-prompt-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 767px) {
  .github-star-prompt {
    right: 16px;
    bottom: 16px;
    padding: 18px;
  }

  .github-star-prompt__icon {
    width: 42px;
    height: 42px;
  }

  .github-star-prompt__title {
    font-size: 16px;
  }

  .github-star-prompt__actions {
    gap: 7px;
  }
}
</style>
