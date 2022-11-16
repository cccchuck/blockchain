import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useTokenStore from './modules/token'

const pinia = createPinia()

export { useUserStore, useTokenStore }

export default pinia
