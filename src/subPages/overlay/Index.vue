<template>
  <page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>
  <view class="page-overlay">
    <page-wraper>
      <wd-overlay :show="show" @click="show = false" />

      <wd-overlay :show="show1" @click="show1 = false" :lock-scroll="lockScroll">
        <view class="page-overlay__wrapper">
          <view class="page-overlay__content" @click.stop="">
            <view class="page-overlay__lock-scroll-row">
              <view class="page-overlay__lock-scroll-text">
                {{ $t('shi-fou-suo-ding-bei-jing-gun-dong-suo-ding-shi-meng-ceng-li-de-nei-rong-ye-jiang-wu-fa-gun-dong') }}
              </view>
              <wd-switch v-model="lockScroll" size="22px" />
            </view>
            <view class="page-overlay__scroll">
              <view class="page-overlay__block" v-for="i in 10" :key="i" @click.stop="">{{ i }}</view>
            </view>
          </view>
        </view>
      </wd-overlay>
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-button type="primary" @click="show = true">{{ $t('xian-shi-zhe-zhao-ceng') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('qian-ru-nei-rong-0')">
          <wd-button type="primary" @click="show1 = true">{{ $t('qian-ru-nei-rong-0') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show = ref<boolean>(false)
const show1 = ref<boolean>(false)
const lockScroll = ref<boolean>(true)
</script>
<style lang="scss" scoped>
.page-overlay {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__content {
    padding: $padding-extra-loose;
    border-radius: $radius-extra-large;
    background-color: $filled-oppo;
  }

  &__scroll {
    width: 300px;
    height: 50vh;
    margin-top: $spacing-loose;
    overflow-y: auto;
  }

  &__lock-scroll-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-loose;
  }

  &__lock-scroll-text {
    color: $text-secondary;
    font-size: $typography-body-size-main;
    line-height: $typography-body-line-height-size-large;
  }

  &__block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
  }
}
</style>
