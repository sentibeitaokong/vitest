import { mount } from '@vue/test-utils'
import {test,expect} from "vitest";
import Todo from './Todo.vue'
// 使用 mount() 渲染组件。
// 使用 get() 和 findAll() 查询 DOM。
// trigger() 和 setValue() 是模拟用户输入的助手。
// 更新 DOM 是一个异步操作，因此请确保使用 async 和 await。
// 测试通常由三个阶段组成：安排、执行和断言。
test('renders a todo', async () => {
    const wrapper = mount(Todo)
    const todo = wrapper.get('[data-test="todo"]')
    expect(todo.text()).toBe('Learn Vue.js 3')
    expect(wrapper.findAll('[data-test="new-todo"]')).toHaveLength(1)
    await wrapper.get('[data-test="new-todo"]').setValue('new Todo')
    //点击提交
    await wrapper.get('[data-test="form"]').trigger('submit')
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
    await wrapper.get('[data-test="todo-checkbox"]').setValue(true)
    //找到第一个div的class属性并期望包含completed
    expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
})