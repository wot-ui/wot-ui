<template>
  <page-wraper>
    <view class="page-card">
      <demo-group title="组件类型" transparent>
        <demo-group-item title="基本使用" no-padding>
          <wd-card title="岳阳楼记">
            <view class="content-text">
              至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。
            </view>
            <template #footer>
              <view class="footer-group">
                <wd-button size="small" plain>阅读全文</wd-button>
              </view>
            </template>
          </wd-card>

          <wd-card title="个人名片">
            <view class="user-card">
              <image :src="blackMao" class="user-card__avatar" mode="aspectFill" />
              <view class="user-card__content">
                <view class="user-card__title">小黑猫的故事</view>
                <view class="user-card__desc">一只温柔的黑色小猫，喜欢在午后的阳光下打滚，追逐蝴蝶。</view>
                <view class="user-card__meta">粉丝 12.5w | 关注 28</view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group">
                <wd-button size="small" plain>关注</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>

        <demo-group-item title="矩形卡片" no-padding>
          <wd-card title="生活记录" type="rectangle">
            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">今天天气真好</view>
                  <view class="list-item__desc">2026年2月11日 晴天 22℃</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">慵懒的午睡时光</view>
                  <view class="list-item__desc">阳光洒进房间，舒服得不想动</view>
                </view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>点赞</wd-button>
                <wd-button size="small" plain>评论</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式" transparent>
        <demo-group-item title="复杂卡片" no-padding>
          <wd-card title="宠物档案">
            <view class="info-card">
              <view class="info-card__image-box">
                <image class="info-card__image" :src="blackMao" mode="aspectFill" />
                <view class="info-card__badge">人气之星</view>
              </view>

              <view class="info-card__content">
                <view class="info-card__header">小黑：治愈系黑色小猫咪</view>
                <view class="info-card__meta-row">
                  <text class="info-card__tag">#萌宠日常</text>
                  <text class="info-card__time">2小时前发布</text>
                </view>

                <view class="info-card__props">
                  <view class="info-card__prop-col">
                    <view class="info-card__prop-item">
                      <text class="info-card__label">品种</text>
                      <text class="info-card__value">中华田园猫</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">性格</text>
                      <text class="info-card__value">活泼好动</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">特技</text>
                      <text class="info-card__value">高能跳跃</text>
                    </view>
                  </view>
                  <view class="info-card__prop-col">
                    <view class="info-card__prop-item">
                      <text class="info-card__label">年龄</text>
                      <text class="info-card__value">0.5岁</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">性别</text>
                      <text class="info-card__value">女</text>
                    </view>
                    <view class="info-card__prop-item">
                      <text class="info-card__label">坐标</text>
                      <text class="info-card__value">上海</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>

            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>点赞 (1.2w)</wd-button>
                <wd-button size="small" plain>收藏</wd-button>
                <wd-button size="small" plain>分享</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group title="内容形态" transparent>
        <demo-group-item title="自定义标题" no-padding>
          <wd-card type="rectangle">
            <template #title>
              <view class="custom-title">
                <view>兴趣爱好</view>
                <view class="custom-title__tip">
                  <wd-icon name="heart" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
                  快乐源泉
                </view>
              </view>
            </template>

            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">窗边的午睡</view>
                  <view class="list-item__desc">最喜欢在温暖的阳光下打盹</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">毛线球游戏</view>
                  <view class="list-item__desc">追逐毛线球时最专注最可爱</view>
                </view>
              </view>
            </view>
            <template #footer>
              <view class="footer-group footer-group--right">
                <wd-button size="small" plain>点赞</wd-button>
                <wd-button size="small" plain>分享</wd-button>
              </view>
            </template>
          </wd-card>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式" transparent>
        <demo-group-item title="去除 Footer" no-padding>
          <wd-card title="精彩瞬间" type="rectangle">
            <view class="moment-card">
              <image :src="blackMao" class="moment-card__image" mode="aspectFill" />
              <view class="moment-card__content">
                <view class="moment-card__title">午后阳光下的惬意时光</view>
                <view class="moment-card__text">
                  今天的天气真好，阳光洒在身上暖洋洋的。小黑在窗台上睡得正香，偶尔动动耳朵，大概是梦见了好吃的鱼罐头吧。
                </view>
                <view class="moment-card__meta">阅读 3.5w | 评论 128</view>
              </view>
            </view>
          </wd-card>

          <wd-card type="rectangle">
            <template #title>
              <view class="custom-title">
                <view>更多动态</view>
                <view class="custom-title__tip">
                  <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
                  每日更新
                </view>
              </view>
            </template>

            <view class="list-group">
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">翻肚皮打滚特技</view>
                  <view class="list-item__desc">超级可爱的示范表演，萌化你的心</view>
                </view>
              </view>
              <view class="list-item">
                <image :src="blackMao" class="list-item__image" mode="aspectFill" />
                <view class="list-item__content">
                  <view class="list-item__title">高空跳跃绝技</view>
                  <view class="list-item__desc">展现猫咪的灵活身手，惊叹连连</view>
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
