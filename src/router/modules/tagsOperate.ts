import BasicLayout from '@/layout/index.vue'
export default [
  {
    path: '/function_list/tags_oparate',
    component: BasicLayout,
    redirect: '/function_list/tags_oparate',
    children: [
      {
        path: '/function_list/tags_oparate',
        name: 'TagsOperate',
        component: () => import('@/views/functionList/tagsOperate.vue'),
        meta: {
          icon: 'vue',
        },
      },
    ],
  },
]
