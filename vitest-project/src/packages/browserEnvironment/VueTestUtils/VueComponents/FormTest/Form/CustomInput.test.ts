import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import CustomInput from './CustomInput.vue'
test('fills in the form', async () => {
    const wrapper = mount(CustomInput)

    await wrapper.find('input[type="text"]').setValue('text')
    // 继续进行断言或操作，例如提交表单、断言 DOM 等…
    // console.log(wrapper.emitted('update:modelValue'))
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('text')
})