import { mount } from '@vue/test-utils'
import {expect,test,vi} from "vitest";
import VueRouter from "./VueRouter.vue";
//模拟路由器 有登录权限
test('allows authenticated user to edit a post', async () => {
    //模拟route
    const mockRoute = {
        params: {
            id: 1
        }
    }
    //模拟router里面的push方法
    const mockRouter = {
        push: vi.fn()
    }

    const wrapper = mount(VueRouter, {
        props: {
            isAuthenticated: true
        },
        global: {
            mocks: {
                $route: mockRoute,
                $router: mockRouter
            }
        }
    })

    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/posts/1/edit')
})
//模拟没有登录权限
test('redirect an unauthenticated user to 404', async () => {
    const mockRoute = {
        params: {
            id: 1
        }
    }
    const mockRouter = {
        push: vi.fn()
    }

    const wrapper = mount(VueRouter, {
        props: {
            isAuthenticated: false
        },
        global: {
            mocks: {
                $route: mockRoute,
                $router: mockRouter
            }
        }
    })

    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/404')
})