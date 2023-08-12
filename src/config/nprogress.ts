import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  // 动画的方式
  easing: 'ease',
  // 进度速度
  speed: 500,
  // 是否显示加载 Icon
  showSpinner: true,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化的时候的最小百分比
  minimum: 0.3,
})

// 打开进度条
export const start = () => {
  NProgress.start()
}

// 关闭进度条
export const close = () => {
  NProgress.done()
}
