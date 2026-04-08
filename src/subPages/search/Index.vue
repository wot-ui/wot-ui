<template>
  <view @click="closeOutside">
    <page-wraper>
      <view class="page-search">
        <demo-group transparent :title="$t('zu-jian-lei-xing')">
          <demo-group-item no-padding :title="$t('ji-chu-yong-fa-0')">
            <wd-search v-model="valueBasic" @search="search" @change="change" @cancel="cancel" @clear="clear" />
          </demo-group-item>
        </demo-group>

        <demo-group transparent :title="$t('zu-jian-zhuang-tai')">
          <demo-group-item no-padding :title="$t('zi-dong-ju-jiao')">
            <wd-search v-model="valueFocus" focus />
          </demo-group-item>
          <demo-group-item no-padding :title="$t('qing-kong-hou-zi-dong-ju-jiao')">
            <wd-search v-model="valueFocusWhenClear" focus-when-clear />
          </demo-group-item>
          <demo-group-item no-padding :title="$t('jin-yong-qie-yin-cang-qu-xiao-an-niu')">
            <wd-search disabled hide-cancel @click="handleDisabledClick" />
          </demo-group-item>
        </demo-group>

        <demo-group transparent :title="$t('zu-jian-bian-ti')">
          <demo-group-item no-padding :title="$t('yang-shi-bian-ti')">
            <wd-search variant="plain" v-model="valuePlain" />
            <wd-search variant="filled" v-model="valueFilled" custom-class="page-search__mt" />
            <wd-search variant="light" v-model="valueLight" custom-class="page-search__mt" />
          </demo-group-item>
        </demo-group>

        <demo-group transparent :title="$t('zu-jian-yang-shi')">
          <demo-group-item no-padding :title="$t('sou-suo-zhan-wei-fu-ju-zuo')">
            <wd-search placeholder-left />
          </demo-group-item>
          <demo-group-item no-padding :title="$t('she-zhi-zui-da-chang-du')">
            <wd-search v-model="valueMaxlength" :maxlength="4" />
          </demo-group-item>
          <demo-group-item no-padding :title="$t('zi-ding-yi-you-ce-wen-an')">
            <wd-search :placeholder="$t('qing-shu-ru-ding-dan-hao-ding-dan-ming-cheng')" :cancel-txt="$t('sou-suo')" />
          </demo-group-item>
        </demo-group>

        <demo-group transparent :title="$t('te-shu-yang-shi')">
          <demo-group-item no-padding :title="$t('zi-ding-yi-zuo-ce-cha-cao')">
            <wd-search v-model="valuePrefix">
              <template #prefix>
                <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
                  <view class="page-search__type">
                    <text>{{ searchType }}</text>
                    <wd-icon class="page-search__type-icon" name="fill-arrow-down"></wd-icon>
                  </view>
                </wd-popover>
              </template>
            </wd-search>
          </demo-group-item>
          <demo-group-item no-padding :title="$t('zi-ding-yi-shu-ru-kuang-you-ce-tu-biao')">
            <wd-search v-model="valueInputSuffix">
              <template #input-suffix>
                <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
              </template>
            </wd-search>
          </demo-group-item>
          <demo-group-item no-padding :title="$t('zi-ding-yi-you-ce-cha-cao')">
            <wd-search variant="plain" v-model="valueSuffix">
              <template #input-suffix>
                <wd-icon custom-class="page-search__scan-icon" name="scan" size="20px"></wd-icon>
              </template>
              <template #suffix>
                <wd-popover v-model="showPopover" mode="menu" :content="menu2" placement="bottom">
                  <view class="page-search__suffix">
                    <text>{{ $t('shai-xuan-tiao-jian') }}</text>
                    <wd-icon class="page-search__suffix-icon" :name="showPopover ? 'caret-up' : 'caret-down'" size="16px"></wd-icon>
                  </view>
                </wd-popover>
              </template>
            </wd-search>
          </demo-group-item>
          <demo-group-item no-padding :title="$t('duo-zhong-cha-cao-zu-he')">
            <wd-search variant="plain" v-model="valueMultiPlain">
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

            <wd-search variant="filled" v-model="valueMultiFilled" custom-class="page-search__mt">
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
              <wd-search variant="light" v-model="valueMultiLight">
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
          </demo-group-item>
        </demo-group>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { closeOutside } = useQueue()

const valueBasic = ref<string>('')
const valuePlain = ref<string>('')
const valueFilled = ref<string>('')
const valueLight = ref<string>('')
const valueMaxlength = ref<string>(t('chu-shi-wen-an'))
const valuePrefix = ref<string>('')
const valueFocusWhenClear = ref<string>('')
const valueFocus = ref<string>('')
const valueSuffix = ref<string>('')
const valueInputSuffix = ref<string>('')
const valueMultiPlain = ref<string>('')
const valueMultiFilled = ref<string>('')
const valueMultiLight = ref<string>('')
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

const menu2 = ref([{ content: t('qi-pao-wen-ben') }, { content: t('qi-pao-wen-ben-0') }, { content: t('qi-pao-wen-ben-1') }])

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
function changeSearchType({ item }: any) {
  searchType.value = item.content
}
</script>
<style lang="scss" scoped>
.page-search {
  color: $text-secondary;
}

.page-search__light-demo {
  background: var(--wot-color-bg);
  padding: $n-10 0;
}

.page-search__type {
  position: relative;
  height: $n-36;
  line-height: $n-36;
  padding: 0 $n-8 0 $n-16;
  color: $text-main;

  &::after {
    position: absolute;
    content: '';
    width: 1px;
    right: 0;
    top: $n-5;
    bottom: $n-5;
    background: $border-main;
    transform: scaleX(0.5);
  }

  &-icon {
    margin-left: $n-4;
    display: inline-block;
    font-size: $n-18;
    vertical-align: middle;
    color: $icon-secondary;
  }
}

.page-search__suffix {
  line-height: $n-36;
  padding: 0 0 0 $n-16;
  color: $text-main;

  &-icon {
    margin-left: $n-4;
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
    margin-left: $n-8;
  }
  .page-search__plus-icon {
    margin-left: $n-14;
    color: $primary-6;
  }

  .page-search__mt {
    margin-top: $n-10;
  }
}

.overflowauto {
  overflow: normal;
}
</style>
