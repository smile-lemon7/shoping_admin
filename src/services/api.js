import request from '@/utils/request';


export async function postAccount(params) {
  return request('/api/admin', {
    method: 'POST',
    body: params,
  });
}


export async function getAccounts(params) {
  const { offset, limit } = params;
  return request(`/api/admin?offset=${offset}&limit=${limit}`, {
    method: 'GET',
  });
}


export async function submitAccount(params) {
  return request('/api/postAccount', {
    method: 'POST',
    body: params,
  });
}

export async function updateAccount(params) {
  return request('/api/updateAccount', {
    method: 'POST',
    body: params,
  });
}

export async function getAccount(params) {
  return request(`/api/admin/${params}`, {
    method: 'GET',
  });
}


export async function getProducts(params) {
  const { offset, limit } = params;
  return request(`/api/products?offset=${offset}&limit=${limit}`, {
    method: 'GET',
  });
}