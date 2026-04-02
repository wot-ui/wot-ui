<template>
  <page-wraper>
    <wd-navbar fixed placeholder :title="$t('navbar-dao-hang-tiao')" left-arrow safeAreaInsetTop @click-left="handleClickLeft"></wd-navbar>

    <view class="page-navbar">
      <demo-group title="组件类型" transparent>
        <demo-group-item no-padding title="基础用法">
          <wd-navbar :title="$t('biaoTi-0')"></wd-navbar>
        </demo-group-item>
        <demo-group-item no-padding title="返回上级" transparent>
          <wd-navbar :title="$t('biaoTi-0')" :left-text="$t('fan-hui')" left-arrow @click-left="handleClickLeft"></wd-navbar>
        </demo-group-item>
        <demo-group-item no-padding title="右侧按钮" transparent>
          <wd-navbar
            :title="$t('biaoTi-0')"
            :left-text="$t('fan-hui')"
            left-arrow
            :right-text="$t('an-niu')"
            @click-left="handleClickLeft"
            @click-right="handleClickRight"
          ></wd-navbar>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态" transparent>
        <demo-group-item no-padding title="禁用按钮" transparent>
          <wd-navbar
            :title="$t('biaoTi-0')"
            :left-text="$t('fan-hui')"
            :right-text="$t('an-niu')"
            left-arrow
            left-disabled
            right-disabled
          ></wd-navbar>
        </demo-group-item>
      </demo-group>

      <demo-group title="内容形态" transparent>
        <demo-group-item no-padding title="使用插槽" transparent>
          <wd-navbar :title="$t('biaoTi-0')" @click-left="handleClickLeft">
            <template #left>
              <wd-icon name="left" size="24px" class="wd-navbar__arrow" />
            </template>
            <template #right>
              <wd-icon name="search-line" size="18" />
            </template>
          </wd-navbar>
        </demo-group-item>
        <demo-group-item no-padding title="胶囊样式" transparent>
          <wd-navbar :title="$t('biaoTi-0')" :left-text="$t('fan-hui')" :right-text="$t('she-zhi')" left-arrow>
            <template #capsule>
              <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome"></wd-navbar-capsule>
            </template>
          </wd-navbar>
        </demo-group-item>
        <demo-group-item no-padding title="带搜索栏" transparent>
          <wd-navbar :left-text="$t('fan-hui')" :right-text="$t('she-zhi')" left-arrow>
            <template #title>
              <view class="search-box">
                <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
              </view>
            </template>
          </wd-navbar>
        </demo-group-item>
      </demo-group>
    </view>
    <view style="height: 500rpx"></view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const keyword = ref('')
const { show: showToast } = useToast()

function handleClickLeft() {
  uni.navigateBack({})
}

function handleClickRight() {
  showToast(t('an-niu-0'))
}

function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
</script>
<style lang="scss" scoped>
.page-navbar {
  .search-box {
    display: flex;
    height: 100%;
    align-items: center;
    --wot-search-padding: 0;
    --wot-search-side-padding: 0;
    :deep() {
      .wd-search {
        background: transparent;
      }
    }
  }
}
</style>
