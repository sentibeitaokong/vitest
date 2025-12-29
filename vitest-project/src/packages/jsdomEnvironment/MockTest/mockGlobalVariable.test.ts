import {describe, vi,it} from 'vitest'
//模拟全局对象
describe('globalVariable test', () => {
    it('globalVariable', () => {
        const IntersectionObserverMock = vi.fn(class {
            disconnect = vi.fn()
            observe = vi.fn()
            takeRecords = vi.fn()
            unobserve = vi.fn()
        })

        vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    });
})
// 现在你可以通过 `IntersectionObserver` 或 `window.IntersectionObserver` 来访问它