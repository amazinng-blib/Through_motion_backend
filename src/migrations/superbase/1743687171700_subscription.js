/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'subscriptions',
    {
      id: { type: 'serial', primaryKey: true },

      user_key: {
        type: 'integer',
      },
      planId: {
        type: 'integer',
        notNull: true,
        references: 'plans(id)',
        onDelete: 'CASCADE',
      },
      user: { type: 'jsonb', notNull: true },
      is_paid: { type: 'boolean', notNull: true, default: false },
      is_verified: { type: 'boolean', notNull: true, default: false },
      subscribed_services: { type: 'jsonb', notNull: true },
      duration: { type: 'text', notNull: false, default: '30 days' },
      status: { type: 'text', notNull: true, default: 'created' },
      reference_number: { type: 'integer', notNull: true },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('NOW()'),
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('NOW()'),
      },
    },
    { ifNotExists: true }
  );

  // Indexing for faster lookups
  pgm.createIndex('subscriptions', 'user_key', { ifNotExists: true });
  pgm.createIndex('subscriptions', 'planId', { ifNotExists: true });
  pgm.createIndex('subscriptions', 'status', { ifNotExists: true });
  pgm.createIndex('subscriptions', 'created_at', { ifNotExists: true });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('subscriptions', { ifExists: true, cascade: true });
};
