<template>
  <page-meta :page-style="`overflow:${popupState.lockScroll ? 'hidden' : 'visible'};`"></page-meta>
  <page-wraper>
    <view class="page-popup">
      <demo-group transparent :title="$t('zu-jian-lei-xing')">
        <demo-group-item no-padding :title="$t('ji-chu-yong-fa-0')">
          <wd-cell-group>
            <wd-cell :title="$t('dan-chu-ceng')" is-link @click="openPopup('basic')" />
          </wd-cell-group>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('dan-chu-wei-zhi')">
          <wd-cell-group border>
            <wd-cell v-for="item in positionItems" :key="item.key" :title="$t(item.titleKey)" is-link @click="openPopup(item.key)" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item no-padding :title="$t('guan-bi-an-niu')">
          <wd-cell-group border>
            <wd-cell :title="$t('guan-bi-an-niu-0')" is-link @click="openPopup('closable')" />
          </wd-cell-group>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('jin-yong-zhe-zhao-dian-ji')">
          <wd-cell-group border>
            <wd-cell :title="$t('jin-yong-zhe-zhao-dian-ji-0')" is-link @click="openPopup('blockModal')" />
          </wd-cell-group>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('jin-yong-zhe-zhao')">
          <wd-cell-group border>
            <wd-cell :title="$t('jin-yong-zhe-zhao-0')" is-link @click="openPopup('noModal')" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('zu-jian-yang-shi')">
        <demo-group-item no-padding :title="$t('kai-qi-di-bu-an-quan-qu')">
          <wd-cell-group border>
            <wd-cell :title="$t('kai-qi-di-bu-an-quan-qu-0')" is-link @click="openPopup('safeArea')" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group transparent :title="$t('te-shu-yang-shi')">
        <demo-group-item no-padding :title="$t('suo-ding-gun-dong')">
          <wd-cell-group border>
            <wd-cell :title="$t('suo-ding-gun-dong-0')" is-link @click="openPopup('lockScroll')" />
          </wd-cell-group>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('qian-tao-dan-chuang-yu-rootportal')">
          <wd-cell-group border>
            <wd-cell :title="$t('qian-tao-dan-chuang-ce-shi')" is-link @click="openPopup('nested')" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <wd-popup v-model="popupState.basic" custom-style="border-radius: 32rpx;" @close="closePopup('basic')">
        <text class="page-popup__text">{{ $t('dan-dan-dan') }}</text>
      </wd-popup>
      <wd-popup v-model="popupState.top" position="top" custom-style="height: 200px;" @close="closePopup('top')"></wd-popup>
      <wd-popup v-model="popupState.right" position="right" custom-style="width: 200px;" @close="closePopup('right')"></wd-popup>
      <wd-popup v-model="popupState.bottom" position="bottom" custom-style="height: 200px;" @close="closePopup('bottom')"></wd-popup>
      <wd-popup v-model="popupState.left" position="left" custom-style="width: 200px;" @close="closePopup('left')"></wd-popup>
      <wd-popup v-model="popupState.closable" position="bottom" closable custom-style="height: 200px;" @close="closePopup('closable')"></wd-popup>
      <wd-popup
        v-model="popupState.blockModal"
        position="bottom"
        :close-on-click-modal="false"
        closable
        custom-style="height: 200px;"
        @close="closePopup('blockModal')"
      ></wd-popup>
      <wd-popup
        v-model="popupState.noModal"
        position="bottom"
        :modal="false"
        closable
        custom-style="height: 200px;"
        @close="closePopup('noModal')"
      ></wd-popup>
      <wd-popup
        v-model="popupState.safeArea"
        position="bottom"
        :safe-area-inset-bottom="true"
        custom-style="height: 200px;"
        @close="closePopup('safeArea')"
      ></wd-popup>
      <wd-popup
        v-model="popupState.lockScroll"
        lock-scroll
        position="bottom"
        :safe-area-inset-bottom="true"
        custom-style="height: 200px;"
        @close="closePopup('lockScroll')"
      ></wd-popup>

      <wd-popup v-model="popupState.nested" position="center" custom-style="padding: 20px; border-radius: 16px;" @close="closeNestedPopup">
        <view class="nested-popup__content">
          <text class="nested-popup__title">{{ $t('fu-dan-chuang-pu-tong-mo-shi') }}</text>
          <text class="nested-popup__desc">
            {{ $t('dian-ji-xia-fang-an-niu-fen-bie-da-kai-pu-tong-zi-dan-chuang-he-qi-yong-rootportal-de-zi-dan-chuang') }}
          </text>
          <view class="nested-popup__buttons">
            <wd-button type="primary" size="small" @click="openChildPopup(false)">{{ $t('da-kai-pu-tong-zi-dan-chuang') }}</wd-button>
            <wd-button type="success" size="small" @click="openChildPopup(true)">{{ $t('da-kai-chuan-song-zi-dan-chuang') }}</wd-button>
          </view>
        </view>

        <wd-popup
          v-model="popupState.child"
          position="center"
          custom-style="padding: 20px;height:300px;width:300px; border-radius: 16px;"
          @close="closePopup('child')"
        >
          <view class="nested-popup__content">
            <text class="nested-popup__title">{{ $t('zi-dan-chuang-pu-tong-mo-shi') }}</text>
            <text class="nested-popup__desc">{{ $t('zhe-ge-zi-dan-chuang-he-fu-dan-chuang-chu-yu-tong-yi-ceng-ji') }}</text>
            <wd-button type="primary" size="small" @click="closePopup('child')">{{ $t('guan-bi') }}</wd-button>
          </view>
        </wd-popup>

        <wd-popup
          v-model="popupState.childPortal"
          root-portal
          position="center"
          custom-style="padding: 20px;height:300px;width:300px; border-radius: 16px;"
          @close="closePopup('childPortal')"
        >
          <view class="nested-popup__content">
            <text class="nested-popup__title">{{ $t('zi-dan-chuang-chuan-song-mo-shi') }}</text>
            <text class="nested-popup__desc">{{ $t('kai-qi-rootportal-hou-zi-dan-chuang-hui-tuo-li-fu-ceng-ji-xuan-ran') }}</text>
            <wd-button type="success" size="small" @click="closePopup('childPortal')">{{ $t('guan-bi') }}</wd-button>
          </view>
        </wd-popup>
      </wd-popup>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const popupState = reactive({
  basic: false,
  top: false,
  right: false,
  bottom: false,
  left: false,
  closable: false,
  blockModal: false,
  noModal: false,
  safeArea: false,
  lockScroll: false,
  nested: false,
  child: false,
  childPortal: false
})

type PopupStateKey = keyof typeof popupState

const positionItems = [
  { key: 'top', titleKey: 'ding-bu' },
  { key: 'right', titleKey: 'you-ce' },
  { key: 'bottom', titleKey: 'di-bu' },
  { key: 'left', titleKey: 'zuo-ce' }
] as const

function openPopup(key: PopupStateKey) {
  popupState[key] = true
}

function closePopup(key: PopupStateKey) {
  popupState[key] = false
}

function closeNestedPopup() {
  popupState.nested = false
  popupState.child = false
  popupState.childPortal = false
}

function openChildPopup(useRootPortal: boolean) {
  if (useRootPortal) {
    popupState.childPortal = true
  } else {
    popupState.child = true
  }
}
</script>

<style lang="scss" scoped>
.page-popup {
  &__text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400rpx;
    height: 400rpx;
    color: $text-main;
    font-size: $n-20;
    border-radius: $radius-super-large;
  }
}

.nested-popup {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-super-loose;
    height: 100%;
  }

  &__title {
    color: $text-main;
    font-size: $typography-title-size-main;
    font-weight: $font-weight-bold;
    text-align: center;
  }

  &__desc {
    margin: $spacing-main 0;
    color: $text-auxiliary;
    font-size: $typography-body-size-main;
    text-align: center;
    line-height: $typography-body-line-height-size-main;
  }

  &__buttons {
    display: flex;
    gap: $spacing-super-loose;
    margin-top: $spacing-super-loose;
  }
}
</style>
