<template>
  <page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>
  <view class="page-overlay">
    <page-wraper>
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

    <wd-overlay :show="show" @click="show = false" />

    <wd-overlay :show="show1" @click="show1 = false" :lock-scroll="lockScroll">
      <view class="wrapper">
        <view class="content" @click.stop="">
          <view class="lock-scroll-row">
            <view class="lock-scroll-text">
              {{ $t('shi-fou-suo-ding-bei-jing-gun-dong-suo-ding-shi-meng-ceng-li-de-nei-rong-ye-jiang-wu-fa-gun-dong') }}
            </view>
            <wd-switch v-model="lockScroll" size="22px" />
          </view>
          <view class="scroll">
            <view class="block" v-for="i in 10" :key="i" @click.stop="">{{ i }}</view>
          </view>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show = ref<boolean>(false)
const show1 = ref<boolean>(false)
const lockScroll = ref<boolean>(true)
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
}

.scroll {
  margin-top: 12px;
  height: 50vh;
  overflow-y: auto;
  width: 300px;
}

.lock-scroll-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.lock-scroll-text {
  font-size: 14px;
  line-height: 20px;
  color: #333;
}

.block {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
