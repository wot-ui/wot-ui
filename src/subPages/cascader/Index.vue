<template>
  <page-wraper>
    <view class="page-cascader">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <wd-cell-group border>
          <wd-cell :title="$t('ji-chu-yong-fa')" is-link :value="showValue1" @click="show1 = true" />
          <wd-cell :title="$t('chu-shi-xuan-xiang')" is-link :value="showValue2" @click="show2 = true" />
          <wd-cell :title="$t('zi-ding-yi-zi-duan')" is-link :value="showValue9" @click="show9 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value1" v-model:visible="show1" :options="areaData" @confirm="handleConfirm1" />
        <wd-cascader v-model="value2" v-model:visible="show2" :options="areaData" @confirm="handleConfirm2" />
        <wd-cascader
          v-model="value9"
          v-model:visible="show9"
          :options="areaData9"
          value-key="id"
          text-key="name"
          children-key="items"
          @confirm="handleConfirm9"
        />
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <wd-cell-group border>
          <wd-cell :title="$t('jin-yong-xuan-xiang')" is-link :value="showValue3" @click="show3 = true" />
          <wd-cell :title="$t('xuan-xiang-ti-shi-xin-xi')" is-link :value="showValue4" @click="show4 = true" />
          <wd-cell title="before-confirm" is-link :value="showValue7" @click="show7 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value3" v-model:visible="show3" :options="areaData3" @confirm="handleConfirm3" />
        <wd-cascader v-model="value4" v-model:visible="show4" :options="areaData4" @confirm="handleConfirm4" />
        <wd-cascader v-model="value7" v-model:visible="show7" :options="areaData" :before-confirm="beforeConfirm" @confirm="handleConfirm7" />
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <wd-cell-group border>
          <wd-cell :title="$t('zhan-shi-ge-shi-hua')" is-link :value="showValue5" @click="show5 = true" />
          <wd-cell :title="$t('biaoTi-0')" is-link :value="showValue6" @click="show6 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value5" v-model:visible="show5" :options="areaData" @confirm="handleConfirm5" />
        <wd-cascader v-model="value6" v-model:visible="show6" :title="$t('xuan-ze-di-zhi')" :options="areaData" @confirm="handleConfirm6" />
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <wd-cell-group border>
          <wd-cell :title="$t('yi-bu-jia-zai')" is-link :value="showValue10" @click="show10 = true" />
          <wd-cell :title="$t('yi-bu-jia-zai-wu-chu-shi-zhi')" is-link :value="showValue11" @click="show11 = true" />
          <wd-cell :title="$t('ren-yi-ji-ke-xuan')" is-link :value="showValue12" @click="show12 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value10" v-model:visible="show10" :lazy-load="lazyLoad10" @confirm="handleConfirm10" />
        <wd-cascader v-model="value11" v-model:visible="show11" :lazy-load="lazyLoad11" @confirm="handleConfirm11" />
        <wd-cascader v-model="value12" v-model:visible="show12" :options="areaData" check-strictly @confirm="handleConfirm12" />
      </demo-group>
    </view>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import { useCascaderAreaData } from '@vant/area-data'
import { useI18n } from 'vue-i18n'
import { type CascaderOption, type CascaderLazyLoad } from '@/uni_modules/wot-ui/components/wd-cascader/types'

const { t } = useI18n()
const toast = useToast()

const value1 = ref<string>('')
const showValue1 = ref<string>('')
const show1 = ref<boolean>(false)

const value2 = ref<string>('150121')
const showValue2 = ref<string>(t('nei-meng-gu-zi-zhi-qu-hu-he-hao-te-shi-tu-mo-te-zuo-qi'))
const show2 = ref<boolean>(false)

const value3 = ref<string>('')
const showValue3 = ref<string>('')
const show3 = ref<boolean>(false)

const value4 = ref<string>('')
const showValue4 = ref<string>('')
const show4 = ref<boolean>(false)

const value5 = ref<string>('130204')
const showValue5 = ref<string>(t('tang-shan-shi-gu-ye-qu'))
const show5 = ref<boolean>(false)

const value6 = ref<string>('')
const showValue6 = ref<string>('')
const show6 = ref<boolean>(false)

const value7 = ref<string>('')
const showValue7 = ref<string>('')
const show7 = ref<boolean>(false)

const value9 = ref<number>(1)
const showValue9 = ref<string>(t('xuan-xiang-yi-xuan-xiang-yi-yi'))
const show9 = ref<boolean>(false)
const areaData9 = computed<CascaderOption[]>(() => [
  {
    id: 1,
    name: t('xuan-xiang-yi'),
    items: [
      { id: 11, name: t('xuan-xiang-yi-yi') },
      { id: 12, name: t('xuan-xiang-yi-er') }
    ]
  },
  {
    id: 2,
    name: t('xuan-xiang-er'),
    items: [
      { id: 21, name: t('xuan-xiang-er-yi') },
      { id: 22, name: t('xuan-xiang-er-er') }
    ]
  }
])

// 基础全量结构数据
const areaData = useCascaderAreaData()

// 禁用某省的列数据
const addDisabled = (data: CascaderOption[], disabledCodes: string[]): CascaderOption[] => {
  return data.map((item) => ({
    value: item.value,
    text: item.text,
    disabled: disabledCodes.includes(`${item.value}`),
    children: item.children ? addDisabled(item.children, disabledCodes) : undefined
  }))
}
const areaData3 = computed<CascaderOption[]>(() => addDisabled(areaData, ['140000']))

// 带提示信息的列数据
const addTip = (data: CascaderOption[], tipMap: Record<string, string>): CascaderOption[] => {
  return data.map((item) => ({
    value: item.value,
    text: item.text,
    disabled: item.value === '140000',
    tip: item.value ? tipMap[item.value] || '' : '',
    children: item.children ? addTip(item.children, tipMap) : undefined
  }))
}
const areaData4 = ref<any[]>(
  addTip(areaData, {
    '140000': t('gai-di-qu-wu-huo-zan-shi-wu-fa-xuan-ze'),
    '150000': t('gai-di-qu-pei-song-shi-jian-ke-neng-jiao-chang')
  })
)

const beforeConfirm = (value: string | number, selectedOptions: Record<string, any>[]) => {
  if (parseInt(String(value)) > 120000) {
    toast.error(t('gai-di-qu-ku-cun-bu-zu'))
    return false
  }
  return true
}

const handleConfirm1 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue1.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm2 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue2.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm3 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue3.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm4 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue4.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm5 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue5.value = selectedOptions[selectedOptions.length - 2].text + '-' + selectedOptions[selectedOptions.length - 1].text
}

const handleConfirm6 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue6.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm7 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue7.value = selectedOptions.map((item) => item.text).join('/')
}

const handleConfirm9 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue9.value = selectedOptions.map((item: any) => item.name).join('/')
}

// ── 异步加载示例 ────────────────────────────────────────────────
// 模拟三级地区数据，实际场景中由接口返回
const asyncProvinces = computed<CascaderOption[]>(() => [
  { value: '110000', text: t('bei-jing-shi'), isLeaf: false },
  { value: '130000', text: t('he-bei-sheng'), isLeaf: false },
  { value: '440000', text: t('guang-dong-sheng'), isLeaf: false }
])

const asyncCities = computed<Record<string, CascaderOption[]>>(() => {
  return {
    '110000': [{ value: '110100', text: t('bei-jing-shi-xia-qu'), isLeaf: false }],
    '130000': [
      { value: '130100', text: t('shi-jia-zhuang-shi'), isLeaf: false },
      { value: '130200', text: t('tang-shan-shi'), isLeaf: false }
    ],
    '440000': [
      { value: '440100', text: t('guang-zhou-shi'), isLeaf: false },
      { value: '440300', text: t('shen-zhen-shi'), isLeaf: false }
    ]
  }
})

const asyncDistricts = computed<Record<string, CascaderOption[]>>(() => {
  return {
    '110100': [
      { value: '110101', text: t('dong-cheng-qu'), isLeaf: true },
      { value: '110102', text: t('xi-cheng-qu'), isLeaf: true }
    ],
    '130100': [
      { value: '130102', text: t('chang-an-qu'), isLeaf: true },
      { value: '130104', text: t('qiao-xi-qu'), isLeaf: true }
    ],
    '130200': [
      { value: '130202', text: t('lu-nan-qu'), isLeaf: true },
      { value: '130204', text: t('gu-ye-qu'), isLeaf: true }
    ],
    '440100': [
      { value: '440103', text: t('li-wan-qu'), isLeaf: true },
      { value: '440104', text: t('yue-xiu-qu'), isLeaf: true }
    ],
    '440300': [
      { value: '440303', text: t('luo-hu-qu'), isLeaf: true },
      { value: '440304', text: t('fu-tian-qu'), isLeaf: true }
    ]
  }
})

/** 模拟异步请求，延迟 300ms 返回子节点数据 */
function fetchChildren(parentValue: string | null): Promise<CascaderOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (parentValue === null) {
        resolve(asyncProvinces.value)
      } else if (asyncCities.value[parentValue]) {
        resolve(asyncCities.value[parentValue])
      } else if (asyncDistricts.value[parentValue]) {
        resolve(asyncDistricts.value[parentValue])
      } else {
        resolve([])
      }
    }, 300)
  })
}

const value10 = ref<(string | number)[]>(['130000', '130200', '130204'])
const showValue10 = ref<string>(t('he-bei-sheng-tang-shan-shi-gu-ye-qu'))
const show10 = ref<boolean>(false)

const lazyLoad10: CascaderLazyLoad = (option, _tabIndex, resolve) => {
  fetchChildren(option ? String(option.value) : null).then(resolve)
}

const handleConfirm10 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue10.value = selectedOptions.map((item) => item.text).join('/')
}

// 无初始值的异步加载示例 - 行业分类数据
/** 行业一级分类 */
const industryCategories = computed<CascaderOption[]>(() => {
  return [
    { value: 'it', text: t('it-hu-lian-wang'), isLeaf: false },
    { value: 'finance', text: t('jin-rong'), isLeaf: false },
    { value: 'healthcare', text: t('yi-liao-jian-kang'), isLeaf: false }
  ]
})

/** 行业二级分类 */
const industrySubcategories = computed<Record<string, CascaderOption[]>>(() => {
  return {
    it: [
      { value: 'it-dev', text: t('ruan-jian-kai-fa'), isLeaf: false },
      { value: 'it-ops', text: t('yun-wei'), isLeaf: false }
    ],
    finance: [
      { value: 'finance-bank', text: t('yin-hang'), isLeaf: false },
      { value: 'finance-insurance', text: t('bao-xian'), isLeaf: false }
    ],
    healthcare: [
      { value: 'health-hospital', text: t('yi-yuan'), isLeaf: false },
      { value: 'health-pharma', text: t('zhi-yao'), isLeaf: false }
    ]
  }
})

/** 行业三级岗位 */
const industryPositions = computed<Record<string, CascaderOption[]>>(() => {
  return {
    'it-dev': [
      { value: 'it-dev-fe', text: t('qian-duan-kai-fa'), isLeaf: true },
      { value: 'it-dev-be', text: t('hou-duan-kai-fa'), isLeaf: true }
    ],
    'it-ops': [
      { value: 'it-ops-devops', text: 'DevOps', isLeaf: true },
      { value: 'it-ops-admin', text: t('xi-tong-guan-li-yuan'), isLeaf: true }
    ],
    'finance-bank': [
      { value: 'finance-bank-teller', text: t('gui-yuan'), isLeaf: true },
      { value: 'finance-bank-manager', text: t('jing-li'), isLeaf: true }
    ],
    'finance-insurance': [
      { value: 'finance-insurance-agent', text: t('dai-li-ren'), isLeaf: true },
      { value: 'finance-insurance-adjuster', text: t('li-pei-yuan'), isLeaf: true }
    ],
    'health-hospital': [
      { value: 'health-hospital-doctor', text: t('yi-sheng'), isLeaf: true },
      { value: 'health-hospital-nurse', text: t('hu-shi'), isLeaf: true }
    ],
    'health-pharma': [
      { value: 'health-pharma-researcher', text: t('yan-jiu-yuan'), isLeaf: true },
      { value: 'health-pharma-production', text: t('sheng-chan-yuan'), isLeaf: true }
    ]
  }
})

function fetchIndustryChildren(parentValue: string | null): Promise<CascaderOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (parentValue === null) {
        resolve(industryCategories.value)
      } else if (industrySubcategories.value[parentValue]) {
        resolve(industrySubcategories.value[parentValue])
      } else if (industryPositions.value[parentValue]) {
        resolve(industryPositions.value[parentValue])
      } else {
        resolve([])
      }
    }, 300)
  })
}

const value11 = ref<string>('')
const showValue11 = ref<string>('')
const show11 = ref<boolean>(false)

const value12 = ref<string>('')
const showValue12 = ref<string>('')
const show12 = ref<boolean>(false)

const lazyLoad11: CascaderLazyLoad = (option, _tabIndex, resolve) => {
  fetchIndustryChildren(option ? String(option.value) : null).then(resolve)
}

const handleConfirm11 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue11.value = selectedOptions.map((item) => item.text).join(' / ')
}

const handleConfirm12 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue12.value = selectedOptions.map((item) => item.text).join('/')
}
</script>
<style lang="scss"></style>
