import {expect,test} from "vitest";
import {mount} from "@vue/test-utils";
import ScopedSlot from "./ScopedSlot.vue";
//使用 slots 挂载选项来测试使用 <slot> 的组件是否正确渲染内容。
// 内容可以是字符串、渲染函数或导入的单文件组件 (SFC)。
// 对于默认插槽使用 default，对于具名插槽使用对应的名称。
// 支持作用域插槽和 # 简写。
test('scoped slots', () => {
    const wrapper = mount(ScopedSlot, {
        slots: {
            scoped: `<template #scoped="scope">
        Hello {{ scope.msg }}
        </template>`
        }
        /*slots: {
            scoped: `Hello {{ params.msg }}` // 没有包装 template 标签时，插槽作用域暴露为“params”
        }*/
    })
    // console.log(wrapper.html())
    expect(wrapper.html()).toContain('Hello world')
})