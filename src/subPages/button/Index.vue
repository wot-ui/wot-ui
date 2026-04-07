<template>
  <page-wraper>
    <view class="page-button">
      <demo-group title="组件类型">
        <demo-group-item title="类型">
          <wd-button v-for="item in typeItems" :key="`base-${item.type}`" :type="item.type">{{ $t(item.textKey) }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item title="禁用">
          <wd-button v-for="item in typeItems" :key="`disabled-${item.type}`" :type="item.type" disabled>{{ $t(item.textKey) }}</wd-button>
        </demo-group-item>
        <demo-group-item title="加载">
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`loading-${item.type}`" :type="item.type" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
          </view>
          <view class="demo-row">
            <wd-button v-for="item in plainLoadingItems" :key="`loading-plain-${item.type}`" :type="item.type" variant="plain" loading>
              {{ $t('jia-zai-zhong-0') }}
            </wd-button>
          </view>
        </demo-group-item>
        <demo-group-item title="变体禁用">
          <wd-button variant="plain" disabled>{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="success" variant="plain" disabled>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
          <wd-button type="info" variant="dashed" disabled>{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="warning" variant="dashed" disabled>{{ $t('jing-gao-an-niu-0') }}</wd-button>
          <wd-button type="danger" variant="text" disabled>{{ $t('wei-xian-an-niu') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item v-for="variant in variantItems" :key="variant.variant" :title="variant.title">
          <wd-button v-for="item in typeItems" :key="`${variant.variant}-${item.type}`" :type="item.type" :variant="variant.variant">
            {{ variant.variant === 'text' ? $t('an-niu-0') : $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="尺寸">
          <wd-button v-for="item in sizeItems" :key="item.size" :size="item.size">{{ item.text }}</wd-button>
        </demo-group-item>
        <demo-group-item title="细边框与圆角">
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`hairline-${item.type}`" :type="item.type" variant="plain" hairline>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`hairline-round-${item.type}`" :type="item.type" variant="plain" hairline round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
        </demo-group-item>
        <demo-group-item title="圆角对比">
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`plain-round-${item.type}`" :type="item.type" variant="plain" round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`dashed-round-${item.type}`" :type="item.type" variant="dashed" round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item title="custom-class 阴影">
          <wd-button v-for="item in typeItems" :key="`shadow-${item.type}`" :type="item.type" custom-class="custom-shadow">
            {{ $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="内容形态">
        <demo-group-item title="text 属性">
          <wd-button text="默认按钮"></wd-button>
          <wd-button type="success" :text="$t('cheng-gong-an-niu-0')"></wd-button>
        </demo-group-item>
        <demo-group-item title="纯图标按钮">
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`icon-base-${item.type}`" icon="delete" :type="item.type"></wd-button>
          </view>
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`icon-plain-${item.type}`" icon="delete" :type="item.type" variant="plain"></wd-button>
          </view>
          <view class="demo-row">
            <wd-button v-for="item in typeItems" :key="`icon-round-${item.type}`" icon="delete" :type="item.type" variant="plain" round></wd-button>
          </view>
        </demo-group-item>
        <demo-group-item title="图文按钮">
          <wd-button icon="download">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings">{{ $t('she-zhi') }}</wd-button>
          <wd-button classPrefix="fish" icon="kehuishouwu">{{ $t('ke-hui-shou') }}</wd-button>
          <wd-button icon="download" size="small">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings" size="small">{{ $t('she-zhi') }}</wd-button>
          <wd-button icon="download" size="large">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings" size="large">{{ $t('she-zhi') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="布局能力">
        <demo-group-item title="块级按钮">
          <wd-button v-for="item in typeItems" :key="`block-${item.type}`" :type="item.type" block size="large" custom-class="button-block">
            {{ $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
        <demo-group-item title="块级圆角组合">
          <wd-button block size="large" round disabled custom-class="button-block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button block size="large" round custom-class="button-block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button block size="large" round loading custom-class="button-block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="info" block round size="large" disabled custom-class="button-block">{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="info" block round size="large" custom-class="button-block">{{ $t('xin-xi-an-niu') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
const typeItems = [
  { type: 'primary', textKey: 'zhu-yao-an-niu' },
  { type: 'success', textKey: 'cheng-gong-an-niu-0' },
  { type: 'info', textKey: 'xin-xi-an-niu' },
  { type: 'warning', textKey: 'jing-gao-an-niu-0' },
  { type: 'danger', textKey: 'wei-xian-an-niu' }
] as const

const sizeItems = [
  { size: 'mini', text: '迷你按钮' },
  { size: 'small', text: '小型按钮' },
  { size: 'medium', text: '普通按钮' },
  { size: 'large', text: '大型按钮' }
] as const

const variantItems = [
  { title: '镂空', variant: 'plain' },
  { title: '虚线', variant: 'dashed' },
  { title: '柔和', variant: 'soft' },
  { title: '文字', variant: 'text' }
] as const

const plainLoadingItems = [{ type: 'success' }, { type: 'warning' }, { type: 'danger' }, { type: 'info' }] as const
</script>
<style lang="scss">
.page-button {
  :deep(.demo-group-item__container) {
    padding-bottom: 4px;
  }

  .wd-button {
    margin: 0 10px 10px 0;
  }

  .demo-row {
    margin-bottom: 12px;
  }

  :deep(.custom-shadow) {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  .button-block {
    margin-right: 0;
  }
}
</style>
