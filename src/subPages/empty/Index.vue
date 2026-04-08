<template>
  <page-wraper>
    <view class="page-empty">
      <demo-group :title="$t('nei-rong-xing-tai')">
        <demo-group-item v-for="(item, index) in emptyTypes" :key="index" :title="$t(item.title)">
          <wd-empty :icon="item.icon" :tip="item.tip" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-da-xiao')">
          <wd-empty :icon-size="140" icon="no-result" :tip="$t('dang-qian-sou-suo-wu-jie-guo')" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-tu-pian')">
          <wd-empty :icon="blackMao" tip="查看我的头像" />
        </demo-group-item>

        <demo-group-item :title="$t('cha-cao-zi-ding-yi-tu-pian-nei-rong')">
          <wd-empty :tip="$t('cha-cao-zi-ding-yi-tu-pian-nei-rong')">
            <template #image>
              <wd-icon name="sun-fill" size="100px"></wd-icon>
            </template>
          </wd-empty>
        </demo-group-item>

        <demo-group-item :title="$t('di-bu-cha-cao')">
          <wd-empty icon="no-content" tip="当前搜索无结果">
            <template #bottom>
              <view class="bottom-actions">
                <wd-button type="info">{{ $t('zhong-xin-jia-zai') }}</wd-button>
              </view>
            </template>
          </wd-empty>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import blackMao from '../img/black_mao.png'

const { t } = useI18n()

const emptyTypes = [
  { icon: 'no-result', tip: t('dang-qian-sou-suo-wu-jie-guo'), title: 'sou-suo-wu-jie-guo' },
  { icon: 'no-wifi', tip: t('dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi'), title: '404-ye-mian' },
  { icon: 'no-content', tip: t('zan-wu-nei-rong'), title: 'ye-mian-zan-wu-nei-rong' },
  { icon: 'no-collection', tip: t('zan-wu-shou-cang'), title: 'wo-de-shou-cang-wei-kong' },
  { icon: 'no-comment', tip: t('zan-wu-ping-lun'), title: 'wo-de-ping-lun-wei-kong' },
  { icon: 'failpayment', tip: t('zhi-fu-shi-bai-qing-zhong-xin-ding-gou'), title: 'zhi-fu-shi-bai' },
  { icon: 'no-message', tip: t('yi-ding-yue-quan-bu-xiao-xi'), title: 'yi-ding-yue-quan-bu-xiao-xi' }
] as const
</script>

<style lang="scss" scoped>
.page-empty {
  .bottom-actions {
    margin-top: var(--wot-empty-bottom-margin-top, 20px);
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
