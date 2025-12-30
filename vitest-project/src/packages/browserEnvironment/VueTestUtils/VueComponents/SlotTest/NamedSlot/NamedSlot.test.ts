import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import NamedSlot from "./NamedSlot.vue";
import {h} from 'vue'
import Header from "./Header.vue";
test('layout full page layout', () => {
    const wrapper = mount(NamedSlot, {
        slots: {
            header: Header,
            main: h('div', 'Main Content'),
            footer:'<div>Footer</div>',
        }
    })
    expect(wrapper.html()).toContain('<div>Header</div>')
    expect(wrapper.html()).toContain('<div>Main Content</div>')
    expect(wrapper.html()).toContain('<div>Footer</div>')
})