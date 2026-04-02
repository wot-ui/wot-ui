<template>
  <page-wraper>
    <wd-dialog></wd-dialog>
    <view class="page-switch">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-switch v-model="checked1" @change="handleChange1" />
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-zhi-activevalue-inactivevalue')">
          <view class="switch-value">{{ checked2 }}</view>
          <wd-switch v-model="checked2" active-value="上班" inactive-value="下班" @change="handleChange2" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item title="加载状态">
          <wd-switch v-model="checked9" loading active-text="上班" inactive-text="下班" />
          <wd-switch v-model="checked10" loading active-text="上班" inactive-text="下班" custom-class="ml-3" />
        </demo-group-item>
        <demo-group-item title="禁用状态">
          <wd-switch v-model="checked5" disabled />
          <wd-switch v-model="checked6" disabled custom-class="ml-3" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('zi-ding-yi-yan-se-activecolor-inactivecolor')">
          <wd-switch v-model="checked3" active-color="#13ce66" inactive-color="#f00" @change="handleChange3" />
        </demo-group-item>
        <demo-group-item title="文字描述">
          <wd-switch v-model="checked8" active-text="上班" inactive-text="下班" />
        </demo-group-item>
        <demo-group-item title="自定义显示图标">
          <wd-switch v-model="checked11" active-icon="check" inactive-icon="close" />
        </demo-group-item>
        <demo-group-item title="自定义动作图标">
          <wd-switch v-model="checked12" active-action-icon="check" inactive-action-icon="close" />
        </demo-group-item>
        <demo-group-item title="形状">
          <wd-switch v-model="checked9" shape="round" active-text="全圆" inactive-text="全圆" />
          <wd-switch v-model="checked10" shape="square" active-text="直角" inactive-text="直角" custom-class="ml-3" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-da-xiao')">
          <wd-switch v-model="checked4" :size="24" />
          <wd-switch v-model="checked4" :size="32" custom-class="ml-3" />
          <wd-switch v-model="checked4" :size="40" custom-class="ml-3" />
          <wd-switch v-model="checked4" :size="48" custom-class="ml-3" />
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item title="搭配表单使用" no-padding>
          <wd-form-item title="搭配表单使用" center>
            <wd-switch v-model="checked13" size="20" />
          </wd-form-item>
        </demo-group-item>
        <demo-group-item :title="$t('beforechange-xiu-gai-qian-gou-zi-han-shu')">
          <wd-switch v-model="checked7" :before-change="beforeChange" @change="handleChange5" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useDialog } from '@/uni_modules/wot-ui'
import type { SwitchBeforeChange } from '@/uni_modules/wot-ui/components/wd-switch/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const checked1 = ref<boolean>(true)
const checked2 = ref<'上班' | '下班'>('上班')
const checked3 = ref<boolean>(true)
const checked4 = ref<boolean>(true)
const checked5 = ref<boolean>(true)
const checked6 = ref<boolean>(false)
const checked7 = ref<boolean>(false)
const checked8 = ref<boolean>(true)
const checked9 = ref<boolean>(true)
const checked10 = ref<boolean>(false)
const checked11 = ref<boolean>(false)
const checked12 = ref<boolean>(false)
const checked13 = ref<boolean>(false)

const message = useDialog()

const beforeChange: SwitchBeforeChange = (value) => {
  return message
    .confirm(t('shi-fou-qie-huan-kai-guan'))
    .then(() => true)
    .catch(() => false)
}
function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
function handleChange5({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.ml-3 {
  margin-left: 12px;
}

.switch-value {
  margin-bottom: 10px;
}
</style>
