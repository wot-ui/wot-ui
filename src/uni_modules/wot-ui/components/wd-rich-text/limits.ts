export type RichTextParseErrorCode = 'INPUT_LIMIT' | 'NODE_LIMIT' | 'DEPTH_LIMIT' | 'OUTPUT_LIMIT'

/** 暂定保护阈值，不代表平台容量；输出预算同时防止样式映射放大节点数据。 */
export const richTextLimits = { input: 200000, nodes: 10000, depth: 128, output: 2000000 } as const

export class RichTextParseError extends Error {
  constructor(public code: RichTextParseErrorCode, message: string) {
    super(message)
    this.name = 'RichTextParseError'
  }
}
