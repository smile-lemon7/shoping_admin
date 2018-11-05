import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getAdmin } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    message: undefined,
    currentAuthority: [],
    currentUser: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(getAdmin, payload);
      const { data, err } = res;
      if (err) {
        const { message } = err;
        yield put({ type: 'saveMessage', payload: { message } });
      } else {
        const { authority, account } = data;
        yield put({
          type: 'saveAccount',
          payload: {
            currentAuthority: authority,
            currentUser: account,
          },
        });
        //  Login successfully
        if (authority) {
          reloadAuthorized();
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();

          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }     
      }
    },
    //  退出登录
    // *logout(_, { put }) {
    //   yield put({
    //     type: 'saveAccount',
    //     payload: {
    //       currentUser: undefined,
    //       currentAuthority: [],
    //     },
    //   });
    //   yield put({
    //     type: 'saveMessage',
    //     payload: {
    //       message: undefined,
    //     },
    //   });
    //   reloadAuthorized();
    //   yield put(
    //     routerRedux.push({
    //       pathname: '/user/login',
    //       search: stringify({
    //         redirect: window.location.href,
    //       }),
    //     })
    //   );
    // },
  },

  reducers: {
    saveAccount(state, { payload }) {
      const { currentUser, currentAuthority } = payload;
      return {
        ...state,
        currentAuthority,
        currentUser,
      };
    },
    saveMessage(state, { payload }) {
      const { message } = payload;
      return {
        ...state,
        message,
      };
    },
  },
};
