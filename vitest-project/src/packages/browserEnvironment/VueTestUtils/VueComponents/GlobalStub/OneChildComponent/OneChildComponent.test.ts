import {expect,test} from "vitest";
import {mount} from "@vue/test-utils";
import App from './App.vue'
//为单个子组件创建测试替身
//在这个特定的测试中，我们不想进行 API 调用，我们只想断言消息是否被渲染。
// 在这种情况下，我们可以使用 stubs，它出现在 global 挂载选项中。
//要为组件创建测试替身，你可以使用 components 中的键或组件的名称。
// 如果在 global.stubs 中同时给出这两者，将优先使用键。
test('stubs component with custom template', () => {
    const wrapper = mount(App, {
        global: {
            stubs: {
                //我们用一个测试替身替换了它，在这种情况下，我们通过传入一个 template 提供了自己的实现。
                /*FetchDataFromApi: {
                    template: '<span />'
                }*/
                //你也可以获取一个默认的测试替身，而不需要提供自己的实现：
                FetchDataFromApi: true
            }
        }
    })
    console.log(wrapper.html())
    expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})