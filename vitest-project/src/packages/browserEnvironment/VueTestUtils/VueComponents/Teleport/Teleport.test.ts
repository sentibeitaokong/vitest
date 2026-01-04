import { mount } from '@vue/test-utils'
import Navbar from './Navbar.vue'
import Signup from './Signup.vue'
import {describe, test,beforeEach,afterEach,expect} from "vitest";
//使用 document.createElement 创建一个 teleport 目标。
// 使用 getComponent 或 findComponent 查找传送的组件，这些方法会在虚拟 DOM 层面上操作
describe('teleport test',()=>{
    beforeEach(() => {
        // 创建 teleport 的目标
        const el = document.createElement('div')
        el.id = 'modal'
        document.body.appendChild(el)
    })

    afterEach(() => {
        // 清理
        document.body.innerHTML = ''
    })
    test('emits a signup event when valid', async () => {
        //你可以通过使用 teleport: true 来创建 teleport 的测试替身：
        const wrapper = mount(Navbar,{
            global: {
                stubs: {
                    teleport: true
                }
            }
        })
        //在虚拟dom里面找到signup组件
        const signup = wrapper.getComponent(Signup)
        await signup.get('input').setValue('valid_username')
        await signup.get('form').trigger('submit.prevent')
        expect(signup.emitted().signup[0]).toEqual(['valid_username'])
    })
})