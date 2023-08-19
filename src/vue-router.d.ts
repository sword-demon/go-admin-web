import 'vue-router'

// 重写对于的 meta 的类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: any
    target?: '_blank' | '_self' | '_parent' | '_top'
    affix?: boolean
  }
}
