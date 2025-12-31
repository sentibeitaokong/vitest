import {expect,test} from "vitest";
import {mount} from '@vue/test-utils'
import MultipleVmodel from "./MultipleVmodel.vue";
//多个vmodel测试
test('modelValue should be updated', async () => {
    const wrapper = mount(MultipleVmodel, {
        props: {
            //传递value
            modelValue: 'initialText',
            //绑定update:modelValue事件
            'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
            currency: '$',
            'onUpdate:currency': (e) => wrapper.setProps({ currency: e })
        }
    })
    //拿到两个input输入框的元素
    const [modelValueInput, currencyInput] = wrapper.findAll('input')
    await modelValueInput.setValue('test')
    await currencyInput.setValue('£')
    expect(wrapper.props('modelValue')).toBe('test')
    expect(wrapper.props('currency')).toBe('£')
})