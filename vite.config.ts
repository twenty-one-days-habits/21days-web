import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, 'src'),
    }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/scss/variables.scss";@import "@/scss/common.scss";'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://23.106.140.233:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
