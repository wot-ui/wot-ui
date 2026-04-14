<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page-home">
      <view class="page-home__header">
        <view class="page-home__title">
          <image src="../images/logo.svg" mode="widthFix" class="page-home__title-logo" />
          <text class="page-home__title-name">Wot UI</text>
          <text class="page-home__title-separator">@</text>
          <text class="page-home__title-version">{{ packageConfig.version }}</text>
        </view>
        <view class="page-home__desc">
          {{ $t('ai-you-hao-de-she-ji-xi-tong-ti-gong-80-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti') }}
        </view>
      </view>
      <view class="page-home__body">
        <wd-collapse v-model="active">
          <wd-collapse-item v-for="(item, index) in list" :key="index" :title="item.name" :name="item.id">
            <template #title="{ expanded }">
              <view :class="`page-home__body-item-header ${expanded ? 'page-home__body-item-header--expanded' : ''}`">
                <wd-icon :name="item.icon" custom-class="page-home__body-item-header-icon"></wd-icon>
                <text class="page-home__body-item-header-text">{{ item.name }}</text>
              </view>
            </template>
            <wd-cell-group size="large">
              <wd-cell
                v-for="(page, j) in item.pages"
                :key="j"
                is-link
                :title="page.name"
                @click="handleClick(`/subPages/${page.id}/Index`)"
              ></wd-cell>
            </wd-cell-group>
          </wd-collapse-item>
        </wd-collapse>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import packageConfig from '../../../package.json'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'
import { getHomeCatalog } from '../../config/component-catalog'

const { t, locale } = useI18n()

const active = ref([])

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

// 使用computed使list响应语言变化
const list = computed(() => getHomeCatalog({ locale: locale.value, t: (key) => t(key) }))

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

onShareAppMessage(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})

onShareTimeline(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti-0'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})
</script>

<style lang="scss" scoped>
.page-home {
  &__header {
    padding: $padding-ultra-loose $padding-extra-loose;
    background: $filled-oppo;
  }
  &__title {
    color: $primary-6;
    margin-bottom: $spacing-extra-loose;
    display: flex;
    align-items: center;

    &-logo {
      width: $n-32;
      height: auto;
      display: block;
      margin-right: $spacing-tight;
    }

    &-name {
      font-size: $typography-title-size-large;
      font-weight: $font-weight-medium;
      line-height: $typography-title-line-height-size-large;
    }
    &-version,
    &-separator {
      font-size: $typography-body-size-main;
      font-weight: $font-weight-medium;
      line-height: $typography-body-line-height-size-main;
    }

    &-separator {
      margin: 0 $spacing-super-tight;
    }
  }

  &__desc {
    color: $text-secondary;
    font-size: $typography-body-size-main;
    font-weight: $font-weight-medium;
    line-height: $typography-body-line-height-size-main;
  }

  &__body {
    padding: $spacing-extra-loose;
    box-sizing: border-box;

    :deep() {
      .wd-collapse-item__body {
        padding: 0;
      }

      .wd-cell {
        padding: $spacing-extra-loose;
      }

      .wd-cell__left {
        flex: 1 1 auto;
      }

      .wd-collapse {
        background: transparent;
      }

      .wd-collapse-item {
        background: $filled-oppo;
        border-radius: $radius-large;
        overflow: hidden;

        &::after {
          display: none;
        }
        &:not(:last-child) {
          margin-bottom: $spacing-loose;
        }
      }
    }
  }

  &__body-item-header {
    display: flex;
    align-items: center;
    color: $text-main;
    font-size: $typography-body-size-extra-large;
    font-weight: $typography-body-font-weight-strong;
    line-height: $typography-body-line-height-size-large;

    :deep() {
      .page-home__body-item-header-icon {
        margin-right: $spacing-tight;
        font-size: $n-20;
        color: $text-secondary;
      }
    }

    &--expanded {
      color: $primary-6;
      :deep() {
        .page-home__body-item-header-icon {
          color: $primary-6;
        }
      }
    }
  }

  &__body-item-header-text {
    color: inherit;
  }
}
</style>
