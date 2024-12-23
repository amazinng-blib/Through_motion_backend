import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import { router as userRoutes } from './routes/userRoutes';
app.use('/api/v1/users', userRoutes);

app.use('/', (req: Request, res: Response) => {
  return res.status(200).send('OK');
});

const appPort = process.env.PORT ?? 6200;

app.listen(appPort, () => {
  console.log(`App listening on :http://localhost:${appPort}`);
});
