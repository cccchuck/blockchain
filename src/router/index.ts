import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/guide',
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/guide',
        component: () => import('@/views/guide/guide.vue'),
        meta: {
          title: 'Guide',
        },
      },
      {
        path: '/swap',
        component: () => import('@/views/swap/swap.vue'),
        meta: {
          title: 'Swap',
        },
      },
      {
        path: '/stake',
        component: () => import('@/views/stake/stake.vue'),
        meta: {
          title: 'Stake',
        },
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
