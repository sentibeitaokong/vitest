
export type VNodeChild = string | VNode | VNode[] | null | undefined | boolean | number
export interface VNode {
    tag: string
    props?: Record<string, any>
    children?: VNodeChild
}