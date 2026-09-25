import jsQR from 'jsqr'

/** Demo 的 margin 默认为 0；解码时补充扫码器所需的白色静区，不修改二维码模块像素。 */
export function decodeQr({ data, width, height }: { data: number[]; width: number; height: number }) {
  const border = Math.ceil(Math.max(width, height) / 6)
  const paddedWidth = width + border * 2
  const paddedHeight = height + border * 2
  const padded = new Uint8ClampedArray(paddedWidth * paddedHeight * 4).fill(255)
  for (let y = 0; y < height; y++) {
    padded.set(data.slice(y * width * 4, (y + 1) * width * 4), ((y + border) * paddedWidth + border) * 4)
  }
  return jsQR(padded, paddedWidth, paddedHeight)?.data
}
