// 引入路由的创建函数
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'

// 引入 Layout 组件，由 Layout 来统一页面
import Layout from '@/layout/index.vue'

// 引入 getAuthToken 函数在路由守卫处鉴权使用
import { getAuthToken } from '@/utils/auth'

// 引入 Message 组件，用于给用户反馈信息
import { Message } from '@arco-design/web-vue'

/**
 * 定义应用路由，路由接口
 * interface IRoute = {
 *  // 路由路径
 *  path: string
 *
 *  // 路由对应的组件
 *  component: Component.Vue
 *
 *  // 子组件，本项目中以 Layout 为父组件配合路由托管了所有页面
 *  children: IRoute[]
 * }
 *
 * 在 component 处使用: () => import() 的原因是做组件懒加载
 * 避免首屏加载所有组件，优化响应速度
 */
const routes = [
  {
    path: '/',
    redirect: '/swap',
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/swap',
        component: () => import('@/views/swap/index.vue'),
        meta: {
          title: 'Swap',
          requireAuth: true,
        },
      },
      {
        path: '/stake',
        component: () => import('@/views/stake/index.vue'),
        meta: {
          title: 'Stake',
          requireAuth: true,
        },
      },
      {
        path: '/wallet',
        component: () => import('@/views/wallet/index.vue'),
        meta: {
          title: 'Wallet',
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/sign-in',
    component: () => import('@/views/sign-in/index.vue'),
    meta: {
      title: 'Sign In',
    },
  },
  {
    path: '/sign-up',
    component: () => import('@/views/sign-up/index.vue'),
    meta: {
      title: 'Sign Up',
    },
  },
  {
    path: '/reset-pwd',
    component: () => import('@/views/reset-pwd/index.vue'),
    meta: {
      title: 'Reset Password',
    },
  },
]

// 创建路由对象，在 main.ts 中我们导入的就是这个对象
// 路由 history 模式和 hash 模式请自行百度，这里不再赘述
const router = createRouter({
  routes,
  history: createWebHistory(),
})

// 路由前置守卫，导航之前触发该函数，在此做鉴权，如果登陆过期或未登录，
// 则跳转到登录页，同时记录下原本要导航的路由，待会儿登陆完之后跳转到原页面
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if (to.meta.requireAuth && !getAuthToken()) {
      Message.warning('Should Login First')
      next({ path: '/sign-in', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
)

// 路由后置守卫，导航之后触发该函数，在此做登陆后跳转
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    document.title = (to.meta.title as string) + ' | ExerciseBlockchain'

    if (from.fullPath.startsWith('/sign-in') && from.query?.redirect)
      router.replace({ path: from.query.redirect as string })
  }
)

// 导出在 main.ts 中需要使用的 router 对象
export default router

// 接下来请阅读 ./layout/index.vue
