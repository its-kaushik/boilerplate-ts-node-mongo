import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connection = (connectionString: string) => {
  return mongoose.connect(`${connectionString}`);
};

export const disconnect = () => {
  return mongoose.disconnect();
};

export const getInMemoryDBUri = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  return uri;
};
