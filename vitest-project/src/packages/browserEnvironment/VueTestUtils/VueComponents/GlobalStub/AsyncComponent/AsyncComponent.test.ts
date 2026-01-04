import {mount,flushPromises} from "@vue/test-utils";
import {test,expect} from "vitest";
import DefineAsyncComponent from "./DefineAsyncComponent.vue";
import {defineAsyncComponent,h} from 'vue'
test('stubs async component without resolving', () => {
    const wrapper = mount(DefineAsyncComponent, {
        //使用你在组件中定义的键来加载异步组件。在这个例子中，我们使用了键 “MyComponent”。
        // 在测试用例中不需要使用 async/await，因为组件在解析之前已经被创建了测试替身。
        global: {
            stubs: {
                MyComponent: true
            }
        }
    })
    console.log(wrapper.html())
    expect(wrapper.html()).toContain('<my-component-stub></my-component-stub>')
})
function createTestComponent(asyncCompDefinition) {
    // 动态创建组件，确保每次都是新的
    const AsyncComp = defineAsyncComponent(asyncCompDefinition)

    return {
        name: 'TestWrapper',
        render() {
            return h('div', [h(AsyncComp)])
        }
    }
}
test('stubs async component with asyncComponent', async () => {
    //使用异步组件的名称。在这个例子中，我们使用了名称 “AsyncComponent”。
    // 现在需要使用 async/await，因为异步组件需要解析，然后才能通过在异步组件中定义的名称创建测试替身。
    const TestComponent = createTestComponent({
        loader: () => Promise.resolve({
            name: 'AsyncComponent',
            template: '<div>Real</div>'
        })
    })
    const wrapper = mount(TestComponent, {
        global: {
            stubs: {
                AsyncComponent: true
                /*AsyncComponent: {
                  template: '<div>Custom Stub</div>'
                },*/
            }
        }
    })
    await flushPromises()
    await wrapper.vm.$nextTick()
    console.log(wrapper.html())
    expect(wrapper.html()).toContain('<async-component-stub></async-component-stub>')
})
