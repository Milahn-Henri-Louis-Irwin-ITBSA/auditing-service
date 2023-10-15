import * as dotenv from 'dotenv';

dotenv.config();
export const ENV_CONFIG = {
  app: {
    port: 3001,
    hostname: '64.226.124.91',
    apiRoot: '/v1',
  },
  firebase: dotenv.config(),
};
