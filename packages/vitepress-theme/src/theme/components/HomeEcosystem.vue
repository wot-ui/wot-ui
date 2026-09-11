<script setup lang="ts">
import { computed } from 'vue'
import { useEcosystem } from '../composables/ecosystem'
import { useData } from 'vitepress'

const { data } = useEcosystem()
const { lang } = useData()

const items = computed(() => {
  if (lang.value === 'en-US') return []
  return data.value.find((group) => group.text === '官方生态')?.items || []
})

const isExternalLink = (link: string) => {
  return /^https?:\/\//.test(link)
}
</script>

<template>
  <div v-if="items.length" class="VPEcosystem">
    <div class="container">
      <h1 class="ecosystem-title">官方生态</h1>

      <div class="items">
        <div v-for="item in items" :key="item.text" class="item grid-3">
          <a
            :href="item.link"
            class="VPFeature"
            :target="isExternalLink(item.link) ? '_blank' : undefined"
            :rel="isExternalLink(item.link) ? 'noopener noreferrer' : undefined"
          >
            <article class="box">
              <img :src="item.icon" :alt="item.text" class="icon" />
              <h2 class="title">{{ item.text }}</h2>
              <p v-if="item.desc" class="details">{{ item.desc }}</p>
              <!-- <span class="link-hint" aria-hidden="true">→</span> -->
            </article>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPEcosystem {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPEcosystem {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPEcosystem {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.ecosystem-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  font-size: 24px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .item.grid-3 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-3 {
    width: calc(100% / 3);
  }
}

.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  text-decoration: none;
  color: inherit;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  height: 100%;
  text-align: center;
}

.icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 20px;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
}

.details {
  flex-grow: 1;
  padding-top: 4px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
}

.link-hint {
  margin-top: auto;
  color: var(--vp-c-text-3);
  font-size: 16px;
  line-height: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.VPFeature:hover .link-hint {
  color: var(--vp-c-brand-1);
  transform: translateX(2px);
}
</style>
