"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Songs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      artis: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voc: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      xvoc: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      GolId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Golongans",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      JenisId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      vol: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hits: {
        type: Sequelize.INTEGER,
      },
      new: {
        type: Sequelize.INTEGER,
      },
      popular: {
        type: Sequelize.INTEGER,
      },
      judul3: {
        type: Sequelize.STRING,
      },
      exjudul: {
        type: Sequelize.STRING,
      },
      artis3: {
        type: Sequelize.STRING,
      },
      exartis: {
        type: Sequelize.STRING,
      },
      Balancing: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Songs");
  },
};
