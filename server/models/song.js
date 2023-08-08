"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.Golongan);
    }
  }
  Song.init(
    {
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      voc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      xvoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      GolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      JenisId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vol: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hits: DataTypes.INTEGER,
      new: DataTypes.INTEGER,
      popular: DataTypes.INTEGER,
      judul3: DataTypes.STRING,
      exjudul: DataTypes.STRING,
      artis3: DataTypes.STRING,
      exartis: DataTypes.STRING,
      Balancing: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
