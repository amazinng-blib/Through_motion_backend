/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'payments',
    {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      user_key: {
        type: 'integer',
        notNull: true,
      },
      plan_id: {
        type: 'integer',
        notNull: true,
        references: 'plans(id)',
        onDelete: 'cascade',
      },
      amount: {
        type: 'numeric',
        notNull: false,
      },
      method: {
        type: 'varchar(255)',
        notNull: true,
      },
      is_verified: {
        type: 'boolean',
        notNull: true,
        default: false,
      },
      created_at: {
        type: 'timestamp',
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp',
        default: pgm.func('current_timestamp'),
      },
    },
    {
      ifNotExists: true,
    }
  );

  // Create an index on user_key
  pgm.createIndex('payments', 'user_key', { ifNotExists: true });
  pgm.createIndex('payments', 'plan_id', { ifNotExists: true });
  pgm.createIndex('payments', 'created_at', { ifNotExists: true });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('payments', {
    ifExists: true,
    cascade: true,
  });
};
