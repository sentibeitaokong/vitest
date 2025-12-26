//各类文件快照测试
//# Vitest - 更新所有过期快照
//npx vitest -u
import {describe, expect, it} from 'vitest'
import {renderHTML} from './render.ts'
import { h } from './h.ts'
describe('fileScreenshot test',()=>{
    //html文件快照测试
    it('html snapshot', async () => {
        const html = `
    <div class="container">
      <h1>Title</h1>
      <p>Content here</p>
    </div>
  `.trim()
        await expect(html).toMatchFileSnapshot('./__snapshots__/html-output.html')
    })
    //字符串文件快照测试
    it('simple string snapshot', async () => {
        const data = 'Hello, World!'
        await expect(data).toMatchFileSnapshot('./__snapshots__/simple.txt')
    })

    //简单生成html
    it('renders basic div', async () => {
        const html = renderHTML(h('div', { class: 'foo', id: 'test' }))
        await expect(html).toMatchFileSnapshot('./__snapshots__/basic.output.html')
    })
    //生成嵌套元素
    it('renders nested elements', async () => {
        const html = renderHTML(
            h('div', { class: 'container' }, [
                h('h1', { class: 'title' }, 'Hello World'),
                h('p', {}, 'This is a paragraph'),
                h('button', { disabled: true, type: 'submit' }, 'Click me')
            ])
        )
        await expect(html).toMatchFileSnapshot('./__snapshots__/nested.output.html')
    })
    //生成有属性的元素
    it('handles boolean attributes', async () => {
        const html = renderHTML(
            h('input', { type: 'checkbox', checked: true, disabled: false })
        )
        await expect(html).toMatchFileSnapshot('./__snapshots__/attributes.output.html')
    })
})