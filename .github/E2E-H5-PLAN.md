# H5 Playwright E2E 执行计划

更新时间：2026-09-18。本计划 H5 核心场景的本地验收已完成：100 个组件、94 条路由、367 个独立场景；修复后完整矩阵连续三轮共 3693 次执行，3660 通过、33 明确跳过、0 已知缺陷、0 非预期失败、0 重试。H5-001 ～ H5-009 已完成归因、修复或测试纠正。远程 CI 与 Linux 视觉基线仍待验证，真实设备不属于本计划范围。

## 1. 目标与完成口径

为 Wot UI 的 H5 应用建立可持续运行的 Playwright E2E 测试。按里程碑顺序推进，每批完成源码核对、用例实现、实际运行、失败归因和清单更新，再进入下一批。

“全部测试完成”指本计划中的 H5 范围和场景全部有验证结果，不代表穷举所有 props 组合或覆盖所有真实移动设备。

- 100 个组件目录全部进入覆盖矩阵；组合子组件在父组件流程中验收，但必须有自己的断言。
- 94 条当前注册页面路由全部登记：2 个主页面、83 个 Demo 入口、9 个额外子页面。H5 编译后可访问的页面全部有独立冒烟用例；条件编译排除项需记录源码依据。
- 82 个组件 Demo 覆盖适用的核心功能；`wxRewardAd` 仅检查 H5 页面可访问和返回，真实激励广告不属于本次范围。
- 每个组件至少验证有效可见内容、主要用途；交互组件增加正常操作、适用的禁用/只读/取消/失败和边界场景。纯展示组件验证内容和布局，不强行制造交互。
- 每个重要场景记录：场景 ID、组件/路由、前置条件、用户操作、预期可见结果、浏览器、用例路径、状态和证据。
- Vitest 继续负责细粒度 API、事件参数和分支；不将已有单元测试逐条搬成 E2E，不以单元覆盖率替代 E2E 完成度。
- 本次不扩展小程序、原生 App、SSR、VitePress 文档站和真实第三方广告/上传服务的测试。

## 2. 已确认的项目基础

| 项目         | 当前事实                                  | 接入影响                                                            |
| ------------ | ----------------------------------------- | ------------------------------------------------------------------- |
| H5 启动/构建 | `pnpm dev:h5` / `pnpm build:h5`           | 本地开发服务调试，CI 验证 H5 构建产物                               |
| Vitest       | jsdom，扫描 `tests/**/*.test.ts`          | E2E 使用 `tests/e2e/**/*.spec.ts`，显式限定两个 runner 的范围       |
| 现有组件测试 | 109 个文件、1830 条测试通过               | 已完成接入前后 Vitest 回归                                          |
| 组件与页面   | 100 个组件、82 个组件 Demo                | 子组件按组合流程覆盖，完整映射见文末                                |
| 路由         | `src/pages.json` 共 94 条                 | 建立路由清单，核实 H5 条件编译和实际 URL                            |
| 版本         | `.nvmrc` 为 20.19.1；pnpm 为 9.2.0        | 接入时核实选定 Playwright 对 Node 的要求并锁定版本                  |
| lint         | 当前脚本只检查 `src`                      | 给 E2E、配置和辅助脚本增加显式 lint 与独立类型检查                  |
| H5 触摸      | `src/main.ts` 引入 `@vant/touch-emulator` | 首批验证鼠标与触摸事件路径，不能将 click 通过当作滑动通过           |
| 外部资源     | 上传、图片和视频 Demo 使用远程地址        | 固定本地素材并按目标 URL 拦截外部接口，保留真实组件和 uni H5 运行时 |

## 3. 执行顺序与每步验收

| 步骤 | 内容                                                                                                                                                                                           | 交付与验收                                                                                                   | 状态                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| M0   | 盘点组件、Demo、路由、测试框架和 CI，建立全量矩阵                                                                                                                                              | 100 个组件与 94 条路由无遗漏；本计划保存入库                                                                 | 已完成                                                                   |
| M1   | 安装与锁定 Playwright，建立配置、命令、fixtures、报告、类型检查和 lint                                                                                                                         | Chromium 打开真实 H5 首页；本地开发服务与构建产物均跑通；收集原有构建/单测/类型检查基线                      | 已完成；全项目类型检查存在已记录基线失败                                 |
| M2   | 全路由冒烟 + Button / Popup / Input 约 10 ～ 15 条示范用例；接入基础 CI                                                                                                                        | 页面独立加载、有组件特定就绪断言、无未预期运行异常；导航进出及直接访问验证；示范流程关闭重试连续通过 3 次    | 本地完成；远程 CI 待验证                                                 |
| M3   | 弹层与反馈：Popup、Overlay、Dialog、Toast、Notify、ActionSheet、Curtain、Popover、Tooltip、RootPortal、Transition、Tour                                                                        | 开关、取消、遮罩、异步关闭、嵌套层级、可点击性、滚动锁与恢复；以各组件源码支持为准                           | 本地核心集修复后完整三轮通过                                             |
| M4   | 基础输入与表单：Button、Input、Textarea、InputNumber、Switch、Checkbox、Radio、Rate、Search、Form、Keyboard、PasswordInput                                                                     | 值变化、禁用/只读、清空、边界、校验、提交和重置；覆盖 5 个 Form 子页面                                       | 本地核心集及 H5-003 输入竞态回归完整三轮通过                             |
| M5   | 选择器：Picker、PickerView、SelectPicker、Cascader、DatetimePicker、DatetimePickerView、Calendar、CalendarView                                                                                 | 选择/确认/取消、联动、禁选项、日期边界、适用的多选/范围选择和回显                                            | 核心集和鼠标/触摸专项完整三轮通过，含 H5-006/H5-007                      |
| M6   | 导航与结构：Navbar、Tabbar、Tabs、Segmented、Sidebar、Pagination、DropMenu、Collapse、Steps、SortButton                                                                                        | 切换后内容与状态一致、禁用项、返回、排序、展开收起；覆盖 3 个 Sidebar 子页面                                 | 本地核心集修复后完整三轮通过，含振动失败降级                             |
| M7   | 滚动与手势：Sticky、Backtop、IndexBar、Slider、SwipeAction、Swiper、FloatingPanel、Fab、Resize、SlideVerify                                                                                    | 实际位置、滚动边界、拖动结果、滑动打开/关闭、容器变化；验证适用的鼠标和触摸流程                              | 本地核心集完整三轮通过；H5-008/H5-009 均有专项 E2E 与修复前后单测        |
| M8   | 文件与媒体：Upload、Img、ImagePreview、ImgCropper、VideoPreview、Signature、QrCode、Watermark                                                                                                  | 固定素材，上传成功/失败/重试、预览切换、裁剪/签名输出、清空、二维码内容可解码；覆盖横屏签名页面              | 19 个核心场景三配置三轮验证，含横屏签名输出与二维码独立解码              |
| M9   | 展示与主题：Avatar、Badge、Card、Cell、Circle、ConfigProvider、CountDown、CountTo、Divider、Empty、Gap、Grid、Icon、Layout、Loading、Loadmore、NoticeBar、Progress、Skeleton、Table、Tag、Text | 内容、适用的状态切换、溢出和布局；计时可控；主题和语言切换；表格滚动/排序按源码能力核对                      | 34 个核心场景三配置三轮验证；100 个组件均有功能映射                      |
| M10  | 跨组件场景和浏览器矩阵收口                                                                                                                                                                     | 表单内选择器、嵌套弹层、主题下交互、离开再进入；Chromium/WebKit 全量功能通过；Firefox 桌面冒烟与关键流程通过 | 本地跨组件流程和四配置矩阵完整三轮通过；协议能力跳过均有说明             |
| M11  | 稳定场景视觉回归、全量复验与维护机制                                                                                                                                                           | 固定环境下人工审阅基线；全量关闭重试连续通过 3 次；无未解释 skip/flaky/失败，形成最终报告                    | 本地 3693 次执行：3660 通过、33 跳过、0 失败；Linux 视觉和远程 CI 待验证 |

M3 ～ M9 每批以 3 ～ 5 个 Demo 为一个实现单元；每单元完成后更新矩阵并汇报通过数、失败原因、剩余项。M2 已完成的场景在后续批次只补缺口，不重复编写。

### M1：基础设施清单

- [x] 核实 Node/pnpm/Playwright 兼容性；依赖与浏览器版本固定在锁文件和 CI 环境中。
- [x] 新增 `playwright.config.ts`，限定 `testDir`/`testMatch`，默认 Chromium 移动端配置。
- [x] 新增 `test:e2e:h5`、`test:e2e:h5:ui`、`test:e2e:h5:headed`、`test:e2e:h5:report` 和构建产物运行方式。
- [x] `webServer` 固定 host/端口并禁止自动漂移；本地与 CI 均使用新服务；核实实际路由模式、资源 base 和深链刷新。
- [x] 新增 `tests/e2e/tsconfig.json` 和显式 lint 入口，避免 Vitest 全局类型污染 E2E。
- [x] 新增公共 fixtures：独立浏览器上下文、统一语言/时区/视口、页面就绪、异常收集、网络 fixture。
- [x] HTML/机器可读报告、失败截图、失败 Trace；忽略生成产物，保留需要审阅的视觉基线。
- [x] 执行并记录 `pnpm build:h5`、`pnpm type-check`、`pnpm test:h5 --run` 的基线；历史失败单独列账。

目标目录（以下目录均已创建）：

```text
playwright.config.ts
tests/e2e/
  README.md
  tsconfig.json
  fixtures/             # 浏览器上下文、素材、网络响应
  helpers/              # 页面就绪、滚动/手势等少量复用逻辑
  coverage-matrix.json  # 组件 → 页面 → 场景 → 测试 → 结果
  smoke/                # 路由冒烟与全局导航
  components/           # wd-<name>.spec.ts，组合子组件可合并到父组件
  flows/                # 跨组件用户流程
  visual/               # 稳定的截图场景与基线
.github/workflows/e2e-h5.yml
```

### 单个组件的执行流程

1. 阅读 `wd-<name>.vue`、`types.ts`、`index.scss`、对应 Demo 和相关单测，标出 H5 有效分支。
2. 列出真实能力对应的场景，区分 E2E、已有单测和非 H5 能力；明确前置条件与可见结果。
3. 优先使用现有 Demo。缺少必要场景时最小补充；纯测试支撑页面如有必要，仅在 E2E 构建中注册，不进入正常发布包。
4. 按真实用户行为操作，优先角色/标签/文本定位，重复内容先限定 Demo 区域；需要稳定标识时加在能落到 H5 DOM 的节点并实际验证。
5. 编写能发现行为错误的断言：值、文案、可见性、实际位置、文件内容等。不得只用页面标题或根元素存在代替功能验收。
6. 跑当前组件用例，失败时保留 Trace 并分清产品问题、测试问题、环境问题；不放宽断言或盲目增加超时以求通过。
7. 对相关最小修复运行目标检查。范围外问题记录并另行确认；阻塞场景保持阻塞状态，不能标记完成。
8. 更新矩阵：场景 ID、文件、运行命令、浏览器版本、日期、结果和报告位置。最终收口统一重复验证。

## 4. 场景稳定性规范

- 默认每个测试独立 context，不依赖前一条测试、共享 storage 或执行顺序；主题与语言由 fixture 初始化。
- 使用自动等待与可重试断言，不使用固定 `waitForTimeout` 等待页面/动画就绪。滚动、弹层和异步列表都等待具体状态。
- 页面冒烟必须断言该页面实际内容已渲染，避免只看到公共外壳也通过；涉及图片的场景等待加载完成。
- 收集 `pageerror`；对未预期 `console.error` 和资源失败做分类。预期的失败请求按场景声明，不能一律忽略或一律判错。
- 网络 mock 限定已知外部接口和素材，不 mock 被测组件、整个 `uni` 对象或本应用静态脚本。上传仍真实走文件选择、请求和状态更新。
- 使用本地可控图片/短视频/上传文件；视频格式在目标浏览器验证，播放器受策略限制的行为须单独记录。
- 日期/倒计时场景固定时间和时区；时钟控制只在需要的用例启用，避免影响动画与其他页面。
- Touch 与 mouse 分别核实。多点手势、软键盘和真实设备能力不能用手工派发事件成功来证明完整原生链路通过；自动化边界写入报告。
- 视觉回归先选稳定的组件区域，覆盖明暗主题及窄/宽视口；冻结动态内容，固定字体、系统和浏览器版本，不混用 macOS 与 Linux 基线。
- UI 截图异常必须查看差异后再决定修复或更新基线；不能批量接受未审阅的新图。

## 5. 浏览器与 CI 策略

| 阶段/触发      | 测试组合                                                                       | 判定                                       |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| M1 ～ M2 本地  | Chromium 移动端；桌面最小验证                                                  | 首先建立可靠链路                           |
| M3 ～ M9 每批  | Chromium 移动端目标用例；WebKit 尽早验证输入/弹层/滚动                         | 逐步发现兼容差异，避免最后集中暴露         |
| PR 初期        | Chromium 全路由冒烟 + 已完成关键功能                                           | CI 早接入，失败保留报告                    |
| PR 完整阶段    | Chromium 手机/桌面与 WebKit 全量功能、Firefox 关键流程；Linux 视觉候选图待审阅 | 作为计划中的合并检查；实际分支保护单独配置 |
| 主分支/手动 CI | Chromium/WebKit 全量；Firefox 桌面冒烟与关键流程                               | 兼容回归；当前工作流未设置定时触发         |
| M11 最终验收   | 上述完整矩阵，关闭重试重复 3 次                                                | 首次结果均通过，无未解释 flaky             |

- 新增独立工作流，不复用现有单测的“按组件文件名推导矩阵”，防止漏掉页面、公共组件和主题变更。
- 路径过滤涵盖组件与 common、Demo、主页面、store、locale、App/main、pages/manifest、主题/静态资源、构建配置、E2E 和依赖锁文件。
- CI 先安装依赖和浏览器系统依赖，再构建 H5、启动服务、测试；失败也上传报告、Trace 和截图。
- 初期 CI 采用较低并发（建议 1 worker）；有稳定耗时记录后再调并发或分片。
- 调试 CI 可保留 1 次重试用于采样 Trace，但重试通过的 flaky 仍需处理；最终验收关闭重试。
- 项目文件改动可以本地交付；远程 CI 是否实际通过必须提供运行证据。不能以 YAML 写完代替远程运行成功。

## 6. 最终验收清单

- [x] 当前 100 个组件全部映射到明确场景；新增组件通过清单差异检查及时登记。
- [x] 当前 94 条注册路由全部登记；H5 有效页面的冒烟全部通过，排除项都有源码依据。
- [x] M3 ～ M9 已登记的正常、边界和异常核心场景通过，组合子组件有独立断言；不表示穷举全部 API。
- [x] M10 本地跨组件流程及目标浏览器矩阵通过；自动化能力边界已明确，真实设备为非目标。
- [x] 视觉基线已逐图审阅；macOS 固定环境下无未处理差异。Linux 基线待独立生成与审阅。
- [x] 完整本地矩阵关闭重试连续 3 次通过；3660 正常通过、33 协议能力跳过，无已知缺陷、非预期失败或重试。
- [ ] 远程 GitHub Actions 四配置功能任务实际通过；当前仅完成配置，未提交或推送。
- [ ] 原生 x64 Linux 候选图生成、逐张审阅、同环境重复比较和基线入库；本机 QEMU 启动失败，不计为视觉通过。
- [x] E2E lint/type-check 通过，H5 构建和相关既有测试无新增回归；历史失败有清晰记录。
- [x] 本地运行文档、CI 工作流、失败排查说明、增加组件的测试流程完整。
- [x] 输出最终执行报告：场景总数/通过/失败/阻塞/不适用、浏览器与环境、时间、报告路径、已知限制。

## 7. 进度记录

每批完成后追加一行，尚未实际执行的阶段不得填写“通过”。“场景规划完成”“用例已编写”“运行通过”分别记录。

| 日期             | 批次       | 完成内容                                                                     | 验证证据                                                                                  | 剩余/阻塞                                              |
| ---------------- | ---------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 2026-09-15       | M0         | 静态盘点、阶段计划、全组件与路由登记                                         | 从组件目录、Demo 文件和 pages.json 交叉核对                                               | 盘点完成                                               |
| 2026-09-15       | M1 ～ M2   | Playwright 1.63.0、独立检查、报告、CI、94 条路由与 13 条首批用例             | 三浏览器构建产物关闭重试连续 3 次：963/963 通过；见 [执行报告](./E2E-H5-REPORT.md)        | 后续核心功能已完成执行，远程 CI 仍未运行               |
| 2026-09-15       | M3 ～ M9   | 全组件核心场景、媒体输出、展示与配置、日期边界                               | 最终完整矩阵三轮，见 full-final/results.json                                              | 历史预期失败已归因，后续专项修复                       |
| 2026-09-15 ～ 16 | M10 ～ M11 | 跨组件流程、Firefox、6 张 macOS 视觉基线、稳定性修正及 H5-001 ～ H5-007 修复 | 历史全量 3450 次；修复专项 `remaining-fixes/final/results.json`：136 通过、6 跳过、0 失败 | Linux 视觉基线、远程 CI 待验证；真实设备不在本计划范围 |
| 2026-09-18       | M11 收口   | H5-008/H5-009 修复、Search 测试就绪等待、干净安装核验与完整三轮回归          | `post-fix-final/results.json`：3660 通过、33 跳过、0 失败；Vitest 109 文件/1830 通过      | 远程 CI 与 Linux 视觉待验证                            |

## 8. 参考依据

- [Playwright Web server](https://playwright.dev/docs/test-webserver)：启动服务与 baseURL 配置。
- [Playwright Best practices](https://playwright.dev/docs/best-practices)：用户可见行为、隔离、定位和调试。
- [Playwright Emulation](https://playwright.dev/docs/emulation)：浏览器设备参数模拟。
- [Playwright CI](https://playwright.dev/docs/ci)：CI 安装、并发与报告。
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)：截图基线与环境一致性。

## 9. 全组件覆盖矩阵

下面是实施入口。全部组件均已关联到可执行的核心场景；子组件由父级测试文件内的组状态、子项内容或布局断言验证。场景 ID、浏览器、重复次数和实际结果统一登记在 tests/e2e/coverage-matrix.json。partial-functional 表示核心功能覆盖，不代表每个 API 组合均已穷举。

| 组件                    | Demo 入口                                                                  | 批次 | 覆盖方式               | 状态                                 |
| ----------------------- | -------------------------------------------------------------------------- | ---- | ---------------------- | ------------------------------------ |
| wd-action-sheet         | [actionSheet](../src/subPages/actionSheet/Index.vue)                       | M3   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-avatar               | [avatar](../src/subPages/avatar/Index.vue)                                 | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-avatar-group         | [avatar](../src/subPages/avatar/Index.vue)                                 | M9   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-backtop              | [backtop](../src/subPages/backtop/Index.vue)                               | M7   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-badge                | [badge](../src/subPages/badge/Index.vue)                                   | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-button               | [button](../src/subPages/button/Index.vue)                                 | M4   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-calendar             | [calendar](../src/subPages/calendar/Index.vue)                             | M5   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-calendar-view        | [calendarView](../src/subPages/calendarView/Index.vue)                     | M5   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-card                 | [card](../src/subPages/card/Index.vue)                                     | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-cascader             | [cascader](../src/subPages/cascader/Index.vue)                             | M5   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-cell                 | [cell](../src/subPages/cell/Index.vue)                                     | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-cell-group           | [cell](../src/subPages/cell/Index.vue)                                     | M9   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-checkbox             | [checkbox](../src/subPages/checkbox/Index.vue)                             | M4   | 独立组件场景           | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-checkbox-group       | [checkbox](../src/subPages/checkbox/Index.vue)                             | M4   | 组合场景，需子组件断言 | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-circle               | [circle](../src/subPages/circle/Index.vue)                                 | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-col                  | [layout](../src/subPages/layout/Index.vue)                                 | M9   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-collapse             | [collapse](../src/subPages/collapse/Index.vue)                             | M6   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-collapse-item        | [collapse](../src/subPages/collapse/Index.vue)                             | M6   | 组合场景，需子组件断言 | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-config-provider      | [configProvider](../src/subPages/configProvider/Index.vue)                 | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-count-down           | [countDown](../src/subPages/countDown/Index.vue)                           | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-count-to             | [countTo](../src/subPages/countTo/Index.vue)                               | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-curtain              | [curtain](../src/subPages/curtain/Index.vue)                               | M3   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-datetime-picker      | [datetimePicker](../src/subPages/datetimePicker/Index.vue)                 | M5   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-datetime-picker-view | [datetimePickerView](../src/subPages/datetimePickerView/Index.vue)         | M5   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-dialog               | [dialog](../src/subPages/dialog/Index.vue)                                 | M3   | 独立组件场景           | 已实现 10 个关联核心场景；结果见矩阵 |
| wd-divider              | [divider](../src/subPages/divider/Index.vue)                               | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-drop-menu            | [dropMenu](../src/subPages/dropMenu/Index.vue)                             | M6   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-drop-menu-item       | [dropMenu](../src/subPages/dropMenu/Index.vue)                             | M6   | 组合场景，需子组件断言 | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-empty                | [empty](../src/subPages/empty/Index.vue)                                   | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-fab                  | [fab](../src/subPages/fab/Index.vue)                                       | M7   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-floating-panel       | [floatingPanel](../src/subPages/floatingPanel/Index.vue)                   | M7   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-form                 | [form](../src/subPages/form/Index.vue)                                     | M4   | 独立组件场景           | 已实现 9 个关联核心场景；结果见矩阵  |
| wd-form-item            | [form](../src/subPages/form/Index.vue)                                     | M4   | 组合场景，需子组件断言 | 已实现 9 个关联核心场景；结果见矩阵  |
| wd-gap                  | [gap](../src/subPages/gap/Index.vue)                                       | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-grid                 | [grid](../src/subPages/grid/Index.vue)                                     | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-grid-item            | [grid](../src/subPages/grid/Index.vue)                                     | M9   | 组合场景，需子组件断言 | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-icon                 | [icon](../src/subPages/icon/Index.vue)                                     | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-image-preview        | [imagePreview](../src/subPages/imagePreview/Index.vue)                     | M8   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-img                  | [img](../src/subPages/img/Index.vue)                                       | M8   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-img-cropper          | [imgCropper](../src/subPages/imgCropper/Index.vue)                         | M8   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-index-anchor         | [indexBar](../src/subPages/indexBar/Index.vue)                             | M7   | 组合场景，需子组件断言 | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-index-bar            | [indexBar](../src/subPages/indexBar/Index.vue)                             | M7   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-input                | [input](../src/subPages/input/Index.vue)                                   | M4   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-input-number         | [inputNumber](../src/subPages/inputNumber/Index.vue)                       | M4   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-keyboard             | [keyboard](../src/subPages/keyboard/Index.vue)                             | M4   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-loading              | [loading](../src/subPages/loading/Index.vue)                               | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-loadmore             | [loadmore](../src/subPages/loadmore/Index.vue)                             | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-navbar               | [navbar](../src/subPages/navbar/Index.vue)                                 | M6   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-navbar-capsule       | [navbar](../src/subPages/navbar/Index.vue)                                 | M6   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-notice-bar           | [noticeBar](../src/subPages/noticeBar/Index.vue)                           | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-notify               | [notify](../src/subPages/notify/Index.vue)                                 | M3   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-overlay              | [overlay](../src/subPages/overlay/Index.vue)                               | M3   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-pagination           | [pagination](../src/subPages/pagination/Index.vue)                         | M6   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-password-input       | [passwordInput](../src/subPages/passwordInput/Index.vue)                   | M4   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-picker               | [picker](../src/subPages/picker/Index.vue)                                 | M5   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-picker-view          | [pickerView](../src/subPages/pickerView/Index.vue)                         | M5   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-popover              | [popover](../src/subPages/popover/Index.vue)                               | M3   | 独立组件场景           | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-popup                | [popup](../src/subPages/popup/Index.vue)                                   | M3   | 独立组件场景           | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-progress             | [progress](../src/subPages/progress/Index.vue)                             | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-qr-code              | [qrCode](../src/subPages/qrCode/Index.vue)                                 | M8   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-radio                | [radio](../src/subPages/radio/Index.vue)                                   | M4   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-radio-group          | [radio](../src/subPages/radio/Index.vue)                                   | M4   | 组合场景，需子组件断言 | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-rate                 | [rate](../src/subPages/rate/Index.vue)                                     | M4   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-resize               | [resize](../src/subPages/resize/Index.vue)                                 | M7   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-root-portal          | [rootPortal](../src/subPages/rootPortal/Index.vue)                         | M3   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-row                  | [layout](../src/subPages/layout/Index.vue)                                 | M9   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-search               | [search](../src/subPages/search/Index.vue)                                 | M4   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-segmented            | [segmented](../src/subPages/segmented/Index.vue)                           | M6   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-select-picker        | [selectPicker](../src/subPages/selectPicker/Index.vue)                     | M5   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-sidebar              | [sidebar](../src/subPages/sidebar/Index.vue)                               | M6   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-sidebar-item         | [sidebar](../src/subPages/sidebar/Index.vue)                               | M6   | 组合场景，需子组件断言 | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-signature            | [signature](../src/subPages/signature/Index.vue)                           | M8   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-skeleton             | [skeleton](../src/subPages/skeleton/Index.vue)                             | M9   | 独立组件场景           | 已实现 1 个关联核心场景；结果见矩阵  |
| wd-slide-verify         | [slideVerify](../src/subPages/slideVerify/Index.vue)                       | M7   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-slider               | [slider](../src/subPages/slider/Index.vue)                                 | M7   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-sort-button          | [sortButton](../src/subPages/sortButton/Index.vue)                         | M6   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-step                 | [steps](../src/subPages/steps/Index.vue)                                   | M6   | 组合场景，需子组件断言 | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-steps                | [steps](../src/subPages/steps/Index.vue)                                   | M6   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-sticky               | [sticky](../src/subPages/sticky/Index.vue)                                 | M7   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-sticky-box           | [sticky](../src/subPages/sticky/Index.vue)                                 | M7   | 组合场景，需子组件断言 | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-swipe-action         | [swipeAction](../src/subPages/swipeAction/Index.vue)                       | M7   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-swiper               | [swiper](../src/subPages/swiper/Index.vue)                                 | M7   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-swiper-nav           | [swiper](../src/subPages/swiper/Index.vue)；另参考 imagePreview 中直接用法 | M7   | 组合场景，需子组件断言 | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-switch               | [switch](../src/subPages/switch/Index.vue)                                 | M4   | 独立组件场景           | 已实现 5 个关联核心场景；结果见矩阵  |
| wd-tab                  | [tabs](../src/subPages/tabs/Index.vue)                                     | M6   | 组合场景，需子组件断言 | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-tabbar               | [tabbar](../src/subPages/tabbar/Index.vue)                                 | M6   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-tabbar-item          | [tabbar](../src/subPages/tabbar/Index.vue)                                 | M6   | 组合场景，需子组件断言 | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-table                | [table](../src/subPages/table/Index.vue)                                   | M9   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-table-column         | [table](../src/subPages/table/Index.vue)                                   | M9   | 组合场景，需子组件断言 | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-tabs                 | [tabs](../src/subPages/tabs/Index.vue)                                     | M6   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-tag                  | [tag](../src/subPages/tag/Index.vue)                                       | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-text                 | [text](../src/subPages/text/Index.vue)                                     | M9   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-textarea             | [textarea](../src/subPages/textarea/Index.vue)                             | M4   | 独立组件场景           | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-toast                | [toast](../src/subPages/toast/Index.vue)                                   | M3   | 独立组件场景           | 已实现 6 个关联核心场景；结果见矩阵  |
| wd-tooltip              | [tooltip](../src/subPages/tooltip/Index.vue)                               | M3   | 独立组件场景           | 已实现 4 个关联核心场景；结果见矩阵  |
| wd-tour                 | [tour](../src/subPages/tour/Index.vue)                                     | M3   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-transition           | [transition](../src/subPages/transition/Index.vue)                         | M3   | 独立组件场景           | 已实现 12 个关联核心场景；结果见矩阵 |
| wd-upload               | [upload](../src/subPages/upload/Index.vue)                                 | M8   | 独立组件场景           | 已实现 3 个关联核心场景；结果见矩阵  |
| wd-video-preview        | [videoPreview](../src/subPages/videoPreview/Index.vue)                     | M8   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |
| wd-watermark            | [watermark](../src/subPages/watermark/Index.vue)                           | M8   | 独立组件场景           | 已实现 2 个关联核心场景；结果见矩阵  |

## 10. 全路由冒烟清单

按 pages.json 静态注册清单登记；M1 核对 H5 编译结果与实际 URL，M2 为有效路由生成独立测试。每条都需要页面特定就绪条件。

| 路由                              | 范围                                | 状态              |
| --------------------------------- | ----------------------------------- | ----------------- |
| pages/index/Index                 | 主页面                              | Chromium 冒烟通过 |
| pages/about/Index                 | 主页面                              | Chromium 冒烟通过 |
| subPages/button/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/icon/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/badge/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/avatar/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/cell/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/rate/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/slider/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/layout/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/card/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/tag/Index                | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/search/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/transition/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/popup/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/divider/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/switch/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/input/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/textarea/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/dialog/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/toast/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/notify/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/loading/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/progress/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/empty/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/inputNumber/Index        | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/loadmore/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/resize/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/sticky/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/img/Index                | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/imgCropper/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/pagination/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/sortButton/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/actionSheet/Index        | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/curtain/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/noticeBar/Index          | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/popover/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/tooltip/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/pickerView/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/picker/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/tabs/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/radio/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/checkbox/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/cascader/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/selectPicker/Index       | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/dropMenu/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/grid/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/swipeAction/Index        | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/skeleton/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/slideVerify/Index        | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/steps/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/videoPreview/Index       | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/upload/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/calendarView/Index       | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/calendar/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/datetimePickerView/Index | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/datetimePicker/Index     | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/form/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/form/demo1               | 补充子页面                          | Chromium 冒烟通过 |
| subPages/form/demo2               | 补充子页面                          | Chromium 冒烟通过 |
| subPages/form/demo3               | 补充子页面                          | Chromium 冒烟通过 |
| subPages/form/demo5               | 补充子页面                          | Chromium 冒烟通过 |
| subPages/collapse/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/configProvider/Index     | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/watermark/Index          | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/circle/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/swiper/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/segmented/Index          | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/tabbar/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/overlay/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/navbar/Index             | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/table/Index              | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/sidebar/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/sidebar/demo1            | 补充子页面                          | Chromium 冒烟通过 |
| subPages/sidebar/demo2            | 补充子页面                          | Chromium 冒烟通过 |
| subPages/sidebar/demo3            | 补充子页面                          | Chromium 冒烟通过 |
| subPages/form/demo4               | 补充子页面                          | Chromium 冒烟通过 |
| subPages/fab/Index                | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/text/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/countDown/Index          | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/countTo/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/keyboard/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/gap/Index                | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/passwordInput/Index      | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/signature/Index          | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/signature/Landscape      | 补充子页面                          | Chromium 冒烟通过 |
| subPages/backtop/Index            | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/indexBar/Index           | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/floatingPanel/Index      | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/wxRewardAd/Index         | 仅 H5 页面冒烟/返回；广告能力不适用 | Chromium 冒烟通过 |
| subPages/rootPortal/Index         | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/tour/Index               | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/imagePreview/Index       | 组件 Demo                           | Chromium 冒烟通过 |
| subPages/qrCode/Index             | 组件 Demo                           | Chromium 冒烟通过 |
