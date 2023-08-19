import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { close, start } from '@/config/nprogress'
import useMenuStore from '@/store/modules/menu'
import { useAuthorization } from '@/composables/authorization.ts'

// 定义路由和组件的映射关系
const modules = import.meta.glob('@/views/**/**.vue')

const routes: RouteRecordRaw[] = [
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
          affix: true,
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

// 白名单路由
const whiteList = ['/login']

// 路由前置守卫
// @ts-ignore
router.beforeEach(async (to, from, next) => {
  // 1.Nprogress 开始
  start()
  // 2.设置标题
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title || '后台管理系统'
  }
  // 3.如果是白名单的路径，直接放行
  const some = whiteList.some(function(item) {
    return to.path.indexOf(item) !== -1
  })
  // 菜单信息
  const menuStore = useMenuStore()
  //4. 白名单直接放行
  if (!some) {
    // 用户信息
    const token = useAuthorization()
    let routes: RouteRecordRaw[] = []
    // 5.判断是否有token，没有重定向login
    if (token.value) {
      // 如果routers为空，获取菜单数据
      if (menuStore.routers.length == 0) {
        await menuStore.generateRoute()
      }
      // 生成动态路由 start
      menuStore.routers.forEach((item: any) => {
        // 组装动态路由地址 start
        let myRoute: any = {}
        myRoute = {
          path: item.path,
          name: item.name,
          meta: {
            icon: item.web_icon,
            title: item.name,
          },
          component: () => import('@/layout/Index.vue'),
        }
        myRoute.children = []
        if (item.level === 1 && item.component_name.length != 0) { // 菜单
          myRoute.children.push({
            path: item.path,
            name: item.name,
            meta: {
              icon: item.web_icon,
              title: item.name,
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
                  title: subItem.name,
                },
                component: modules[`/src/views/${subItem.component_name}`],
              })
            }
          })
        }
        routes.push(myRoute)
        // 组装动态路由地址 end
      })

      if (registerRouteFresh) {
        routes.forEach(item => {
          router.addRoute(item)
        })
        next({ ...to, replace: true })
        registerRouteFresh = false
      } else {
        next()
      }
      // 生成动态路由 end
    } else {
      return next({ path: `/login?redirect=${to.path}`, replace: true })
    }
  } else {
    next()
  }

})

router.afterEach(() => {
  // 关闭进度条
  close()
})

// 路由跳转失败
// @ts-ignore
router.onError(error => {
  // 关闭进度条
  close()
  console.warn('路由错误', error)
})

export default router
