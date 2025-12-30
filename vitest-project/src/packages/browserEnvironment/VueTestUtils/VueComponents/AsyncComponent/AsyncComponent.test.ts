import {defineAsyncComponent, defineComponent, Suspense} from 'vue'
import { mount,flushPromises  } from '@vue/test-utils'
import {expect,test} from "vitest";
import Async from './AsyncComponent.vue'
// const Async=defineAsyncComponent(()=>import('./AsyncComponent.vue'))
//Vue 以异步方式更新 DOM；测试运行器以同步方式执行代码。
// 使用 await nextTick() 确保在测试继续之前 DOM 已更新。
// 可能更新 DOM 的函数（如 trigger 和 setValue）返回 nextTick，因此你需要 await 它们。
// 使用 Vue Test Utils 的 flushPromises 来解决来自非 Vue 依赖（如 API 请求）的任何未解决的 Promise。
// 使用 Suspense 在异步测试函数中测试具有异步 setup 的组件。
test('Async component', async () => {
    //如果你要测试的组件使用了异步 setup，那么你必须在 Suspense 组件内挂载该组件（就像在应用程序中使用时一样）。
    const TestComponent = defineComponent({
        components: { Async },
        template: '<Suspense><Async/></Suspense>'
    })

    const wrapper = mount(TestComponent)
    //在这种情况下，Vue 对未解决的 Promise 没有任何了解，
    // 因此调用 nextTick 将不起作用——你的断言可能在 Promise 被解决之前就运行了。
    // 对于这种情况，Vue Test Utils 提供了 flushPromises 它可以立即解决所有未完成的 Promise。
    await flushPromises()
    //使用flushPromises()后才能拿到加载的异步组件的内容
    // console.log(wrapper.html())
    expect(wrapper.html()).toContain(0)
    //可以拿到Async异步组件，在flushPromise()前面访问不到
    // console.log(wrapper.findComponent(Async))
    //注意：要访问你的 Async 组件的底层 vm 实例，请使用 wrapper.findComponent(Async) 的返回值。
    // 由于在这种情况下定义并挂载了一个新组件，因此 mount(TestComponent) 返回的 wrapper 包含它自己的（空的）vm。
})