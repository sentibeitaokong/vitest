import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function executeAfterTwoHours(func:Function) {
    setTimeout(func, 1000 * 60 * 60 * 2) // 2 小时
}

function executeEveryMinute(func:Function) {
    setInterval(func, 1000 * 60) // 1 分钟
}

const mock = vi.fn(() => console.log('executed'))

describe('delayed execution', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })
    it('should execute the function', () => {
        executeAfterTwoHours(mock)
        vi.runAllTimers()
        expect(mock).toHaveBeenCalledTimes(1)
    })
    it('should not execute the function', () => {
        executeAfterTwoHours(mock)
        // 前进 2 毫秒不会触发该函数
        vi.advanceTimersByTime(1)
        expect(mock).toHaveBeenCalled()
    })
    it('should execute every minute', () => {
        executeEveryMinute(mock)
        //调用下一个计时器
        vi.advanceTimersToNextTimer()
        expect(mock).toHaveBeenCalledTimes(2)
        vi.advanceTimersToNextTimer()
        expect(mock).toHaveBeenCalledTimes(3)
    })
})