import {describe, expect, test} from "vitest";
import {mount} from "@vue/test-utils";
//使用 vm 访问内部 Vue 实例。
// getComponent 和 findComponent 返回一个 Vue 包装器。这些 Vue 实例也可以通过 vm 访问。
//wrapper.findComponent('.foo') // 返回 WrapperLike
// wrapper.findComponent<typeof FooComponent>('.foo') // 返回 VueWrapper
// wrapper.findComponent<DefineComponent>('.foo') // 返回 VueWrapper
describe('ComponentVM test',()=>{
    test('renders a greeting', () => {
        // 创建一个Comp组件实例
        const Comp = {
            template: `<div>{{ msg1 }} {{ msg2 }}</div>`,
            props: ['msg1'],
            data() {
                return {
                    msg2: 'world'
                }
            }
        }
        // 挂载
        const wrapper = mount(Comp, {
            props: {
                msg1: 'hello'
            }
        })
        expect(wrapper.html()).toContain('hello world')
    })
    test('asserts correct props are passed', () => {
        const Foo = {
            props: ['msg'],
            template: `<div>{{ msg }}</div>`
        }

        const Comp = {
            components: { Foo },
            template: `<div><foo msg="hello world" /></div>`
        }

        const wrapper = mount(Comp)
        // console.log(wrapper.getComponent(Foo).vm)
        expect(wrapper.getComponent(Foo).vm.msg).toBe('hello world')
        // console.log(wrapper.getComponent(Foo).props())
        expect(wrapper.getComponent(Foo).props()).toEqual({ msg: 'hello world' })
    })
})