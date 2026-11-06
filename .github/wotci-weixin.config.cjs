module.exports = {
  version: process.env.WOTCI_VERSION,
  desc: process.env.WOTCI_DESC,
  weixin: {
    appid: process.env.WEIXIN_APPID,
    privateKeyPath: process.env.WEIXIN_PRIVATE_KEY_PATH,
    projectPath: 'dist/build/mp-weixin',
    setting: {
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      minify: true
    }
  }
}
