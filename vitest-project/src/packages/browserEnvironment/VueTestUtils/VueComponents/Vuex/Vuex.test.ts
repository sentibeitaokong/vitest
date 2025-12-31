import {createStore} from "vuex";
import {test, expect, describe,vi} from "vitest";
import {mount} from "@vue/test-utils";
import Vuex from "./Vuex.vue";
import {store} from "../../../../../store";
const createVuexStore = (initialState) =>
    createStore({
        state: {
            count: 0,
            ...initialState
        },
        mutations: {
            increment(state, value = 1) {
                state.count += value
            }
        }
    })
//使用 global.plugins 以插件形式安装 Vuex
// 使用 global.mocks 模拟诸如 Vuex 的全局对象，以满足高级用例
// 考虑单独测试复杂的 Vuex mutation 和 action
// 使用 createStore 的包装函数，以便接收参数设置特定的测试场景
describe('vuex test',()=>{
    //global.plugins挂载store
    test('vuex', async () => {
        const wrapper = mount(Vuex, {
            //Vue Test Utils 也允许你使用 global.plugins 挂载选项安装插件。
            global: {
                plugins: [store]
            }
        })
        //模拟点击
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('Count: 1')
    })
    //mock store
    test('vuex using a mock store', async () => {
        const $store = {
            state: {
                count: 25
            },
            commit: vi.fn()
        }

        const wrapper = mount(Vuex, {
            global: {
                mocks: {
                    $store
                }
            }
        })
        expect(wrapper.html()).toContain('Count: 25')
        await wrapper.find('button').trigger('click')
        expect($store.commit).toHaveBeenCalled()
    })
    //隔离测试vuex
    test('Vuex Isolation Testing', () => {
        const store = createStore({
            state: {
                count: 0
            },
            mutations: {
                increment(state) {
                    state.count += 1
                }
            }
        })

        store.commit('increment')

        expect(store.state.count).toBe(1)
    })
    //设置初始值并调用increament函数加一
    test('increment mutation without passing a value', () => {
        const store = createVuexStore({ count: 20 })
        store.commit('increment')
        expect(store.state.count).toBe(21)
    })
    //设置初始值并调用increament函数加预设值15
    test('increment mutation with a value', () => {
        const store = createVuexStore({ count: -10 })
        store.commit('increment', 15)
        expect(store.state.count).toBe(5)
    })
})