//虚拟DOM到HTML字符串的渲染器
import type { VNodeChild } from './types.ts'
export function renderHTML(vnode: VNodeChild): string {
    // 1. 处理基本类型
    switch (typeof vnode) {
        case 'string':
            // 转义 HTML 特殊字符防止 XSS
            return vnode
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
        case 'number':
        case 'boolean':
            return String(vnode)
    }

    // 2. 处理 null 和 undefined
    if (vnode == null) {
        return ''
    }

    // 3. 处理数组
    if (Array.isArray(vnode)) {
        return vnode.map(child => renderHTML(child)).join('')
    }

    // 4. 处理 VNode 对象
    const { tag, props, children } = vnode

    // 处理属性
    const attributes = Object.entries(props || {})
        .map(([key, value]) => {
            // 跳过事件处理器（不渲染到 HTML）
            if (typeof value === 'function') {
                return ''
            }

            // 处理样式对象
            if (key === 'style' && typeof value === 'object') {
                const styleStr = Object.entries(value as Record<string, any>)
                    .map(([cssKey, cssValue]) => `${cssKey}: ${cssValue}`)
                    .join('; ')
                return `style="${styleStr}"`
            }

            // 处理 class 数组或对象
            if (key === 'class') {
                let className = ''
                if (Array.isArray(value)) {
                    className = value.filter(Boolean).join(' ')
                } else if (typeof value === 'object') {
                    className = Object.entries(value)
                        .filter(([_, enabled]) => enabled)
                        .map(([name]) => name)
                        .join(' ')
                } else {
                    className = String(value || '')
                }
                return className ? `class="${className}"` : ''
            }

            // 处理布尔属性
            if (value === true) return key
            if (value === false || value == null) return ''

            // 处理普通属性值
            return `${key}="${String(value).replace(/"/g, '&quot;')}"`
        })
        .filter(Boolean)
        .join(' ')

    // 处理子节点
    const childrenHTML = renderHTML(children || '')

    // 自闭合标签
    const voidElements = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
        'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
    ])

    if (voidElements.has(tag.toLowerCase()) && !childrenHTML) {
        return attributes ? `<${tag} ${attributes} />` : `<${tag} />`
    }

    return attributes
        ? `<${tag} ${attributes}>${childrenHTML}</${tag}>`
        : `<${tag}>${childrenHTML}</${tag}>`
}