import { assert, describe, it } from 'vitest'

// 仅运行此测试套件（以及标记为 Only 的其他测试套件）
describe.only('suite', () => {
    it('test', () => {
        assert.equal(Math.sqrt(4), 2)
    })
})

describe('another suite', () => {
    it('skipped test', () => {
        // 已跳过测试，因为测试在 Only 模式下运行
        assert.equal(Math.sqrt(4), 3)
    })

    it.only('test', () => {
        // 仅运行此测试（以及标记为 Only 的其他测试）
        assert.equal(Math.sqrt(4), 2)
    })
})