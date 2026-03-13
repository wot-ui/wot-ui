<template>
  <view @click="closeOutside">
    <wd-toast />
    <page-wraper>
      <demo-block title="基础用法" transparent>
        <wd-search v-model="value1" @search="search" @change="change" @cancel="cancel" @clear="clear" />
        <wd-search variant="filled" v-model="valueFilled" custom-class="page-search__mt" />
        <wd-search variant="light" v-model="valueLight" custom-class="page-search__mt" />
      </demo-block>

      <demo-block :title="$t('sou-suo-zhan-wei-fu-ju-zuo')" transparent>
        <wd-search placeholder-left />
      </demo-block>

      <demo-block :title="$t('zi-dong-ju-jiao')" transparent>
        <wd-search v-model="value5" focus />
      </demo-block>

      <demo-block :title="$t('qing-kong-hou-zi-dong-ju-jiao')" transparent>
        <wd-search v-model="value4" focus-when-clear />
      </demo-block>

      <demo-block :title="$t('she-zhi-zui-da-chang-du')" transparent>
        <wd-search v-model="value2" :maxlength="4" />
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-you-ce-wen-an')" transparent>
        <wd-search :placeholder="$t('qing-shu-ru-ding-dan-hao-ding-dan-ming-cheng')" :cancel-txt="$t('sou-suo')" />
      </demo-block>

      <demo-block :title="$t('jin-yong-qie-yin-cang-qu-xiao-an-niu')" transparent>
        <wd-search disabled hide-cancel @click="handleDisabledClick" />
      </demo-block>

      <view class="page-search__slot-demo">
        <view class="page-search__slot-title">{{ $t('zi-ding-yi-zuo-ce-cha-cao') }}</view>
        <wd-search v-model="value3">
          <template #prefix>
            <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
              <view class="page-search__type">
                <text>{{ searchType }}</text>
                <wd-icon class="page-search__type-icon" name="fill-arrow-down"></wd-icon>
              </view>
            </wd-popover>
          </template>
        </wd-search>
      </view>

      <demo-block title="自定义输入框右侧图标" transparent>
        <wd-search v-model="value7">
          <template #input-suffix>
            <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
          </template>
        </wd-search>
      </demo-block>

      <view class="page-search__slot-demo">
        <view class="page-search__slot-title">自定义右侧插槽</view>
        <wd-search variant="plain" v-model="value6">
          <template #input-suffix>
            <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
          </template>
          <template #suffix>
            <wd-popover v-model="showPopover" mode="menu" :content="menu2" placement="bottom">
              <view class="page-search__suffix">
                <text>筛选条件</text>
                <wd-icon class="page-search__suffix-icon" :name="showPopover ? 'caret-up' : 'caret-down'" size="16px"></wd-icon>
              </view>
            </wd-popover>
          </template>
        </wd-search>
      </view>

      <demo-block title="多种插槽组合" transparent>
        <wd-search variant="plain" v-model="value8">
          <template #input-suffix>
            <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
          </template>
          <template #suffix>
            <view class="page-search__action-icons">
              <wd-icon name="filter" size="20px" custom-class="page-search__filter-icon"></wd-icon>
              <wd-icon name="plus-circle-fill" size="20px" custom-class="page-search__plus-icon"></wd-icon>
            </view>
          </template>
        </wd-search>

        <wd-search variant="filled" v-model="value9" custom-class="page-search__mt">
          <template #input-suffix>
            <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
          </template>
          <template #suffix>
            <view class="page-search__action-icons">
              <wd-icon name="filter" size="20px" custom-class="page-search__filter-icon"></wd-icon>
              <wd-icon name="plus-circle-fill" size="20px" custom-class="page-search__plus-icon"></wd-icon>
            </view>
          </template>
        </wd-search>

        <view class="page-search__light-demo page-search__mt">
          <wd-search variant="light" v-model="value10">
            <template #input-suffix>
              <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
            </template>
            <template #suffix>
              <view class="page-search__action-icons">
                <wd-icon name="filter" size="20px" custom-class="page-search__filter-icon"></wd-icon>
                <wd-icon name="plus-circle-fill" size="20px" custom-class="page-search__plus-icon"></wd-icon>
              </view>
            </template>
          </wd-search>
        </view>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-design-uni'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { closeOutside } = useQueue()

const value1 = ref<string>('')
const valueFilled = ref<string>('')
const valueLight = ref<string>('')
const value2 = ref<string>(t('chu-shi-wen-an'))
const value3 = ref<string>('')
const value4 = ref<string>('')
const value5 = ref<string>('')
const value6 = ref<string>('')
const value7 = ref<string>('')
const value8 = ref<string>('')
const value9 = ref<string>('')
const value10 = ref<string>('')
const showPopover = ref<boolean>(false)

const searchType = ref<string>(t('quan-bu'))
const menu = computed(() => {
  return [
    {
      content: t('quan-bu-0')
    },
    {
      content: t('ding-dan-hao')
    },
    {
      content: t('tui-kuan-dan-hao')
    }
  ]
})

const menu2 = ref([{ content: '气泡文本' }, { content: '气泡文本' }, { content: '气泡文本' }])

function handleDisabledClick() {
  uni.showToast({ title: t('jin-yong-dian-ji') })
}

function search(e: any) {
  uni.showToast({ title: t('sou-suo') + e.value })
}
function clear() {
  uni.showToast({ title: t('qing-kong') })
}
function cancel() {
  uni.showToast({ title: t('qu-xiao') })
}
function change(e: any) {
  console.log(e.value)
}
function changeSearchType({ item, index }: any) {
  searchType.value = item.content
}
</script>
<style lang="scss" scoped>
.page-search__slot-demo {
  margin: $n15 0;
  color: $text-secondary;
}

.page-search__slot-title {
  padding: 0 $n15;
  margin: $n10 0;
  font-size: $n14;
}

.page-search__light-demo {
  background: var(--wot-color-bg);
  padding: $n10 0;
}

.page-search__type {
  position: relative;
  height: $n36;
  line-height: $n36;
  padding: 0 $n8 0 $n16;
  color: $text-main;

  &::after {
    position: absolute;
    content: '';
    width: 1px;
    right: 0;
    top: $n5;
    bottom: $n5;
    background: $border-main;
    transform: scaleX(0.5);
  }

  &-icon {
    margin-left: $n4;
    display: inline-block;
    font-size: $n18;
    vertical-align: middle;
    color: $icon-secondary;
  }
}

.page-search__suffix {
  line-height: $n36;
  padding: 0 0 0 $n16;
  color: $text-main;

  &-icon {
    margin-left: $n4;
    display: inline-block;
    vertical-align: middle;
    color: $icon-secondary;
  }
}

.page-search__action-icons {
  display: flex;
  align-items: center;
  padding-left: $padding-tight;
}

.page-search__filter-icon {
  color: $icon-secondary;
}

:deep() {
  .page-search__scan-icon {
    color: $icon-secondary;
    margin-left: $n8;
  }
  .page-search__plus-icon {
    margin-left: $n14;
    color: $primary-6;
  }

  .page-search__mt {
    margin-top: $n10;
  }
}

.overflowauto {
  overflow: normal;
}
</style>
