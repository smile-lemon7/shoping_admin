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
    authority: ['admin'],
    routes: [
      { path: '/', redirect: '/account/list' },
      {
        path: '/account',
        name: 'accounts',
        icon: 'user',
        // component: './Account/index',
        routes: [
          {
            path: '/account/list',
            name: 'list',
            component: './Account/index',
          },
          {
            path: '/account/edit',
            // name: 'editAccount',
            component: './Account/AccountAdd',
          },
        ],
      },
      {
        path: '/products',
        name: 'products',
        icon: 'book',
        routes: [
          {
            path: '/products/list',
            name: 'list',
            component: './Products/index',
          },
          {
            path: '/products/edit',
            // name: 'editProduct',
            component: './Products/ProductAdd',
          },
        ]
      },
      {
        path: '/order',
        name: 'order',
        icon: 'read',
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
    ],
  },
];
