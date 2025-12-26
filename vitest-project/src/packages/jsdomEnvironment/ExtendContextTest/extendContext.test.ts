import { expect } from 'vitest'
import { test } from './extendVariable.ts'
interface TestData {
    todos: number[]
    archive: number[]
    mind:string
}
// 与全局钩子不同，这些钩子能够识别扩展的上下文
test.beforeEach(({ todos }) => {
    // (todos as number[]).push(1)
})

test.afterEach(({ todos }) => {
})

test<TestData>('add items to todos', ({ todos }) => {
    expect(todos.length).toBe(3)
    todos.push(4)
    expect(todos.length).toBe(4)
})

test<TestData>('move items from todos to archive', ({ todos, archive }) => {
    expect(todos.length).toBe(3)
    expect(archive.length).toBe(0)

    archive.push((todos.pop() as number))
    expect(todos.length).toBe(2)
    expect(archive.length).toBe(1)
})