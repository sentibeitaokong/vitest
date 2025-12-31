import { defineComponent, h, inject } from 'vue'
import { mount } from '@vue/test-utils'
import {test,expect} from "vitest";
import Provide from "./Provide.vue";
test('provides correct data', () => {
    const TestComponent = defineComponent({
        template: '<span id="provide-test">{{value}}</span>',
        setup() {
            const value = inject('my-key')
            return { value }
        }
    })

    const wrapper = mount(Provide, {
       /* slots: {
            default: () => h(TestComponent)
        }*/
        //如果你的组件不包含插槽，你可以使用 stub 将一个子组件替换为辅助测试组件
        global: {
            stubs: {
                SomeChild: TestComponent
            }
        }
    })
    expect(wrapper.find('#provide-test').text()).toBe('some-data')
})