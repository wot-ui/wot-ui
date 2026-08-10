import { mount } from '@vue/test-utils'
import jsQR from 'jsqr'
import { createCipheriv, createDecipheriv, createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import WdQrCode from '@/uni_modules/wot-ui/components/wd-qr-code/wd-qr-code.vue'
import { generateQRCode, QRErrorCorrectLevel } from '@/uni_modules/wot-ui/components/wd-qr-code/qrcode'

const drawMock = vi.fn()
const createLinearGradientMock = vi.fn(() => ({
  addColorStop: vi.fn()
}))

function createCanvasContextMock() {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    clip: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: createLinearGradientMock,
    draw: drawMock,
    scale: vi.fn(),
    setFillStyle: vi.fn(),
    setStrokeStyle: vi.fn(),
    setLineWidth: vi.fn()
  }
}

function getExpectedCanvasSize(size: number) {
  const shouldUsePixelRatio = process.env.UNI_PLATFORM === 'mp-alipay'
  return size * (shouldUsePixelRatio ? uni.getSystemInfoSync().pixelRatio || 1 : 1)
}

function renderModulesToImageData(modules: boolean[][], moduleScale = 8, quietZone = 4) {
  const moduleCount = modules.length
  const imageSize = (moduleCount + quietZone * 2) * moduleScale
  const data = new Uint8ClampedArray(imageSize * imageSize * 4)

  for (let y = 0; y < imageSize; y++) {
    for (let x = 0; x < imageSize; x++) {
      const moduleRow = Math.floor(y / moduleScale) - quietZone
      const moduleCol = Math.floor(x / moduleScale) - quietZone
      const isDark = moduleRow >= 0 && moduleRow < moduleCount && moduleCol >= 0 && moduleCol < moduleCount && modules[moduleRow][moduleCol]
      const color = isDark ? 0 : 255
      const offset = (y * imageSize + x) * 4

      data[offset] = color
      data[offset + 1] = color
      data[offset + 2] = color
      data[offset + 3] = 255
    }
  }

  return {
    data,
    width: imageSize,
    height: imageSize
  }
}

function decodeQRCodeText(text: string, errorCorrectLevel = QRErrorCorrectLevel.H) {
  const qrCode = generateQRCode(text, { errorCorrectLevel })
  const imageData = renderModulesToImageData(qrCode.modules)
  const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'dontInvert'
  })

  return decoded?.data
}

function toBase64Url(value: Buffer) {
  return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='), 'base64')
}

function getEncryptionKey(label: string) {
  return createHash('sha256').update(`wd-qr-code:${label}`).digest()
}

function encryptAesGcm(text: string) {
  const iv = Buffer.from('123456789012')
  const cipher = createCipheriv('aes-256-gcm', getEncryptionKey('gcm'), iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `gcm.${toBase64Url(Buffer.concat([iv, authTag, encrypted]))}`
}

function decryptAesGcm(payload: string) {
  const data = fromBase64Url(payload.replace(/^gcm\./, ''))
  const iv = data.subarray(0, 12)
  const authTag = data.subarray(12, 28)
  const encrypted = data.subarray(28)
  const decipher = createDecipheriv('aes-256-gcm', getEncryptionKey('gcm'), iv)

  decipher.setAuthTag(authTag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

function encryptAesCbc(text: string) {
  const iv = Buffer.from('1234567890abcdef')
  const cipher = createCipheriv('aes-256-cbc', getEncryptionKey('cbc'), iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])

  return `cbc.${Buffer.concat([iv, encrypted]).toString('hex')}`
}

function decryptAesCbc(payload: string) {
  const data = Buffer.from(payload.replace(/^cbc\./, ''), 'hex')
  const iv = data.subarray(0, 16)
  const encrypted = data.subarray(16)
  const decipher = createDecipheriv('aes-256-cbc', getEncryptionKey('cbc'), iv)

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

const errorCorrectLevels = [
  ['L', QRErrorCorrectLevel.L],
  ['M', QRErrorCorrectLevel.M],
  ['Q', QRErrorCorrectLevel.Q],
  ['H', QRErrorCorrectLevel.H]
] as const

const closedLoopCases = [
  ['uuid with H error correction', '66d1a39d-7535-41bc-9a5b-469715a1a38e', QRErrorCorrectLevel.H],
  ['website url', 'https://wot-ui.cn/component/qr-code.html', QRErrorCorrectLevel.M],
  ['url with query', 'https://example.com/search?q=wot-ui&from=qr-code#section-1', QRErrorCorrectLevel.Q],
  ['mailto url', 'mailto:support@example.com?subject=wot-ui-qr-code', QRErrorCorrectLevel.M],
  ['telephone url', 'tel:+8613800138000', QRErrorCorrectLevel.L],
  ['sms url', 'smsto:+8613800138000:Wot UI QR code test', QRErrorCorrectLevel.M],
  ['geo location', 'geo:31.2304,121.4737?q=People%27s%20Square', QRErrorCorrectLevel.M],
  ['ipv6 url', 'https://[2001:db8::1]/qr-code?mode=test', QRErrorCorrectLevel.Q],
  ['international url', 'https://例子.测试/二维码?q=你好', QRErrorCorrectLevel.H],
  ['deep link url', 'wotui://qr-code/detail?id=66d1a39d-7535-41bc-9a5b-469715a1a38e', QRErrorCorrectLevel.Q],
  ['data url', 'data:text/plain;charset=utf-8,Wot%20UI%20QR%20Code', QRErrorCorrectLevel.M],
  ['wifi payload', 'WIFI:T:WPA;S:wot-ui-demo;P:pa55word123;;', QRErrorCorrectLevel.Q],
  ['wifi escaped payload', 'WIFI:T:WPA;S:wot\\;ui\\:demo;P:pa\\\\55word123;;', QRErrorCorrectLevel.Q],
  ['otpauth payload', 'otpauth://totp/WotUI:demo@example.com?secret=JBSWY3DPEHPK3PXP&issuer=WotUI', QRErrorCorrectLevel.M],
  ['mecard payload', 'MECARD:N:张三,李四;TEL:+8613800138000;EMAIL:zhangsan@example.com;NOTE:Wot UI QR;;', QRErrorCorrectLevel.H],
  ['vcard payload', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Wot UI\r\nTEL:+8613800138000\r\nEMAIL:support@example.com\r\nEND:VCARD', QRErrorCorrectLevel.Q],
  [
    'calendar payload',
    'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nSUMMARY:Wot UI QR\r\nDTSTART:20260101T090000Z\r\nEND:VEVENT\r\nEND:VCALENDAR',
    QRErrorCorrectLevel.H
  ],
  ['json payload', '{"id":"66d1a39d-7535-41bc-9a5b-469715a1a38e","scope":"qr-code","enabled":true}', QRErrorCorrectLevel.Q],
  ['xml payload', '<qr-code><id>66d1a39d-7535-41bc-9a5b-469715a1a38e</id><enabled>true</enabled></qr-code>', QRErrorCorrectLevel.Q],
  ['csv payload', 'id,name,enabled\r\n66d1a39d-7535-41bc-9a5b-469715a1a38e,Wot UI,true', QRErrorCorrectLevel.M],
  ['chinese text', '你好，Wot UI 二维码组件', QRErrorCorrectLevel.H],
  ['japanese text', 'こんにちは、Wot UI QRコード', QRErrorCorrectLevel.H],
  ['emoji text', 'QR 😀😃😄 unicode test', QRErrorCorrectLevel.Q],
  ['emoji with zero width joiner', '👨‍👩‍👧‍👦 QR code', QRErrorCorrectLevel.H],
  ['combining characters', 'Cafe\u0301 e\u0301lan\u0301 Wot UI', QRErrorCorrectLevel.Q],
  ['numeric text', '012345678901234567890123456789', QRErrorCorrectLevel.L],
  ['whitespace text', 'line one\nline two\twith tab and trailing spaces  ', QRErrorCorrectLevel.M],
  ['windows line endings', 'line one\r\nline two\r\nline three', QRErrorCorrectLevel.M],
  ['mixed symbols', 'Wot UI QR: 1234-ABCD_~!*()[]{}', QRErrorCorrectLevel.M],
  ['long text', 'Wot UI QR Code closed-loop scan test with a longer payload for version auto detection.', QRErrorCorrectLevel.Q]
] as const

const crossLevelCases = [
  '66d1a39d-7535-41bc-9a5b-469715a1a38e',
  'https://wot-ui.cn/component/qr-code.html',
  '你好，Wot UI 二维码组件',
  'QR 😀 unicode'
].flatMap((text) => errorCorrectLevels.map(([levelName, errorCorrectLevel]) => [`${text} ${levelName}`, text, errorCorrectLevel] as const))

const encryptedRoundTripCases = [
  ['aes-gcm short L', 'short', QRErrorCorrectLevel.L, encryptAesGcm, decryptAesGcm],
  ['aes-gcm uuid M', '66d1a39d-7535-41bc-9a5b-469715a1a38e', QRErrorCorrectLevel.M, encryptAesGcm, decryptAesGcm],
  ['aes-gcm unicode Q', '你好，Wot UI QR 😀 unicode payload', QRErrorCorrectLevel.Q, encryptAesGcm, decryptAesGcm],
  ['aes-gcm medium H', 'gcm-high-correction-'.repeat(4), QRErrorCorrectLevel.H, encryptAesGcm, decryptAesGcm],
  ['aes-cbc short L', 'short', QRErrorCorrectLevel.L, encryptAesCbc, decryptAesCbc],
  ['aes-cbc url M', 'https://wot-ui.cn/component/qr-code.html?token=encrypted', QRErrorCorrectLevel.M, encryptAesCbc, decryptAesCbc],
  ['aes-cbc unicode Q', '多语言 encrypted payload こんにちは QR', QRErrorCorrectLevel.Q, encryptAesCbc, decryptAesCbc],
  ['aes-cbc medium H', 'cbc-high-correction-'.repeat(4), QRErrorCorrectLevel.H, encryptAesCbc, decryptAesCbc]
] as const

const lengthRoundTripCases = [
  ['empty', '', QRErrorCorrectLevel.L],
  ['one character', 'a', QRErrorCorrectLevel.H],
  ['version 1 H boundary', 'a'.repeat(7), QRErrorCorrectLevel.H],
  ['version 2 H boundary', 'a'.repeat(14), QRErrorCorrectLevel.H],
  ['version 5 H boundary', 'a'.repeat(44), QRErrorCorrectLevel.H],
  ['medium L payload', 'm'.repeat(180), QRErrorCorrectLevel.L],
  ['medium M payload', 'm'.repeat(120), QRErrorCorrectLevel.M],
  ['medium Q payload', 'q'.repeat(90), QRErrorCorrectLevel.Q],
  ['medium H payload', 'h'.repeat(70), QRErrorCorrectLevel.H],
  ['long L payload', 'l'.repeat(700), QRErrorCorrectLevel.L],
  ['long M payload', 'm'.repeat(500), QRErrorCorrectLevel.M],
  ['long Q payload', 'q'.repeat(350), QRErrorCorrectLevel.Q],
  ['long H payload', 'h'.repeat(250), QRErrorCorrectLevel.H]
] as const

beforeAll(() => {
  ;(globalThis as any).uni = {
    ...(globalThis as any).uni,
    createCanvasContext: vi.fn(() => createCanvasContextMock()),
    canvasToTempFilePath: vi.fn((options: Record<string, any>) => {
      options.success?.({ tempFilePath: '/tmp/wd-qr-code.png', filePath: '/tmp/wd-qr-code.png' })
    }),
    getImageInfo: vi.fn((options: Record<string, any>) => {
      options.success?.({ path: options.src })
    })
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('WdQrCode', () => {
  test('二维码算法使用 ESM 命名导出', () => {
    const result = generateQRCode('https://wot-ui.cn', {
      errorCorrectLevel: QRErrorCorrectLevel.M
    })

    expect(result.moduleCount).toBeGreaterThan(0)
    expect(result.modules).toHaveLength(result.moduleCount)
    expect(result.errorCorrectLevel).toBe(QRErrorCorrectLevel.M)
  })

  test.each([...closedLoopCases, ...crossLevelCases])('生成的二维码可以被通用解码器识别: %s', (_name, text, errorCorrectLevel) => {
    expect(decodeQRCodeText(text, errorCorrectLevel)).toBe(text)
  })

  test.each(encryptedRoundTripCases)('加密内容生成二维码后可以扫码并解密还原: %s', (_name, text, errorCorrectLevel, encrypt, decrypt) => {
    const encryptedText = encrypt(text)
    const decodedText = decodeQRCodeText(encryptedText, errorCorrectLevel)

    expect(decodedText).toBe(encryptedText)
    expect(decrypt(decodedText || '')).toBe(text)
  })

  test.each(lengthRoundTripCases)('不同长度字符串可以生成可识别二维码: %s', (_name, text, errorCorrectLevel) => {
    expect(decodeQRCodeText(text, errorCorrectLevel)).toBe(text)
  })

  test('UUID 使用 H 纠错等级时可以用 version 5 生成可识别二维码', () => {
    const text = '66d1a39d-7535-41bc-9a5b-469715a1a38e'
    const qrCode = generateQRCode(text, {
      typeNumber: 5,
      errorCorrectLevel: QRErrorCorrectLevel.H
    })
    const imageData = renderModulesToImageData(qrCode.modules)
    const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    })

    expect(qrCode.moduleCount).toBe(37)
    expect(decoded?.data).toBe(text)
  })

  test('指定过小版本号时抛出容量溢出错误', () => {
    expect(() =>
      generateQRCode('66d1a39d-7535-41bc-9a5b-469715a1a38e', {
        typeNumber: 4,
        errorCorrectLevel: QRErrorCorrectLevel.H
      })
    ).toThrow(/code length overflow/)
  })

  test('超过 QRCode 最大容量时抛出错误', () => {
    expect(() =>
      generateQRCode('a'.repeat(3000), {
        errorCorrectLevel: QRErrorCorrectLevel.H
      })
    ).toThrow('Too long data')
  })

  test('二维码算法不包含 CommonJS 导出', () => {
    const source = readFileSync(resolve('src/uni_modules/wot-ui/components/wd-qr-code/qrcode.ts'), 'utf8')

    expect(source).not.toMatch(/\bmodule\.exports\b/)
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn'
      }
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(wrapper.classes()).toContain('wd-qr-code')
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.attributes('id')).toBeTruthy()
    expect(canvas.attributes('canvas-id')).toBe(canvas.attributes('id'))
    const expectedCanvasSize = String(getExpectedCanvasSize(200))
    expect(canvas.attributes('width')).toBe(expectedCanvasSize)
    expect(canvas.attributes('height')).toBe(expectedCanvasSize)
    expect(vi.mocked(uni.createCanvasContext).mock.calls[0][0]).toBe(canvas.attributes('id'))
    expect(drawMock).toHaveBeenCalledWith(false, expect.any(Function))

    const context = vi.mocked(uni.createCanvasContext).mock.results[0].value as ReturnType<typeof createCanvasContextMock>
    // 默认方块按连续区间合并绘制，避免支付宝模拟器逐码点传递 Canvas 指令。
    expect(context.fillRect.mock.calls.length).toBeLessThan(300)
  })

  test('圆角码点使用单次路径批量填充', async () => {
    mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn',
        dotType: 'rounded'
      }
    })

    await Promise.resolve()
    await Promise.resolve()

    const context = vi.mocked(uni.createCanvasContext).mock.results[0].value as ReturnType<typeof createCanvasContextMock>
    expect(context.beginPath).toHaveBeenCalledTimes(1)
    expect(context.fill).toHaveBeenCalledTimes(1)
  })

  test('点击时触发 click 事件', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('支持导出二维码图片', async () => {
    const wrapper = mount(WdQrCode, {
      props: {
        text: 'https://wot-ui.cn',
        enableGradient: true,
        gradientColors: ['#111111', '#999999']
      }
    })

    await Promise.resolve()
    const tempFilePath = await (wrapper.vm as any).exportImage()
    const exportOptions = vi.mocked(uni.canvasToTempFilePath).mock.calls[0][0]

    expect(tempFilePath).toBe('/tmp/wd-qr-code.png')
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
    expect(exportOptions).toMatchObject({
      width: 200,
      height: 200,
      destWidth: 400,
      destHeight: 400
    })
    expect(createLinearGradientMock).toHaveBeenCalled()
  })
})
