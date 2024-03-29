const menu = [
  {
    key: '1',
    path: '/home',
    meta: {
      title: '首页',
      icon: 'home',
    },
  },
  {
    key: '2',
    path: '/funcion_list',
    meta: {
      title: '功能',
      icon: 'multi-function-knife',
    },
    children: [
      {
        key: '2-1',
        parentKey: '2',
        path: '/function_list/tags_oparate',
        meta: {
          title: 'TagsView操作说明',
          icon: 'tag',
        },
      },
    ],
  },
]

export default menu
