/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable(
    'business_and_marketing_details',
    {
      id: { type: 'serial', primaryKey: true },
      userId: {
        type: 'integer',
        notNull: true,
        unique: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      description: { type: 'text', notNull: true },
      mission: { type: 'text', notNull: true },
      targetAudience: { type: 'text', notNull: true },
      scope: {
        type: 'varchar(10)',
        notNull: true,
        check: "scope IN ('local', 'national', 'global')",
      },
      competitors: { type: 'jsonb', notNull: true },
      ads: { type: 'jsonb', notNull: true },
      digitalMarketing: { type: 'jsonb', notNull: true },
      previousCampaign: { type: 'jsonb', notNull: true },
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

  // Add index for foreign key reference
  pgm.createIndex('business_and_marketing_details', 'userId');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('business_and_marketing_details');
};
