import { getAccounts, submitAccount, getProducts, getAccount, updateAccount } from '@/services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
export default {
    namespace: 'lists',
    state: {
        listData: [],
        limit: 10,
        list: {},
    },
    effects: {
        *getLists({ payload }, { call, put }) {
            let reqMethod = undefined;
            let response = undefined;
            const { requestMethod, ...params } = payload;
            switch( requestMethod ) {
                case 'getProducts': response = yield call(getProducts, params); break;
            }
            const {data, err } = response;
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                yield put({type:'saveLists', payload: data})
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
        *getList({ payload, callback }, { call, put }) {
            const { data, err} = yield call(getAccount, payload)
            if( err ) {
                console.log('请求错误，刷新页面');
            }else {
                let { account, password } = data;
                callback(account, password);
                yield put({type:'saveList', payload: data})
            }
        }


    },
    reducers: {
        saveLists(state, { payload }) {
            payload.forEach( itm => {
                itm.id = itm.id+ new Date().getTime();
                itm.account = itm.account+ new Date().getTime();
            })
            return {...state,listData: payload}
        },
        removeLists(state, { payload, callback }) {
            const { key } = payload;
            const { listData, pagination } = state;
            for( var i = key.length-1; i >= 0; i-- ){  
                listData.forEach( (item, index) => {
                    if( item.key === key[i] ) {
                        listData.splice( index, 1 );
                    }
                })
            }
            callback();
            return {...state, data: {list: listData, pagination} }
        },
        saveList(state, { payload }) {
            return {...state, list: payload}
        }
    },
  };
  