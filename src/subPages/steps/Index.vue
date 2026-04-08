<template>
  <page-wraper>
    <view class="page-steps">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-steps :active="0">
            <wd-step></wd-step>
            <wd-step></wd-step>
            <wd-step></wd-step>
          </wd-steps>
        </demo-group-item>
        <demo-group-item :title="$t('biao-ti-he-miao-shu-xin-xi')">
          <wd-steps :active="active" align-center>
            <wd-step :title="$t('bu-zhou-1')" :description="$t('zhu-ce-1-ge-zhang-hao')" />
            <wd-step :title="$t('bu-zhou-2')" :description="$t('deng-lu-zhang-hao-bin-ding-shou-ji')" />
            <wd-step :title="$t('bu-zhou-3')" :description="$t('wan-shan-ge-ren-xin-xi')" />
          </wd-steps>
          <view class="steps-action">
            <wd-button size="small" @click="nextStep">{{ $t('xia-yi-bu') }}</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-tu-biao')">
          <wd-steps :active="1" align-center>
            <wd-step icon="settings" />
            <wd-step icon="list" />
            <wd-step icon="clock-circle" />
          </wd-steps>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('xiu-gai-zhuang-tai')">
          <wd-steps :active="1" align-center>
            <wd-step :title="$t('bang-ding-shou-ji')" />
            <wd-step :title="$t('zhong-xin-bang-ding-shou-ji')" status="error" />
            <wd-step :title="$t('bu-zhou-3-0')" />
          </wd-steps>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('shui-ping-ju-zhong')">
          <wd-steps :active="0" align-center>
            <wd-step></wd-step>
            <wd-step></wd-step>
            <wd-step></wd-step>
          </wd-steps>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('bu-ju-neng-li')">
        <demo-group-item :title="$t('shu-xiang-bu-zhou-tiao')">
          <wd-steps :active="1" vertical>
            <wd-step :description="$t('zhu-ce-1-ge-zhang-hao')" />
            <wd-step :description="$t('deng-lu-zhang-hao-bing-bang-ding-shou-ji-hou-mian-shi-bi-ji-chang-wen-an')" />
            <wd-step :description="$t('wan-shan-ge-ren-xin-xi')" />
          </wd-steps>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('dian-zhuang-bu-zhou-tiao')">
          <wd-steps :active="1" align-center dot>
            <wd-step :title="$t('bu-zhou-1')" :description="$t('zhu-ce-1-ge-zhang-hao')" />
            <wd-step :title="$t('bu-zhou-2')" :description="$t('deng-lu-zhang-hao-bin-ding-shou-ji')" />
            <wd-step :title="$t('bu-zhou-3')" :description="$t('wan-shan-ge-ren-xin-xi')" />
          </wd-steps>
        </demo-group-item>
        <demo-group-item :title="$t('ke-kong-zhi-de-dian-zhuang-bu-zhou-tiao')">
          <wd-steps :active="dotActive" align-center dot>
            <wd-step :title="$t('bu-zhou-1')" description="注册一个账号" />
            <wd-step :title="$t('bu-zhou-2')" description="登录账号并绑定手机" />
            <wd-step :title="$t('bu-zhou-3-0')" description="完善个人信息" />
          </wd-steps>
          <view class="steps-action">
            <wd-button size="small" @click="nextDotStep">{{ $t('xia-yi-bu') }}</wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('dian-zhuang-bu-zhou-he-chui-zhi-fang-xiang')">
          <wd-steps :active="1" vertical dot>
            <wd-step :description="$t('zhu-ce-1-ge-zhang-hao')" />
            <wd-step :description="$t('deng-lu-zhang-hao-bin-ding-shou-ji')" />
            <wd-step :description="$t('wan-shan-ge-ren-xin-xi')" />
          </wd-steps>
        </demo-group-item>
        <demo-group-item :title="$t('ke-kong-zhi-de-shu-xiang-dian-zhuang-bu-zhou-tiao')">
          <wd-steps :active="verticalDotActive" vertical dot>
            <wd-step :title="$t('bu-zhou-1')" description="注册一个账号" />
            <wd-step :title="$t('bu-zhou-2')" description="登录账号并绑定手机" />
            <wd-step :title="$t('bu-zhou-3-0')" description="完善个人信息" />
          </wd-steps>
          <view class="steps-action">
            <wd-button size="small" @click="nextVerticalDotStep">{{ $t('xia-yi-bu') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const active = ref<number>(0)
const dotActive = ref<number>(0)
const verticalDotActive = ref<number>(0)

function nextStep() {
  active.value = active.value + 1
}

function nextDotStep() {
  dotActive.value = (dotActive.value + 1) % 4
}

function nextVerticalDotStep() {
  verticalDotActive.value = (verticalDotActive.value + 1) % 4
}
</script>
<style lang="scss" scoped>
.page-steps {
  .steps-action {
    margin-top: 15px;
    text-align: center;
  }
}
</style>
