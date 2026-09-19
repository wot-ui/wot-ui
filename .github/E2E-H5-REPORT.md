# H5 E2E 本地执行报告

日期：2026-09-18。H5 Playwright 接入和已发现问题的本地修复回归已完成：**100 个组件、94 条路由、367 个独立场景**。修复后完整矩阵连续三轮共 **3693 次执行：3660 通过、33 明确跳过、0 已知缺陷、0 非预期失败、0 重试**。

这是本计划核心场景的本地验收结果，不代表穷举全部 API 或覆盖真实设备。远程 GitHub Actions 与 Linux 视觉基线仍待验证。

## 最终浏览器矩阵

| 配置                      | 每轮场景 | 正常通过（3 轮） | 跳过 | 失败 |
| ------------------------- | -------: | ---------------: | ---: | ---: |
| Chromium mobile / Pixel 7 |      367 |             1101 |    0 |    0 |
| WebKit mobile / iPhone 13 |      367 |             1083 |   18 |    0 |
| Chromium desktop          |      367 |             1098 |    3 |    0 |
| Firefox desktop           |      130 |              378 |   12 |    0 |
| 合计                      |     1231 |             3660 |   33 |    0 |

运行耗时 16.8 分钟，4 workers，`retries: 0`。三种完整配置各运行 367 个场景；Firefox 运行 130 个冒烟和关键流程场景。6 张已审阅 macOS 基线共完成 18 次视觉比较。

33 次跳过均有明确能力边界：移动 WebKit 不支持 `mouse.wheel`；WebKit/Firefox 没有 Chromium CDP 连续触摸接口；纯 Chromium mobile 的连续触摸场景不在其他配置重复。没有用 skip 隐藏普通功能失败。

环境：macOS 15.7.1（24G231）、Node 22.17.1、pnpm 9.2.0、Playwright 1.63.0；Chromium 153.0.8010.12 / revision 1243、WebKit 26.6 / revision 2359、Firefox 155.0 / revision 1543。

证据位于 `test-results/verification/post-fix-final/`：`results.json`、`summary.json`、`run.log`、`environment.json`、`artifacts/` 和 `playwright-report/`。逐场景执行次数与结果见 [覆盖矩阵](../tests/e2e/coverage-matrix.json)。生成目录由 Git 忽略，当前 HTML 报告可用 `pnpm test:e2e:h5:report` 查看。

## 修复结果

- Dialog Demo 显式处理取消 Promise；Popover Demo 修正动态宽度的国际化位置插值。
- Segmented 为可选振动增加失败回调，不支持振动时继续切换。
- `wd-picker-view` 仍使用 uni-app `picker-view`，仅在包装节点排除应用的 touch-emulator，避免一次鼠标操作被重复处理。
- 锁定版本的 uni-h5 补丁修复外部清空与延迟 input 竞态、失焦前输入提交、精确整行拖动漏更新和拖动后重复 click。补丁只作用于本仓库普通 H5 浏览器入口，不会自动传播到下游应用，详见 [补丁维护说明](../patches/README.md)。
- Sticky 初期 3 ～ 4px 差值属于外壳行盒空白，已改测实际可见按钮。后续发现独立的真实竞态 H5-008：内容观察回调覆盖容器底边约束，现已保留容器优先定位，并验证上滚恢复吸顶、回顶恢复普通状态。
- SwipeAction 在 WebKit 鼠标拖动结束后会收到浏览器附带 click，刚展开即关闭。H5-009 现以 20px 位移阈值识别拖动并忽略该次附带点击，下一次正常点击仍可操作。

H5-008 修复前新增单测稳定失败；修复后两种观察回调顺序均通过，H5/MP-WEIXIN 的 Sticky 23 条单测各自通过，三种浏览器配置各十轮共 90 次专项 E2E 通过。H5-009 的两条新增单测在修复前稳定失败，修复后 H5/MP-WEIXIN 的 SwipeAction 21 条单测各自通过，三种浏览器配置各 20 轮共 180 次专项 E2E 通过。详细归因见 [问题记录](./E2E-H5-KNOWN-ISSUES.md)。

## 核心覆盖

| 范围         | 已执行内容                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| 冒烟         | 94 条注册路由独立加载；首页进入组件、深链刷新和返回；目录/路由清单差异守卫                                           |
| 弹层反馈     | Popup、Overlay、Dialog、ActionSheet、Toast、Notify、Popover、Tooltip、Curtain、RootPortal、Transition、Tour          |
| 表单输入     | Input、Textarea、Switch、Checkbox、Radio、InputNumber、Rate、Search、Form、Keyboard、PasswordInput；5 个 Form 子页面 |
| 选择器与导航 | 选择、确认/取消、禁选、联动、日期范围；Tabs、Sidebar、Tabbar、Segmented、Collapse、Pagination 等                     |
| 滚动手势     | 实际吸顶/回顶位置、滑块边界、滑动操作、轮播、索引定位、面板与尺寸变化                                                |
| 文件媒体     | 文件选择、上传成功/失败/删除后重选、图片解码和错误态、预览、裁剪、签名、二维码独立解码、水印和视频就绪               |
| 展示主题     | 计时控制、文本格式化、布局比例、状态切换、表格排序/合并单元格/一万行虚拟滚动                                         |
| 集成         | Provider 配置穿透 RootPortal、暗色表单选择器、语言刷新持久化、Chromium 连续触摸及桌面鼠标流程                        |
| 视觉         | 6 张 macOS 基线：按钮尺寸控件的明暗主题、手机/桌面布局；每张比较 3 次                                                |

100 个组件均有核心场景映射；组合子组件通过父级流程中的子项内容、状态或布局断言验证。矩阵状态保持 `partial-functional`，不把“存在用例”解释为全部 API 覆盖。

## 其他验证

- H5 构建、源码 lint、E2E lint/type-check、工作流格式和 diff 检查通过。
- 修复后完整 Vitest：**109 个文件、1830 条通过**，见 `post-fix-final/unit.log`。
- 独立空目录执行 `pnpm install --frozen-lockfile --ignore-scripts` 成功，锁文件未变，安装后的 uni-h5 浏览器入口 SHA256 与被测工作区一致。该检查跳过 only-allow/Husky 生命周期脚本；证据在 `post-fix-full/clean-install.log` 和 `clean-install-runtime.txt`。
- 全项目 `pnpm type-check` 仍报既有 `@vitejs/plugin-vue@6.0.5/dist/index.d.mts:120` 的 TS1003/TS1005/TS1128：当前 TypeScript 5.5.4 无法解析该声明语法。本轮没有升级无关依赖；E2E 独立类型检查通过。

## 稳定性证据

- 初始 346 场景三轮：3393 正常通过、33 预期失败、24 跳过、0 非预期失败，见 `verification/full-final/`。这些预期失败随后均已处理。
- H5-001 ～ H5-007 修复专项：136 通过、6 跳过、0 失败，见 `verification/remaining-fixes/final/`。
- 首次修复后全量发现 1 次 Sticky 真实越界，见 `verification/post-fix-full/`；专项证据在其 `sticky-race/` 下。
- Sticky 修复后的全量出现 1 次 Search 测试焦点竞争。Trace 证明输入被页面另一个延迟自动聚焦示例接收，并非旧值回填；等待页面自动聚焦就绪后三配置各 20 轮、240 次专项通过，见 `verification/post-sticky-full/` 和 `verification/search-focus/`。
- Search 修正后的运行发现 SwipeAction 独立问题，运行随即中断并保留在 `verification/post-search-interrupted/`。修复前后单测、事件日志及 180 次浏览器专项证据在 `verification/swipe-review/`。最终完整结果为本报告顶部统计。

## CI 与剩余边界

功能工作流已配置 Chromium 手机/桌面、WebKit mobile、Firefox desktop 四个任务。PR 另生成 Linux 视觉候选图，手动入口可启用 `generate_visual_candidates`；候选图必须逐张审阅，并在相同容器中不带 `--update-snapshots` 比较后才能接受。

本机尝试官方 Playwright 1.63.0 Linux x64 容器时，ARM 主机的 QEMU 在 Chromium 启动阶段因 `rcu_read_unlock` 断言崩溃，尚未打开页面。没有生成或接受 Linux 基线，诊断在 `verification/linux-diagnostic/`；需原生 x64 Linux runner 完成后续验证。远程 Actions 未触发、分支保护未配置，代码未提交或推送。

连续触摸通过 Chromium CDP；其余部分拖动使用鼠标和现有触摸模拟器，不能据此声称真实 iOS/Android 手势通过。中文组合输入验证合成事件契约，未验证真机输入法。小程序/App、SSR、文档站、真实设备和真实第三方服务不属于本次 H5 E2E 范围。

## 复现命令

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium webkit firefox
pnpm build:h5
pnpm exec cross-env E2E_SERVER=preview E2E_VISUAL=1 playwright test --repeat-each=3 --workers=4
node tests/e2e/scripts/summarize-results.mjs test-results/e2e-results.json
```

日常入口为 `pnpm test:e2e:h5`。详见 [使用说明](../tests/e2e/README.md) 和 [执行计划](./E2E-H5-PLAN.md)。
