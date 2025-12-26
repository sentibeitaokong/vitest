//扩展测试上下文
import { test as baseTest } from 'vitest'

const todos: number[] = []
const archive:number[] = []
const mind:string = ''

export const test = baseTest.extend({
    todos: async ({}, use) => {
        // 在每次测试函数运行之前设置固定装置
        todos.push(1, 2, 3)

        // 使用固定装置的值
        await use(todos)

        // 在每次测试函数运行之后清除固定装置
        todos.length = 0
    },
    mind: async ({}, use) => {
        // 在每次测试函数运行之前设置固定装置
        let mind='foggy'

        // 使用固定装置的值
        await use(mind)

        // 在每次测试函数运行之后清除固定装置
        mind=''
    },
    archive,
})