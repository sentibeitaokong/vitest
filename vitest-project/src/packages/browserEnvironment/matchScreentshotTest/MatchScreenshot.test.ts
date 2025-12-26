import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import {render} from "vitest-browser-vue";
import MatchScreenshot from "./MatchScreenshot.vue";

test('hero section looks correct', async () => {
    // ...the rest of the test
    const screen=render(MatchScreenshot)
    // capture and compare screenshot
    await expect(screen.getByTestId('hero')).toMatchScreenshot('hero-section')
    // await expect(screen.getByTestId('hero')).toMatchScreenshot({
    //     screenshotOptions: {
    //         mask: [page.getByTestId('hero')],     //动态区域遮盖
    //     },
    // })
})