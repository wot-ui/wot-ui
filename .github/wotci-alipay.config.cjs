module.exports = {
  desc: process.env.WOTCI_DESC,
  alipay: {
    appid: process.env.ALIPAY_APPID,
    toolId: process.env.ALIPAY_TOOL_ID,
    privateKey: process.env.ALIPAY_PRIVATE_KEY,
    projectPath: 'dist/build/mp-alipay',
    autoincrement: true
  }
}
