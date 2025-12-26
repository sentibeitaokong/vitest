import {describe, expect, test,beforeAll} from 'vitest'

describe('timeout',()=>{
    //前置钩子也可以设置超时限制 默认五秒
    beforeAll(async () => {
        /* ... */
    }, 1000)
    //第三个参数是超时限制   默认5秒
    test('timeout limit', async () => {
        /* ... */
        expect(1+1).toBe(2)
    }, 1000)
})