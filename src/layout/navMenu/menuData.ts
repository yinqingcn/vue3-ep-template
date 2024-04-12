const menu = [
  {
    key: '1',
    path: '/home',
    meta: {
      title: 'home', // 首页
      icon: 'ic:round-home',
    },
  },
  {
    key: '2',
    path: '/system',
    meta: {
      title: 'systemManagement', // 系统管理
      icon: 'ic:outline-lock',
    },
    children: [
      {
        key: '2-1',
        parentKey: '2',
        path: '/system/menu',
        meta: {
          title: 'menuManagement', // 菜单管理
          icon: 'ep:tag',
        },
      },
    ],
  },
];

export default menu;
