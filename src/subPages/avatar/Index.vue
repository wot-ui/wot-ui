<template>
  <page-wraper>
    <demo-group title="组件类型">
      <demo-group-item title="基础用法">
        <view class="demo-avatar-row">
          <wd-avatar :src="avatarURL" />
          <wd-avatar text="U" />
          <wd-avatar icon="user" />
        </view>
      </demo-group-item>

      <demo-group-item title="头像组基础用法">
        <wd-avatar-group>
          <wd-avatar :src="avatarURL" />
          <wd-avatar icon="star-fill" />
          <wd-avatar text="A" bg-color="#1E90FF" />
          <wd-avatar text="B" bg-color="#228B22" />
        </wd-avatar-group>
      </demo-group-item>
    </demo-group>

    <demo-group title="组件状态">
      <demo-group-item title="可点击">
        <view class="demo-avatar-row">
          <wd-avatar size="large" :src="avatarURL" @click="handleClick" />
          <wd-avatar size="large" text="点我" bg-color="#1E90FF" @click="handleClick" />
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group title="组件样式">
      <demo-group-item title="头像形状">
        <view class="demo-avatar-row">
          <wd-avatar :src="avatarURL" shape="square" />
          <wd-avatar :src="avatarURL" shape="round" />
        </view>
      </demo-group-item>

      <demo-group-item title="头像尺寸">
        <view class="demo-avatar-row">
          <wd-avatar v-for="size in sizes" :key="size" :src="avatarURL" :size="size" />
          <wd-avatar :src="avatarURL" :size="80" />
          <wd-avatar :src="avatarURL" :size="60" />
          <wd-avatar :src="avatarURL" :size="`40px`" />
        </view>
      </demo-group-item>

      <demo-group-item title="自定义颜色">
        <view class="demo-avatar-row">
          <wd-avatar
            v-for="(item, index) in customColors"
            :key="index"
            :bg-color="item.bgColor"
            :color="item.color"
            :text="item.text"
            :icon="item.icon"
            size="normal"
          />
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group title="特殊样式">
      <demo-group-item title="带徽记的头像">
        <view class="demo-avatar-row">
          <wd-badge modelValue="10" type="primary">
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge modelValue="20" type="danger">
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge is-dot>
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge is-dot>
            <wd-avatar text="A" shape="square" bg-color="#1E90FF" />
          </wd-badge>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group title="内容形态">
      <demo-group-item title="自定义内容">
        <view class="demo-avatar-row">
          <wd-avatar>
            <view class="custom-content">VIP</view>
          </wd-avatar>
          <wd-avatar>
            <wd-icon name="star-fill" size="24px" color="#f0883a" />
          </wd-avatar>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group title="布局能力">
      <demo-group-item title="头像组最大数量">
        <wd-avatar-group :max-count="3">
          <wd-avatar :src="avatarURL" />
          <wd-avatar icon="star-fill" />
          <wd-avatar text="A" bg-color="#1E90FF" />
          <wd-avatar text="B" bg-color="#228B22" />
          <wd-avatar text="C" bg-color="#DC143C" />
        </wd-avatar-group>
      </demo-group-item>

      <demo-group-item title="头像组叠层方向">
        <view class="demo-avatar-column">
          <wd-avatar-group cascading="left-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="#1E90FF" />
            <wd-avatar text="B" bg-color="#228B22" />
            <wd-avatar text="C" bg-color="#DC143C" />
          </wd-avatar-group>
          <wd-avatar-group cascading="right-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="#1E90FF" />
            <wd-avatar text="B" bg-color="#228B22" />
            <wd-avatar text="C" bg-color="#DC143C" />
          </wd-avatar-group>
        </view>
      </demo-group-item>

      <demo-group-item title="头像组垂直堆叠">
        <view class="demo-avatar-row">
          <wd-avatar-group vertical :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="#1E90FF" />
            <wd-avatar text="B" bg-color="#228B22" />
            <wd-avatar text="C" bg-color="#DC143C" />
          </wd-avatar-group>
          <wd-avatar-group vertical cascading="right-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="#1E90FF" />
            <wd-avatar text="B" bg-color="#228B22" />
            <wd-avatar text="C" bg-color="#DC143C" />
          </wd-avatar-group>
        </view>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '../../uni_modules/wot-ui/components/wd-toast'

const toast = useToast()

const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
const sizes = ['large', 'medium', 'normal', 'small']
const customColors = [
  { bgColor: '#DC143C', color: '#fff', text: 'W' },
  { bgColor: '#228B22', color: '#fff', text: 'O' },
  { bgColor: '#1E90FF', color: '#fff', text: 'T' },
  { bgColor: '#EEEEEE', color: '#7B8198', icon: 'user' }
]

const handleClick = () => {
  toast.show('点击头像')
}
</script>

<style lang="scss" scoped>
.demo-avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.demo-avatar-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-content {
  font-size: 12px;
  font-weight: 600;
}
</style>
