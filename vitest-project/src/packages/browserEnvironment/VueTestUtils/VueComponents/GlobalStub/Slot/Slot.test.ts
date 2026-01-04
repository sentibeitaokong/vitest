import { config, mount } from '@vue/test-utils'
import {describe,beforeAll,afterAll,test,expect} from "vitest";
import App from './App.vue'
/*
    使用 global.stubs 将组件或指令替换为虚拟实现，以简化测试
    使用 shallow: true (或 shallowMount) 为所有子组件创建测试替身
    使用 global.renderStubDefaultSlot 渲染组件测试替身的默认 <slot>
    如果你使用 shallow，插槽将不会被渲染，因为我们为 <custom-button /> 中的渲染函数创建了测试替身。
    这意味着你将无法验证是否渲染了正确的文本！
    这时，你可以使用 config.renderStubDefaultSlot，即使在使用 shallow 时也会渲染默认插槽内容：
    你也可以通过在测试设置文件中导入 config 并将 renderStubDefaultSlot 设置为 true 来全局启用此功能。
    不幸的是，由于技术限制，此行为无法扩展到非默认插槽。
*/
describe("VueComponents", () => {
    beforeAll(() => {
        //渲染插槽
        config.global.renderStubDefaultSlot = true
    })

    afterAll(() => {
        //移除插槽
        config.global.renderStubDefaultSlot = false
    })

    test('shallow with stubs', () => {
        const wrapper = mount(App, {
            props: {
                authenticated: true
            },
            //shallow 挂载选项，渲染子组件可以自动为所有子组件创建测试替身
            shallow: true
        })

        expect(wrapper.html()).toContain('Log out')
    })
})
