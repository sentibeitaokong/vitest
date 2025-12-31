import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from "vue-router";
import type {Router} from "vue-router";
import RealVueRouter
    from "../packages/browserEnvironment/VueTestUtils/VueComponents/VueRouter/RealVueRouter/RealVueRouter.vue";
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        component: {
            template: 'Welcome to the blogging app'
        }
    },
    {
        path: '/posts',
        component: RealVueRouter,
    }
]

const router:Router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export { routes }

export default router