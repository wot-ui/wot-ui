<template>
  <page-wraper>
    <view class="page-card">
      <demo-group :title="$t('zu-jian-lei-xing')" transparent>
        <demo-group-item :title="$t('ji-ben-shi-yong')" no-padding>
          <wd-card :title="$t('yue-yang-lou-ji')">
            <view class="content-text">
              {{
                $t(
                  'zhi-ruo-chun-he-jing-ming-bo-lan-bu-jing-shang-xia-tian-guang-yi-bi-wan-qing-sha-ou-xiang-ji-jin-lin-you-yong-an-zhi-ting-lan-yu-yu-qing-qing-er-huo-chang-yan-yi-kong-hao-yue-qian-li-fu-guang-yue-jin-jing-ying-chen-bi-yu-ge-hu-da-ci-le-he-ji-deng-si-lou-ye-ze-you-xin-kuang-shen-yi-chong-ru-xie-wang-ba-jiu-lin-feng-qi-xi-yang-yang-zhe-yi'
                )
              }}
            </view>
            <template #footer>
              <view class="footer-group">
                <wd-button size="small" plain>{{ $t('yue-du-quan-wen') }}</wd-button>
              </view>
            </template>
          </wd-card>

          <wd-card :title="$t('ge-ren-ming-pian')">
            <view class="user-card">
              <image :src="blackMao" class="user-card__avatar" mode="aspectFill" />
              <view class="user-card__content">
                <view class="user-card__title">{{ $t('xiao-hei-mao-de-gu-shi') }}</view>
                <view class="user-card__desc">
                  {{ $t('yi-zhi-wen-rou-de-hei-se-xiao-mao-xi-huan-zai-wu-hou-de-yang-guang-xia-da-gun-zhui-zhu-hu-die') }}
                </view>
                <view class="user-card__meta">{{ $t('fen-si-125w-guan-zhu-28') }}</view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group">
                <wd-button size="small" plain>{{ $t('guan-zhu') }}</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>

        <demo-group-item :title="$t('ju-xing-ka-pian')" no-padding>
          <wd-card :title="$t('sheng-huo-ji-lu')" type="rectangle">
            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('jin-tian-tian-qi-zhen-hao') }}</view>
                  <view class="list-item__desc">{{ $t('2026-nian-2-yue-11-ri-qing-tian-22') }}</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('yong-lan-de-wu-shui-shi-guang') }}</view>
                  <view class="list-item__desc">{{ $t('yang-guang-sa-jin-fang-jian-shu-fu-de-bu-xiang-dong') }}</view>
                </view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>{{ $t('dian-zan') }}</wd-button>
                <wd-button size="small" plain>{{ $t('pingLun') }}</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')" transparent>
        <demo-group-item :title="$t('fu-za-ka-pian')" no-padding>
          <wd-card :title="$t('chong-wu-dang-an')">
            <view class="info-card">
              <view class="info-card__image-box">
                <image class="info-card__image" :src="blackMao" mode="aspectFill" />
                <view class="info-card__badge">{{ $t('ren-qi-zhi-xing') }}</view>
              </view>

              <view class="info-card__content">
                <view class="info-card__header">{{ $t('xiao-hei-zhi-yu-xi-hei-se-xiao-mao-mi') }}</view>
                <view class="info-card__meta-row">
                  <text class="info-card__tag">{{ $t('meng-chong-ri-chang') }}</text>
                  <text class="info-card__time">{{ $t('2-xiao-shi-qian-fa-bu') }}</text>
                </view>

                <view class="info-card__props">
                  <view class="info-card__prop-col">
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('pin-zhong') }}</text>
                      <text class="info-card__value">{{ $t('zhong-hua-tian-yuan-mao') }}</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('xing-ge') }}</text>
                      <text class="info-card__value">{{ $t('huo-po-hao-dong') }}</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('te-ji') }}</text>
                      <text class="info-card__value">{{ $t('gao-neng-tiao-yue') }}</text>
                    </view>
                  </view>
                  <view class="info-card__prop-col">
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('nian-ling') }}</text>
                      <text class="info-card__value">{{ $t('05-sui') }}</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('xing-bie') }}</text>
                      <text class="info-card__value">{{ $t('nv') }}</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">{{ $t('zuo-biao') }}</text>
                      <text class="info-card__value">{{ $t('shang-hai') }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>

            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>{{ $t('dian-zan-12w') }}</wd-button>
                <wd-button size="small" plain>{{ $t('shou-cang-0') }}</wd-button>
                <wd-button size="small" plain>{{ $t('fen-xiang') }}</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')" transparent>
        <demo-group-item :title="$t('zi-ding-yi-biao-ti')" no-padding>
          <wd-card type="rectangle">
            <template #title>
              <view class="custom-title">
                <view>{{ $t('xing-qu-ai-hao') }}</view>
                <view class="custom-title__tip">
                  <wd-icon name="heart" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
                  {{ $t('kuai-le-yuan-quan') }}
                </view>
              </view>
            </template>

            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('chuang-bian-de-wu-shui') }}</view>
                  <view class="list-item__desc">{{ $t('zui-xi-huan-zai-wen-nuan-de-yang-guang-xia-da-dun') }}</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('mao-xian-qiu-you-xi') }}</view>
                  <view class="list-item__desc">{{ $t('zhui-zhu-mao-xian-qiu-shi-zui-zhuan-zhu-zui-ke-ai') }}</view>
                </view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>{{ $t('dian-zan') }}</wd-button>
                <wd-button size="small" plain>{{ $t('fen-xiang-0') }}</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')" transparent>
        <demo-group-item :title="$t('qu-chu-footer-0')" no-padding>
          <wd-card :title="$t('jing-cai-shun-jian')" type="rectangle">
            <view class="moment-card">
              <image :src="blackMao" class="moment-card__image" mode="aspectFill" />
              <view class="moment-card__content">
                <view class="moment-card__title">{{ $t('wu-hou-yang-guang-xia-de-qie-yi-shi-guang') }}</view>
                <view class="moment-card__text">
                  {{
                    $t(
                      'jin-tian-de-tian-qi-zhen-hao-yang-guang-sa-zai-shen-shang-nuan-yang-yang-de-xiao-hei-zai-chuang-tai-shang-shui-de-zheng-xiang-ou-er-dong-dong-er-duo-da-gai-shi-meng-jian-le-hao-chi-de-yu-guan-tou-ba'
                    )
                  }}
                </view>
                <view class="moment-card__meta">{{ $t('yue-du-35w-ping-lun-128') }}</view>
              </view>
            </view>
          </wd-card>

          <wd-card type="rectangle">
            <template #title>
              <view class="custom-title">
                <view>{{ $t('geng-duo-dong-tai') }}</view>
                <view class="custom-title__tip">
                  <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
                  {{ $t('mei-ri-geng-xin') }}
                </view>
              </view>
            </template>

            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('fan-du-pi-da-gun-te-ji') }}</view>
                  <view class="list-item__desc">{{ $t('chao-ji-ke-ai-de-shi-fan-biao-yan-meng-hua-ni-de-xin') }}</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">{{ $t('gao-kong-tiao-yue-jue-ji') }}</view>
                  <view class="list-item__desc">{{ $t('zhan-xian-mao-mi-de-ling-huo-shen-shou-jing-tan-lian-lian') }}</view>
                </view>
              </view>
            </view>
          </wd-card>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import blackMao from '../img/black_mao.png'
</script>

<style lang="scss" scoped>
@use '../../uni_modules/wot-ui/styles/variable.scss' as *;

// 通用工具类
.footer-group {
  display: flex;
  align-items: center;
  gap: $spacing-tight;

  &--right {
    justify-content: flex-end;
  }
}

.content-text {
  font-size: $typography-body-size-main;
  color: $text-secondary;
  line-height: $typography-body-line--height-size-main;
  text-align: justify;
}

// 个人名片样式
.user-card {
  display: flex;
  align-items: center;
  gap: $spacing-loose;

  &__avatar {
    width: $n-88;
    height: $n-88;
    border-radius: $radius-large;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-ultra-tight;
  }

  &__title {
    font-size: $typography-body-size-extra-large;
    font-weight: $font-weight-medium;
    color: $text-main;
  }

  &__desc {
    font-size: $typography-body-size-main;
    color: $text-secondary;
    line-height: 1.4;
    margin-bottom: $spacing-ultra-tight;
  }

  &__meta {
    font-size: $typography-label-size-main;
    color: $text-auxiliary;
  }
}

// 复杂卡片（信息卡片）样式
.info-card {
  display: flex;
  gap: $spacing-loose;

  &__image-box {
    position: relative;
    flex-shrink: 0;
  }

  &__image {
    width: $n-98;
    height: $n-98;
    border-radius: $radius-large;
  }

  &__badge {
    position: absolute;
    top: 0;
    left: 0;
    background: $primary-6; // 使用主色
    color: $text-white;
    font-size: $typography-label-size-small;
    padding: 2px 6px;
    border-radius: $radius-large 0 $radius-large 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-tight;
  }

  &__header {
    font-size: $typography-body-size-main;
    font-weight: $font-weight-medium;
    color: $text-main;
    line-height: 1.4;
  }

  &__meta-row {
    display: flex;
    align-items: center;
    gap: $spacing-tight;
  }

  &__tag {
    font-size: $typography-label-size-small;
    padding: 2px 6px;
    background: rgba($primary-6, 0.1);
    color: $primary-6;
    border-radius: $radius-small;
  }

  &__time {
    font-size: $typography-label-size-small;
    color: $text-auxiliary;
  }

  &__props {
    display: flex;
    gap: $spacing-loose;
    margin-top: $spacing-ultra-tight;
  }

  &__prop-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__prop-item {
    display: flex;
    align-items: baseline;
    font-size: $typography-label-size-main;
  }

  &__label {
    color: $text-auxiliary;
    width: 3em;
    text-align-last: justify;
    margin-right: $spacing-tight;
    flex-shrink: 0;
  }

  &__value {
    color: $text-secondary;
    flex: 1;
  }
}

// 大图卡片样式
.moment-card {
  display: flex;
  gap: $spacing-loose;

  &__image {
    width: $n-88;
    height: $n-88;
    border-radius: $radius-large;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: $typography-body-size-extra-large;
    font-weight: $font-weight-medium;
    color: $text-main;
    margin-bottom: $spacing-tight;
  }

  &__text {
    font-size: $typography-body-size-main;
    color: $text-secondary;
    line-height: $typography-body-line--height-size-main;
    margin-bottom: $spacing-tight;
  }

  &__meta {
    font-size: $typography-label-size-main;
    color: $text-auxiliary;
    margin-top: auto;
  }
}

// 自定义标题栏
.custom-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__tip {
    font-size: $typography-label-size-main;
    color: $text-auxiliary;
    display: flex;
    align-items: center;
  }
}

// 列表组样式
.list-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-loose;
}

.list-item {
  display: flex;
  gap: $spacing-loose;
  align-items: center; // 垂直居中对齐

  &__image {
    width: $n-98; // 加大图片
    height: $n-98;
    border-radius: $radius-large;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-ultra-tight;
  }

  &__title {
    font-size: $typography-body-size-large;
    font-weight: $font-weight-medium;
    color: $text-main;
  }

  &__desc {
    font-size: $typography-body-size-main;
    color: $text-secondary;
    line-height: 1.4;
  }
}
</style>
