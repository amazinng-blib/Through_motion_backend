import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import path from 'path';
import { router as authRoutes } from './routes/user.routes';
import { router as pricingRoutes } from './routes/subscription.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger/swagger-options';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', pricingRoutes);

// Serve Swagger UI at /api-docs endpoint

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist'))
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('This is through motion root of the API');
});

app.use(errorHandler);
app.use(notFoundHandler);

const appPort = process.env.PORT ?? 6200;

app.listen(appPort, () => {
  console.log(`App listening on :http://localhost:${appPort}`);
});
