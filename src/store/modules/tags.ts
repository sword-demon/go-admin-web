// 标签组件存储

import { defineStore } from 'pinia'

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
  },
})

export default useTagsStore
