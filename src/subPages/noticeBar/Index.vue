<template>
  <page-wraper>
    <view class="page-notice-bar">
      <demo-group title="组件类型" transparent>
        <demo-group-item :title="$t('jiBenYongFa')" no-padding>
          <wd-notice-bar
            :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi')"
            prefix="exclamation-circle-fill"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体" transparent>
        <demo-group-item :title="$t('lei-xing-xiu-gai')" no-padding>
          <wd-notice-bar
            type="danger"
            :text="
              $t(
                'dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi-dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi'
              )
            "
            prefix="close-circle-fill"
            custom-class="space"
          />
          <wd-notice-bar
            type="info"
            :text="
              $t(
                'dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing'
              )
            "
            prefix="info-circle-fill"
          />
        </demo-group-item>
        <demo-group-item :title="$t('ke-guan-bi-de')" no-padding>
          <wd-notice-bar
            :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-0')"
            closable
            prefix="sound"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="内容形态" transparent>
        <demo-group-item :title="$t('jin-zhi-gun-dong')" no-padding>
          <wd-notice-bar :scrollable="false" :text="$t('yu-mai-gui-hua-tong-zai-jiu-zhong-bu-si-shao-nian-you')" prefix="stop" />
        </demo-group-item>
        <demo-group-item :title="$t('cha-cao')" no-padding>
          <wd-notice-bar :scrollable="false">
            <template #prefix>
              <wd-icon custom-class="prefix" name="stop">{{ $t('zhan-wei-fu') }}</wd-icon>
            </template>
            {{ $t('tong-zhi-bei-jin-huo-shi-duan-nei-xiao-xi-ping-bi-ke-neng-zao-cheng-xiao') }}
            <template #suffix>
              <view class="page-notice-bar__suffix">{{ $t('cha-kan') }}</view>
            </template>
          </wd-notice-bar>
        </demo-group-item>
        <demo-group-item :title="$t('duo-hang-zhan-shi')" no-padding>
          <wd-notice-bar
            :text="
              $t(
                'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
              )
            "
            wrapable
            :scrollable="false"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式" transparent>
        <demo-group-item :title="$t('zi-ding-yi-yan-se-0')" no-padding>
          <wd-notice-bar
            :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-1')"
            prefix="robot"
            color="#34D19D"
            background-color="#f0f9eb"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊用法" transparent>
        <demo-group-item :title="$t('duo-wen-ben-lun-bo')" no-padding>
          <wd-notice-bar @click="handleClick" :text="textArray" prefix="thunderbolt" @next="onNext" />
        </demo-group-item>
        <demo-group-item :title="$t('chui-zhi-gun-dong')" no-padding>
          <wd-notice-bar @click="handleClick" prefix="experiment" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
          <wd-notice-bar
            @click="handleClick"
            prefix="experiment"
            direction="vertical"
            :text="$t('zhi-you-yi-tiao-xiao-xi-bu-hui-gun-dong')"
            :delay="3"
            custom-class="space"
          />
        </demo-group-item>
        <demo-group-item :title="$t('zhong-zhi-bo-fang-dong-hua')" no-padding>
          <wd-notice-bar ref="notice" prefix="wifi" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
          <wd-button @click="handleReset">{{ $t('zhong-zhi-bo-fang-dong-hua-0') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { type NoticeBarInstance } from '@/uni_modules/wot-ui/components/wd-notice-bar/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const notice = ref<NoticeBarInstance>()

function handleReset() {
  notice.value?.reset()
}

const textArray = ref(['芦叶满汀洲', '寒沙带浅流', '二十年重过南楼', '柳下系船犹未稳', '能几日', '又中秋'])

const onNext = (index: number) => {
  console.log('展示下一条，index: ', index)
  console.log('文本是：' + textArray.value[index])
}

function handleClick(result: { text: string; index: number }) {
  console.log(result)
}
</script>
<style lang="scss" scoped>
.page-notice-bar {
  :deep(.demo-group-item__content) {
    overflow: hidden;
  }
}

:deep(.prefix) {
  font-size: 20px;
  margin-right: 8px;
}

.page-notice-bar__suffix {
  color: #4d80f0;
}

:deep(.space) {
  margin-bottom: 10px;
}
</style>
