<script setup lang="ts">
import { computed } from 'vue'
import { useFriendly } from '../composables/friendly'
import { useData } from 'vitepress'

const { data } = useFriendly()
const { lang } = useData()

const links = computed(() => {
  return lang.value === 'en-US' ? [] : data.value.length ? data.value : []
})
</script>

<template>
  <div v-if="links && links.length" class="VPFriendly">
    <div class="container">
      <h2 class="friendly-title">友情链接</h2>
      <div class="links">
        <a v-for="link in links" :key="link.title" :href="link.link" target="_blank" rel="noopener noreferrer" class="link-item">
          <img v-if="link.icon" :src="link.icon" :alt="link.title" class="link-icon" />
          <span class="link-title">{{ link.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFriendly {
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFriendly {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFriendly {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.friendly-title {
  text-align: center;
  margin: 32px 0 20px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.link-item:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.link-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 3px;
  flex-shrink: 0;
}
</style>
