export default [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    name: 'Login',
    meta: { title: 'Login' },
  },
]
