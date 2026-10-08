# 固定测试素材

- `sample.mp4`：本项目为 E2E 生成的两秒无声渐变视频，160×90，H.264 Baseline，15fps。没有第三方视频内容，约 5KB。三个远程 Demo 视频地址在测试中映射到此文件，支持 WebKit 的 HTTP Range 探测。
- `generate-video.swift`：该视频的生成源码，使用 macOS 自带 AVFoundation；正常运行测试和 CI 无需 Swift。重新生成：`swift tests/e2e/fixtures/assets/generate-video.swift tests/e2e/fixtures/assets/sample.mp4`。
- `fish.woff2`：缓存项目 `src/iconfont/index.css` 已引用的同一份自定义图标字体。来源为 `https://at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff2?t=1721314121733`；测试使用原始字节，不替换图标含义。
- `wd-icons.woff`：缓存 `src/uni_modules/wot-ui/components/wd-icon/iconfont.scss` 引用的原始 Wot 图标字体，供 WebKit 的字体回退使用。来源为 `https://at.alicdn.com/t/c/font_5024693_esasb18zrbp.woff?t=1773909649753`。
- `shadow-grey.png`：uni-app H5 导航栏原始阴影图片，来源为 `https://cdn.dcloud.net.cn/img/shadow-grey.png`。
- 外部展示图片复用 `src/subPages/img/black_mao.png`。功能用例不依赖远程图片内容；未来需要特定图像内容或视觉基线时，应为对应场景单独指定素材。

这些 fixture 仅由 Playwright 请求拦截读取，不加入 H5 应用构建。未提供 fixture 的外部请求会被阻断并使测试失败；新增媒体或接口场景需要显式提供响应。
