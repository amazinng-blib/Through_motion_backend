import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const Db_Enviroment = {
  development: {
    username: process.env.DEV_DB_USERNAME as string,
    password: process.env.DEV_DB_PASSWORD as string,
    database: process.env.DEV_DB_USER as string,
    host: process.env.DEV_DB_HOST as string,
    dialect: 'postgres',
  },

  production: {
    username: process.env.PROD_DB_USERNAME as string,
    password: process.env.PROD_DB_PASSWORD as string,
    database: process.env.PROD_DB_USER as string,
    host: process.env.PROD_DB_HOST as string,
    dialect: 'postgres',
  },
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const db_Config = Db_Enviroment['development'];

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'],
  ...Object?.fromEntries(
    Object?.entries(db_Config)?.filter(
      ([key]) => !['database', 'username', 'password', 'host'].includes(key)
    )
  ),
});

// Function to connect to the database
const connectToDB = async () => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log(`Database Connected Successfully!! Host: ${db_Config.host}`);
  } catch (error) {
    console.error('Error Connecting to DB:', error);
  }
};

connectToDB();
