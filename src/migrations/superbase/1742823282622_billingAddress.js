/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'billing_address',
    {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      user_id: {
        type: 'integer',
        notNull: true,
        unique: true, // Remove this if users can have multiple billing addresses
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      first_name: {
        type: 'varchar(255)',
        notNull: true,
      },
      last_name: {
        type: 'varchar(255)',
        notNull: true,
      },
      email: {
        type: 'varchar(100)',
        notNull: true,
      },
      company_name: {
        type: 'text',
        notNull: false,
      },
      region: {
        type: 'varchar(255)',
        notNull: true,
      },
      state: {
        type: 'varchar(255)',
        notNull: true,
      },
      city: {
        type: 'varchar(255)',
        notNull: true,
      },
      street_address: {
        type: 'text',
        notNull: true,
      },
      apartment: {
        type: 'text',
        notNull: false,
      },
      phone: {
        type: 'varchar(50)',
        notNull: true,
      },
      order_note: {
        type: 'text',
        notNull: false,
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    },
    {
      ifNotExists: true,
    }
  );
  pgm.createIndex('billing_address', 'user_id');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('billing_address');
};
