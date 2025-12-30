import {defineConfig,mergeConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import viteConfig from "./vite.config";
import vue from '@vitejs/plugin-vue'

export default mergeConfig(viteConfig,defineConfig({
    test: {
        include: ['src/packages/browserEnvironment/**/*.{test,spec}.{ts,js}'],    //访问范围
        name:'brower',
        //浏览器模式
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,                //无头模式
            snapshotSerializers: [],        //禁用快照
            // trace:{
            //     mode:'retain-on-failure',                   //追踪模式
            //     tracesDir: './playwright-traces',    //追踪文件输出相对于根目录
            // },

            // https://vitest.dev/config/browser/playwright
            //多环境配置   多种浏览器使用统一配置
            instances: [
                {   browser: 'chromium',
                    // viewport: { width: 1280, height: 720}, //固定视口大小
                },

               /* { browser: 'firefox' },
                { browser: 'webkit' },*/
            ],
            //同种浏览器指定不同的配置选项
            // instances: [
            //     {
            //         browser: 'chromium',
            //         name: 'chromium-1',
            //         provide: {                      //依赖注入,在测试文件中inject('ratio')访问
            //             ratio: 1,
            //         },
            //     },
            //     {
            //         browser: 'chromium',
            //         name: 'chromium-2',
            //         provide: {
            //             ratio: 2,
            //         },
            //     },
            // ],

            //快照参数
            // expect: {
            //     toMatchScreenshot: {
            //         comparatorName: 'pixelmatch',     // pixelmatch 比较器
            //         comparatorOptions: {
            //             // 0-1, how different can colors be?
            //             threshold: 0.2,                  //颜色差异阈值（threshold）不超过 0.2
            //             // 1% of pixels can differ
            //             allowedMismatchedPixelRatio: 0.01,  //允许最多 1% 的像素点存在差异
            //         },
            //     },
            // },
        },
    },
}))
