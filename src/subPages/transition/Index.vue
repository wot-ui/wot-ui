<template>
  <page-wraper :demo-config="{ transparent: true }">
    <view class="page-transition">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('fade-dong-hua')">
          <wd-button @click="runTransition('fade')">fade</wd-button>
          <wd-button @click="runTransition('fade-up')">fade-up</wd-button>
          <wd-button @click="runTransition('fade-down')">fade-down</wd-button>
          <wd-button @click="runTransition('fade-left')">fade-left</wd-button>
          <wd-button @click="runTransition('fade-right')">fade-right</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('slide-dong-hua')">
          <wd-button @click="runTransition('slide-up')">slide-up</wd-button>
          <wd-button @click="runTransition('slide-down')">slide-down</wd-button>
          <wd-button @click="runTransition('slide-left')">slide-left</wd-button>
          <wd-button @click="runTransition('slide-right')">slide-right</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('zoom-dong-hua')">
          <wd-button @click="runTransition('zoom-in')">zoom-in</wd-button>
          <wd-button @click="runTransition('zoom-out')">zoom-out</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-dong-hua')">
          <wd-button @click="runCustomTransition">custom</wd-button>
        </demo-group-item>
      </demo-group>

      <wd-transition :show="show" :name="name" custom-class="block" />

      <wd-transition
        :show="customShow"
        :duration="{ enter: 700, leave: 1000 }"
        enter-class="custom-enter"
        enter-active-class="custom-enter-active"
        enter-to-class="custom-enter-to"
        leave-class="custom-leave"
        leave-active-class="custom-leave-active"
        leave-to-class="custom-leave-to"
        custom-class="block"
      />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { TransitionName } from '@/uni_modules/wot-ui/components/wd-transition/types'
import { ref } from 'vue'

const show = ref<boolean>(false)
const name = ref<TransitionName>()
const customShow = ref<boolean>(false)

function runCustomTransition() {
  customShow.value = true
  setTimeout(() => {
    customShow.value = false
  }, 1200)
}

function runTransition(transitionName: TransitionName) {
  name.value = transitionName
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>
<style lang="scss" scoped>
.page-transition {
  :deep(.wd-button) {
    margin: 0 10px 10px 0;
  }
}

:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}

:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}

:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
</style>
