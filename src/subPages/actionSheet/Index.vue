<template>
  <page-wraper>
    <wd-toast />
    <view class="page-action-sheet">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-button block @click="showBasic = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet v-model="showBasic" :actions="basicActions" @close="showBasic = false" />
        </demo-group-item>

        <demo-group-item :title="$t('ziDingYiMianBanDanHang')">
          <wd-button block @click="showGridSingle = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet
            v-model="showGridSingle"
            :panels="singleGridPanels"
            :cancel-text="$t('qu-xiao')"
            @close="showGridSingle = false"
            @select="select"
          />
        </demo-group-item>

        <demo-group-item :title="$t('ziDingYiMianBanDuoHang')">
          <wd-button block @click="showGridMulti = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet
            v-model="showGridMulti"
            :panels="multiGridPanels"
            :cancel-text="$t('qu-xiao')"
            @close="showGridMulti = false"
            @select="select1"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item :title="$t('xuanXiangZhuangTai')">
          <wd-button block @click="showStatus = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet v-model="showStatus" :actions="statusActions" @close="showStatus = false" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item :title="$t('quXiaoAnNiu')">
          <wd-button block @click="showCancel = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet v-model="showCancel" :actions="basicActions" :cancel-text="$t('qu-xiao')" @close="showCancel = false" />
        </demo-group-item>

        <demo-group-item :title="$t('biaoTi-0')">
          <wd-button block @click="showCustom = true">{{ $t('danChuCaiDan') }}</wd-button>
          <wd-action-sheet v-model="showCustom" :title="$t('biaoTi-0')" :cancel-text="cancelText" @close="showCustom = false">
            <view class="custom-content">{{ $t('neiRong') }}</view>
          </wd-action-sheet>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Action, Panel, Panels } from '@/uni_modules/wot-ui/components/wd-action-sheet/types'

const { t } = useI18n()
const toast = useToast()

const showBasic = ref<boolean>(false)
const showStatus = ref<boolean>(false)
const showCancel = ref<boolean>(false)
const showGridSingle = ref<boolean>(false)
const showGridMulti = ref<boolean>(false)
const showCustom = ref<boolean>(false)

const cancelText = ref<string>('')

const basicActions = computed<Action[]>(() => [
  { name: t('xuanXiang_1-0') },
  { name: t('xuanXiang_2-0') },
  { name: t('xuanXiang_3-0'), description: t('miaoShuXinXi-0') }
])

const statusActions = computed<Action[]>(() => [
  { name: t('yanSe'), color: '#0083ff' },
  { name: t('jinYong'), disabled: true },
  { name: '', loading: true }
])

const singleGridPanels = ref<Panels>([
  { icon: 'user', title: '微信好友' },
  { icon: 'share-internal', title: '朋友圈' },
  { icon: 'message', title: 'QQ 好友' },
  { icon: 'star-fill', title: '收藏' },
  { icon: 'share-internal', title: '更多分享' },
  { icon: 'user-add', title: '邀请好友' }
])

const multiGridPanels = ref<Panels>([
  [
    { icon: 'user', title: '微信好友' },
    { icon: 'share-internal', title: '朋友圈' },
    { icon: 'message', title: 'QQ 好友' },
    { icon: 'star-fill', title: '收藏' },
    { icon: 'user-add', title: '邀请' },
    { icon: 'share-external', title: '外部分享' },
    { icon: 'qrcode', title: '生成二维码' },
    { icon: 'save', title: '保存图片' }
  ],
  [
    { icon: 'file-image', title: '图片' },
    { icon: 'download', title: '下载' },
    { icon: 'copy', title: '复制链接' }
  ]
])

function select({ item, index }: { item: Panel; index: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleXiaBiaoIndex', [item.title, index]))
}

function select1({ item, rowIndex, colIndex }: { item: Panel; rowIndex: number; colIndex: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleHangXiaBiaoRowindexLieXiaBiaoColindex', [item.title, rowIndex, colIndex]))
}
</script>
<style lang="scss" scoped>
.page-action-sheet {
  .custom-content {
    padding: 15px 15px 150px 15px;
  }
}
</style>
