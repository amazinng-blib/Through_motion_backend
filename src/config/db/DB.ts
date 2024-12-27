import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = isProduction
  ? process.env.DATABASE_URL
  : process.env.LOCAL_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    `Database URL is not defined in environment variables for ${
      isProduction ? 'production' : 'local'
    }`
  );
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'],
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

// Function to connect to the database
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Database connected successfully in ${
        isProduction ? 'production' : 'development'
      } mode!`
    );
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

connectToDB();
