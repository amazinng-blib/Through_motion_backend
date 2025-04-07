/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'plans',
    {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      //   user_id: {
      //     type: 'integer',
      //     notNull: false,
      //     references: '"users"(id)',
      //     onDelete: 'CASCADE',
      //   },
      //   subscription_id: {
      //     type: 'integer',
      //     references: '"subscriptions"(id)',
      //     onDelete: 'SET NULL',
      //     notNull: false,
      //   },
      name: {
        type: 'varchar(255)',
        notNull: true,
      },
      company_reps: {
        type: 'varchar(255)',
        notNull: true,
      },
      business_email: {
        type: 'varchar(255)',
        notNull: true,
      },
      web_address: {
        type: 'varchar(255)',
        allowNull: true,
      },
      marketing_goals: {
        type: 'text',
        notNull: true,
      },
      is_replied: {
        type: 'boolean',
        default: false,
      },
      quote_url: {
        type: 'varchar(255)',
        notNull: true,
      },
      plan_title: {
        type: 'varchar(255)',
        notNull: true,
      },
      options: {
        type: 'jsonb',
        notNull: true,
      },
      created_at: {
        type: 'timestamp',
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'timestamp',
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
    },
    { ifNotExists: true }
  );

  // Add indexes
  //   pgm.createIndex('plans', 'user_id', { ifNotExists: true });
  pgm.createIndex('plans', 'name', { ifNotExists: true });
  pgm.createIndex('plans', 'created_at', { ifNotExists: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('plans', { ifExists: true, cascade: true });
};
