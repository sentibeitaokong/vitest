import  { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import customEnvironment from "./src/packages/jsdomEnvironment/CustomEnvironment/customEnvironment";
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
export default mergeConfig(viteConfig, defineConfig({
    test: {
        reporters: ['html'],
        /*reporters: ['junit', 'json', 'verbose'], //报告器类型
        outputFile: {                              //按报告器类型输出写入文件
            junit: './junit-report.xml',
            json: './json-report.json',
        },*/

        //覆盖率
       /* coverage: {
            provider: 'v8', // or 'istanbul'
            include: ['jsdomEnvironment/!**!/!*.{test,spec}.{ts,js}'],
        },*/
        //多项目配置
        projects: [
            // 你可以使用全局模式的列表来定义你的项目
            // Vitest 需要一个配置文件列表
            // 或有配置文件的目录
            'src/packages/*',
            '!src/packages/browserEnvironment',
            '!node_modules/',
            // 你甚至可以运行相同的测试，
            // 但在同一个 "vitest" 进程中有不同的配置
            {
                // extends:false,    //继承根配置
                test: {
                    name: 'js-dom',       //名称
                    environment: 'jsdom',    //环境
                    // environment: 'customEnvironment',    //自定义环境
                    snapshotSerializers: ['globalSerializer.ts'],     //使用全局序列化器配置快照序列化方式
                    include: ['jsdomEnvironment/**/*.{test,spec}.{ts,js}'],    //监控的文件
                    exclude:['browserEnvironment/**/*.{test,spec}.{ts,js}','node_modules'],
                },
            },
            {
                // extends:true,
                test: {
                    name:'node',
                    environment: 'node',
                    include: ['nodeEnvironment/**/*.{test,spec}.{ts,js}'],
                    exclude:['browserEnvironment/**/*.{test,spec}.{ts,js}','node_modules']
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