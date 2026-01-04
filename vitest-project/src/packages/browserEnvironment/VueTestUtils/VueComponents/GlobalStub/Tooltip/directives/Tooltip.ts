export const myDirective = {
    // 指令绑定到元素时调用（初始化）
    mounted(el, binding, vnode, prevVnode) {},

    // 元素更新时调用
    updated(el, binding, vnode, prevVnode) {},

    // 元素从父组件卸载时调用
    unmounted(el, binding, vnode, prevVnode) {},

    // 仅限 SSR：服务器端渲染时调用
    beforeMount(el, binding, vnode, prevVnode) {
        el.classList.add('with-tooltip')
    },

    // 仅限 SSR：服务器端更新时调用
    beforeUpdate(el, binding, vnode, prevVnode) {}
}