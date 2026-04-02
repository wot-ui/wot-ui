<!--
 * @Author: weisheng
 * @Date: 2026-01-21 16:32:23
 * @LastEditTime: 2026-03-24 17:50:11
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/subPages/imagePreview/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view class="page-image-preview">
      <demo-group title="组件类型">
        <demo-group-item title="基本用法">
          <wd-button @click="handleBasicPreview">预览图片</wd-button>
        </demo-group-item>

        <demo-group-item title="传入图片数组">
          <wd-button @click="handleArrayPreview">直接传入数组</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item title="指定起始位置">
          <wd-button @click="handleStartPosition">从第二张开始</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件配置">
        <demo-group-item title="隐藏页码">
          <wd-button @click="handleHideIndex">不显示页码</wd-button>
        </demo-group-item>

        <demo-group-item title="隐藏关闭按钮">
          <wd-button @click="handleHideClose">不显示关闭按钮</wd-button>
        </demo-group-item>

        <demo-group-item title="关闭按钮位置">
          <wd-button @click="handleClosePosition('top-left')">左上角</wd-button>
          <wd-button @click="handleClosePosition('top-right')">右上角</wd-button>
        </demo-group-item>

        <demo-group-item title="禁用点击关闭">
          <wd-button @click="handleDisableCloseOnClick">点击不关闭</wd-button>
        </demo-group-item>

        <demo-group-item title="禁用循环">
          <wd-button @click="handleDisableLoop">禁用循环播放</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊用法">
        <demo-group-item title="监听事件">
          <wd-button @click="handleWithEvents">带事件回调</wd-button>
        </demo-group-item>

        <demo-group-item title="使用插槽">
          <wd-button @click="handleSlotPreview">自定义插槽</wd-button>
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
const imageDescriptions = ['小熊猫', '水豚', '大熊猫', '月亮', '萌宠']

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
