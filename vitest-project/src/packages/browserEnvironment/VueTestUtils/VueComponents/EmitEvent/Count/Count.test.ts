import {mount} from "@vue/test-utils";
import {test,expect} from "vitest";
import Counter from './Count.vue'
//使用 emitted() 来访问从 Vue 组件触发的事件。
// emitted(eventName) 返回一个数组，其中每个元素代表一个已触发的事件。
// 参数存储在 emitted(eventName)[index] 中，按触发顺序以数组形式呈现。
test('emits an event when clicked', () => {
    const wrapper = mount(Counter)
    //模拟点击button两次
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')
    //期望emit事件里面包含increment属性
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('increment')
    // `emitted()` 接受一个参数。它返回一个包含所有 `this.$emit('increment')` 发生情况的数组。
    const incrementEvent = wrapper.emitted('increment')
    // 我们“点击”了两次，所以 `increment` 的数组应该有两个值。
    expect(incrementEvent).toHaveLength(2)
    // 断言第一次点击的结果。
    // 注意，值是一个数组。
    expect(incrementEvent[0]).toEqual([{
        count:1,
        isEven:false,
    }])
    // 然后是第二次的结果。
    expect(incrementEvent[1]).toEqual([{
        count:2,
        isEven:true,
    }])
})