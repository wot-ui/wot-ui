<template>
  <page-wraper>
    <view class="page-progress">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-progress :percentage="basePercentage" />
        </demo-group-item>
        <demo-group-item :title="$t('nei-zhi-bai-fen-bi')">
          <view v-for="item in innerItems" :key="item.key" class="demo-row">
            <wd-progress :percent-position="item.percentPosition" :percentage="item.percentage" :status="item.status" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jin-du-tiao-zhuang-tai')">
          <view v-for="item in statusItems" :key="item.status" class="demo-row">
            <wd-progress :percentage="basePercentage" :status="item.status" hide-text />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('bu-xian-shi-jin-du-wen-zi')">
          <wd-progress :percentage="basePercentage" hide-text />
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-yan-se')">
          <view v-for="item in solidColorItems" :key="item.color" class="demo-row">
            <wd-progress :percentage="basePercentage" :color="item.color" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('yan-se-shu-zu')">
          <view class="demo-row">
            <wd-progress :percentage="basePercentage" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
          </view>
          <view class="demo-row">
            <wd-progress :percentage="basePercentage" :color="colorObject" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('dong-tai-kong-zhi')">
          <wd-progress :percentage="interactivePercentage" />
          <view class="action-container">
            <wd-button custom-style="margin-right: 10px;" type="danger" size="small" @click="reduce">-10</wd-button>
            <wd-button type="success" size="small" @click="add">+10</wd-button>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { ProgressColor, ProgressStatus } from '@/uni_modules/wot-ui/components/wd-progress/types'
import { ref } from 'vue'

const basePercentage = 50
const interactivePercentage = ref<number>(50)

const innerItems = [
  {
    key: 'inner-center',
    percentPosition: { type: 'inner', align: 'center' },
    percentage: basePercentage,
    status: undefined
  },
  {
    key: 'inner-right',
    percentPosition: { type: 'inner', align: 'right' },
    percentage: basePercentage,
    status: 'success'
  },
  {
    key: 'inner-left',
    percentPosition: { type: 'inner', align: 'left' },
    percentage: basePercentage,
    status: 'danger'
  },
  {
    key: 'inner-zero',
    percentPosition: { type: 'inner', align: 'center' },
    percentage: 0,
    status: undefined
  }
] as const

const statusItems: Array<{ status: ProgressStatus }> = [{ status: 'success' }, { status: 'danger' }, { status: 'warning' }]

const solidColorItems = [
  { color: 'var(--wot-color-theme, #0083ff)' },
  { color: 'var(--wot-color-success, #00c740)' },
  { color: 'var(--wot-color-warning, #ffb300)' }
] as const

const colorObject: ProgressColor[] = [
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
]

function add() {
  interactivePercentage.value = Math.min(interactivePercentage.value + 10, 100)
}

function reduce() {
  interactivePercentage.value = Math.max(interactivePercentage.value - 10, 0)
}
</script>

<style lang="scss" scoped>
.page-progress {
  .demo-row {
    margin-bottom: 12px;
  }

  .demo-row:last-child {
    margin-bottom: 0;
  }

  .action-container {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>
