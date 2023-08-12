import { createRouter, createWebHashHistory } from 'vue-router'
import { close, start } from '@/config/nprogress'
import useMenuStore from '@/store/modules/menu'

// 定义路由和组件的映射关系
const modules = import.meta.glob('@/views/**/**.vue')

console.log(modules)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

// 防止首次或者刷新界面路由失效问题
let registerRouteFresh = true
console.log(registerRouteFresh)


// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 打开进度条
  console.log(to.path)
  console.log(from)
  start()

  // 菜单信息
  const menuStore = useMenuStore()
  // 如果路由为空，获取菜单数据
  if (menuStore.routers.length == 0) {
    await menuStore.generateRoute()
  }

  next()
})

router.afterEach(() => {
  // 关闭进度条
  close()
})

// 路由跳转失败
router.onError(error => {
  // 关闭进度条
  close()
  console.warn('路由错误', error.message)
})

export default router
