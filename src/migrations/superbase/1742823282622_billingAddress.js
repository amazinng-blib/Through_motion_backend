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
      userId: {
        type: 'integer',
        notNull: true,
        unique: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      firstName: {
        type: 'varchar(255)',
        notNull: true,
      },
      lastName: {
        type: 'varchar(255)',
        notNull: true,
      },
      email: {
        type: 'varchar(100)',
        notNull: true,
      },
      companyName: {
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
      streetAddress: {
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
      orderNote: {
        type: 'text',
        notNull: false,
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
  pgm.createIndex('billing_address', 'userId');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('billing_address');
};
