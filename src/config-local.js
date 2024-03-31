import * as config from './config-dev';

export const origins = {
  ...config.origins,
  self: 'http://local.co.kr:8080',
};
