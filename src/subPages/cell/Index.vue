<template>
  <page-wraper>
    <wd-toast />
    <view class="page-cell">
      <demo-group title="组件类型">
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

      <demo-group title="组件状态">
        <demo-group-item :title="$t('dian-ji-shi-jian')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('biao-ti-wen-zi-11')" :value="$t('nei-rong')" clickable @click="showToast" />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item title="Placeholder" no-padding>
          <wd-cell-group>
            <wd-cell title="用户名" placeholder="请输入用户名" />
            <wd-cell title="手机号" value="188****8888" placeholder="请输入手机号" />
            <wd-cell title="左对齐" placeholder="请输入内容" value-align="left" />
            <wd-cell title="居中对齐" placeholder="请输入内容" value-align="center" />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item :title="$t('ye-mian-tiao-zhuan')" no-padding>
          <wd-cell-group>
            <wd-cell :title="$t('bang-zhu-yu-fan-kui')" is-link to="/pages/index/Index" />
            <wd-cell :title="$t('she-zhi')" :value="$t('nei-rong')" is-link to="/pages/button/Index" replace />
          </wd-cell-group>
        </demo-group-item>

        <demo-group-item title="箭头方向" no-padding>
          <wd-cell-group>
            <wd-cell title="向上箭头" is-link arrow-direction="up" />
            <wd-cell title="向下箭头" is-link arrow-direction="down" />
            <wd-cell title="向左箭头" is-link arrow-direction="left" />
            <wd-cell title="默认箭头(向右)" is-link />
          </wd-cell-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
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
                <view class="cell-icon"></view>
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

      <demo-group title="特殊样式">
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
              <wd-button custom-class="custom-value" size="small" plain>{{ $t('an-niu-0') }}</wd-button>
            </wd-cell>
            <wd-cell :title="$t('biao-ti-wen-zi-16')" center>
              <view class="custom-value" style="height: 32px">
                <wd-switch v-model="switchValue" @change="handleSwitchChange" />
              </view>
            </wd-cell>
            <wd-cell :title="$t('biao-ti-wen-zi-17')" is-link to="/pages/index/index">
              <view class="custom-text">{{ $t('ding-gou') }}</view>
            </wd-cell>
            <wd-cell>
              <template #title>
                <view>
                  <view style="display: inline-block">{{ $t('biao-ti-wen-zi-18') }}</view>
                  <view class="end-time">{{ $t('25-tian-hou-dao-qi') }}</view>
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
.cell-icon {
  display: block;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  margin: 4px 4px 4px 0;
  background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
  background-size: cover;
}

.custom-text {
  color: #f0883a;
}
.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
</style>
