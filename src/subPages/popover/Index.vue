<template>
  <page-wraper>
    <wd-toast />
    <view @click="closeOutside" class="page-popover">
      <demo-block :title="$t('wei-zhi')">
        <wd-radio-group v-model="placement" direction="horizontal" type="dot">
          <wd-radio value="bottom" custom-class="page-popover__radio">bottom</wd-radio>
          <wd-radio value="bottom-start" custom-class="page-popover__radio">bottom-start</wd-radio>
          <wd-radio value="bottom-end" custom-class="page-popover__radio">bottom-end</wd-radio>
          <wd-radio value="top" custom-class="page-popover__radio">top</wd-radio>
          <wd-radio value="top-start" custom-class="page-popover__radio">top-start</wd-radio>
          <wd-radio value="top-end" custom-class="page-popover__radio">top-end</wd-radio>
          <wd-radio value="left" custom-class="page-popover__radio">left</wd-radio>
          <wd-radio value="left-start" custom-class="page-popover__radio">left-start</wd-radio>
          <wd-radio value="left-end" custom-class="page-popover__radio">left-end</wd-radio>
          <wd-radio value="right" custom-class="page-popover__radio">right</wd-radio>
          <wd-radio value="right-start" custom-class="page-popover__radio">right-start</wd-radio>
          <wd-radio value="right-end" custom-class="page-popover__radio">right-end</wd-radio>
        </wd-radio-group>
      </demo-block>
      <demo-block custom-class="page-popover__demo" :title="$t('jiBenYongFa')">
        <view class="page-popover__center">
          <wd-popover id="pop1" :content="$t('zhe-shi-yi-duan-nei-rong')" :placement="placement" v-model="show1" @change="handleChange1">
            <wd-button data-id="pop1">{{ $t('dian-ji-zhan-shi') }}</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="page-popover__demo" :title="$t('qian-tao-xin-xi')">
        <view class="page-popover__center">
          <wd-popover v-model="show2" :placement="placement" @change="handleChange2">
            <template #content>
              <view class="page-popover__content">{{ $t('zhe-shi-yi-duan-zi-ding-yi-yang-shi-de-nei-rong') }}</view>
            </template>
            <wd-button>{{ $t('dian-ji-zhan-shi-0') }}</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="page-popover__demo" :title="$t('lie-biao-zhan-shi')">
        <view class="page-popover__center">
          <wd-popover v-model="show3" mode="menu" :placement="placement" :content="menu" @menuclick="link" @change="handleChange3">
            <wd-button>{{ $t('lie-biao') }}</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="page-popover__demo" title="动态内容与位置更新">
        <view class="page-popover__center">
          <wd-popover v-model="show4" ref="popoverRef" :placement="placement">
            <template #content>
              <view class="page-popover__content" :style="{ width: dynamicWidth + 'px' }">
                <view style="margin-bottom: 10px">当前宽度: {{ dynamicWidth }}px</view>
                <wd-button custom-class="page-popover__btn" size="small" @click="changeSize">改变大小并更新</wd-button>
              </view>
            </template>
            <wd-button>动态内容</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="page-popover__demo" :title="$t('xian-shi-guan-bi-an-niu')">
        <view class="page-popover__center">
          <wd-popover v-model="show5" :content="$t('zhe-shi-yi-duan-nei-rong')" :placement="placement" show-close>
            <wd-button>{{ $t('xian-shi-guan-bi-an-niu') }}</wd-button>
          </wd-popover>
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-design-uni'
import type { PlacementType, PopoverMenuItem } from '@/uni_modules/wot-design-uni/components/wd-popover/types'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { closeOutside } = useQueue()
const toast = useToast()

const placement = ref<PlacementType>('bottom')

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const dynamicWidth = ref<number>(150)
const popoverRef = ref()

const menu = ref<Array<PopoverMenuItem>>([
  {
    iconClass: 'check', // 替换了不存在的 'read' 图标
    content: t('quan-bu-biao-ji-yi-du')
  },
  {
    iconClass: 'delete',
    content: t('qing-kong-zui-jin-hui-hua')
  },
  {
    iconClass: 'subscribe', // 原本使用的是不匹配且不存在的 'detection'，根据文案替换为 'subscribe'
    content: t('xiao-xi-ding-yue-she-zhi')
  },
  {
    iconClass: 'scan', // 原本使用的是 'subscribe'，根据异常检测文案替换为 'scan'
    content: t('xiao-xi-yi-chang-jian-ce')
  }
])

function link(e: any) {
  toast.show(t('xuan-ze-le') + e.item.content)
}

function changeSize() {
  dynamicWidth.value = dynamicWidth.value === 150 ? 250 : 150
  setTimeout(() => {
    popoverRef.value && popoverRef.value.updatePosition()
  }, 50)
}

function handleChange1() {
  // show1.value = event.detail.show
}

function handleChange2() {
  // show2.value = event.detail.show
}
function handleChange3() {
  // show3.value = event.detail.show
}
</script>
<style lang="scss">
@use '@/uni_modules/wot-design-uni/components/styles/variable.scss' as *;

.page-popover {
  width: 100%;

  &__center {
    text-align: center;
    padding-bottom: $spacing-super-loose;
  }

  &__content {
    /* 必填 开始 */
    position: relative;
    z-index: 500;
    border-radius: $radius-main;
    /* 必填 结束 */
    background: $filled-oppo;
    color: $purple-6;
    font-weight: $font-weight-semibold;
    padding: $padding-main;
    width: 150px;
  }

  :deep(.page-popover__demo) {
    overflow: visible !important;
    padding: $padding-main;
  }

  :deep(.page-popover__radio) {
    height: $n32 !important;
    line-height: $n32 !important;
  }

  :deep(.page-popover__btn) {
    margin: 0 !important;
  }
}
</style>
