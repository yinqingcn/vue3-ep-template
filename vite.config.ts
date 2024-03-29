import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import eslint from 'vite-plugin-eslint'
// 按需引入组件使用
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import Inspect from 'vite-plugin-inspect'
import { buildInfo } from 'git-commit-info-plugin'

import { FileSystemIconLoader } from 'unplugin-icons/loaders'
/**
 * 图标库按需引入
 * 参考链接 https://juejin.cn/post/7062648728405934087
 */
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import dayjs from 'dayjs'
const pkg = require('./package.json')
const { dependencies, devDependencies, name, version } = pkg
// 全局信息
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
    dedupe: [],
    // 解决程序包中package.json配置中的exports 字段
    conditions: [],
    // 解析package.json中字段的优先级
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    // 使Vite通过原始文件路径而不是真正的文件路径确定文件身份
    preserveSymlinks: false,
  },
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    WindiCSS(),
    buildInfo(), // buildInfo(['author','email','commitDate','version','buildDate']) 可以不传参，也可以传这5个中的任意参数，默认全选
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等, 对于项目维护来说，可以不用这个配置，加上这个配置以后，需要在eslint中加入规则，否则会报错
      // imports: ['vue', 'vue-router', 'vuex'],
      // eslintrc: {
      //   enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
      //   filepath: './.eslintrc-auto-import.json', // 生成json文件,eslintrc中引入
      //   globalsPropValue: true
      // },
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver(),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      // 配置完运行以后， 会在根目录生成一个 "components.d.ts"文件，需要在tsconfig.ts的include中加入进去
      resolvers: [
        ElementPlusResolver(), // element-plus按需引入
        // 自动注册图标组件
        IconsResolver({
          // prefix: 'Icon', // 默认是 i, 建议使用 Icon
          // 使用element-plus的图标库
          // 其他图标库请到 https://icon-sets.iconify.design/
          enabledCollections: ['ep'],
          // 标识自定义图标集
          customCollections: ['custom'],
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    // 图标库  https://icones.netlify.app/
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        // 自定义图标，使用方式：@/asstes/svg/icon/xxx.svg， 直接在templae中 <icon-custom-xxx/>
        custom: FileSystemIconLoader('src/assets/svg/icon', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
        // 'custom2': FileSystemIconLoader('src/assets/svg/icon2', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')), 多个集合可以这样添加
      },
    }),
    Inspect(),
  ],
  // 项目根目录
  root: process.cwd(),
  // 项目部署的基础路径  如果作为微应用使用，可以写成  /xxx/  这个 xxx是这个项目的名称
  base: './',
  // 全局常量,如果是对象，需要转化为字符串
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  // 静态资源服务的文件夹 默认就是public 可以不用写
  publicDir: 'public',
  // 存储缓存文件的目录
  cacheDir: 'node_modules/.vite',
  css: {
    // 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
    modules: {},
    /*
     * PostCSS 配置（格式同 postcss.config.js）
     * postcss-load-config 的插件配置
     */
    postcss: {},
    // 指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      scss: {
        // additionalData: `@use '@/styles/base.scss' as *;`,
      },

      // less: {
      //   'primary-color': '#3875FF',
      //   'border-color-base': '#D9D9D9',
      //   'divider-color': '#EBEBEB',
      //   'text-color': '#262626',
      //   'text-color-secondary': '#595959',
      //   'disabled-color': '#bfbfbf',
      //   hack: `hack  @import (reference) "${resolve('src/styles/base.less')}";`
      // }
    },
    // 开发过程中是否启sourcemap
    devSourcemap: true,
  },
  json: {
    // 是否支持从 .json 文件中进行按名导入
    namedExports: true,
    // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，
    stringify: false,
  },
  // 继承自 esbuild 转换选项。最常见的用例是自定义 JSX
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import React from 'react'`,
  },
  // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: 'info',
  // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  clearScreen: false,
  // 加载 .env 文件的目录
  envDir: '',
  // envPrefix开头的环境变量会通过import.meta.env暴露客户端源码
  envPrefix: 'VITE_',
  // 服务
  server: {
    // 服务器主机名
    host: '0.0.0.0',
    open: true,
    // 端口号
    port: 5173,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,

    //  https.createServer()配置项
    //  https: '',

    //  服务器启动时自动在浏览器中打开应用程序。
    //  open: '/docs/index.html',

    // 自定义代理规则
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (proxyPath) => proxyPath.replace(/^\/api/, ''),
      },
      // 正则表达式写法

      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/fallback/, '')
      // }

      // Proxying websockets or socket.io

      // '/socket.io': {
      //   target: 'ws://localhost:3000',
      //   ws: true
      // }
    },
  },
  // 打包配置
  build: {
    // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
    target: 'es2015',
    // 否自动注入 module preload 的 polyfill
    polyfillModulePreload: true,
    // 输出路径
    outDir: 'dist',
    // 生成静态资源的存放路径
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
    chunkSizeWarningLimit: 2000,
    // 构建后是否生成 source map 文件
    // boolean | 'inline' | 'hidden'
    sourcemap: false,
    // 自定义打包配置
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks(id) {
          const splitModules = [
            '@ant-design',
            '@babel',
            '@ctrl',
            '@intlify',
            '@vant',
            '@vue',
            'ant-design-vue',
            'axios',
            'bpmn-js',
            'codemirror',
            'crypto-js',
            'dayjs',
            'echarts',
            'lodash-es',
            'pinia',
            'prettier',
            'qrcode',
            'qs',
            'vant',
            'vue-i18n',
            'vue-router',
            'zrender',
            'element-plus',
          ]
          if (id.includes('node_modules')) {
            const names = id.split('node_modules/')
            const lastPath = names[names.length - 1]
            const [moduleName] = lastPath.split('/')
            if (splitModules.includes(moduleName)) {
              return `_lib_${moduleName.replace('@', '_')}`
            } else {
              return 'vendor'
            }
          }
        },
      },
    },
  },
  // 依赖优化选项
  optimizeDeps: {
    // 检测需要预构建的依赖项
    entries: [],
    // 预构建中强制排除的依赖项
    exclude: ['consolidate'],
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ['ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US'],
    // include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
    // 部署扫描和优化过程中传递给EsBuild
    esbuildOptions: {},
    // 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖
    force: true,
  },
})
