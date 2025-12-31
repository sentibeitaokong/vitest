import {expect,test} from "vitest";
import {mount} from '@vue/test-utils'
import Vmodel from './Vmodel.vue'

test('modelValue should be updated', async () => {
    const wrapper = mount(Vmodel, {
        props: {
            modelValue: 'initialText',
            'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
        }
    })

    await wrapper.find('input').setValue('test')
    console.log(wrapper.html())
    expect(wrapper.props('modelValue')).toBe('test')
})