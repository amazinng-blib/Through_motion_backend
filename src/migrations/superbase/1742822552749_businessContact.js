/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'business_form',
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
      companyName: {
        type: 'varchar(255)',
        notNull: true,
      },
      companyRepresentative: {
        type: 'varchar(255)',
        notNull: true,
      },
      email: {
        type: 'varchar(255)',
        notNull: true,
        unique: true,
      },
      phone: {
        type: 'varchar(255)',
        notNull: true,
      },
      companyAddress: {
        type: 'text',
        notNull: true,
      },
      industry: {
        type: 'varchar(255)',
        notNull: true,
      },
      businessType: {
        type: 'varchar(255)',
        notNull: true,
        default: "'unknown'",
      },
      companySize: {
        type: 'integer',
        notNull: true,
      },
      establishedYear: {
        type: 'date',
        notNull: true,
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
  pgm.createIndex('business_form', 'userId');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('business_form');
};
