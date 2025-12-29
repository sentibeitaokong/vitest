//Mocked module （模拟模块）：原模块被完全替换成另一个模块；
// Spied module （监听模块）：属于模拟模块的一种，但其导出方法依然保留原始实现，同时可跟踪调用情况；
// Mocked export （模拟导出）：模块中被替换的某个导出，其调用记录可被跟踪；
// Spied export （监听导出）：一种模拟导出形式，带有调用跟踪能力。
/*
//修改模块内容
import { vi } from 'vitest'
vi.mock(import('./example.js'), () => {
    return {
        answer() {
            // ...
            return 42
        },
        variable: 'mock',
    }
})*/

//mock工厂方法会接收一个 importOriginal 函数，该函数用于执行原始模块代码，并返回对应的模块对象。
/*import { expect, vi,it } from 'vitest'
import { answer } from './example.ts'
it('module test', () => {
    vi.mock(import('./example.ts'), async (importOriginal) => {
        const originalModule = await importOriginal()
        return {
            answer: vi.fn(originalModule.answer),   //追踪answer方法
            variable: 'mock',
        }
    })

    expect(answer()).toBe(42)

    expect(answer).toHaveBeenCalled()
});*/

//模块以命名空间对象的形式导入
//如果需要使用 importOriginal，可以考虑使用另一个 API —— vi.spyOn ——
// 来直接监听模块的某个导出方法。 这种方式无需替换整个模块，而是仅对目标方法进行监听。
/*import { expect, vi,it } from 'vitest'
import * as exampleObject from './example.ts'

it('mock spyOn test',()=>{
    //vi.spyOn监听对象某个属性，mockReturnValue修改属性返回值，无法在浏览器模式使用
    const spy = vi.spyOn(exampleObject, 'answer').mockReturnValue(0)

    expect(exampleObject.answer()).toBe(0)
    expect(exampleObject.answer).toHaveBeenCalled()
})*/

//可以浏览器中使用,等同与vi.spyOn
/*import { vi,it} from 'vitest'
import * as exampleObject from './example.ts'

it('mock spyOn test',()=>{
    vi.mock('./example.ts', { spy: true })
    vi.mocked(exampleObject.answer).mockReturnValue(0)
})*/

//模块模拟的常见陷阱
//，如果一个方法是在同一文件内由另一个方法调用的，那么它无法通过外部进行 mock。 例如，以下代码中就存在这种情况：
//foobar方法在同一个文件内调用foo方法，只能改变foo方法外部的值，内部无法改变，因此foobar方法总是打印同一个值
import {vi, it, expect} from 'vitest'
import * as mod from './foobar.ts'

// this will only affect "foo" outside of the original module
it('module error test',()=>{
    vi.spyOn(mod, 'foo')
    vi.mock(import('./foobar.ts'), async (importOriginal) => {
        return {
            ...await importOriginal(),
            // this will only affect "foo" outside of the original module
            foo: () => 'mocked'
        }
    })
})


