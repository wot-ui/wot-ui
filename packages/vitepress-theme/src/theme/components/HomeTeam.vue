<script setup lang="ts">
import { computed } from 'vue'
import { useTeam } from '../composables/team'
import { useData } from 'vitepress'

const { data } = useTeam()
const { lang } = useData()

const members = computed(() => {
  return lang.value === 'en-US' ? [] : data.value.length ? data.value : []
})

const tagVariants = ['theme-primary', 'theme-success', 'theme-warning', 'theme-danger', 'theme-pink', 'theme-cyan', 'theme-purple', 'theme-volcano']

const hashString = (text: string) => {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const getTagClass = (memberName: string, tag: string, index: number) => {
  const variantIndex = hashString(`${memberName}-${tag}-${index}`) % tagVariants.length
  return `status-tag ${tagVariants[variantIndex]}`
}
</script>

<template>
  <div v-if="members && members.length" class="VPTeam">
    <div class="container">
      <h1 class="team-title">团队成员</h1>
      <div class="items">
        <div v-for="member in members" :key="member.name" class="item grid-3">
          <div class="VPFeature">
            <article class="box">
              <img :src="member.avatar" :alt="member.name" class="avatar" />
              <h2 class="title">{{ member.name }}</h2>
              <p class="subtitle">{{ member.title }}</p>
              <div v-if="member.tags && member.tags.length" class="tags">
                <span v-for="(tag, index) in member.tags" :key="`${member.name}-${tag}-${index}`" :class="getTagClass(member.name, tag, index)">
                  {{ tag }}
                </span>
              </div>
              <p v-if="member.desc" class="details">{{ member.desc }}</p>
              <div class="socials">
                <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPTeam {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPTeam {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPTeam {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.team-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  font-size: 24px;
}

/* 与 HomeCases 完全相同的网格体系 */
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

/* 与 VPFeature 完全相同的卡片样式 */
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
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

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.subtitle {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin: 0 0 12px;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  border: 1px solid transparent;
}

.theme-primary {
  color: #4d80f0;
  background: #eaf1fa;
}

.theme-success {
  color: #34d19d;
  background: #e1f7f0;
}

.theme-warning {
  color: #f0883a;
  background: #fdf2eb;
}

.theme-danger {
  color: #fa4350;
  background: #fee9e7;
}

.theme-pink {
  color: #e44386;
  background: #fcecf3;
}

.theme-cyan {
  color: #1a9fb8;
  background: #e4f5f8;
}

.theme-purple {
  color: #8c5ff2;
  background: #f1ecfe;
}

.theme-volcano {
  color: #e5603a;
  background: #fceeea;
}

.details {
  flex-grow: 1;
  padding-top: 4px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
}

.socials {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
