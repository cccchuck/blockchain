/**
 * BlockChain 阅读指南
 *
 * 本项目中每一块我都会添加注释以帮助学弟学妹理解，如发现某块未添加注释
 * 那么就是我觉得只要满足 1 中的条件就可以轻而易举理解的，不存在歧义的代码
 * 在所有的注释中，我将默许你拥有 1 中的技能，并以此来书写注释
 * 本项目中逻辑难点在于对网络请求的封装，对 swap token 组件的封装
 * 同时对网络请求的封装做到了低耦合、高拓展我觉得是一大亮点
 * 此外，views 中的页面并无太大难点，我将不再赘述
 *
 * 1. 适合什么人群？
 *    - 具有一定 HTML / CSS / JavaScript 基础
 *    - 熟悉 Vue 开发模式
 *    - 熟悉 TypeScript
 *    - 熟悉 Arco
 *    - 熟悉 ES6 语法
 * 2. 阅读顺序
 *    main.ts -> App.vue -> router/index.ts -> layout/index.vue
 *    -> components/*.vue -> store/index.ts -> utils/*
 *    -> views/sign-up.vue -> views/sign-in.vue -> views/reset-pwd.vue
 *    -> views/swap.vue -> views/stake.vue -> views/wallet.vue
 *
 * 3. 联系我
 * 如果你对本项目中的哪一部分感到迷惑，请发送邮件至 chuckgao0223@gmail.com
 * 或者在 github 上提 issue: https://github.com/cccchuck/blockchain
 *
 * 4. 说明
 * 受限于技术视野和逻辑视野，本项目多多少少会有一些不合理的地方，因此还希望
 * 你能够将其更加完美化。
 * 祝君一切顺利！
 */

import { createApp } from 'vue' // 引入 createApp 创建 Vue 应用

// 引入入口组件
import App from './App.vue'
// 引入应用路由
import router from './router'
// 引入全局存储
import store from './store'

// 引入 Arco
import ArcoVue from '@arco-design/web-vue'
// 引入 ArcoVueIcon 以使用 Icon
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

// 引入全局样式
import './style.css'
// 引入 Arco 样式
import '@arco-design/web-vue/dist/arco.css'

// 创建应用
const app = createApp(App)

// 将一些对象挂载到全局应用上
app.use(ArcoVueIcon)
app.use(ArcoVue)
app.use(router)
app.use(store)

// 将应用挂载到根目录 index.html 文件中 id 为 app 的元素上
app.mount('#app')

// 接下来请阅读 App.vue
