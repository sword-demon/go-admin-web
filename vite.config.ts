import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  // 配置环境目录 相对路径 根目录下的
  envDir: './viteenv',
  plugins: [
    vue(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定 symbolId 格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    // 配置相对路径别名
    alias: {
      // 配置相对路径别名
      '@': path.resolve('./src'),
    },
  },
})
