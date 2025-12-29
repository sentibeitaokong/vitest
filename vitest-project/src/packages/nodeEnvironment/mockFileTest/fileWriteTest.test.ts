import { fs, vol } from 'memfs'
import { beforeEach, expect, it, vi } from 'vitest'
import { readHelloWorld } from './read-hello-world.ts'
// 让 Vitest 使用 __mocks__ 文件夹中的 fs 模拟
// 若需始终模拟 fs，可在配置文件中设置
/*vi.mock('node:fs')
vi.mock('node:fs/promises')*/

beforeEach(() => {
    // 重置内存文件系统状态
    vol.reset()
})

it('should return correct text', () => {
    const path = '/hello-world.txt'
    fs.writeFileSync(path, 'hello world')

    const text = readHelloWorld(path)
    expect(text).toBe('hello world')
})

it('can return a value multiple times', () => {
    // 可使用 vol.fromJSON 定义多个文件
    vol.fromJSON(
        {
            './dir1/hw.txt': 'hello dir1',
            './dir2/hw.txt': 'hello dir2',
        },
        // 默认当前工作目录
        '/tmp',
    )

    expect(readHelloWorld('/tmp/dir1/hw.txt')).toBe('hello dir1')
    expect(readHelloWorld('/tmp/dir2/hw.txt')).toBe('hello dir2')
})
