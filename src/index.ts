import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';

import { router as authRoutes } from './routes/user.routes';
import { router as pricingRoutes } from './routes/subscription.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pricing', pricingRoutes);

app.use('/', (req: Request, res: Response) => {
  return res.status(200).send('This is through motion root of the API');
});

app.use(errorHandler);
app.use(notFoundHandler);

const appPort = process.env.PORT ?? 6200;

app.listen(appPort, () => {
  console.log(`App listening on :http://localhost:${appPort}`);
});
