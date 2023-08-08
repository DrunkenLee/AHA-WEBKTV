"use strict";

const { hashing } = require("../helpers/hash-security");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = [
      {
        name: "Amy",
        username: "bigamy",
        email: "amy@mail.com",
        password: "asd",
        noHandphone: "0895412227149",
      },
      {
        name: "user1",
        username: "user1",
        email: "user1@mail.com",
        password: "asd",
        noHandphone: "0895412227149",
      },
    ];

    data.forEach((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      e.password = hashing(e.password);
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
