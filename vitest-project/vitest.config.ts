import  { defineProject, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
export default mergeConfig(viteConfig, defineProject({
    test: {
        //多项目配置
        projects: [
            // 你可以使用全局模式的列表来定义你的项目
            // Vitest 需要一个配置文件列表
            // 或有配置文件的目录
            'src/packages/*',
            '!src/packages/browserEnvironment',
            // 你甚至可以运行相同的测试，
            // 但在同一个 "vitest" 进程中有不同的配置
            {
                // extends:false,    //继承根配置
                test: {
                    name: 'js-dom',       //名称
                    environment: 'jsdom',    //环境
                    include: ['jsdomEnvironment/**/*.{test,spec}.{ts,js}'],    //监控的文件
                    exclude:['browserEnvironment/**/*.{test,spec}.{ts,js}']
                },
            },
            {
                // extends:true,
                test: {
                    name:'node',
                    environment: 'node',
                    include: ['nodeEnvironment/**/*.{test,spec}.{ts,js}'],
                    exclude:['browserEnvironment/**/*.{test,spec}.{ts,js}']
                },
            },
            /*{
                test: {
                    name: 'browser',
                    include: ['browserEnvironment/!**!/!*.{test,spec}.{ts,js}'],
                    browser: {
                        enabled: true,       //浏览器模式
                        provider: playwright(),
                        headless:true,    //无头模式
                        instances: [
                            { browser: 'chromium' },    //谷歌浏览器
                        ],
                    }
                },
            },*/
        ],

    },
}))