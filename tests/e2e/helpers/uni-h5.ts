import uniH5Package from '@dcloudio/uni-h5/package.json'
import { test } from '../fixtures/test'

/** 只豁免已在原版运行时复现的版本；升级后自动恢复正常断言要求。 */
export function expectKnownUniH5Failure(reason: string) {
  test.fail(uniH5Package.version === '3.0.0-4080720251210001', `uni-h5 ${uniH5Package.version}: ${reason}`)
}
