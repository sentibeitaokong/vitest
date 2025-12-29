export function foo():string {
    return 'foo'
}

export function foobar():string {
    return `${foo()}bar`
}