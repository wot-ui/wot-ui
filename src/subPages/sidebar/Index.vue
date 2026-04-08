<template>
  <page-wraper>
    <view class="page-sidebar">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa-0')">
          <view class="sidebar-row">
            <wd-sidebar v-model="active1">
              <wd-sidebar-item :value="0" :label="$t('biao-qian-ming-cheng')" />
              <wd-sidebar-item :value="1" :label="$t('biao-qian-ming-cheng')" />
              <wd-sidebar-item :value="2" :label="$t('biao-qian-ming-cheng')" />
            </wd-sidebar>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('hui-biao-yu-jin-yong')">
          <view class="sidebar-grid">
            <wd-sidebar v-model="active2">
              <wd-sidebar-item :value="0" :label="$t('biao-qian-ming-cheng')" is-dot />
              <wd-sidebar-item :value="1" :label="$t('biao-qian-ming-cheng')" badge="5" />
              <wd-sidebar-item :value="2" :label="$t('biao-qian-ming-cheng')" :badge-props="{ type: 'warning', value: 55, max: 99 }" />
            </wd-sidebar>
            <wd-sidebar v-model="active3" :before-change="beforeChange">
              <wd-sidebar-item :value="0" :label="$t('biao-qian-ming-cheng')" />
              <wd-sidebar-item :value="1" :label="$t('biao-qian-ming-cheng')" disabled />
              <wd-sidebar-item :value="2" :label="$t('biao-qian-ming-cheng')" />
            </wd-sidebar>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('mao-dian-yong-fa-shi-li')">
          <view class="demo-button">
            <wd-button :round="false" block size="large" @click="handleClick1">{{ $t('mao-dian-yong-fa') }}</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('qie-huan-ye-mian-yong-fa-shi-li')">
          <view class="demo-button">
            <wd-button :round="false" block size="large" @click="handleClick2">{{ $t('qie-huan-ye-mian') }}</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-tu-biao-shi-li')">
          <view class="demo-button">
            <wd-button :round="false" block size="large" @click="handleClick3">{{ $t('ziDingYiTuBiao') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { SidebarBeforeChange } from '@/uni_modules/wot-ui/components/wd-sidebar/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { loading: showLoading, close: closeLoading } = useToast()
const { t } = useI18n()
const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)

const beforeChange: SidebarBeforeChange = (value) => {
  showLoading(t('qie-huan-zhong'))
  return new Promise((resolve) => {
    setTimeout(() => {
      closeLoading()
      resolve(true)
    }, 2000)
  })
}

function handleClick1() {
  uni.navigateTo({ url: '/subPages/sidebar/demo1' })
}
function handleClick2() {
  uni.navigateTo({ url: '/subPages/sidebar/demo2' })
}

function handleClick3() {
  uni.navigateTo({ url: '/subPages/sidebar/demo3' })
}
</script>
<style lang="scss" scoped>
.page-sidebar {
  .sidebar-row {
    display: flex;
    justify-content: center;
  }

  .sidebar-grid {
    display: flex;
    justify-content: space-around;
    gap: 16px;
  }
}

.demo-button {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24rpx;
}
</style>
