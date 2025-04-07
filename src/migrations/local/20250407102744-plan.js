'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_reps: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      web_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      marketing_goals: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_replied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      quote_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plan_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('plans', ['name']);
    await queryInterface.addIndex('plans', ['created_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plans');
  },
};
