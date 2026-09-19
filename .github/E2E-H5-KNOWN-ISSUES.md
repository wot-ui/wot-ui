# H5 E2E 已知问题

这里记录测试实际发现的问题，不将预期失败计算为正常通过。组件功能的完整验收仍以 E2E-H5-PLAN.md 为准。

## 2026-09-18 当前状态

H5-001/H5-002/H5-004 为源码或 Demo 修复；H5-005 纠正测试测量对象；H5-006 已修复组件局部触摸模拟冲突；H5-003/H5-007 在本仓库通过锁定版本的 uni-h5 补丁修复。后续发现的 H5-008 Sticky 观察回调竞态和 H5-009 SwipeAction 拖动附带点击也已修复。最终完整矩阵三轮为 3660 通过、33 明确跳过、0 已知缺陷、0 非预期失败、0 重试。下方较早的复现和建议保留为历史证据，以此处状态为准。

| 编号   | 本轮结果                                                                         | 回归                                                                      |
| ------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| H5-001 | disabledButton 与同类 verticalLayout 显式处理取消拒绝                            | 取消、重新打开、禁用确认、纵向按钮取消；无未处理异常                      |
| H5-002 | 国际化参数改成 `[dynamicWidth]`                                                  | 中英文文案及布局 150→250→150                                              |
| H5-003 | 稳定复现后修复 uni-h5 外部 value 更新与 input 尾部事件竞态；失焦前派发待处理输入 | Input/Textarea 快速清空、立即重输、连续输入、真实键入、即时提交、组合事件 |
| H5-004 | uni.vibrateShort 增加 fail 回调，振动失败正常降级                                | WebKit 真实失败路径；单测验证失败时切换、默认关闭、禁用项                 |
| H5-005 | 测量实际插槽按钮底边，保留 1px 容差并移除错误缺陷标记                            | 原问题仅纠正测量；后续独立的源码竞态修复见 H5-008                         |
| H5-006 | 前轮已修复局部触摸模拟冲突                                                       | 保留鼠标与触摸正常回归                                                    |
| H5-007 | 整行位置也派发 onSnap；忽略一次拖动自身产生的 click                              | ±2 行精确拖动、1.8 行吸附、之后点击、原生 tap/CDP 触摸                    |
| H5-008 | Sticky 已受容器底边约束时，后到的内容回调保留容器位置                            | 三配置各十轮 E2E 通过；两种回调顺序及上滚恢复单测通过                     |
| H5-009 | SwipeAction 忽略横向拖动结束后浏览器附带的 click                                 | 三配置各二十轮 E2E 通过；普通/越界拖动及下一次点击单测通过                |

补丁仅对本仓库的普通 uni-app H5 浏览器入口生效，不修改小程序/SSR/uni-app x，也不自动修复下游应用的 uni-app 依赖。安装与升级移除流程见 [补丁说明](../patches/README.md)。真机输入法、真机连续触摸与远程 CI 仍不在本地验证结论内。

## 2026-09-15 复核：严重程度与修复建议

前次报告的 5 项预期失败不等于 5 项严重组件缺陷。复核源码并完成 14 次定向诊断后，建议如下（P1 优先处理、P2 常规修复、P3 低优先级）：

| 问题                          | 判断                                                                             | 是否需要修复                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| H5-006 日期滚轮鼠标点击跳两项 | P1，H5 Demo 触摸模拟与 uni-h5 的点击处理冲突，实际选错值                         | 后续已修复局部模拟冲突，专项三轮通过；日期计算算法未改                           |
| H5-004 Segmented 振动拒绝     | P2，组件兼容性问题；仅开启 `vibrateShort` 且设备不支持或拒绝振动时触发，默认关闭 | 应处理 API 失败回调并正常降级；不应全局屏蔽 Promise 错误                         |
| H5-001 Dialog 取消拒绝        | P3，Demo 遗漏取消处理；弹窗能够正常关闭                                          | 建议补 Demo 的 catch；不改变 Dialog 取消时 reject 的既有契约                     |
| H5-002 Popover 宽度文案       | P3，Demo 国际化插值错误；实际宽度变化正常                                        | 建议改成 `[dynamicWidth]`，组件逻辑无需修改                                      |
| H5-005 Sticky 底边差值        | 内部行盒空白；当前 Demo 的实际按钮没有越界                                       | 无需按内容越界修复定位算法；应调整测试所测对象，外壳空白至多作为低优先级样式整理 |

上述复核阶段未修改产品/Demo 源码或正式回归断言。之后经用户要求已修复 H5-006，见下文。原三轮报告及 33 次预期失败计数保留为历史证据；其中 Sticky 的缺陷定性按此次复核更正，不能继续将这些失败全部解释为真实功能缺陷。

## H5-001：Dialog Demo 取消产生未处理拒绝（已修复，以下为原始记录）

- 位置：`src/subPages/dialog/Index.vue` 的 `disabledButton()`。
- 重现：打开“禁用按钮”示例，再点击取消；弹窗正常关闭，但浏览器记录未处理的 Promise 拒绝。
- 原因：`dialog.show()` 在取消时 reject，当前示例未加 catch。
- 回归：`wd-dialog.spec.ts` 中的 `@known-defect` 用例。先断言关闭成功，再将 diagnostics 中的失败标为预期失败；修复后意外通过会使 Playwright 报错，提示移除标记。
- 历史建议：在本示例的 `dialog.show(...).catch(...)` 中处理取消。当前 Demo 已完成处理。

## H5-002：Popover Demo 动态宽度文案缺值（已修复，以下为原始记录）

- 位置：`src/subPages/popover/Index.vue` 的 `dang-qian-kuan-du-dynamicwidth-px` 调用。
- 重现：打开“动态内容与位置更新”，显示“当前宽度: px”，点击改变大小后仍然缺少数值。
- 原因：`$t(key, dynamicWidth)` 将数字解释为复数参数，未提供语言包占位符所需的插值。
- 实际布局：150px → 250px → 150px 的变化另有正常回归断言，不受文案缺陷影响。
- 回归：`wd-popover.spec.ts` 中的 `@known-defect` 用例。
- 历史建议：语言包使用位置占位符 `{0}`，将第二个参数改为位置插值数组 `[dynamicWidth]`。当前 Demo 已完成修改。

## H5-003：uni-h5 输入节流期间快速清空可能被尾部事件覆盖（本仓库 H5 补丁已修复，以下为原始记录）

- 重现证据：`/tmp/wot-e2e-debug-state.log`；文本域一次填入多行内容后立即点清空，DOM 点击已触发，旧值随后恢复。
- 框架行为：`@dcloudio/uni-h5` 的 `useField` 对输入事件做 100ms 节流，对外部 value 更新做 100ms 防抖。表单填值后立即提交也可能读到前一次值。
- 常规场景：Input、Form、Search、Textarea 测试安装 Playwright Clock，`fillUniField` 在填值后推进 150ms 虚拟时间，等待框架尾部事件；不使用固定 wall-clock sleep，不读写组件内部状态作为测试断言。
- Firefox 首次兼容回归也复现输入后立即清空旧值恢复，见 `test-results/verification/diagnostics/firefox-first.log`。冻结时钟后的控制实验在 Chromium/WebKit 未复现，说明需要进一步定位时序窗口，见 `clear-controlled.log`。
- 历史记录：当时尚未纳入稳定回归，也未修改组件或依赖。当前已通过仓库锁定版本的 uni-h5 补丁修复，并由 `flows/input-timing.spec.ts` 覆盖。

## H5-004：Segmented 的振动调用在 WebKit 产生未处理拒绝（已修复，以下为原始记录）

- 源码：`wd-segmented.vue` 监听 value 后直接调用 `uni.vibrateShort({})`，没有失败处理。
- 重现：在 WebKit 打开 Segmented 的自定义标签示例，点击 Tom。选中状态更新成功，但出现未处理拒绝。
- 实际拒绝内容：`{"errMsg":"vibrateShort:fail vibrateLong:fail"}`，诊断日志 `/tmp/wot-e2e-vibrate-diagnostic.log`。uni-h5 在浏览器不支持 navigator.vibrate 时 reject。
- 回归：`wd-segmented.spec.ts` 的独立 `@known-defect` 场景，只在 WebKit 标记预期失败。整组禁用和单项禁用另有正常用例。
- 历史建议：处理不支持振动的失败路径。当前组件已增加 `fail` 回调并完成 WebKit 回归。

## H5-005：Sticky 外壳底部存在约 3 ～ 4px 行盒空白（测试已纠正，以下为复核记录）

- 历史回归：`wd-sticky.spec.ts` 的容器约束场景，滚动到容器下沿后在同一次 DOM 测量中比较 sticky 与容器的 bottom。
- 历史实测：Chromium 约 4px，WebKit 约 3.45px；差值来自外壳行盒空白，并非可见按钮越界。
- 复核定位：`wd-sticky` 使用 `wd-resize` 报告的 40px 内容高度计算位置，但内部 `wd-resize` 为 `inline-block` 且默认 `vertical-align: baseline`，使外层 `.wd-sticky__container` 留下基线下方空白。原测试测量的是这个外壳，不是插槽内按钮。
- Chromium 测量：容器底边 -160px，按钮底边 -160px，外壳底边 -156px；WebKit：容器和按钮底边均为 -159.546875px，外壳底边 -156.09375px。按钮实际没有越界。
- 仅在诊断页面将内部 `.wd-resize` 改为 `vertical-align: top`，两个浏览器的外壳差值均归零，按钮位置保持不变；没有将此 CSS 改动写入源码。
- 正式回归现已增加真实插槽内容的底边断言，将外壳尺寸与可见内容约束分开；不将当前 Demo 结论外推到所有自定义插槽或快速滚动边界。
- 为避免初始化与首次观测交错，历史诊断用例先确认 y=44px 的吸顶状态，再滚动离开容器。目标五轮验证的 15 次测量均重现外壳差值（Chromium 4px、WebKit 3.453125px）。
- 证据：`test-results/verification/m7/results.json`、`test-results/verification/sticky-settled/results.json`。

## H5-006：纯桌面鼠标点击日期滚轮前进两项（已修复）

- 重现：Chromium 桌面（hasTouch=false）打开 DatetimePicker 的“时分”，在分钟 20 下方相邻行点击一次，结果为 22，预期 21。
- 复核定位：应用 `src/main.ts` 在 H5 全局引入 `@vant/touch-emulator`，它将鼠标转换为 touch；uni-h5 的 `useCustomClick()` 又在 touchend 合成一个 click，随后浏览器原生 click 再执行一次。事件记录明确出现一条非可信 `CustomEvent` 和一条可信 `PointerEvent`，一次鼠标操作导致两次选择。
- 对照：Chromium 与 WebKit 均设置 `hasTouch=false, isMobile=false`，分别使用真实时钟和 Playwright Clock；4 种组合都从 20 变 22。仅在目标列添加模拟器支持的 `data-no-touch-simulate` 后，4 种组合都变为 21，且只剩一次可信 click。由此排除 Clock 引入的误报；WebKit 此处是桌面输入配置，不能描述为 iPhone 触摸复现。
- 修复：在共用的 `wd-picker-view` 包装节点加 `data-no-touch-simulate`，仅排除该区域的 H5 鼠标转触摸，由 uni-h5 自身处理鼠标与触摸。未修改 uni-app 依赖、日期计算或全局模拟器；该静态 data 属性在其他平台不执行逻辑。
- 诊断源与日志归档在 `test-results/verification/issue-review/`（不提交）。
- 回归：`flows/picker-mouse.spec.ts` 移除预期失败及浏览器跳过，验证真实时钟下 20→21→20、确认回填、鼠标拖动吸附后继续点击、上下滚轮。四个 Picker 文件移除强制 hasTouch=true，恢复各项目的原始配置；`flows/picker-touch.spec.ts` 另验证原生 tap 及 Chromium CDP 连续拖动。最终结果见执行报告。

## H5-007：uni-h5 滚轮精确拖到整行位置时可能漏更新（本仓库 H5 补丁已修复，以下为原始记录）

- 在 H5-006 的拖动回归中发现：从分钟 20 慢速上拖恰好 88px（2 × 44px），内容位移已经指向 22，但选中值没有同步；Chromium CDP 触摸保持 20，无触摸鼠标配置随后原生 click 可导致 18。
- 对照恢复原触摸模拟后，Chromium 桌面同样得到 18，因此不是 H5-006 局部排除模拟引入的回归。此边界在可控时钟下验证，真实设备与自然时序的触发概率尚未评估。
- 当前 uni-h5 的 `Scroller.snap()` 仅在 `this._position !== i` 时调用 `onSnap`；精确整行位置跳过更新。这是独立的上游边界，不应通过修改日期数值算法或放宽断言处理。
- 正常拖动回归使用 1.8 行并严格断言吸附到 22，同时等待吸附动画结束后再点击。这项早期结果不代表精确整行边界已修复；后续补丁另有 ±2 行精确拖动回归。
- 原始对照用例和日志保存在 `test-results/verification/picker-fix/{picker-drag-control.spec.ts,drag-control.log}`。当前已由仓库锁定版本的 uni-h5 补丁修复，并纳入普通通过用例。

## H5-008：Sticky 快速滚动时内容回调覆盖容器底边约束（已修复）

- 发现：修复后完整矩阵三轮共 3693 次执行，3659 通过、33 跳过，桌面 Chromium 第三轮的快速滚动场景失败一次。按钮实际停在 y=44px，超出容器底边 184px；这是可见内容越界，与 H5-005 的外壳行盒空白不同。
- 原因：容器观察者先设置 `boxLeaved=true` 和底边绝对定位，随后内容观察者又将其覆盖为 `fixed`。两个观察回调的到达顺序不确定。
- 修复：`wd-sticky` 的内容回调更新吸顶状态后，若容器已经离开则保留容器位置；返回容器后仍由容器观察者解除约束，回到页面顶部正常恢复文档流。
- 验证：新增单测模拟两种回调顺序；修复前“容器回调先到”稳定失败，修复后两种顺序均通过，并验证返回吸顶和普通状态。H5/MP-WEIXIN 下相关 23 条单测各自通过。E2E 增加明确的滚出视口等待及返回容器断言，三配置各十轮、共 90 次通过，0 跳过、0 重试。
- 证据：`test-results/verification/post-fix-full/` 保存原全量失败、截图与 Trace；`sticky-race/` 保存修复前后单测及专项 E2E。最终完整矩阵结果见执行报告。

## H5-009：SwipeAction 鼠标拖动结束的原生 click 立即关闭操作区（已修复）

- WebKit 的无触摸鼠标配置通过应用已有 touch-emulator 产生完整 touchstart/move/end。Trace 与独立事件日志显示，拖动位移已到 -160px，松开后吸附到约 -212.7px，但随后的可信原生 click 调用内容点击关闭，位移归零。
- 修复：达到 20px 横向拖动后，忽略该手势附带的点击；新触摸开始恢复。拖到操作区边界时内部重设拖动原点不会清除标记，正常下一次点击继续触发回调并关闭。
- 新增两条单测覆盖普通拖动和超过边界；修复前均稳定失败，修复后 H5/MP-WEIXIN 下各 21 条专项单测通过。三种浏览器配置各 20 轮、共 180 次专项 E2E 通过；最终完整三轮也通过。
- 证据：`test-results/verification/swipe-review/`；修复前全量运行在发现问题后中断，原始结果保留于 `verification/post-search-interrupted/`，不计为完整验收。

## Search 自动聚焦竞争（测试已纠正）

Sticky 修复后的全量运行中，桌面 Chromium 出现一次长度限制用例失败。Trace 显示目标输入始终为“初始文案”，而页面另一个自动聚焦示例收到 `123456`：延迟 focus 恰好发生在 Playwright `fill` 选择文本与键盘插入之间，并非输入补丁回填旧值。

测试现明确等待自动聚焦示例就绪，再执行各场景；未修改 Search 源码、maxlength 断言或超时。三种配置各 20 轮、240 次专项全部通过，随后完整三轮通过。证据见 `verification/post-sticky-full/` 与 `verification/search-focus/`。

## 自动化能力边界

- Playwright 移动 WebKit 明确不支持 `mouse.wheel`。两条 `@wheel` 场景在该配置下显式跳过；Chromium 执行实际滚轮，WebKit 仍验证锁定样式、恢复和容器滚动空间。
- 连续触摸新增 Chromium CDP 路径，并验证 Slider 到 100；WebKit/Firefox 无等价的 Playwright 触摸移动 API，明确跳过。M7 鼠标拖动场景关闭 hasTouch；滚轮还关闭 isMobile。
- Keyboard / PasswordInput 使用浏览器真实 `tap()`；桌面配置对此类用例启用 `hasTouch`。这不等同于真机软键盘或原生输入法测试。
- 最新状态以文档顶部 2026-09-18 表格为准；前期失败报告保留，不覆盖原始证据。
