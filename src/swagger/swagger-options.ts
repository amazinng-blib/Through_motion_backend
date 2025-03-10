import { Options } from 'swagger-jsdoc';
import { Role } from '../enum/user.enums';

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
        url: 'http://localhost:4000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://through-motion-backend.onrender.com/api/v1',
        description: 'Production server',
      },
    ],
    paths: {
      '/auth/register': {
        post: {
          tags: ['Authentication Routes'],
          summary: 'Register user route',
          requestBody: {
            require: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string',
                      example: 'John',
                    },
                    lastName: {
                      type: 'string',
                      example: 'Doe',
                    },
                    email: {
                      type: 'string',
                      example: 'johndoe@gmail.com',
                    },
                    password: {
                      type: 'string',
                      example: 'JohnDoe123456##!',
                    },
                    displayName: {
                      type: 'string',
                      example: 'John23',
                    },
                    role: {
                      type: 'string',
                      example: Role.USER,
                    },
                  },
                  required: [
                    'firstName',
                    'lastName',
                    'email',
                    'password',
                    'displayName',
                    'role',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '400': {
              description: 'User already exists',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/auth/login': {
        post: {
          tags: ['Authentication Routes'],
          summary: 'Login a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'johndoe@gmail.com',
                    },
                    password: {
                      type: 'string',
                      example: 'JohnDoe123456##!',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Logged-In successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      accessToken: {
                        type: 'string',
                        example:
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM3OTc1MTczLCJleHAiOjE3Mzg1Nzk5NzN9.a57LIF7oG_yFm87eZg9R6jqt4dmXeDyUKMd1eGl2Iz4',
                      },
                    },
                  },
                  '401': {
                    description: 'Invalid credentials',
                  },
                  '404': {
                    description: 'User not found',
                  },
                  '500': {
                    description: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },

      '/auth/update-profile': {
        post: {
          tags: ['Authentication Routes'],
          summary: 'update profile',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'johndoe@gmail.com' },
                    displayName: { type: 'string', example: 'JohnDoe33' },
                    oldPassword: {
                      type: 'string',
                      example: 'JohnDoe123456##!',
                    },
                    newPassword: {
                      type: 'string',
                      example: 'JohnDoe1234566##!',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Profile updated',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '401': {
              description: 'Invalid credentials',
            },
            '404': {
              description: 'User not found',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },
      '/email/get-in-touch': {
        post: {
          tags: ['Email Routes'],
          summary: 'Get In touch endpoint',

          requestBody: {
            required: true,
            type: 'object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Sammy Oluwatimileyin' },
                    subject: {
                      type: 'string',
                      example: 'How to use the platform',
                    },
                    email: { type: 'string', example: 'samuel@gmail.com' },
                    message: {
                      type: 'string',
                      example:
                        'Please, am finding it difficult to understand this platform',
                    },
                  },
                  required: ['name', 'message', 'subject', 'email'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Profile updated',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GetInTouch',
                  },

                  '500': {
                    description: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },

      '/email/subscribe-to-newsletter': {
        post: {
          tags: ['Email Routes'],
          summary: 'Subscribe to newsletter endpoint',

          requestBody: {
            required: true,
            type: 'object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'samuel@gmail.com' },
                  },
                  required: ['email'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Subscribe to newsletter',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', example: 'samuel@gmail.com' },
                    },
                  },

                  '500': {
                    description: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },

      '/billing-address/add': {
        post: {
          tags: ['Billing Address'],
          summary: 'Add billing address',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'integer', example: 1 },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'john.doe@gmail.com' },
                    companyName: { type: 'string', example: 'Doe Enterprises' },
                    region: { type: 'string', example: 'North America' },
                    state: { type: 'string', example: 'California' },
                    city: { type: 'string', example: 'Los Angeles' },
                    streetAddress: { type: 'string', example: '123 Main St' },
                    apartment: { type: 'string', example: 'Apt 4B' },
                    phone: { type: 'string', example: '+1 123-456-7890' },
                    orderNote: {
                      type: 'string',
                      example: 'Leave package at front door',
                    },
                  },
                  required: [
                    'userId',
                    'firstName',
                    'lastName',
                    'email',
                    'region',
                    'state',
                    'city',
                    'streetAddress',
                    'phone',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Billing address added successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/BillingAddress',
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/billing-address': {
        get: {
          tags: ['Billing Address'],
          summary: 'Get User billing addresses',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'List of billing addresses',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/questionare/add-contact-address': {
        post: {
          tags: ['Questionare routes'],
          summary: 'Add business and contact address',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'integer',
                      format: 'int32',
                      example: 1,
                    },
                    companyName: {
                      type: 'string',
                      example: 'Tech Solutions Ltd.',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'info@techsolutions.com',
                    },
                    companyRepresentative: {
                      type: 'string',
                      example: 'John Doe',
                    },
                    phone: {
                      type: 'string',
                      example: '+1 234 567 8901',
                    },
                    companyAddress: {
                      type: 'string',
                      example: '123 Business Street, New York, NY 10001',
                    },
                    industry: {
                      type: 'string',
                      example: 'Technology',
                    },
                    businessType: {
                      type: 'string',
                      example: 'Private',
                    },
                    companySize: {
                      type: 'integer',
                      example: 150,
                    },
                    establishedYear: {
                      type: 'string',
                      format: 'date',
                      example: '2010-05-15',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2024-01-01T12:00:00Z',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2024-01-15T12:00:00Z',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Business and contact address added successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/BusinessAndContactForm',
                  },
                },
              },
            },

            '400': {
              description: 'Invalid input',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/questionare/add-marketing-details': {
        post: {
          tags: ['Questionare routes'],
          summary: 'Add business and market details address',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'integer',
                      format: 'int32',
                      example: 1,
                    },
                    description: {
                      type: 'string',
                    },
                    mission: {
                      type: 'string',
                    },
                    targetAudience: {
                      type: 'string',
                    },
                    scope: {
                      type: 'string',
                      enum: ['local', 'national', 'global'],
                    },
                    competitors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Competitor',
                      },
                    },
                    ads: {
                      type: 'object',
                      properties: {
                        isRunning: {
                          type: 'boolean',
                        },
                        adsDetails: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/AdDetail',
                          },
                        },
                      },
                    },
                    digitalMarketing: {
                      type: 'object',
                      properties: {
                        hasRunDigitalMarketingBefore: {
                          type: 'boolean',
                        },
                        digitalMarketingDetails: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/DigitalMarketingDetail',
                          },
                        },
                      },
                    },
                    previousCampaign: {
                      type: 'object',
                      properties: {
                        achievePreviousObjectives: {
                          type: 'boolean',
                        },
                      },
                    },
                    file: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description:
                'Business and Marketing Details created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/BusinessAndMarketingDetails',
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
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            displayName: { type: 'string' },
            role: { type: 'string', enum: Object.values(Role) },
            isVerified: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: [
            'firstName',
            'lastName',
            'email',
            'password',
            'displayName',
            'role',
          ],
        },
        GetInTouch: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            subject: { type: 'string' },
            email: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['name', 'message', 'subject', 'email'],
        },
        BillingAddress: {
          type: 'object',
          properties: {
            userId: { type: 'integer', example: 1 },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@gmail.com' },
            companyName: { type: 'string', example: 'Doe Enterprises' },
            region: { type: 'string', example: 'North America' },
            state: { type: 'string', example: 'California' },
            city: { type: 'string', example: 'Los Angeles' },
            streetAddress: { type: 'string', example: '123 Main St' },
            apartment: { type: 'string', example: 'Apt 4B' },
            phone: { type: 'string', example: '+1 123-456-7890' },
            orderNote: {
              type: 'string',
              example: 'Leave package at front door',
            },
          },
          required: [
            'userId',
            'firstName',
            'lastName',
            'email',
            'region',
            'state',
            'city',
            'streetAddress',
            'phone',
          ],
        },

        BusinessAndContactForm: {
          type: 'object',
          required: [
            'userId',
            'companyName',
            'email',
            'companyRepresentative',
            'phone',
            'companyAddress',
            'industry',
            'businessType',
            'companySize',
            'establishedYear',
          ],
          properties: {
            id: {
              type: 'integer',
              format: 'int32',
              example: 1,
            },
            userId: {
              type: 'integer',
              format: 'int32',
              example: 1,
            },
            companyName: {
              type: 'string',
              example: 'Tech Solutions Ltd.',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'info@techsolutions.com',
            },
            companyRepresentative: {
              type: 'string',
              example: 'John Doe',
            },
            phone: {
              type: 'string',
              example: '+1 234 567 8901',
            },
            companyAddress: {
              type: 'string',
              example: '123 Business Street, New York, NY 10001',
            },
            industry: {
              type: 'string',
              example: 'Technology',
            },
            businessType: {
              type: 'string',
              example: 'Private',
            },
            companySize: {
              type: 'integer',
              example: 150,
            },
            establishedYear: {
              type: 'string',
              format: 'date',
              example: '2010-05-15',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T12:00:00Z',
            },
          },
        },
        Competitor: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            website: { type: 'string', format: 'uri' },
          },
        },
        AdDetail: {
          type: 'object',
          properties: {
            adService: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
        DigitalMarketingDetail: {
          type: 'object',
          properties: {
            details: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
          },
        },
        BusinessAndMarketingDetails: {
          type: 'object',
          properties: {
            // id: { type: 'integer', format: 'int32' },
            userId: { type: 'integer', format: 'int32' },
            description: { type: 'string' },
            mission: { type: 'string' },
            targetAudience: { type: 'string' },
            scope: {
              type: 'string',
              enum: ['local', 'national', 'global'],
            },
            competitors: {
              type: 'array',
              items: { $ref: '#/components/schemas/Competitor' },
            },
            ads: {
              type: 'object',
              properties: {
                isRunning: { type: 'boolean' },
                adsDetails: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/AdDetail' },
                },
              },
            },
            digitalMarketing: {
              type: 'object',
              properties: {
                hasRunDigitalMarketingBefore: { type: 'boolean' },
                digitalMarketingDetails: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/DigitalMarketingDetail',
                  },
                },
              },
            },
            previousCampaign: {
              type: 'object',
              properties: {
                achievePreviousObjectives: { type: 'boolean' },
                file: { type: 'string' },
              },
            },
            // createdAt: { type: 'string', format: 'date-time' },
            // updatedAt: { type: 'string', format: 'date-time' },
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
