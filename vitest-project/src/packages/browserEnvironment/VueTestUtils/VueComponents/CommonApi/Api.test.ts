import { mount,RouterLinkStub,config } from '@vue/test-utils'
import {test, expect, describe,vi} from "vitest";
import { h,defineComponent,inject } from 'vue'

describe('common Api tests',()=>{
    //指定要挂载组件的节点。当使用 renderToString 时，此选项不可用。
    //注意，组件是附加到节点上的，并不会替换节点的整个内容
    const Component = {
        template: `
         <p>Vue Component</p>
    `,
    }
    test('attachTo', () => {

        document.body.innerHTML = `
          <div>
            <h1>Non Vue app</h1>
            <div id="app"></div>
          </div>
        `
        const wrapper = mount(Component, {
            attachTo: document.getElementById('app')
        })
        expect(document.body.innerHTML).toBe(`
          <div>
            <h1>Non Vue app</h1>
            <div id="app"><div data-v-app=""><p>Vue Component</p></div></div>
          </div>
        `)
    })
    //为组件设置 HTML 属性。
    test('attrs', () => {
        const Component = {
            template: `
         <p>Vue Component</p>
    `,
        }
        const wrapper = mount(Component, {
            attrs: {
                id: 'hello',
                disabled: true
            }
        })
        expect(wrapper.attributes()).toEqual({
            disabled: 'true',
            id: 'hello'
        })
    })
    //请注意，已定义的属性会覆盖 HTML 属性的设置
    test('attribute is overridden by a prop with the same name', () => {
        const Component = {
            props:['message'],
            template: `
                <p>Vue Component</p>
            `,
        }
        const wrapper = mount(Component, {
            props: {
                message: 'Hello World'
            },
            attrs: {
                message: 'this will get overridden'
            }
        })
        expect(wrapper.props()).toEqual({ message: 'Hello World' })
        expect(wrapper.attributes()).toEqual({})
    })
    //覆盖组件的默认 data。必须是一个函数。
    test('data', () => {
        const Component = {
            data() {
                return {
                    message: 'everyone'
                }
            },
            template: `
              <div>Hello {{ message }}</div>
            `,
        }
        const wrapper = mount(Component, {
            data() {
                return {
                    message: 'world'
                }
            }
        })
        expect(wrapper.html()).toContain('Hello world')
    })
    //在组件挂载时设置 props。
    test('props', () => {
        const Component = {
            props: {
                count: {
                    type: Number,
                    required: true
                }
            },
            template: `
              <span>Count: {{ count }}</span>
            `,
        }
        const wrapper = mount(Component, {
            props: {
                count: 5
            }
        })

        expect(wrapper.html()).toContain('Count: 5')
    })
    //为组件的插槽设置值。
    test('renders slots content', () => {
        const Component = {
            template: `
              <slot name="first" />
              <slot />
              <slot name="second" />
            `,
        }
        const Bar = {
            template: `
             <div>Bar</div>
            `,
        }
        const wrapper = mount(Component, {
            slots: {
                default: 'Default',
                first: h('h1', {}, 'Named Slot'),
                second: Bar
            }
        })

        expect(wrapper.html({raw:true})).toContain('<h1>Named Slot</h1>Default<div>Bar</div>')
    })
    //将组件全局注册到挂载的组件中。
    test('global.components', () => {
        const GlobalComponent = {
            template: `
             <div class="global-component">My Global Component</div>
            `,
        }
        const Component = {
            components:{
                GlobalComponent
            },
            template: `
              <div>
                <global-component />
               </div>
            `,
        }
        const wrapper = mount(Component, {
            global: {
                components: {
                    GlobalComponent
                }
            }
        })

        expect(wrapper.find('.global-component').exists()).toBe(true)
    })
    // global.config 配置 Vue 的应用程序全局配置。
    // global.directives  将指令全局注册到挂载的组件中。
    //global.mixins  将混入全局注册到挂载的组件中。
    /*test('global.mixins', () => {
        const wrapper = mount(Component, {
            global: {
                mixins: [mixin]
            }
        })
    })*/
    //global.mocks 模拟全局实例属性。可用于模拟 this.$store、this.$router 等。
    test('global.mocks', async () => {
        const Component = {
            methods: {
                onClick() {
                    this.$store.dispatch('click')
                }
            },
            template: `
              <button @click="onClick" />
            `,
        }
        const $store = {
            dispatch: vi.fn()
        }

        const wrapper = mount(Component, {
            global: {
                mocks: {
                    $store
                }
            }
        })

        await wrapper.find('button').trigger('click')

        expect($store.dispatch).toHaveBeenCalledWith('click')
    })
    //global.plugins 在挂载的组件上安装插件。
    test('global.plugins', () => {
        const Component = {
            template: `
             <div>plugins</div>
            `,
        }
        const myPlugin={}
        mount(Component, {
            global: {
                plugins: [myPlugin]
            }
        })
    })
    //要使用带选项的插件，可以传递选项数组。
    test('global.plugins with options', () => {
        const Component = {
            template: `
             <div>plugins</div>
            `,
        }
        const Plugin={}
        const PluginWithOptions={}
        mount(Component, {
            global: {
                plugins: [Plugin, [PluginWithOptions, 'argument 1', 'another argument']]
            }
        })
    })
    //global.provide  提供数据，以便在 setup 函数中通过 inject 接收。
    test('global.provide', () => {
        const Component = {
            setup() {
                const theme = inject('Theme')
                return {
                    theme
                }
            },
            template: `<div>Theme is {{ theme }}</div>`
        }
        const wrapper = mount(Component, {
            global: {
                provide: {
                    Theme: 'dark'
                }
            }
        })
        expect(wrapper.html()).toBe('<div>Theme is dark</div>')
    })
    //global.renderStubDefaultSlot
    // 即使在使用 shallow 或 shallowMount 时，也会渲染 default 插槽内容。 详情GlobalStub文件
    test('global.renderStubDefaultSlot', () => {
        const AnotherComponent={
            template: `<p>Another component content</p>`
        }
        const ComponentWithSlots={
            components: {
                AnotherComponent
            },
            template: ` <slot /><another-component></another-component>`
        }
        const wrapper = mount(ComponentWithSlots, {
            slots: {
                default: '<div>My slot content</div>'
            },
            shallow: true,
            global: {
                renderStubDefaultSlot: true
            }
        })

        expect(wrapper.html({ raw: true })).toBe(
            '<div>My slot content</div><another-component-stub></another-component-stub>'
        )
    })
    //global.stubs 在挂载的组件上使用全局测试替身 (stub)。 详情GlobalStub文件
    //shallow 组件的所有子组件替换为测试替身。 详情GlobalStub文件


    // attributes  返回 DOM 节点上的属性。
    test('attributes', () => {
        const Component = {
            data() {
                return {
                    className: 'bar'
                }
            },
            template: ` <div id="foo" :class="className" />`
        }
        const wrapper = mount(Component)
        expect(wrapper.attributes('id')).toBe('foo')
        expect(wrapper.attributes('class')).toBe('bar')
    })
    //classes 返回元素上的类名数组。
    test('classes', () => {
        const Component = {
            template: `<span class="my-span" />`
        }
        const wrapper = mount(Component)
        expect(wrapper.classes()).toContain('my-span')
        expect(wrapper.classes('my-span')).toBe(true)
        expect(wrapper.classes('not-existing')).toBe(false)
    })
    //emitted 返回组件发出的所有事件。
    test('emitted', () => {
        const Component = {
            template: `<div>Component</div>`,
            created() {
                this.$emit('greet', 'hello')
                this.$emit('greet', 'goodbye')
            },
            render(){

            }
        }

        const wrapper = mount(Component)
        expect(wrapper.emitted()).toHaveProperty('greet')
        // expect(wrapper.emitted().greet).toHaveLength(2)
        // expect(wrapper.emitted().greet[0]).toEqual(['hello'])
        // expect(wrapper.emitted().greet[1]).toEqual(['goodbye'])
    })
    // exists 验证一个元素是否存在。
    test('exists', () => {
        const Component = {
            template: `<span />`
        }
        const wrapper = mount(Component)

        expect(wrapper.find('span').exists()).toBe(true)
        expect(wrapper.find('p').exists()).toBe(false)
    })
    //find 查找一个元素，如果找到则返回一个 DOMWrapper。
    //你可以使用与 querySelector 相同的语法。find 基本上是 querySelector 的别名。此外，你还可以搜索元素引用。
    // 它与 get 类似，但如果未找到元素，find 将返回一个 ErrorWrapper，而 get 会抛出一个错误。
    // 根据经验，当你断言某个元素不存在时，请始终使用 find。如果你断言某个元素确实存在，请使用 get。
    test('find', () => {
        const Component = {
            template: `
                <span>Span</span>
                <span data-test="span">Span</span>
                <span ref="span">Span</span>
            `
        }
        const wrapper = mount(Component)
        wrapper.find('span') //=> found; returns DOMWrapper
        wrapper.find('[data-test="span"]') //=> found; returns DOMWrapper
        wrapper.find({ ref: 'span' }) //=> found; returns DOMWrapper
        wrapper.find('p') //=> nothing found; returns ErrorWrapper
    })
    //findAll  与 find 类似，但返回的是一个 DOMWrapper 数组。
    test('findAll', () => {
        const BaseTable={
            template: `
                 <span v-for="number in [1, 2, 3]" :key="number" data-test="number">
                    {{ number }}
                  </span>
            `
        }
        const wrapper = mount(BaseTable)

        // .findAll() returns an array of DOMWrappers
        const thirdRow = wrapper.findAll('span')[2]
    })
    //findComponent 找到一个 Vue 组件实例并返回一个 VueWrapper (如果找到)。否则返回 ErrorWrapper。
    /*
        querySelector	findComponent('.component')	匹配标准查询选择器。
        组件名称	findComponent({name: 'a'})	匹配 PascalCase、snake-case 和 camelCase。
        组件引用	findComponent({ref: 'ref'})	仅可用于已挂载组件的直接引用子组件。
        单文件组件(SFC)	findComponent(Component)	直接传入导入的组件。
    */
    //例如，当使用 wrapper.findComponent('.foo') 时，VTU 将返回 WrapperLike 类型。
    // 这是因为功能组件需要一个 DOMWrapper，否则返回的是 VueWrapper。
    // 你可以通过提供正确的组件类型来强制返回 VueWrapper：
    // wrapper.findComponent('.foo') // returns WrapperLike
    // wrapper.findComponent<typeof FooComponent>('.foo') // returns VueWrapper
    // wrapper.findComponent<DefineComponent>('.foo') // returns VueWrapper
    test('findComponent', () => {
        const Foo={
            name: 'Foo',
            template: `<div class="foo">Foo</div>`
        }
        const Component = {
            template: `<Foo data-test="foo" ref="foo" class="foo" />`,
            components:{
                Foo
            }
        }
        const wrapper = mount(Component)

        // 所有以下查询将返回一个 VueWrapper
        wrapper.findComponent('.foo')
        wrapper.findComponent('[data-test="foo"]')
        wrapper.findComponent({ name: 'Foo' })
        wrapper.findComponent({ ref: 'foo' })
        wrapper.findComponent(Foo)
    })
    //findAllComponents 与 findComponent 类似，但查找所有匹配查询的 Vue 组件实例。返回一个 VueWrapper 数组。
    //ref 语法在 findAllComponents 中不支持。所有其他查询语法都是有效的。
    //findAllComponents 在使用 CSS 选择器时具有与 findComponent 相同的行为。
    test('findAllComponents', () => {
        const Foo={
            name: 'Foo',
            template: `<div class="foo">Foo</div>`
        }
        const Component = {
            components:{
                Foo
            },
            template: `
                 <Foo v-for="number in [1, 2, 3]" :key="number" data-test="number">
                    {{ number }}
                  </Foo>
            `
        }
        const wrapper = mount(Component)
        // 返回一个 VueWrapper 数组
    })
    //get 获取一个元素，如果找到则返回一个 DOMWrapper，否则抛出错误。
    test('get', () => {
        const Component={
            template: `<span>Span</span>`
        }
        const wrapper = mount(Component)
        wrapper.get('span') //=> found; returns DOMWrapper
        expect(() => wrapper.get('.not-there')).toThrowError()
    })
    //getComponent 获取 Vue 组件实例，如果找到则返回一个 VueWrapper，否则抛出错误。
    //它与 findComponent 类似，
    // 但如果未找到 Vue 组件实例，getComponent 会抛出错误，而 findComponent 会返回一个 ErrorWrapper。
    /*
        语法	示例	详细信息
        querySelector	getComponent('.component')	匹配标准查询选择器。
        组件名称	getComponent({name: 'a'})	匹配 PascalCase、snake-case、camelCase。
        组件引用	getComponent({ref: 'ref'})	仅可用于已挂载组件的直接引用子组件。
        单文件组件(SFC)	getComponent(Component)	直接传入已导入的组件。
    * */
    test('getComponent', () => {
        const Foo={
            name: 'Foo',
            template: `<div class="foo">Foo</div>`
        }
        const Component = {
            components:{
                Foo
            },
            template: `
              <Foo />
            `
        }
        const wrapper = mount(Component)
        wrapper.getComponent({ name: 'foo' }) // returns a VueWrapper
        wrapper.getComponent(Foo) // returns a VueWrapper
        expect(() => wrapper.getComponent('.not-there')).toThrowError()
    })
    //html 返回元素的 HTML 内容。
    //默认情况下，输出会使用 js-beautify 进行格式化，以使快照更易读。
    // 如果需要未格式化的 HTML 字符串，可以使用 raw: true 选项。
    test('html', () => {
        const Component={
            template: ` 
                 <div>
                    <p>Hello world</p>
                  </div>
            `
        }
        const wrapper = mount(Component)
        expect(wrapper.html()).toBe('<div>\n' + '  <p>Hello world</p>\n' + '</div>')
        expect(wrapper.html({ raw: true })).toBe('<div><p>Hello world</p></div>')
    })
    //isVisible  验证一个元素是否可见。
    test('isVisible', () => {
        const Component = {
            template: `<div v-show="false"><span /></div>`
        }
        const wrapper = mount(Component, {
            attachTo: document.body
        })
        expect(wrapper.find('span').isVisible()).toBe(false)
    })
    //props  返回传递给 Vue 组件的属性 (props)。
    /*test('props', () => {
        //Foo替身
        const wrapper = mount(Component, {
            global: { stubs: ['Foo'] }
        })
        const foo = wrapper.getComponent({ name: 'Foo' })
        expect(foo.props('truthy')).toBe(true)
        expect(foo.props('object')).toEqual({})
        expect(foo.props('notExisting')).toEqual(undefined)
        expect(foo.props()).toEqual({
            truthy: true,
            object: {},
            string: 'string'
        })
    })*/
    //setData    更新组件内部数据。 setData 不允许设置组件中未定义的新属性。
    //请注意，setData 不会修改组合式 API 中 setup() 的数据。
    test('setData', async () => {
        const Component = {
            template: `<div>Count: {{ count }}</div>`,
            data() {
                return {
                    count: 0
                }
            }
        }
        const wrapper = mount(Component)
        expect(wrapper.html()).toContain('Count: 0')
        await wrapper.setData({ count: 1 })
        expect(wrapper.html()).toContain('Count: 1')
    })
    //setProps 更新组件的属性。 在调用 setProps 时，你应该使用 await，以确保 Vue 在你进行断言之前更新 DOM。
    test('updates prop', async () => {
        const Component = {
            props: ['message'],
            template: `<div>{{ message }}</div>`,
        }
        const wrapper = mount(Component, {
            props: {
                message: 'hello'
            }
        })
        expect(wrapper.html()).toContain('hello')
        await wrapper.setProps({ message: 'goodbye' })
        expect(wrapper.html()).toContain('goodbye')
    })
    //setValue
    /*
        在 DOM 元素上设置一个值，包括：
        <input>
            会检测 type="checkbox" 和 type="radio"，并将 element.checked 设置为相应的值。
        <select>
            会检测 <option>，并将 element.selected 设置为相应的值。
    */
    //在调用 setValue 时，你应该使用 await，以确保 Vue 在你进行断言之前更新 DOM。
    test('setValue on checkbox', async () => {
        const Component = {
            data() {
                return {
                    text: '',
                    checked: false,
                    multiselectValue: []
                }
            },
            template: `
                <input type="text" v-model="text" />
                  <p>Text: {{ text }}</p>
                
                  <input type="checkbox" v-model="checked" />
                  <div v-if="checked">The input has been checked!</div>
                
                  <select v-model="multiselectValue" multiple>
                    <option value="value1"></option>
                    <option value="value2"></option>
                    <option value="value3"></option>
                  </select>
            `
        }
        const wrapper = mount(Component)
        await wrapper.find('input[type="checkbox"]').setValue(true)
        expect(wrapper.find('div').exists()).toBe(true)
            await wrapper.find('input[type="checkbox"]').setValue(false)
        expect(wrapper.find('div').exists()).toBe(false)

        await wrapper.find('input[type="text"]').setValue('hello!')
        expect(wrapper.find('p').text()).toBe('Text: hello!')

        // For select without multiple
        await wrapper.find('select').setValue('value1')
        // For select with multiple
        await wrapper.find('select').setValue(['value1', 'value3'])
    })
    //text 返回元素的文本内容。
    test('text', () => {
        const Component = {
            template: `<p>Hello world</p>`
        }
        const wrapper = mount(Component)
        expect(wrapper.find('p').text()).toBe('Hello world')
    })
    //trigger 触发一个 DOM 事件，例如 click、submit 或 keyup。
    //trigger 接受第二个参数，以便将选项传递给触发的事件：
    // await wrapper.trigger('keydown', { keyCode: 65 })
    //某些事件，例如单击复选框以更改其 v-model，仅在测试使用 attachTo: document.body 时有效。
    // 否则，change 事件将不会被触发，v-model 的值也不会改变。
    test('trigger', async () => {
        const Component = {
            data() {
                return {
                    count: 0
                }
            },
            template: `
                <span>Count: {{ count }}</span>
                <button @click="count++">Click me</button>
            `
        }
        const wrapper = mount(Component)
        await wrapper.find('button').trigger('click')
        expect(wrapper.find('span').text()).toBe('Count: 1')
    })
    //unmount 从 DOM 中卸载应用程序。
    //它仅适用于从 mount 返回的根 VueWrapper。在测试后进行手动清理时非常有用。
    test('unmount', () => {
        const Component = {
            template: `<div>Unmounted</div>  `,
            unmounted() {
                console.log('unmounted!')
            }
        }
        const wrapper = mount(Component)

        wrapper.unmount()
        // Component is removed from DOM.
        // console.log has been called with 'unmounted!'
    })

    //Wrapper 属性  vm  Vue 应用实例。你可以访问所有的实例方法和实例属性。
    // 请注意，vm 仅在 VueWrapper 上可用。

    //shallowMount  创建一个包含已挂载 (mounted) 和渲染 (rendered) 的 Vue 组件的包装器 (Wrapper)
    //shallowMount 的行为与 mount 完全相同，但它默认为所有的子组件创建测试替身。
    // 实际上，shallowMount(Component) 是 mount(Component, { shallow: true }) 的别名。

    //enableAutoUnmount
    //enableAutoUnmount 允许自动销毁 Vue Wrapper。销毁逻辑作为回调函数传递给 hook 函数。
    // 常见用法是将 enableAutoUnmount 与测试框架提供的清理辅助函数结合使用，例如 afterEach：
    //import { enableAutoUnmount } from '@vue/test-utils'
    // enableAutoUnmount(afterEach)

    //flushPromises
    //flushPromises 会刷新所有已解析的 Promise 处理程序。
    // 这有助于确保在进行断言之前，异步操作 (如 Promise 或 DOM 更新) 已经完成。

    //config.global
    //你可以选择在整个测试套件中配置挂载选项，而不是在每个测试中单独配置。
    // 这些配置将在每次 mount 组件时默认使用。如果需要，你可以在每个测试中覆盖这些默认设置。


    test('config.global mocks and stubs', () => {
        const MyComponent = defineComponent({
            template: `<div>My component</div>`
        })

        config.global.stubs = {
            MyComponent
        }

        config.global.mocks = {
            $t: (text) => text
        }
        const Component = {
            components: {
                MyComponent
            },
             template: ` 
               <p>{{ $t('message') }}</p>
                <my-component />
             `
        }
        const wrapper = mount(Component)

        expect(wrapper.html({raw:true})).toBe('<p>message</p><div>My component</div>')
    })

    //RouterLinkStub
    //一个用于替代 Vue Router 的 router-link 的组件，当你不想模拟或包含完整路由时，可以使用它。
    // 你可以使用此组件在渲染树中查找 router-link 组件。
    //RouterLinkStub 组件支持插槽内容，并将为其插槽属性返回非常基本的值。
    // 如果你需要更具体的插槽属性值进行测试，考虑使用真实路由，这样你可以使用真实的 router-link 组件。
    // 或者，你可以通过复制 test-utils 包中的实现来定义自己的 RouterLinkStub 组件。
    test('routerLinkStub test',()=>{
        const Component = {
            template: `
                <router-link to="/some/path"></router-link>
            `
        }
        const wrapper = mount(Component, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/some/path')
    })
})