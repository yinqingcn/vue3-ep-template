import BasicLayout from '@/layout/index.vue'
export default [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          icon: 'vue',
        },
      },
    ],
  },
]
