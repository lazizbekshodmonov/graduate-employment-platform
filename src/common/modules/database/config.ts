import { config } from 'dotenv';
import * as process from 'node:process';

config();

export const db_config = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_DBNAME: process.env.POSTGRES_DBNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DBNAME: process.env.MONGO_DBNAME,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
};
