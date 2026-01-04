import {mount} from "@vue/test-utils";
import ComplexComponent from "./ComplexComponent.vue";
import {test,expect} from "vitest";
//多子组件替身
//如果你使用的是 VTU V1，你可能记得这个方法叫 shallowMount。这个方法仍然可用，它与写 shallow: true 是一样的。
test('shallow stubs out all child components', () => {
    const wrapper = mount(ComplexComponent,
        //为全部子组件做替身
        {shallow: true})
        /*{
            global: {
                stubs: {
                    ComplexA: true,
                    ComplexB: true,
                    ComplexC: true
                }
            }
        }*/
       /* console.log(wrapper.html())
        <h1>Welcome to Vue.js 3</h1>
        <complex-a-stub></complex-a-stub>
        <complex-b-stub></complex-b-stub>
        <complex-c-stub></complex-c-stub>*/
})
test('shallow stubs out all child components', () => {
    const wrapper = mount(ComplexComponent,
        //通过使用 shallow 挂载选项，可以自动为所有子组件创建测试替身。
        // 如果我们想要明确选择不为某个特定组件创建测试替身，可以在 stubs 中提供其名称，值设置为 false。
        {
            shallow: true,
            global: {
                stubs: { ComplexA: false }
            }
        }
    )
    // console.log(wrapper.html())
    /*
      <h1>Welcome to Vue.js 3</h1>
       <div>ComplexA</div>
      <complex-b-stub></complex-b-stub>
      <complex-c-stub></complex-c-stub>
    */
})