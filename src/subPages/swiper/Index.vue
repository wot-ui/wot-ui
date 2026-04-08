<template>
  <page-wraper>
    <view class="page-swiper">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item no-padding :title="$t('dian-zhuang-zhi-shi-qi')">
          <wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots' }"></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('dian-tiao-zhuang-zhi-shi-qi')">
          <wd-swiper :list="swiperList" autoplay v-model:current="current1" :indicator="{ type: 'dots-bar' }"></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('shu-zi-zhi-shi-qi')">
          <wd-swiper
            :list="swiperList"
            autoplay
            v-model:current="current2"
            :indicator="{ type: 'fraction' }"
            indicator-position="bottom-right"
          ></wd-swiper>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item no-padding :title="$t('shou-dong-qie-huan')">
          <wd-swiper :list="swiperList" :autoplay="false" v-model:current="current3" :indicator="{ showControls: true }" :loop="false"></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('chui-zhi-fang-xiang')">
          <wd-swiper
            :list="swiperList"
            direction="vertical"
            indicator-position="right"
            autoplay
            v-model:current="current6"
            :indicator="{ type: 'dots-bar' }"
          ></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('zhi-ding-valuekey-he-textkey')">
          <wd-swiper value-key="url" text-key="title" :list="customSwiperList" autoplay v-model:current="current9"></wd-swiper>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item no-padding :title="$t('ka-pian-yang-shi')">
          <view class="card-swiper">
            <wd-swiper
              autoplay
              v-model:current="current4"
              custom-indicator-class="custom-indicator-class"
              custom-image-class="custom-image"
              custom-next-image-class="custom-image-prev"
              custom-prev-image-class="custom-image-prev"
              :indicator="{ type: 'dots' }"
              :list="swiperList"
              previousMargin="24px"
              nextMargin="24px"
            ></wd-swiper>
          </view>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('tong-shi-zhan-shi-2-ge-hua-kuai')">
          <view class="card-swiper">
            <wd-swiper
              autoplay
              v-model:current="current5"
              :display-multiple-items="2"
              custom-indicator-class="custom-indicator-class"
              custom-image-class="custom-image"
              custom-next-image-class="custom-image-prev"
              custom-prev-image-class="custom-image-prev"
              :indicator="{ type: 'dots' }"
              :list="swiperList"
              previousMargin="24px"
              nextMargin="24px"
            ></wd-swiper>
          </view>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('zi-ding-yi-zhi-shi-qi')">
          <wd-swiper :list="swiperList" direction="vertical" indicator-position="right" autoplay v-model:current="current7">
            <template #indicator="{ current, total }">
              <view class="custom-indicator">{{ current + 1 }}/{{ total }}</view>
            </template>
          </wd-swiper>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <!-- #ifdef MP-WEIXIN || H5 || MP-DINGTALK -->
        <demo-group-item no-padding :title="$t('shi-pin-lun-bo')">
          <wd-swiper :list="videoList" autoplay :indicator="{ type: 'fraction' }" indicator-position="top-right"></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('shou-dong-bo-fang-shi-pin')">
          <wd-swiper :list="videoList" autoplay :autoplay-video="false" :indicator="{ type: 'fraction' }" indicator-position="top-right"></wd-swiper>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('bo-fang-shi-pin-shi-ting-zhi-lun-bo')">
          <wd-swiper
            :list="videoList"
            autoplay
            stop-autoplay-when-video-play
            :autoplay-video="false"
            :indicator="{ type: 'fraction' }"
            indicator-position="top-right"
          ></wd-swiper>
        </demo-group-item>
        <!-- #endif -->
        <demo-group-item no-padding :title="$t('shu-xing-kong-zhi-qie-huan')">
          <wd-swiper :loop="isLoop" :autoplay="false" :list="swiperList" v-model:current="current8" />
          <wd-gap />
          <wd-cell-group>
            <wd-cell title="loop">
              <wd-switch v-model="isLoop" size="24px" />
            </wd-cell>
            <wd-cell title="current" :value="current8.toString()" />
          </wd-cell-group>
          <view class="demo-actions">
            <wd-button @click="current8--">prev</wd-button>
            <wd-button type="success" @click="current8++">next</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('cha-cao-yong-fa')">
          <wd-swiper :list="swiperList" autoplay v-model:current="current1" :indicator="{ type: 'dots-bar' }">
            <template #default="{ item }">
              <image :src="item as string" mode="aspectFill" class="custom-slot-image" />
            </template>
          </wd-swiper>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg'
])

const customSwiperList = ref([
  { url: 'https://wot-ui.cn/assets/redpanda.jpg', title: t('xiao-xiong-mao') },
  { url: 'https://wot-ui.cn/assets/capybara.jpg', title: t('ka-pi-ba-la') },
  { url: 'https://wot-ui.cn/assets/panda.jpg', title: t('da-xiong-mao') },
  { url: 'https://wot-ui.cn/assets/moon.jpg', title: t('shi-hua-zhong-guo') }
])

const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://wot-ui.cn/assets/moon.jpg'
])

const current = ref<number>(0)
const current1 = ref<number>(1)
const current2 = ref<number>(2)
const current3 = ref<number>(3)
const current4 = ref<number>(4)
const current5 = ref<number>(0)
const current6 = ref<number>(0)
const current7 = ref<number>(0)
const current8 = ref<number>(0)
const current9 = ref<number>(0)

const isLoop = ref(false)
</script>

<style lang="scss" scoped>
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;

  :deep(.custom-indicator-class) {
    bottom: -16px;
  }

  :deep(.custom-image) {
    border-radius: 12rpx;
  }

  :deep(.custom-image-prev) {
    height: 168px !important;
  }
}

.custom-slot-image {
  width: 100%;
  height: 100%;
}

.custom-indicator {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  padding: 0 12rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 24rpx;
}

.demo-actions {
  display: flex;
  justify-content: space-between;
}
</style>
