<template>
  <page-wraper :demo-config="{ transparent: true }">
    <wd-toast />
    <view class="page-cell">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi')" :value="$t('nei-rong')" />
            <wd-cell :title="$t('biao-ti-wen-zi-0')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('fen-zu-biao-ti')" no-padding>
          <wd-cell-group :title="$t('jiao-yi-guan-li')" :value="$t('nei-rong')">
            <wd-cell :title="$t('biao-ti-wen-zi-3')" :value="$t('nei-rong')" />
            <wd-cell
              :title="$t('biao-ti-wen-zi-4')"
              :label="
                $t('huang-he-duan-ji-tou-gu-ren-jin-zai-fou-jiu-jiang-shan-hun-shi-xin-chou-yu-mai-gui-hua-tong-zai-jiu-zhong-bu-si-shao-nian-you')
              "
              :value="$t('nei-rong')"
            />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('dian-ji-shi-jian')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi-11')" :value="$t('nei-rong')" clickable @click="showToast" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item title="Placeholder" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('yong-hu-ming')" :placeholder="$t('qing-shu-ru-yong-hu-ming')" />
            <wd-cell :title="$t('shou-ji-hao')" value="188****8888" :placeholder="$t('qing-shu-ru-shou-ji-hao')" />
            <wd-cell :title="$t('zuo-dui-qi')" :placeholder="$t('qing-shu-ru-nei-rong')" value-align="left" />
            <wd-cell :title="$t('ju-zhong-dui-qi')" :placeholder="$t('qing-shu-ru-nei-rong')" value-align="center" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('ye-mian-tiao-zhuan')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('bang-zhu-yu-fan-kui')" is-link to="/pages/index/Index" />
            <wd-cell :title="$t('she-zhi')" :value="$t('nei-rong')" is-link to="/pages/button/Index" replace />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('jian-tou-fang-xiang')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('xiang-shang-jian-tou')" is-link arrow-direction="up" />
            <wd-cell :title="$t('xiang-xia-jian-tou')" is-link arrow-direction="down" />
            <wd-cell :title="$t('xiang-zuo-jian-tou')" is-link arrow-direction="left" />
            <wd-cell :title="$t('mo-ren-jian-tou-xiang-you')" is-link />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('card-style')" no-padding>
          <wd-cell-group insert>
            <wd-cell :title="$t('biao-ti-wen-zi')" :value="$t('nei-rong')" />
            <wd-cell :title="$t('biao-ti-wen-zi-0')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('tu-biao')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi-1')" :value="$t('nei-rong')" prefix-icon="settings" />
            <wd-cell :title="$t('biao-ti-wen-zi-2')" :value="$t('nei-rong')">
              <template #prefix>
                <view class="page-cell__icon"></view>
              </template>
            </wd-cell>
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('da-chi-cun')" no-padding>
          <wd-cell-group>
            <wd-cell size="large" :title="$t('biao-ti-wen-zi-5')" :value="$t('nei-rong')" />
            <wd-cell :title="$t('biao-ti-wen-zi-6')" :value="$t('nei-rong')" size="large" prefix-icon="settings" is-link />
            <wd-cell size="large" :title="$t('biao-ti-wen-zi-7')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('chui-zhi-ju-zhong')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi-12')" :value="$t('nei-rong')" center />
            <wd-cell :title="$t('biao-ti-wen-zi-13')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" center />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('zhan-shi-bian-kuang-xian')" no-padding>
          <wd-cell-group :title="$t('jiao-yi-guan-li-0')" border>
            <wd-cell :title="$t('biao-ti-wen-zi-8')" :value="$t('nei-rong')" />
            <wd-cell :border="false" :title="$t('biao-ti-wen-zi-9')" :label="$t('zhe-yi-ge-cell-bu-xiang-yao-bian-kuang')" :value="$t('nei-rong')" />
            <wd-cell :title="$t('biao-ti-wen-zi-10')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('biao-dan-shu-xing')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('bi-tian')" required>
              <wd-rate v-model="rate" @change="handleRateChange" />
            </wd-cell>
            <wd-cell :title="$t('bi-tian-xing-hao-zai-you-ce')" required asterisk-position="end">
              <wd-rate v-model="rate1" @change="handleRateChange" />
            </wd-cell>
            <wd-cell :title="$t('shang-xia-jie-gou')" layout="vertical" required asterisk-position="end">
              <wd-slider v-model="slider" @change="handleSliderChange" />
            </wd-cell>
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('she-zhi-kuan-du')" no-padding>
          <wd-cell-group>
            <wd-cell
              :title="$t('biao-ti-wen-zi-14')"
              :label="$t('zhe-li-shi-wen-zi-miao-shu-zhe-li-shi-wen-zi-miao-shu-zhe-li-shi-wen-zi-miao-shu')"
              title-width="200px"
              :value="$t('nei-rong')"
            />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('sheng-lve-hao-xian-shi')" no-padding>
          <wd-cell-group>
            <wd-cell
              :title="$t('zheng-chang-xian-shi')"
              :value="$t('zhe-shi-yi-duan-hen-chang-de-wen-zi-nei-rong-tong-chang-qing-kuang-xia-hui-wan-zheng-xian-shi')"
            />
            <wd-cell
              :title="$t('sheng-lve-hao-xian-shi')"
              :value="
                $t('zhe-shi-yi-duan-hen-chang-de-wen-zi-nei-rong-dang-qi-yong-ellipsis-shu-xing-shi-chao-chu-bu-fen-jiang-xian-shi-sheng-lve-hao')
              "
              ellipsis
            />
            <wd-cell
              :title="$t('zuo-dui-qi-sheng-lve')"
              :value="$t('zhe-shi-yi-duan-hen-chang-de-wen-zi-nei-rong-zuo-dui-qi-bing-qi-yong-sheng-lve-hao-gong-neng')"
              value-align="left"
              ellipsis
            />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('zi-ding-yi-slot')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi-15')" center>
              <wd-button custom-class="page-cell__custom-value" size="small" plain>{{ $t('an-niu-0') }}</wd-button>
            </wd-cell>
            <wd-cell :title="$t('biao-ti-wen-zi-16')" center>
              <view class="page-cell__custom-value page-cell__custom-value--switch">
                <wd-switch v-model="switchValue" @change="handleSwitchChange" />
              </view>
            </wd-cell>
            <wd-cell :title="$t('biao-ti-wen-zi-17')" is-link to="/pages/index/index">
              <view class="page-cell__custom-text">{{ $t('ding-gou') }}</view>
            </wd-cell>
            <wd-cell>
              <template #title>
                <view class="page-cell__title-group">
                  <view class="page-cell__title-text">{{ $t('biao-ti-wen-zi-18') }}</view>
                  <view class="page-cell__end-time">{{ $t('25-tian-hou-dao-qi') }}</view>
                </view>
              </template>
            </wd-cell>
          </wd-cell-group>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rate = ref(0)
const rate1 = ref(0)
const slider = ref(0)
const switchValue = ref('')

function handleRateChange({ value }: any) {
  console.log(value)
}
function handleSliderChange({ value }: any) {
  console.log(value)
}
function handleSwitchChange({ value }: any) {
  console.log(value)
}
const toast = useToast()

function showToast() {
  toast.show(t('dian-ji'))
}
</script>
<style lang="scss" scoped>
.page-cell {
  &__icon {
    display: block;
    box-sizing: border-box;
    width: $n-16;
    height: $n-16;
    margin: $spacing-super-tight $spacing-super-tight $spacing-super-tight 0;
    background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
    background-size: cover;
  }

  &__custom-value {
    &--switch {
      display: flex;
      align-items: center;
      height: $n-32;
    }
  }

  &__custom-text {
    color: $warning-main;
  }

  &__title-group {
    display: flex;
    align-items: center;
  }

  &__title-text {
    display: inline-block;
  }

  &__end-time {
    display: inline-block;
    margin-left: $spacing-tight;
    padding: 0 $padding-super-tight;
    border: $stroke-main solid $warning-main;
    font-size: $typography-label-size-extra-small;
    line-height: $typography-label-line-height-size-extra-small;
    color: $warning-main;
  }
}
</style>
