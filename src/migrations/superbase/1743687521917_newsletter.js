/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'subscribe_to_newsletter',
    {
      id: { type: 'serial', primaryKey: true },
      email: { type: 'varchar(255)', notNull: true, unique: true },
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

  pgm.createIndex('subscribe_to_newsletter', 'email', {
    ifNotExists: true,
    unique: true,
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('subscribe_to_newsletter', { cascade: true, ifExists: true });
};
