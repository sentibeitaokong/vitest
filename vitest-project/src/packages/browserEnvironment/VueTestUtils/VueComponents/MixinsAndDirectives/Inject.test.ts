import {expect,test} from "vitest";
import {mount} from '@vue/test-utils'
import Inject from "./Inject.vue";
//测试简单的组合式函数时无需额外的组件或 @vue/test-utils
// 创建辅助测试组件以测试更复杂的组合式函数
// 创建辅助测试组件以测试你的组件是否通过 provide 提供正确的数据
// 使用 global.provide 将数据传递给使用 inject 的组件
test('renders correct data', () => {
    const wrapper = mount(Inject, {
        global: {
            provide: {
                'my-key': 'some-data'
            }
        }
    })
    console.log(wrapper.html())
    expect(wrapper.text()).toBe('some-data')
})