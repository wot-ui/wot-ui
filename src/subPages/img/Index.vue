<template>
  <page-wraper>
    <view class="page-img">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('ji-ben-shi-yong')">
          <wd-img :width="100" :height="100" :src="imgURL" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item :title="$t('jia-zai-zhong-0')">
          <view class="demo-grid demo-grid--two">
            <view class="demo-col">
              <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />
              <view class="demo-text">默认提示</view>
            </view>
            <view class="demo-col">
              <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
                <template #loading>
                  <wd-loading />
                </template>
              </wd-img>
              <view class="demo-text">自定义提示</view>
            </view>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('jia-zai-shi-bai')">
          <view class="demo-grid demo-grid--two">
            <view class="demo-col">
              <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />
              <view class="demo-text">默认提示</view>
            </view>
            <view class="demo-col">
              <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
                <template #error>
                  <view class="error-wrap">加载失败</view>
                </template>
              </wd-img>
              <view class="demo-text">自定义提示</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('tian-chong')">
          <view class="demo-grid">
            <view class="demo-col" v-for="mode in modes" :key="mode">
              <wd-img width="100%" height="27vw" :src="imgURL" :mode="mode" />
              <view class="demo-text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('yuan-xing')">
          <view class="demo-grid">
            <view class="demo-col" v-for="mode in modes" :key="`round-${mode}`">
              <wd-img round width="100%" height="27vw" :src="imgURL" :mode="mode" />
              <view class="demo-text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('yuan-jiao')">
          <view class="demo-grid">
            <view class="demo-col" v-for="mode in modes" :key="`radius-${mode}`">
              <wd-img width="100%" height="27vw" :radius="5" :src="imgURL" :mode="mode" />
              <view class="demo-text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊用法">
        <demo-group-item :title="$t('ke-yu-lan')">
          <view class="demo-grid demo-grid--two">
            <view class="demo-col">
              <wd-img width="100%" mode="widthFix" :src="imgURL" :enable-preview="true" />
              <view class="demo-text">默认预览图</view>
            </view>
            <view class="demo-col">
              <wd-img width="100%" mode="widthFix" :src="imgURL" :preview-src="previewURL" :enable-preview="true" />
              <view class="demo-text">指定预览图</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { ImageMode } from '@/uni_modules/wot-ui/components/wd-img/types'
import blackMao from './black_mao.png'
import blackMaoPreview from './black_mao_1.png'

const imgURL = blackMao
const previewURL = blackMaoPreview

const modes: ImageMode[] = [
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top',
  'heightFix',
  'widthFix',
  'scaleToFill',
  'aspectFit',
  'aspectFill'
]
</script>

<style lang="scss" scoped>
.page-img {
  :deep(.demo-group-item__content) {
    overflow: hidden;
  }
}

.demo-card {
  display: flex;
  justify-content: center;
}

.demo-grid {
  display: flex;
  flex-wrap: wrap;
}

.demo-grid--two {
  .demo-col {
    width: 50%;
  }
}

.demo-col {
  box-sizing: border-box;
  min-height: 1px;
  padding: 0 10px 20px;
  width: 33.3333%;
}

.demo-text {
  margin-top: 8px;
  text-align: center;
}

.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}
</style>
