import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import { router as authRoutes } from './routes/user.routes';
import { router as subscriptionRoutes } from './routes/subscription.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.use('/', (req: Request, res: Response) => {
  return res.status(200).send('This is the root of the API');
});

const appPort = process.env.PORT ?? 6200;

app.listen(appPort, () => {
  console.log(`App listening on :http://localhost:${appPort}`);
});
