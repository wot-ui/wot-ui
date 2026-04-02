<template>
  <page-wraper>
    <view class="page-cascader">
      <demo-group title="组件类型">
        <wd-cell-group border>
          <wd-cell :title="$t('ji-chu-yong-fa')" is-link :value="showValue1" @click="show1 = true" />
          <wd-cell :title="$t('chu-shi-xuan-xiang')" is-link :value="showValue2" @click="show2 = true" />
          <wd-cell title="自定义字段" is-link :value="showValue9" @click="show9 = true" />
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

      <demo-group title="组件状态">
        <wd-cell-group border>
          <wd-cell :title="$t('jin-yong-xuan-xiang')" is-link :value="showValue3" @click="show3 = true" />
          <wd-cell :title="$t('xuan-xiang-ti-shi-xin-xi')" is-link :value="showValue4" @click="show4 = true" />
          <wd-cell title="before-confirm" is-link :value="showValue7" @click="show7 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value3" v-model:visible="show3" :options="areaData3" @confirm="handleConfirm3" />
        <wd-cascader v-model="value4" v-model:visible="show4" :options="areaData4" @confirm="handleConfirm4" />
        <wd-cascader v-model="value7" v-model:visible="show7" :options="areaData" :before-confirm="beforeConfirm" @confirm="handleConfirm7" />
      </demo-group>

      <demo-group title="组件样式">
        <wd-cell-group border>
          <wd-cell :title="$t('zhan-shi-ge-shi-hua')" is-link :value="showValue5" @click="show5 = true" />
          <wd-cell :title="$t('biaoTi-0')" is-link :value="showValue6" @click="show6 = true" />
        </wd-cell-group>
        <wd-cascader v-model="value5" v-model:visible="show5" :options="areaData" @confirm="handleConfirm5" />
        <wd-cascader v-model="value6" v-model:visible="show6" :title="$t('xuan-ze-di-zhi')" :options="areaData" @confirm="handleConfirm6" />
      </demo-group>

      <demo-group title="特殊样式">
        <wd-cell-group border>
          <wd-cell title="异步加载" is-link :value="showValue10" @click="show10 = true" />
          <wd-cell title="异步加载（无初始值）" is-link :value="showValue11" @click="show11 = true" />
          <wd-cell title="任意级可选" is-link :value="showValue12" @click="show12 = true" />
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
import { ref } from 'vue'
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
const showValue2 = ref<string>('内蒙古自治区/呼和浩特市/土默特左旗')
const show2 = ref<boolean>(false)

const value3 = ref<string>('')
const showValue3 = ref<string>('')
const show3 = ref<boolean>(false)

const value4 = ref<string>('')
const showValue4 = ref<string>('')
const show4 = ref<boolean>(false)

const value5 = ref<string>('130204')
const showValue5 = ref<string>('唐山市-古冶区')
const show5 = ref<boolean>(false)

const value6 = ref<string>('')
const showValue6 = ref<string>('')
const show6 = ref<boolean>(false)

const value7 = ref<string>('')
const showValue7 = ref<string>('')
const show7 = ref<boolean>(false)

const value9 = ref<number>(1)
const showValue9 = ref<string>('选项一/选项一-一')
const show9 = ref<boolean>(false)
const areaData9 = ref<any[]>([
  {
    id: 1,
    name: '选项一',
    items: [
      { id: 11, name: '选项一-一' },
      { id: 12, name: '选项一-二' }
    ]
  },
  {
    id: 2,
    name: '选项二',
    items: [
      { id: 21, name: '选项二-一' },
      { id: 22, name: '选项二-二' }
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
const areaData3 = ref(addDisabled(areaData, ['140000']))

// 带提示信息的列数据
const addTip = (data: CascaderOption[], tipMap: Record<string, string>): CascaderOption[] => {
  return data.map((item) => ({
    value: item.value,
    text: item.text,
    disabled: item.value === '140000',
    tip: tipMap[item.value] || '',
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
const asyncProvinces: CascaderOption[] = [
  { value: '110000', text: '北京市', isLeaf: false },
  { value: '130000', text: '河北省', isLeaf: false },
  { value: '440000', text: '广东省', isLeaf: false }
]

const asyncCities: Record<string, CascaderOption[]> = {
  '110000': [{ value: '110100', text: '北京市辖区', isLeaf: false }],
  '130000': [
    { value: '130100', text: '石家庄市', isLeaf: false },
    { value: '130200', text: '唐山市', isLeaf: false }
  ],
  '440000': [
    { value: '440100', text: '广州市', isLeaf: false },
    { value: '440300', text: '深圳市', isLeaf: false }
  ]
}

const asyncDistricts: Record<string, CascaderOption[]> = {
  '110100': [
    { value: '110101', text: '东城区', isLeaf: true },
    { value: '110102', text: '西城区', isLeaf: true }
  ],
  '130100': [
    { value: '130102', text: '长安区', isLeaf: true },
    { value: '130104', text: '桥西区', isLeaf: true }
  ],
  '130200': [
    { value: '130202', text: '路南区', isLeaf: true },
    { value: '130204', text: '古冶区', isLeaf: true }
  ],
  '440100': [
    { value: '440103', text: '荔湾区', isLeaf: true },
    { value: '440104', text: '越秀区', isLeaf: true }
  ],
  '440300': [
    { value: '440303', text: '罗湖区', isLeaf: true },
    { value: '440304', text: '福田区', isLeaf: true }
  ]
}

/** 模拟异步请求，延迟 300ms 返回子节点数据 */
function fetchChildren(parentValue: string | null): Promise<CascaderOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (parentValue === null) {
        resolve(asyncProvinces)
      } else if (asyncCities[parentValue]) {
        resolve(asyncCities[parentValue])
      } else if (asyncDistricts[parentValue]) {
        resolve(asyncDistricts[parentValue])
      } else {
        resolve([])
      }
    }, 300)
  })
}

const value10 = ref<(string | number)[]>(['130000', '130200', '130204'])
const showValue10 = ref<string>('河北省/唐山市/古冶区')
const show10 = ref<boolean>(false)

const lazyLoad10: CascaderLazyLoad = (option, _tabIndex, resolve) => {
  fetchChildren(option ? String(option.value) : null).then(resolve)
}

const handleConfirm10 = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showValue10.value = selectedOptions.map((item) => item.text).join('/')
}

// 无初始值的异步加载示例 - 行业分类数据
/** 行业一级分类 */
const industryCategories: CascaderOption[] = [
  { value: 'it', text: 'IT 互联网', isLeaf: false },
  { value: 'finance', text: '金融', isLeaf: false },
  { value: 'healthcare', text: '医疗健康', isLeaf: false }
]

/** 行业二级分类 */
const industrySubcategories: Record<string, CascaderOption[]> = {
  it: [
    { value: 'it-dev', text: '软件开发', isLeaf: false },
    { value: 'it-ops', text: '运维', isLeaf: false }
  ],
  finance: [
    { value: 'finance-bank', text: '银行', isLeaf: false },
    { value: 'finance-insurance', text: '保险', isLeaf: false }
  ],
  healthcare: [
    { value: 'health-hospital', text: '医院', isLeaf: false },
    { value: 'health-pharma', text: '制药', isLeaf: false }
  ]
}

/** 行业三级岗位 */
const industryPositions: Record<string, CascaderOption[]> = {
  'it-dev': [
    { value: 'it-dev-fe', text: '前端开发', isLeaf: true },
    { value: 'it-dev-be', text: '后端开发', isLeaf: true }
  ],
  'it-ops': [
    { value: 'it-ops-devops', text: 'DevOps', isLeaf: true },
    { value: 'it-ops-admin', text: '系统管理员', isLeaf: true }
  ],
  'finance-bank': [
    { value: 'finance-bank-teller', text: '柜员', isLeaf: true },
    { value: 'finance-bank-manager', text: '经理', isLeaf: true }
  ],
  'finance-insurance': [
    { value: 'finance-insurance-agent', text: '代理人', isLeaf: true },
    { value: 'finance-insurance-adjuster', text: '理赔员', isLeaf: true }
  ],
  'health-hospital': [
    { value: 'health-hospital-doctor', text: '医生', isLeaf: true },
    { value: 'health-hospital-nurse', text: '护士', isLeaf: true }
  ],
  'health-pharma': [
    { value: 'health-pharma-researcher', text: '研究员', isLeaf: true },
    { value: 'health-pharma-production', text: '生产员', isLeaf: true }
  ]
}

function fetchIndustryChildren(parentValue: string | null): Promise<CascaderOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (parentValue === null) {
        resolve(industryCategories)
      } else if (industrySubcategories[parentValue]) {
        resolve(industrySubcategories[parentValue])
      } else if (industryPositions[parentValue]) {
        resolve(industryPositions[parentValue])
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
