//全局序列化器
// 使用toMatchSnapshot测试快照
//快照的作用：
// 捕获组件、数据结构或任何可序列化内容在某一时刻的“正确”状态，并将其保存为参照文件（快照文件）。
// 之后在测试中，将当前运行结果与这个保存的快照进行自动比对，以确保输出没有发生意外改变。
import { expect, test, describe } from 'vitest'
describe('All Serializers', () => {
    test('HTML string', () => {
        const html = '<div class="container"><h1>Title</h1><p>Content</p></div>'
        expect(html).toMatchSnapshot(`
      HTML:
      <div class="container">
        <h1>
          Title
        </h1>
        <p>
          Content
        </p>
      </div>
    `)
    })

    test('Date object', () => {
        const date = new Date('2023-12-25T00:00:00.000Z')
        expect(date).toMatchSnapshot('Date: 2023-12-25')
    })

    test('Error object', () => {
        const error = new Error('Something went wrong')
        expect(error).toMatchSnapshot(`
      Error: Error
      Message: Something went wrong
      Stack: Error: Something went wrong
    `)
    })

    test('User with sensitive data', () => {
        const user = {
            id: 123,
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'secret123',
            token: 'abc123xyz',
            createdAt: new Date('2023-01-01')
        }

        expect(user).toMatchSnapshot(`
      {
        "id": 123,
        "name": "John Doe",
        "email": "j***.d**@example.com",
        "password": "***HIDDEN***",
        "token": "***HIDDEN***",
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    `)
    })

    test('Large array', () => {
        const largeArray = Array.from({ length: 20 }, (_, i) => i + 1)
        expect(largeArray).toMatchSnapshot(`
      Array[20]: [
        1,
        2,
        3,
        ... 17 more items
      ]
    `)
    })
})