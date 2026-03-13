---
name: vue-comment
description: 统一 Vue 项目代码注释与命名规范，涵盖组件 Props、函数、变量、类型定义及文件命名，确保代码风格一致，便于维护和文档生成。
---

# Vue 项目注释与命名规范

本 Skill 旨在统一 Vue 项目中的代码注释格式与命名约定，建立标准化的开发规范。不仅涵盖组件 Props，还包括函数、变量、类型定义以及文件目录的命名规则。

## 命令
当需要统一 Vue 项目代码（组件、TS文件等）的注释或命名时使用此技能。

## 使用场景
1.  **代码维护**: 统一现有代码库的风格，提高可读性。
2.  **新功能开发**: 确保新增组件和逻辑符合团队规范。
3.  **文档生成**: 为自动生成 API 文档和类型说明提供标准元数据。
4.  **Code Review**: 作为代码审查的标准依据。

## 1. 命名规范

遵循 "约定优于配置" 原则，保持命名的一致性与语义化。

### 1.1 文件与目录
*   **组件文件**: 使用 **kebab-case** (短横线连接)，如 `my-component.vue`, `user-profile.vue`。
*   **普通 TS/JS 文件**: 使用 **kebab-case**，如 `date-utils.ts`, `api-client.ts`。
*   **目录**: 使用 **kebab-case**，如 `components/`, `utils/`, `user-center/`。

### 1.2 变量与常量
*   **普通变量**: 使用 **camelCase** (小驼峰)，如 `userInfo`, `isLoading`。
    *   布尔类型建议以 `is`, `has`, `should` 开头，如 `isVisible`。
*   **常量**: 使用 **UPPER_SNAKE_CASE** (大写下划线)，通常用于全局配置或某些固定值，如 `MAX_RETRY_COUNT`, `DEFAULT_THEME`。
*   **私有变量**: 即使在 TS 中有 private 关键字，Vue 3 组合式 API 中内部变量仍建议保持 camelCase，不强制加下划线前缀，除非团队有特殊约定。

### 1.3 函数
*   **函数名**: 使用 **camelCase** (小驼峰)。
*   **命名动词**: 建议使用动词开头，如 `get`, `set`, `fetch`, `handle`, `on`, `render` 等。
    *   `handle`: 用于事件处理，如 `handleClick`。
    *   `fetch`/`request`: 用于异步请求，如 `fetchUserData`。
    *   `get`: 用于获取数据或计算结果，如 `getFormattedDate`。

### 1.4 类与类型
*   **类 (Class)**: 使用 **PascalCase** (大驼峰)，如 `User`, `HttpClient`。
*   **接口 (Interface) / 类型别名 (Type)**: 使用 **PascalCase** (大驼峰)，如 `UserProps`, `TableColumn`。
*   **枚举 (Enum)**: 使用 **PascalCase**，成员使用 **UPPER_SNAKE_CASE** (视团队习惯，也可 PascalCase)。

---

## 2. 注释规范

所有注释应简洁明了，使用中文（除非项目强制全英文），并保持语意通顺。

### 2.1 组件 Props 注释

组件 Props 注释是生成组件文档的核心来源。

**基本格式**:
```typescript
/**
 * 属性简短描述
 * 类型: xxx
 * 可选值: A | B | C
 * 默认值: xxx
 */
```

**规则**:
1.  使用多行 JSDoc (`/** ... */`)。
2.  **描述**: 第一行简述作用。
3.  **类型**: 如果使用了复杂类型或需要明确说明，使用 `类型: TypeName`。
4.  **可选值**: 枚举类型必填，格式 `可选值: 'a' | 'b'`。
5.  **默认值**: 必填，格式 `默认值: value`。若是继承属性，写 `默认值: 继承自 xxx`。

### 2.2 函数/方法注释

关键业务逻辑函数、公共工具函数必须添加 JSDoc 注释。

**基本格式**:
```typescript
/**
 * 函数功能简述
 * @param {Type} paramName 参数说明
 * @returns {Type} 返回值说明
 */
```

**规则**:
1.  简单的一行函数可省略注释或用单行注释。
2.  复杂逻辑或公共接口使用 JSDoc。
3.  `@param`: 描述参数名、类型及含义。
4.  `@returns`: 描述返回值类型及含义 (如果是 void 可省略)。

### 2.3 变量注释

**规则**:
1.  **普通变量**: 简单变量可不注，或使用单行注释 `// ...` 放在变量声明行上方或右侧。
2.  **关键状态**: 涉及复杂业务状态的变量，建议使用 JSDoc 或详细的单行注释。

### 2.4 类型定义 (Types/Interfaces) 注释

**规则**:
1.  **接口/类型说明**: 使用 JSDoc 说明该 Type/Interface 的用途。
2.  **属性说明**: 建议使用 JSDoc (`/** ... */`) 以便编辑器提示，或使用单行注释。

---

## 3. 示例集合

### 3.1 综合示例 (组件内部)

```typescript
// types.ts
/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户 ID */
  id: number
  /** 用户名 */
  name: string
  /**
   * 用户角色
   * 可选值: 'admin' | 'editor' | 'guest'
   */
  role: 'admin' | 'editor' | 'guest'
}

// my-component.vue (Script Setup)
import { defineProps } from 'vue'
import type { UserInfo } from './types'

// 常量定义
const MAX_ITEM_COUNT = 10

export const myComponentProps = {
  /**
   * 绑定的值
   * 类型: string | number
   * 默认值: ''
   */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /**
   * 按钮类型
   * 可选值: 'primary' | 'success' | 'warning'
   * 默认值: 'primary'
   */
  type: {
    type: String,
    default: 'primary'
  },
  /**
   * 是否禁用
   * 默认值: false
   */
  disabled: Boolean
}

// 变量定义
const isVisible = ref(false)

/**
 * 处理点击事件，提交用户信息
 * @param {UserInfo} user 当前操作的用户
 * @returns {Promise<void>}
 */
const handleSubmit = async (user: UserInfo) => {
  if (user.role === 'guest') {
    return
  }
  // ... logic
}
```

## 输出解释
执行此技能后，代码将符合上述规范：
*   **命名**: 文件、变量、函数严格遵守大小写约定。
*   **注释**: Props、函数、类型定义拥有清晰、标准化的 JSDoc 注释。
*   **一致性**: 整个项目风格统一，便于阅读和文档提取。