# H5 E2E

使用 Playwright 运行真实 uni-app H5 Demo。单元测试继续使用 Vitest；两者有独立扫描范围和 TypeScript 配置。

## 安装和运行

本次在 Node 22.17.1、pnpm 9.2.0、Playwright 1.63.0 上验证。Playwright 包的 Node engine 要求为 >=20；官方当前建议使用 Node 22 及以上，新增 CI 使用 Node 22，不修改项目原有 `.nvmrc`。

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium

# 自动启动本地 H5 开发服务，运行 Chromium 手机视口测试
pnpm test:e2e:h5

# 先构建 H5，再测试实际构建产物（CI 使用此入口）
pnpm test:e2e:h5:preview

# 只运行一个组件；或关闭重试重复验证
pnpm test:e2e:h5 wd-popup
pnpm test:e2e:h5 --repeat-each=3

# 可视化调试和查看 HTML 报告
pnpm test:e2e:h5:ui
pnpm test:e2e:h5:headed
pnpm test:e2e:h5:report

# 测试代码的静态检查
pnpm lint:e2e
pnpm type-check:e2e

# 补充浏览器（设备模拟不等于真机）
pnpm exec playwright install webkit firefox
pnpm test:e2e:h5:all
pnpm exec playwright test --project=webkit-mobile

# 已有最新构建产物时，直接指定浏览器运行预览，省去重复构建
pnpm exec cross-env E2E_SERVER=preview playwright test --project=chromium-desktop
```

使用独占的 `127.0.0.1:4173`，禁止自动换端口和复用未知服务。端口占用时请关闭自己启动的同端口服务后重跑。测试退出后由 Playwright 管理服务关闭。

Linux 首次运行需要 `pnpm exec playwright install --with-deps chromium`。浏览器下载在安装依赖后单独执行。

## 当前覆盖

- `smoke/home.spec.ts`：从首页分类进入 Button、刷新深链、返回首页。
- `smoke/routes.spec.ts`：清单中的每条路由独立验证 URL、该页面内容可见及非零布局尺寸；不把冒烟通过当成功能全覆盖。
- `components/wd-button.spec.ts`：类型文案、尺寸和块级布局。Demo 未绑定点击结果，因此这里不声称已验证禁用按钮不触发业务事件。
- `components/wd-input.spec.ts`：编辑、禁用/只读、清空、密码显隐、字数边界。
- `components/wd-popup.spec.ts`：遮罩关闭、再次打开、关闭按钮、禁止遮罩关闭、无模态模式。

完整阶段和组件清单见 [执行计划](../../.github/E2E-H5-PLAN.md)。目前 101 个组件、95 条路由和 371 个独立场景已登记；其中前 367 个场景的最新完整三轮为 3660 通过、33 明确跳过、0 失败、0 重试，新合入的 BarCode 与清单守卫完成四配置增量 14 次通过。组合子组件通过父组件流程中的内容、状态或布局断言验证。

M3 ～ M9 的核心场景已加入 `components/`；`flows/` 验证配置穿透、暗色表单、语言持久化及两种输入路径。最新实际结果见 [阶段报告](../../.github/E2E-H5-REPORT.md)，历史缺陷单独记录，不计入初始矩阵的正常通过。历史 `@known-defect` 场景在修复后必须移除标记；当前修复相关场景已按正常通过处理。

覆盖矩阵维护（先归档实际报告，再生成；后面的报告覆盖同场景同浏览器较早的结果）：

```sh
pnpm exec cross-env E2E_VISUAL=1 playwright test --list --reporter=json > /tmp/wot-e2e-list.json
node tests/e2e/scripts/update-coverage-matrix.mjs /tmp/wot-e2e-list.json test-results/e2e-results.json
```

`coverage-matrix.json` 登记 101 个组件、场景 ID 和实际执行证据。`partial-functional` 只表示已有功能场景，绝不等于完整覆盖。组件目录及路由在测试执行时检查遗漏；该守卫位于用例内，允许 `--list` 先收集新增场景并重建矩阵。

## 编写约定

1. 从 `fixtures/test.ts` 导入 `test` 和 `expect`，自动收集运行异常与失败请求。
2. 先阅读组件源码及 H5 分支，再使用现有 Demo 的真实行为。优先角色、文本和区域定位；uni H5 元素缺少语义角色时使用有范围的稳定类名。
3. `helpers/demo.ts` 通过中文语言包获取展示文案，`demoItem` 以精确小节标题限定查找范围。新 context 保持默认中文、浅色；不复用用户本地 storage。
4. 对输入、弹层、滚动等断言实际结果，使用 Playwright 自动等待。不要 `force: true` 绕过遮挡，不用固定 sleep 避开动画问题。
5. `fixtures/routes.json` 是注册路由与页面特定就绪元素的清单；新增或删除路由必须同步，测试收集时会检查遗漏和重复。
6. 每个用例独立 browser context；默认零重试。失败要区分产品问题、测试问题和运行环境问题。
7. Input/Form/Search/Textarea 先安装 Playwright Clock，再用 `fillUniField` 推进 uni-h5 100ms 输入节流；IndexBar 需要推进挂载后的 100ms 测量。日期滚轮使用连续 Clock，避免固定 Date.now 让物理动画无法结束。
8. `dragBy` 使用真实鼠标及项目已有触摸模拟器，相关文件显式设置 `hasTouch: false`；滚轮在 WebKit 需要桌面模式。`wd-picker-view` 局部排除模拟器，由 uni-h5 原生处理鼠标/触摸；`picker-mouse` 验证无触摸配置，`picker-touch` 验证 tap 和 Chromium CDP 连续触摸。坐标输入前等待弹层位置稳定，拖动后等待吸附动画结束再点击。不要把浏览器模拟的通过报告成真机验证。

## 已知问题修复与 H5 依赖补丁

2026-09-18 已修复 Dialog/Popover Demo、Segmented 振动失败，纠正 Sticky 外壳误判，修复快速滚动时观察回调顺序导致的真实越界和 SwipeAction 拖动附带点击，并通过 pnpm 补丁修复当前 uni-h5 的输入节流竞态和滚轮整行吸附。旧 `@known-defect` 标记已移除，回归现在要求正常通过。历史报告里的预期失败是修复前结果。

请保留 `patches/`、`package.json` 中的 patchedDependencies 和锁文件一起提交；CI 已将补丁纳入路径触发条件。适用范围、下游应用限制及升级移除步骤见 [补丁说明](../../patches/README.md)。连续触摸仅 CDP、组合输入通过合成事件验证，不替代真机验证。

## 外部依赖与报告

`fixtures/network.ts` 固定已知外部图片、视频和图标字体；图片错误态使用特定无效图片响应，视频使用本地生成的无声 H.264 素材并支持 Range。素材来源见 [素材说明](./fixtures/assets/README.md)。应用 JS/CSS 和组件实现保持真实；未声明的外部请求被阻断并使测试失败，后续上传用例必须显式提供接口响应。

未预期的 `pageerror`、`console.error` 会使测试失败。请求失败写入诊断附件，便于区分页面导航取消和实际资源故障；冒烟还必须满足内容就绪断言。错误态测试如果需要允许预期错误，应精确限定该场景和错误来源，不能增加全局宽泛忽略。

- HTML 报告：`playwright-report/index.html`。
- JSON 结果：`test-results/e2e-results.json`。
- 截图、Trace 与诊断：`test-results/e2e/`。
- 报告被下一次运行更新，阶段验收前应另存证据；以上生成目录不提交。
- CI 工作流为 `.github/workflows/e2e-h5.yml`，在 main 的 PR/push 和手动触发时执行，失败也上传报告。
- 功能 CI 包含 Chromium mobile、WebKit mobile、Chromium desktop 和 Firefox desktop。PR 另外生成 Linux 视觉候选图供审阅，手动触发时也可启用 `generate_visual_candidates`；这些图片不会被自动提交或接受，候选任务通过不等于视觉对比通过。

## 现有基线

接入前 H5 构建通过，当前最终 Vitest 为 109 个文件、1830 条用例通过。全项目 `pnpm type-check` 在既有依赖 `@vitejs/plugin-vue@6.0.5/dist/index.d.mts:120` 出现 TS1003/TS1005/TS1128（当前 TypeScript 5.5.4 无法解析该声明语法）。该问题在新增 E2E 前已存在，未通过升级其他依赖扩大本次改动；E2E 使用独立类型检查。

## 浏览器矩阵与视觉回归

- Chromium mobile（Pixel 7）和 WebKit mobile（iPhone 13）：全部核心功能与路由。
- Chromium desktop：全部核心功能及纯鼠标滚轮回归。四个 Picker 文件使用项目默认输入配置；`picker-mouse` 显式 hasTouch=false/isMobile=false，`picker-touch` 显式 hasTouch=true。
- Firefox desktop：95 路由、首页流程、Button/Input/Popup 及跨组件关键流程；不是全部组件功能矩阵。
- 连续触摸使用 Chromium CDP 的 Input.dispatchTouchEvent，没有在 DOM 内派发伪造事件。其他引擎没有对应 Playwright API，因此显式排除该用例；真机手势不由这一结果保证。

视觉集默认关闭，避免 macOS 和 Linux 基线混用。当前已审阅 6 张 macOS 基线，截取配置页 Button.size 控件，覆盖浅/暗主题、手机/桌面布局。Linux 基线尚未生成，功能 CI 不运行视觉集。

```sh
# 自动启动开发服务，比较已有基线
pnpm test:e2e:h5:visual

# 更新基线后必须逐张查看，不以生成成功代替视觉审阅
pnpm test:e2e:h5:visual --update-snapshots

# 最新 H5 构建产物的完整矩阵，包括本机视觉基线
pnpm build:h5
pnpm exec cross-env E2E_SERVER=preview E2E_VISUAL=1 playwright test --repeat-each=3
node tests/e2e/scripts/summarize-results.mjs test-results/e2e-results.json
```

汇总脚本将正常通过、已知缺陷、跳过、非预期结果和 flaky 分开；缺陷修复后的意外通过也使检查失败。CI 配置已包含 Chromium 手机/桌面、WebKit 功能回归和 Firefox 关键矩阵，但远程执行与分支保护需要实际证据，不能从配置文件推断成功。
