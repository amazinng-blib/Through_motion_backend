/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  // Create ENUM type for roles
  pgm.createType('user_role', ['ADMIN', 'USER', 'MARKETER']);

  // Create users table
  pgm.createTable(
    'users',
    {
      id: { type: 'serial', primaryKey: true },
      subscription_key: {
        type: 'integer',
        notNull: true,
      },
      first_name: { type: 'varchar(255)', notNull: true },
      last_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(100)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true },
      display_name: { type: 'varchar(255)', notNull: true },
      role: { type: 'user_role', notNull: true, default: pgm.func("'USER'") }, // Fixed ENUM default
      is_verified: {
        type: 'boolean',
        notNull: true,
        default: pgm.func('false'),
      }, // Ensures proper boolean default
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
    },
    { ifNotExists: true }
  );

  // Add indexes
  pgm.createIndex('users', 'subscription_key', { ifNotExists: true });
  pgm.createIndex('users', 'created_at', { ifNotExists: true });
  pgm.createIndex('users', 'email', { unique: true, ifNotExists: true }); // Explicit unique index
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('users', { ifExists: true, cascade: true }); // Ensures safe rollback
  pgm.dropType('user_role', { ifExists: true }); // Drop ENUM type safely
};
