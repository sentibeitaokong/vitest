import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import DefaultSlot from "./DefaultSlot.vue";
test('layout default slot', () => {
    const wrapper = mount(DefaultSlot, {
        slots: {
            default: ['<div id="one">One</div>', '<div id="two">Two</div>']
        }
    })
    expect(wrapper.find('#one').exists()).toBe(true)
    expect(wrapper.find('#two').exists()).toBe(true)
    expect(wrapper.html()).toContain('One')
    expect(wrapper.find('main').text()).toContain('One')
})