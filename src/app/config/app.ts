/* eslint-disable no-secrets/no-secrets */
const dotenv = require('dotenv');
const stripeAPI = require('stripe');
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
dotenv.config();

export const config = {
  environment: process.env.ENVIRONMENT ?? 'production',
  name: process.env.NAME ?? 'techscrumapp',
  port: process.env.PORT ?? 8000,
  api: {
    prefix: process.env.API_PREFIX ?? '/api',
  },
  version: '1.0.0',
  emailSecret: process.env.EMAIL_SECRET ?? '123456',
  forgotSecret: process.env.FORGET_SECRET ?? '321654',
  //---------------------------v2--------------------------
  dbConnection: process.env.DB_CONNECTION ?? '',
  protocol: process.env.ENVIRONMENT === 'local' ? 'http://' : 'https://',
  devopsMode: process.env.DEVOPS_MODE ?? 'false',
  authSecret: process.env.AUTH_SECRET,
};

export default config;
