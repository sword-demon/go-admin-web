import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// 引入路由
import router from '@/router'
// 引入 pinia
import pinia from '@/store'
// 引入 element-plus
import ElementPlus from 'element-plus'
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入 svg 图标注册导入
import 'virtual:svg-icons-register'
// 引入注册 svg-icon 组件
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册全局组件
app.component('svg-icon', SvgIcon)
app.mount('#app')

