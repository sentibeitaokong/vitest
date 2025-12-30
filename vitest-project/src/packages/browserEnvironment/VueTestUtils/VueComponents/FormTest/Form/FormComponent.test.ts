import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import FormComponent from './FormComponent.vue'

test('submits a form', async () => {
    const wrapper = mount(FormComponent)
    //使用setValue赋值
    await wrapper.find('input[type=email]').setValue('name@mail.com')
    await wrapper.find('textarea').setValue('Lorem ipsum dolor sit amet')
    await wrapper.find('select').setValue('moscow')
    await wrapper.find('input[type=checkbox]').setValue()
    await wrapper.find('input[type=radio][value=monthly]').setValue()

    await wrapper.find('form').trigger('submit.prevent')
    // console.log(wrapper.emitted('submit'))
    //toSrictEqual严格相等
    expect(wrapper.emitted('submit')[0][0]).toStrictEqual({
        email:'name@mail.com',
        description:'Lorem ipsum dolor sit amet',
        city:'moscow',
        subscribe: true,
        interval: 'monthly'
    })
})