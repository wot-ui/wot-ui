<template>
  <page-wraper>
    <view class="page-layout">
      <demo-group :title="$t('bu-ju-neng-li')">
        <demo-group-item :title="$t('ji-chu-yong-fa-0')">
          <wd-row>
            <wd-col :span="24"><view class="bg-dark1">span: 24</view></wd-col>
          </wd-row>
          <wd-row>
            <wd-col :span="12"><view class="bg-dark">span: 12</view></wd-col>
            <wd-col :span="12"><view class="bg-light">span: 12</view></wd-col>
          </wd-row>
          <wd-row>
            <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
            <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
            <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
          </wd-row>
          <wd-row>
            <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
            <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
            <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
            <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
          </wd-row>
        </demo-group-item>

        <demo-group-item :title="$t('fen-lan-pian-yi')">
          <wd-row>
            <wd-col :span="4"><view class="bg-dark">span: 4</view></wd-col>
            <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
          </wd-row>
          <wd-row>
            <wd-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></wd-col>
            <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
          </wd-row>
        </demo-group-item>

        <demo-group-item :title="$t('fen-lan-jian-ge')">
          <wd-row :gutter="20">
            <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
            <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
            <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
          </wd-row>
        </demo-group-item>

        <demo-group-item :title="$t('justify-dui-qi')">
          <wd-row justify="center">
            <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
            <wd-col :span="6"><view class="bg-light">center</view></wd-col>
            <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
          </wd-row>
          <wd-row justify="end">
            <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
            <wd-col :span="6"><view class="bg-light">end</view></wd-col>
            <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
          </wd-row>
          <wd-row justify="space-between">
            <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
            <wd-col :span="6"><view class="bg-light">between</view></wd-col>
            <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
          </wd-row>
          <wd-row justify="space-around">
            <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
            <wd-col :span="6"><view class="bg-light">around</view></wd-col>
            <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
          </wd-row>
        </demo-group-item>

        <demo-group-item :title="$t('align-dui-qi')">
          <wd-row align="middle" class="row-align-demo">
            <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">middle</view></wd-col>
            <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">middle</view></wd-col>
            <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">middle</view></wd-col>
          </wd-row>
          <wd-row align="bottom" class="row-align-demo">
            <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">bottom</view></wd-col>
            <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">bottom</view></wd-col>
            <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">bottom</view></wd-col>
          </wd-row>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.page-layout {
  .bg-dark1,
  .bg-dark,
  .bg-light {
    border-radius: 4px;
    min-height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.45);
  }
  .bg-dark1 {
    background: #99a9bf;
    color: #fff;
  }
  .bg-dark {
    background: #d3dce6;
  }
  .bg-light {
    background: #e5e9f2;
  }
}
</style>
