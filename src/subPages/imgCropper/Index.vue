<template>
  <page-meta :page-style="`overflow:${croppers.some((v) => v.show) ? 'hidden' : 'visible'};`"></page-meta>
  <page-wraper>
    <!-- #ifdef MP-WEIXIN -->
    <wd-privacy-popup></wd-privacy-popup>
    <!-- #endif -->
    <view class="img-cropper-demo">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')" style="text-align: center">
          <wd-img-cropper
            v-model="croppers[CROPPER_MAIN].show"
            :img-src="croppers[CROPPER_MAIN].imageSrc"
            @confirm="handleMainConfirm"
            @cancel="handleCancel"
            @imgloaderror="handleImageLoadError"
            @imgloaded="handleImageLoaded"
          ></wd-img-cropper>
          <view class="img-cropper-demo__profile img-cropper-demo__profile--main">
            <view
              v-if="!croppers[CROPPER_MAIN].imageResult"
              class="img-cropper-demo__image-placeholder img-cropper-demo__image-placeholder--circular"
              @click="chooseCropperImage(CROPPER_MAIN)"
            >
              <wd-icon name="fill-camera" custom-class="img-cropper-demo__image-icon"></wd-icon>
            </view>
            <wd-img
              v-if="croppers[CROPPER_MAIN].imageResult"
              round
              width="200px"
              height="200px"
              :src="croppers[CROPPER_MAIN].imageResult"
              mode="aspectFit"
              custom-class="img-cropper-demo__profile-image"
              @click="chooseCropperImage(CROPPER_MAIN)"
            />
            <view class="img-cropper-demo__image-label">{{ $t('dian-ji-shang-chuan-tou-xiang') }}</view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-pei-zhi')">
        <demo-group-item :title="$t('zi-ding-yi-cai-jian-bi-li')" style="text-align: center">
          <view class="img-cropper-demo__grid">
            <view v-for="(ratio, index) in ['3:2', '16:9', '16:10']" :key="index" class="img-cropper-demo__grid-item">
              <wd-img-cropper
                v-model="croppers[CROPPER_RATIO_3_2 + index].show"
                :img-src="croppers[CROPPER_RATIO_3_2 + index].imageSrc"
                :aspect-ratio="ratio"
                @confirm="handleCustomConfirm(index, $event)"
                @cancel="handleCancel"
              ></wd-img-cropper>
              <view
                v-if="!croppers[CROPPER_RATIO_3_2 + index].imageResult"
                class="img-cropper-demo__image-placeholder img-cropper-demo__image-placeholder--rectangular"
                @click="chooseCropperImage(CROPPER_RATIO_3_2 + index)"
              >
                <wd-icon name="fill-camera" custom-class="img-cropper-demo__image-icon"></wd-icon>
              </view>
              <wd-img
                v-if="croppers[CROPPER_RATIO_3_2 + index].imageResult"
                width="300px"
                :height="getHeight(ratio)"
                :src="croppers[CROPPER_RATIO_3_2 + index].imageResult"
                mode="aspectFit"
                custom-class="img-cropper-demo__grid-image"
                @click="chooseCropperImage(CROPPER_RATIO_3_2 + index)"
              />
              <view class="img-cropper-demo__image-label">{{ ratio }}{{ $t('bi-li-cai-jian') }}</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')">
        <demo-group-item :title="$t('cai-jian-hou-shang-chuan')" style="text-align: center">
          <wd-img-cropper
            v-model="croppers[CROPPER_UPLOAD].show"
            :img-src="croppers[CROPPER_UPLOAD].imageSrc"
            @confirm="handleUploadConfirm"
            @cancel="handleCancel"
          ></wd-img-cropper>
          <view class="img-cropper-demo__profile img-cropper-demo__profile--upload">
            <view
              v-if="!croppers[CROPPER_UPLOAD].imageResult"
              class="img-cropper-demo__image-placeholder img-cropper-demo__image-placeholder--circular"
              @click="chooseCropperImage(CROPPER_UPLOAD)"
            >
              <wd-icon name="fill-camera" custom-class="img-cropper-demo__image-icon"></wd-icon>
            </view>
            <wd-img
              v-if="croppers[CROPPER_UPLOAD].imageResult"
              round
              width="200px"
              height="200px"
              :src="croppers[CROPPER_UPLOAD].imageResult"
              mode="aspectFit"
              custom-class="img-cropper-demo__profile-image"
              @click="chooseCropperImage(CROPPER_UPLOAD)"
            />
            <view class="img-cropper-demo__image-label">{{ $t('dian-ji-shang-chuan-cai-jian-hou-de-tou-xiang') }}</view>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUpload, useToast } from '@/uni_modules/wot-ui'
import { type UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { startUpload, UPLOAD_STATUS } = useUpload()
const { show: showToast } = useToast()

/**
 * 裁剪器状态接口
 */
interface CropperState {
  // 裁剪框是否显示
  show: boolean
  // 图片源路径
  imageSrc: string
  // 裁剪后的图片结果
  imageResult: string
  // 裁剪比例（可选）
  aspectRatio?: string
}

// 裁剪器数组，按顺序为：主裁剪器、3:2比例、16:9比例、16:10比例、上传裁剪器
const croppers = ref<CropperState[]>([
  { show: false, imageSrc: '', imageResult: '', aspectRatio: '1:1' },
  { show: false, imageSrc: '', imageResult: '', aspectRatio: '3:2' },
  { show: false, imageSrc: '', imageResult: '', aspectRatio: '16:9' },
  { show: false, imageSrc: '', imageResult: '', aspectRatio: '16:10' },
  { show: false, imageSrc: '', imageResult: '' }
])

// 裁剪器索引常量
const CROPPER_MAIN = 0
const CROPPER_RATIO_3_2 = 1
const CROPPER_RATIO_16_9 = 2
const CROPPER_RATIO_16_10 = 3
const CROPPER_UPLOAD = 4

/**
 * 打开图片选择框并进行裁剪
 * @param {number} cropperIndex 裁剪器索引
 */
function chooseCropperImage(cropperIndex: number) {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      croppers.value[cropperIndex].imageSrc = res.tempFilePaths[0]
      croppers.value[cropperIndex].show = true
    }
  })
}

/**
 * 处理裁剪确认
 * @param {number} cropperIndex 裁剪器索引
 * @param {any} event 裁剪结果事件
 */
function handleConfirm(cropperIndex: number, event: any) {
  const { tempFilePath } = event
  croppers.value[cropperIndex].imageResult = tempFilePath
}

/**
 * 处理裁剪确认（通用，用于主裁剪器）
 * @param {any} event 裁剪结果事件
 */
function handleMainConfirm(event: any) {
  handleConfirm(CROPPER_MAIN, event)
}

/**
 * 处理自定义裁剪比例的图片确认
 * @param {number} index 裁剪框索引（0-2，对应 3:2, 16:9, 16:10）
 * @param {any} event 裁剪结果事件
 */
function handleCustomConfirm(index: number, event: any) {
  // 自定义裁剪框在数组中的下标是 1-3
  handleConfirm(CROPPER_RATIO_3_2 + index, event)
}

/**
 * 处理上传前的图片裁剪确认
 * @param {any} event 裁剪结果事件
 */
async function handleUploadConfirm(event: any) {
  const { tempFilePath } = event

  const file: UploadFileItem = {
    url: tempFilePath,
    status: UPLOAD_STATUS.PENDING,
    percent: 0,
    uid: new Date().getTime()
  }

  try {
    await startUpload(file, {
      action: 'https://69bd04402bc2a25b22ad0a49.mockapi.io/upload',
      onSuccess() {
        croppers.value[CROPPER_UPLOAD].imageResult = tempFilePath
        showToast({
          msg: t('shang-chuan-cheng-gong')
        })
      },
      onError() {
        showToast({
          msg: t('shang-chuan-shi-bai')
        })
      },
      onProgress(res) {
        console.log('上传进度:', res.progress)
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
  }
}

/**
 * 处理图片加载错误
 * @param {any} res 错误信息
 */
function handleImageLoadError(res: any) {
  console.log('加载失败', res)
}

/**
 * 处理图片加载成功
 * @param {any} res 加载成功的图片信息
 */
function handleImageLoaded(res: any) {
  console.log('加载成功', res)
}

/**
 * 处理裁剪取消
 */
function handleCancel() {
  console.log('取消裁剪')
}

/**
 * 根据裁剪比例计算图片高度
 * @param {string} ratio 裁剪比例，格式: 'width:height'
 * @returns {string} 计算后的高度
 */
function getHeight(ratio: string): string {
  const [w, h] = ratio.split(':').map(Number)
  if (ratio === '1:1') return '200px'
  return `${(300 * h) / w}px`
}
</script>

<style lang="scss" scoped>
.img-cropper-demo {
  &__profile {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 300px;
    gap: $spacing-main;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: $spacing-super-loose;
    align-items: center;
    padding: $padding-loose;
  }

  &__grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-tight;

    // 自定义裁剪比例的网格项样式
    &:nth-child(1) {
      .img-cropper-demo__image-placeholder--rectangular {
        height: 200px;
      }
    }
  }

  // 图片占位符
  &__image-placeholder {
    position: relative;
    background-color: $filled-bottom;
    border: $stroke-main solid $border-light;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 200ms ease;

    // 圆形占位符
    &--circular {
      width: 200px;
      height: 200px;
      border-radius: $radius-radius-full;
    }

    // 矩形占位符
    &--rectangular {
      width: 300px;
      height: calc(300px * 9 / 16);
      border-radius: $radius-large;
    }
  }

  // 图片图标
  &__image-icon {
    font-size: $n-60;
    color: $text-white;
  }

  // 图片标签/描述
  &__image-label {
    font-size: $typography-label-size-main;
    color: $text-auxiliary;
    line-height: $typography-label-line--height-size-super-small;
    margin-top: $spacing-tight;
  }

  // 个人资料页面的图片样式
  &__profile-image {
    border: $stroke-main solid $border-light;
    border-radius: $radius-radius-full;
    transition: border-color 200ms ease;
  }

  // 网格中的图片样式
  &__grid-image {
    border: $stroke-main solid $border-light;
    border-radius: $radius-large;
    transition: border-color 200ms ease;
  }
}
</style>
