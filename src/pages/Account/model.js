import { getAccounts, submitAccount, getAccount, updateAccount } from '@/services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
export default {
    namespace: 'accounts',
    state: {
        list: [],
        limit: 10,
        account: {},
    },
    effects: {
        *getAccounts({ payload }, { call, put }) {
            const {data, err } = yield call(getAccounts, payload);
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                yield put({type:'saveAccounts', payload: data})
            }
        },
        *submitForm({ payload }, { call, put }) {
            const { data, err } = yield call( submitAccount, payload);
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                message.success(`${data.message}`);
            }
        },
        *updateForm({ payload }, { call, put }) {
            const { data, err } = yield call( updateAccount, payload);
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                message.success(`${data.message}`);
                yield put(routerRedux.push('/account/list'));
            }
        },
        *getAccount({ payload, callback }, { call, put }) {
            const { data, err} = yield call(getAccount, payload)
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                let { account, password } = data;
                callback(account, password);
                yield put({type:'saveAccount', payload: data})
            }
        }


    },
    reducers: {
        saveAccounts(state, { payload }) {
            payload.forEach( itm => {
                itm.id = itm.id+ new Date().getTime();
                itm.account = itm.account+ new Date().getTime();
            })
            return {...state,list: payload}
        },
        removeAccounts(state, { payload, callback }) {
            const { key } = payload;
            const { list, pagination } = state;
            for( var i = key.length-1; i >= 0; i-- ){  
                list.forEach( (item, index) => {
                    if( item.key === key[i] ) {
                        list.splice( index, 1 );
                    }
                })
            }
            callback();
            return {...state, data: {list, pagination} }
        },
        saveAccount(state, { payload }) {
            return {...state, account: payload}
        }
    },
  };
  