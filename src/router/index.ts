import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationRaw,
} from 'vue-router'
import Layout from '@/layout/index.vue'
import { getAuthToken } from '@/utils/auth'
import { Message } from '@arco-design/web-vue'

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
        },
      },
      {
        path: '/stake',
        component: () => import('@/views/stake/index.vue'),
        meta: {
          title: 'Stake',
        },
      },
      {
        path: '/wallet',
        component: () => import('@/views/wallet/index.vue'),
        meta: {
          title: 'Wallet',
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

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if (from.query.redirect) {
      const { redirect } = from.query
      from.query.redirect = null
      next(redirect as string)
    }

    if (to.meta.requireAuth && !getAuthToken()) {
      Message.warning('Should Login First')
      next({ path: '/sign-in', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
)

router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    document.title = (to.meta.title as string) + ' | ExerciseBlockchain'

    if (from.fullPath.startsWith('/sign-in') && from.query?.redirect)
      router.replace({ path: from.query.redirect as string })
  }
)

export default router
