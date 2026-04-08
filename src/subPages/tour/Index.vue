<template>
  <page-wraper>
    <view class="tour-container">
      <view class="tour-step" id="step1">
        <view class="tour-item">
          <text class="tour-title">{{ $t('di-yi-bu') }}</text>
          <text class="tour-content">{{ $t('zhe-shi-yin-dao-de-di-yi-bu-jie-shao-ji-ben-gong-neng') }}</text>
        </view>
      </view>

      <view class="tour-step" id="step2">
        <view class="tour-item">
          <text class="tour-title">{{ $t('di-er-bu') }}</text>
          <text class="tour-content">{{ $t('zhe-shi-yin-dao-de-di-er-bu-zhan-shi-geng-duo-gong-neng') }}</text>
        </view>
      </view>

      <view class="tour-step" id="step3">
        <view class="tour-item">
          <text class="tour-title">{{ $t('di-san-bu') }}</text>
          <text class="tour-content">{{ $t('zhe-shi-yin-dao-de-di-san-bu-shen-ru-gong-neng-jie-shao') }}</text>
        </view>
      </view>

      <view class="tour-step" id="step4">
        <view class="tour-item">
          <text class="tour-title">{{ $t('di-si-bu') }}</text>
          <text class="tour-content">{{ $t('zhe-shi-yin-dao-de-zui-hou-yi-bu-zong-jie-gong-neng') }}</text>
        </view>
      </view>
    </view>

    <demo-group :title="$t('zu-jian-lei-xing')">
      <demo-group-item :title="$t('ji-chu-yong-fa')">
        <view class="button-group">
          <wd-button type="primary" @click="startBasicTour">{{ $t('kai-shi-yin-dao') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-zhuang-tai')">
      <demo-group-item :title="$t('dian-ji-meng-ban-ji-xu')">
        <view class="button-group">
          <wd-button type="primary" @click="startMaskNextTour">{{ $t('dian-ji-meng-ban-ji-xu-0') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('guan-bi-meng-ban')">
        <view class="button-group">
          <wd-button type="primary" @click="startNoMaskTour">{{ $t('guan-bi-meng-ban-0') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-yang-shi')">
      <demo-group-item :title="$t('zi-ding-yi-meng-ban')">
        <view class="button-group">
          <wd-button type="primary" @click="startCustomMaskTour">{{ $t('zi-ding-yi-meng-ban-0') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('zi-ding-yi-gao-liang-qu-yu')">
        <view class="button-group">
          <wd-button type="primary" @click="startCustomHighlightTour">{{ $t('zi-ding-yi-gao-liang') }}</wd-button>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('zi-ding-yi-nei-rong-he-an-niu')">
        <view class="button-group">
          <wd-button type="primary" @click="startCustomContentTour">{{ $t('ziDingYiNeiRong') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('te-shu-yang-shi')">
      <demo-group-item :title="$t('kong-zhi-dang-qian-bu-zhou')">
        <view class="button-group">
          <wd-button type="primary" @click="startControlTour">{{ $t('tiao-zhuan-dao-di-san-bu-kai-shi-yin-dao') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <!-- 基本用法组件 -->
    <wd-tour
      v-model="showBasicTour"
      :steps="basicSteps"
      v-model:current="current"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-tour>

    <!-- 点击蒙版继续组件 -->
    <wd-tour
      v-model="showClickMaskTour"
      :steps="basicSteps"
      :click-mask-next="true"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-tour>

    <!-- 自定义蒙版组件 -->
    <wd-tour
      v-model="showCustomMaskTour"
      :steps="customMaskSteps"
      :mask="true"
      mask-color="red"
      :offset="40"
      :border-radius="15"
      :padding="10"
      :next-text="'下一步'"
      :prev-text="'上一步'"
      :skip-text="'跳过'"
      :finish-text="'完成'"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-tour>

    <!-- 关闭蒙版组件 -->
    <wd-tour v-model="showNoMaskTour" :steps="noMaskSteps" :mask="false" @finish="handleFinish" @skip="handleSkip" @change="handleChange"></wd-tour>

    <!-- 自定义高亮区域组件 -->
    <wd-tour
      v-model="showCustomHighlightTour"
      :steps="customHighlightSteps"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    >
      <template #highlight="{ elementInfo }">
        <view class="custom-highlight" :style="`${objToStyle(elementInfo)};${objToStyle(customHighlightStyle)}`"></view>
      </template>
    </wd-tour>

    <!-- 自定义内容和按钮组件 -->
    <wd-tour
      v-model="showCustomContentTour"
      :steps="customContentSteps"
      :next-text="nextText"
      :prev-text="prevText"
      :skip-text="skipText"
      :finish-text="finishText"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    >
      <template #content>
        <view class="custom-content">
          <wd-icon name="help-circle-filled" size="22px"></wd-icon>
          <text class="custom-text">{{ $t('zi-ding-yi-yin-dao-nei-rong-qu-yu') }}</text>
        </view>
      </template>

      <template #next>
        <view class="custom-button custom-next">{{ $t('xia-yi-bu') }}</view>
      </template>

      <template #finish>
        <view class="custom-button custom-finish">{{ $t('wan-cheng') }}</view>
      </template>
    </wd-tour>

    <!-- 控制当前步骤组件 -->
    <wd-tour
      v-model="showControlTour"
      :steps="basicSteps"
      v-model:current="controlCurrent"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-tour>
  </page-wraper>
</template>

<script lang="ts" setup>
import { objToStyle } from '@/uni_modules/wot-ui/common/util'
import { type TourChangeDetail } from '@/uni_modules/wot-ui/components/wd-tour/types'
import { ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const showBasicTour = ref(false)
const showClickMaskTour = ref(false)
const showCustomMaskTour = ref(false)
const showNoMaskTour = ref(false)
const showCustomHighlightTour = ref(false)
const showCustomContentTour = ref(false)
const showControlTour = ref(false)
const nextText = ref(t('ji-xu'))
const prevText = ref(t('fan-hui'))
const skipText = ref(t('tiao-guo'))
const finishText = ref(t('zhi-dao-le'))
const current = ref(0)
const controlCurrent = ref(0)
// 步骤数据
const basicSteps = [
  {
    element: '#step1',
    content: t('huan-ying-shi-yong-yin-dao-zu-jian-zhe-shi-di-yi-bu-de-shuo-ming')
  },
  {
    element: '#step2',
    content: t('zhe-shi-di-er-bu-zhan-shi-le-ling-yi-ge-gong-neng-dian')
  },
  {
    element: '#step3',
    content: t('zhe-li-ke-yi-shi-h1-stylelineheight1-fu-wen-ben-h1')
  },
  {
    element: '#step4',
    content: t('zhe-shi-zui-hou-yi-bu-wan-cheng-yin-dao-liu-cheng')
  }
]

const customMaskSteps = [
  {
    element: '#step1',
    content: t('zhe-shi-strong-zi-ding-yi-meng-ban-strong-shi-li-shi-yong-le-strong-hong-se-ban-tou-ming-strong-meng-ban')
  },
  {
    element: '#step2',
    content: t('meng-ban-yan-se-she-zhi-wei-codergba255-0-0-06code')
  },
  {
    element: '#step3',
    content: t('tong-shi-tiao-zheng-le-em-gao-liang-qu-yu-de-yuan-jiao-emu-nei-bian-juuhe-code-pian-yi-liang-code')
  },
  {
    element: '#step4',
    content: t('wan-cheng-le-zi-ding-yi-meng-ban-yang-shi-de-zhan-shi')
  }
]

const noMaskSteps = [
  {
    element: '#step1',
    content: t('zhe-shi-strong-wu-meng-ban-strong-yin-dao-mo-shi')
  },
  {
    element: '#step2',
    content: t('zhi-gao-liang-mu-biao-yuan-su-em-bu-xian-shi-em-ban-tou-ming-zhe-zhao')
  },
  {
    element: '#step3',
    content: t('shi-yong-yu-xu-yao-bao-chi-ye-mian-ke-jian-xing-de-chang-jing')
  },
  {
    element: '#step4',
    content: t('yin-dao-wan-chengubu-gan-raouyong-hu-cha-kan-ye-mian-qi-ta-nei-rong')
  }
]

const customHighlightSteps = [
  {
    element: '#step1',
    content: t('zhe-shi-strong-zi-ding-yi-gao-liang-qu-yu-strong-shi-li')
  },
  {
    element: '#step2',
    content: t('shi-yong-le-em-hong-se-xu-xian-bian-kuang-em-he-code-ban-tou-ming-bei-jing-code')
  },
  {
    element: '#step3',
    content: t('tong-guo-cha-cao-shi-xian-wan-quan-zi-ding-yi-de-gao-liang-yang-shi')
  },
  {
    element: '#step4',
    content: t('wan-cheng-le-zi-ding-yi-gao-liang-qu-yu-de-zhan-shi')
  }
]

const customContentSteps = [
  {
    element: '#step1',
    content: t('zhe-shi-h1-zi-ding-yi-yang-shi-h1-de-yin-dao-ke-yi-xiu-gai-em-meng-ban-yan-se-emu-yuan-jiao-da-xiaoudeng-shu-xing')
  },
  {
    element: '#step2',
    content: t('ke-yi-zi-ding-yi-an-niu-wen-zi-ru-ji-xu-fan-hui-deng')
  },
  {
    element: '#step3',
    content: t('tong-guo-shu-xing-pei-zhi-shi-xian-ge-xing-hua-yin-dao-ti-yan')
  },
  {
    element: '#step4',
    content: t('zhe-shi-zui-hou-yi-bu-wan-cheng-yin-dao-liu-cheng-0')
  }
]
// 自定义高亮样式
const customHighlightStyle = {
  border: '2px dashed #ff0000',
  borderRadius: '8px',
  background: 'rgba(255, 0, 0, 0.1)',
  boxSizing: 'border-box'
}

// 滑动到最上面
async function scrollToTop() {
  await uni.pageScrollTo({
    scrollTop: 0,
    duration: 0
  })
}
// 启动不同类型引导的方法
async function startBasicTour() {
  await scrollToTop()
  nextTick(() => {
    showBasicTour.value = true
  })
}

function startMaskNextTour() {
  scrollToTop()
  showClickMaskTour.value = true
}

async function startCustomMaskTour() {
  scrollToTop()
  showCustomMaskTour.value = true
}

function startNoMaskTour() {
  scrollToTop()
  showNoMaskTour.value = true
}

function startCustomHighlightTour() {
  scrollToTop()
  showCustomHighlightTour.value = true
}

function startCustomContentTour() {
  scrollToTop()
  showCustomContentTour.value = true
}

function startControlTour() {
  scrollToTop()
  controlCurrent.value = 2
  showControlTour.value = true
}

// 通用事件处理
function handleFinish() {
  console.log('引导完成')
  showBasicTour.value = false
  showClickMaskTour.value = false
  showCustomMaskTour.value = false
  showNoMaskTour.value = false
  showCustomHighlightTour.value = false
  showCustomContentTour.value = false
  showControlTour.value = false
}

function handleSkip() {
  console.log('引导跳过')
  showBasicTour.value = false
  showClickMaskTour.value = false
  showCustomMaskTour.value = false
  showNoMaskTour.value = false
  showCustomHighlightTour.value = false
  showCustomContentTour.value = false
  showControlTour.value = false
}

function handleChange({ current }: TourChangeDetail) {
  console.log('当前步骤:', current)
}
</script>

<style lang="scss" scoped>
.tour-container {
  padding-top: 20px;

  .tour-step {
    width: fit-content;
    margin: 0 auto 20px;

    .tour-item {
      padding: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      background-color: #f8f8f8;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      min-width: 250px;

      .tour-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        display: block;
      }

      .tour-content {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        display: block;
      }
    }
  }
}

.button-group {
  padding: 10px 0;
  text-align: center;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  .custom-text {
    font-size: 14px;
    color: #333;
  }
}

.custom-button {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;

  &.custom-next {
    background-color: #34d19d;
    color: #fff;
  }

  &.custom-finish {
    background-color: #34d19d;
    color: #fff;
  }
}

.custom-highlight {
  position: fixed;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}
</style>
