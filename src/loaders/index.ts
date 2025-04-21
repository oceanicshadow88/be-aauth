const expressLoader = require('./express');
const serverLoader = require('./server');
import mongooseLoader from './mongoose';

exports.init = () => {
  const app = expressLoader();
  serverLoader(app);
  mongooseLoader();
};
