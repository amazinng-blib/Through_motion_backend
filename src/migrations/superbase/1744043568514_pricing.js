/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'pricings',
    {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      user_id: {
        type: 'integer',
        notNull: true,
        references: 'users(id)',
        onDelete: 'cascade',
      },
      plan_id: {
        type: 'integer',
        notNull: true,
        unique: true,
        references: 'plans(id)',
        onDelete: 'cascade',
      },
      title: {
        type: 'text',
        notNull: true,
      },
      options: {
        type: 'jsonb',
        notNull: true,
      },
      duration: {
        type: 'text',
        default: `'30 days'`,
      },
      created_at: {
        type: 'timestamp',
        default: pgm.func('now()'),
      },
      updated_at: {
        type: 'timestamp',
        default: pgm.func('now()'),
      },
    },
    {
      ifNotExists: true,
    }
  );

  // Create indexes
  pgm.createIndex('pricings', 'user_id', { ifNotExists: true });
  pgm.createIndex('pricings', 'plan_id', { ifNotExists: true });
  pgm.createIndex('pricings', 'title', { ifNotExists: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable('pricings', { ifExists: true, cascade: true });
};
