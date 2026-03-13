<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view class="page__header">
        <view class="page__title">
          <image src="../images/logo.svg" mode="widthFix" class="page__title-logo" />
          <text class="page__title-name">Wot UI</text>
          <text class="page__title-sparator">@</text>
          <text class="page__title-version">{{ packageConfig.version }}</text>
        </view>
        <view class="page__desc">Wot UI 是一个基于 Vue3 + TS 开发的 uni-app 组件库，提供 70+ 高质量组件，支持暗黑模式、国际化和自定义主题。</view>
      </view>
      <view class="page__body">
        <wd-collapse v-model="active">
          <wd-collapse-item v-for="(item, index) in list" :key="index" :title="item.name" :name="item.id">
            <template #title="{ expanded }">
              <view :class="`page__body-item-header ${expanded ? 'page__body-item-header--expanded' : ''}`">
                <wd-icon :name="item.icon" custom-class="page__body-item-header-icon"></wd-icon>
                <text class="">{{ item.name }}</text>
              </view>
            </template>
            <wd-cell-group size="large">
              <wd-cell
                v-for="(page, j) in item.pages"
                :key="j"
                is-link
                :title="page.name"
                @click="handleClick(`/subPages/${page.id}/Index`)"
              ></wd-cell>
            </wd-cell-group>
          </wd-collapse-item>
        </wd-collapse>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import packageConfig from '../../../package.json'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const active = ref([])

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

// 使用computed使list响应语言变化
const list = computed(() => [
  {
    id: 'widget',
    name: t('ji-chu'),
    open: false,
    icon: 'common',
    pages: [
      {
        id: 'button',
        name: t('button-an-niu')
      },
      {
        id: 'icon',
        name: t('icon-tu-biao')
      },
      {
        id: 'layout',
        name: t('layout-bu-ju')
      },
      {
        id: 'configProvider',
        name: t('configprovider-quan-ju-pei-zhi')
      },
      {
        id: 'popup',
        name: t('popup-dan-chu-ceng')
      },
      {
        id: 'resize',
        name: t('resize-jian-ting-yuan-su-chi-cun-bian-hua')
      },
      {
        id: 'transition',
        name: t('transition-dong-hua')
      },
      {
        id: 'fab',
        name: t('fab-xuan-fu-an-niu')
      },
      {
        id: 'text',
        name: t('text-wen-ben')
      },
      {
        id: 'rootPortal',
        name: t('rootportal-title')
      }
    ]
  },
  {
    id: 'nav',
    name: t('dao-hang'),
    open: false,
    icon: 'mind-mapping',

    pages: [
      {
        id: 'pagination',
        name: t('pagination-fen-ye')
      },
      {
        id: 'popover',
        name: t('popover-qi-pao')
      },
      {
        id: 'tabs',
        name: t('tabs-biao-qian-ye')
      },
      {
        id: 'segmented',
        name: t('segmented-fen-duan-qi')
      },
      {
        id: 'tabbar',
        name: t('tabbar-biao-qian-lan')
      },
      {
        id: 'navbar',
        name: t('navbar-dao-hang-lan')
      },
      {
        id: 'sidebar',
        name: t('sidebar-ce-bian-lan')
      },
      {
        id: 'backtop',
        name: t('backtop-hui-dao-ding-bu')
      },
      {
        id: 'indexBar',
        name: t('indexbar-suo-yin-lan')
      },
      {
        id: 'tour',
        name: t('tour-title')
      }
    ]
  },
  {
    id: 'form',
    name: t('shu-ju-shu-ru'),
    open: false,
    icon: 'unordered-list',
    pages: [
      {
        id: 'calendar',
        name: t('calendar-ri-li-xuan-ze-qi')
      },
      {
        id: 'calendarView',
        name: t('calendarview-ri-li-mian-ban')
      },
      {
        id: 'checkbox',
        name: t('checkbox-fu-xuan-kuang')
      },
      {
        id: 'cascader',
        name: t('colpicker-duo-lie-xuan-ze-qi')
      },
      {
        id: 'datetimePicker',
        name: t('datetimepicker-shi-jian-xuan-ze-qi')
      },
      {
        id: 'datetimePickerView',
        name: t('datetimepickerview-shi-jian-xuan-ze-qi-shi-tu')
      },
      {
        id: 'input',
        name: t('input-shu-ru-kuang')
      },
      {
        id: 'textarea',
        name: t('textarea-wen-ben-yu')
      },
      {
        id: 'inputNumber',
        name: t('inputnumber-ji-shu-qi')
      },
      {
        id: 'picker',
        name: t('picker-xuan-ze-qi')
      },
      {
        id: 'pickerView',
        name: t('pickerview-xuan-ze-qi-shi-tu')
      },
      {
        id: 'radio',
        name: t('radio-dan-xuan-kuang')
      },
      {
        id: 'rate',
        name: t('rate-ping-fen')
      },
      {
        id: 'search',
        name: t('search-sou-suo')
      },
      {
        id: 'selectPicker',
        name: t('selectpicker-dan-fu-xuan-xuan-ze-qi')
      },
      {
        id: 'slider',
        name: t('slider-hua-kuai')
      },
      {
        id: 'slideVerify',
        name: t('slide-verify-hua-dong-yan-zheng')
      },
      {
        id: 'switch',
        name: t('switch-kai-guan')
      },
      {
        id: 'form',
        name: t('form-biao-dan')
      },
      {
        id: 'upload',
        name: t('upload-shang-chuan')
      },
      {
        id: 'passwordInput',
        name: t('passwordinput-mi-ma-shu-ru-kuang')
      },
      {
        id: 'signature',
        name: t('signature-qian-ming')
      }
    ]
  },
  {
    id: 'feedback',
    name: t('fan-kui'),
    open: false,
    icon: 'message',
    pages: [
      {
        id: 'actionSheet',
        name: t('actionsheet-shang-la-cai-dan')
      },
      {
        id: 'dropMenu',
        name: t('dropmenu-xia-la-cai-dan')
      },
      {
        id: 'floatingPanel',
        name: t('floatingpanel-fu-dong-mian-ban')
      },
      {
        id: 'loading',
        name: t('loading-jia-zai-zhi-shi-qi')
      },
      {
        id: 'dialog',
        name: 'Dialog 对话框'
      },
      {
        id: 'messageBox',
        name: t('messagebox-dan-kuang')
      },
      {
        id: 'overlay',
        name: t('overlay-zhe-zhao-ceng')
      },
      {
        id: 'noticeBar',
        name: t('noticebar-tong-zhi-lan')
      },
      {
        id: 'progress',
        name: t('progress-jin-du-tiao')
      },
      {
        id: 'circle',
        name: t('circle-huan-xing-jin-du-tiao')
      },
      {
        id: 'sortButton',
        name: t('sortbutton-pai-xu-an-niu')
      },
      {
        id: 'statusTip',
        name: t('statustip-que-sheng-ti-shi')
      },
      {
        id: 'swipeAction',
        name: t('swipeaction-hua-dong-cao-zuo')
      },
      {
        id: 'toast',
        name: t('toast-qing-ti-shi')
      },
      {
        id: 'notify',
        name: t('notify-xiao-xi-tong-zhi')
      },
      {
        id: 'tooltip',
        name: t('tooltip-wen-zi-ti-shi')
      },
      {
        id: 'countDown',
        name: t('countdown-dao-ji-shi')
      },
      {
        id: 'countTo',
        name: t('countto-shu-zi-gun-dong')
      },
      {
        id: 'keyboard',
        name: t('keyboard-xu-ni-jian-pan')
      }
      // {
      //   id: 'numberKeyboard',
      //   name: t('numberkeyboard-shu-zi-jian-pan')
      // }
    ]
  },
  {
    id: 'show',
    name: t('shu-ju-zhan-shi'),
    open: false,
    icon: 'image',
    pages: [
      {
        id: 'avatar',
        name: t('avatar-tou-xiang')
      },
      {
        id: 'badge',
        name: t('badge-hui-biao')
      },
      {
        id: 'card',
        name: t('card-ka-pian')
      },
      {
        id: 'cell',
        name: t('cell-dan-yuan-ge')
      },
      {
        id: 'collapse',
        name: t('collapse-zhe-die-mian-ban')
      },
      {
        id: 'curtain',
        name: t('curtain-mu-lian')
      },
      {
        id: 'divider',
        name: t('divider-fen-ge-xian')
      },
      {
        id: 'gap',
        name: t('gap-jian-ge-cao')
      },
      {
        id: 'img',
        name: t('img-tu-pian')
      },
      {
        id: 'imagePreview',
        name: 'ImagePreview 图片预览'
      },
      {
        id: 'videoPreview',
        name: 'VideoPreview 视频预览'
      },
      {
        id: 'imgCropper',
        name: t('imgcropper-tu-pian-cai-jian')
      },
      {
        id: 'grid',
        name: t('grid-gong-ge')
      },
      {
        id: 'loadmore',
        name: t('loadmore-jia-zai-geng-duo')
      },
      {
        id: 'skeleton',
        name: t('skeleton-gu-jia-ping')
      },
      {
        id: 'steps',
        name: t('steps-bu-zhou-tiao')
      },
      {
        id: 'sticky',
        name: t('sticky-xi-ding-bu-ju')
      },
      {
        id: 'tag',
        name: t('tag-biao-qian')
      },
      {
        id: 'watermark',
        name: t('watermark-shui-yin')
      },
      {
        id: 'swiper',
        name: t('swiper-lun-bo-tu')
      },
      {
        id: 'table',
        name: t('table-biao-ge')
      }
    ]
  }
])

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

onShareAppMessage(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})

onShareTimeline(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti-0'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})
</script>

<style lang="scss" scoped>
.page {
  &__header {
    padding: $padding-ultra-loose $padding-extra-loose;
    background: $filled-oppo;
  }
  &__title {
    color: $primary-6;
    margin-bottom: $spacing-extra-loose;
    display: flex;
    align-items: center;

    &-logo {
      width: $n32;
      height: auto;
      display: block;
      margin-right: $spacing-tight;
    }

    &-name {
      font-size: $typography-title-size-large;
      font-weight: $font-weight-medium;
      line-height: $typography-title-line--height-size-large;
    }
    &-version,
    &-sparator {
      font-size: $typography-body-size-main;
      font-weight: $font-weight-medium;
      line-height: $typography-body-line--height-size-main;
    }

    &-sparator {
      margin: 0 $spacing-super-tight;
    }
  }

  &__desc {
    color: $text-secondary;
    font-size: $typography-body-size-main;
    font-weight: $font-weight-medium;
    line-height: $typography-body-line--height-size-main;
  }

  &__body {
    padding: $spacing-extra-loose;
    box-sizing: border-box;

    :deep() {
      .wd-collapse-item__body {
        padding: 0;
      }

      .wd-cell {
        padding: $spacing-extra-loose;
      }

      .wd-cell__left {
        flex: 1 1 auto;
      }

      .wd-collapse {
        background: transparent;
      }

      .wd-collapse-item {
        background: $filled-oppo;
        border-radius: $radius-large;
        overflow: hidden;

        &::after {
          display: none;
        }
        &:not(:last-child) {
          margin-bottom: $spacing-loose;
        }
      }
    }
  }

  &__body-item-header {
    display: flex;
    align-items: center;
    color: $text-main;
    font-size: $typography-body-size-extra-large;
    font-weight: $typography-body-font-weight-strong;
    line-height: $typography-body-line--height-size-large;

    :deep() {
      .page__body-item-header-icon {
        margin-right: $spacing-tight;
        font-size: $n20;
        color: $text-secondary;
      }
    }

    &--expanded {
      color: $primary-6;
      :deep() {
        .page__body-item-header-icon {
          color: $primary-6;
        }
      }
    }
  }
}
</style>
