//   自定义局部序列化器
//   使用toMatchInlineSnapshot测试快照
import { expect, test } from 'vitest'
import type {SnapshotSerializer} from "vitest";
// 1. 定义自定义序列化器
const customSerializer:SnapshotSerializer = {
    serialize(val, config, indentation, depth, refs, printer) {
        // 返回字符串表示
        return `Custom Serializer Output:\n${JSON.stringify(val, null, 2)}`
    },

    // 2. 检测是否应该使用此序列化器
    test(val) {
        // 当值为特定类型时使用此序列化器
        return val && val.__type === 'CustomClass'
    }
}
// // // 3. 注册序列化器
expect.addSnapshotSerializer(customSerializer)

test('custom serializer example', () => {
    const data = {
        __type: 'CustomClass',
        id: 123,
        name: 'test'
    }

    expect(data).toMatchInlineSnapshot(`
    Custom Serializer Output:
    {
      "__type": "CustomClass",
      "id": 123,
      "name": "test"
    }
  `)
})