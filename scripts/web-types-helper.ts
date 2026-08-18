/**
 * 文档表格 → IDE 元数据的纯函数集合。
 *
 * 单独成模块是为了让单元测试能直接引用这些函数，
 * 而不必 import `build-web-types.ts`（那个文件在模块顶层就会真正跑一遍生成流程）。
 */

// 默认 model 对应的真实 prop 名（Vue 3 的 modelValue）
export const MODEL_VALUE_PROP = 'model-value'

// 获取纯净值（移除所有反引号和星号以及首尾的单双引号）
export const getPureValue = (value: string) => {
  return value
    .replace(/[`*]/g, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()
}

// 移除参数列中的版本标记，避免生成的属性名被 ^(x.y.z) 污染
export const stripVersionMarker = (value: string) => {
  return value.replace(/\s*\^\(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?\)/g, '').trim()
}

// 将驼峰写法转换为短横线连接的写法的函数
export const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// 清理单个属性名：去掉 markdown 残留符号，并统一为短横线写法
export const normalizePropName = (alias: string) => {
  return toKebabCase(alias.replace(/[^\w\s-]/g, '')).trim()
}

// 按书写顺序逐个别名尝试，取第一个能确定 prop 名的
function resolveFromAliases(aliases: string[]) {
  for (const alias of aliases) {
    // 具名 model：`v-model:car-lang` / `v-model:carLang` → prop 名就是修饰符本身。
    // 修饰符要整段取，按非单词字符截断会把 car-lang 截成 car、file-list 截成 file
    const namedModel = alias.match(/^v-model:([\w-]+)$/)
    if (namedModel) return toKebabCase(namedModel[1])

    // 默认 model：裸 `v-model` → modelValue
    if (alias === 'v-model') return MODEL_VALUE_PROP

    const propName = normalizePropName(alias)
    if (propName) return propName
  }

  return undefined
}

/**
 * 从「参数」列解析出组件真实的 prop 名。
 *
 * 文档里的写法并不统一，可能是 `v-model`、`v-model / modelValue`、`model-value / v-model`、
 * `visible / v-model:visible`、`v-model:car-lang` 等多种形式。
 * IDE 元数据（web-types.json / attributes.json）里必须落成真实 prop 名：
 * 一旦写成字面量 `v-model`，WebStorm 会把它当成一个「布尔型 HTML 属性」，
 * 而布尔属性只允许取空串或属性名自身，于是 `v-model="show"` 会被误报
 * 「show 不是 v-model 的有效值，预期值: v-model」。
 *
 * 识别 v-model 依赖精确拼写，所以每个别名都要先过 getPureValue 剥掉 markdown 装饰 ——
 * 否则 `` `v-model` `` 会被当成普通属性名原样落库，把上面那个 bug 放回去。
 */
export const resolvePropName = (value: string) => {
  // 别名之间用 `/` 或 `|` 分隔，按书写顺序取第一个能确定 prop 名的
  const aliases = stripVersionMarker(value)
    .split(/[/|]/)
    .map((alias) => getPureValue(alias))
    .filter(Boolean)

  const propName = resolveFromAliases(aliases) ?? normalizePropName(stripVersionMarker(value))

  // 兜底护栏：字面量 v-model 绝不允许落进产物，否则就是回归到本函数要修的那个 bug。
  // 与其静默发布坏元数据，不如让构建失败并指出该改哪一行文档。
  if (propName.startsWith('v-model')) {
    throw new Error(
      `「参数」列 ${JSON.stringify(value)} 解析出了非法属性名 ${JSON.stringify(propName)}，请改成裸写的 v-model 或 v-model:<完整修饰符>`
    )
  }

  return propName
}
