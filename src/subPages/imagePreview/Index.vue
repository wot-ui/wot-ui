<template>
  <page-wraper>
    <view class="page-image-preview">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa')">
          <wd-button @click="handleBasicPreview">{{ $t('yu-lan-tu-pian') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('chuan-ru-tu-pian-shu-zu')">
          <wd-button @click="handleArrayPreview">{{ $t('zhi-jie-chuan-ru-shu-zu') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('zhi-ding-qi-shi-wei-zhi')">
          <wd-button @click="handleStartPosition">{{ $t('cong-di-er-zhang-kai-shi') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-pei-zhi')">
        <demo-group-item :title="$t('yin-cang-ye-ma')">
          <wd-button @click="handleHideIndex">{{ $t('bu-xian-shi-ye-ma') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('yin-cang-guan-bi-an-niu')">
          <wd-button @click="handleHideClose">{{ $t('bu-xian-shi-guan-bi-an-niu') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('guan-bi-an-niu-wei-zhi')">
          <wd-button @click="handleClosePosition('top-left')">{{ $t('zuo-shang-jiao') }}</wd-button>
          <wd-button @click="handleClosePosition('top-right')">{{ $t('you-shang-jiao') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('jin-yong-dian-ji-guan-bi')">
          <wd-button @click="handleDisableCloseOnClick">{{ $t('dian-ji-bu-guan-bi') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('jin-yong-xun-huan')">
          <wd-button @click="handleDisableLoop">{{ $t('jin-yong-xun-huan-bo-fang') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')">
        <demo-group-item :title="$t('jian-ting-shi-jian')">
          <wd-button @click="handleWithEvents">{{ $t('dai-shi-jian-hui-tiao') }}</wd-button>
        </demo-group-item>

        <demo-group-item :title="$t('shi-yong-cha-cao')">
          <wd-button @click="handleSlotPreview">{{ $t('zi-ding-yi-cha-cao') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <!-- 函数式调用需要的组件 -->
      <wd-image-preview />

      <!-- 带插槽的组件（使用 selector 区分） -->
      <wd-image-preview selector="slot-preview">
        <!-- 自定义指示器 -->
        <template #indicator="{ current, total }">
          <wd-swiper-nav :current="current" :total="total" type="dots-bar" custom-style="bottom: 64px;" />
        </template>
        <!-- 底部自定义内容 -->
        <template #default="{ current }">
          <view class="custom-bottom">
            <text class="custom-bottom__text">{{ imageDescriptions[current] }}</text>
          </view>
        </template>
      </wd-image-preview>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useImagePreview } from '@/uni_modules/wot-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { previewImage } = useImagePreview()
const { previewImage: previewSlotImage } = useImagePreview('slot-preview')

// 示例图片
const images = [
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg'
]

// 图片描述
const imageDescriptions = computed(() => {
  return [t('xiao-xiong-mao-0'), t('shui-tun'), t('da-xiong-mao-0'), t('yue-liang'), t('meng-chong')]
})

// 基本用法
function handleBasicPreview() {
  previewImage({
    images
  })
}

// 传入图片数组
function handleArrayPreview() {
  previewImage(images)
}

// 指定起始位置
function handleStartPosition() {
  previewImage({
    images,
    startPosition: 1
  })
}

// 隐藏页码
function handleHideIndex() {
  previewImage({
    images,
    showIndex: false
  })
}

// 关闭按钮位置
function handleClosePosition(position: 'top-left' | 'top-right') {
  previewImage({
    images,
    closeIconPosition: position
  })
}

// 隐藏关闭按钮
function handleHideClose() {
  previewImage({
    images,
    closeable: false
  })
}

// 禁用点击关闭
function handleDisableCloseOnClick() {
  previewImage({
    images,
    closeOnClick: false
  })
}

// 禁用循环
function handleDisableLoop() {
  previewImage({
    images,
    loop: false
  })
}

// 带事件回调
function handleWithEvents() {
  previewImage({
    images,
    onOpen: () => {
      console.log('预览已打开')
    },
    onClose: () => {
      console.log('预览已关闭')
    },
    onChange: (index) => {
      console.log('当前图片索引:', index)
    }
  })
}

// 使用插槽
function handleSlotPreview() {
  previewSlotImage({
    images,
    showIndex: false // 使用自定义指示器，隐藏默认页码
  })
}
</script>

<style lang="scss" scoped>
.page-image-preview {
  :deep(.wd-button) {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.custom-bottom {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;

  &__text {
    color: #fff;
    font-size: 28rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
  }
}
</style>
