import { mount,flushPromises } from '@vue/test-utils'
import {beforeAll, describe, expect, test} from "vitest";
import { createRouter, createWebHistory } from 'vue-router'
import Layout from "./Layout.vue";
import { routes } from '@/router'

describe('realVueRouter test',()=>{
    //创建router
    let router
    //在测试前设置router
    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes
        })
    })
    //测试真实路由
    test('routing', async () => {
        //模拟路由跳转
        await router.push('/')
        // 这行之后，路由已准备就绪
        await router.isReady()
        const wrapper = mount(Layout,{
            //挂载路由
            global: {
                plugins: [router]
            }
        })
        expect(wrapper.html()).toContain('Welcome to the blogging app')

        //模拟router-link点击跳转
        await wrapper.find('a').trigger('click')
        //等待路由更新
        await flushPromises()
        expect(wrapper.html()).toContain('Testing Vue Router')
    })
})