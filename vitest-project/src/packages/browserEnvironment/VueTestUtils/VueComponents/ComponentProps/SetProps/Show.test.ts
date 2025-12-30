import { mount } from '@vue/test-utils'
import {expect,test} from "vitest";
import Show from './Show.vue'
//使用 props 和 data 的挂载选项预设组件的状态。
// 使用 setProps() 在测试期间更新属性。
// 在 setProps() 前使用 await 关键字，以确保 Vue 在测试继续之前会更新 DOM。
// 直接与组件交互可以提供更大的覆盖率。考虑结合使用 setValue 或 trigger 以及 data 来确保一切正常工作。
test('renders a greeting when show is true', async () => {
    const wrapper = mount(Show,{
        props:{
            show:true
        }
    })
    expect(wrapper.html()).toContain('Hello')

    await wrapper.setProps({ show: false })

    expect(wrapper.html()).not.toContain('Hello')
})