import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const businessHours:number[] = [9, 17]

function purchase() {
    const currentHour = new Date().getHours()
    const [open,close] = businessHours

    if (currentHour > (open as number) && currentHour < (close as number)) {
        return { message: 'Success' }
    }

    return { message: 'Error' }
}

describe('purchasing flow', () => {
    beforeEach(() => {
        // 告诉 vitest 我们使用模拟时间
        vi.useFakeTimers()
    })

    afterEach(() => {
        // 在每次测试运行后恢复日期
        vi.useRealTimers()
    })

    it('allows purchases within business hours', () => {
        // 设置在营业时间内的小时数
        const date = new Date(2000, 1, 1, 13)
        //设置系统时间
        vi.setSystemTime(date)
        debugger

        // 访问 `Date.now()` 将会返回上面设置的日期
        expect(purchase()).toEqual({ message: 'Success' })
    })

    it('disallows purchases outside of business hours', () => {
        // 设置在营业时间外的小时数
        const date = new Date(2000, 1, 1, 19)
        vi.setSystemTime(date)

        // 访问 `Date.now()` 将会返回上面设置的日期
        expect(purchase()).toEqual({ message: 'Error' })
    })
})