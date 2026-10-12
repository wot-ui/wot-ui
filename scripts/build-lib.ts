import fs from 'fs'
import path from 'path'

const src = path.resolve(__dirname, '../src/uni_modules/wot-ui')
const libDir = path.resolve(__dirname, '../lib')
fs.mkdirSync(libDir, { recursive: true })

const copyComponents = function (srcPath: string, tarPath: string, filter: string[] = []) {
  fs.mkdir(tarPath, (err) => {})
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        const filedir = path.join(srcPath, filename)
        const filterFlag = filter.some((item) => {
          return path.extname(filename).toLowerCase() === item && filename !== 'changelog.md'
        })
        if (!filterFlag) {
          fs.stat(filedir, function (errs, stats) {
            const isFile = stats.isFile()
            if (isFile) {
              const destPath = path.join(tarPath, filename)
              fs.copyFile(filedir, destPath, (err) => {})
            } else {
              const tarFiledir = path.join(tarPath, filename)
              copyComponents(filedir, tarFiledir, filter)
            }
          })
        }
      })
    } else {
      if (err) console.error(err)
    }
  })
}

copyComponents(src, libDir, ['.md'])

const copyFile = function (srcPath: string, tarPath: string) {
  const isFile = fs.statSync(srcPath).isFile()
  if (isFile) {
    fs.copyFile(srcPath, tarPath, (err) => {})
  }
}

const readme = path.resolve(__dirname, '../README.md')
const license = path.resolve(__dirname, '../LICENSE')
// npm 展示 README 时使用仓库图片的绝对地址。
const readmeContent = fs
  .readFileSync(readme, 'utf8')
  .replaceAll('./.github/images/', 'https://raw.githubusercontent.com/wot-ui/wot-ui/main/.github/images/')
fs.writeFileSync(path.join(libDir, 'README.md'), readmeContent)
copyFile(license, path.join(libDir, 'LICENSE'))
