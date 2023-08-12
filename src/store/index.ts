import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 引入持久化插件
pinia.use(persistedstate)

export default pinia
