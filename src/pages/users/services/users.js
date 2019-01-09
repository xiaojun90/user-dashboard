import request from '../../../utils/request';
//查询
export function fetch({ page = 1 }) {
    return request(`/api/user/list?page=${page}&limit=5`);
}

//删除 
export function remove(id) {
  return request(`/api/users/${id}`,{
    method:'DELETE'
  });
}

//修改
export function patch(id,values) {
  return request(`/api/users/${id}`,{
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}

//新增
export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}