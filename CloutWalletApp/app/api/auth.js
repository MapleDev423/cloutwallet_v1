import request from './request';
import * as API_URL from 'utils/apis';

export function signIn(userName) {
  return request(API_URL.BASE, {
    url: API_URL.SIGNIN + userName,
    method: 'POST',
  });
}

export function signOut() {}
