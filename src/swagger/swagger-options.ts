import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Through Motion API',
      description: 'Through Motion API documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://through-motion-backend.onrender.com/api/v1',
        description: 'Production server',
      },
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Development server',
      },
    ],
    paths: {
      '/services': {
        get: {
          tags: ['Services Routes'],
          summary: 'Get all services',
          description: 'Retrieve all services from the database',
          responses: {
            '200': {
              description: 'List of services',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Pricing',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Pricing: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'Auto-generated ID',
            },
            subscriberEmail: { type: 'string', example: 'user@example.com' },
            serviceName: {
              type: 'string',
              enum: ['BASIC', 'PREMIUM', 'ENTERPRISE'],
            },
            serviceType: { type: 'string', enum: ['MONTHLY', 'YEARLY'] },
            serviceStatus: {
              type: 'string',
              enum: ['ACTIVE', 'EXPIRED', 'PENDING'],
            },
            price: { type: 'number', example: 49.99 },
            tier: { type: 'string', enum: ['STANDARD', 'GOLD', 'PLATINUM'] },
            duration: {
              type: 'integer',
              example: 12,
              description: 'Subscription duration in months',
            },
            currency: { type: 'string', example: 'USD' },
            planCode: { type: 'string', example: 'PLAN123' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-10T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-10T12:00:00Z',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Ensure these match your actual paths
};
