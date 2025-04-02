import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import path from 'path';
import './models/index';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger/swagger-options';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve Swagger UI at /api-docs endpoint

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist'))
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('This is through motion root of the API');
});

import { router as authRoutes } from './routes/user.routes';
import { router as emailRoutes } from './routes/email-routes';
import { router as billingAddressRoutes } from './routes/billing-address-routes';
import { router as questionareRoutes } from './routes/questionare-routes';
import { router as plansRoutes } from './routes/plans-routes';
import { router as subscriptionsRoutes } from './routes/subscriptions-route';
import { router as webhookRoutes } from './routes/webhock-routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/billing-address', billingAddressRoutes);
app.use('/api/v1/questionare', questionareRoutes);
app.use('/api/v1/plans', plansRoutes);
app.use('/api/v1/subscription', subscriptionsRoutes);
app.use('/api/v1', webhookRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

const appPort = process.env.PORT ?? 6200;

app.listen(appPort, () => {
  console.log(`App listening on :http://localhost:${appPort}`);
});
