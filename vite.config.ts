import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import Inspect from 'vite-plugin-inspect';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const pathSrc = path.resolve(__dirname, 'src');

// iconify地址： https://icon-sets.iconify.design/
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    Inspect(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
      defaultSFCLang: 'yml', // json(default)、yarml yml json5
    }),
  ],
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
    port: 4231,
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
        secure: false,
        rewrite: (proxyPath) => proxyPath.replace(/^\/api/, ''),
      },
      // 正则表达式写法

      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   secure: false,
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
    // polyfillModulePreload: true, // 已弃用， 现在用下面这个
    modulePreload: {
      polyfill: true,
    },
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
          ];
          if (id.includes('node_modules')) {
            const names = id.split('node_modules/');
            const lastPath = names[names.length - 1];
            const [moduleName] = lastPath.split('/');
            if (splitModules.includes(moduleName)) {
              return `_lib_${moduleName.replace('@', '_')}`;
            } else {
              return 'vendor';
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
    // include: [
    //   "ant-design-vue/es/locale/zh_CN",
    //   "ant-design-vue/es/locale/en_US",
    // ],
    // include: [
    //   "element-plus/lib/locale/lang/zh-cn",
    //   "element-plus/lib/locale/lang/en",
    // ],
    // 部署扫描和优化过程中传递给EsBuild
    esbuildOptions: {},
    // 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖
    force: true,
  },
});
