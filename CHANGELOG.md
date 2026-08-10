# 更新日志 


### [2.3.2](https://github.com/wot-ui/wot-ui/compare/v2.3.1...v2.3.2) (2026-08-10)


### ✏️ Documentation | 文档

* ✏️  更新 qr-code 组件的图片资源 ([318e987](https://github.com/wot-ui/wot-ui/commit/318e9879ac583a3a9b63bbdc0bed7a9bf241c442))
* ✏️  更新演示 dmeo 的二维码 ([0faacee](https://github.com/wot-ui/wot-ui/commit/0faacee048cdf3fbca4d0993ac595832f05679f9))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 H5 端二维码导出图片模糊问题 ([#135](https://github.com/wot-ui/wot-ui/issues/135)) ([6537253](https://github.com/wot-ui/wot-ui/commit/6537253143d05b8317f8c83a52d202972e4bc258))
* 🐛 修复 Slider 组件中图标组件未导入问题 ([#136](https://github.com/wot-ui/wot-ui/issues/136)) ([455d33b](https://github.com/wot-ui/wot-ui/commit/455d33ba974678f2df70ce0d29f155ec404fad43))
* 🐛 修复二维码 矩阵边界溢出 ([#132](https://github.com/wot-ui/wot-ui/issues/132)) ([05b7287](https://github.com/wot-ui/wot-ui/commit/05b72873cc118e253011ae76efdfa6732c933902))

### [2.3.1](https://github.com/wot-ui/wot-ui/compare/v2.3.0...v2.3.1) (2026-08-04)


### 🐛 Bug Fixes | Bug 修复

* 🐛 移除 qr-code 的 CommonJS 导出，避免覆盖 vendor 模块 ([#130](https://github.com/wot-ui/wot-ui/issues/130)) ([cf2c892](https://github.com/wot-ui/wot-ui/commit/cf2c8926bc97b629d33e07eb185db887f9a85532))

## [2.3.0](https://github.com/wot-ui/wot-ui/compare/v2.2.0...v2.3.0) (2026-08-03)


### ✨ Features | 新功能

* ✨ 新增二维码组件 ([#23](https://github.com/wot-ui/wot-ui/issues/23)) ([55627c3](https://github.com/wot-ui/wot-ui/commit/55627c31caae1a787e5867e793b7fa16af79b68a))
* ✨ 修复 Form 表单同字段多条校验错误提示被覆盖问题 ([#92](https://github.com/wot-ui/wot-ui/issues/92)) ([46014f5](https://github.com/wot-ui/wot-ui/commit/46014f5ba4012f10371839ff881697bd190b90d0)), closes [#89](https://github.com/wot-ui/wot-ui/issues/89)
* ✨ 支持 Collapse 非受控模式 ([#94](https://github.com/wot-ui/wot-ui/issues/94)) ([0bd754f](https://github.com/wot-ui/wot-ui/commit/0bd754f76dba7df02c3a7e4d077522673feff8c0)), closes [#74](https://github.com/wot-ui/wot-ui/issues/74)
* ✨ 支持 Form 表单禁用与 FormItem 点击入口拦截 ([#98](https://github.com/wot-ui/wot-ui/issues/98)) ([056ac0d](https://github.com/wot-ui/wot-ui/commit/056ac0d8332611ffb77b19953f80557ca8679062)), closes [#91](https://github.com/wot-ui/wot-ui/issues/91)
* ✨ 支持 icon 相关组件透传 iconPrefix 与 cssIcon ([#101](https://github.com/wot-ui/wot-ui/issues/101)) ([130192b](https://github.com/wot-ui/wot-ui/commit/130192bd8bd6682a3b875f5b335703a8196615b6)), closes [#100](https://github.com/wot-ui/wot-ui/issues/100)
* ✨ 支持 label 插槽的启用与配置 ([#109](https://github.com/wot-ui/wot-ui/issues/109)) ([78360a0](https://github.com/wot-ui/wot-ui/commit/78360a030f9658761368494ac69f97f7792ea9dc)), closes [#106](https://github.com/wot-ui/wot-ui/issues/106)


### ✏️ Documentation | 文档

* ✏️  官方生态 `@wot-ui/oiyo-starter` 新增对应的 icon 图 ([#117](https://github.com/wot-ui/wot-ui/issues/117)) ([9d6a31f](https://github.com/wot-ui/wot-ui/commit/9d6a31f3cdc0908032e53bc576525b7a782d7d58))
* ✏️  首页添加官方生态 ([3c94050](https://github.com/wot-ui/wot-ui/commit/3c940508093048936e1ffb9bc96bf117dbc98325))
* ✏️  突出 AI 文档入口与使用指引 ([#99](https://github.com/wot-ui/wot-ui/issues/99)) ([bc670a6](https://github.com/wot-ui/wot-ui/commit/bc670a6a25a438f23deeee05c050aae7fbd26ca4))
* ✏️  新增顶部 生态 组中 oiyo 相关内容 ([#113](https://github.com/wot-ui/wot-ui/issues/113)) ([65fd2d8](https://github.com/wot-ui/wot-ui/commit/65fd2d82b70553dde0c52306b3d6ad2cfe622235))
* ✏️  移除 vercel 重定向的逻辑 ([42308b1](https://github.com/wot-ui/wot-ui/commit/42308b14e5f5291aab09a1d5f0ac78b5cbab0ca4))
* ✏️  优化文档顶部 banner 样式 ([2f4dc9b](https://github.com/wot-ui/wot-ui/commit/2f4dc9b94eb75ccfc022a26c06d62b097b9fcf13))
* ✏️ 将 oiyo-starter 新增到工程实践的模板内容中 ([#119](https://github.com/wot-ui/wot-ui/issues/119)) ([ca1192d](https://github.com/wot-ui/wot-ui/commit/ca1192db243cd8bfa875cc8e1e76c503b1bf48df))
* ✏️ 在首页新增展示 生态 的区域 ([#114](https://github.com/wot-ui/wot-ui/issues/114)) ([dc9c3cd](https://github.com/wot-ui/wot-ui/commit/dc9c3cd9c87961185a252004cb76f4dbf1c598a4))

## [2.2.0](https://github.com/wot-ui/wot-ui/compare/v2.1.0...v2.2.0) (2026-06-30)


### ✨ Features | 新功能

* ✨ VideoPreview 支持预览时默认 video 铺满屏幕 ([#79](https://github.com/wot-ui/wot-ui/issues/79)) ([8e97be7](https://github.com/wot-ui/wot-ui/commit/8e97be72f25043bd2160e510f56bbddc5c77943f)), closes [#77](https://github.com/wot-ui/wot-ui/issues/77)
* **button:** ✨ 新增 subtle 类型变体 ([#80](https://github.com/wot-ui/wot-ui/issues/80)) ([5c9e3d1](https://github.com/wot-ui/wot-ui/commit/5c9e3d1d12e29b926640fbc45fcb59586bea566b))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Toast 组件图标设置图标大小后行高异常的问题 ([#84](https://github.com/wot-ui/wot-ui/issues/84)) ([13585ff](https://github.com/wot-ui/wot-ui/commit/13585ffdf7f6dc181c39ff16e861a5bcf7273eb7))
* 🐛 修复未渲染的表单项仍触发表单校验的问题 ([#78](https://github.com/wot-ui/wot-ui/issues/78)) ([01d08f1](https://github.com/wot-ui/wot-ui/commit/01d08f127ec786275af40b0b0515176173d57173)), closes [#73](https://github.com/wot-ui/wot-ui/issues/73)
* 🐛 修复支付宝小程序 tabs 子组件渲染顺序错误的问题 ([#83](https://github.com/wot-ui/wot-ui/issues/83)) ([58c4c61](https://github.com/wot-ui/wot-ui/commit/58c4c618de497a066b058cc911c3c01e0fa7548b))
* 修复文档中自动导入示例代码的问题 ([#75](https://github.com/wot-ui/wot-ui/issues/75)) ([be68ccd](https://github.com/wot-ui/wot-ui/commit/be68ccdede09476da833afd9583fbf97dc618291))

## [2.1.0](https://github.com/wot-ui/wot-ui/compare/v2.0.8...v2.1.0) (2026-06-10)


### ✨ Features | 新功能

* ✨ config-provider 新增全局配置能力并接入 button 与 tag ([#62](https://github.com/wot-ui/wot-ui/issues/62)) ([f451ba8](https://github.com/wot-ui/wot-ui/commit/f451ba8e22d4672ace475d807451347b6668e153)), closes [#13](https://github.com/wot-ui/wot-ui/issues/13)


### 🐛 Bug Fixes | Bug 修复

* 🐛 兼容性修复与类型补全 ([#43](https://github.com/wot-ui/wot-ui/issues/43)) ([953d164](https://github.com/wot-ui/wot-ui/commit/953d164642f2a2179c89dce3a64496fc5412e750))
* 🐛 将 FAB 组件示例中的错误按钮类型更改为危险按钮 ([#65](https://github.com/wot-ui/wot-ui/issues/65)) ([ed16d5f](https://github.com/wot-ui/wot-ui/commit/ed16d5f9457c2e603f4447b52bc8751b30112269)), closes [#5](https://github.com/wot-ui/wot-ui/issues/5)
* 🐛 修复 Cell 组件的 title 和 label 纯数字和英文场景不换行的问题 ([#64](https://github.com/wot-ui/wot-ui/issues/64)) ([b9d748f](https://github.com/wot-ui/wot-ui/commit/b9d748f29e9d88cdaebd8818b8565b52b5b959a6)), closes [#47](https://github.com/wot-ui/wot-ui/issues/47)
* 🐛 修复 size 属性在 image 和 cssIcon 模式下的无效问题 ([#45](https://github.com/wot-ui/wot-ui/issues/45)) ([ddcc89e](https://github.com/wot-ui/wot-ui/commit/ddcc89e5d232320b2214d4f5db4febd64c899b2e))
* 🐛 修复 toast 不支持自定义 icon 颜色 ([#54](https://github.com/wot-ui/wot-ui/issues/54)) ([3718cf4](https://github.com/wot-ui/wot-ui/commit/3718cf42140fbeefc4551e8f0540b599a0007d4e))
* 🐛 修复 useVideoPreview 没有被导出的问题 ([#52](https://github.com/wot-ui/wot-ui/issues/52)) ([3617c07](https://github.com/wot-ui/wot-ui/commit/3617c078f55a4c13463308e429ed57c785d10580))
* 🐛 修复不传 type 时 size 样式被默认类型覆盖的问题 ([#44](https://github.com/wot-ui/wot-ui/issues/44)) ([f811e7f](https://github.com/wot-ui/wot-ui/commit/f811e7f6c9e0aa33f968e73030e115d41ef0e511))


### ✏️ Documentation | 文档

* ✏️  补全 form-item 文档 value-align 属性 ([#67](https://github.com/wot-ui/wot-ui/issues/67)) ([a7cf766](https://github.com/wot-ui/wot-ui/commit/a7cf7666b5cba5e0d347b15f4b8d5e6db3af5b0a))
* ✏️  更新所有文档中的链接，替换为新的域名 ([b6d2e4f](https://github.com/wot-ui/wot-ui/commit/b6d2e4f1799f2576fff9e7f4705a8c8efb292e4b))

### [2.0.8](https://github.com/wot-ui/wot-ui/compare/v2.0.7...v2.0.8) (2026-05-12)

### [2.0.7](https://github.com/wot-ui/wot-ui/compare/v2.0.6...v2.0.7) (2026-05-12)

### [2.0.6](https://github.com/wot-ui/wot-ui/compare/v2.0.5...v2.0.6) (2026-05-12)


### ✏️ Documentation | 文档

* ✏️  更新 Sass 版本要求，添加运行时警告处理说明 ([#35](https://github.com/wot-ui/wot-ui/issues/35)) ([268cd0e](https://github.com/wot-ui/wot-ui/commit/268cd0e744707ce29209ef38c4f260114dd92a33))
* ✏️  更新深色模式和主题变量引入说明，增加代码示例 ([20aeb4d](https://github.com/wot-ui/wot-ui/commit/20aeb4d71f6993f37f38893b8e26294e5cb58180))
* ✏️  新增 v1 迁移到 v2 的文档 ([4cafe19](https://github.com/wot-ui/wot-ui/commit/4cafe19ee3be75f9b08062ee74c6d5feffe7fa51))


### 🐛 Bug Fixes | Bug 修复

* 🐛 更新 Dialog 组件关闭逻辑，支持通过点击关闭按钮触发关闭操作并返回相应的 action ([#26](https://github.com/wot-ui/wot-ui/issues/26)) ([0aabf55](https://github.com/wot-ui/wot-ui/commit/0aabf55aa9c8c4e42cf761ea023e0d0117dc1a93))
* 🐛 简化 cellConfigs 计算逻辑，移除不必要的可见性判断，修复微信小程序编译异常的问题 ([5a64e53](https://github.com/wot-ui/wot-ui/commit/5a64e531e0d40857cd8bb2c637414840d2e8f525)), closes [#34](https://github.com/wot-ui/wot-ui/issues/34)
* 🐛 将 wd-tag 组件默认插槽内容的承载元素从 text 更改为 view ([#39](https://github.com/wot-ui/wot-ui/issues/39)) ([b72a2be](https://github.com/wot-ui/wot-ui/commit/b72a2bef01c60c8ba8ba14a6b838b660e9f52205)), closes [#25](https://github.com/wot-ui/wot-ui/issues/25)
* 🐛 修复 ConfigProvider 中 Input 组件变量丢失的问题 ([#37](https://github.com/wot-ui/wot-ui/issues/37)) ([66ddace](https://github.com/wot-ui/wot-ui/commit/66ddace1f5bfd69cd23a8cead460263e2d63ee94)), closes [#36](https://github.com/wot-ui/wot-ui/issues/36)
* 🐛 修复 Dialog 覆盖 Popup 样式权重较低导致被其他 Popup 覆盖的问题 ([#22](https://github.com/wot-ui/wot-ui/issues/22)) ([9f0fc52](https://github.com/wot-ui/wot-ui/commit/9f0fc52d8d0f9adf3812b08d8a34c45fd3ba6965)), closes [#21](https://github.com/wot-ui/wot-ui/issues/21)
* 🐛 修复 FormItem label 属性不生效 ([#38](https://github.com/wot-ui/wot-ui/issues/38)) ([fdbcf93](https://github.com/wot-ui/wot-ui/commit/fdbcf935357b9ccbe4e6390551f2eca0f82c1cad)), closes [#30](https://github.com/wot-ui/wot-ui/issues/30)
* 🐛 修复日期时间选择器在 ios26 微信小程序端区域选择切换时高度坍缩的问题 ([#41](https://github.com/wot-ui/wot-ui/issues/41)) ([e6de48d](https://github.com/wot-ui/wot-ui/commit/e6de48d76c68db7f4faddda0477e2fe0a060c9f5))

### [2.0.5](https://github.com/wot-ui/wot-ui/compare/v2.0.4...v2.0.5) (2026-04-27)


### ✏️ Documentation | 文档

* ✏️  更新深色模式和主题变量引入说明，增加代码示例 ([#19](https://github.com/wot-ui/wot-ui/issues/19)) ([abb7a1b](https://github.com/wot-ui/wot-ui/commit/abb7a1bfdbaab7e2b16b6cde5fd529d043461996))

### [2.0.4](https://github.com/wot-ui/wot-ui/compare/v2.0.3...v2.0.4) (2026-04-24)

### [2.0.3](https://github.com/wot-ui/wot-ui/compare/v2.0.2...v2.0.3) (2026-04-23)


### ✨ Features | 新功能

* ✨ checkbox 支持独立使用 ([#7](https://github.com/wot-ui/wot-ui/issues/7)) ([4b04820](https://github.com/wot-ui/wot-ui/commit/4b04820853f19459a88f69ce6e19d9a756b0cf8e))

### [2.0.2](https://github.com/wot-ui/wot-ui/compare/v2.0.1...v2.0.2) (2026-04-22)


### 🐛 Bug Fixes | Bug 修复

* 🐛 移除按钮组件的 flex-shrink 属性 ([a6d6068](https://github.com/wot-ui/wot-ui/commit/a6d6068402fb39778e68d0280e45d7894daca386))

### [2.0.1](https://github.com/wot-ui/wot-ui/compare/v2.0.0...v2.0.1) (2026-04-22)


### ✏️ Documentation | 文档

* ✏️  完善 form 组件文档示例 ([53df04a](https://github.com/wot-ui/wot-ui/commit/53df04a63076506b9de3896fcf04f5178f99c893))
* ✏️  修正 v1 链接至正确的子域名 ([558cd94](https://github.com/wot-ui/wot-ui/commit/558cd9414829b694a6c605087d57805cccef769e))
* ✏️  update miniprogram qrcode ([091fc30](https://github.com/wot-ui/wot-ui/commit/091fc308a2981ba9c4b7bdb295889544ef908c1f))
* ✏️ 更新表单组件示例 ([b439d8a](https://github.com/wot-ui/wot-ui/commit/b439d8af0a7560ba54a7fbc77700f71b9b859267))
* ✏️ 更新脚手架命令，使用 wot-starter-v2 模板 ([d7d846a](https://github.com/wot-ui/wot-ui/commit/d7d846a81a869fbb70d570eb2df33dc69b5e441b))
* ✏️ 更新文档和生态系统链接，移除无用内容 ([60a0cc8](https://github.com/wot-ui/wot-ui/commit/60a0cc81c293c096bcf727db5e867cdb269006e7))


### ✨ Features | 新功能

* ✨ 调整 button 组件高度由 padding 撑开转为固定高度 ([#4](https://github.com/wot-ui/wot-ui/issues/4)) ([b26b134](https://github.com/wot-ui/wot-ui/commit/b26b134471d78bb4ff09ba34f86852193ebc902d))

## [2.0.0](https://github.com/wot-ui/wot-ui/compare/v2.0.0-alpha.21...v2.0.0) (2026-04-21)


### ✏️ Documentation | 文档

* ✏️  更新 banner 背景样式和按钮过渡效果，增强视觉效果 ([0dedfc1](https://github.com/wot-ui/wot-ui/commit/0dedfc16966c5946a0ad464b22ef5c95ae44a147))


### ✨ Features | 新功能

* ✨ wot-ui v2 发布 ([2e96ba1](https://github.com/wot-ui/wot-ui/commit/2e96ba168360672521df51aa120ce03a1cf31ca0))
