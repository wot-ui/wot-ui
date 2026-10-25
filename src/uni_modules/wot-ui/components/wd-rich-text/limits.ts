export type RichTextParseErrorCode = 'INPUT_LIMIT' | 'NODE_LIMIT' | 'DEPTH_LIMIT' | 'OUTPUT_LIMIT'

/** 解析器的资源保护阈值，不代表平台容量；输出大小限制用于防止样式映射过度增加节点数据量。 */
export const richTextLimits = { input: 200000, nodes: 10000, depth: 128, output: 2000000 } as const

export class RichTextParseError extends Error {
  constructor(public code: RichTextParseErrorCode, message: string) {
    super(message)
    this.name = 'RichTextParseError'
  }
}
