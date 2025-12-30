import Transition from "./Transition.vue";
import { mount } from '@vue/test-utils'
import {expect,test} from "vitest";

test('works with transitions', async () => {
    const wrapper = mount(Transition)

    expect(wrapper.find('hello').exists()).toBe(false)

    await wrapper.find('button').trigger('click')

    // 点击按钮后，<p> 元素存在并且可见
    expect(wrapper.get('p').text()).toEqual('hello')
})