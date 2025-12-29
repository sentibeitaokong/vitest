import { describe, expect, it, vi } from 'vitest'

const Dog = vi.fn(class {

    static getType:Function = vi.fn(() => 'mocked animal')
    name:string
    constructor(name:string) {
        this.name = name
    }

    greet = vi.fn(() => `Hi! My name is ${this.name}!`)
    speak = vi.fn(() => 'loud bark!')
    feed = vi.fn()
})
describe('mockClass test', () =>{
    it('mockDog test', () => {
        const Cooper = new Dog('Cooper')
        Cooper.speak() // loud bark!
        Cooper.greet() // Hi! My name is Cooper!

        // 你可以使用内置断言来检查调用的有效性
        expect(Cooper.speak).toHaveBeenCalled()
        expect(Cooper.greet).toHaveBeenCalled()

        const Max = new Dog('Max')

        // 如果你直接赋值方法，这些方法在实例之间不会共享
        expect(Max.speak).not.toHaveBeenCalled()
        expect(Max.greet).not.toHaveBeenCalled()
        const dog = new Dog('Cooper')

        // "vi.mocked" 是一个类型辅助工具，因为
        // TypeScript 不知道 Dog 是一个被模拟的类，
        // 它将任何函数包装在 Mock<T> 类型中
        // 而不会验证该函数是否为模拟函数
        //修改dog.speak方法为woof woof
        vi.mocked(dog.speak).mockReturnValue('woof woof')
        dog.speak() // woof woof

        const nameSpy = vi.spyOn(dog, 'name', 'get').mockReturnValue('Max')
        expect(dog.name).toBe('Max')
        expect(nameSpy).toHaveBeenCalledTimes(1)
    });
})