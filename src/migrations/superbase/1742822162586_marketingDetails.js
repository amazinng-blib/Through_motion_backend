/**
 * @type {import('node-pg-migrate').MigrationBuilder}
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
      user_id: {
        type: 'integer',
        notNull: true,
        unique: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      description: { type: 'text', notNull: true },
      mission: { type: 'text', notNull: true },
      target_audience: { type: 'text', notNull: true },
      scope: {
        type: "enum('local', 'national', 'global')",
        notNull: true,
      },
      competitors: { type: 'jsonb', notNull: true },
      ads: { type: 'jsonb', notNull: true },
      digital_marketing: { type: 'jsonb', notNull: true },
      previous_campaign: { type: 'jsonb', notNull: true },
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
  pgm.createIndex('business_and_marketing_details', 'user_id');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('business_and_marketing_details');
};
