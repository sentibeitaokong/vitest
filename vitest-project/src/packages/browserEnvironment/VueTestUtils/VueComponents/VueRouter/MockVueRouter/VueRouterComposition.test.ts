import { useRouter, useRoute } from 'vue-router'
import {vi,expect,test} from "vitest";
import {mount} from "@vue/test-utils";
import VueRouterComposition from "./VueRouterComposition.vue";
vi.mock('vue-router', () => ({
    //模拟方法
    useRoute: vi.fn(),
    useRouter: vi.fn(() => ({
        push: () => {}
    }))
}))
//你可以在测试中使用真实的路由器实例。
// 但是有一些注意事项：Vue Router 4 是异步的，我们需要在编写测试时考虑这一点。
// 对于更复杂的应用程序，请考虑模拟路由器的依赖项，且专注于测试底层逻辑。
// 尽可能利用测试运行器的测试替身来模拟功能。
// 使用 global.mocks 来模拟全局依赖项，例如 this.$route 和 this.$router。
//已登录
test('allows authenticated user to edit a post', async () => {
    //接受一个函数作为 mock 实现  函数返回值作为调用这个函数的返回值
    useRoute.mockImplementationOnce(() => ({
        params: {
            id: 1
        }
    }))

    //模拟Push方法
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
        push
    }))

    const wrapper = mount(VueRouterComposition, {
        props: {
            isAuthenticated: true
        },
        global: {
            stubs: ["router-link", "router-view"], // 为可能在模板中渲染的 router-link 和 router-view 提供测试替身
        }
       /* global: {
            plugins: [router]                 //真实VueRouter挂载
        }*/

    })

    await wrapper.find('button').trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/posts/1/edit')
})
//未登录
test('redirect an unauthenticated user to 404',async  () => {
    useRoute.mockImplementationOnce(() => ({
        params: {
            id: 1
        }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
        push
    }))

    const wrapper = mount(VueRouterComposition, {
        props: {
            isAuthenticated: false
        },
        global: {
            stubs: ["router-link", "router-view"], // 为可能在模板中渲染的 router-link 和 router-view 提供测试替身
        }
    })

    await wrapper.find('button').trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/404')
})