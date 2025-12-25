import {test,expect,describe} from "vitest";
import Helloworld from "./helloworld.vue";
import {render} from "vitest-browser-vue";

describe('test component',()=>{
    test('hello world',async()=>{
        const {getByTestId}=render(Helloworld)
        await expect.element(getByTestId('button')).toBeDisabled() // ✅
        // await expect.element(getByTestId('button')).not.toBeDisabled()
    })
})