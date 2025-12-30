import { mount, flushPromises} from '@vue/test-utils'
import axios from 'axios'
import {vi,test,expect} from "vitest";
import PostList from './PostList.vue'

const mockPostList = [
    { id: 1, title: 'title1' },
    { id: 2, title: 'title2' }
]
// 以下代码告诉 vi 模拟任何对 `axios.get` 的调用并返回 `mockPostList`
vi.spyOn(axios, 'get').mockResolvedValue(mockPostList)
//Vue Test Utils 不需要特殊工具来测试 HTTP 请求。唯一需要考虑的是测试异步行为。
// 测试不应依赖于外部服务。使用模拟工具如 jest.mock 来避免这种情况。
// flushPromises() 是一个有用的工具，可以确保在异步操作后 DOM 更新。
// 通过与组件进行交互来直接触发 HTTP 请求，可以让你的测试更加稳健。
test('loads posts on button click', async () => {
    const wrapper = mount(PostList)

    await wrapper.get('button').trigger('click')

    // 断言我们已正确调用 axios.get 的次数和参数。
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/posts')

    // 等待 DOM 更新。
    await flushPromises()

    // 最后，确保我们已渲染 API 的内容。
    const posts = wrapper.findAll('[data-test="post"]')

    expect(posts).toHaveLength(2)
    expect(posts[0].text()).toContain('title1')
    expect(posts[1].text()).toContain('title2')
})
test('displays loading state on button click', async () => {
    const wrapper = mount(PostList)

    // 注意，我们在点击按钮之前运行以下断言
    // 此时组件应该处于“未加载”状态。
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')

    // 现在像往常一样触发它。
    await wrapper.get('button').trigger('click')
    // await wrapper.vm.$nextTick()

    // 我们在等待所有承诺完成之前，断言“加载状态”。
    // expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    // expect(wrapper.get('button').attributes()).toHaveProperty('disabled')

    // 和之前一样，等待 DOM 更新。
    await flushPromises()

    // 之后，我们回到“未加载”状态。
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')
})