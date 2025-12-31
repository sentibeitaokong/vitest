import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'
import {beforeAll, describe,test,vi,expect} from "vitest";
import VueRouterComposition from "../MockVueRouter/VueRouterComposition.vue";

describe('RealVueRouter test',()=>{
    let router
    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes
        })

        router.push('/')
        await router.isReady()
    })

    test('allows authenticated user to edit a post', async () => {
        const wrapper = mount(VueRouterComposition, {
            props: {
                isAuthenticated: true
            },
            global: {
                plugins: [router]
            }
        })
        //监听router.push属性
        const push = vi.spyOn(router, 'push')
        await wrapper.find('button').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        // expect(push).toHaveBeenCalledWith('/posts/undefined/edit')
    })
})