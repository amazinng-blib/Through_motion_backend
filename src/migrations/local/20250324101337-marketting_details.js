'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_and_marketing_details', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users_table', // Ensure your users table is named correctly
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mission: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      targetAudience: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      scope: {
        type: Sequelize.ENUM('local', 'national', 'global'),
        allowNull: false,
      },
      competitors: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      ads: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      digitalMarketing: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      previousCampaign: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('business_and_marketing_details');
  },
};
