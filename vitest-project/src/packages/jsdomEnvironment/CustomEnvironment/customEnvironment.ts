import type { Environment } from 'vitest/environments'
//自定义环境
export default <Environment>{
    name: 'custom',
    viteEnvironment: 'ssr',
    // 可选 - 仅在支持 "experimental-vm" 的情况下使用
    // async setupVM() {
    //     const vm = await import('node:vm')
    //     const context = vm.createContext()
    //     return {
    //         getVmContext() {
    //             return context
    //         },
    //         teardown() {
    //             // 在所有使用此环境的测试运行完毕后调用
    //         },
    //     }
    // },
    setup() {
        // 自定义设置
        return {
            teardown() {
                // 在所有使用此环境的测试运行完毕后调用
            },
        }
    },
}