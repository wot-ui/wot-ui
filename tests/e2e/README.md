# H5 E2E

使用 Playwright 运行真实 uni-app H5 Demo。单元测试继续使用 Vitest；两者有独立扫描范围和 TypeScript 配置。

## 安装和运行

CI 使用 Node 22、pnpm 9.2.0。Playwright 版本由锁文件固定。

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

页面创建使用独立的 60 秒 fixture 超时，避免 Linux WebKit 首次建页耗尽业务测试预算。业务用例仍为 30 秒，操作和断言默认仍为 8 秒；页面导航计入业务预算，不开启自动重试。

Linux 首次运行需要 `pnpm exec playwright install --with-deps chromium`。浏览器下载在安装依赖后单独执行。

## 覆盖与维护

- `smoke/` 验证首页导航与全部注册路由；`components/` 验证组件核心行为；`flows/` 验证跨组件、输入时序和手势流程。
- `fixtures/routes.json` 登记路由与页面就绪元素；`fixtures/components.json` 登记组件与 Demo 映射。新增或删除组件/页面时同步更新，冒烟测试会检查遗漏。
- 组合子组件由父组件测试中的子项内容、状态或布局断言覆盖，对应关系在矩阵生成脚本的 `combinedFiles` 中维护。
- `coverage-matrix.json` 保存场景 ID 和执行证据；`partial-functional` 表示已有核心场景，不代表穷举全部 API。一次性执行结果放入 PR 描述或 CI 报告。

先归档实际运行报告，再生成矩阵；后面的报告覆盖同场景、同浏览器较早的结果。仅执行 `--list` 不验证行为。

```sh
pnpm exec cross-env E2E_VISUAL=1 playwright test --list --reporter=json > /tmp/wot-e2e-list.json
node tests/e2e/scripts/update-coverage-matrix.mjs /tmp/wot-e2e-list.json test-results/e2e-results.json
```

## 编写约定

1. 从 `fixtures/test.ts` 导入 `test` 和 `expect`，自动收集运行异常与失败请求。
2. 先阅读组件源码及 H5 分支，再使用现有 Demo 的真实行为。优先角色、文本和区域定位；uni H5 元素缺少语义角色时使用有范围的稳定类名。
3. `helpers/demo.ts` 通过中文语言包获取展示文案，`demoItem` 以精确小节标题限定查找范围。新 context 保持默认中文、浅色；不复用用户本地 storage。
4. 对输入、弹层、滚动等断言实际结果，使用 Playwright 自动等待。不要 `force: true` 绕过遮挡，不用固定 sleep 避开动画问题。
5. `fixtures/routes.json` 是注册路由与页面特定就绪元素的清单；新增或删除路由必须同步，冒烟测试会检查遗漏和重复。
6. 每个用例独立 browser context；默认零重试。失败要区分产品问题、测试问题和运行环境问题。
7. Input/Form/Search/Textarea 先安装 Playwright Clock，再用 `fillUniField` 推进 uni-h5 100ms 输入节流；IndexBar 需要推进挂载后的 100ms 测量。日期滚轮使用连续 Clock，避免固定 Date.now 让物理动画无法结束。
8. `dragBy` 使用真实鼠标及项目已有触摸模拟器，相关文件显式设置 `hasTouch: false`；滚轮在 WebKit 需要桌面模式。`wd-picker-view` 局部排除模拟器，由 uni-h5 原生处理鼠标/触摸；`picker-mouse` 验证无触摸配置，`picker-touch` 验证 tap 和 Chromium CDP 连续触摸。坐标输入前等待弹层位置稳定，拖动后等待吸附动画结束再点击。不要把浏览器模拟的通过报告成真机验证。

## H5 运行时与已知限制

使用官方原版 uni-h5，不维护依赖补丁。当前 `3.0.0-4080720251210001` 的以下问题已在原版运行时复现，保留原有正确行为断言，并仅在该版本标记预期失败：

| 场景                            | 已知行为                           | 回归文件                     |
| ------------------------------- | ---------------------------------- | ---------------------------- |
| Input/Textarea 节流期间清空     | 旧输入尾部事件会回填               | `flows/input-timing.spec.ts` |
| 输入后立即提交                  | 失焦未刷新待处理输入，提交读取旧值 | `flows/input-timing.spec.ts` |
| 鼠标拖动日期滚轮恰好 ±2 行      | 选中值未同步，附带点击可能再次选中 | `flows/picker-mouse.spec.ts` |
| Chromium 连续触摸拖动恰好 ±2 行 | 未触发整行吸附更新，分钟仍为旧值   | `flows/picker-touch.spec.ts` |

`helpers/uni-h5.ts` 读取实际安装版本，升级后自动停止预期失败豁免；同版本若意外通过，Playwright 也会报错，提醒移除过时标记。仅在对应行为断言前设置预期失败，页面加载和操作准备阶段的错误仍按普通失败处理。相邻行点击、滚轮、非整行拖动和其他输入场景继续要求正常通过，不跳过整个组件。

升级 DCloud 后运行完整 E2E，并重点检查上述三个文件。新版本仍失败时，先复现和归因，再决定是否更新版本限定，不能自动沿用旧豁免。预期失败计入已知缺陷，不算功能通过；原版运行时中的问题仍会影响实际 H5 使用。

## 外部依赖与报告

`fixtures/network.ts` 固定已知外部图片、视频和图标字体；图片错误态使用特定无效图片响应，视频使用本地生成的无声 H.264 素材并支持 Range。素材来源见 [素材说明](./fixtures/assets/README.md)。应用 JS/CSS 和组件实现保持真实；未声明的外部请求被阻断并使测试失败，后续上传用例必须显式提供接口响应。

未预期的 `pageerror`、`console.error` 会使测试失败。请求失败写入诊断附件，便于区分页面导航取消和实际资源故障；冒烟还必须满足内容就绪断言。错误态测试如果需要允许预期错误，应精确限定该场景和错误来源，不能增加全局宽泛忽略。

- HTML 报告：`playwright-report/index.html`。
- JSON 结果：`test-results/e2e-results.json`。
- 截图、Trace 与诊断：`test-results/e2e/`。
- 报告被下一次运行更新，阶段验收前应另存证据；以上生成目录不提交。
- CI 工作流为 `.github/workflows/e2e-h5.yml`，在 main 的 PR/push 和手动触发时执行，失败也上传报告。
- 功能 CI 包含 Chromium mobile、WebKit mobile、Chromium desktop 和 Firefox desktop。PR 另外生成 Linux 视觉候选图供审阅，手动触发时也可启用 `generate_visual_candidates`；这些图片不会被自动提交或接受，候选任务通过不等于视觉对比通过。

## 浏览器矩阵与视觉回归

- Chromium mobile（Pixel 7）和 WebKit mobile（iPhone 13）：全部核心功能与路由。
- Chromium desktop：全部核心功能及纯鼠标滚轮回归。四个 Picker 文件使用项目默认输入配置；`picker-mouse` 显式 hasTouch=false/isMobile=false，`picker-touch` 显式 hasTouch=true。
- Firefox desktop：全部登记路由、首页流程、Button/Input/Popup 及跨组件关键流程；不是全部组件功能矩阵。
- 连续触摸使用 Chromium CDP 的 Input.dispatchTouchEvent，没有在 DOM 内派发伪造事件。其他引擎没有对应 Playwright API，因此显式排除该用例；真机手势不由这一结果保证。

视觉集默认关闭，避免 macOS 和 Linux 基线混用。当前已审阅 6 张 macOS 基线，截取配置页 Button.size 控件，覆盖浅/暗主题、手机/桌面布局。Linux 候选图由 CI 生成并上传；逐张审阅并在同环境重复比较后才能入库，生成成功不等于视觉回归通过。功能 CI 不运行视觉集。

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

汇总脚本将正常通过、已知缺陷、跳过、非预期结果和 flaky 分开；缺陷修复后的意外通过也使检查失败。每次运行结果以 CI 报告为准；分支保护需在仓库设置中单独配置。
