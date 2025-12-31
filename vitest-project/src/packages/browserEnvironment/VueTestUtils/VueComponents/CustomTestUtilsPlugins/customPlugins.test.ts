import {mount} from "@vue/test-utils";
import { config } from '@vue/test-utils'
import {expect,test} from "vitest";
//局部自定义testUtils插件
/*const myAliasPlugin = (wrapper) => {
    return {
        $el: wrapper.element // 简单的别名
    }
}

// 在你要扩展的类型上调用 install
// 你可以为 config.plugins 中的任何值编写插件
config.plugins.VueWrapper.install(myAliasPlugin)*/
test('test customPlugins',()=>{
    const wrapper = mount({ template: `<h1>🔌 Plugin</h1>` })
    expect(wrapper.$el.innerHTML).toBe('🔌 Plugin')
})