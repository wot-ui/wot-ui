<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-textarea v-model="value1" :placeholder="$t('qing-tian-xie-ping-jia')" />
    </demo-block>
    <demo-block :title="$t('zhi-du')" transparent>
      <wd-textarea v-model="value8" readonly clearable></wd-textarea>
    </demo-block>
    <demo-block :title="$t('jinYong')" transparent>
      <wd-textarea v-model="value11" disabled clearable></wd-textarea>
    </demo-block>
    <demo-block :title="$t('qing-kong-an-niu-he-zi-shu-xian-zhi')" transparent>
      <wd-textarea v-model="value2" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu')" transparent>
      <wd-textarea clear-trigger="focus" v-model="value14" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('dian-ji-qing-chu-an-niu-shi-bu-zi-dong-ju-jiao')" transparent>
      <wd-textarea v-model="value15" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('gao-du-zi-shi-ying')" transparent>
      <wd-textarea v-model="value3" auto-height clearable></wd-textarea>
    </demo-block>

    <demo-block title="紧凑布局" transparent>
      <wd-textarea v-model="value7" compact :placeholder="$t('qing-tian-xie-ping-jia')" />
    </demo-block>

    <demo-block title="结合表单使用" transparent>
      <wd-form :model="formData" border title-width="98px">
        <wd-form-item title="基本用法" prop="basic">
          <wd-textarea v-model="formData.basic" placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="禁用" prop="disabled">
          <wd-textarea v-model="formData.disabled" disabled placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="清空按钮" prop="clearable">
          <wd-textarea v-model="formData.clearable" clearable placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="高度自适应" prop="autoHeight">
          <wd-textarea v-model="formData.autoHeight" auto-height clearable placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="字数限制" prop="limit">
          <wd-textarea v-model="formData.limit" :maxlength="240" show-word-limit clearable compact placeholder="请输入" />
        </wd-form-item>
        <wd-form-item title="必填" prop="required" required>
          <wd-textarea v-model="formData.required" placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="只读" prop="readonly">
          <wd-textarea v-model="formData.readonly" readonly :maxlength="240" show-word-limit placeholder="请输入" compact />
        </wd-form-item>
      </wd-form>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value1 = ref<string>('')
const value2 = ref<string>(t('zhi-chi-qing-kong-he-zi-shu-xian-zhi-de-wen-ben-yu'))
const value3 = ref<string>(t('shu-ru-wen-zi-hou-shu-ru-kuang-gao-du-gen-sui-zi-shu-duo-shao-bian-hua'))
const value7 = ref<string>('')
const value8 = ref<string>(t('zhi-du-zhi-du-zhi-du'))
const value11 = ref<string>(t('jin-yong-jin-yong-jin-yong'))
const value14 = ref<string>('')
const value15 = ref<string>('')

// 表单数据
const formData = ref({
  basic: '',
  disabled: t('gai-shu-ru-kuang-jin-yong'),
  clearable: '',
  autoHeight: '',
  limit: '',
  required: '',
  readonly: t('zhi-du-zhi-du-zhi-du-0')
})
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix-slot {
  display: inline-block;
  height: 37px;
  line-height: 37px;
  margin-left: 8px;
  vertical-align: middle;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
