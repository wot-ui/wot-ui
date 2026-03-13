<template>
  <view>
    <page-wraper>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-tag custom-class="space">{{ $t('biao-qian') }}</wd-tag>
        <wd-tag custom-class="space" type="primary">{{ $t('biao-qian-0') }}</wd-tag>
        <wd-tag custom-class="space" type="danger">{{ $t('biao-qian-6') }}</wd-tag>
        <wd-tag custom-class="space" type="warning">{{ $t('biao-qian-7') }}</wd-tag>
        <wd-tag custom-class="space" type="success">{{ $t('biao-qian-8') }}</wd-tag>
        <wd-tag custom-class="space" type="volcano">{{ $t('biao-qian-volcano') }}</wd-tag>
        <wd-tag custom-class="space" type="lightblue">{{ $t('biao-qian-lightblue') }}</wd-tag>
        <wd-tag custom-class="space" type="cyan">{{ $t('biao-qian-cyan') }}</wd-tag>
        <wd-tag custom-class="space" type="pink">{{ $t('biao-qian-pink') }}</wd-tag>
        <wd-tag custom-class="space" type="purple">{{ $t('biao-qian-purple') }}</wd-tag>
      </demo-block>

      <demo-block title="标签尺寸">
        <view>
          <wd-tag custom-class="space" type="primary" size="small">小标签</wd-tag>
          <wd-tag custom-class="space" type="primary" size="medium">中标签</wd-tag>
          <wd-tag custom-class="space" type="primary">默认标签</wd-tag>
          <wd-tag custom-class="space" type="primary" size="large">较大标签</wd-tag>
          <wd-tag custom-class="space" type="primary" size="extra-large">特大标签</wd-tag>
        </view>
        <view>
          <wd-tag custom-class="space" type="danger" variant="dark" size="small">小标签</wd-tag>
          <wd-tag custom-class="space" type="danger" variant="dark" size="medium">中标签</wd-tag>
          <wd-tag custom-class="space" type="danger" variant="dark">默认标签</wd-tag>
          <wd-tag custom-class="space" type="danger" variant="dark" size="large">较大标签</wd-tag>
          <wd-tag custom-class="space" type="danger" variant="dark" size="extra-large">特大标签</wd-tag>
        </view>
        <view>
          <wd-tag custom-class="space" type="success" variant="plain" size="small">小标签</wd-tag>
          <wd-tag custom-class="space" type="success" variant="plain" size="medium">中标签</wd-tag>
          <wd-tag custom-class="space" type="success" variant="plain">默认标签</wd-tag>
          <wd-tag custom-class="space" type="success" variant="plain" size="large">较大标签</wd-tag>
          <wd-tag custom-class="space" type="success" variant="plain" size="extra-large">特大标签</wd-tag>
        </view>
        <view>
          <wd-tag custom-class="space" type="warning" variant="dashed" size="small">小标签</wd-tag>
          <wd-tag custom-class="space" type="warning" variant="dashed" size="medium">中标签</wd-tag>
          <wd-tag custom-class="space" type="warning" variant="dashed">默认标签</wd-tag>
          <wd-tag custom-class="space" type="warning" variant="dashed" size="large">较大标签</wd-tag>
          <wd-tag custom-class="space" type="warning" variant="dashed" size="extra-large">特大标签</wd-tag>
        </view>
        <view>
          <wd-tag custom-class="space" type="primary" round size="small">小标签</wd-tag>
          <wd-tag custom-class="space" type="primary" round size="medium">中标签</wd-tag>
          <wd-tag custom-class="space" type="primary" round>默认标签</wd-tag>
          <wd-tag custom-class="space" type="primary" round size="large">较大标签</wd-tag>
          <wd-tag custom-class="space" type="primary" round size="extra-large">特大标签</wd-tag>
        </view>
      </demo-block>

      <demo-block title="浅色标签">
        <wd-tag custom-class="space" variant="light">标签</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="light">常用标签</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="light">危险标签</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="light">警告标签</wd-tag>
        <wd-tag custom-class="space" type="success" variant="light">成功标签</wd-tag>
        <wd-tag custom-class="space" type="volcano" variant="light">{{ $t('biao-qian-volcano') }}</wd-tag>
        <wd-tag custom-class="space" type="lightblue" variant="light">{{ $t('biao-qian-lightblue') }}</wd-tag>
        <wd-tag custom-class="space" type="cyan" variant="light">{{ $t('biao-qian-cyan') }}</wd-tag>
      </demo-block>

      <demo-block title="镂空变体">
        <wd-tag custom-class="space" variant="plain">{{ $t('biao-qian-9') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="primary">{{ $t('biao-qian-10') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="danger">{{ $t('biao-qian-11') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="warning">{{ $t('biao-qian-12') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="success">{{ $t('biao-qian-13') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="pink">{{ $t('biao-qian-pink') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="purple">{{ $t('biao-qian-purple') }}</wd-tag>
      </demo-block>

      <demo-block title="虚线标签">
        <wd-tag custom-class="space" variant="dashed">标签</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="dashed">常用标签</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="dashed">危险标签</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="dashed">警告标签</wd-tag>
        <wd-tag custom-class="space" type="success" variant="dashed">成功标签</wd-tag>
      </demo-block>

      <demo-block title="纯文本标签">
        <wd-tag custom-class="space" variant="text">标签</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="text">常用标签</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="text">危险标签</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="text">警告标签</wd-tag>
        <wd-tag custom-class="space" type="success" variant="text">成功标签</wd-tag>
      </demo-block>

      <demo-block :title="$t('biao-ji-biao-qian')">
        <wd-tag custom-class="space" mark>{{ $t('biao-qian-14') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark>{{ $t('biao-qian-15') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" mark>{{ $t('biao-qian-16') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" mark>{{ $t('biao-qian-17') }}</wd-tag>
        <wd-tag custom-class="space" type="success" mark>{{ $t('biao-qian-18') }}</wd-tag>
      </demo-block>

      <demo-block :title="$t('you-ling-biao-ji-biao-qian')">
        <wd-tag custom-class="space" mark variant="plain">{{ $t('biao-qian-19') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark variant="plain">{{ $t('biao-qian-20') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" mark variant="plain">{{ $t('biao-qian-21') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" mark variant="plain">{{ $t('biao-qian-22') }}</wd-tag>
        <wd-tag custom-class="space" type="success" mark variant="plain">{{ $t('biao-qian-23') }}</wd-tag>
      </demo-block>

      <demo-block :title="$t('yuan-jiao-biao-qian')">
        <wd-tag custom-class="space" round>{{ $t('biao-qian-24') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" round>{{ $t('biao-qian-25') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" round>{{ $t('biao-qian-26') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" round>{{ $t('biao-qian-27') }}</wd-tag>
        <wd-tag custom-class="space" type="success" round>{{ $t('biao-qian-28') }}</wd-tag>
      </demo-block>

      <demo-block :title="$t('she-zhi-tu-biao')">
        <wd-tag custom-class="space" icon="clock-circle" type="primary" mark>{{ $t('biao-qian-29') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark>
          <text>{{ $t('cha-cao') }}</text>
          <template #icon>
            <wd-icon name="thunderbolt" />
          </template>
        </wd-tag>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yan-se-0')">
        <wd-tag custom-class="space" color="#0083ff" bg-color="#d0e8ff">{{ $t('biao-qian-30') }}</wd-tag>
        <wd-tag custom-class="space" color="#FAA21E" bg-color="#FAA21E" variant="plain">{{ $t('biao-qian-31') }}</wd-tag>
      </demo-block>

      <demo-block :title="$t('ke-guan-bi')">
        <wd-tag
          v-for="(tag, index) in closableStrongTags"
          :key="'dark-' + index"
          custom-class="space"
          :type="tag.type as any"
          closable
          @close="handleCloseStrongTag(index)"
        >
          {{ tag.value }}
        </wd-tag>
      </demo-block>
      <demo-block :title="$t('xin-zeng-biao-qian')">
        <wd-tag type="primary" v-for="(tag, index) in dynamicTags" :key="index" custom-class="space" closable @close="handleClose1(index)">
          {{ tag }}
        </wd-tag>
        <wd-tag type="primary" custom-class="space" dynamic @confirm="handleConfirm"></wd-tag>
        <wd-tag type="primary" custom-class="space" dynamic @confirm="handleConfirm">
          <template #add>
            <wd-icon name="pushpin" size="12px"></wd-icon>
            <text style="margin-left: 4px">{{ $t('zi-ding-yi') }}</text>
          </template>
        </wd-tag>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const closableLightTags = ref([
  { type: 'default', value: '标签' },
  { type: 'primary', value: '常用' },
  { type: 'danger', value: '危险' },
  { type: 'warning', value: '警告' },
  { type: 'success', value: '成功' }
])
const closableStrongTags = ref([
  { type: 'default', value: '标签' },
  { type: 'primary', value: '常用' },
  { type: 'danger', value: '危险' },
  { type: 'warning', value: '警告' },
  { type: 'success', value: '成功' }
])
const tags = ref([
  {
    variant: 'plain',
    closable: true,
    type: 'primary',
    value: t('biao-qian-yi')
  },
  {
    variant: 'plain',
    closable: true,
    type: 'danger',
    value: t('biao-qian-er')
  },
  {
    variant: 'plain',
    closable: true,
    type: 'warning',
    value: t('biao-qian-san')
  }
])
const closableDashedTags = ref([
  { type: 'default', value: '标签' },
  { type: 'primary', value: '常用' },
  { type: 'danger', value: '危险' },
  { type: 'warning', value: '警告' },
  { type: 'success', value: '成功' }
])
const dynamicTags = ref([t('biao-qian-yi-0'), t('biao-qian-er-0')])

function handleClick(index: number) {
  console.log('click:index' + index)
}
function handleClose(order: number) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}
function handleCloseLightTag(order: number) {
  closableLightTags.value = closableLightTags.value.filter((_, index) => index !== order)
}
function handleCloseStrongTag(order: number) {
  closableStrongTags.value = closableStrongTags.value.filter((_, index) => index !== order)
}
function handleCloseDashedTag(order: number) {
  closableDashedTags.value = closableDashedTags.value.filter((_, index) => index !== order)
}
function handleClickClose(size: string) {
  console.log('close:size-' + size)
}
function handleClose1(order: number) {
  dynamicTags.value = dynamicTags.value.filter((item, index) => {
    return index !== order
  })
}
function handleConfirm({ value }: any) {
  if (!value) return
  dynamicTags.value = [...dynamicTags.value, value]
}
</script>
<style lang="scss" scoped>
:deep(.space) {
  margin: 0 10px 10px;
}

.demo-section-title {
  font-size: 13px;
  color: #666;
  margin: 8px 10px 4px;
}
</style>
