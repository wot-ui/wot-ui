import fs from 'fs'
import path from 'path'

type ThemeVarField = {
  fieldName: string
  comment: string
}

type ThemeVarGroup = {
  typeName: string
  fields: ThemeVarField[]
}

const tsFilePath = path.resolve(__dirname, '../src/uni_modules/wot-ui/components/wd-config-provider/types.ts')
const globalScssPath = path.resolve(__dirname, '../src/uni_modules/wot-ui/styles/variable.scss')
const componentsRootPath = path.resolve(__dirname, '../src/uni_modules/wot-ui/components')

const toCamelCase = (value: string) => {
  const segments = value.split('-').filter(Boolean)
  if (!segments.length) return value
  const [first, ...rest] = segments
  return `${first}${rest.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join('')}`
}

const normalizeComment = (value: string) => value.replace(/\s+/g, ' ').trim()

const parseScssVariableFields = (scssContent: string, captureComment: boolean) => {
  const lines = scssContent.split('\n')
  const fields: ThemeVarField[] = []
  let pendingComment = ''

  lines.forEach((line) => {
    const inlineCommentMatch = line.match(/^\s*\/\/\s*(.+)\s*$/)
    if (captureComment && inlineCommentMatch) {
      pendingComment = normalizeComment(inlineCommentMatch[1])
      return
    }

    const variableMatch = line.match(/^\s*\$([A-Za-z0-9_-]+)\s*:\s*.*?!default;\s*(?:\/\/\s*(.+))?\s*$/)
    if (variableMatch) {
      const variableName = variableMatch[1]
      const inlineComment = variableMatch[2] ? normalizeComment(variableMatch[2]) : ''
      const fieldName = toCamelCase(variableName)
      const comment = captureComment ? inlineComment || pendingComment : ''
      fields.push({ fieldName, comment })
      pendingComment = ''
      return
    }

    if (!line.trim()) {
      pendingComment = ''
    }
  })

  return fields
}

const getComponentScssFiles = () => {
  const entries = fs.readdirSync(componentsRootPath, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('wd-'))
    .map((entry) => path.join(componentsRootPath, entry.name, 'index.scss'))
    .filter((filePath) => fs.existsSync(filePath))
    .sort((a, b) => a.localeCompare(b))
  return files
}

const buildBaseThemeVars = () => {
  const content = fs.readFileSync(globalScssPath, 'utf8')
  const fields = parseScssVariableFields(content, false)
  const fieldMap = new Map<string, ThemeVarField>()
  fields.forEach((field) => {
    if (!fieldMap.has(field.fieldName)) {
      fieldMap.set(field.fieldName, field)
    }
  })
  return Array.from(fieldMap.values()).sort((a, b) => a.fieldName.localeCompare(b.fieldName))
}

const buildComponentThemeVars = () => {
  const groups: ThemeVarGroup[] = []
  const files = getComponentScssFiles()

  files.forEach((filePath) => {
    const componentDirName = path.basename(path.dirname(filePath))
    const componentName = toCamelCase(componentDirName.replace(/^wd-/, ''))
    const typeName = `${componentName}ThemeVars`
    const content = fs.readFileSync(filePath, 'utf8')
    const parsedFields = parseScssVariableFields(content, true)
    const fieldMap = new Map<string, ThemeVarField>()

    parsedFields.forEach((field) => {
      if (!fieldMap.has(field.fieldName)) {
        fieldMap.set(field.fieldName, field)
      }
    })

    const fields = Array.from(fieldMap.values()).sort((a, b) => a.fieldName.localeCompare(b.fieldName))
    if (fields.length) {
      groups.push({ typeName, fields })
    }
  })

  return groups.sort((a, b) => a.typeName.localeCompare(b.typeName))
}

const renderTypeBlock = (typeName: string, fields: ThemeVarField[]) => {
  const lines = fields.map((field) => {
    if (field.comment) {
      return `  ${field.fieldName}?: string // ${field.comment}`
    }
    return `  ${field.fieldName}?: string`
  })
  return `export type ${typeName} = {\n${lines.join('\n')}\n}\n`
}

const generateTSFileContent = (baseFields: ThemeVarField[], componentGroups: ThemeVarGroup[]) => {
  let tsContent = `import type { ExtractPropTypes, PropType, InjectionKey, ComputedRef } from 'vue'
import { makeStringProp, baseProps } from '../common/props'

export type ConfigProviderTheme = 'light' | 'dark' | ''

export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp<ConfigProviderTheme>('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigProviderProvide = {
  themeStyle: ComputedRef<string>
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide> = Symbol('wd-config-provider')

`

  tsContent += `${renderTypeBlock('baseThemeVars', baseFields)}\n`

  componentGroups.forEach((group) => {
    tsContent += `${renderTypeBlock(group.typeName, group.fields)}\n`
  })

  const unionTypes = componentGroups.map((group) => group.typeName)
  if (unionTypes.length) {
    tsContent += `export type ConfigProviderThemeVars = baseThemeVars &\n  ${unionTypes.join(' &\n  ')}\n`
  } else {
    tsContent += 'export type ConfigProviderThemeVars = baseThemeVars\n'
  }

  return tsContent
}

const baseFields = buildBaseThemeVars()
const componentGroups = buildComponentThemeVars()
const tsContent = generateTSFileContent(baseFields, componentGroups)

fs.writeFileSync(tsFilePath, tsContent)

console.log(`TS file generated successfully! base: ${baseFields.length}, components: ${componentGroups.length}`)
