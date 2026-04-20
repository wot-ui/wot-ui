<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Banner from './components/Banner.vue'
import SpecialSponsor from './components/SpecialSponsor.vue'
import HomeFriendly from './components/HomeFriendly.vue'
import HomeTeam from './components/HomeTeam.vue'
import CustomFooter from './components/CustomFooter.vue'
import WwAds from './components/WwAds.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 全局顶部横幅（Banner 通知条） -->
    <template #layout-top>
      <Banner />
    </template>

    <!-- 首页 Hero 区域下方，展示特别赞助商 -->
    <template #home-hero-after>
      <SpecialSponsor />
    </template>

    <!-- 首页 Features 区域下方，展示团队成员、用户案例与友好链接 -->
    <template #home-features-after>
      <HomeTeam />
      <!-- <HomeCases /> -->
      <HomeFriendly />
    </template>

    <!-- 导航栏 Logo 右侧，品牌标题后缀 -->
    <template #nav-bar-title-after></template>

    <!-- 文档页侧边栏大纲下方，展示广告位 -->
    <template #aside-outline-after>
      <WwAds />
    </template>

    <!-- 全局底部页脚 -->
    <template #layout-bottom>
      <CustomFooter />
    </template>
  </Layout>
</template>
