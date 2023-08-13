// 标签组件存储

import { defineStore } from 'pinia'
import router from '@/router'

const useTagsStore = defineStore('tagsState', {
  state: () => ({
    activeTabsValue: '',
    visitedViews: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          affix: true,
        },
        title: '首页',
      },
    ],
  }),
  getters: {},
  actions: {
    setTabsMenuValue(val: string) {
      this.activeTabsValue = val
    },
    addVisitedViews(view: any) {
      this.setTabsMenuValue(view.path)
      // 判断是否已经存在
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name',
      }))
    },
    addViews(view: any) {
      this.addVisitedViews(view)
    },
    delView(path: string) {
      return new Promise(resolve => {
        this.delVisitedView(path)
        resolve({
          visitedViews: [...this.visitedViews],
        })
      })
    },
    delVisitedView(path: string) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v.path !== path || v.meta.affix
        })
        resolve([...this.visitedViews])
      })
    },
    // 删除当前以外的其他的标签
    delOtherViews(currentPath: string) {
      // 首页不能删除
      this.visitedViews = this.visitedViews.filter((v => {
        // 当前路径和有这个属性的都不能删除 首页设置了这个属性
        return v.path === currentPath || v.meta.affix
      }))
    },
    delAllViews() {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter((v => {
          return v.meta.affix
        }))
        resolve([...this.visitedViews])
      })
    },
    goHome() {
      this.activeTabsValue = '/home'
      router.push({ path: '/home' })
    },
  },
})

export default useTagsStore
