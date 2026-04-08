<template>
  <page-wraper>
    <demo-group :title="$t('zu-jian-lei-xing')">
      <demo-group-item :title="$t('jiBenYongFa')">
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
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-bian-ti')">
      <demo-group-item :title="$t('biao-qian-chi-cun')">
        <view>
          <wd-tag custom-class="space" type="primary" size="small">{{ $t('xiao-biao-qian') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" size="medium">{{ $t('zhong-biao-qian') }}</wd-tag>
          <wd-tag custom-class="space" type="primary">{{ $t('mo-ren-biao-qian') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" size="large">{{ $t('jiao-da-biao-qian') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" size="extra-large">{{ $t('te-da-biao-qian') }}</wd-tag>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('qian-se-biao-qian')">
        <wd-tag custom-class="space" variant="light">{{ $t('biao-qian-item') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="light">{{ $t('chang-yong-biao-qian') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="light">{{ $t('wei-xian-biao-qian') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="light">{{ $t('jing-gao-biao-qian') }}</wd-tag>
        <wd-tag custom-class="space" type="success" variant="light">{{ $t('cheng-gong-biao-qian') }}</wd-tag>
        <wd-tag custom-class="space" type="volcano" variant="light">{{ $t('biao-qian-volcano') }}</wd-tag>
        <wd-tag custom-class="space" type="lightblue" variant="light">{{ $t('biao-qian-lightblue') }}</wd-tag>
        <wd-tag custom-class="space" type="cyan" variant="light">{{ $t('biao-qian-cyan') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('lou-kong-bian-ti')">
        <wd-tag custom-class="space" variant="plain">{{ $t('biao-qian-9') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="primary">{{ $t('biao-qian-10') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="danger">{{ $t('biao-qian-11') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="warning">{{ $t('biao-qian-12') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="success">{{ $t('biao-qian-13') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="pink">{{ $t('biao-qian-pink') }}</wd-tag>
        <wd-tag custom-class="space" variant="plain" type="purple">{{ $t('biao-qian-purple') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('xu-xian-biao-qian')">
        <wd-tag custom-class="space" variant="dashed">{{ $t('biao-qian-item') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="dashed">{{ $t('chang-yong-biao-qian-0') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="dashed">{{ $t('wei-xian-biao-qian-0') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="dashed">{{ $t('jing-gao-biao-qian-0') }}</wd-tag>
        <wd-tag custom-class="space" type="success" variant="dashed">{{ $t('cheng-gong-biao-qian-0') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('chun-wen-ben-biao-qian')">
        <wd-tag custom-class="space" variant="text">{{ $t('biao-qian-item') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" variant="text">{{ $t('chang-yong-biao-qian-1') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" variant="text">{{ $t('wei-xian-biao-qian-1') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" variant="text">{{ $t('jing-gao-biao-qian-1') }}</wd-tag>
        <wd-tag custom-class="space" type="success" variant="text">{{ $t('cheng-gong-biao-qian-1') }}</wd-tag>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-yang-shi')">
      <demo-group-item :title="$t('biao-ji-biao-qian')">
        <wd-tag custom-class="space" mark>{{ $t('biao-qian-14') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark>{{ $t('biao-qian-15') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" mark>{{ $t('biao-qian-16') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" mark>{{ $t('biao-qian-17') }}</wd-tag>
        <wd-tag custom-class="space" type="success" mark>{{ $t('biao-qian-18') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('you-ling-biao-ji-biao-qian')">
        <wd-tag custom-class="space" mark variant="plain">{{ $t('biao-qian-19') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark variant="plain">{{ $t('biao-qian-20') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" mark variant="plain">{{ $t('biao-qian-21') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" mark variant="plain">{{ $t('biao-qian-22') }}</wd-tag>
        <wd-tag custom-class="space" type="success" mark variant="plain">{{ $t('biao-qian-23') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('yuan-jiao-biao-qian')">
        <wd-tag custom-class="space" round>{{ $t('biao-qian-24') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" round>{{ $t('biao-qian-25') }}</wd-tag>
        <wd-tag custom-class="space" type="danger" round>{{ $t('biao-qian-26') }}</wd-tag>
        <wd-tag custom-class="space" type="warning" round>{{ $t('biao-qian-27') }}</wd-tag>
        <wd-tag custom-class="space" type="success" round>{{ $t('biao-qian-28') }}</wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('she-zhi-tu-biao')">
        <wd-tag custom-class="space" icon="clock-circle" type="primary" mark>{{ $t('biao-qian-29') }}</wd-tag>
        <wd-tag custom-class="space" type="primary" mark>
          <text>{{ $t('cha-cao') }}</text>
          <template #icon>
            <wd-icon name="thunderbolt" />
          </template>
        </wd-tag>
      </demo-group-item>
      <demo-group-item :title="$t('zi-ding-yi-yan-se-0')">
        <wd-tag custom-class="space" color="#0083ff" bg-color="#d0e8ff">{{ $t('biao-qian-30') }}</wd-tag>
        <wd-tag custom-class="space" color="#FAA21E" bg-color="#FAA21E" variant="plain">{{ $t('biao-qian-31') }}</wd-tag>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('te-shu-yang-shi')">
      <demo-group-item :title="$t('ke-guan-bi')">
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
      </demo-group-item>
      <demo-group-item :title="$t('xin-zeng-biao-qian')">
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
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const closableStrongTags = ref([
  { type: 'default', value: t('biao-qian-item') },
  { type: 'primary', value: t('chang-yong') },
  { type: 'danger', value: t('wei-xian') },
  { type: 'warning', value: t('jing-gao') },
  { type: 'success', value: t('cheng-gong') }
])
const dynamicTags = ref([t('biao-qian-yi-0'), t('biao-qian-er-0')])
function handleCloseStrongTag(order: number) {
  closableStrongTags.value = closableStrongTags.value.filter((_, index) => index !== order)
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
