<template>
  <page-wraper>
    <demo-group :title="$t('zu-jian-lei-xing')">
      <demo-group-item :title="$t('ji-chu-yong-fa-0')">
        <view class="page-avatar__row">
          <wd-avatar :src="avatarURL" />
          <wd-avatar text="U" />
          <wd-avatar icon="user" />
        </view>
      </demo-group-item>

      <demo-group-item :title="$t('tou-xiang-zu-ji-chu-yong-fa')">
        <wd-avatar-group>
          <wd-avatar :src="avatarURL" />
          <wd-avatar icon="star-fill" />
          <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
          <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
        </wd-avatar-group>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-zhuang-tai')">
      <demo-group-item :title="$t('ke-dian-ji')">
        <view class="page-avatar__row">
          <wd-avatar size="large" :src="avatarURL" @click="handleClick" />
          <wd-avatar size="large" :text="$t('dian-wo')" bg-color="var(--wot-primary-6, #1E90FF)" @click="handleClick" />
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('zu-jian-yang-shi')">
      <demo-group-item :title="$t('tou-xiang-xing-zhuang')">
        <view class="page-avatar__row">
          <wd-avatar :src="avatarURL" shape="square" />
          <wd-avatar :src="avatarURL" shape="round" />
        </view>
      </demo-group-item>

      <demo-group-item :title="$t('tou-xiang-chi-cun')">
        <view class="page-avatar__row">
          <wd-avatar v-for="size in sizes" :key="size" :src="avatarURL" :size="size" />
          <wd-avatar :src="avatarURL" :size="80" />
          <wd-avatar :src="avatarURL" :size="60" />
          <wd-avatar :src="avatarURL" size="40px" />
        </view>
      </demo-group-item>

      <demo-group-item :title="$t('zi-ding-yi-yan-se-0')">
        <view class="page-avatar__row">
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

    <demo-group :title="$t('te-shu-yang-shi')">
      <demo-group-item :title="$t('dai-hui-ji-de-tou-xiang')">
        <view class="page-avatar__row">
          <wd-badge value="10" type="primary">
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge value="20" type="danger">
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge is-dot>
            <wd-avatar :src="avatarURL" shape="square" />
          </wd-badge>
          <wd-badge is-dot>
            <wd-avatar text="A" shape="square" bg-color="var(--wot-primary-6, #1E90FF)" />
          </wd-badge>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('nei-rong-xing-tai')">
      <demo-group-item :title="$t('ziDingYiNeiRong')">
        <view class="page-avatar__row">
          <wd-avatar>
            <view class="page-avatar__custom-content">VIP</view>
          </wd-avatar>
          <wd-avatar>
            <wd-icon name="star-fill" size="24px" color="var(--wot-warning-main, #f0883a)" />
          </wd-avatar>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group :title="$t('bu-ju-neng-li')">
      <demo-group-item :title="$t('tou-xiang-zu-zui-da-shu-liang')">
        <wd-avatar-group :max-count="3">
          <wd-avatar :src="avatarURL" />
          <wd-avatar icon="star-fill" />
          <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
          <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
          <wd-avatar text="C" bg-color="var(--wot-danger-main, #DC143C)" />
        </wd-avatar-group>
      </demo-group-item>

      <demo-group-item :title="$t('tou-xiang-zu-die-ceng-fang-xiang')">
        <view class="page-avatar__column">
          <wd-avatar-group cascading="left-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
            <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
            <wd-avatar text="C" bg-color="var(--wot-danger-main, #DC143C)" />
          </wd-avatar-group>
          <wd-avatar-group cascading="right-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
            <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
            <wd-avatar text="C" bg-color="var(--wot-danger-main, #DC143C)" />
          </wd-avatar-group>
        </view>
      </demo-group-item>

      <demo-group-item :title="$t('tou-xiang-zu-chui-zhi-dui-die')">
        <view class="page-avatar__row">
          <wd-avatar-group vertical :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
            <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
            <wd-avatar text="C" bg-color="var(--wot-danger-main, #DC143C)" />
          </wd-avatar-group>
          <wd-avatar-group vertical cascading="right-up" :max-count="4">
            <wd-avatar :src="avatarURL" />
            <wd-avatar icon="star-fill" />
            <wd-avatar text="A" bg-color="var(--wot-primary-6, #1E90FF)" />
            <wd-avatar text="B" bg-color="var(--wot-success-main, #228B22)" />
            <wd-avatar text="C" bg-color="var(--wot-danger-main, #DC143C)" />
          </wd-avatar-group>
        </view>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useToast } from '../../uni_modules/wot-ui'
const { t } = useI18n()

const toast = useToast()

const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
const sizes = ['large', 'medium', 'normal', 'small']
const customColors = [
  { bgColor: 'var(--wot-danger-main, #DC143C)', color: 'var(--wot-text-white, #fff)', text: 'W' },
  { bgColor: 'var(--wot-success-main, #228B22)', color: 'var(--wot-text-white, #fff)', text: 'O' },
  { bgColor: 'var(--wot-primary-6, #1E90FF)', color: 'var(--wot-text-white, #fff)', text: 'T' },
  { bgColor: 'var(--wot-filled-bottom, #EEEEEE)', color: 'var(--wot-text-secondary, #7B8198)', icon: 'user' }
]

const handleClick = () => {
  toast.show(t('dian-ji-tou-xiang'))
}
</script>

<style lang="scss" scoped>
.page-avatar {
  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-loose;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: $spacing-extra-loose;
  }

  &__custom-content {
    font-size: $typography-label-size-main;
    font-weight: $font-weight-medium;
    line-height: $typography-label-line-height-size-main;
    color: $text-main;
  }
}
</style>
