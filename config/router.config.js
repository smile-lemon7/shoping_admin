export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['superAdmin'],
    routes: [
      { path: '/', redirect: '/order/dayOrder' },
      {
        path: '/order',
        name: 'order',
        icon: 'read',
        authority: ['superAdmin'],
        routes: [
          {
            path: '/order/dayOrder',
            name: 'dayOrder',
            component: './Order/DayOrder',
          },
          {
            path: '/order/monthOrder',
            name: 'monthOrder',
            component: './Order/MonthOrder',
          },
        ],
      },
    ]
  }
];
