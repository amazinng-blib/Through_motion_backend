'use strict';

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'Users_table',
    {
      id: {
        type: 'serial',
        primaryKey: true,
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
        unique: true,
      },
      password: {
        type: 'varchar(255)',
        notNull: true,
      },
      displayName: {
        type: 'varchar(255)',
        notNull: true,
      },
      isVerified: {
        type: 'boolean',
        default: false,
      },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
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
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('Users_table');
};
