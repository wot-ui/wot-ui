<template>
  <page-wraper>
    <view class="page-password-input">
      <demo-group :title="$t('zu-jian-lei-xing')" transparent>
        <demo-group-item :title="$t('jiBenYongFa')" no-padding>
          <wd-password-input v-model="value1" :focused="visible1" @focus="showKeyBoard(1)" />
          <wd-keyboard v-model="value1" v-model:visible="visible1" :maxlength="6" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')" transparent>
        <demo-group-item :title="$t('zi-ding-yi-chang-du')" no-padding>
          <wd-password-input v-model="value2" :length="4" :focused="visible2" @focus="showKeyBoard(2)" />
          <wd-keyboard v-model="value2" v-model:visible="visible2" :maxlength="4" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')" transparent>
        <demo-group-item :title="$t('ge-zi-jian-ju')" no-padding>
          <wd-password-input v-model="value3" :gutter="10" :focused="visible3" @focus="showKeyBoard(3)" />
          <wd-keyboard v-model="value3" v-model:visible="visible3" :maxlength="6" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')" transparent>
        <demo-group-item :title="$t('ming-wen-zhan-shi')" no-padding>
          <wd-password-input v-model="value4" :mask="false" :focused="visible4" @focus="showKeyBoard(4)" />
          <wd-keyboard v-model="value4" v-model:visible="visible4" :maxlength="6" />
        </demo-group-item>
        <demo-group-item :title="$t('ti-shi-xin-xi')" no-padding>
          <wd-password-input v-model="value5" info="密码为 6 位数字" :error-info="errorInfo" :focused="visible5" @focus="showKeyBoard(5)" />
          <wd-keyboard v-model="value5" v-model:visible="visible5" :maxlength="6" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')" transparent>
        <demo-group-item :title="$t('sui-ji-jian-pan')" no-padding>
          <wd-password-input v-model="value6" :focused="visible6" @focus="showKeyBoard(6)" />
          <wd-keyboard v-model="value6" v-model:visible="visible6" :maxlength="6" random-key-order />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value1 = ref<string>('123')
const value2 = ref<string>('12')
const value3 = ref<string>('123')
const value4 = ref<string>('123')
const value5 = ref<string>('123')
const value6 = ref<string>('12')
const errorInfo = ref<string>('')

const visible1 = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const visible4 = ref<boolean>(false)
const visible5 = ref<boolean>(false)
const visible6 = ref<boolean>(false)

const visibleArr = [visible1, visible2, visible3, visible4, visible5, visible6]

function showKeyBoard(index: number) {
  visibleArr.forEach((item, i) => (i === index - 1 ? (item.value = true) : (item.value = false)))
}

watch(value5, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = t('mi-ma-cuo-wu')
  } else {
    errorInfo.value = ''
  }
})
</script>
<style lang="scss" scoped>
.page-password-input {
  padding-bottom: 240px;
}
</style>
