<template>
  <page-wraper>
    <view class="page-sticky page-sticky__stage">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <view class="demo-container">
            <wd-sticky custom-style="margin-left: 20px">
              <wd-button type="success">{{ $t('ji-chu-yong-fa-0') }}</wd-button>
            </wd-sticky>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiang-dui-rong-qi')">
          <view class="demo-container">
            <wd-sticky-box>
              <view class="custom-container">
                <wd-sticky custom-style="margin-left: 220px">
                  <wd-button type="warning">{{ $t('xiang-dui-rong-qi') }}</wd-button>
                </wd-sticky>
              </view>
            </wd-sticky-box>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('xi-ding-ju-li')">
          <view class="demo-container">
            <wd-sticky :offset-top="50" custom-style="margin-left: 120px">
              <wd-button>{{ $t('xi-ding-ju-li-0') }}</wd-button>
            </wd-sticky>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiang-dui-rong-qi-xi-ding-ju-li')">
          <view class="demo-container">
            <wd-sticky-box>
              <view class="custom-container">
                <wd-sticky :offset-top="150">
                  <wd-button type="warning">{{ $t('xiang-dui-rong-qi-xi-ding-ju-li') }}</wd-button>
                </wd-sticky>
              </view>
            </wd-sticky-box>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('dong-tai-cha-ru')">
          <view class="demo-container">
            <wd-button type="info" plain @click="insert">{{ $t('dian-ji-cha-ru') }}</wd-button>
            <wd-sticky custom-style="margin-left: 220px">
              <wd-button v-if="show" type="danger">{{ $t('dong-tai-sheng-cheng') }}</wd-button>
            </wd-sticky>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const show = ref<boolean>(false)

function display() {
  show.value = true
}
function insert() {
  display()
}
onShow(() => {
  setTimeout(display, 5000)
})
</script>
<style lang="scss" scoped>
.page-sticky {
  &__stage {
    height: 250vh;
  }
}

.wot-theme-dark {
  .custom-container {
    background: $-dark-background2;
  }
}

.demo-container {
  padding: 15px 0;
  color: #666;
}

.custom-container {
  height: 120px;
  width: 100vw;
  background-color: #ffffff;
}
</style>
