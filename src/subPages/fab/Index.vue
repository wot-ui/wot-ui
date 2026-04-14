<template>
  <page-wraper>
    <view class="page-fab" @click="closeOutside">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('xuan-fu-an-niu-zhu-ti-se')">
          <wd-radio-group v-model="type" type="dot" direction="horizontal">
            <wd-radio value="primary" custom-class="page-fab__radio">{{ $t('zhu-yao-an-niu') }}</wd-radio>
            <wd-radio value="success" custom-class="page-fab__radio">{{ $t('cheng-gong-an-niu-0') }}</wd-radio>
            <wd-radio value="warning" custom-class="page-fab__radio">{{ $t('jing-gao-an-niu-0') }}</wd-radio>
            <wd-radio value="error" custom-class="page-fab__radio">{{ $t('wei-xian-an-niu') }}</wd-radio>
            <wd-radio value="info" custom-class="page-fab__radio">{{ $t('xin-xi-an-niu') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('xuan-fu-an-niu-wei-zhi')">
          <wd-radio-group v-model="position" type="dot" direction="horizontal">
            <wd-radio value="left-top" custom-class="page-fab__radio">{{ $t('zuo-shang') }}</wd-radio>
            <wd-radio value="right-top" custom-class="page-fab__radio">{{ $t('you-shang') }}</wd-radio>
            <wd-radio value="left-center" custom-class="page-fab__radio">{{ $t('zuo-zhong') }}</wd-radio>
            <wd-radio value="right-center" custom-class="page-fab__radio">{{ $t('you-zhong') }}</wd-radio>
            <wd-radio value="top-center" custom-class="page-fab__radio">{{ $t('shang-zhong') }}</wd-radio>
            <wd-radio value="bottom-center" custom-class="page-fab__radio">{{ $t('xia-zhong') }}</wd-radio>
            <wd-radio value="left-bottom" custom-class="page-fab__radio">{{ $t('zuo-xia') }}</wd-radio>
            <wd-radio value="right-bottom" custom-class="page-fab__radio">{{ $t('you-xia') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>

        <demo-group-item :title="$t('cai-dan-dan-chu-fang-xiang')">
          <wd-radio-group v-model="direction" type="dot" direction="horizontal">
            <wd-radio value="top" custom-class="page-fab__radio">{{ $t('xiang-shang') }}</wd-radio>
            <wd-radio value="bottom" custom-class="page-fab__radio">{{ $t('xiang-xia') }}</wd-radio>
            <wd-radio value="right" custom-class="page-fab__radio">{{ $t('xiang-you') }}</wd-radio>
            <wd-radio value="left" custom-class="page-fab__radio">{{ $t('xiang-zuo') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jinYong')">
          <view @click.stop="">
            <wd-switch v-model="disabled" size="22px" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('ke-tuo-dong')">
          <view @click.stop="">
            <wd-switch v-model="draggable" size="22px" />
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('qie-huan-zhan-shi')">
          <view @click.stop="">
            <wd-button type="primary" @click="active = !active">{{ $t('qie-huan') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-chu-fa-qi')">
          <wd-radio-group v-model="customType" type="dot" direction="horizontal" @click.stop="">
            <wd-radio value="default" custom-class="page-fab__radio">{{ $t('mo-ren-yang-shi') }}</wd-radio>
            <wd-radio value="withText" custom-class="page-fab__radio">{{ $t('dai-wen-zi-an-niu') }}</wd-radio>
            <wd-radio value="plain" custom-class="page-fab__radio">{{ $t('plain-bian-ti') }}</wd-radio>
            <wd-radio value="text" custom-class="page-fab__radio">{{ $t('text-bian-ti') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <!-- 默认 FAB 示例 -->
      <wd-fab
        v-if="!useTriggerSlot && !useVariantSlot && !useTextSlot"
        v-model:active="active"
        :disabled="disabled"
        :type="type"
        :position="position"
        :direction="direction"
        :draggable="draggable"
        @click="showToast('我被点了')"
      >
        <wd-button
          @click="showToast('一键三连')"
          icon="heart-fill"
          :disabled="disabled"
          custom-class="page-fab__button"
          type="primary"
          round
        ></wd-button>
        <wd-button @click="showToast('我要收藏')" icon="star" :disabled="disabled" custom-class="page-fab__button" type="success" round></wd-button>
        <wd-button @click="showToast('我要投币')" icon="gift" :disabled="disabled" custom-class="page-fab__button" type="danger" round></wd-button>
        <wd-button
          @click="showToast('我要点赞')"
          icon="thumb-up"
          :disabled="disabled"
          custom-class="page-fab__button"
          type="warning"
          round
        ></wd-button>
      </wd-fab>

      <!-- 自定义触发器：带文字的按钮 -->
      <wd-fab v-else-if="useTriggerSlot" position="left-bottom" :disabled="disabled" :draggable="draggable" :expandable="false">
        <template #trigger="{ disabled }">
          <wd-button @click="handleCustomClick" icon="share-alt" type="danger" :disabled="disabled">{{ $t('fen-xiang-gei-peng-you') }}</wd-button>
        </template>
      </wd-fab>

      <!-- 自定义触发器：plain 变体 -->
      <wd-fab v-else-if="useVariantSlot" position="right-bottom" :disabled="disabled" :draggable="draggable" v-model:active="active2">
        <template #trigger="{ disabled }">
          <wd-button icon="menu" variant="plain" type="primary" round :disabled="disabled"></wd-button>
        </template>
        <wd-button @click="showToast('设置')" icon="settings" custom-class="page-fab__button" variant="plain" type="info" round></wd-button>
        <wd-button @click="showToast('分享')" icon="share-alt" custom-class="page-fab__button" variant="plain" type="success" round></wd-button>
        <wd-button @click="showToast('编辑')" icon="edit" custom-class="page-fab__button" variant="plain" type="warning" round></wd-button>
      </wd-fab>

      <!-- 自定义触发器：text 变体 -->
      <wd-fab v-else-if="useTextSlot" position="right-bottom" :disabled="disabled" :draggable="draggable" direction="bottom" v-model:active="active3">
        <template #trigger="{ disabled }">
          <wd-button icon="heart-fill" variant="text" :disabled="disabled" type="primary" round size="large"></wd-button>
        </template>
        <wd-button @click="showToast('复制')" icon="copy" custom-class="page-fab__button" variant="text" type="info" round></wd-button>
        <wd-button @click="showToast('删除')" icon="delete" custom-class="page-fab__button" variant="text" type="danger" round></wd-button>
      </wd-fab>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useQueue, useToast } from '@/uni_modules/wot-ui'
import { type FabPosition, type FabType } from '@/uni_modules/wot-ui/components/wd-fab/types'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { show: showToast } = useToast()
const active = ref<boolean>(false)
const type = ref<FabType>('primary')
const position = ref<FabPosition>('left-bottom')
const direction = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const disabled = ref<boolean>(false)
const draggable = ref<boolean>(false)
const customType = ref<string>('default')
const active2 = ref<boolean>(false)
const active3 = ref<boolean>(false)

const useTriggerSlot = computed(() => customType.value === 'withText')
const useVariantSlot = computed(() => customType.value === 'plain')
const useTextSlot = computed(() => customType.value === 'text')

const { closeOutside } = useQueue()

function handleCustomClick() {
  showToast(t('fen-xiang-gei-peng-you-0'))
}
</script>
<style lang="scss" scoped>
.page-fab {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: $n-98;
  background: $filled-oppo;

  :deep(.page-fab__button) {
    min-width: auto !important;
    box-sizing: border-box;
    width: $n-32 !important;
    height: $n-32 !important;
    margin: $spacing-extra-tight;
    border-radius: $radius-full !important;
  }

  :deep(.page-fab__radio) {
    height: $n-32 !important;
    line-height: $n-32 !important;
  }
}
</style>
