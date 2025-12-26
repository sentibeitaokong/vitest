//初始化fixtures 固定装置
import {test as baseTest} from "vitest";
export const test = baseTest.extend<{
    todos: number[]
    archive: number[]
}>({
    todos: async ({ task }, use) => {
        await use([1, 2, 3])
    },
    archive: []
})