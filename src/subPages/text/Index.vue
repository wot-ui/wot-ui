<template>
  <page-wraper>
    <demo-group :title="$t('zu-jian-lei-xing')">
      <demo-group-item :title="$t('jiBenYongFa')">
        <wd-text :text="text"></wd-text>
      </demo-group-item>
      <demo-group-item :title="$t('she-zhi-zhu-ti')">
        <view class="text-row">
          <wd-text type="primary" :text="$t('zhu-se')"></wd-text>
          <wd-text type="error" :text="$t('cuo-wu')"></wd-text>
          <wd-text type="success" :text="$t('cheng-gong')"></wd-text>
          <wd-text type="warning" :text="$t('jing-gao')"></wd-text>
          <wd-text :text="$t('mo-ren')"></wd-text>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('mo-shi')">
        <view>
          <view><wd-text text="18888888888" mode="phone"></wd-text></view>
          <view><wd-text :text="$t('wang-san')" mode="name"></wd-text></view>
          <view><wd-text text="1719976636911" mode="date"></wd-text></view>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('jin-e')">
        <wd-text text="16354.156" mode="price" type="success" decoration="line-through" prefix="￥" />
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-yang-shi')">
      <demo-group-item :title="$t('zi-ding-yi-zi-ti-yan-se')">
        <wd-text :text="text" color="#36B8C2"></wd-text>
      </demo-group-item>
      <demo-group-item :title="$t('shi-fou-cu-ti')">
        <wd-text :text="text" bold></wd-text>
      </demo-group-item>
      <demo-group-item :title="$t('zi-ti-da-xiao')">
        <wd-text :text="text" size="16px"></wd-text>
      </demo-group-item>
      <demo-group-item title="lines">
        <wd-text :text="text" :lines="2" size="16px"></wd-text>
      </demo-group-item>
      <demo-group-item title="lineHeight">
        <wd-text :text="text" :lines="2" lineHeight="20px"></wd-text>
      </demo-group-item>
      <demo-group-item :title="$t('wen-zi-zhuang-shi')">
        <wd-text :text="text" type="warning" decoration="underline" />
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('te-shu-yang-shi')">
      <demo-group-item :title="$t('tuo-min')">
        <view class="text-row text-row--center">
          <wd-text :text="$t('zhang-chang-san')" mode="name" :format="true"></wd-text>
          <wd-text text="18888888888" mode="phone" :format="true"></wd-text>
        </view>
      </demo-group-item>
      <demo-group-item :title="$t('qian-hou-cha-cao')">
        <view>
          <wd-text text="12345678901" mode="phone" format type="primary" prefix="Prefix" suffix="Suffix" />
          <br />
          <wd-text text="12345678901" mode="phone" format type="primary">
            <template #prefix>
              <text>{{ $t('prefix') }}</text>
            </template>
            <template #suffix>{{ $t('suffix') }}</template>
          </wd-text>
        </view>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>(
  '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。'
)
</script>
<style lang="scss" scoped>
.text-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  &--center {
    align-items: center;
  }
}
</style>
