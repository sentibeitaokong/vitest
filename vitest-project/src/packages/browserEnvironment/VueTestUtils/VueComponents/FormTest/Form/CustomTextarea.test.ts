import {expect,test} from "vitest";
import {mount} from "@vue/test-utils";
import CustomTextarea from './CustomTextarea.vue'
//使用 setValue 给 DOM 输入元素和 Vue 组件赋值。
// 使用 trigger 触发 DOM 事件，包括带有和不带修饰符的事件。
// 使用第二个参数向 trigger 添加额外的事件数据。
// 断言 DOM 发生了变化，并且发出了正确的事件。尽量不要对组件实例上的数据进行断言。
test('emits textarea value on submit', async () => {
    const wrapper = mount(CustomTextarea)
    const description = 'Some very long text...'
    // console.log(wrapper.findComponent({ ref: 'description' }))
    // await wrapper.findComponent({ ref: 'description' }).setValue(description)
    // await wrapper.find('form').trigger('submit')
    // expect(wrapper.emitted('submitted')[0][0]).toEqual(description)
})