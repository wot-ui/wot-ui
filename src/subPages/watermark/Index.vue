<template>
  <template v-if="showGlobalWatermark">
    <wd-watermark v-if="globalType === 'text'" :width="130" :height="140" content="wot-ui" :layout="globalLayout"></wd-watermark>
    <wd-watermark
      v-else-if="globalType === 'image'"
      image="https://v2.wot-ui.cn/logo.svg"
      :width="130"
      :height="140"
      :image-width="38"
      :image-height="38"
      :layout="globalLayout"
    ></wd-watermark>
  </template>

  <page-wraper>
    <view class="page-watermark">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ju-bu-wen-zi-shui-yin')">
          <view class="watermark-wrap">
            <wd-watermark :full-screen="false" content="wot-ui"></wd-watermark>
            <wd-cell-group border>
              <wd-cell :title="$t('xiao-xi-tong-zhi')" center>
                <wd-switch v-model="switchVal1" />
              </wd-cell>
              <wd-cell :title="$t('sheng-yin-ti-xing')" center>
                <wd-switch v-model="switchVal2" />
              </wd-cell>
              <wd-cell :title="$t('zhen-dong-fan-kui')" center>
                <wd-switch v-model="switchVal3" />
              </wd-cell>
              <wd-cell :title="$t('shen-se-mo-shi')" center>
                <wd-switch v-model="switchVal4" />
              </wd-cell>
              <wd-cell :title="$t('zi-dong-geng-xin')" center>
                <wd-switch v-model="switchVal5" />
              </wd-cell>
              <wd-cell :title="$t('ding-wei-fu-wu')" center>
                <wd-switch v-model="switchVal6" />
              </wd-cell>
              <wd-cell :title="$t('sheng-dian-mo-shi')" center>
                <wd-switch v-model="switchVal7" />
              </wd-cell>
            </wd-cell-group>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('ju-bu-tu-pian-shui-yin')">
          <view class="watermark-wrap">
            <wd-watermark :full-screen="false" image="https://v2.wot-ui.cn/logo.svg" :image-width="38" :image-height="38"></wd-watermark>
            <wd-checkbox-group v-model="checkVal" type="square" placement="right">
              <wd-checkbox name="1">{{ $t('cha-kan-quan-xian') }}</wd-checkbox>
              <wd-checkbox name="2">{{ $t('bian-ji-quan-xian') }}</wd-checkbox>
              <wd-checkbox name="3">{{ $t('shan-chu-quan-xian') }}</wd-checkbox>
              <wd-checkbox name="4">{{ $t('dao-chu-shu-ju') }}</wd-checkbox>
              <wd-checkbox name="5">{{ $t('fen-xiang-lian-jie') }}</wd-checkbox>
              <wd-checkbox name="6">{{ $t('yao-qing-cheng-yuan') }}</wd-checkbox>
              <wd-checkbox name="7">{{ $t('guan-li-she-zhi') }}</wd-checkbox>
            </wd-checkbox-group>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('ju-bu-duo-hang-wen-zi-shui-yin')">
          <view class="watermark-wrap">
            <wd-watermark
              :full-screen="false"
              :width="150"
              :height="150"
              content="多行文字水印测试自动换行效果展示，这是一段很长的文本"
            ></wd-watermark>
            <wd-radio-group v-model="radioVal" type="dot" placement="right">
              <wd-radio value="1">简体中文</wd-radio>
              <wd-radio value="2">繁体中文</wd-radio>
              <wd-radio value="3">English</wd-radio>
              <wd-radio value="4">日本語</wd-radio>
              <wd-radio value="5">Français</wd-radio>
              <wd-radio value="6">Deutsch</wd-radio>
              <wd-radio value="7">Español</wd-radio>
            </wd-radio-group>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('quan-ju-shui-yin')">
          <view class="global-action-row">
            <wd-button @click="showGlobalWatermark = !showGlobalWatermark" size="small" type="primary">
              {{ showGlobalWatermark ? '关闭全局水印' : '开启全局水印' }}
            </wd-button>

            <template v-if="showGlobalWatermark">
              <wd-button @click="toggleGlobalType" size="small" type="info">
                {{ $t('qie-huan-wei-globaltype-text-tu-pian-wen-zi', globalType === 'text' ? '图片' : '文字') }}
              </wd-button>
              <wd-button @click="toggleGlobalLayout" size="small" type="warning">
                {{ globalLayout === 'grid' ? '错位布局' : '网格布局' }}
              </wd-button>
            </template>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showGlobalWatermark = ref<boolean>(false)
const globalType = ref<'text' | 'image'>('text')
const globalLayout = ref<'grid' | 'staggered'>('grid')

const switchVal1 = ref<boolean>(true)
const switchVal2 = ref<boolean>(false)
const switchVal3 = ref<boolean>(true)
const switchVal4 = ref<boolean>(false)
const switchVal5 = ref<boolean>(true)
const switchVal6 = ref<boolean>(false)
const switchVal7 = ref<boolean>(true)

const checkVal = ref<string[]>(['1', '2'])
const radioVal = ref<string>('1')

function toggleGlobalType() {
  globalType.value = globalType.value === 'text' ? 'image' : 'text'
}

function toggleGlobalLayout() {
  globalLayout.value = globalLayout.value === 'grid' ? 'staggered' : 'grid'
}
</script>

<style lang="scss" scoped>
.watermark-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.global-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
