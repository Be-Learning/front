import * as config from './config-dev';

export const origins = {
  ...config.origins,
  self: 'http://m-local.co.kr:8080',
};
