import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

const config: Config = {
  development: {
    username: process.env.DEV_DB_USERNAME ?? 'postgres',
    password: process.env.DEV_DB_PASSWORD ?? 'postgress',
    database: process.env.DEV_DB_NAME ?? 'goFamsServer',
    host: process.env.DEV_DB_HOST ?? 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME ?? 'postgres',
    password: process.env.TEST_DB_PASSWORD ?? 'postgress',
    database: process.env.TEST_DB_NAME ?? 'goFamsServer',
    host: process.env.TEST_DB_HOST ?? 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME!,
    password: process.env.PROD_DB_PASSWORD!,
    database: process.env.PROD_DB_DATABASE!,
    host: process.env.PROD_DB_HOST!,
    dialect: 'postgres',
  },
};
