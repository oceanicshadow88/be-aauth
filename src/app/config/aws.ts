import AWS from 'aws-sdk';
const dotenv = require('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
dotenv.config();

export const awsConfig = {
  region: process.env.AWS_REGION || '',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();
const ses = new AWS.SES();
const awsServices = { s3, ses };
export default awsServices;