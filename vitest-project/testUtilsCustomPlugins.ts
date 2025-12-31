import {config} from "@vue/test-utils";
//全局自定义testUtilsPlugin
//以下是一个简单的插件，用于为 wrapper.element 创建一个方便的别名 wrapper.$el。
const myAliasPlugin = (wrapper) => {
    return {
        $el: wrapper.element // 简单的别名
    }
}
//下面的插件为 VueWrapper 实例添加了一个 findByTestId 方法。
// 它鼓励你在 Vue 组件上选择测试转用的 attribute 作为你的选择器策略。
const DataTestIdPlugin = (wrapper) => {
    function findByTestId(selector) {
        const dataSelector = `[data-testid='${selector}']`
        const element = wrapper.element.querySelector(dataSelector)
        return new DOMWrapper(element)
    }

    return {
        findByTestId
    }
}
// 在你要扩展的类型上调用 install
// 你可以为 config.plugins 中的任何值编写插件
config.plugins.VueWrapper.install(myAliasPlugin)
config.plugins.VueWrapper.install(DataTestIdPlugin)

