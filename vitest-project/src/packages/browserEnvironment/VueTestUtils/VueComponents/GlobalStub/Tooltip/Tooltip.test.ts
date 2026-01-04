import {test,expect} from "vitest";
import {mount} from '@vue/test-utils'
import App from './App.vue'
import {myDirective as vMyDirective} from "./directives/Tooltip";
//使用 vCustomDirective 命名方案来区分组件和指令，灵感来自于同一方案在 <script setup> 中的使用。
//为指令创建测试替身在函数式组件或 <script setup> 中不起作用，因为在 withDirectives 函数中缺少指令名称。
// 如果你需要模拟在函数式组件中使用的指令，请考虑通过你的测试框架模拟指令模块。
// 请参见 https://github.com/vuejs/core/issues/6887 以解锁此功能。
/*test('stubs component with custom template', () => {
    const wrapper = mount(App, {
        //测试加载指令的dom是否渲染
        global: {
            stubs: {
                vTooltip: true
            }
        }
    })
    expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})*/
//使用 vCustomDirective 命名方案来区分组件和指令，灵感来自于同一方案在 <script setup> 中的使用。
//暂时无效
test('stubs component with custom template', () => {
    const wrapper = mount(App, {
        global: {
            stubs: {
                vMyDirective: {
                    beforeMount(el: Element) {
                        console.log('directive called')
                        el.classList.add('with-tooltip')
                    }
                }
            }
        }
    })
    console.log(wrapper.html())
    expect(wrapper.classes('with-tooltip')).toBe(true)
})
