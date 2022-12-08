// 该文件是 store 文件，为什么需要用到 store
// 因为想要在某些页面复用一些数据，比方说
// 用户代币的余额应该是在所有的页面都一致的，并且所有的页面都需要这个数据
// 因此我抽离出来了两个 store，一个是 user store，一个是 token store
// user store 顾名思义用来存储一些用户的信息
// token store 顾名思义用来存储一些代币的信息
import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useTokenStore from './modules/token'

const pinia = createPinia()

export { useUserStore, useTokenStore }

export default pinia
