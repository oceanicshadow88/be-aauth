import mongoose  from 'mongoose';
import config from '../app/config/app';

const mongooseLoader = () => {
  mongoose.set('strictQuery', false);
  const connection = mongoose.connect(config.dbConnection);
  mongoose.set('strictQuery', false);
  return connection;
};

export default mongooseLoader;