<template>
  <template v-if="showGlobalWatermark">
    <wd-watermark v-if="globalType === 'text'" :width="130" :height="140" content="wot-design-uni" :layout="globalLayout"></wd-watermark>
    <wd-watermark
      v-else-if="globalType === 'image'"
      image="https://wot-ui.cn/logo.png"
      :width="130"
      :height="140"
      :image-width="38"
      :image-height="38"
      :layout="globalLayout"
    ></wd-watermark>
  </template>
  <view>
    <page-wraper>
      <demo-block title="局部文字水印">
        <view class="watermark-wrap">
          <wd-watermark :full-screen="false" content="wot-design-uni"></wd-watermark>
          <wd-cell-group border>
            <wd-cell title="消息通知" center>
              <wd-switch v-model="switchVal1" />
            </wd-cell>
            <wd-cell title="声音提醒" center>
              <wd-switch v-model="switchVal2" />
            </wd-cell>
            <wd-cell title="震动反馈" center>
              <wd-switch v-model="switchVal3" />
            </wd-cell>
            <wd-cell title="深色模式" center>
              <wd-switch v-model="switchVal4" />
            </wd-cell>
            <wd-cell title="自动更新" center>
              <wd-switch v-model="switchVal5" />
            </wd-cell>
            <wd-cell title="定位服务" center>
              <wd-switch v-model="switchVal6" />
            </wd-cell>
            <wd-cell title="省电模式" center>
              <wd-switch v-model="switchVal7" />
            </wd-cell>
          </wd-cell-group>
        </view>
      </demo-block>

      <demo-block title="局部图片水印">
        <view class="watermark-wrap">
          <wd-watermark :full-screen="false" image="https://wot-ui.cn/logo.png" :image-width="38" :image-height="38"></wd-watermark>
          <wd-checkbox-group v-model="checkVal" type="square" placement="right">
            <wd-checkbox name="1">查看权限</wd-checkbox>
            <wd-checkbox name="2">编辑权限</wd-checkbox>
            <wd-checkbox name="3">删除权限</wd-checkbox>
            <wd-checkbox name="4">导出数据</wd-checkbox>
            <wd-checkbox name="5">分享链接</wd-checkbox>
            <wd-checkbox name="6">邀请成员</wd-checkbox>
            <wd-checkbox name="7">管理设置</wd-checkbox>
          </wd-checkbox-group>
        </view>
      </demo-block>

      <demo-block title="局部多行文字水印">
        <view class="watermark-wrap">
          <wd-watermark :full-screen="false" :width="150" :height="150" content="多行文字水印测试自动换行效果展示，这是一段很长的文本"></wd-watermark>
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
      </demo-block>

      <demo-block title="全局水印">
        <wd-button @click="showGlobalWatermark = !showGlobalWatermark" size="small" type="primary" custom-style="margin-right: 10rpx;">
          {{ showGlobalWatermark ? '关闭全局水印' : '开启全局水印' }}
        </wd-button>

        <template v-if="showGlobalWatermark">
          <wd-button @click="toggleGlobalType" size="small" type="info" custom-style="margin-right: 10rpx;">
            切换为{{ globalType === 'text' ? '图片' : '文字' }}
          </wd-button>
          <wd-button @click="toggleGlobalLayout" size="small" type="warning">
            {{ globalLayout === 'grid' ? '错位布局' : '网格布局' }}
          </wd-button>
        </template>
      </demo-block>
    </page-wraper>
  </view>
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
</style>
