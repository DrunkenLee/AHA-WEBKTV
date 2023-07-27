"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //

    const { data } = await axios({
      method: "get",
      url: "http://localhost:3001/songs",
    });

    const modifiedData = await data.map((e) => ({
      judul: e.judul,
      artis: e.artis,
      path: e.path,
      voc: e.voc,
      xvoc: e.xvoc,
      GolId: e.gol,
      JenisId: e.jenis,
      vol: e.vol,
      hits: e.hits,
      new: e.new,
      popular: e.popular,
      judul3: e.judul3,
      exjudul: e.exjudul,
      artis3: e.artis3,
      exartis: e.exartis,
      Balancing: e.Balancing,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Songs", modifiedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Songs", null, {});
  },
};
