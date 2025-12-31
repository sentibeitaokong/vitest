import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { useUser } from './useUser'
import { mount,flushPromises } from '@vue/test-utils'
import {expect,vi,test} from "vitest";
import {h } from 'vue'
// 模拟 API 请求
vi.spyOn(axios, 'get').mockResolvedValue({ data: { id: 1, name: 'User' } })

test('fetch user on mount', async () => {
    const TestComponent = defineComponent({
        props: {
            // 定义 props，以便使用不同的输入参数测试组合式函数
            userId: {
                type: Number,
                required: true
            }
        },
        setup(props) {
            return {
                // 调用组合式函数并将所有返回值暴露到我们的组件实例中，
                // 以便我们可以通过 wrapper.vm 访问它们
                ...useUser(props.userId)
            }
        },
        render() {
            // 最简单的渲染，或者根据你的测试需要
            return h('div', [
                this.user ? `User: ${this.user.name}` : 'Loading...'
            ])
        }
    })

    const wrapper = mount(TestComponent, {
        props: {
            userId: 1
        }
    })

    expect(wrapper.vm.user).toBeUndefined()

    await flushPromises()

    expect(wrapper.vm.user).toEqual({ id: 1, name: 'User' })
})