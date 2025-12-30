import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import Form from './Form.vue'
test('sets the value', async () => {
    const wrapper = mount(Form)
    const input = wrapper.find('input[type="email"]')
    //要在 VTU 中更改输入的值，可以使用 setValue() 方法。
    // 它接受一个参数，通常是一个 String 或 Boolean，并返回一个 Promise，在 Vue 更新 DOM 后完成解析。
    //input元素设置my@mail.co值
    await input.setValue('my@mail.com')
    expect(input.element.value).toBe('my@mail.com')
    //触发button按钮事件
    // console.log(wrapper.find('button[data-test="button"]'))
    await  wrapper.find('button[data-test="button"]').trigger('click')
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('submit')
    //期望submit方法第一次触发时的数据为my@mail.com
    expect(wrapper.emitted('submit')[0][0]).toBe('my@mail.com')

    //找到form表单里的button按钮
    const componentToGetFocus = wrapper.find('button[data-test="form"]')
    // console.log(wrapper.find('button[data-test="form"]'))
    await wrapper.find('input[type="text"]').trigger('blur', {
        relatedTarget: componentToGetFocus.element
    })
    // console.log(wrapper.emitted())
    //判断focus-lost是否被调用
    expect(wrapper.emitted('focus-lost')).toBeTruthy()
})