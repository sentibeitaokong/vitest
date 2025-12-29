import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import Nav from "./Nav.vue";
//使用 find() 结合 exists() 验证元素是否在于 DOM 中。
// 如果你确认元素存在于 DOM 中，就使用 get()。
// 使用 get() 和 isVisible() 验证在 DOM 中元素的可见性。
test('renders a profile link', () => {
    const wrapper = mount(Nav)

    // 这里我们隐式断言 #profile 元素存在。 wrapper.get()没找到会直接报错，建议使用exists
    const profileLink = wrapper.get('#profile')
    expect(wrapper.find('#admin').exists()).toBe(false)
    //exists监测元素是否存在，但不能确定是否隐藏
    expect(wrapper.find('#user-dropdown').exists()).toBe(true)
    //isVisible监测元素是否可见
    expect(wrapper.find('#user-dropdown').isVisible()).toBe(true)
    expect(profileLink.text()).toEqual('My Profile')
})