import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/edz/Desktop/shoping_admin/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/edz/Desktop/shoping_admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/account/list",
        "exact": true
      },
      {
        "path": "/account",
        "name": "accounts",
        "icon": "user",
        "routes": [
          {
            "path": "/account/list",
            "name": "list",
            "component": dynamic({ loader: () => import('../Account/index'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/account/edit",
            "name": "editList",
            "component": dynamic({ loader: () => import('../Account/AccountAdd'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/edz/Desktop/shoping_admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/order",
        "name": "order",
        "icon": "read",
        "routes": [
          {
            "path": "/order/dayOrder",
            "name": "dayOrder",
            "component": dynamic({ loader: () => import('../Order/DayOrder'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/order/monthOrder",
            "name": "monthOrder",
            "component": dynamic({ loader: () => import('../Order/MonthOrder'), loading: require('/Users/edz/Desktop/shoping_admin/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/edz/Desktop/shoping_admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('/Users/edz/Desktop/shoping_admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/edz/Desktop/shoping_admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
