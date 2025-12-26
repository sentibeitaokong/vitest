//测试上下文
import {describe, it,expect} from 'vitest'
import {test} from '../ExtendContextTest/extendVariable.ts'
describe('test context',()=>{
    // 打印测试的名称
    it('context task', ({ task }) => {
    })
    //绑定到当前测试的 expect API:
    it('context expect', ({ expect }) => {
        expect(2 + 2).toBe(4)
    })
    //concurrent并行测试
    it.concurrent('context concurrent', ({ expect }) => {
        expect(2 + 2).toMatchInlineSnapshot(`4`)
    })
    it.concurrent('context concurrent', ({ expect }) => {
        expect(2 * 2).toMatchInlineSnapshot(`4`)
    })
    //跳过后续测试执行并将测试标记为已跳过：
    it('context skip', ({ skip }) => {
        skip()
        expect(2 + 2).toBe(5)
    })
    //传入一个布尔值参数来按条件跳过某个测试
    test('math is hard', ({skip,mind }) => {
        skip(mind=='foggy')
        expect(2 + 2).toBe(5)
    })
})