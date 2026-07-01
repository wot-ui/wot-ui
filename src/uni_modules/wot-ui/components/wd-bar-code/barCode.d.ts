declare module './barCode.js' {
  const JsBarcode: (canvas: any, value: string, options?: Record<string, any>) => void
  export default JsBarcode
}
