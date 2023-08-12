import { createRouter, createWebHashHistory } from 'vue-router'
import { close, start } from '@/config/nprogress'
import useMenuStore from '@/store/modules/menu'

// 定义路由和组件的映射关系
const modules = import.meta.glob('@/views/**/**.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          icon: 'House',
          title: '首页',
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

// 防止首次或者刷新界面路由失效问题
let registerRouteFresh = true

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  console.log(from)
  // 打开进度条
  start()

  // 菜单信息
  const menuStore = useMenuStore()
  // 如果路由为空，获取菜单数据
  if (menuStore.routers.length == 0) {
    await menuStore.generateRoute()
  }

  // 生成动态路由
  menuStore.routers.forEach((item: any) => {
    // 组装动态路由的地址
    let myRoute: any = {}
    myRoute = {
      path: item.path,
      name: item.name,
      meta: {
        icon: item.web_icon,
        title: item.title,
      },
      component: () => import('@/layout/index.vue'),
    }
    myRoute.children = []
    if (item.level === 1 && item.component_name.length != 0) {
      // 有子菜单
      myRoute.children.push({
        path: item.path,
        name: item.name,
        meta: {
          icon: item.web_icon,
          title: item.title,
        },
        component: modules[`/src/views/${item.component_name}`],
      })
    }
    if (item.sub_menus) {
      item.sub_menus.forEach((subItem: any) => {
        if (subItem.path) {
          myRoute.children.push({
            path: subItem.path,
            name: subItem.name,
            meta: {
              icon: subItem.web_icon,
              title: subItem.title ?? subItem.name,
            },
            component: modules[`/src/views/${subItem.component_name}`],
          })
        }
      })
    }
    routes.push(myRoute)
  })

  if (registerRouteFresh) {
    routes.forEach((item: any) => {
      router.addRoute(item)
    })
    next({ ...to, replace: true })
    registerRouteFresh = false
  } else {
    next()
  }
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
