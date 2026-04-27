/**
 * QRCode for JavaScript
 *
 * @version 1.0.0
 * @author davidshimjs, Kazuhiko Arase
 * @license MIT
 *
 * 重构说明：
 * 1. 移除了所有DOM依赖，纯算法实现
 * 2. 添加完整JSDoc注释
 * 3. 修复潜在语法问题
 * 4. 模块化导出
 */

/**
 * 错误纠正等级枚举
 * @enum {number}
 */
const QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}

/**
 * 编码模式枚举
 * @enum {number}
 */
const QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
}

/**
 * 掩码模式枚举
 * @enum {number}
 */
const QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * QR码版本对应的最大数据长度
 * [L, M, Q, H] 四个纠错等级
 */
const QRCodeLimitLength = [
  [17, 14, 11, 7],
  [32, 26, 20, 14],
  [53, 42, 32, 24],
  [78, 62, 46, 34],
  [106, 84, 60, 44],
  [134, 106, 74, 58],
  [154, 122, 86, 64],
  [192, 152, 108, 84],
  [230, 180, 130, 98],
  [271, 213, 151, 119],
  [321, 251, 177, 137],
  [367, 287, 203, 155],
  [425, 331, 241, 177],
  [458, 362, 258, 194],
  [520, 412, 292, 220],
  [586, 450, 322, 250],
  [644, 504, 364, 280],
  [718, 560, 394, 310],
  [792, 624, 442, 338],
  [858, 666, 482, 382],
  [929, 711, 509, 403],
  [1003, 779, 565, 439],
  [1091, 857, 611, 461],
  [1171, 911, 661, 511],
  [1273, 997, 715, 535],
  [1367, 1059, 751, 593],
  [1465, 1125, 805, 625],
  [1528, 1190, 868, 658],
  [1628, 1264, 908, 698],
  [1732, 1370, 982, 742],
  [1840, 1452, 1030, 790],
  [1952, 1538, 1112, 842],
  [2068, 1628, 1168, 898],
  [2188, 1722, 1228, 958],
  [2303, 1809, 1283, 983],
  [2431, 1911, 1351, 1051],
  [2563, 1989, 1423, 1093],
  [2699, 2099, 1499, 1139],
  [2809, 2213, 1579, 1219],
  [2953, 2331, 1663, 1273]
]

class QR8bitByte {
  constructor(data) {
    this.mode = QRMode.MODE_8BIT_BYTE
    this.data = data
    this.parsedData = []
    this._encodeUTF8()
  }

  _encodeUTF8() {
    for (let i = 0, l = this.data.length; i < l; i++) {
      const code = this.data.charCodeAt(i)
      const byteArray = []

      if (code > 0x10000) {
        byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18)
        byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12)
        byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6)
        byteArray[3] = 0x80 | (code & 0x3f)
      } else if (code > 0x800) {
        byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12)
        byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6)
        byteArray[2] = 0x80 | (code & 0x3f)
      } else if (code > 0x80) {
        byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6)
        byteArray[1] = 0x80 | (code & 0x3f)
      } else {
        byteArray[0] = code
      }

      this.parsedData.push(...byteArray)
    }

    if (this.parsedData.length !== this.data.length) {
      this.parsedData.unshift(191, 187, 239)
    }
  }

  getLength() {
    return this.parsedData.length
  }

  write(buffer) {
    for (let i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8)
    }
  }
}

class QRBitBuffer {
  constructor() {
    this.buffer = []
    this.length = 0
  }

  get(index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) === 1
  }

  put(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  }

  getLengthInBits() {
    return this.length
  }

  putBit(bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8
    }
    this.length++
  }
}

const QRMath = {
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256),

  init() {
    for (let i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i
    }
    for (let i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8]
    }

    for (let i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i
    }
  },

  glog(n) {
    if (n < 1) {
      throw new Error(`glog(${n})`)
    }
    return QRMath.LOG_TABLE[n]
  },

  gexp(n) {
    while (n < 0) n += 255
    while (n >= 256) n -= 255
    return QRMath.EXP_TABLE[n]
  }
}

QRMath.init()

class QRPolynomial {
  constructor(num, shift) {
    if (num.length === undefined) {
      throw new Error(`${num.length}/${shift}`)
    }

    let offset = 0
    while (offset < num.length && num[offset] === 0) {
      offset++
    }

    this.num = new Array(num.length - offset + shift)
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset]
    }
  }

  get(index) {
    return this.num[index]
  }

  getLength() {
    return this.num.length
  }

  multiply(other) {
    const num = new Array(this.getLength() + other.getLength() - 1)
    for (let i = 0; i < this.getLength(); i++) {
      const ai = QRMath.glog(this.get(i))
      for (let j = 0; j < other.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(ai + QRMath.glog(other.get(j)))
      }
    }
    return new QRPolynomial(num, 0)
  }

  mod(other) {
    if (this.getLength() - other.getLength() < 0) {
      return this
    }

    const ratio = QRMath.glog(this.get(0)) - QRMath.glog(other.get(0))
    const num = new Array(this.getLength())
    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i)
    }

    for (let i = 0; i < other.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(other.get(i)) + ratio)
    }

    return new QRPolynomial(num, 0).mod(other)
  }
}

class QRRSBlock {
  constructor(totalCount, dataCount) {
    this.totalCount = totalCount
    this.dataCount = dataCount
  }

  static getRSBlocks(typeNumber, errorCorrectLevel) {
    const rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel)
    if (!rsBlock) {
      throw new Error(`bad rs block @ typeNumber:${typeNumber}/errorCorrectLevel:${errorCorrectLevel}`)
    }

    const length = rsBlock.length / 3
    const list = []

    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3]
      const totalCount = rsBlock[i * 3 + 1]
      const dataCount = rsBlock[i * 3 + 2]

      for (let j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount))
      }
    }

    return list
  }

  static getRsBlockTable(typeNumber, errorCorrectLevel) {
    const index = (typeNumber - 1) * 4
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[index]
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[index + 1]
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[index + 2]
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[index + 3]
      default:
        return undefined
    }
  }
}

QRRSBlock.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [4, 33, 11, 1, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [2, 101, 81, 2, 102, 82],
  [2, 80, 50, 2, 81, 51],
  [4, 50, 22, 2, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [3, 58, 36, 2, 59, 37],
  [4, 46, 20, 4, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [2, 133, 107, 2, 134, 108],
  [4, 59, 37, 2, 60, 38],
  [6, 43, 19, 2, 44, 20],
  [12, 33, 11, 4, 34, 12],
  [2, 145, 115, 3, 146, 116],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [11, 36, 12, 5, 37, 13],
  [4, 109, 87],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [11, 36, 12, 7, 37, 13],
  [3, 135, 107, 1, 136, 108],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [3, 36, 12, 13, 37, 13],
  [5, 98, 78, 1, 99, 79],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 13, 37, 13],
  [1, 121, 97, 5, 122, 98],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12, 17, 37, 13],
  [5, 107, 87, 1, 108, 88],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 120, 98, 5, 121, 99],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 113, 89, 1, 114, 90],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 107, 85, 4, 108, 86],
  [3, 67, 41, 11, 68, 42],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 116, 92, 4, 117, 93],
  [17, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 111, 87, 4, 112, 88],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 111, 87, 7, 112, 88],
  [7, 74, 46, 16, 75, 47],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 121, 97, 5, 122, 98],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 117, 93, 4, 118, 94],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 106, 84, 4, 107, 85],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 114, 90, 2, 115, 91],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 122, 98, 4, 123, 99],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 117, 93, 10, 118, 94],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 116, 92, 7, 117, 93],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 115, 91, 10, 116, 92],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 115, 91, 3, 116, 92],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 115, 91],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 115, 91, 1, 116, 92],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 115, 91, 6, 116, 92],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 121, 97, 7, 122, 98],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 121, 97, 14, 122, 98],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 122, 98, 4, 123, 99],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 122, 98, 18, 123, 99],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 117, 93, 4, 118, 94],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 118, 94, 6, 119, 95],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
]

const QRUtil = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
  G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
  G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),

  getBCHTypeInfo(data) {
    let d = data << 10
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15))
    }
    return ((data << 10) | d) ^ QRUtil.G15_MASK
  },

  getBCHTypeNumber(data) {
    let d = data << 12
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18))
    }
    return (data << 12) | d
  },

  getBCHDigit(data) {
    let digit = 0
    while (data !== 0) {
      digit++
      data >>>= 1
    }
    return digit
  },

  getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]
  },

  getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 === 0
      case QRMaskPattern.PATTERN001:
        return i % 2 === 0
      case QRMaskPattern.PATTERN010:
        return j % 3 === 0
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 === 0
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
      case QRMaskPattern.PATTERN101:
        return ((i * j) % 2) + ((i * j) % 3) === 0
      case QRMaskPattern.PATTERN110:
        return (((i * j) % 2) + ((i * j) % 3)) % 2 === 0
      case QRMaskPattern.PATTERN111:
        return (((i * j) % 3) + ((i + j) % 2)) % 2 === 0
      default:
        throw new Error(`bad maskPattern:${maskPattern}`)
    }
  },

  getErrorCorrectPolynomial(errorCorrectLength) {
    let a = new QRPolynomial([1], 0)
    for (let i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0))
    }
    return a
  },

  getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10
        case QRMode.MODE_ALPHA_NUM:
          return 9
        case QRMode.MODE_8BIT_BYTE:
          return 8
        case QRMode.MODE_KANJI:
          return 8
        default:
          throw new Error(`mode:${mode}`)
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12
        case QRMode.MODE_ALPHA_NUM:
          return 11
        case QRMode.MODE_8BIT_BYTE:
          return 16
        case QRMode.MODE_KANJI:
          return 10
        default:
          throw new Error(`mode:${mode}`)
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14
        case QRMode.MODE_ALPHA_NUM:
          return 13
        case QRMode.MODE_8BIT_BYTE:
          return 16
        case QRMode.MODE_KANJI:
          return 12
        default:
          throw new Error(`mode:${mode}`)
      }
    } else {
      throw new Error(`type:${type}`)
    }
  },

  getLostPoint(qrCode) {
    const moduleCount = qrCode.getModuleCount()
    let lostPoint = 0

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0
        const dark = qrCode.isDark(row, col)

        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) continue
          for (let c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) continue
            if (r === 0 && c === 0) continue
            if (dark === qrCode.isDark(row + r, col + c)) {
              sameCount++
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5
        }
      }
    }

    for (let row = 0; row < moduleCount - 1; row++) {
      for (let col = 0; col < moduleCount - 1; col++) {
        let count = 0
        if (qrCode.isDark(row, col)) count++
        if (qrCode.isDark(row + 1, col)) count++
        if (qrCode.isDark(row, col + 1)) count++
        if (qrCode.isDark(row + 1, col + 1)) count++
        if (count === 0 || count === 4) {
          lostPoint += 3
        }
      }
    }

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount - 6; col++) {
        if (
          qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)
        ) {
          lostPoint += 40
        }
      }
    }

    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount - 6; row++) {
        if (
          qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)
        ) {
          lostPoint += 40
        }
      }
    }

    let darkCount = 0
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++
        }
      }
    }

    const ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5
    lostPoint += ratio * 10

    return lostPoint
  }
}

class QRCodeModel {
  constructor(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber
    this.errorCorrectLevel = errorCorrectLevel
    this.modules = null
    this.moduleCount = 0
    this.dataCache = null
    this.dataList = []
  }

  addData(data) {
    const newData = new QR8bitByte(data)
    this.dataList.push(newData)
    this.dataCache = null
  }

  isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(`${row},${col}`)
    }
    return this.modules[row][col]
  }

  getModuleCount() {
    return this.moduleCount
  }

  make() {
    this.makeImpl(false, this.getBestMaskPattern())
  }

  makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17
    this.modules = new Array(this.moduleCount)

    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount)
      for (let col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null
      }
    }

    this.setupPositionProbePattern(0, 0)
    this.setupPositionProbePattern(this.moduleCount - 7, 0)
    this.setupPositionProbePattern(0, this.moduleCount - 7)
    this.setupPositionAdjustPattern()
    this.setupTimingPattern()
    this.setupTypeInfo(test, maskPattern)

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test)
    }

    if (this.dataCache === null) {
      this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)
    }

    this.mapData(this.dataCache, maskPattern)
  }

  setupPositionProbePattern(row, col) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue

        const isBorder =
          (0 <= r && r <= 6 && (c === 0 || c === 6)) || (0 <= c && c <= 6 && (r === 0 || r === 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)

        this.modules[row + r][col + c] = isBorder
      }
    }
  }

  getBestMaskPattern() {
    let minLostPoint = 0
    let pattern = 0

    for (let i = 0; i < 8; i++) {
      this.makeImpl(true, i)
      const lostPoint = QRUtil.getLostPoint(this)

      if (i === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint
        pattern = i
      }
    }

    return pattern
  }

  setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] !== null) continue
      this.modules[r][6] = r % 2 === 0
    }

    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] !== null) continue
      this.modules[6][c] = c % 2 === 0
    }
  }

  setupPositionAdjustPattern() {
    const pos = QRUtil.getPatternPosition(this.typeNumber)

    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i]
        const col = pos[j]

        if (this.modules[row][col] !== null) continue

        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const isBorder = r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)
            this.modules[row + r][col + c] = isBorder
          }
        }
      }
    }
  }

  setupTypeNumber(test) {
    const bits = QRUtil.getBCHTypeNumber(this.typeNumber)

    for (let i = 0; i < 18; i++) {
      const mod = !test && ((bits >> i) & 1) === 1
      this.modules[Math.floor(i / 3)][(i % 3) + this.moduleCount - 8 - 3] = mod
      this.modules[(i % 3) + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod
    }
  }

  setupTypeInfo(test, maskPattern) {
    const data = (this.errorCorrectLevel << 3) | maskPattern
    const bits = QRUtil.getBCHTypeInfo(data)

    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) === 1
      if (i < 6) {
        this.modules[i][8] = mod
      } else if (i < 8) {
        this.modules[i + 1][8] = mod
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod
      }
    }

    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) === 1
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod
      } else {
        this.modules[8][15 - i - 1] = mod
      }
    }

    this.modules[this.moduleCount - 8][8] = !test
  }

  mapData(data, maskPattern) {
    let inc = -1
    let row = this.moduleCount - 1
    let bitIndex = 7
    let byteIndex = 0

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--

      while (row >= 0 && row < this.moduleCount) {
        for (let c = 0; c < 2; c++) {
          if (this.modules[row][col - c] === null) {
            let dark = false

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >>> bitIndex) & 1) === 1
            }

            const mask = QRUtil.getMask(maskPattern, row, col - c)
            if (mask) {
              dark = !dark
            }

            this.modules[row][col - c] = dark

            bitIndex--
            if (bitIndex === -1) {
              byteIndex++
              bitIndex = 7
            }
          }
        }

        row += inc
      }

      row -= inc
      inc = -inc
    }
  }

  static createData(typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel)
    const buffer = new QRBitBuffer()

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      buffer.put(data.mode, 4)
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber))
      data.write(buffer)
    }

    let totalDataCount = 0
    for (let i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error(`code length overflow. (${buffer.getLengthInBits()}>${totalDataCount * 8})`)
    }

    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4)
    }

    while (buffer.getLengthInBits() % 8 !== 0) {
      buffer.putBit(false)
    }

    while (buffer.getLengthInBits() < totalDataCount * 8) {
      buffer.put(QRCodeModel.PAD0, 8)
      if (buffer.getLengthInBits() >= totalDataCount * 8) break
      buffer.put(QRCodeModel.PAD1, 8)
    }

    return QRCodeModel.createBytes(buffer, rsBlocks)
  }

  static createBytes(buffer, rsBlocks) {
    let offset = 0
    let maxDcCount = 0
    let maxEcCount = 0

    const dcdata = new Array(rsBlocks.length)
    const ecdata = new Array(rsBlocks.length)

    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount
      const ecCount = rsBlocks[r].totalCount - dcCount

      maxDcCount = Math.max(maxDcCount, dcCount)
      maxEcCount = Math.max(maxEcCount, ecCount)

      dcdata[r] = new Array(dcCount)
      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset]
      }
      offset += dcCount

      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount)
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1)
      const modPoly = rawPoly.mod(rsPoly)

      ecdata[r] = new Array(rsPoly.getLength() - 1)
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0
      }
    }

    let totalCodeCount = 0
    for (let i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount
    }

    const data = new Array(totalCodeCount)
    let index = 0

    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i]
        }
      }
    }

    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i]
        }
      }
    }

    return data
  }
}

QRCodeModel.PAD0 = 0xec
QRCodeModel.PAD1 = 0x11

function getUTF8Length(text) {
  const replacedText = encodeURI(text)
    .toString()
    .replace(/%[0-9a-fA-F]{2}/g, 'a')
  return replacedText.length + (replacedText.length !== text.length ? 3 : 0)
}

function getTypeNumber(text, correctLevel) {
  const length = getUTF8Length(text)
  let type = 1

  for (let i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
    let limit = 0

    switch (correctLevel) {
      case QRErrorCorrectLevel.L:
        limit = QRCodeLimitLength[i][0]
        break
      case QRErrorCorrectLevel.M:
        limit = QRCodeLimitLength[i][1]
        break
      case QRErrorCorrectLevel.Q:
        limit = QRCodeLimitLength[i][2]
        break
      case QRErrorCorrectLevel.H:
        limit = QRCodeLimitLength[i][3]
        break
    }

    if (length <= limit) {
      break
    } else {
      type++
    }
  }

  if (type > QRCodeLimitLength.length) {
    throw new Error('Too long data')
  }

  return type
}

function createQRCodeData(text, options = {}) {
  const { typeNumber = getTypeNumber(text, QRErrorCorrectLevel.H), errorCorrectLevel = QRErrorCorrectLevel.H } = options
  const qr = new QRCodeModel(typeNumber, errorCorrectLevel)
  qr.addData(text)
  qr.make()
  return qr.modules
}

function generateQRCode(text, options = {}) {
  const { typeNumber = getTypeNumber(text, QRErrorCorrectLevel.H), errorCorrectLevel = QRErrorCorrectLevel.H } = options
  const qr = new QRCodeModel(typeNumber, errorCorrectLevel)
  qr.addData(text)
  qr.make()

  return {
    modules: qr.modules,
    moduleCount: qr.getModuleCount(),
    typeNumber,
    errorCorrectLevel
  }
}

export {
  QRCodeModel,
  QR8bitByte,
  QRBitBuffer,
  QRPolynomial,
  QRRSBlock,
  QRMath,
  QRUtil,
  QRMode,
  QRErrorCorrectLevel,
  QRMaskPattern,
  getTypeNumber,
  getUTF8Length,
  createQRCodeData,
  generateQRCode
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QRCodeModel,
    QR8bitByte,
    QRBitBuffer,
    QRPolynomial,
    QRRSBlock,
    QRMath,
    QRUtil,
    QRMode,
    QRErrorCorrectLevel,
    QRMaskPattern,
    getTypeNumber,
    getUTF8Length,
    createQRCodeData,
    generateQRCode
  }
}
