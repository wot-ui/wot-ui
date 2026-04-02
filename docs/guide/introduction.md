# 介绍

在 `V1` 版本，`Wot UI` 基于 `vue3`+`Typescript`构建，参照`wot design`的设计规范进行开发。  

在 `V2` 版本我们更加注重美观和 AI 友好度，采用了 AI 友好度更高的设计，提供了 80+ 高质量组件和 AI 编程实践方案，支持暗黑模式、国际化和自定义主题，旨在给开发者提供简洁高效的 UI 交互和`AI友好`的开发体验。

## 快速上手

请查看[快速上手](/guide/quick-use.html)文档。

## 扫码体验

<div style="display:flex;gap:24px">
<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="WxQrcode" />
  <div style="text-align: center;">微信扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AlipayQrcode" />
  <div style="text-align: center;">支付宝扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="H5Qrcode" />
  <div style="text-align: center;">浏览器扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AndroidQrcode" />
  <div style="text-align: center;">浏览器扫码</div>
</div>
</div>

## ✨ 特性

- 🎯 多平台覆盖，支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等.
- 🚀 80+ 个高质量组件，覆盖移动端主流场景.
- 💪 使用 Typescript 构建，提供良好的组件类型系统.
- 🤖 提供 AI 友好的设计系统.
- 🌍 支持国际化，内置 15 种语言包.
- 📖 提供丰富的文档和组件示例.
- 🎨 支持修改 CSS 变量实现主题定制.
- 🍭 支持暗黑模式

## 赞助我们

如果您认为 Wot UI 帮助到了您的开发工作，您可以选择[赞助](/reward/reward.html)我们，赞助无门槛，哪怕是一杯柠檬水也好。

捐赠后您的昵称、留言等将会展示在[捐赠榜单](/reward/donor.html)中。

## 生态

| 项目                                                                                                        | 描述                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [awesome-uni-app](https://github.com/uni-helper/awesome-uni-app)                                            | 多端统一开发框架 uni-app 优秀开发资源汇总            |
| [create-uni](https://github.com/uni-helper/create-uni)                                                      | 快速创建 uni-app 项目                                |
| [wot-starter](https://github.com/wot-ui/wot-starter)                  | 基于 [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 的 wot-ui 快速起手项目     |
| [wot-starter-retail](https://github.com/Moonofweisheng/wot-starter-retail)                                  | 基于 wot-ui 的 uni-app 零售行业模板          |
| [wot-ui-intellisense](https://github.com/wot-ui/wot-ui-intellisense)                                        | wot-ui vscode 代码提示插件                           |
| [uni-mini-ci](https://github.com/Moonofweisheng/uni-mini-ci)                                                | 一个 uni-app 小程序端构建后支持 CI（持续集成）的插件 |
| [my-uni](https://github.com/wot-ui/my-uni)                                        | 摸鱼 uni 插件库合集  |
| [unibest](https://github.com/unibest-tech/unibest)                                                              | 基于 wot-ui 的 uni-app 模板                  |
| [uni-ku-root](https://github.com/uni-ku/root)                                                               | 一个模拟 App.vue 原有能力的根组件插件                |

## 鸣谢

- [wot-design](https://github.com/jd-ftf/wot-design-mini) - 感谢 wot-design 团队多年来的不断维护，让 wot-ui 能够站在巨人的肩膀上。
- [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队提供的 uni-app 工具库，让 wot-ui 能够更方便地使用。
- [捐赠者](https://wot-ui.cn/reward/donor.html) - 感谢所有捐赠者，是你们的捐赠让 wot-ui 能够更好地发展。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

<script setup>
import WxQrcode from '/wx.jpg'
import AlipayQrcode from '/alipay.png'
import H5Qrcode from '/h5.png'
import AndroidQrcode from '/android.png'
</script>
