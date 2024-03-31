import * as config from './config';

export const origins = {
  ...config.origins,
  self: '/',
  eventNodeApi: 'http://dev.co.kr',
  eventApi: '',
  keventFe: '',
  memberApi: '',
  signinssl: '',
  script: '//',
  pics: '//',
};
