/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}
declare module 'virtual:*' {
  const result: any
  export default result
}

declare module '*.less' {
  const less: any
  export default less
}
declare module '*.js' {
  const result: any
  export default result
}
declare module 'nprogress'
// images.d.ts 文件内容
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
