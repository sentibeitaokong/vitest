// 全局序列化器，使用自己的逻辑修改快照的序列化
import { expect } from 'vitest'
import {SnapshotSerializer} from "vitest";

// ========== 1. HTML 序列化器 ==========  隐式添加自定义序列化器
export const htmlSerializer = {
    serialize(htmlString) {
        // 美化 HTML
        console.log('123123')
        const beautifyHTML = (html) => {
            let indent = ''
            const result = html
                .replace(/(>)(<)(\/*)/g, '$1\n$2$3')
                .split('\n')
                .map(line => {
                    if (line.match(/^<\/\w/)) {
                        indent = indent.substring(2)
                    }
                    const indentedLine = indent + line
                    if (line.match(/^<\w[^>]*[^/]>.*$/)) {
                        indent += '  '
                    }
                    return indentedLine
                })
                .join('\n')
            return `HTML:\n${result}`
        }
        return beautifyHTML(htmlString)
    },

    test(val) {
        return typeof val === 'string' &&
            (val.trim().startsWith('<') || val.includes('</'))
    }
} satisfies SnapshotSerializer

// ========== 2. Date 序列化器 ==========
const dateSerializer = {
    serialize(date) {
        // 统一日期格式，忽略具体时间
        if (date instanceof Date) {
            return `Date: ${date.toISOString().split('T')[0]}`
        }
        return String(date)
    },

    test(val) {
        return val instanceof Date
    }
}

// ========== 3. Error 序列化器 ==========
const errorSerializer = {
    serialize(error) {
        return `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack?.split('\n')[0]}`
    },

    test(val) {
        return val instanceof Error
    }
}

// ========== 4. 忽略敏感数据序列化器 ==========
const sensitiveDataSerializer = {
    serialize(obj) {
        const masked = { ...obj }

        // 隐藏敏感字段
        if ('password' in masked) masked.password = '***HIDDEN***'
        if ('token' in masked) masked.token = '***HIDDEN***'
        if ('email' in masked) masked.email = masked.email.replace(/(?<=.).(?=.*@)/g, '*')

        // 使用默认的打印机处理剩余部分
        return JSON.stringify(masked, null, 2)
    },

    test(val) {
        return val && typeof val === 'object' &&
            ('password' in val || 'token' in val || 'email' in val)
    }
}

// ========== 5. 大型数组格式化器 ==========
const largeArraySerializer = {
    serialize(arr, config, indentation, depth, refs, printer) {
        if (arr.length > 10) {
            const preview = arr.slice(0, 3)
            return `Array[${arr.length}]: [\n` +
                preview.map(item =>
                    indentation + '  ' + printer(item, config, depth + 1, refs)
                ).join(',\n') +
                `,\n${indentation}  ... ${arr.length - 3} more items\n` +
                `${indentation}]`
        }
        // 小型数组使用默认格式化
        return printer(arr, config, depth, refs)
    },

    test(val) {
        return Array.isArray(val) && val.length > 10
    }
}

//
// 注册所有序列化器
expect.addSnapshotSerializer(htmlSerializer)
expect.addSnapshotSerializer(dateSerializer)
expect.addSnapshotSerializer(errorSerializer)
expect.addSnapshotSerializer(sensitiveDataSerializer)
expect.addSnapshotSerializer(largeArraySerializer)