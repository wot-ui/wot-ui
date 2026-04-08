<template>
  <page-wraper>
    <wd-toast />

    <demo-group :title="$t('zu-jian-lei-xing')">
      <demo-group-item :title="$t('jiBenYongFa')">
        <view class="button-group">
          <wd-button @click="showToast">toast</wd-button>
          <wd-button @click="showLongToast">{{ $t('chang-wen-an') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('lei-xing-toast')">
        <view class="button-group">
          <wd-button @click="showSuccessToast">{{ $t('cheng-gong-toast') }}</wd-button>
          <wd-button @click="showErrorToast">{{ $t('cuo-wu-toast') }}</wd-button>
          <wd-button @click="showWarnToast">{{ $t('jing-gao-toast') }}</wd-button>
          <wd-button @click="showNormalToast">{{ $t('chang-gui-toast') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-zhuang-tai')">
      <demo-group-item :title="$t('loading')">
        <view class="button-group">
          <wd-button @click="showLoadingToast">circular ({{ $t('mo-ren') }})</wd-button>
          <wd-button @click="showSpinnerLoading">spinner</wd-button>
          <wd-button @click="showDotsLoading">dots</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('zong-xiang-bu-ju-loading')">
        <view class="button-group">
          <wd-button @click="showVerticalCircularLoading">circular</wd-button>
          <wd-button @click="showVerticalSpinnerLoading">spinner</wd-button>
          <wd-button @click="showVerticalDotsLoading">dots</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-yang-shi')">
      <demo-group-item :title="$t('shi-yong-tu-biao')">
        <view class="button-group">
          <wd-button @click="showInnerIconToast">{{ $t('nei-bu-tu-biao') }}</wd-button>
          <wd-button @click="showCustomIconToast">{{ $t('ziDingYiTuBiao') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('ti-shi-wei-zhi')">
        <view class="button-group">
          <wd-button @click="showTopToast">{{ $t('ding-bu-toast') }}</wd-button>
          <wd-button @click="showMiddletoast">{{ $t('ju-zhong-toast') }}</wd-button>
          <wd-button @click="showBottomToast">{{ $t('di-bu-toast') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('pai-ban-fang-xiang')">
        <view class="button-group">
          <wd-button @click="showHorizonToast">{{ $t('heng-xiang-pai-ban') }}</wd-button>
          <wd-button @click="showVerticalToast">{{ $t('zong-xiang-pai-ban') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toast = useToast()

function showToast() {
  toast.show(t('ti-shi-xin-xi'))
}
function showSuccessToast() {
  toast.success(t('cao-zuo-cheng-gong'))
}
function showErrorToast() {
  toast.error(t('cuo-wu-ti-shi-cuo-wu-ti-shi'))
}
function showWarnToast() {
  toast.warning(t('ti-shi-xin-xi'))
}
function showNormalToast() {
  toast.info(t('chang-gui-ti-shi-chang-gui-ti-shi'))
}
function showTopToast() {
  toast.show({
    position: 'top',
    iconClass: 'star',
    msg: t('ti-shi-xin-xi'),
    closed() {},
    opened() {}
  })
}

function showMiddletoast() {
  toast.show({
    position: 'middle',
    iconClass: 'star',
    msg: t('ti-shi-xin-xi'),
    closed() {},
    opened() {}
  })
}

function showBottomToast() {
  toast.show({
    position: 'bottom',
    msg: t('ti-shi-xin-xi')
  })
}
function showLoadingToast() {
  toast.loading(t('3s-hou-zi-dong-guan-bi'))
  setTimeout(() => {
    toast.close()
  }, 3000)
}

function showSpinnerLoading() {
  toast.loading({
    msg: t('3s-hou-zi-dong-guan-bi-0'),
    loadingType: 'spinner',
    loadingColor: '#fff'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}

function showDotsLoading() {
  toast.loading({
    msg: t('3s-hou-zi-dong-guan-bi-1'),
    loadingType: 'dots',
    loadingColor: '#fff'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}

function showVerticalCircularLoading() {
  toast.loading({
    msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
    direction: 'vertical'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}

function showVerticalSpinnerLoading() {
  toast.loading({
    msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
    direction: 'vertical',
    loadingType: 'spinner',
    loadingColor: '#fff'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}

function showVerticalDotsLoading() {
  toast.loading({
    msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
    direction: 'vertical',
    loadingType: 'dots',
    loadingColor: '#fff'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}
function showLongToast() {
  toast.show(
    t(
      'zhe-shi-yi-duan-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-de-wen-an'
    )
  )
}

function showInnerIconToast() {
  toast.show({
    iconClass: 'star',
    msg: t('shi-yong-zu-jian-ku-nei-bu-tu-biao')
  })
}

function showCustomIconToast() {
  toast.show({
    iconClass: 'kehuishouwu',
    classPrefix: 'fish',
    msg: t('shi-yong-zi-ding-yi-tu-biao')
  })
}

function showHorizonToast() {
  toast.success(t('heng-xiang-pai-ban-0'))
}

function showVerticalToast() {
  toast.success({
    msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
    direction: 'vertical'
  })
}
</script>
<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
