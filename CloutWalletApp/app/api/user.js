import request from './request';
import * as API_URL from 'utils/apis';

export function getCreatorCoins(token) {
  return request(API_URL.BASE, {
    url: API_URL.GET_CREATOR_COINS + token,
    method: 'POST',
  });
}

export function getHistory(userName) {
  return request(API_URL.BASE_HISTORY, {
    url: API_URL.GET_HISTORY + userName,
    method: 'GET',
  });
}
