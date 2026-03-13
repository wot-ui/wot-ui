<template>
  <page-wraper>
    <view class="page-button">
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success">{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info">{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning">{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger">{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('jin-yong-an-niu')">
        <wd-button disabled>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" disabled>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" disabled>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" disabled>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" disabled>{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block title="Text Attribute (文字属性)">
        <wd-button text="Text Prop"></wd-button>
        <wd-button type="success" :text="$t('cheng-gong-an-niu-0')"></wd-button>
      </demo-block>

      <!-- 按钮变体 Variant -->
      <demo-block title="按钮变体 (variant)">
        <view style="margin-bottom: 20px">
          <text style="font-size: 14px; color: #909399; display: block; margin-bottom: 10px">幽灵按钮 (plain)</text>
          <wd-button variant="plain">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="success" variant="plain">{{ $t('cheng-gong-an-niu-0') }}</wd-button>
          <wd-button type="info" variant="plain">{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="warning" variant="plain">{{ $t('jing-gao-an-niu-0') }}</wd-button>
          <wd-button type="danger" variant="plain">{{ $t('wei-xian-an-niu') }}</wd-button>
        </view>

        <view style="margin-bottom: 20px">
          <text style="font-size: 14px; color: #909399; display: block; margin-bottom: 10px">虚线边框 (dashed)</text>
          <wd-button variant="dashed">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="success" variant="dashed">{{ $t('cheng-gong-an-niu-0') }}</wd-button>
          <wd-button type="info" variant="dashed">{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="warning" variant="dashed">{{ $t('jing-gao-an-niu-0') }}</wd-button>
          <wd-button type="danger" variant="dashed">{{ $t('wei-xian-an-niu') }}</wd-button>
        </view>

        <view>
          <text style="font-size: 14px; color: #909399; display: block; margin-bottom: 10px">文字按钮 (text)</text>
          <wd-button variant="text">{{ $t('an-niu-0') }}</wd-button>
          <wd-button variant="text" type="success">{{ $t('an-niu-0') }}</wd-button>
          <wd-button variant="text" type="info">{{ $t('an-niu-0') }}</wd-button>
          <wd-button variant="text" type="warning">{{ $t('an-niu-0') }}</wd-button>
          <wd-button variant="text" type="danger">{{ $t('an-niu-0') }}</wd-button>
          <wd-button variant="text" disabled>{{ $t('an-niu-0') }}</wd-button>
        </view>
      </demo-block>

      <demo-block title="幽灵按钮 + 圆角">
        <wd-button variant="plain" round>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" variant="plain" round>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" variant="plain" round>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" variant="plain" round>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" variant="plain" round>{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('xi-bian-kuang-you-ling-an-niu')">
        <wd-button variant="plain" hairline>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" variant="plain" hairline>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" variant="plain" hairline>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" variant="plain" hairline>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" variant="plain" hairline>{{ $t('wei-xian-an-niu') }}</wd-button>

        <wd-button variant="plain" hairline round>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" variant="plain" hairline round>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" variant="plain" hairline round>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" variant="plain" hairline round>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" variant="plain" hairline round>{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block title="虚线边框 + 圆角">
        <wd-button variant="dashed" round>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" variant="dashed" round>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" variant="dashed" round>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" variant="dashed" round>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" variant="dashed" round>{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block title="变体禁用状态">
        <wd-button variant="plain" disabled>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" variant="plain" disabled>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" variant="dashed" disabled>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" variant="dashed" disabled>{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" variant="text" disabled>{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('an-niu-da-xiao')">
        <wd-button size="mini">迷你按钮</wd-button>
        <wd-button size="small">{{ $t('xiao-xing-an-niu') }}</wd-button>
        <wd-button size="medium">{{ $t('pu-tong-an-niu') }}</wd-button>
        <wd-button size="large">{{ $t('da-xing-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('jia-zai-zhong-0')">
        <wd-button loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="success" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="warning" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="danger" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="info" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="success" variant="plain" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="warning" variant="plain" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="danger" variant="plain" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
        <wd-button type="info" variant="plain" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('tu-biao-an-niu')">
        <view>
          <wd-button icon="delete" type="primary"></wd-button>
          <wd-button icon="delete" type="success"></wd-button>
          <wd-button icon="delete" type="info"></wd-button>
          <wd-button icon="delete" type="warning"></wd-button>
          <wd-button icon="delete" type="danger"></wd-button>
        </view>
        <view>
          <wd-button icon="delete" type="primary" variant="plain"></wd-button>
          <wd-button icon="delete" type="success" variant="plain"></wd-button>
          <wd-button icon="delete" type="info" variant="plain"></wd-button>
          <wd-button icon="delete" type="warning" variant="plain"></wd-button>
          <wd-button icon="delete" type="danger" variant="plain"></wd-button>
        </view>

        <view>
          <wd-button icon="delete" type="primary" variant="plain" round></wd-button>
          <wd-button icon="delete" type="success" variant="plain" round></wd-button>
          <wd-button icon="delete" type="info" variant="plain" round></wd-button>
          <wd-button icon="delete" type="warning" variant="plain" round></wd-button>
          <wd-button icon="delete" type="danger" variant="plain" round></wd-button>
        </view>
      </demo-block>

      <demo-block :title="$t('dai-tu-biao-de-ji-ben-an-niu')">
        <wd-button icon="download">{{ $t('xia-zai') }}</wd-button>
        <wd-button icon="settings">{{ $t('she-zhi') }}</wd-button>
        <wd-button classPrefix="fish" icon="kehuishouwu">{{ $t('ke-hui-shou') }}</wd-button>
        <wd-button icon="download" size="small">{{ $t('xia-zai') }}</wd-button>
        <wd-button icon="settings" size="small">{{ $t('she-zhi') }}</wd-button>
        <wd-button icon="download" size="large">{{ $t('xia-zai') }}</wd-button>
        <wd-button icon="settings" size="large">{{ $t('she-zhi') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('kuai-zhuang-an-niu-kuan-du-100')">
        <wd-button block size="large">{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" block size="large">{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" block size="large">{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" block size="large">{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" block size="large">{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('chang-yong-an-niu-kuai-zhuang-yuan-jiao')">
        <wd-button block size="large" round disabled>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button block size="large" round>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button block size="large" round loading>{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="info" block round size="large" disabled>{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="info" block round size="large">{{ $t('xin-xi-an-niu') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('chang-yong-an-niu-yuan-jiao-huo-yuan-jiao-you-ling')">
        <view>
          <wd-button disabled>{{ $t('zhu-cao-zuo') }}</wd-button>
          <wd-button size="small" disabled>{{ $t('zhu-cao-zuo') }}</wd-button>
        </view>
        <view>
          <wd-button>{{ $t('zhu-cao-zuo') }}</wd-button>
          <wd-button size="small">{{ $t('zhu-cao-zuo') }}</wd-button>
        </view>
        <view>
          <wd-button type="info" disabled>{{ $t('ci-cao-zuo-0') }}</wd-button>
          <wd-button type="info" size="small" disabled>{{ $t('ci-cao-zuo-0') }}</wd-button>
        </view>
        <view>
          <wd-button type="info">{{ $t('ci-cao-zuo-0') }}</wd-button>
          <wd-button type="info" size="small">{{ $t('ci-cao-zuo-0') }}</wd-button>
        </view>
        <view>
          <wd-button variant="plain" disabled>{{ $t('you-ling-an-niu') }}</wd-button>
          <wd-button size="small" variant="plain" disabled>{{ $t('you-ling-an-niu') }}</wd-button>
        </view>
        <view>
          <wd-button variant="plain">{{ $t('you-ling-an-niu') }}</wd-button>
          <wd-button size="small" variant="plain">{{ $t('you-ling-an-niu') }}</wd-button>
        </view>
        <view>
          <wd-button type="info" variant="plain" disabled>{{ $t('ci-cao-zuo-0') }}</wd-button>
          <wd-button type="info" size="small" variant="plain" disabled>{{ $t('ci-cao-zuo-0') }}</wd-button>
        </view>
        <view>
          <wd-button type="info" variant="plain">{{ $t('ci-cao-zuo-0') }}</wd-button>
          <wd-button type="info" size="small" variant="plain">{{ $t('ci-cao-zuo-0') }}</wd-button>
        </view>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yang-shi-material-design-3-feng-ge-boxshadow')">
        <wd-button custom-class="custom-shadow">{{ $t('zhu-yao-an-niu') }}</wd-button>
        <wd-button type="success" custom-class="custom-shadow">{{ $t('cheng-gong-an-niu-0') }}</wd-button>
        <wd-button type="info" custom-class="custom-shadow">{{ $t('xin-xi-an-niu') }}</wd-button>
        <wd-button type="warning" custom-class="custom-shadow">{{ $t('jing-gao-an-niu-0') }}</wd-button>
        <wd-button type="danger" custom-class="custom-shadow">{{ $t('wei-xian-an-niu') }}</wd-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function handleGetuserinfo(event: any) {
  // TODO
  console.log(event)
}
</script>
<style lang="scss" scoped>
.page-button {
  :deep(button) {
    margin: 0 10px 10px 0;
  }

  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
  .button-block {
    margin-right: 0;
  }
}
</style>
