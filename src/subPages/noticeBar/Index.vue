<template>
  <page-wraper>
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi')"
          prefix="exclamation-circle-fill"
        />
      </demo-block>

      <demo-block :title="$t('lei-xing-xiu-gai')">
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
      </demo-block>

      <demo-block :title="$t('jin-zhi-gun-dong')">
        <wd-notice-bar :scrollable="false" :text="$t('yu-mai-gui-hua-tong-zai-jiu-zhong-bu-si-shao-nian-you')" prefix="stop"></wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('cha-cao')">
        <wd-notice-bar :scrollable="false">
          <template #prefix>
            <wd-icon custom-class="prefix" name="stop">{{ $t('zhan-wei-fu') }}</wd-icon>
          </template>
          {{ $t('tong-zhi-bei-jin-huo-shi-duan-nei-xiao-xi-ping-bi-ke-neng-zao-cheng-xiao') }}
          <template #suffix>
            <div style="color: #4d80f0">{{ $t('cha-kan') }}</div>
          </template>
        </wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('ke-guan-bi-de')">
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-0')"
          closable
          prefix="sound"
        />
      </demo-block>

      <demo-block :title="$t('duo-hang-zhan-shi')">
        <wd-notice-bar
          :text="
            $t(
              'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
            )
          "
          wrapable
          :scrollable="false"
        />
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yan-se-0')">
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-1')"
          prefix="robot"
          color="#34D19D"
          background-color="#f0f9eb"
        ></wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('duo-wen-ben-lun-bo')">
        <wd-notice-bar @click="handleClick" :text="textArray" prefix="thunderbolt" @next="onNext" />
      </demo-block>

      <demo-block :title="$t('chui-zhi-gun-dong')">
        <wd-notice-bar @click="handleClick" prefix="experiment" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
        <wd-notice-bar
          @click="handleClick"
          prefix="experiment"
          direction="vertical"
          :text="$t('zhi-you-yi-tiao-xiao-xi-bu-hui-gun-dong')"
          :delay="3"
          custom-class="space"
        />
      </demo-block>

      <demo-block :title="$t('zhong-zhi-bo-fang-dong-hua')">
        <wd-notice-bar ref="notice" prefix="wifi" direction="vertical" :text="textArray" :delay="3" custom-class="space" />

        <wd-button @click="handleReset">{{ $t('zhong-zhi-bo-fang-dong-hua-0') }}</wd-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
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
:deep(.prefix) {
  font-size: 20px;
  margin-right: 8px;
}

:deep(.space) {
  margin-bottom: 10px;
}
</style>
