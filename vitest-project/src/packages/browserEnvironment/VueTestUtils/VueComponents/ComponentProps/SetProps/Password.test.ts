import {test, expect} from "vitest";
import {mount} from "@vue/test-utils";
import Password from './Password.vue'
test('renders an error if length is too short', () => {
    const wrapper = mount(Password, {
        props: {
            minLength: 10
        },
        data() {
            return {
                // password: 'short'
            }
        }
    })
    wrapper.find('input').setValue('short')
    expect(wrapper.html()).toContain('密码必须至少包含 10 个字符。')
})