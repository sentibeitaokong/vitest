//虚拟DOM的创建函数
import type { VNode, VNodeChild } from './types.ts'
export function h(
    tag: string,
    props?: Record<string, any>,
    children?: VNodeChild
): VNode {
    return { tag, props, children }
}