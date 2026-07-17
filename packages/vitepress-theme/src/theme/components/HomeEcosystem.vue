<script setup lang="ts">
import { computed } from 'vue'
import { useEcosystem } from '../composables/ecosystem'
import { useData } from 'vitepress'

const { data } = useEcosystem()
const { lang } = useData()

const groups = computed(() => {
  return data.value.length ? data.value : []
})

const sectionTitle = computed(() => {
  return lang.value === 'en-US' ? 'Ecosystem' : '生态'
})

const isExternalLink = (link: string) => {
  return /^https?:\/\//.test(link)
}
</script>

<template>
  <div v-if="groups && groups.length" class="VPEcosystem">
    <div class="container">
      <h1 class="ecosystem-title">{{ sectionTitle }}</h1>

      <section v-for="group in groups" :key="group.text" class="group">
        <h2 class="group-title">{{ group.text }}</h2>
        <div class="items">
          <div v-for="item in group.items" :key="`${group.text}-${item.text}`" class="item grid-3">
            <a
              :href="item.link"
              class="VPFeature"
              :target="isExternalLink(item.link) ? '_blank' : undefined"
              :rel="isExternalLink(item.link) ? 'noopener noreferrer' : undefined"
            >
              <article class="box">
                <h2 class="title">{{ item.text }}</h2>
                <p v-if="item.desc" class="details">{{ item.desc }}</p>
                <!-- <span class="link-hint" aria-hidden="true">→</span> -->
              </article>
            </a>
          </div>
        </div>
      </section>
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

.group {
  margin-bottom: 32px;
}

.group:last-child {
  margin-bottom: 0;
}

.group-title {
  text-align: center;
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-2);
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
