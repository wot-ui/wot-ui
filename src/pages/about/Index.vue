<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page-about">
      <view class="page-about__header">
        <view class="page-about__title">{{ $t('guanYuWoMen') }}</view>
        <view class="page-about__desc">
          {{ $t('woShiBuRuMoYuQuYiGeQianDuanDaGongZiWoHeWoDeXiaoHuoBanMenZhengZaiZhiLiYuKaiFaQingLiangGaoXiaoDeUniappZuJianKu') }}
        </view>
      </view>
      <view class="page-about__body">
        <view class="page-about__team">
          <view class="page-about__section-title">{{ $t('heXinTuanDui') }}</view>
          <view class="page-about__team-list">
            <view v-for="(collaborator, index) in githubData.collaborators" :key="index" class="page-about__team-member">
              <image :src="collaborator.avatar_url" class="page-about__team-avatar" />
              <view class="page-about__team-name" :title="collaborator.login">{{ collaborator.login }}</view>
            </view>
          </view>
        </view>

        <view class="page-about__links">
          <view class="page-about__section-title">{{ $t('gengDuoXinXi') }}</view>
          <wd-cell-group border>
            <wd-cell
              :title="$t('yuYanQieHuan')"
              title-width="var(--wot-n-200)"
              :label="$t('dangQianYuYan') + ': ' + (currentLang === 'zh-CN' ? '中文' : 'English')"
              is-link
              @click="showLanguageSwitch = true"
            ></wd-cell>
            <!-- #ifndef MP-ALIPAY -->

            <wd-cell
              :title="$t('guanZhuGongZhongHao')"
              title-width="var(--wot-n-200)"
              :label="$t('uniappJiaoChengZuJianKuXunXiYiShouZhangWo')"
              @click="openWeChat"
              is-link
            ></wd-cell>
            <wd-cell
              :title="$t('juanZeng')"
              title-width="var(--wot-n-200)"
              :label="$t('meiYiFenJuanZengDuShiDuiWoMenMoDaDeGuLi')"
              @click="donate"
              is-link
            ></wd-cell>
            <!-- #ifdef MP-WEIXIN -->
            <wd-cell
              :title="$t('guanKanJiLiGuangGao')"
              title-width="var(--wot-n-200)"
              :label="$t('meiCiGuanKanDuShiDuiWoMenDeZhiChiXieXie')"
              @click="watchAd"
              is-link
            ></wd-cell>
            <!-- #endif -->
            <!-- #endif -->
          </wd-cell-group>
        </view>
      </view>
      <wd-action-sheet
        v-model="showLanguageSwitch"
        :actions="languageActions"
        :cancel-text="$t('qu-xiao')"
        :title="$t('yuYanQieHuan')"
        @select="handleLanguageSelect"
      />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18nSync } from '../../hooks/useI18nSync'

// 使用国际化钩子
const { setLocale, currentLang } = useI18nSync()

// 控制语言切换弹出层的显示
const showLanguageSwitch = ref(false)

// 语言切换选项
const languageActions = computed(() => [
  {
    name: '中文 🇨🇳',
    color: currentLang.value === 'zh-CN' ? 'var(--wot-primary-6, #0083ff)' : ''
  },
  {
    name: 'English 🇺🇸',
    color: currentLang.value === 'en-US' ? 'var(--wot-primary-6, #0083ff)' : ''
  }
])

// 处理语言选择
const handleLanguageSelect = ({ index }: { index: number }) => {
  const locale = index === 0 ? 'zh-CN' : 'en-US'
  switchLanguage(locale)
}

const githubData = ref<any>({
  collaborators: [
    {
      login: '不如摸鱼去',
      avatar_url: 'https://avatars.githubusercontent.com/u/26426873?v=4'
    },
    {
      login: 'jasper-ops',
      avatar_url: 'https://avatars.githubusercontent.com/u/85024227?v=4'
    },
    {
      login: '二狗',
      avatar_url: 'https://avatars.githubusercontent.com/u/50100966?v=4'
    },
    {
      login: 'RJQingHuan',
      avatar_url: 'https://avatars.githubusercontent.com/u/53939074?v=4'
    },
    {
      login: 'skiyee',
      avatar_url: 'https://avatars.githubusercontent.com/u/120664167?v=4'
    }
  ],
  contributors: [
    {
      login: 'contributor1',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4'
    },
    {
      login: 'contributor2',
      avatar_url: 'https://avatars.githubusercontent.com/u/87654321?v=4'
    }
  ]
})

// 切换语言
const switchLanguage = (locale: string) => {
  setLocale(locale)
}

// 打开公众号二维码
const openWeChat = () => {
  uni.previewImage({
    urls: ['https://wot-ui.cn/wechatPublicAccount.png']
  })
}

// 打开捐赠二维码
const donate = () => {
  uni.previewImage({
    urls: ['https://wot-ui.cn/weixinQrcode.jpg']
  })
  // 打开捐赠页面
}

const watchAd = () => {
  uni.navigateTo({
    url: '/subPages/wxRewardAd/Index'
  })
}
</script>

<style lang="scss" scoped>
.page-about {
  &__header {
    padding: $padding-extra-loose $padding-extra-loose 0 $padding-super-loose;
  }

  &__title {
    text-align: left;
    font-size: $typography-title-size-extra-large;
    font-weight: $font-weight-semibold;
    line-height: $typography-title-line-height-size-extra-large;
    color: $text-main;
  }

  &__desc {
    margin-top: $spacing-super-loose;
    text-align: left;
    font-size: $typography-body-size-main;
    line-height: $typography-body-line-height-size-main;
    color: $text-secondary;
  }

  &__body {
    padding: 0 $padding-extra-loose $padding-spacious $padding-super-loose;
    user-select: none;
    border-radius: $radius-extra-large;
  }

  &__team,
  &__links {
    margin-top: $spacing-super-loose;
  }

  &__section-title {
    margin-bottom: $spacing-main;
    font-size: $typography-title-size-main;
    font-weight: $font-weight-bold;
    line-height: $typography-title-line-height-size-main;
    color: $text-main;
  }

  &__team-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__team-member {
    flex: 1 1 25%;
    max-width: 25%;
    box-sizing: border-box;
    margin-bottom: $spacing-main;
    text-align: center;
    transition: transform 0.3s;
  }

  &__team-member:hover {
    transform: scale(1.05);
  }

  &__team-avatar {
    width: $n-60;
    height: $n-60;
    margin: 0 auto;
    border: $stroke-light solid $primary-6;
    border-radius: $radius-full;
  }

  &__team-name {
    max-width: 100%;
    margin: $spacing-super-tight auto 0;
    color: $text-main;
    font-size: $typography-body-size-main;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
