import { createStore } from 'vuex'
import {describe, expect, test} from "vitest";
import {mount} from "@vue/test-utils";
import VuexComposition from "./VuexComposition.vue";
import {store} from "@/store";
import {key} from "@/store";

//app.use(store,key)
//key 是 Vuex store 的注入标识符，用于区分不同的 store 实例。大多数情况下留空即可，Vuex 会使用默认值 'store'。
describe('Composition API test',()=>{
    //测试不使用注入键的 useStore 的组件
    //如果不使用注入键，store 里的数据可以通过全局 provide 挂载选项直接注入到组件中。
    // 注入的 store 名称必须与组件中的名称相同，例如 “store”。
 /*   test('no key vuex', async () => {
        const wrapper = mount(VuexComposition, {
            global: {
                provide: {
                    store: store
                }
            }
        })
        //模拟点击
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('Count: 1')
    })*/
    //测试使用注入键的 useStore 的组件
    //当使用带有注入键的 store 时，之前的方法将无法工作。store 实例将不会从 useStore 返回。
    // 为了访问正确的 store，我们需要提供标识符。
    // 它必须是传递给组件的 setup 函数中 useStore 的确切键，或者在自定义辅助函数中调用 useStore 时使用的键。
    // 由于 JavaScript symbols 是唯一的且无法重建，最好从真实的 store 中导出该键。
    // 你可以使用 global.provide 和正确的键来注入 store，或者使用 global.plugins 安装 store 并指定键
   /* test('key vuex global.provide', async () => {
        const wrapper = mount(VuexComposition, {
            global: {
                provide: {
                    [key]: store
                }
            }
        })
        //模拟点击
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('Count: 1')
    })*/
    test('key  vuex global.plugins', async () => {
        const wrapper = mount(VuexComposition, {
            global: {
                // 要传递选项给插件，请使用数组语法。
                plugins: [[store, key]]
            }
        })
        //模拟点击
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('Count: 1')
    })
})