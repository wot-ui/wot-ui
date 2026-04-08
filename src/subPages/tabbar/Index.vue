<template>
  <page-wraper :safeAreaInsetBottom="false">
    <wd-toast></wd-toast>
    <wd-dialog></wd-dialog>
    <view class="page-tabbar">
      <demo-group transparent :title="$t('zu-jian-lei-xing')">
        <demo-group-item no-padding :title="$t('ji-chu-yong-fa-0')">
          <wd-tabbar v-model="tabbar0" bordered @change="handleChange">
            <wd-tabbar-item :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('tong-guo-ming-cheng-pi-pei')">
          <wd-tabbar v-model="tabbar1" bordered @change="handleChange">
            <wd-tabbar-item name="home" :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item name="cart" :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item name="setting" :title="$t('she-zhi')" icon="settings"></wd-tabbar-item>
            <wd-tabbar-item name="user" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item no-padding :title="$t('hui-biao-ti-shi')">
          <wd-tabbar v-model="tabbar2" @change="handleChange">
            <wd-tabbar-item is-dot :value="2" :title="$t('dian-zhuang')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :value="2" icon="store" :title="$t('fen-lei')"></wd-tabbar-item>
            <wd-tabbar-item :value="30" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
            <wd-tabbar-item :value="200" :title="$t('zui-da-zhi')" icon="user"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('zu-jian-bian-ti')">
        <demo-group-item no-padding :title="$t('xuan-fu-biao-qian-lan')">
          <wd-tabbar v-model="tabbar3" shape="round" @change="handleChange">
            <wd-tabbar-item :title="$t('shou-ye')" is-dot :value="2" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" :value="2" icon="store"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('xiang-ce')" :value="30" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('wo-de')" :value="200" icon="user"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('zu-jian-yang-shi')">
        <demo-group-item no-padding :title="$t('ziDingYiTuBiao')">
          <wd-tabbar v-model="tabbar4" @change="handleChange">
            <wd-tabbar-item :value="2" :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :value="2" icon="store" :title="$t('fen-lei')">
              <template #icon>
                <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
              </template>
            </wd-tabbar-item>
            <wd-tabbar-item :value="3" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('zi-ding-yi-yan-se-0')">
          <wd-tabbar v-model="tabbar5" active-color="#ee0a24" inactive-color="#7d7e80" @change="handleChange">
            <wd-tabbar-item is-dot :value="2" :title="$t('dian-zhuang-0')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :value="2" icon="store" :title="$t('fen-lei')"></wd-tabbar-item>
            <wd-tabbar-item :value="30" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
            <wd-tabbar-item :value="200" :title="$t('zui-da-zhi-0')" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="message"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('te-shu-yang-shi')">
        <demo-group-item no-padding :title="$t('jian-ting-qie-huan-shi-jian')">
          <wd-tabbar v-model="tabbar6" active-color="#ee0a24" inactive-color="#7d7e80" @change="handleChange1">
            <wd-tabbar-item :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('xiang-ce')" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('ke-fu')" icon="message"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('mo-ren-cha-cao')">
          <wd-tabbar v-model="tabbar8" :before-change="onBeforeChange2" @change="handleChange" safeAreaInsetBottom placeholder>
            <wd-tabbar-item :value="2" is-dot :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item>
              <view class="custom-raised-button">
                <wd-icon name="plus" size="32px"></wd-icon>
              </view>
            </wd-tabbar-item>
            <wd-tabbar-item :value="200" :title="$t('xiang-ce')" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="message"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('yi-bu-que-ren')">
          <wd-tabbar v-model="tabbar9" :before-change="onBeforeChange" bordered safeAreaInsetBottom placeholder @change="handleChange">
            <wd-tabbar-item :value="2" is-dot :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
            <wd-tabbar-item :value="200" :title="$t('xiang-ce')" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="message"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('gu-ding-di-bu')">
          <wd-tabbar v-model="tabbar7" fixed bordered safeAreaInsetBottom placeholder @change="handleChange">
            <wd-tabbar-item :value="2" is-dot :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('fen-lei')" icon="store"></wd-tabbar-item>
            <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
            <wd-tabbar-item :value="200" :title="$t('xiang-ce')" icon="image"></wd-tabbar-item>
            <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="message"></wd-tabbar-item>
          </wd-tabbar>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, useDialog } from '@/uni_modules/wot-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { show } = useToast()
const dialog = useDialog()
const tabbar0 = ref(1)
const tabbar1 = ref('home')
const tabbar2 = ref(2)
const tabbar3 = ref(2)
const tabbar4 = ref(1)
const tabbar5 = ref(1)
const tabbar6 = ref(1)
const tabbar7 = ref(1)
const tabbar8 = ref(1)
const tabbar9 = ref(1)
function handleChange(event: any) {
  console.log(event)
}

function onBeforeChange(value: number | string) {
  return new Promise<boolean>((resolve) => {
    uni.showToast({ title: 'Loading...', icon: 'loading' })
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

function onBeforeChange2(name: number | string) {
  if (name === 2) {
    dialog.alert({
      title: t('fa-bu-dong-tai'),
      msg: t('xuan-ze-ni-yao-fa-bu-de-nei-rong-lei-xing'),
      headerImage: 'https://wot-ui.cn/assets/panda.jpg',
      confirmButtonText: t('que-ding')
    })
    return false
  }
  return true
}

function handleChange1({ value }: { value: string }) {
  show(t('xuan-zhong-biao-qian-value') + value)
}
</script>
<style lang="scss" scoped>
// :deep(.page-wraper) {
//   background: #f6f6f6;
// }
.custom-raised-button {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0rpx;
  left: 50%;
  transform: translateX(-50%) translateY(-30%);
  background-color: #fff;
  z-index: 10;
  color: var(--wot-color-theme, #4d80f0);
}
</style>
