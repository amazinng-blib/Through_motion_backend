import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Function to connect to the database
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected Successfully!!');
  } catch (error) {
    console.error('Error Connecting to DB:', error);
  }
};

connectToDB();
