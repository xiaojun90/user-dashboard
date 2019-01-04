import * as usersService from '../services/users';
export default {
    namespaces: 'users', //命名空间
    state: { //状态数据
        list: [],
        total:0,
        page:1
    },
    reducers: { //处理同步请求，常用于计算state
        save(state,{payload:{data:list,total,page}}) { //save为effects中的put中的type
            if (isNaN(page)) {
                page = 1;
            }
            return {...state,list,total,page}
        }
    },
    effects: { //处理异步请求
        *fetch({ payload: { page } }, { call, put }) { //
          const { data, headers } = yield call(usersService.fetch, { page }); //执行异步的请求，等待返回值
          yield put({ type: 'save', payload: { data, total: headers['x-total-count'],page } }); 
        }
      },
    subscriptions: { //订阅器
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => { //监听Url
            if (pathname === '/users') {
                dispatch({ type: 'fetch', payload: query }); //payload:请求的参数
            }
            });
        }
    }
}