import BasicLayout from '@/layout/index.vue';

export default [
  {
    component: BasicLayout,
    redirect: '/system/menu',
    children: [
      {
        path: '/system/menu',
        name: 'MenuManagement', // 系统管理-菜单管理
        component: () => import('@/views/menuManagement/index.vue'),
        meta: {
          icon: 'vue',
        },
      },
    ],
  },
];
