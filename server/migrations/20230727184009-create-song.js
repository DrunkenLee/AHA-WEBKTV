'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      artis: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      voc: {
        type: Sequelize.INTEGER
      },
      xvoc: {
        type: Sequelize.INTEGER
      },
      GolId: {
        type: Sequelize.INTEGER
      },
      JenisId: {
        type: Sequelize.INTEGER
      },
      vol: {
        type: Sequelize.INTEGER
      },
      hits: {
        type: Sequelize.INTEGER
      },
      new: {
        type: Sequelize.INTEGER
      },
      popular: {
        type: Sequelize.INTEGER
      },
      judul3: {
        type: Sequelize.STRING
      },
      exjudul: {
        type: Sequelize.STRING
      },
      artis3: {
        type: Sequelize.STRING
      },
      exartis: {
        type: Sequelize.STRING
      },
      Balancing: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};