import { expect, it } from 'vitest'

//内联快照 Vitest 不会创建快照文件，而是直接修改测试文件，将快照作为字符串更新到文件中
it('inlineScreenshot test', () => {
    const result = 'foobar'.toUpperCase()
    expect(result).toMatchInlineSnapshot(`"FOOBAR"`)
})