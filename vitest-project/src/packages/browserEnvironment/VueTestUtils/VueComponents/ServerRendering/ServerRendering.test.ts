import { renderToString } from '@vue/test-utils'
import {expect,it} from "vitest";
import ServerRendering from './ServerRendering.vue'
//服务端渲染
it('renders the value returned by onServerPrefetch', async () => {
    //renderToString 是一个将 Vue 组件渲染为字符串的函数
    const contents = await renderToString(ServerRendering)
    expect(contents).toBe('<div>onServerPrefetch</div>')
})