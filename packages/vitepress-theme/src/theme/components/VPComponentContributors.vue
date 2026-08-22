<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { wotThemeOptionsKey } from '../options'
import type { WotResolvedThemeOptions } from '../../types'

interface Contributor {
  id?: string
  login?: string
  name?: string
  avatarUrl?: string
  profileUrl?: string
  contributions?: number
}

interface ContributorManifest {
  repository?: string
  components?: Record<string, Contributor[]>
}

const route = useRoute()
const { lang } = useData()
const themeOptions = inject(wotThemeOptionsKey) as WotResolvedThemeOptions | undefined
const contributors = ref<Contributor[]>([])
const repository = ref('')
const loaded = ref(false)

const componentId = computed(() => {
  const match = route.path.match(/\/component\/([^/.]+?)(?:\.html)?$/)
  return match?.[1] ?? ''
})

const isComponentRoute = computed(() => {
  const options = themeOptions?.contributors
  if (!options || !componentId.value) return false

  if (options.excludePatterns?.some((pattern) => route.path.includes(pattern))) return false
  if (options.routePatterns?.length) return options.routePatterns.some((pattern) => route.path.includes(pattern))
  return !route.path.includes('/use-')
})

const visibleContributors = computed(() => {
  const maxCount = themeOptions?.contributors && themeOptions.contributors.maxCount
  return contributors.value.slice(0, maxCount && maxCount > 0 ? maxCount : 8)
})

const remainingCount = computed(() => Math.max(contributors.value.length - visibleContributors.value.length, 0))
const contributorsLink = computed(() => {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository.value)) return ''
  return `https://github.com/${repository.value}/graphs/contributors`
})
const isEnglish = computed(() => String(lang.value).toLowerCase().startsWith('en'))
const title = computed(() => (isEnglish.value ? 'Contributors' : '贡献者'))
const description = computed(() =>
  isEnglish.value ? 'Thanks to everyone who contributed code to this component.' : '感谢所有为该组件贡献代码的开发者。'
)

function getContributorKey(contributor: Contributor) {
  return contributor.id || contributor.login || contributor.name || 'unknown'
}

function getContributorName(contributor: Contributor) {
  return contributor.name || contributor.login || 'Contributor'
}

function getContributorInitial(contributor: Contributor) {
  return Array.from(getContributorName(contributor))[0]?.toUpperCase() || '?'
}

function getContributorLinkAttrs(contributor: Contributor) {
  if (!contributor.profileUrl) return {}
  return {
    href: contributor.profileUrl,
    target: '_blank',
    rel: 'noreferrer'
  }
}

async function loadContributors() {
  if (!isComponentRoute.value || loaded.value) return
  loaded.value = true
  const requestedComponentId = componentId.value

  const dataUrl = themeOptions?.contributors && themeOptions.contributors.dataUrl
  if (!dataUrl || typeof fetch === 'undefined') return

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(dataUrl, { signal: controller.signal })
    if (!response.ok) return
    const manifest = (await response.json()) as ContributorManifest
    if (requestedComponentId !== componentId.value) return
    repository.value = manifest.repository ?? ''
    contributors.value = manifest.components?.[requestedComponentId] ?? []
  } catch {
    // 贡献者属于增强信息，数据加载失败时不影响文档正文。
  } finally {
    clearTimeout(timeout)
  }
}

onMounted(loadContributors)
watch(componentId, () => {
  contributors.value = []
  loaded.value = false
  loadContributors()
})
</script>

<template>
  <section v-if="isComponentRoute && visibleContributors.length" class="VPComponentContributors">
    <div class="title">{{ title }}</div>
    <div class="list" :aria-label="title">
      <component
        v-for="contributor in visibleContributors"
        :key="getContributorKey(contributor)"
        :is="contributor.profileUrl ? 'a' : 'span'"
        class="item"
        v-bind="getContributorLinkAttrs(contributor)"
        :title="getContributorName(contributor)"
        :aria-label="getContributorName(contributor)"
      >
        <img v-if="contributor.avatarUrl" class="avatar" :src="contributor.avatarUrl" :alt="getContributorName(contributor)" loading="lazy" />
        <span v-else class="avatar-fallback" aria-hidden="true">{{ getContributorInitial(contributor) }}</span>
      </component>
      <a v-if="remainingCount && contributorsLink" class="more" :href="contributorsLink" target="_blank" rel="noreferrer">+{{ remainingCount }}</a>
    </div>
    <div class="description">{{ description }}</div>
  </section>
</template>

<style scoped>
.VPComponentContributors {
  margin: 56px 0 40px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.item,
.more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: transform 0.2s ease;
}

.item:hover,
.more:hover {
  transform: translateY(-2px);
}

.avatar {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--vp-c-bg-soft);
}

.avatar-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 18px;
  font-weight: 600;
}

.more {
  width: auto;
  min-width: 48px;
  padding: 0 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  font-size: 14px;
}

.description {
  margin-top: 18px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 24px;
}

@media (max-width: 767px) {
  .VPComponentContributors {
    margin-top: 40px;
    padding-top: 24px;
  }

  .title {
    margin-bottom: 16px;
    font-size: 18px;
    line-height: 26px;
  }

  .item,
  .more {
    width: 44px;
    height: 44px;
  }

  .more {
    min-width: 44px;
  }

  .description {
    margin-top: 16px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
