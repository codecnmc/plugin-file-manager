/*
 * @Author: 羊驼
 * @Date: 2025-08-07 09:28:35
 * @LastEditors: 羊驼
 * @LastEditTime: 2025-08-19 17:10:40
 * @Description: file content
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "node:path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  build: {
    outDir: "../html",
  },
  base: "./", // 设置为当前目录
  server: {
    port: 5175, // 使用环境变量设置端口号，如果没有则默认为 3000
    open: true,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 使用 path.resolve 确保路径正确
      "@common": path.resolve(__dirname, "../common"), // 使用 path.resolve 确保路径正确
    },
  },
});
