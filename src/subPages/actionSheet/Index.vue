<template>
  <page-wraper>
    <wd-toast />
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button @click="showActions1">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show" :actions="actions" />
      </demo-block>
      <demo-block :title="$t('xuanXiangZhuangTai')">
        <wd-button @click="showActions2">{{ $t('danChuCaiDan') }}</wd-button>
      </demo-block>
      <demo-block :title="$t('quXiaoAnNiu')">
        <wd-button @click="showActions3">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show1" :actions="actions" :cancel-text="$t('qu-xiao')" @close="close1" />
      </demo-block>
      <demo-block :title="$t('ziDingYiMianBanDanHang')">
        <wd-button @click="showActions4">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show2" :panels="panels" :cancel-text="$t('qu-xiao')" @close="close2" @select="select" />
      </demo-block>
      <demo-block :title="$t('ziDingYiMianBanDuoHang')">
        <wd-button @click="showActions5">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show3" :panels="panels" :cancel-text="$t('qu-xiao')" @close="close3" @select="select1" />
      </demo-block>
      <demo-block :title="$t('biaoTi-0')">
        <wd-button @click="showActions6">{{ $t('danChuCaiDan') }}</wd-button>
      </demo-block>
      <wd-action-sheet v-model="show4" :title="$t('biaoTi-0')" @close="close4" :cancelText="cancelText">
        <view style="padding: 15px 15px 150px 15px">{{ $t('neiRong') }}</view>
      </wd-action-sheet>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Action, Panel, Panels } from '@/uni_modules/wot-design-uni/components/wd-action-sheet/types'
const { t } = useI18n()
const show = ref<boolean>(false)
const actions = ref<Action[]>([])
const panels = ref<Panels>([])
const cancelText = ref<string>('')
const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)

function showActions1() {
  show.value = true
  actions.value = [
    {
      name: t('xuanXiang_1-0')
    },
    {
      name: t('xuanXiang_2-0')
    },
    {
      name: t('xuanXiang_3-0'),
      description: t('miaoShuXinXi-0')
    }
  ]
}
function showActions2() {
  show.value = true
  actions.value = [
    {
      name: t('yanSe'),
      color: '#0083ff'
    },
    {
      name: t('jinYong'),
      disabled: true
    },
    {
      name: '',
      loading: true
    }
  ]
}
function showActions3() {
  show1.value = true
  actions.value = [
    {
      name: t('xuanXiang_1-0')
    },
    {
      name: t('xuanXiang_2-0')
    },
    {
      name: t('xuanXiang_3-0'),
      description: t('miaoShuXinXi-0')
    }
  ]
}
function showActions4() {
  show2.value = true
  panels.value = [
    {
      icon: 'user',
      title: '微信好友'
    },
    {
      icon: 'share-internal',
      title: '朋友圈'
    },
    {
      icon: 'message',
      title: 'QQ 好友'
    },
    {
      icon: 'star-fill',
      title: '收藏'
    },
    {
      icon: 'share-internal',
      title: '更多分享'
    },
    {
      icon: 'user-add',
      title: '邀请好友'
    }
  ]
}
function showActions5() {
  show3.value = true
  panels.value = [
    [
      {
        icon: 'user',
        title: '微信好友'
      },
      {
        icon: 'share-internal',
        title: '朋友圈'
      },
      {
        icon: 'message',
        title: 'QQ 好友'
      },
      {
        icon: 'star-fill',
        title: '收藏'
      },
      {
        icon: 'user-add',
        title: '邀请'
      },
      {
        icon: 'share-external',
        title: '外部分享'
      },
      {
        icon: 'qrcode',
        title: '生成二维码'
      },
      {
        icon: 'save',
        title: '保存图片'
      }
    ],
    [
      {
        icon: 'file-image',
        title: '图片'
      },
      {
        icon: 'download',
        title: '下载'
      },
      {
        icon: 'copy',
        title: '复制链接'
      }
    ]
  ]
}
function showActions6() {
  show4.value = true
}
function close() {
  show.value = false
}
function close1() {
  show1.value = false
}
function close2() {
  show2.value = false
}
function close3() {
  show3.value = false
}
function close4() {
  show4.value = false
}

const toast = useToast()
function select({ item, index }: { item: Panel; index: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleXiaBiaoIndex', [item.title, index]))
}
function select1({ item, rowIndex, colIndex }: { item: Panel; rowIndex: number; colIndex: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleHangXiaBiaoRowindexLieXiaBiaoColindex', [item.title, rowIndex, colIndex]))
}
</script>
<style lang="scss" scoped></style>
