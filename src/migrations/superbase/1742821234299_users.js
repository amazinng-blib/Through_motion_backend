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
      first_name: { type: 'varchar(255)', notNull: true },
      last_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(100)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true },
      display_name: { type: 'varchar(255)', notNull: true },
      role: { type: 'user_role', notNull: true, default: 'USER' },
      is_verified: { type: 'boolean', notNull: true, default: false },
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
    {
      ifNotExists: true,
    }
  );
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
  pgm.dropType('user_role'); // Drop ENUM type
};
