import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', // 指定进度条的父容器
})
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
  },
]
// 导入所有路由文件
// 将modules下的全部路由配置文件加载到routes中
// 如果后面不加  import: 'default',那么就要这么写 const mod = modules[keys].default || {}，不过会提示一个ts语法错误，可以@ts-ignore，但是建议是下面这种写法
const modules = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default' })
Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routes.push(...modList)
})
// 创建路由配置对象
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  // 这里可以根据需求进行权限校验
  next()
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
