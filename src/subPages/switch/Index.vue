<template>
  <page-wraper>
    <wd-dialog></wd-dialog>
    <view class="page-switch">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-switch v-model="checked1" @change="handleChange1" />
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-zhi-activevalue-inactivevalue')">
          <view class="switch-value">{{ checked2 }}</view>
          <wd-switch v-model="checked2" active-value="上班" inactive-value="下班" @change="handleChange2" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jia-zai-zhuang-tai')">
          <wd-switch v-model="checked9" loading active-text="上班" inactive-text="下班" />
          <wd-switch v-model="checked10" loading active-text="上班" inactive-text="下班" custom-class="ml-3" />
        </demo-group-item>
        <demo-group-item :title="$t('jin-yong-zhuang-tai')">
          <wd-switch v-model="checked5" disabled />
          <wd-switch v-model="checked6" disabled custom-class="ml-3" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-yan-se-activecolor-inactivecolor')">
          <wd-switch v-model="checked3" active-color="#13ce66" inactive-color="#f00" @change="handleChange3" />
        </demo-group-item>
        <demo-group-item :title="$t('wen-zi-miao-shu')">
          <wd-switch v-model="checked8" active-text="上班" inactive-text="下班" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-xian-shi-tu-biao')">
          <wd-switch v-model="checked11" active-icon="check" inactive-icon="close" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-dong-zuo-tu-biao')">
          <wd-switch v-model="checked12" active-action-icon="check" inactive-action-icon="close" />
        </demo-group-item>
        <demo-group-item :title="$t('xing-zhuang')">
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

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('da-pei-biao-dan-shi-yong')" no-padding>
          <wd-form-item :title="$t('da-pei-biao-dan-shi-yong-0')" center>
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
const checked2 = ref<string>(t('shang-ban'))
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
