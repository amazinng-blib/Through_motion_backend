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
                    subscription_id: {
                      type: 'integer',
                      example: 5,
                    },
                    first_name: {
                      type: 'string',
                      example: 'John',
                    },
                    last_name: {
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
                    display_name: {
                      type: 'string',
                      example: 'John23',
                    },
                    // role: {
                    //   type: 'string',
                    //   example: Role.USER,
                    // },
                  },
                  required: [
                    'first_name',
                    'last_name',
                    'email',
                    'password',
                    'display_name',
                    'subscription_id',
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
                    first_name: { type: 'string', example: 'John' },
                    last_name: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'johndoe@gmail.com' },
                    display_name: { type: 'string', example: 'JohnDoe33' },
                    old_password: {
                      type: 'string',
                      example: 'JohnDoe123456##!',
                    },
                    new_password: {
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
          summary:
            'Get In touch endpoint -- You can pass file but its optional',

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
                    user_id: { type: 'integer', example: 1 },
                    first_name: { type: 'string', example: 'John' },
                    last_name: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'john.doe@gmail.com' },
                    company_name: {
                      type: 'string',
                      example: 'Doe Enterprises',
                    },
                    region: { type: 'string', example: 'North America' },
                    state: { type: 'string', example: 'California' },
                    city: { type: 'string', example: 'Los Angeles' },
                    street_address: { type: 'string', example: '123 Main St' },
                    apartment: { type: 'string', example: 'Apt 4B' },
                    phone: { type: 'string', example: '+1 123-456-7890' },
                    order_note: {
                      type: 'string',
                      example: 'Leave package at front door',
                    },
                  },
                  required: [
                    'user_id',
                    'first_name',
                    'last_name',
                    'email',
                    'region',
                    'state',
                    'city',
                    'street_address',
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

      '/questionare/contact-address': {
        get: {
          tags: ['Questionare routes'],
          summary: 'Get Business and contact addresses',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'business and contact addresses',
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
                    user_id: {
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
                    target_audience: {
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
                    digital_marketing: {
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
                    achievePreviousObjectives: {
                      type: 'boolean',
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
      '/questionare/marketing-details': {
        get: {
          tags: ['Questionare routes'],
          summary: 'Get all contact and marketting addresses',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'contact and marketting addresses',
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/plans': {
        get: {
          tags: ['Plan routes'],
          summary: 'Get all requested quotes',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'Fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Plan',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },
      '/plans/:${quoteId}': {
        get: {
          tags: ['Plan routes'],
          summary: 'Get single requested quotes',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'ID of the quote',
            },
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            '200': {
              description: 'Fetched',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Plan',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },
      '/plans/request-quote': {
        post: {
          tags: ['Plan routes'],
          summary: 'Request quote route',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'apllication/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user_id: {
                      type: 'integer',
                      example: 123,
                    },
                    plan_id: {
                      type: 'integer',
                      example: 456,
                    },
                    title: {
                      type: 'string',
                      example: 'Premium Plan',
                    },
                    duration: {
                      type: 'string',
                      example: '30 days',
                      nullable: true,
                    },
                    options: {
                      type: 'array',
                      description: 'List of options available in the plan',
                      example: [
                        {
                          title: 'Feature A',
                          price: 19.99,
                        },
                        {
                          title: 'Feature B',
                          price: 29.99,
                        },
                      ],
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string',
                            example: 'Feature A',
                          },
                          price: {
                            type: 'number',
                            example: 19.99,
                          },
                        },
                      },
                    },
                  },
                  required: [
                    'user_id',
                    'plan_id',
                    'plan_title',
                    'name',
                    'business_email',
                    'company_reps',
                    'marketing_goals',
                    'quote_url',
                    'options',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Request sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Plan',
                  },
                },
              },
            },
          },
        },
      },
      '/plans/reply-quote': {
        post: {
          tags: ['Plan routes'],
          summary: 'Reply quote route',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'apllication/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user_id: {
                      type: 'integer',
                      format: 'int64',
                      description: 'ID of the user who created the plan',
                      example: 123,
                    },
                    subscription_id: {
                      type: 'integer',
                      format: 'int64',
                      description: 'ID of the related subscription',
                      example: 456,
                    },
                    plan_title: {
                      type: 'string',
                      description: 'Title of the plan',
                      example: 'Premium Marketing Plan',
                    },
                    name: {
                      type: 'string',
                      description: 'Name associated with the plan',
                      example: 'John Doe',
                    },
                    business_email: {
                      type: 'string',
                      format: 'email',
                      description: 'Business email associated with the plan',
                      example: 'contact@business.com',
                    },
                    company_reps: {
                      type: 'string',
                      description: 'Company representatives for the plan',
                      example: 'Jane Doe, Mark Smith',
                    },
                    web_address: {
                      type: 'string',
                      format: 'uri',
                      description: 'Web address of the business',
                      example: 'https://www.business.com',
                    },
                    marketing_goals: {
                      type: 'string',
                      description: 'Marketing goals associated with the plan',
                      example: 'Increase brand awareness and lead generation',
                    },
                    is_replied: {
                      type: 'boolean',
                      description: 'Indicates if the plan has been replied to',
                      example: false,
                    },
                    quote_url: {
                      type: 'string',
                      format: 'uri',
                      description: 'URL for the quote associated with the plan',
                      example: 'https://www.business.com/quote.pdf',
                    },
                    options: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string',
                            description: 'Title of the option',
                            example: 'SEO Optimization',
                          },
                          price: {
                            type: 'number',
                            format: 'float',
                            description: 'Price of the option',
                            example: 299.99,
                          },
                        },
                        required: ['title', 'price'],
                      },
                      description: 'List of options associated with the plan',
                      example: [
                        {
                          title: 'SEO Optimization',
                          price: 299.99,
                        },
                        {
                          title: 'Social Media Marketing',
                          price: 199.99,
                        },
                      ],
                    },
                  },
                  required: [
                    'user_id',
                    'plan_title',
                    'name',
                    'business_email',
                    'company_reps',
                    'marketing_goals',
                    'quote_url',
                    'options',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Request sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Plan',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/subscription': {
        get: {
          tags: ['Subscription routes'],
          summary: 'Get subscriptions quotes',
          parameters: [
            {
              name: 'page',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
                default: 1,
              },
              description: 'Page number for pagination (default: 1)',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
                default: 10,
              },
              description: 'Number of results per page (default: 10)',
            },
            {
              name: 'startDate',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filter results from this start date (YYYY-MM-DD)',
            },
            {
              name: 'endDate',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filter results up to this end date (YYYY-MM-DD)',
            },
            {
              name: 'is_expired',
              in: 'query',
              required: false,
              schema: {
                type: 'boolean',
              },
              description: 'Filter businesses based on expiration status',
            },
            {
              name: 'duration',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
              },
              description: 'Filter businesses by duration in days',
            },
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'Fetched successfully',
              content: {
                'application/json': {
                  $ref: '#/components/schemas/Subscription',
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/subscription/update-sub': {
        post: {
          tags: ['Subscription routes'],
          summary:
            'This route updates user sub to expired when subscription expires [check user sub before executing this route]',
          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            require: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'integer',
                      example: 101,
                      description: 'ID of the user',
                    },
                    planId: {
                      type: 'integer',
                      example: 202,
                      description: 'ID of the subscribed plan',
                    },
                    subscribed_services: {
                      type: 'array',
                      description: 'List of subscribed services',
                      items: {
                        type: 'object',
                        required: ['service_title', 'options'],
                        properties: {
                          service_title: {
                            type: 'string',
                            example: 'Premium Support',
                          },
                          options: {
                            type: 'array',
                            items: {
                              type: 'object',
                              required: [
                                'title',
                                'price',
                                'started_on',
                                'ends_at',
                              ],
                              properties: {
                                title: {
                                  type: 'string',
                                  example: '24/7 Chat Support',
                                },
                                price: {
                                  type: 'number',
                                  format: 'float',
                                  example: 19.99,
                                },

                                started_on: {
                                  type: 'string',
                                  format: 'date-time',
                                  example: '2024-08-01T00:00:00Z',
                                },
                                ends_at: {
                                  type: 'string',
                                  format: 'date-time',
                                  example: '2024-09-01T00:00:00Z',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    duration: {
                      type: 'string',
                      example: '30 days',
                      nullable: true,
                    },
                    reference_number: {
                      type: 'string',
                      example: '252723783kajas88q09q09q',
                    },
                  },
                  required: [
                    'userId',
                    'planId',
                    'subscribed_services',
                    'reference_number',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Request sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Subscription',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },

      '/subscription/subscribe': {
        post: {
          tags: ['Subscription routes'],
          summary:
            'Subscription route --- For creating or updating subscriptions',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            require: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'integer',
                      example: 101,
                      description: 'ID of the user',
                    },
                    planId: {
                      type: 'integer',
                      example: 202,
                      description: 'ID of the subscribed plan',
                    },
                    subscribed_services: {
                      type: 'array',
                      description: 'List of subscribed services',
                      items: {
                        type: 'object',
                        required: ['service_title', 'options'],
                        properties: {
                          service_title: {
                            type: 'string',
                            example: 'Premium Support',
                          },
                          options: {
                            type: 'array',
                            items: {
                              type: 'object',
                              required: [
                                'title',
                                'price',
                                'started_on',
                                'ends_at',
                              ],
                              properties: {
                                title: {
                                  type: 'string',
                                  example: '24/7 Chat Support',
                                },
                                price: {
                                  type: 'number',
                                  format: 'float',
                                  example: 19.99,
                                },

                                started_on: {
                                  type: 'string',
                                  format: 'date-time',
                                  example: '2024-08-01T00:00:00Z',
                                },
                                ends_at: {
                                  type: 'string',
                                  format: 'date-time',
                                  example: '2024-09-01T00:00:00Z',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    duration: {
                      type: 'string',
                      example: '30 days',
                      nullable: true,
                    },
                    reference_number: {
                      type: 'string',
                      example: '252723783kajas88q09q09q',
                    },
                  },
                  required: [
                    'userId',
                    'planId',
                    'subscribed_services',
                    'reference_number',
                  ],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Request sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Subscription',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
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
            subscription_id: { type: 'integer' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            display_name: { type: 'string' },
            role: { type: 'string', enum: Object.values(Role) },
            is_verified: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
          required: [
            'first_name',
            'last_name',
            'email',
            'password',
            'display_name',
            'subscription_id',
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
            user_id: { type: 'integer', example: 1 },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@gmail.com' },
            company_name: { type: 'string', example: 'Doe Enterprises' },
            region: { type: 'string', example: 'North America' },
            state: { type: 'string', example: 'California' },
            city: { type: 'string', example: 'Los Angeles' },
            street_address: { type: 'string', example: '123 Main St' },
            apartment: { type: 'string', example: 'Apt 4B' },
            phone: { type: 'string', example: '+1 123-456-7890' },
            order_note: {
              type: 'string',
              example: 'Leave package at front door',
            },
          },
          required: [
            'user_id',
            'first_name',
            'last_name',
            'email',
            'region',
            'state',
            'city',
            'street_address',
            'phone',
          ],
        },

        BusinessAndContactForm: {
          type: 'object',
          required: [
            'user_id',
            'company_name',
            'email',
            'company_representative',
            'phone',
            'company_address',
            'industry',
            'business_type',
            'company_size',
            'established_year',
          ],
          properties: {
            id: {
              type: 'integer',
              format: 'int32',
              example: 1,
            },
            user_id: {
              type: 'integer',
              format: 'int32',
              example: 1,
            },
            company_name: {
              type: 'string',
              example: 'Tech Solutions Ltd.',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'info@techsolutions.com',
            },
            company_representative: {
              type: 'string',
              example: 'John Doe',
            },
            phone: {
              type: 'string',
              example: '+1 234 567 8901',
            },
            company_address: {
              type: 'string',
              example: '123 Business Street, New York, NY 10001',
            },
            industry: {
              type: 'string',
              example: 'Technology',
            },
            business_type: {
              type: 'string',
              example: 'Private',
            },
            company_size: {
              type: 'integer',
              example: 150,
            },
            established_year: {
              type: 'string',
              format: 'date',
              example: '2010-05-15',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T12:00:00Z',
            },
            updated_at: {
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
            user_id: { type: 'integer', format: 'int32' },
            description: { type: 'string' },
            mission: { type: 'string' },
            target_audience: { type: 'string' },
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
            digital_marketing: {
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

        Payment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              description: 'Unique identifier for the payment',
            },
            user_id: {
              type: 'integer',
              format: 'int64',
              description: 'ID of the user who made the payment',
            },
            plan_id: {
              type: 'integer',
              format: 'int64',
              description: 'ID of the plan associated with the payment',
            },
            amount: {
              type: 'number',
              format: 'float',
              description: 'Amount paid by the user',
            },
            method: {
              type: 'string',
              description: 'Payment method used (e.g., credit card, PayPal)',
            },
            is_verified: {
              type: 'boolean',
              description: 'Indicates if the payment is verified',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of when the payment was created',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of the last update to the payment',
            },
          },
          required: ['userId', 'planId', 'method', 'is_verified'],
        },

        Plan: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              description: 'Unique identifier for the plan',
            },
            user_id: {
              type: 'integer',
              format: 'int64',
              description: 'ID of the user who created the plan',
            },
            subscription_id: {
              type: 'integer',
              format: 'int64',
              description: 'ID of the related subscription',
            },
            plan_title: {
              type: 'string',
              description: 'Title of the plan',
            },
            name: {
              type: 'string',
              description: 'Name associated with the plan',
            },
            business_email: {
              type: 'string',
              format: 'email',
              description: 'Business email associated with the plan',
            },
            company_reps: {
              type: 'string',
              description: 'Company representatives for the plan',
            },
            web_address: {
              type: 'string',
              format: 'uri',
              description: 'Web address of the business',
            },
            marketing_goals: {
              type: 'string',
              description: 'Marketing goals associated with the plan',
            },
            is_replied: {
              type: 'boolean',
              description: 'Indicates if the plan has been replied to',
            },
            quote_url: {
              type: 'string',
              format: 'uri',
              description: 'URL for the quote associated with the plan',
            },
            options: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the option',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    description: 'Price of the option',
                  },
                },
                required: ['title', 'price'],
              },
              description: 'List of options associated with the plan',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of when the plan was created',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of the last update to the plan',
            },
          },
          required: [
            'user_id',
            'plan_title',
            'name',
            'business_email',
            'company_reps',
            'marketing_goals',
            'is_replied',
            'quote_url',
            'options',
          ],
        },
        Pricing: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            userId: {
              type: 'integer',
              example: 123,
            },
            planId: {
              type: 'integer',
              example: 456,
            },
            title: {
              type: 'string',
              example: 'Premium Plan',
            },
            duration: {
              type: 'string',
              example: '30 days',
              nullable: true,
            },
            options: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    example: 'Feature A',
                  },
                  price: {
                    type: 'number',
                    example: 19.99,
                  },
                },
              },
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-09T12:34:56Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-09T12:34:56Z',
            },
          },
          required: ['userId', 'planId', 'title', 'options'],
        },

        Subscription: {
          type: 'object',
          required: ['userId', 'planId', 'subscribed_services', 'status'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            userId: {
              type: 'integer',
              example: 101,
              description: 'ID of the user',
            },
            planId: {
              type: 'integer',
              example: 202,
              description: 'ID of the subscribed plan',
            },
            subscribed_services: {
              type: 'array',
              description: 'List of subscribed services',
              items: {
                type: 'object',
                required: ['service_title', 'options'],
                properties: {
                  service_title: {
                    type: 'string',
                    example: 'Premium Support',
                  },
                  options: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['title', 'price', 'started_on', 'ends_at'],
                      properties: {
                        title: {
                          type: 'string',
                          example: '24/7 Chat Support',
                        },
                        price: {
                          type: 'number',
                          format: 'float',
                          example: 19.99,
                        },
                        is_expired: {
                          type: 'boolean',
                          example: false,
                        },
                        started_on: {
                          type: 'string',
                          format: 'date-time',
                          example: '2024-08-01T00:00:00Z',
                        },
                        ends_at: {
                          type: 'string',
                          format: 'date-time',
                          example: '2024-09-01T00:00:00Z',
                        },
                      },
                    },
                  },
                },
              },
            },
            duration: {
              type: 'string',
              example: '30 days',
              nullable: true,
            },
            is_paid: {
              type: 'boolean',
              example: true,
            },
            is_verified: {
              type: 'boolean',
              example: false,
            },
            status: {
              type: 'string',
              enum: ['created', 'updated', 'expired'],
              example: 'created',
            },
            reference_number: {
              type: 'string',
              example: '252723783kajas88q09q09q',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-01T12:34:56Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-02T14:20:30Z',
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
