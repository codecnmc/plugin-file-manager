/*
 * @Author: 羊驼
 * @Date: 2025-06-18 16:40:17
 * @LastEditors: 羊驼
 * @LastEditTime: 2025-08-19 17:20:14
 * @Description: file content
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Main from "../views/Main/index.vue"
import File from "../views/file/index.vue"

const routes = [
    { path: '/', component: Main },
    { path: '/file', component: File },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router