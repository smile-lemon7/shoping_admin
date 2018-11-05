import { stringify } from 'qs';
import request from '@/utils/request';

//  获取管理员token
export async function getAdmin(params) {
  return request('/api/admin', {
    method: 'POST',
    body: params,
  });
}
