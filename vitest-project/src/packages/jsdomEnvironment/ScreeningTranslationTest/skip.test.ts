import { assert, describe, it } from 'vitest'

//跳过测试套件和测试  describe.skip里面的全跳过
describe.skip('skipped suite', () => {
    it('test', () => {
        // 已跳过此测试套件，无错误
        assert.equal(Math.sqrt(4), 3)
    })
})

describe('suite', () => {
    //跳过这条测试
    it.skip('skipped test', () => {
        // 已跳过此测试，无错误
        assert.equal(Math.sqrt(4), 3)
    })
})