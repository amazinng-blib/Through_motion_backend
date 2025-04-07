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
      user_id: {
        type: 'integer',
        notNull: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      company_name: {
        type: 'varchar(255)',
        notNull: true,
      },
      company_representative: {
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
      company_address: {
        type: 'text',
        notNull: true,
      },
      industry: {
        type: 'varchar(255)',
        notNull: true,
      },
      business_type: {
        type: 'varchar(255)',
        notNull: true,
        default: "'unknown'",
      },
      company_size: {
        type: 'integer',
        notNull: true,
      },
      established_year: {
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
  pgm.createIndex('business_form', 'user_id', {
    unique: true,
    ifNotExists: true,
  });
  pgm.createIndex('business_form', 'company_name', {
    unique: true,
    ifNotExists: true,
  });
  pgm.createIndex('business_form', 'email', {
    unique: true,
    ifNotExists: true,
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('business_form', { ifExists: true, cascade: true });
};
